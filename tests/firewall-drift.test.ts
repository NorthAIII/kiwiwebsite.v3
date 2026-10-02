import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { describe, it, expect, vi } from "vitest";
import { compareRule, SPEC_URL } from "../ops/firewall/drift.mjs";

// WAF `chat-rate-limit` kuralının drift mantığı + spec değer kilidi (TASK-19.04; DECISIONS 2026-10-02).
// Canlı katman birim testlenemez; burada yalnız saf `compareRule` ve repo'daki spec ölçülür.
//
// `drift.mjs` import'u yan etkisiz olmalı (CLI girişi yalnız doğrudan koşuda). `main()` async'tir:
// `execFile` ancak spec okunduktan SONRA çağrılır, yani import anında yalnız `execFile`'a bakmak
// kapı kalksa bile yeşil kalır (ölçüldü). Bu yüzden `main()`'in senkron ilk işi olan `readFile` da
// sahtelenir (hiç çözülmeyen söz → zincir orada durur) ve ikisine birden bakılır.
vi.mock("node:child_process", () => ({ execFile: vi.fn() }));
vi.mock("node:fs/promises", () => ({ readFile: vi.fn(() => new Promise(() => {})) }));

const spec: any = JSON.parse(readFileSync(SPEC_URL, "utf8"));

// Sunucunun eklediği alanlar — Vercel API "Read Firewall Configuration" kural şemasından
// (`id`, `valid`, `validationErrors` zorunlu; `mitigate` altında nullable `redirect`,
// `actionDuration`, `bypassSystem`, `logHeaders`). Kimlik değeri sahtedir (public repo).
// `vercel firewall rules inspect --json` kuralı olduğu gibi basar (CLI 59.26.0 `outputJson2(rule)`).
const liveMinimal = () => ({
  ...structuredClone(spec),
  id: "rule_fixture_chat_rate_limit",
  valid: true,
  validationErrors: null,
});

const liveEnriched = () => {
  const live = liveMinimal();
  live.description = "dashboard'da değişmiş açıklama — davranışı etkilemez";
  live.action.mitigate = { ...live.action.mitigate, bypassSystem: null, logHeaders: [] };
  live.conditionGroup[0].conditions = live.conditionGroup[0].conditions.map(
    (c: Record<string, unknown>) => ({ ...c, neg: false })
  );
  return live;
};

describe("drift.mjs import'u", () => {
  it("CLI girişini koşmaz: spec'i okumaz, vercel CLI'ını çağırmaz", () => {
    expect(readFile).not.toHaveBeenCalled();
    expect(execFile).not.toHaveBeenCalled();
  });
});

describe("spec — kararın değerleri (ikinci kilit)", () => {
  it("ad, aktiflik ve koşul: POST /api/chat", () => {
    expect(spec.name).toBe("chat-rate-limit");
    expect(spec.active).toBe(true);
    expect(spec.conditionGroup).toEqual([
      {
        conditions: [
          { type: "path", op: "eq", value: "/api/chat" },
          { type: "method", op: "eq", value: "POST" },
        ],
      },
    ]);
  });

  it("sayım: fixed_window 600 s, 6 istek, anahtar ip, aşımda 429 (rate_limit)", () => {
    expect(spec.action.mitigate.action).toBe("rate_limit");
    expect(spec.action.mitigate.rateLimit).toEqual({
      algo: "fixed_window",
      window: 600,
      limit: 6,
      keys: ["ip"],
      action: "rate_limit",
    });
  });

  it("kalıcı eylem yok (Hobby'de `--duration` yok)", () => {
    expect(spec.action.mitigate.actionDuration).toBeNull();
  });
});

describe("compareRule — eşleşme", () => {
  it("spec + sunucu alanları (id/valid/validationErrors) → drift yok", () => {
    expect(compareRule(spec, liveMinimal())).toEqual({ drift: false, diffs: [] });
  });

  it("boş varsayılanlar ve farklı açıklama → drift yok", () => {
    expect(compareRule(spec, liveEnriched())).toEqual({ drift: false, diffs: [] });
  });
});

describe("compareRule — drift ve doğru alanın adı", () => {
  const cases: [string, (live: any) => void, string][] = [
    ["limit 6 → 10", (l) => (l.action.mitigate.rateLimit.limit = 10), "action.mitigate.rateLimit.limit"],
    ["window 600 → 60", (l) => (l.action.mitigate.rateLimit.window = 60), "action.mitigate.rateLimit.window"],
    ["aşım eylemi rate_limit → log", (l) => (l.action.mitigate.rateLimit.action = "log"), "action.mitigate.rateLimit.action"],
    ["kural pasif (active: false)", (l) => (l.active = false), "active"],
    ["koşul path'i değişti", (l) => (l.conditionGroup[0].conditions[0].value = "/api"), "conditionGroup[0].conditions[0].value"],
    ["anahtar ip → ja4", (l) => (l.action.mitigate.rateLimit.keys = ["ja4"]), "action.mitigate.rateLimit.keys[0]"],
    ["kalıcı eylem eklendi (actionDuration 5m)", (l) => (l.action.mitigate.actionDuration = "5m"), "action.mitigate.actionDuration"],
    ["method koşulu silindi", (l) => l.conditionGroup[0].conditions.pop(), "conditionGroup[0].conditions[1]"],
    ["ad farklı (inspect kısmi ad eşleşmesi)", (l) => (l.name = "chat-rate-limit-old"), "name"],
  ];

  it.each(cases)("%s", (_label, mutate, path) => {
    const live = liveEnriched();
    mutate(live);
    const r = compareRule(spec, live);
    expect(r.drift).toBe(true);
    expect(r.diffs.map((d) => d.path)).toEqual([path]);
  });

  it("diff kaydı iki tarafın değerini taşır", () => {
    const live = liveMinimal();
    live.action.mitigate.rateLimit.limit = 10;
    expect(compareRule(spec, live).diffs).toEqual([
      { path: "action.mitigate.rateLimit.limit", spec: 6, live: 10 },
    ]);
  });

  it("canlı kural nesne değil → drift (sessiz eşleşme yok)", () => {
    const r = compareRule(spec, null);
    expect(r.drift).toBe(true);
    expect(r.diffs.map((d) => d.path)).toEqual(
      expect.arrayContaining(["name", "active", "conditionGroup", "action.mitigate"])
    );
  });
});

describe("compareRule — boş kapsam: ölçülemeyen spec PASS basmaz", () => {
  it.each([
    ["boş nesne", {}],
    ["conditionGroup boş", { ...structuredClone(spec), conditionGroup: [] }],
    ["mitigate yok", { ...structuredClone(spec), action: {} }],
  ])("%s → hata", (_label, bad) => {
    expect(() => compareRule(bad, liveMinimal())).toThrow(/spec eksik/);
  });
});
