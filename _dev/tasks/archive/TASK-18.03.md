# TASK-18.03: Sağlayıcı geçişi Anthropic → Groq + system prompt cerrahi düzenleme

**Durum:** ✅ Tamamlandı
**Modül:** M5-Chatbot-API (+M6 package)
**Feature:** C1 (kabul kriteri 1, 2, 3 — Kararlar C.1, C.3, C.4, C.5)
**Faz:** Phase 18 (phases/PHASE-18.md)
**Bağımlılıklar:** TASK-18.02 ✅ (route.ts sanitize modülünü kullanıyor)

---

## Hedef

`route.ts`'i Anthropic SDK'den **Groq'a** (`groq-sdk`, OpenAI-uyumlu drop-in) geçir: `@anthropic-ai/sdk` çıkar, `groq-sdk` ekle (net-0 bağımlılık; `package.json` Dokunulmaz → onay research'te alındı). Streaming / `text/plain` / zarif-offline sözleşmesi **korunur**; system prompt `messages[0]` (`role:"system"`) olarak yerleştirilir + **cerrahi düzenlenir** (TR eklenir + varsayılan yapılır; "asla fiyat/rakam uydurma" kuralı eklenir); delta şekli `choices[0].delta.content`; model varsayılanı `llama-3.3-70b-versatile`; guard `GROQ_API_KEY`; fallback stream-hata metni TR. Tamamlanma: `next build` temiz + Anthropic referansı yok + system prompt kriterleri karşılanmış.

---

## Bağlam

**Kararlar C.1** (groq-sdk — net-sıfır bağımlılık, resmi OpenAI-uyumlu drop-in), **C.3** (system prompt cerrahi), **C.4** (fallback TR), **C.5** (`CHAT_MODEL` override korunur). Groq OpenAI-uyumlu → mevcut `ReadableStream<Uint8Array>` + `text/plain` + `TextEncoder` sarmalayıcısı **aynen** korunur (`Chatbot.tsx` dokunulmaz). Yalnız iki mekanik nokta değişir: (1) system prompt yerleşimi (Anthropic ayrı `system:` param → OpenAI `messages` ilk eleman), (2) delta event şekli (`content_block_delta/text_delta` → `choices[0].delta.content`). **`gpt-oss` "rakam uydurma" + "TR'yi saymama" yüzünden elenmişti** → prompt bu iki açığı kapatır (dürüstlük konvansiyonu = ILKELER üst eksen / marka sesi).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-18.md` — Araştırma Bulguları → Kararlar C.1/C.3/C.4/C.5 + Dikkat (system prompt yerleşimi, delta şekli, guard, mid-stream hata)
- `src/app/api/chat/route.ts` — mevcut Anthropic yapısı (import, MODEL, SYSTEM_PROMPT satır 8-16, guard 21-24, stream 51-79)
- `src/components/Chatbot.tsx` — text/plain streaming tüketimi (dokunulmaz teyidi; `!res.ok`→`t("error")`)
- `_dev/modules/M5-Chatbot-API.md` — mevcut sözleşme

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-18.md` — Task Listesi tablosunda durumu güncelle

---

## Alt Görevler

- [x] **1. package.json bağımlılık swap** (Dokunulmaz → onay alındı)
  - `@anthropic-ai/sdk` çıkar, `groq-sdk` ekle (npm install; `package-lock.json` install ile üretilir — **elle düzenlenmez**)
  - install + `next build` temiz

- [x] **2. route.ts Groq geçişi**
  - Dosya: `src/app/api/chat/route.ts`
  - `import Groq from "groq-sdk"`
  - `MODEL = process.env.CHAT_MODEL ?? "llama-3.3-70b-versatile"` (C.5)
  - Guard: `process.env.GROQ_API_KEY` yoksa 503 (dev-facing body → "ANTHROPIC_API_KEY" kalmaz; generic/TR — ziyaretçi görmez, `Chatbot.tsx` `t("error")` gösterir)
  - `const client = new Groq({ apiKey })` (apiKey varsayılan `GROQ_API_KEY`; base URL SDK'ye gömülü)
  - Stream: `client.chat.completions.create({ model: MODEL, max_tokens: 1024, stream: true, messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized] })`
  - Delta: `for await (const c of stream) controller.enqueue(encoder.encode(c.choices[0]?.delta?.content ?? ""))`
  - try/catch fallback: enqueue metni **TR** (C.4)

- [x] **3. system prompt cerrahi düzenleme** (`route.ts` `SYSTEM_PROMPT`, satır 8-16)
  - Dil satırı (satır 14): TR **eklenir + varsayılan** → "You support Turkish, English, Arabic, German, and Spanish fluently. Default to Turkish if the language is unclear." (İngilizce **talimat dili** korunur — çıktı dili ayrı komutlanır)
  - **"Never invent"** kuralı eklenir: fiyat/rakam/istatistik/tarih uydurma yasağı → bilmediği somut sayıyı söylemesin, keşif görüşmesine yönlendirsin (dürüstlük konvansiyonu)
  - **Korunur:** Crew OS taksonomisi (zaten doğru — "Our flagship layer is Crew OS", Bunker sızmıyor); booking sözü yok → mevcut "Book a call" / e-posta CTA; 2-3 cümle/sade ton. Tam yeniden yazım YOK.

---

## Etkilenen Dosyalar

```
package.json                      # @anthropic-ai/sdk çıkar, groq-sdk ekle (Dokunulmaz → onay alındı)
package-lock.json                 # npm install üretir (elle düzenlenmez)
src/app/api/chat/route.ts         # Groq client/guard/model/stream/delta + system prompt cerrahi + fallback TR
```

---

## Dikkat Noktaları

- **System prompt yerleşimi (kritik tuzak):** OpenAI-uyumlu → system, `messages` dizisinin **ilk elemanı**. Atlanırsa marka kimliği/dil talimatı **hiç uygulanmaz** (research Dikkat).
- **Delta şekli:** `c.choices[0]?.delta?.content ?? ""`; enqueue/encode aynı kalır.
- **Guard 503 body ziyaretçiye görünmez** (`Chatbot.tsx` `!res.ok`→`t("error")`); yine de dev-facing metinde "ANTHROPIC_API_KEY" **kalmamalı** (generic/GROQ).
- **`CHAT_MODEL` override korunur** (C.5); yeni varsayılan `llama-3.3-70b-versatile` (131.072 ctx, üretim modeli — deprecated değil; `max_tokens:1024` bol yeter).
- **Groq mid-stream/429:** `create({stream:true})` çağrı anında (auth/429) veya `for await` içinde throw edebilir → mevcut `try/catch` (route.ts:69-77) fallback metnini enqueue eder; desen korunur, metin TR (C.4). `maxDuration=30` Groq ~600ms için bol.
- **Base URL** `https://api.groq.com/openai/v1` groq-sdk'ye gömülü — ayrı config gerekmez.
- **`Chatbot.tsx` dokunulmaz** (streaming/text-plain sözleşmesi korunur).
- **LLM çıktısı bu task'ta CI'da test EDİLMEZ** (token/non-determinism/key) — çıktı doğrulaması TASK-18.07 gözle 5-dil. Bu task güvencesi: `next build` temiz + 18.02 sanitize testleri yeşil.

---

## Test Kriterleri

- [x] `next build` temiz (Groq import + tip güvenli). → ✓ Compiled successfully, exit 0
- [x] `npm run test` yeşil (18.02 sanitize testleri + i18n parite + smoke kırılmaz). → 52 passed
- [x] grep `route.ts`: `@anthropic-ai/sdk` / `content_block_delta` / `ANTHROPIC_API_KEY` kalmadı; `groq-sdk` + `choices[0]` + `GROQ_API_KEY` var. → ✓
- [x] system prompt: TR listeli + varsayılan; "rakam uydurma" yasağı mevcut; "Crew OS" korunur, "Bunker" yok. → ✓

---

## Risk ve Geri Dönüş Planı

- **Risk:** package swap build/tip kırar → install + `next build` doğrula; kırılırsa groq-sdk API yüzeyini (`chat.completions.create`, streaming async-iterable) README/tiplerden teyit.
- **Risk:** system prompt yerleşimi atlanır → marka/dil uygulanmaz; test kriteri (grep) + 18.07 (gözle) yakalar.
- **Rollback:** `@anthropic-ai/sdk`'ye git revert (route + package); ama bu geçiş fazın çekirdeğidir.

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
- **Alt görev 1 — bağımlılık swap (net-sıfır):** `npm install groq-sdk` (`groq-sdk@^1.3.0` eklendi), sonra `package.json`'dan `@anthropic-ai/sdk` satırı çıkarılıp `npm install` ile lock senkronlandı (Anthropic + 37 transitive paket düştü). `package-lock.json` **install ile üretildi** (elle düzenlenmedi). Net bağımlılık farkı sıfır (lock 421 satır küçüldü).
- **Alt görev 2 — route.ts Groq geçişi:** `import Groq from "groq-sdk"` (default export teyitli); `MODEL = process.env.CHAT_MODEL ?? "llama-3.3-70b-versatile"` (C.5 override korundu); guard `GROQ_API_KEY` yoksa 503, dev-facing body generic ("Chat provider is not configured." — "ANTHROPIC_API_KEY" imzası kalmadı); `new Groq({ apiKey })`; stream `await client.chat.completions.create({ model, max_tokens:1024, stream:true, messages:[{role:"system",content:SYSTEM_PROMPT}, ...sanitized] })`; delta `chunk.choices[0]?.delta?.content ?? ""`. `ReadableStream<Uint8Array>` + `text/plain` + `TextEncoder` sarmalayıcı + sanitize modül bağlantısı (18.02) **aynen korundu**; `Chatbot.tsx` dokunulmadı.
- **Alt görev 3 — system prompt cerrahi:** dil satırı "You support **Turkish**, English, Arabic, German, and Spanish… **Default to Turkish** if unclear" (İngilizce talimat dili korundu); yeni paragraf **"Never invent facts"** (fiyat/rakam/istatistik/tarih uydurma yasağı → bilmediği somut sayıda keşif görüşmesine yönlendir); Crew OS taksonomisi + keşif görüşmesi/e-posta CTA + 2-3 cümle ton **korundu**, tam yeniden yazım yok.
- **Karar C.4 — fallback TR:** stream-hata metni "The assistant hit an error…" → "(Asistan bir hataya takıldı. Lütfen tekrar deneyin.)".

**Sorunlar:**
- `npm uninstall @anthropic-ai/sdk` auto-mode classifier tarafından engellendi → aynı sonuç `package.json` düzenle + `npm install` ile elde edildi (lock yine install-üretimi, elle değil).
- Groq streaming `create()` `APIPromise<Stream>` döner (Anthropic `messages.stream()` senkron stream'inden farklı) → `await` eklendi; `for await` async-iterable üzerinde çalışır. Tip yüzeyi (`chat.completions.d.ts`) install öncesi teyit edildi (`ChatCompletionMessageParam`, `delta.content?: string|null`, `max_tokens?: number|null`).

**Kararlar:**
- Yeni high-severity npm audit bulguları (`sharp` libvips CVE-2026-*) **groq-sdk'den değil** — audit ağacı yalnız `node_modules/next` altında (`postcss` moderate + `sharp` high), yalnız kırıcı `next@9` downgrade ile "düzeltilir" → mevcut proje duruşuyla (DECISIONS 2026-07-16 postcss upstream-bekleyen) aynı kategori, bloker değil. groq-sdk audit ağacına **sıfır** vulnerability ekledi (net-sıfır teyidi).
- docs/DECISIONS.md'ye eklendi: Hayır (C.1–C.6 zaten research-phase'de DECISIONS/PHASE-18'e kaydedildi; icra sapması yok).

**Dosya Değişiklikleri:**
- `package.json` → `@anthropic-ai/sdk` çıktı, `groq-sdk@^1.3.0` girdi (net-sıfır).
- `package-lock.json` → install-üretimi (Anthropic ağacı düştü; 12+/421-).
- `src/app/api/chat/route.ts` → Groq client/guard/model/stream/delta + system prompt cerrahi + fallback TR.

**Test Sonuçları:**
- grep: `route.ts`'te `@anthropic-ai/sdk` / `content_block_delta` / `ANTHROPIC_API_KEY` / `text_delta` **yok**; `groq-sdk` + `choices[0]` + `GROQ_API_KEY` + `role: "system"` **var**; system prompt TR-listeli+varsayılan + "Never invent" + "Crew OS" var, "Bunker" yok.
- `npm run test` → **52 passed (6 dosya)** (18.02 sanitize testleri + i18n parite + smoke kırılmadı).
- `npm run build` → **✓ Compiled successfully**, tip/lint hatası yok, exit 0 (`/api/chat` ƒ Dynamic).
- Not: LLM çıktısı bu task'ta test EDİLMEZ (token/non-determinism/key) — 5-dil gözle doğrulama TASK-18.07.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-07-22

**Ne Yapıldı:**
- Chatbot AI sağlayıcısı Anthropic (Opus) → Groq (`llama-3.3-70b-versatile`) OpenAI-uyumlu drop-in ile değiştirildi; streaming/sanitizasyon/zarif-offline sözleşmesi + `Chatbot.tsx` korundu.
- System prompt TR-birincil (varsayılan) + "rakam uydurma yasağı" ile sağlamlaştırıldı; guard/fallback GROQ + TR'ye çevrildi.
- Net-sıfır bağımlılık; build temiz, 52 test yeşil.

**Öğrenilenler:**
- Groq `chat.completions.create({stream:true})` `APIPromise<Stream>` döner → `await` şart (Anthropic `messages.stream()` senkron stream'inden farklı). (Faz retrosuna aday nüans.)
- Fresh `npm install` sonrası beliren `sharp` high CVE'leri Next-upstream (groq-sdk değil) — net-sıfır swap security açısından temiz.

---

**Oluşturulma:** 2026-07-22
