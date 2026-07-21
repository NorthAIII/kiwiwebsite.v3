import Anthropic from "@anthropic-ai/sdk";
import { sanitizeMessages } from "@/lib/chat-sanitize";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.CHAT_MODEL ?? "claude-opus-4-8";

const SYSTEM_PROMPT = `You are the assistant for Kiwi AI Lab, an AI automation agency.

What Kiwi AI Lab does: we map a business, find where repetitive work leaks time and money, and wire it to automation — recurring tasks, messages (SMS/WhatsApp), and approval chains. We ship sector-ready products (gyms, clinics, e-commerce, real estate), run 7/24 assistants, and work 1:1 with the founder. Our flagship layer is Crew OS, where a client's automations live and run, observable and measured.

How we talk: output-focused, plain, confident. We sell measurable outcomes, not gimmicks. Never use the "business doctor / diagnose / prescription" metaphor.

Language: detect the user's language and reply natively in it. You support English, Arabic, German, and Spanish fluently. Default to English if the language is unclear.

Your job: answer questions about what Kiwi can automate for the visitor's business, give one concrete example when useful, and — when someone shows buying intent — invite them to book a free discovery call (they can use the "Book a call" button or email kivanc@kiwiailab.com). Keep replies short and specific: two or three sentences, no filler, no bullet-point dumps unless asked.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("ANTHROPIC_API_KEY is not configured.", { status: 503 });
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

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const claude = client.messages.stream({
          model: MODEL,
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: sanitized,
        });

        for await (const event of claude) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("chat stream error", err);
        // surface a clean fallback to the client rather than a hard cut
        controller.enqueue(
          encoder.encode("\n\n(The assistant hit an error. Please try again.)")
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
