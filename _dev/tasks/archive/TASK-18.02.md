# TASK-18.02: Sanitize + byte-cap saf modül + Vitest node testleri

**Durum:** ✅ Tamamlandı
**Modül:** M5-Chatbot-API (+M6 test altyapısı)
**Feature:** C1 (girdi sertleştirme + test edilebilirlik — Karar C.6)
**Faz:** Phase 18 (phases/PHASE-18.md)
**Bağımlılıklar:** TASK-18.01 ✅ (v0.5 branch aktif)

---

## Hedef

`route.ts` içindeki inline sanitizasyon mantığını saf, export edilen bir fonksiyona (`src/lib/chat-sanitize.ts` YENİ) çıkar ve discuss/research'te kararlaştırılan **per-mesaj byte-cap** sertleştirmesini ekle (aşılırsa 400 reddet). Fonksiyon Vitest node ile birim-test edilir (LLM/route ayağa kaldırmadan). Bu aşamada `route.ts` **hâlâ Anthropic** — yalnız girdi katmanı refactor + byte-cap eklenir (provider-agnostik). Tamamlanma: modül + testler yeşil, `next build` temiz, mevcut sanitizasyon davranışı korunur.

---

## Bağlam

**Karar C.6:** sanitizasyon + byte-cap saf fonksiyona çıkarılır (TASK-5 Vitest node deseni; QUALITY §5/§8 + kullanıcı test tercihi). **Karar C (research):** byte-cap her TUTULAN mesaja uygulanır — yalnız trailing değil, çünkü history de istemciden gelir/güvenilmez. Ölçüm **UTF-8 byte** (`new TextEncoder().encode(content).length`), **char değil** — TR/AR çok-baytlı karakterde char-sayımı düşük ölçer (byte doğru sınır). Öneri **8192 byte** (~1500 kelime; meşru ziyaretçi paragrafı <1KB) — tek-mesaj token-yakma/DoS vektörünü kapatır, bol pay bırakır. Provider swap (18.03) öncesi bu task girdi katmanını izole eder → risk ayrışır.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` — Karar C.6 + Dikkat: byte-cap (UTF-8, tutulan tüm mesajlar)
- `_dev/docs/TESTING.md` — Vitest node katmanı + kümülatif beklenti + test yerleri
- `src/app/api/chat/route.ts` — mevcut inline sanitizasyon (satır 34-46): rol whitelist, boş filtre, slice(-12), trailing-user zorunlu

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [x] **1. Saf modül oluştur — `src/lib/chat-sanitize.ts` (YENİ)**
  - `export type ChatMessage = { role: "user" | "assistant"; content: string }`
  - `export const MAX_MESSAGE_BYTES = 8192`, `export const MAX_HISTORY = 12`
  - `export function sanitizeMessages(raw: unknown): SanitizeResult` — discriminated: `{ ok: true; messages: ChatMessage[] } | { ok: false; status: 400; reason: string }`
  - Mantık sırası: (a) dizi değilse → `{ok:false,400,"Invalid request body."}`; (b) rol whitelist (user/assistant) + `typeof content==="string"` + `trim().length>0` filtre; (c) `slice(-MAX_HISTORY)`; (d) **byte-cap:** tutulan mesajlardan herhangi birinin `content` UTF-8 byte'ı > `MAX_MESSAGE_BYTES` → `{ok:false,400,"Message too large."}`; (e) boş veya son mesaj `role!=="user"` → `{ok:false,400,"A trailing user message is required."}`; (f) aksi → `{ok:true,messages}`

- [x] **2. route.ts'i modüle bağla**
  - Dosya: `src/app/api/chat/route.ts`
  - `body.messages` parse'ından sonra inline filter/slice/trailing bloğunu (satır 34-46) `sanitizeMessages(...)` çağrısıyla değiştir; `!result.ok` → `new Response(result.reason, { status: result.status })`
  - Anthropic client/stream/system kısmı **bu task'ta değişmez** (sadece sanitize + byte-cap 400)

- [x] **3. Vitest node testi — `tests/chat-sanitize.test.ts` (YENİ)**
  - Rol whitelist (system/tool/geçersiz rol filtrelenir), boş/whitespace content filtre, `slice(-12)` (13+ mesajda son 12), trailing-user-yok → 400, dizi-değil → 400, happy-path → ok:true
  - **Çok-baytlı byte-cap:** char sayısı <8192 ama UTF-8 byte >8192 olan TR/AR string → `{ok:false,400}` (char-sayım tuzağı yakalanır); byte ≤8192 → geçer
  - **Pozisyon:** position -13'teki dev mesaj (slice ile drop edilen) 400 tetiklemez; trailing dev mesaj tetikler

---

## Etkilenen Dosyalar

```
src/
├── app/api/chat/route.ts        # sanitize inline → modül çağrısı; byte-cap 400 (Anthropic kısmı değişmez)
└── lib/chat-sanitize.ts         # YENİ — saf fonksiyon (route + test ortak import)
tests/
└── chat-sanitize.test.ts        # YENİ — Vitest node
```

---

## Dikkat Noktaları

- **Byte-cap UTF-8 byte ile** (char değil) — TR/AR düşük-ölçme tuzağı (research C). `new TextEncoder().encode(content).length`.
- **Byte-cap `slice(-12)` SONRASI tutulan sete uygulanır** — drop edilen -13 mesaj 400 tetiklemez; trailing/tutulan uzun mesaj yakalanır (research: history istemciden gelir/güvenilmez).
- **400 reddet → generic offline:** `Chatbot.tsx:38` `!res.ok` olan her yanıtı offline (`t("error")`) sayar → byte-cap 400'ü ayrı "mesaj çok uzun" UX'i olarak göstermez. UI dokunulmaz kararıyla tutarlı; plan/verify ayrı UX beklememeli (research Dikkat).
- **Mevcut davranış korunur:** rol whitelist / slice(-12) / trailing-user aynen; yalnız byte-cap eklenir. Testler regresyonu yakalar.
- **Kümülatif test ilkesi:** bu feature kendi Vitest node testini ekler (QUALITY §8, ILKELER — test atlanmaz, üstüne koyar).

---

## Test Kriterleri

- [x] `npm run test` — yeni `chat-sanitize.test.ts` yeşil; mevcut testler (i18n parite, smoke) kırılmaz.
- [x] `next build` temiz (route refactor tip-güvenli).
- [x] Çok-baytlı byte-cap testi: char <8192 ama UTF-8 byte >8192 olan TR/AR string → ok:false 400 (char-sayım tuzağı kanıtlanır); byte ≤8192 → geçer.

---

## Karar Noktaları

- **Byte-cap değeri:** 8192 (research önerisi) — teyit; meşru ziyaretçi mesajı bol altında kalır. (Aksi belirtilmezse 8192.)
- **Dosya konumu:** `src/lib/chat-sanitize.ts` (research önerisi; route + test ortak import). (`src/lib/` yoksa oluşturulur.)

---

## Risk ve Geri Dönüş Planı

- **Risk:** mevcut çalışan sanitizasyonu bozma → saf fonksiyon aynı davranışı korur (whitelist/slice-12/trailing-user) + yalnız byte-cap ekler; Vitest testleri regresyonu yakalar.
- **Rollback:** modül çağrısını inline bloğa geri al (git revert); byte-cap opsiyonel olarak çıkarılabilir (ayrı endişe).

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-22

**Durum:** ✅ Tamamlandı

**Yapılanlar:**
- **Alt Görev 1** — `src/lib/chat-sanitize.ts` (YENİ) oluşturuldu (`src/lib/` yoktu, açıldı). `ChatMessage` tipi + `MAX_MESSAGE_BYTES=8192` + `MAX_HISTORY=12` + `SanitizeResult` discriminated union export. `sanitizeMessages(raw: unknown)`: (a) dizi-değil→400 "Invalid request body." · (b) rol whitelist + string-content + `trim>0` filtre (route'un mevcut predikatı birebir korundu) · (c) `slice(-12)` · (d) byte-cap: tutulan sette UTF-8 byte (`TextEncoder`) > cap → 400 "Message too large." · (e) boş/trailing-user-değil → 400 · (f) ok.
- **Alt Görev 2** — `route.ts` modüle bağlandı: `import { sanitizeMessages } from "@/lib/chat-sanitize"`; inline `type ChatMessage` + filter/slice/trailing bloğu (eski satır 34-46) `sanitizeMessages(...)` çağrısıyla değişti (`!result.ok → new Response(result.reason, {status})`). Anthropic client/stream/system/max_tokens **dokunulmadı** (bu task Anthropic'te kalır).
- **Alt Görev 3** — `tests/chat-sanitize.test.ts` (YENİ), 13 test: gövde-tipi (dizi-değil ×6 tek testte + boş dizi), rol whitelist (system/tool/developer filtre), boş/whitespace/non-string content filtre, null/undefined eleman güvenliği, `slice(-12)`, trailing-user (fail+happy), byte-cap çok-baytlı (`ç`×5000: char<cap byte>cap→400; `ç`×4000 byte≤cap→ok), ASCII sınır (tam cap geçer / cap+1 red), pozisyon (-13 uzun mesaj slice ile düşer→400 tetiklemez; trailing uzun→tetikler).

**Sorunlar:**
- Yok — sanitizasyon predikatı route'tan birebir taşındığı için davranış korundu; regresyon çıkmadı.

**Kararlar:**
- **Byte-cap değeri = 8192** (research önerisi teyit; task Karar Noktaları "aksi belirtilmezse 8192").
- **Dosya konumu = `src/lib/chat-sanitize.ts`** (research önerisi; route + test ortak import, `@/` alias).
- **Gövde array-check saf fonksiyona taşındı:** eski route non-array `messages`'ı sessizce `[]`'e düşürüp "trailing user" 400 dönüyordu; artık net "Invalid request body." 400 (aynı statü, daha doğru mesaj — task Alt Görev 1a). Aynı JSON-parse-fail 400'ü route'ta korunur.
- docs/DECISIONS.md'ye eklendi: Hayır (uygulama-kararı, faz kararı C.6 zaten kayıtlı).

**Kalan İşler:** Yok.

**Dosya Değişiklikleri:**
- `src/lib/chat-sanitize.ts` → YENİ saf modül (sanitize + byte-cap).
- `src/app/api/chat/route.ts` → inline sanitize → modül çağrısı; import eklendi; local `ChatMessage` tipi kaldırıldı; gövde parse `unknown`'a çevrildi. Anthropic kısmı değişmedi.
- `tests/chat-sanitize.test.ts` → YENİ Vitest node testi (15 test).

**Test Sonuçları:**
- `npm run test` → **52 passed (6 dosya)** — yeni `chat-sanitize.test.ts` yeşil, mevcut testler (i18n parite, seo, smoke, umami) kırılmadı.
- `npm run build` (`next build`) → **temiz**; `/api/chat` derlendi, tip hatası/lint hatası yok.
- Çok-baytlı byte-cap kanıtı: `"ç".repeat(5000)` char=5000 (<8192) ama UTF-8 byte=10000 (>8192) → `{ok:false,400}` (char-sayım tuzağı yakalandı); `"ç".repeat(4000)`=8000 byte ≤ cap → geçer.

---

**Oluşturulma:** 2026-07-22
**Tamamlanma:** 2026-07-22
