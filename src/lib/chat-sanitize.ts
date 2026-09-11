// Chat girdisi sanitizasyonu + hacim sınırları (saf modül, Karar C.6).
//
// `/api/chat` route'unun inline sanitizasyonu buraya çıkarıldı ki LLM/route ayağa
// kaldırmadan Vitest node ile birim-test edilebilsin (QUALITY §5/§8; TASK-5 deseni).
// Provider-agnostik: yalnız istemciden gelen `messages` payload'ını doğrular.
//
// Byte-cap tuzağı (research C): sınır UTF-8 BYTE ile ölçülür, karakter ile değil —
// TR/AR çok-baytlı karakterlerde char-sayımı düşük ölçer, byte doğru sınırdır.
// Per-mesaj cap `slice(-MAX_HISTORY)` SONRASI tutulan sete uygulanır: history de
// istemciden gelir/güvenilmez, ama slice ile düşen eski mesaj token-yakmaz.
//
// Üç sınır birlikte çalışır ve hiçbiri diğerinin yerini tutmaz (UAT 18 senaryo 20/21):
//   - MAX_MESSAGE_BYTES  → tek uzun mesaj vektörü
//   - MAX_TOTAL_BYTES    → çok sayıda sınır-altı mesajın toplamı (sağlayıcı TPM kotası)
//   - MAX_INCOMING_MESSAGES → dev dizinin taranması (slice ÖNCESİ, ham dizide)
// Ayrıca her mesaj `{role, content}` olarak YENİDEN KURULUR: istemcinin eklediği
// başka hiçbir alan (`name`, `tool_calls`, serbest alan) sağlayıcı payload'ına geçmez.

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Tek mesaj için üst sınır (UTF-8 byte). ~1500 kelime; meşru ziyaretçi paragrafı <1KB. */
export const MAX_MESSAGE_BYTES = 8192;
/** İstemciden tutulan azami geçmiş mesaj sayısı (token/bağlam sınırı). */
export const MAX_HISTORY = 12;
/**
 * Ham dizinin azami uzunluğu — filtreden ÖNCE bakılır, yoksa dev dizi yine tümüyle
 * taranır. `MAX_HISTORY`'ye (12) bol pay: filtre boş/geçersiz mesajları eleyeceği için
 * meşru istemci sınırın çok altında kalır.
 */
export const MAX_INCOMING_MESSAGES = 100;
/**
 * Tutulan mesajların `content` byte toplamı için üst sınır (2 × per-mesaj cap).
 * Gerekçe: 12 × 8192 = 98KB (~25k token) tek istekte sağlayıcıya gidip ücretsiz
 * tier'ın dakikalık token bütçesini (8.000 TPM) tek çağrıda yakardı. Ölçüm: gerçek
 * 12 mesajlık TR sohbeti ≈ 2KB → 16384 meşru trafiğe ~8× pay bırakır.
 */
export const MAX_TOTAL_BYTES = 16384;

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

  // (b) hacim kapısı — dev diziyi taramadan reddet (slice sonrasına bırakılamaz)
  if (raw.length > MAX_INCOMING_MESSAGES) {
    return { ok: false, status: 400, reason: "Too many messages." };
  }

  // (c) rol whitelist (user/assistant) + string/boş-olmayan içerik + {role, content}'e
  //     indirgeme. Alanlar birer kez okunur, sonra nesne yeniden kurulur: getter taşıyan
  //     bir girdi cap'i atlatamaz ve istemcinin ek alanları payload'a sızamaz.
  const filtered: ChatMessage[] = [];
  for (const m of raw) {
    const role = (m as ChatMessage | null | undefined)?.role;
    if (role !== "user" && role !== "assistant") continue;
    const content = (m as ChatMessage).content;
    if (typeof content !== "string" || content.trim().length === 0) continue;
    filtered.push({ role, content });
  }

  // (d) geçmiş uzunluğunu sınırla (son MAX_HISTORY mesaj)
  const messages = filtered.slice(-MAX_HISTORY);

  // (e) byte sınırları — per-mesaj cap + tutulan setin toplamı
  let totalBytes = 0;
  for (const m of messages) {
    const bytes = encoder.encode(m.content).length;
    if (bytes > MAX_MESSAGE_BYTES) {
      return { ok: false, status: 400, reason: "Message too large." };
    }
    totalBytes += bytes;
    if (totalBytes > MAX_TOTAL_BYTES) {
      return { ok: false, status: 400, reason: "Conversation too large." };
    }
  }

  // (f) boş veya son mesaj kullanıcıdan değilse → trailing-user zorunlu
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return { ok: false, status: 400, reason: "A trailing user message is required." };
  }

  // (g) geçerli
  return { ok: true, messages };
}
