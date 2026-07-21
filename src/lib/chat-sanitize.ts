// Chat girdisi sanitizasyonu + per-mesaj byte-cap (saf modül, Karar C.6).
//
// `/api/chat` route'unun inline sanitizasyonu buraya çıkarıldı ki LLM/route ayağa
// kaldırmadan Vitest node ile birim-test edilebilsin (QUALITY §5/§8; TASK-5 deseni).
// Provider-agnostik: yalnız istemciden gelen `messages` payload'ını doğrular.
//
// Byte-cap tuzağı (research C): sınır UTF-8 BYTE ile ölçülür, karakter ile değil —
// TR/AR çok-baytlı karakterlerde char-sayımı düşük ölçer, byte doğru sınırdır.
// Cap `slice(-MAX_HISTORY)` SONRASI tutulan sete uygulanır: history de istemciden
// gelir/güvenilmez, ama slice ile düşen eski mesaj token-yakmaz → yalnız tutulanı sınırla.

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Tek mesaj için üst sınır (UTF-8 byte). ~1500 kelime; meşru ziyaretçi paragrafı <1KB. */
export const MAX_MESSAGE_BYTES = 8192;
/** İstemciden tutulan azami geçmiş mesaj sayısı (token/bağlam sınırı). */
export const MAX_HISTORY = 12;

export type SanitizeResult =
  | { ok: true; messages: ChatMessage[] }
  | { ok: false; status: 400; reason: string };

const encoder = new TextEncoder();

/**
 * İstemciden gelen ham `messages` payload'ını API'nin beklediği şekle indirger.
 * Başarısızlıkta istek gövdesi 400 ile açıkça reddedilir (sessiz kırpma yok).
 */
export function sanitizeMessages(raw: unknown): SanitizeResult {
  // (a) dizi değilse → geçersiz gövde
  if (!Array.isArray(raw)) {
    return { ok: false, status: 400, reason: "Invalid request body." };
  }

  // (b) rol whitelist (user/assistant) + string içerik + boş-olmayan filtre
  const filtered = raw.filter(
    (m): m is ChatMessage =>
      (m?.role === "user" || m?.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0
  );

  // (c) geçmiş uzunluğunu sınırla (son MAX_HISTORY mesaj)
  const messages = filtered.slice(-MAX_HISTORY);

  // (d) byte-cap — tutulan mesajlardan herhangi biri sınırı aşarsa reddet
  for (const m of messages) {
    if (encoder.encode(m.content).length > MAX_MESSAGE_BYTES) {
      return { ok: false, status: 400, reason: "Message too large." };
    }
  }

  // (e) boş veya son mesaj kullanıcıdan değilse → trailing-user zorunlu
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return { ok: false, status: 400, reason: "A trailing user message is required." };
  }

  // (f) geçerli
  return { ok: true, messages };
}
