import { describe, it, expect } from "vitest";
import {
  sanitizeMessages,
  MAX_MESSAGE_BYTES,
  MAX_HISTORY,
  MAX_INCOMING_MESSAGES,
  MAX_TOTAL_BYTES,
  type ChatMessage,
} from "@/lib/chat-sanitize";

// Chat girdisi sanitizasyonu + byte-cap birim testi (Karar C.6; TASK-18.02).
//
// Saf modül route/LLM ayağa kaldırmadan test edilir. Mevcut davranış (rol whitelist /
// slice(-12) / trailing-user) regresyona karşı kilitlenir; byte-cap yeni davranış olarak
// eklenir. Byte-cap tuzağı: sınır UTF-8 BYTE ile ölçülür, char ile değil (research C).
//
// TASK-18.09 eki: alan daraltma + hacim sınırları (UAT 18 senaryo 20/21 regresyon ağı).

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

describe("sanitizeMessages — alan daraltma (UAT 18 senaryo 20)", () => {
  it("istemcinin ek alanları elenir: çıkan nesne tam olarak {role, content}", () => {
    const raw = [
      {
        role: "user",
        content: "Selam",
        name: "admin",
        tool_calls: [{ id: "call_1", function: { name: "drop_table" } }],
        zzz: "serbest alan",
      },
    ];
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(Object.keys(r.messages[0]).sort()).toEqual(["content", "role"]);
      expect(r.messages[0]).toEqual(user("Selam"));
    }
  });

  it("her mesaj yeniden kurulur: girdi nesnesi mutasyona uğramaz, referans paylaşılmaz", () => {
    const original = { role: "user" as const, content: "Merhaba", name: "admin" };
    const r = sanitizeMessages([original]);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.messages[0]).not.toBe(original);
      expect(original.name).toBe("admin"); // girdi olduğu gibi kalır
    }
  });

  it("content yalnız BİR kez okunur: getter ikinci okumada cap'i aşamaz", () => {
    // JSON.parse getter üretmez (HTTP üzerinden erişilemez) ama nesnenin yeniden
    // kurulması bu yüzeyi de kapatır — tek okuma sözleşmesinin regresyon ağı.
    let reads = 0;
    const sneaky = {
      role: "user" as const,
      get content() {
        reads += 1;
        return reads === 1 ? "kısa" : "a".repeat(MAX_MESSAGE_BYTES + 1);
      },
    };
    const r = sanitizeMessages([sneaky]);
    expect(reads).toBe(1);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.messages).toEqual([user("kısa")]);
  });
});

describe("sanitizeMessages — hacim sınırları (UAT 18 senaryo 21)", () => {
  it(`ham dizi ${MAX_INCOMING_MESSAGES} mesajı aşarsa 400 'Too many messages.'`, () => {
    const raw = Array.from({ length: MAX_INCOMING_MESSAGES + 1 }, (_, i) => user(`m${i}`));
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.status).toBe(400);
      expect(r.reason).toBe("Too many messages.");
    }
  });

  it("sayı kapısı filtreden ÖNCE çalışır: tümü geçersiz dev dizi de reddedilir", () => {
    // Kapı slice sonrasına bırakılsaydı bu dizi tümüyle taranıp trailing-user 400'ü verirdi.
    const raw = Array.from({ length: MAX_INCOMING_MESSAGES + 1 }, () => ({
      role: "system",
      content: "x",
    }));
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("Too many messages.");
  });

  it(`tam ${MAX_INCOMING_MESSAGES} mesaj geçer (sınır kapsayıcı)`, () => {
    const raw = Array.from({ length: MAX_INCOMING_MESSAGES }, (_, i) => user(`m${i}`));
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.messages).toHaveLength(MAX_HISTORY); // slice hâlâ 12'ye iner
  });

  it("her mesaj per-mesaj cap'in ALTINDA ama toplam sınırı aşıyorsa 400 'Conversation too large.'", () => {
    // 12 × 4096 = 49.152 byte: hiçbiri 8192'yi aşmaz, toplam 16.384'ü aşar.
    const chunk = "a".repeat(4096);
    const raw: ChatMessage[] = [];
    for (let i = 0; i < 11; i++) raw.push(i % 2 === 0 ? user(chunk) : assistant(chunk));
    raw.push(user(chunk));
    expect(raw.every((m) => new TextEncoder().encode(m.content).length <= MAX_MESSAGE_BYTES)).toBe(
      true
    );

    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.status).toBe(400);
      expect(r.reason).toBe("Conversation too large.");
    }
  });

  it("aynı yapı toplam sınırın altındayken geçer", () => {
    // 12 × 1024 = 12.288 byte ≤ 16.384.
    const chunk = "a".repeat(1024);
    const raw: ChatMessage[] = [];
    for (let i = 0; i < 11; i++) raw.push(i % 2 === 0 ? user(chunk) : assistant(chunk));
    raw.push(user(chunk));
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.messages).toHaveLength(MAX_HISTORY);
  });

  it("toplam byte çok-baytlı ölçülür: char toplamı sınırın altında ama byte üstünde → 400", () => {
    // "ç" = 2 byte. 12 × 1000 char = 12.000 char (< 16.384) ama 24.000 byte (> 16.384).
    const chunk = "ç".repeat(1000);
    const raw: ChatMessage[] = [];
    for (let i = 0; i < 11; i++) raw.push(i % 2 === 0 ? user(chunk) : assistant(chunk));
    raw.push(user(chunk));
    expect(raw.reduce((n, m) => n + m.content.length, 0)).toBeLessThan(MAX_TOTAL_BYTES);

    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe("Conversation too large.");
  });

  it("toplam sınır slice SONRASI ölçülür: düşen eski mesajlar toplama sayılmaz", () => {
    // 13 mesaj: ilki 8192 byte (slice ile düşer), kalan 12 küçük → toplam sınırın altında.
    const raw: ChatMessage[] = [user("a".repeat(MAX_MESSAGE_BYTES))];
    for (let i = 1; i < 12; i++) raw.push(i % 2 === 0 ? user(`u${i}`) : assistant(`a${i}`));
    raw.push(user("son"));
    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
  });
});

describe("sanitizeMessages — negatif kontrol: meşru trafik kesilmiyor", () => {
  it("gerçek 12 mesajlık TR sohbeti (~2KB) geçer", () => {
    // Ölçüm (TASK-18.09): gerçekçi 12 turlu TR sohbeti 1.968 byte — sınıra ~8× pay.
    // Sohbet bot karşılamasıyla başlar, ziyaretçi sorusuyla biter (trailing-user).
    const turns = [
      "Merhaba! Kiwi AI Lab asistanıyım, işinizde neyi otomatikleştirebileceğimize bakalım.",
      "Merhaba, spor salonum için neler yapabilirsiniz?",
      "Spor salonları için üyelik hatırlatmaları, doğum günü mesajları ve ödeme takibini otomatikleştiriyoruz. Üyelerinize otomatik mesajlar gider, siz de hangi üyenin ne zaman döndüğünü tek panelden görürsünüz.",
      "Peki bu sistem mevcut üyelik yazılımımızla konuşabilir mi? Şu an Excel kullanıyoruz.",
      "Evet, mevcut verinizi aktarıp çalışan sistemlerinizle bağlantı kurabiliriz. Excel tabanlı listeler için otomatik içe aktarma kuruyoruz.",
      "Kurulum ne kadar sürer?",
      "Süre kapsamla değişir, bu yüzden şu an somut bir gün sayısı vermek doğru olmaz. Keşif görüşmesinde bunu netleştirebiliriz.",
      "Peki fiyatlandırma nasıl işliyor?",
      "Fiyatı kapsamı görmeden söylemek doğru olmaz. Kaç otomasyon ve hangi entegrasyonlar gerektiğine göre birlikte bir teklif çıkarıyoruz.",
      "Crew OS tam olarak nedir?",
      "Crew OS, kurduğumuz otomasyonların yaşadığı ve çalıştığı bayrak katmanımız. Hangi otomasyonun ne zaman çalıştığını tek yerden izlenebilir hâle getiriyor.",
      "Tamam, görüşme ayarlayalım. Nasıl ilerleyelim?",
    ];
    const raw = turns.map((t, i) => (i % 2 === 0 ? assistant(t) : user(t)));
    expect(raw).toHaveLength(MAX_HISTORY);
    const totalBytes = raw.reduce((n, m) => n + new TextEncoder().encode(m.content).length, 0);
    expect(totalBytes).toBeLessThan(MAX_TOTAL_BYTES / 4); // meşru trafik sınırın çok altında

    const r = sanitizeMessages(raw);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.messages).toHaveLength(MAX_HISTORY);
  });

  it("kısa sohbet + tek 8KB'lık meşru uzun mesaj hâlâ geçer", () => {
    const r = sanitizeMessages([
      user("Merhaba"),
      assistant("Merhaba, nasıl yardımcı olabilirim?"),
      user("a".repeat(MAX_MESSAGE_BYTES)),
    ]);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.messages).toHaveLength(3);
  });
});
