#!/usr/bin/env node
// ops/firewall/drift.mjs — Vercel WAF `chat-rate-limit` kuralının drift kontrolü (TASK-19.04).
//
// NE İŞE YARAR
//   `/api/chat` hız sınırı Vercel WAF'ta yaşar; deploy'la uygulanan config-as-code Hobby'de yoktur
//   (`vercel.json` rate-limit tanımlayamaz). Kuralın TEK doğru tanımı repo'daki
//   `ops/firewall/chat-rate-limit.json`'dır. Bu script Vercel'deki kuralı o spec'le karşılaştırır;
//   dashboard'da elle yapılan bir değişiklik (limit, pencere, eylem, koşul, pasif bırakma) görünür olur.
//
// NASIL KOŞULUR
//   node ops/firewall/drift.mjs          (repo kökünden ya da herhangi bir yerden; `vercel` CLI'ı repo
//                                         kökünde, bağlı projede — `.vercel/project.json` — koşturulur)
//   Çıkış kodu: 0 = eşleşiyor · 1 = drift · 2 = kural yok / CLI hatası / spec okunamadı.
//   Gereken: kurulu ve yetkili `vercel` CLI (59.26.0'da yazıldı). Yeni npm paketi yok; yalnız Node yerleşikleri.
//
// DRAFT BEKLERKEN NEYİ ÖLÇER
//   `vercel firewall rules inspect` bekleyen draft varsa DRAFT'ı, yoksa canlı kuralı okur
//   (CLI 59.26.0: `config = draft ?? active`). Script önce `vercel firewall diff --json`'ı koşar; bekleyen
//   değişiklik varsa "karşılaştırılan draft'tır, canlı kural değil" uyarısını basar. Uyarı çıkış kodunu
//   DEĞİŞTİRMEZ: stage edilmiş kuralı publish'ten önce spec'e karşı ölçmek meşru bir kullanımdır.
//
// SPEC NASIL UYGULANIR (canlıya dokunan adım kullanıcıdadır)
//   1. İlk kez:      vercel firewall rules add --json "$(cat ops/firewall/chat-rate-limit.json)" --yes
//      Güncelleme:   vercel firewall rules edit chat-rate-limit --json "$(cat ops/firewall/chat-rate-limit.json)" --yes
//      İkisi de yalnız DRAFT stage eder. Dikkat: TTY'de `--yes` olmadan koşulan `rules add`, tek draft
//      değişikliği buysa "Publish to production now?" diye sorar — cevap "No" olmalı.
//   2. vercel firewall diff              → yalnız bu kural görünmeli; `node ops/firewall/drift.mjs` → 0 (draft uyarısıyla)
//   3. vercel firewall publish           → KULLANICI koşar. Publish canlıya anında dokunur, deploy'dan bağımsızdır.
//   Kademeli yayında (önce `rateLimit.action: "log"`, sonra 429) log aşamasında bu script 1 (drift) verir —
//   beklenen sonuçtur; spec'in hedefi 429'dur.
//
// DEĞERLERİN GEREKÇESİ (DECISIONS 2026-10-02 "`/api/chat` kota koruması")
//   Koşul `path eq /api/chat` VE `method eq POST`; `fixed_window` 600 s, 6 istek, anahtar `ip`, aşımda 429.
//   6 istek / 10 dk = tek IP'den en fazla 864 istek/gün < Groq'un günlük 1.000 isteklik ücretsiz kotası.
//   10 dk Hobby'nin pencere tavanıdır. JSON yorum taşıyamadığı için gerekçe burada ve DECISIONS'ta yaşar.
//
// NE KARŞILAŞTIRILIR
//   Yalnız davranışı belirleyen alanlar: `name`, `active`, `conditionGroup`, `action.mitigate`.
//   Yok sayılanlar: sunucunun eklediği `id`, `valid`, `validationErrors` (Vercel API "Read Firewall
//   Configuration" kural şeması); davranışı etkilemeyen `description`; değeri boş olan varsayılanlar
//   (null / false / [] / {} — örn. `redirect: null`, `bypassSystem: null`, `neg: false`).
//   Spec'te olmayan ama Vercel'de DOLU olan bir alan (örn. `actionDuration: "5m"`) drift sayılır.

import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

export const SPEC_URL = new URL("./chat-rate-limit.json", import.meta.url);
const REPO_ROOT = fileURLToPath(new URL("../../", import.meta.url));

/**
 * @typedef {{ path: string, spec: unknown, live: unknown }} RuleDiff
 * @typedef {{ drift: boolean, diffs: RuleDiff[] }} CompareResult
 */

/** @param {unknown} v @returns {v is Record<string, unknown>} */
function isPlainObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Boş varsayılanları (null / undefined / false / [] / {}) özyinelemeli atar. Sunucunun eklediği boş
 * alanla spec'te hiç yazılmamış alan aynı anlamı taşır; dolu değerler korunur.
 * @param {unknown} v
 * @returns {unknown}
 */
function prune(v) {
  if (v === null || v === undefined || v === false) return undefined;
  if (Array.isArray(v)) {
    const arr = v.map(prune);
    return arr.length === 0 ? undefined : arr;
  }
  if (isPlainObject(v)) {
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const [k, x] of Object.entries(v)) {
      const p = prune(x);
      if (p !== undefined) out[k] = p;
    }
    return Object.keys(out).length === 0 ? undefined : out;
  }
  return v;
}

/**
 * @param {string} path
 * @param {unknown} a  spec tarafı
 * @param {unknown} b  canlı tarafı
 * @param {RuleDiff[]} diffs
 */
function diffTree(path, a, b, diffs) {
  if (Array.isArray(a) && Array.isArray(b)) {
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) diffTree(`${path}[${i}]`, a[i], b[i], diffs);
    return;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
    for (const k of keys) diffTree(`${path}.${k}`, a[k], b[k], diffs);
    return;
  }
  if (a !== b) diffs.push({ path, spec: a, live: b });
}

/**
 * Spec ölçülebilir mi? Boş ya da eksik spec her canlı kuralla "eşleşir" görünürdü — kapı hiçbir şey
 * ölçmeden PASS basmasın diye eksik spec hata fırlatır.
 * @param {any} spec
 */
function assertSpec(spec) {
  const ok =
    isPlainObject(spec) &&
    typeof spec.name === "string" &&
    spec.name.length > 0 &&
    typeof spec.active === "boolean" &&
    Array.isArray(spec.conditionGroup) &&
    spec.conditionGroup.length > 0 &&
    isPlainObject(spec.action) &&
    isPlainObject(spec.action.mitigate) &&
    typeof spec.action.mitigate.action === "string";
  if (!ok) {
    throw new Error(
      "spec eksik: name, active, conditionGroup (boş olmayan) ve action.mitigate.action zorunlu"
    );
  }
}

/**
 * Canlı (ya da draft) kuralı spec'le karşılaştırır. Saf fonksiyon — ağ ya da CLI çağrısı yok.
 * @param {any} spec  `ops/firewall/chat-rate-limit.json` içeriği
 * @param {any} live  `vercel firewall rules inspect <ad> --json` çıktısı
 * @returns {CompareResult}
 */
export function compareRule(spec, live) {
  assertSpec(spec);
  const l = isPlainObject(live) ? live : {};
  /** @type {RuleDiff[]} */
  const diffs = [];
  if (spec.name !== l.name) diffs.push({ path: "name", spec: spec.name, live: l.name });
  // `active` budanmaz: `false` burada anlamlıdır (kural kapalı).
  if (spec.active !== l.active) diffs.push({ path: "active", spec: spec.active, live: l.active });
  diffTree("conditionGroup", prune(spec.conditionGroup), prune(l.conditionGroup), diffs);
  const liveAction = isPlainObject(l.action) ? l.action : {};
  diffTree("action.mitigate", prune(spec.action.mitigate), prune(liveAction.mitigate), diffs);
  return { drift: diffs.length > 0, diffs };
}

/** @param {unknown} v */
function show(v) {
  return v === undefined ? "(yok)" : JSON.stringify(v);
}

/**
 * @param {string[]} args
 * @returns {Promise<{ code: number | string, stdout: string, stderr: string }>}
 */
function runVercel(args) {
  return new Promise((resolve) => {
    execFile(
      "vercel",
      [...args, "--non-interactive"],
      { cwd: REPO_ROOT, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
      (err, stdout, stderr) => {
        /** @type {any} */
        const e = err;
        resolve({ code: e ? (e.code ?? 1) : 0, stdout: String(stdout), stderr: String(stderr) });
      }
    );
  });
}

/** @param {string} text @returns {any} */
function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/** @returns {Promise<number>} */
async function main() {
  let spec;
  try {
    spec = JSON.parse(await readFile(SPEC_URL, "utf8"));
    assertSpec(spec);
  } catch (e) {
    console.error(`✗ spec okunamadı (${fileURLToPath(SPEC_URL)}): ${e instanceof Error ? e.message : e}`);
    return 2;
  }

  // (c) Draft uyarısı — inspect draft'ı canlıdan önce okur.
  const d = await runVercel(["firewall", "diff", "--json"]);
  const pending = d.code === 0 ? parseJson(d.stdout)?.changes?.length : undefined;
  /** @type {string} */
  let target;
  if (typeof pending !== "number") {
    target = "draft ya da canlı — ayırt edilemedi";
    console.warn("⚠ Draft durumu okunamadı (`vercel firewall diff --json`): karşılaştırılan kural draft da olabilir.");
  } else if (pending > 0) {
    target = "DRAFT";
    console.warn(
      `⚠ Bekleyen ${pending} draft değişikliği var: karşılaştırılan DRAFT'tır, canlı kural değil (inspect = draft ?? active).`
    );
  } else {
    target = "canlı";
  }

  // (b) Kuralı oku.
  const r = await runVercel(["firewall", "rules", "inspect", spec.name, "--json"]);
  const out = parseJson(r.stdout);
  if (r.code === "ENOENT") {
    console.error("✗ `vercel` CLI bulunamadı (PATH).");
    return 2;
  }
  if (r.code !== 0 || !isPlainObject(out) || out.status === "error") {
    const reason = isPlainObject(out) && out.message ? `${out.reason ?? "error"}: ${out.message}` : r.stderr.trim();
    console.error(`✗ \`${spec.name}\` okunamadı (çıkış ${r.code}) — ${reason || "bilinmeyen hata"}`);
    return 2;
  }

  const { drift, diffs } = compareRule(spec, out);
  if (!drift) {
    console.log(`✓ ${spec.name}: spec ile eşleşiyor (${target}).`);
    return 0;
  }
  console.log(`✗ ${spec.name}: DRIFT — ${diffs.length} alan spec'ten farklı (${target}):`);
  for (const x of diffs) console.log(`  ${x.path}: spec=${show(x.spec)} · vercel=${show(x.live)}`);
  console.log("  Spec doğruysa: `rules edit … --json` ile stage et, publish'i kullanıcı koşar. Değilse önce spec'i güncelle.");
  return 1;
}

// CLI girişi yalnız script doğrudan koşulduğunda çalışır — test import'u yan etkisizdir.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then(
    (code) => {
      process.exitCode = code;
    },
    (e) => {
      console.error(`✗ beklenmeyen hata: ${e instanceof Error ? e.stack : e}`);
      process.exitCode = 2;
    }
  );
}
