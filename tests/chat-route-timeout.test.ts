// TASK-18.11 — üst-akış zaman aşımı davranış mührü.
//
// Katman seçimi: gerçek `route.ts` + gerçek `groq-sdk`; yalnız HTTP katmanı
// (`globalThis.fetch`) sahte. SDK istemciyi POST içinde kurar ve `fetch`'i o an
// global'den alır (`getDefaultFetch`), bu yüzden global'i değiştirmek SDK'nın
// GERÇEK abort/stream semantiğini ölçmemizi sağlar — özellikle SSE iteratörünün
// abort'u sessizce yutması (`Stream.fromSSEResponse` → `if (isAbortError(e)) return`),
// yani iptal ortada gerçekleşirse route'un catch bloğu HİÇ çalışmaz.
//
// Zaman sahte (vi.useFakeTimers): route'un sınırları saniyeler mertebesinde;
// gerçek beklemek testi CI'da işlemez hâle getirirdi. Ölçülen süreler sanal
// saatten okunur — assertion'lar bu yüzden gerçek gecikmeye değil, kodun
// zamanlama sözleşmesine bakar.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/chat/route";
import { routing } from "@/i18n/routing";

// Beklenen hata notu `messages/<locale>.json` → `chat.error`'dan, route'un kullandığı
// dinamik import'tan BAĞIMSIZ bir yoldan (doğrudan dosya okuma) türetilir — kopya
// değişince test kendiliğinden izler, sabit metin gömülmez (TASK-18.12).
const messagesDir = join(dirname(fileURLToPath(import.meta.url)), "..", "messages");
function chatError(locale: string): string {
  const raw = readFileSync(join(messagesDir, `${locale}.json`), "utf8");
  return (JSON.parse(raw) as { chat: { error: string } }).chat.error;
}
/** Balona akan not: parantezli `chat.error`. */
const noteFor = (locale: string) => `(${chatError(locale)})`;
const FALLBACK = noteFor(routing.defaultLocale); // header'sız istek → TR
/** route.ts → `export const maxDuration = 30`; hiçbir yol buna dayanmamalı. */
const MAX_DURATION_MS = 30_000;

// Route notu ilk hata anında dinamik import'la yükler — gerçek I/O, zamanlayıcı değil.
// Sahte saatin `advanceTimersByTimeAsync`'i bu I/O'yu beklemez: önbellek soğukken sanal
// saat pencerenin sonuna (35 s) atlar ve ilk testin ölçtüğü kapanış anı modül yükleme
// yerine o sıçramayı okur. Önbelleği ısıtmak zamanlama sözleşmesini I/O'dan ayırır
// (prod'da yükleme ms mertebesinde; aynı dosya yolu → aynı modül kaydı).
beforeAll(async () => {
  await Promise.all(routing.locales.map((l) => import(`../messages/${l}.json`)));
});

type UpstreamScript = {
  /** Üst-akış hiç yanıt vermez (ilk token gelmez) — canlıda 504 üreten sınıf. */
  hangHeaders?: boolean;
  /** İlk byte'a kadar meşru gecikme (ölçülen yavaş ama başarılı yanıtlar). */
  headerDelayMs?: number;
  chunks?: string[];
  chunkGapMs?: number;
  /** Parçalar bitince akış ne kapanır ne devam eder — stream-ortası asılma. */
  stallAfterChunks?: boolean;
  /** Sonsuza dek sınır-altı aralıklarla damlatır — toplam bütçe kapısı. */
  trickleForever?: boolean;
};

function abortError() {
  return new DOMException("The operation was aborted.", "AbortError");
}

function sse(content: string) {
  return `data: ${JSON.stringify({
    id: "x",
    choices: [{ index: 0, delta: { content } }],
  })}\n\n`;
}

function fakeUpstream(script: UpstreamScript) {
  return vi.fn(async (_url: unknown, init: { signal: AbortSignal }) => {
    const signal = init.signal;
    const enc = new TextEncoder();

    if (script.hangHeaders) {
      await new Promise((_resolve, reject) => {
        if (signal.aborted) return reject(abortError());
        signal.addEventListener("abort", () => reject(abortError()), { once: true });
      });
    }
    if (script.headerDelayMs) {
      await new Promise<void>((resolve, reject) => {
        const t = setTimeout(resolve, script.headerDelayMs);
        signal.addEventListener(
          "abort",
          () => {
            clearTimeout(t);
            reject(abortError());
          },
          { once: true }
        );
      });
    }

    let done = false;
    const body = new ReadableStream<Uint8Array>({
      start(c) {
        const chunks = script.chunks ?? [];
        const gap = script.chunkGapMs ?? 0;
        let i = 0;
        const pump = () => {
          if (signal.aborted || done) return;
          if (i < chunks.length) {
            c.enqueue(enc.encode(sse(chunks[i++])));
            setTimeout(pump, gap);
            return;
          }
          if (script.trickleForever) {
            c.enqueue(enc.encode(sse(".")));
            setTimeout(pump, gap);
            return;
          }
          if (script.stallAfterChunks) return; // sessizlik: ne parça ne kapanış
          c.enqueue(enc.encode("data: [DONE]\n\n"));
          done = true;
          c.close();
        };
        setTimeout(pump, gap);
        signal.addEventListener(
          "abort",
          () => {
            if (done) return;
            try {
              c.error(abortError());
            } catch {
              /* zaten kapalı */
            }
          },
          { once: true }
        );
      },
    });

    return new Response(body, {
      status: 200,
      headers: { "content-type": "text/event-stream" },
    });
  });
}

/**
 * Route'un ilk işi origin kapısıdır (TASK-19.03) → bu dosyanın senaryoları kapıdan
 * GEÇEN istekle koşar: tarayıcının aynı-origin işareti + isteğin `host`'u. `host` şart:
 * `new Request` onu kendiliğinden koymaz, kural ise host'suz isteği reddeder.
 * Çağıranın başlıkları varsayılanları ezer (locale testlerinin `referer`/`cookie`'si aynen
 * geçer). Kapının kendi sözleşmesi → `chat-route-origin.test.ts`.
 */
function chatRequest(
  content = "Spor salonum için ne yapabilirsiniz?",
  headers: Record<string, string> = {}
) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "localhost",
      "sec-fetch-site": "same-origin",
      ...headers,
    },
    body: JSON.stringify({ messages: [{ role: "user", content }] }),
  });
}

/** Üst-akış HTTP hatası — canlıda bu yolu tetikleyen sınıf: Groq ücretsiz tier 429 (OTPM). */
function failingUpstream(status = 429) {
  return vi.fn(
    async () =>
      new Response(
        JSON.stringify({ error: { message: "Rate limit reached", type: "tokens" } }),
        { status, headers: { "content-type": "application/json" } }
      )
  );
}

/** Yanıt gövdesini okur ve akışın KAPANDIĞI sanal anı döndürür. */
async function drain(res: Response) {
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    text += dec.decode(value, { stream: true });
  }
  return { text, closedAt: Date.now() };
}

/** Senaryoyu koşar; sanal saatte maxDuration kadar ilerletir. */
async function run(
  script: UpstreamScript | ReturnType<typeof failingUpstream>,
  headers: Record<string, string> = {}
) {
  const fetchMock = typeof script === "function" ? script : fakeUpstream(script);
  vi.stubGlobal("fetch", fetchMock);
  const startedAt = Date.now();
  const res = await POST(chatRequest(undefined, headers));
  const collected = drain(res);
  // Bir tık fazla: maxDuration'a dayanan bir yol olsaydı bu pencerede görünürdü.
  await vi.advanceTimersByTimeAsync(MAX_DURATION_MS + 5_000);
  const { text, closedAt } = await collected;
  return { res, text, elapsed: closedAt - startedAt, fetchMock };
}

describe("chat route — üst-akış zaman aşımı (TASK-18.11)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubEnv("GROQ_API_KEY", "test-key-not-real");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("üst-akış ilk token'ı hiç göndermezse: 200 + fallback, maxDuration'a dayanmadan", async () => {
    const { res, text, elapsed, fetchMock } = await run({ hangHeaders: true });

    expect(fetchMock).toHaveBeenCalled(); // boş kapsamda sessiz PASS yok
    expect(res.status).toBe(200);
    expect(text).toContain(FALLBACK);
    expect(elapsed).toBeLessThan(MAX_DURATION_MS);
    // 20s sınırı (ölçülen en yavaş meşru yanıt 17.4s'nin üstünde) — ne erken keser
    // ne platformun 30s duvarına dayanır.
    expect(elapsed).toBeGreaterThanOrEqual(20_000);
    expect(elapsed).toBeLessThanOrEqual(21_000);
  });

  it("akış ortada susarsa: yarım mesajda asılı kalmaz, fallback ile kapanır", async () => {
    const { res, text, elapsed, fetchMock } = await run({
      chunks: ["Spor salonunuz için ", "üyelik hatırlatmalarını"],
      chunkGapMs: 100,
      stallAfterChunks: true,
    });

    expect(fetchMock).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(text).toContain("üyelik hatırlatmalarını"); // gelen kısım korunur
    expect(text).toContain(FALLBACK); // ve kapanış metni eklenir
    expect(text.trimEnd().endsWith(FALLBACK)).toBe(true);
    // son parçadan ~5s sonra kesilir (ölçülen en büyük parça arası boşluk 73ms)
    expect(elapsed).toBeGreaterThanOrEqual(5_000);
    expect(elapsed).toBeLessThanOrEqual(6_000);
    expect(elapsed).toBeLessThan(MAX_DURATION_MS);
  });

  it("sınır-altı aralıklarla sonsuza dek damlayan akış toplam bütçede kapanır", async () => {
    const { text, elapsed, fetchMock } = await run({
      chunkGapMs: 4_000, // 5s sessizlik sınırının altında → tek başına hiç tetiklemez
      trickleForever: true,
    });

    expect(fetchMock).toHaveBeenCalled();
    expect(text).toContain(FALLBACK);
    expect(elapsed).toBeLessThan(MAX_DURATION_MS);
    expect(elapsed).toBeLessThanOrEqual(25_000); // 24s toplam bütçe + kapanış payı
  });

  it("negatif kontrol — hızlı yanıt kesilmez, fallback eklenmez", async () => {
    const { res, text, elapsed, fetchMock } = await run({
      chunks: ["Üyelik hatırlatmalarını", " ve ödeme takibini", " otomatikleştiririz."],
      chunkGapMs: 30,
    });

    expect(fetchMock).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(text).toBe("Üyelik hatırlatmalarını ve ödeme takibini otomatikleştiririz.");
    expect(text).not.toContain(FALLBACK);
    expect(elapsed).toBeLessThan(1_000);
  });

  it("negatif kontrol — ölçülen en yavaş MEŞRU yanıt (ilk token 17.4s) kesilmez", async () => {
    const { text, elapsed, fetchMock } = await run({
      headerDelayMs: 17_400, // canlı ölçüm 2026-09-12: en yavaş başarılı çağrı
      chunks: ["Yavaş ama ", "gerçek yanıt."],
      chunkGapMs: 80,
    });

    expect(fetchMock).toHaveBeenCalled();
    expect(text).toBe("Yavaş ama gerçek yanıt.");
    expect(text).not.toContain(FALLBACK);
    expect(elapsed).toBeGreaterThanOrEqual(17_400);
    expect(elapsed).toBeLessThan(MAX_DURATION_MS);
  });
});

// TASK-18.12 — hata/zaman-aşımı notu ziyaretçinin baktığı sayfanın dilinde.
// Kaynak sırası route.ts'te: Referer locale prefix'i → NEXT_LOCALE cookie → tr.
// Üst-akış hatası 429 ile üretilir: canlıda bu yolu en sık tetikleyen sınıf
// (Groq ücretsiz tier OTPM, UAT 18 senaryo 36).
describe("chat route — hata notu ziyaretçi dilinde (TASK-18.12)", () => {
  const SITE = "https://kiwiailab.com";
  /** Ziyaretçinin baktığı sayfa: TR prefixsiz (`as-needed`), diğerleri `/xx`. */
  const pageOf = (locale: string) =>
    locale === routing.defaultLocale ? `${SITE}/` : `${SITE}/${locale}`;
  const otherNotes = (locale: string) =>
    routing.locales.filter((l) => l !== locale).map(noteFor);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubEnv("GROQ_API_KEY", "test-key-not-real");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("kapsam 5 dil ve her dilin notu dolu ve birbirinden farklı (boş kapsamda sessiz PASS yok)", () => {
    expect([...routing.locales]).toEqual(["tr", "en", "ar", "de", "es"]);
    const notes = routing.locales.map(chatError);
    for (const n of notes) expect(n.length).toBeGreaterThan(20);
    expect(new Set(notes).size).toBe(routing.locales.length);
  });

  for (const locale of routing.locales) {
    it(`[${locale}] üst-akış hatası → gövdede yalnız o dilin notu, boş satırla başlamadan`, async () => {
      const upstream = failingUpstream(429);
      const { res, text } = await run(upstream, { referer: pageOf(locale) });

      expect(upstream).toHaveBeenCalledTimes(1); // gerçekten üst-akışa gidildi, retry yok
      expect(res.status).toBe(200);
      expect(text).toBe(noteFor(locale)); // ayraç yok: balonda yalnız not var
      for (const other of otherNotes(locale)) expect(text).not.toContain(other);
    });
  }

  it("Referer yoksa NEXT_LOCALE cookie'si kullanılır (başka cookie'lerin arasında)", async () => {
    const upstream = failingUpstream(429);
    const { text } = await run(upstream, {
      cookie: "theme=dark; NEXT_LOCALE=ar; umami.disabled=1",
    });
    expect(upstream).toHaveBeenCalled();
    expect(text).toBe(noteFor("ar"));
  });

  it("Referer'daki locale prefix'i cookie'yi ezer (baktığı sayfa > hatırlanan tercih)", async () => {
    const upstream = failingUpstream(429);
    const { text } = await run(upstream, {
      referer: `${SITE}/es/crew-os`,
      cookie: "NEXT_LOCALE=de",
    });
    expect(upstream).toHaveBeenCalled();
    expect(text).toBe(noteFor("es"));
  });

  it("origin'e kırpılmış Referer (path yok) prefix taşımaz → cookie'ye geçilir", async () => {
    const upstream = failingUpstream(429);
    const { text } = await run(upstream, {
      referer: `${SITE}/`,
      cookie: "NEXT_LOCALE=de",
    });
    expect(upstream).toHaveBeenCalled();
    expect(text).toBe(noteFor("de"));
  });

  const toDefault: Array<[string, Record<string, string>]> = [
    ["kaynak yok", {}],
    ["tanınmayan prefix", { referer: `${SITE}/fr/crew-os` }],
    ["bozuk Referer", { referer: "not a url" }],
    ["tanınmayan cookie değeri", { cookie: "NEXT_LOCALE=xx" }],
    ["benzer adlı başka cookie", { cookie: "XNEXT_LOCALE=en" }],
    ["prefix gibi görünen alt yol", { referer: `${SITE}/crew-os/en` }],
  ];
  for (const [label, headers] of toDefault) {
    it(`locale çözülemezse TR'ye düşer — ${label}`, async () => {
      const upstream = failingUpstream(429);
      const { res, text } = await run(upstream, headers);
      expect(upstream).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(text).toBe(noteFor(routing.defaultLocale));
    });
  }

  it("stream-ortası zaman aşımı: yarım yanıt korunur, ardına o dilin notu boş satırla eklenir", async () => {
    const { res, text, fetchMock } = await run(
      {
        chunks: ["Für Ihr Fitnessstudio ", "automatisieren wir Mitgliedschafts"],
        chunkGapMs: 100,
        stallAfterChunks: true,
      },
      { referer: `${SITE}/de` }
    );

    expect(fetchMock).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(text).toBe(
      `Für Ihr Fitnessstudio automatisieren wir Mitgliedschafts\n\n${noteFor("de")}`
    );
    for (const other of otherNotes("de")) expect(text).not.toContain(other);
  });

  it("negatif kontrol — hızlı yanıtta hiçbir dilin notu yok, akış kesilmez", async () => {
    const { text, fetchMock } = await run(
      {
        chunks: ["We automate ", "membership reminders."],
        chunkGapMs: 30,
      },
      { referer: `${SITE}/en`, cookie: "NEXT_LOCALE=en" }
    );

    expect(fetchMock).toHaveBeenCalled();
    expect(text).toBe("We automate membership reminders.");
    for (const locale of routing.locales) expect(text).not.toContain(chatError(locale));
  });
});
