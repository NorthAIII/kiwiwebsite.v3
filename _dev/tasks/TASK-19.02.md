# TASK-19.02: Origin kontrolü — saf `chat-origin` modülü + Vitest node testi

**Durum:** ⬜ Bekliyor
**Modül:** M5-Chatbot-API (modules/M5-Chatbot-API.md)
**Feature:** TB-G2 — `/api/chat` kota koruması (origin katmanı)
**Faz:** Phase 19 (phases/PHASE-19.md)
**Bağımlılıklar:** TASK-19.01 ✅ (dal `revize/v0.5-teknik-borc` açık)

---

## Hedef

`/api/chat`'in origin kuralını route'tan bağımsız, saf bir fonksiyon olarak yaz: `src/lib/chat-origin.ts`. Kuralı Vitest node testiyle mühürle. Bu task route'a dokunmaz; bağlama TASK-19.03'tedir. Task, kural matrisinin her satırı testte geçtiğinde biter.

---

## Bağlam

TB-G2 iki katmanlıdır (discuss kararı). Origin kontrolü, yabancı bir sitenin chatbot'u ziyaretçinin tarayıcısından kullanmasını kapatır. curl iki başlığı da sahteleyebilir; o yolun kapısı WAF hız sınırıdır (TASK-19.04/19.06). Biri ötekinin yerini tutmaz.

Research elle tutulan host listesi yerine **same-origin kuralını** seçti, çünkü canlıda üç host 200 dönüyor: `kiwiailab.com`, yönlendirmesiz `www.kiwiailab.com` ve `kiwi-ai-lab-v3.vercel.app`. Kural bunların hepsini ve `localhost`'u listesiz kapsar, yeni alias'ta bayatlamaz (DECISIONS 2026-10-02 — kota koruması kararı).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-19.md` → Araştırma Bulguları → "TB-G2 — origin kontrolü" + Teknik Kararlar → "Origin kontrolü kodda, same-origin kuralıyla"
- `_dev/docs/DECISIONS.md` → 2026-10-02 "`/api/chat` kota koruması" kararı
- `src/lib/chat-sanitize.ts` — saf modül deseni (başlık yorumu, sabitler, tek sorumluluk)
- `tests/chat-sanitize.test.ts` — Vitest node test deseni

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-19.md` — Task Listesi tablosunda durum

---

## Alt Görevler

- [ ] **1. Modülü yaz — `src/lib/chat-origin.ts`**
  - İmza: `export function isSameOriginRequest(headers: Headers): boolean`. Yalnız `Headers` alır, `Request`'e ya da Next'e bağımlı değildir.
  - Kural (DECISIONS 2026-10-02):
    1. `Origin` başlığı var ve `null` değilse → `new URL(origin).host`, isteğin `host` başlığına eşit olmalı. Karşılaştırma küçük harfle yapılır; port dahil (`localhost:3000`), şema karşılaştırılmaz. Parse edilemeyen `Origin` → `false`.
    2. `Origin` yoksa ya da değeri `null` dizgesiyse → yalnız `Sec-Fetch-Site: same-origin` kabul edilir. Bu başlık tarayıcıda JS ile set edilemez; gizlilik ayarı yüzünden Origin'i düşen meşru tarayıcıyı korur.
    3. `host` başlığı yoksa → `false`.
    4. Diğer her durum → `false`.
  - Başlık yorumu: kuralı, neden liste değil same-origin olduğunu, neden `Sec-Fetch-Site`'ın yedek olduğunu ve "curl iki başlığı da sahteler, o yolun kapısı WAF" sınırını yaz. Kaynak: DECISIONS 2026-10-02. `chat-sanitize.ts`'in yorum yoğunluğunu izle.

- [ ] **2. Testi yaz — `tests/chat-origin.test.ts`**
  - Kabul edilenler:
    - `Origin: https://kiwiailab.com` + `host: kiwiailab.com`
    - `www` ve `vercel.app` eşleşmeleri
    - `Origin: http://localhost:3000` + `host: localhost:3000`
    - Büyük/küçük harf farkı (`host: KiwiAILab.com`)
    - `Origin` yok + `Sec-Fetch-Site: same-origin`
    - `Origin: null` + `Sec-Fetch-Site: same-origin`
  - Reddedilenler:
    - Yabancı Origin (`https://evil.example`) — UAT 18 senaryo 23'ün vektörü
    - Alt alan adı / benzer ad (`https://kiwiailab.com.evil.example`, `https://evilkiwiailab.com`)
    - Port farkı (`http://localhost:3001` ↔ `localhost:3000`)
    - Origin yok + `Sec-Fetch-Site` yok (curl) · `cross-site` · `same-site` · `none`
    - `Origin: null` + `Sec-Fetch-Site` yok
    - Parse edilemeyen Origin (`not a url`)
    - `host` başlığı yok
    - Eşleşen Origin + `Sec-Fetch-Site: cross-site` (Origin kuralı belirleyicidir → kabul). Bu satırı açıkça test et ki kuralın önceliği sabitlensin.

---

## Etkilenen Dosyalar

```
src/lib/
└── chat-origin.ts          # YENİ — saf origin kuralı
tests/
└── chat-origin.test.ts     # YENİ — Vitest node
```

---

## Dikkat Noktaları

- **Kural tek kaynak:** DECISIONS 2026-10-02. Elle host listesi **yazma** (research'te elendi).
- **`host` başlığının Vercel'de herkese açık host'u taşıması beklenir, henüz ölçülmedi** (research → Uygulama tuzakları). İlk ölçüm TASK-19.07'nin birleştirme öncesi preview probu, son ölçüm canlıdadır. Bu task'ta `x-forwarded-host`'a geçme ya da onu ekleme; kural `host` der. Canlıda varsayım çürürse bu bir plan revizyonu tetikleyicisidir.
- **Saf modül:** çalışma anı yan etkisi, log ya da env okuma yok. Red logu route'ta yazılır (TASK-19.03).
- `Headers.get` büyük/küçük harf duyarsızdır; testte başlık adlarını farklı yazmak kuralı test etmez, **değerlerin** harf farkını test et.

---

## Test Kriterleri

- [ ] `npx vitest run tests/chat-origin.test.ts` → yukarıdaki kabul/ret matrisinin tamamı geçiyor.
- [ ] `npm run test` → mevcut testler + yeni test geçiyor (kümülatif; sayı oturum kaydına).
- [ ] `npm run build` temiz (strict tip kontrolü `tests/` dahil).

---

## Tamamlanma Kriterleri

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (`revize/v0.5-teknik-borc`)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

_(task çalıştırıldığında doldurulur)_

---

**Oluşturulma:** 2026-10-02
