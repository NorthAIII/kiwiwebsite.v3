import Groq from "groq-sdk";
import { sanitizeMessages } from "@/lib/chat-sanitize";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.CHAT_MODEL ?? "qwen/qwen3.8-27b";

// Üst-akış zaman aşımı (TASK-18.11). Değerler tahminle değil ölçümle seçildi —
// canlı 20 çağrı (2026-09-12): ilk-token p50 369ms · p90 7.4s · en yavaş BAŞARILI
// yanıt 17.4s; parçalar arası en büyük boşluk 73ms; 20 çağrının 1'i 30s'de 504.
// Platformun maxDuration=30'u tek kapı olduğunda fonksiyon öldürülür ve aşağıdaki
// catch HİÇ çalışmaz — ziyaretçi 30s bekleyip ham 504 alır. Bu sınırlar o kapıdan
// önce devreye girer, böylece asılı çağrı bizim fallback metnimizle kapanır.
const FIRST_TOKEN_TIMEOUT_MS = 20_000; // ölçülen en yavaş meşru yanıtın (17.4s) üstünde
const STREAM_IDLE_TIMEOUT_MS = 5_000; // ölçülen en büyük parça arası boşluğun (73ms) ~68 katı
const TOTAL_BUDGET_MS = 24_000; // hiçbir bileşim maxDuration=30'a yaklaşamasın

const FALLBACK_MESSAGE = "\n\n(Asistan bir hataya takıldı. Lütfen tekrar deneyin.)";

const SYSTEM_PROMPT = `You are the assistant for Kiwi AI Lab, an AI automation agency.

What Kiwi AI Lab does: we map a business, find where repetitive work leaks time and money, and wire it to automation — recurring tasks, messages (SMS/WhatsApp), and approval chains. We ship sector-ready products (gyms, clinics, e-commerce, real estate), run 7/24 assistants, and work 1:1 with the founder. Our flagship layer is Crew OS, where a client's automations live and run, observable and measured.

How we talk: output-focused, plain, confident. We sell measurable outcomes, not gimmicks. Never use the "business doctor / diagnose / prescription" metaphor.

Never invent facts: do not make up prices, numbers, statistics, dates, or specific figures. If you do not know a concrete number (a price, a percentage, a timeline), say so plainly and point the visitor to a free discovery call instead of guessing.

Language: reply in the exact language of the user's most recent message, and write the whole reply in that one language and script only. You are fluent in Turkish, English, Arabic, German, and Spanish. Judge the language from the user's latest message itself — a proper noun like "Crew OS" or a short question does not change it (an English message stays English even when it mentions Crew OS or a gym). Never mix in words, characters, or scripts from another language. Only fall back to Turkish when the language is genuinely impossible to determine.

How to address the visitor: match the level of address the site itself uses — formal in Turkish (siz) and German (Sie), informal in Spanish (tú), second-person singular in Arabic, neutral in English. Keep one level of address through the whole reply.

Your job: answer questions about what Kiwi can automate for the visitor's business, give one concrete example when useful, and — when someone shows buying intent — invite them to book a free discovery call (they can use the free discovery call button on the page or email kivanc@kiwiailab.com). Refer to that button by what it does, in the language of your reply — never quote a button label in quotation marks or in another language. Keep replies short and specific: two or three sentences, no filler, no bullet-point dumps unless asked.`;

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response("Chat provider is not configured.", { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  // sanitize + byte-cap (saf modül; whitelist/slice(-12)/trailing-user korunur, byte-cap eklenir)
  const result = sanitizeMessages((body as { messages?: unknown } | null)?.messages);
  if (!result.ok) {
    return new Response(result.reason, { status: result.status });
  }
  const sanitized = result.messages;

  const client = new Groq({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Tek iptal sinyali, yeniden kurulabilir bekçi: ilk token için uzun,
      // parçalar arası sessizlik için kısa sınır — ikisi de aynı controller'ı
      // iptal eder ve toplam bütçeyle kırpılır.
      const upstream = new AbortController();
      const startedAt = Date.now();
      let timedOut = false;
      let watchdog: ReturnType<typeof setTimeout> | undefined;

      const arm = (ms: number) => {
        clearTimeout(watchdog);
        const budgetLeft = TOTAL_BUDGET_MS - (Date.now() - startedAt);
        watchdog = setTimeout(
          () => {
            timedOut = true;
            upstream.abort();
          },
          Math.max(0, Math.min(ms, budgetLeft))
        );
      };

      try {
        arm(FIRST_TOKEN_TIMEOUT_MS);
        // OpenAI-uyumlu: system prompt messages dizisinin ILK elemanı (Groq drop-in).
        const completion = await client.chat.completions.create({
          model: MODEL,
          // 512 üst sınır değil zorunluluk: Groq ücretsiz tier bu modelde dakikada
          // 1000 çıktı token'ı veriyor (OTPM) ve max_tokens'ı peşin rezerve ediyor —
          // 1024 istemek her çağrıyı 429 ile reddettiriyordu. Yanıtlar zaten 2-3 cümle
          // (ölçülen en uzun çıktı ~509 karakter); düşük değer eşzamanlı ziyaretçi
          // kapasitesini de artırır. Yükseltme = canlı chatbot'u kırar.
          max_tokens: 512,
          // düşük sıcaklık: marka sesi tutarlılığı + çok-dilli script sızıntısını (code-switch) bastırır
          temperature: 0.2,
          stream: true,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
        }, {
          signal: upstream.signal,
          // Retry KAPALI: SDK varsayılanı 2 ve yeniden deneme uykusu üst-akışın
          // `retry-after` başlığını dinliyor — ücretsiz tier kota dolduğunda bu
          // dakikalar sürebilir ve uyku bizim AbortSignal'imizle kesilemez, yani
          // retry ziyaretçiyi tam da kaldırdığımız 30s duvarına iter. Zarif
          // degradasyon zaten bizde: hata anında fallback metni akar.
          maxRetries: 0,
        });

        for await (const chunk of completion) {
          arm(STREAM_IDLE_TIMEOUT_MS);
          controller.enqueue(
            encoder.encode(chunk.choices[0]?.delta?.content ?? "")
          );
        }

        // Akış ortasında iptal ettiysek buraya SESSİZCE düşeriz: groq-sdk'nın SSE
        // iteratörü abort'u yutar (Stream.fromSSEResponse → `if (isAbortError(e)) return`),
        // yani catch çalışmaz. Fallback burada enqueue edilmezse ziyaretçi yarım
        // cümlede asılı kalır.
        if (timedOut) {
          console.error(
            `chat stream timeout (mid-stream) after ${Date.now() - startedAt}ms`
          );
          controller.enqueue(encoder.encode(FALLBACK_MESSAGE));
        }
      } catch (err) {
        console.error(
          timedOut
            ? `chat stream timeout (no first token) after ${Date.now() - startedAt}ms`
            : "chat stream error",
          err
        );
        // surface a clean fallback to the client rather than a hard cut
        controller.enqueue(encoder.encode(FALLBACK_MESSAGE));
      } finally {
        clearTimeout(watchdog);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
