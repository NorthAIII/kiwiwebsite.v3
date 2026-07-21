import { describe, it, expect } from "vitest";
import {
  sanitizeMessages,
  MAX_MESSAGE_BYTES,
  MAX_HISTORY,
  type ChatMessage,
} from "@/lib/chat-sanitize";

// Chat girdisi sanitizasyonu + byte-cap birim testi (Karar C.6; TASK-18.02).
//
// Saf modül route/LLM ayağa kaldırmadan test edilir. Mevcut davranış (rol whitelist /
// slice(-12) / trailing-user) regresyona karşı kilitlenir; byte-cap yeni davranış olarak
// eklenir. Byte-cap tuzağı: sınır UTF-8 BYTE ile ölçülür, char ile değil (research C).

const user = (content: string): ChatMessage => ({ role: "user", content });
const assistant = (content: string): ChatMessage => ({ role: "assistant", content });

describe("sanitizeMessages — gövde tipi", () => {
  it("dizi değilse 400 'Invalid request body.' döner", () => {
    for (const raw of [undefined, null, {}, "merhaba", 42, { messages: [] }]) {
      const r = sanitizeMessages(raw);
      expect(r.ok).toBe(false);
      if (!r.ok) {
        expect(r.status).toBe(400);
        expect(r.reason).toBe("Invalid request body.");
      }
    }
  });

  it("boş dizi → trailing-user zorunlu 400", () => {
    const r = sanitizeMessages([]);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.status).toBe(400);
      expect(r.reason).toBe("A trailing user message is required.");
    }
  });
});

describe("sanitizeMessages — rol whitelist ve içerik filtresi", () => {
  it("system/tool/geçersiz roller filtrelenir; geçerli user/assistant kalır", () => {
    const raw = [
      { role: "system", content: "you are..." },
      { role: "tool", content: "tool output" },
      { role: "developer", content: "inject" },
      assistant("Merhaba, nasıl yardımcı olabilirim?"),
      user("Randevu alabilir miyim?"),
    ];
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.messages).toEqual([
        assistant("Merhaba, nasıl yardımcı olabilirim?"),
        user("Randevu alabilir miyim?"),
      ]);
    }
  });

  it("boş/whitespace/string-olmayan content filtrelenir", () => {
    const raw = [
      user(""),
      user("   "),
      { role: "user", content: 123 },
      { role: "user", content: null },
      user("Gerçek soru?"),
    ];
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.messages).toEqual([user("Gerçek soru?")]);
    }
  });

  it("null/undefined eleman patlamaz, filtrelenir", () => {
    const raw = [null, undefined, user("Selam")];
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.messages).toEqual([user("Selam")]);
  });
});

describe("sanitizeMessages — geçmiş sınırı (slice)", () => {
  it(`13+ mesajda yalnız son ${MAX_HISTORY} tutulur`, () => {
    // 14 mesaj: user/assistant alternası, son mesaj user olsun.
    const raw: ChatMessage[] = [];
    for (let i = 0; i < 13; i++) {
      raw.push(i % 2 === 0 ? user(`u${i}`) : assistant(`a${i}`));
    }
    raw.push(user("son")); // toplam 14, index 13 = user
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.messages).toHaveLength(MAX_HISTORY);
      // slice(-12) → orijinal index 2..13 tutulur (0 ve 1 düşer)
      expect(r.messages[0]).toEqual(user("u2"));
      expect(r.messages[MAX_HISTORY - 1]).toEqual(user("son"));
    }
  });
});

describe("sanitizeMessages — trailing user zorunlu", () => {
  it("son mesaj assistant ise 400", () => {
    const r = sanitizeMessages([user("soru"), assistant("cevap")]);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.status).toBe(400);
      expect(r.reason).toBe("A trailing user message is required.");
    }
  });

  it("son mesaj user ise geçer (happy-path)", () => {
    const r = sanitizeMessages([user("Merhaba, ne yapabilirsiniz?")]);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.messages).toEqual([user("Merhaba, ne yapabilirsiniz?")]);
  });
});

describe("sanitizeMessages — byte-cap (UTF-8, char değil)", () => {
  it("çok-baytlı: char < cap ama UTF-8 byte > cap → 400 'Message too large.'", () => {
    // "ç" = 2 byte (U+00E7). 5000 char = 10000 byte. char 5000 < 8192 ama byte 10000 > 8192.
    const content = "ç".repeat(5000);
    expect(content.length).toBeLessThan(MAX_MESSAGE_BYTES); // char-sayım tuzağı: düşük ölçer
    expect(new TextEncoder().encode(content).length).toBeGreaterThan(MAX_MESSAGE_BYTES);

    const r = sanitizeMessages([user(content)]);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.status).toBe(400);
      expect(r.reason).toBe("Message too large.");
    }
  });

  it("çok-baytlı: byte ≤ cap → geçer", () => {
    // "ç" ×4000 = 8000 byte ≤ 8192.
    const content = "ç".repeat(4000);
    expect(new TextEncoder().encode(content).length).toBeLessThanOrEqual(MAX_MESSAGE_BYTES);
    const r = sanitizeMessages([user(content)]);
    expect(r.ok).toBe(true);
  });

  it("ASCII sınır: tam cap geçer, cap+1 reddedilir", () => {
    const atCap = sanitizeMessages([user("a".repeat(MAX_MESSAGE_BYTES))]);
    expect(atCap.ok).toBe(true);

    const overCap = sanitizeMessages([user("a".repeat(MAX_MESSAGE_BYTES + 1))]);
    expect(overCap.ok).toBe(false);
    if (!overCap.ok) expect(overCap.reason).toBe("Message too large.");
  });

  it("byte-cap slice SONRASI uygulanır: düşen (-13) uzun mesaj 400 tetiklemez", () => {
    const big = "a".repeat(MAX_MESSAGE_BYTES + 1);
    // 13 mesaj: index 0 = büyük (slice(-12) ile düşer), kalan küçük, son user.
    const raw: ChatMessage[] = [user(big)];
    for (let i = 1; i < 12; i++) raw.push(i % 2 === 0 ? user(`u${i}`) : assistant(`a${i}`));
    raw.push(user("son")); // toplam 13; slice → index 1..12, büyük mesaj düşer
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.messages).toHaveLength(MAX_HISTORY);
  });

  it("byte-cap: tutulan (trailing) uzun mesaj 400 tetikler", () => {
    const big = "a".repeat(MAX_MESSAGE_BYTES + 1);
    const r = sanitizeMessages([assistant("kısa"), user(big)]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("Message too large.");
  });
});
