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
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/chat/route";

const FALLBACK = "(Asistan bir hataya takıldı. Lütfen tekrar deneyin.)";
/** route.ts → `export const maxDuration = 30`; hiçbir yol buna dayanmamalı. */
const MAX_DURATION_MS = 30_000;

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

function chatRequest(content = "Spor salonum için ne yapabilirsiniz?") {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content }] }),
  });
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
async function run(script: UpstreamScript) {
  const fetchMock = fakeUpstream(script);
  vi.stubGlobal("fetch", fetchMock);
  const startedAt = Date.now();
  const res = await POST(chatRequest());
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
