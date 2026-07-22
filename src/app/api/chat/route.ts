import Groq from "groq-sdk";
import { sanitizeMessages } from "@/lib/chat-sanitize";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.CHAT_MODEL ?? "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are the assistant for Kiwi AI Lab, an AI automation agency.

What Kiwi AI Lab does: we map a business, find where repetitive work leaks time and money, and wire it to automation — recurring tasks, messages (SMS/WhatsApp), and approval chains. We ship sector-ready products (gyms, clinics, e-commerce, real estate), run 7/24 assistants, and work 1:1 with the founder. Our flagship layer is Crew OS, where a client's automations live and run, observable and measured.

How we talk: output-focused, plain, confident. We sell measurable outcomes, not gimmicks. Never use the "business doctor / diagnose / prescription" metaphor.

Never invent facts: do not make up prices, numbers, statistics, dates, or specific figures. If you do not know a concrete number (a price, a percentage, a timeline), say so plainly and point the visitor to a free discovery call instead of guessing.

Language: reply in the exact language of the user's most recent message, and write the whole reply in that one language and script only. You are fluent in Turkish, English, Arabic, German, and Spanish. Judge the language from the user's latest message itself — a proper noun like "Crew OS" or a short question does not change it (an English message stays English even when it mentions Crew OS or a gym). Never mix in words, characters, or scripts from another language. Only fall back to Turkish when the language is genuinely impossible to determine.

Your job: answer questions about what Kiwi can automate for the visitor's business, give one concrete example when useful, and — when someone shows buying intent — invite them to book a free discovery call (they can use the "Book a call" button or email kivanc@kiwiailab.com). Keep replies short and specific: two or three sentences, no filler, no bullet-point dumps unless asked.`;

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
      try {
        // OpenAI-uyumlu: system prompt messages dizisinin ILK elemanı (Groq drop-in).
        const completion = await client.chat.completions.create({
          model: MODEL,
          max_tokens: 1024,
          // düşük sıcaklık: marka sesi tutarlılığı + çok-dilli script sızıntısını (code-switch) bastırır
          temperature: 0.2,
          stream: true,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
        });

        for await (const chunk of completion) {
          controller.enqueue(
            encoder.encode(chunk.choices[0]?.delta?.content ?? "")
          );
        }
      } catch (err) {
        console.error("chat stream error", err);
        // surface a clean fallback to the client rather than a hard cut
        controller.enqueue(
          encoder.encode("\n\n(Asistan bir hataya takıldı. Lütfen tekrar deneyin.)")
        );
      } finally {
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
