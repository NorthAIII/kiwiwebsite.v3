# Phase 18: v0.5 Chatbot — ücretsiz sağlayıcı geçişi + canlıya alma

**Durum:** 🔄 Devam ediyor

<!-- Bu doküman faza girince (discuss-phase) oluşur; durum 🔄 ile başlar. Henüz girilmemiş fazların dokümanı/numarası olmaz — PHASES.md → Sıradaki Fazlar'da numarasız konu olarak durur. -->
<!-- KURAL: Bu doküman tek-okunabilir kalmalı (CLAUDE.md → Boyut ve Bölünme). Bir bölüm büyüyüp kırmızı çizgiye (~20k token) yaklaşırsa faz HÂLÂ AKTİFKEN `PHASE-N-<slug>.md`'ye bölünür — parent'ta self-yeten özet + pointer kalır, içerik taşınıp silinir, parent o fazın mini-index'i olur. Tamamlandıktan (✅) sonra bölme yasaktır; verify-phase ve review-phase fazı dondurmadan önce boyutu kontrol eder. -->

---

## Genel Bilgiler

**Amaç:** Chatbot AI sağlayıcısını Anthropic (Opus, ücretli) → **Groq · `llama-3.3-70b-versatile`** ($0/kartsız) olarak değiştirmek ve chatbot'u **canlıya almak** — şu an canlıda `/api/chat` 503/offline (Vercel'de key yok). Geçiş, mevcut streaming/sanitizasyon/zarif-offline mimarisini koruyarak yapılır; system prompt TR-birincil dil algılama + "fiyat/rakam uydurma" yasağıyla sağlamlaştırılır; girdi per-mesaj byte cap ile sertleştirilir; 5 dil çıktısı gözle doğrulandıktan sonra canlıya alınır.

**Milestone:** `route.ts` Groq'a geçmiş (streaming + sanitizasyon + zarif offline korunmuş), system prompt TR-birincil + "rakam uydurma yasağı" içeriyor, per-mesaj byte cap eklendi, **5 dil çıktısı gözle doğrulandı** ve chatbot **canlıda çalışıyor** (canlı `/api/chat` 503/offline çözüldü). `M5-Chatbot-API.md` + OVERVIEW stack satırı güncel.

> **Kaynak / 5 kabul kriteri:** `docs/DECISIONS.md` 2026-07-21.

### Feature Listesi

(MODULE-MAP ve modules/ referansı)

| Feature | Modül | Açıklama |
|---------|-------|----------|
| C1 | M5-Chatbot-API (+M4, OVERVIEW stack) | Chatbot sağlayıcı geçişi (Anthropic Opus → Groq/`llama-3.3-70b-versatile`) + canlıya alma; `route.ts` OpenAI-uyumlu drop-in, system prompt TR-birincil + rakam-uydurma yasağı, per-mesaj byte cap, 5-dil gözle doğrulama, canlı deploy |

---

## Kapsam Tartışması

> Bu bölüm `/devflow:discuss-phase` oturumunda dolduruldu (2026-07-21).

### Alınan Kararlar

- **Faz yapısı — tek faz (Faz 18):** C1 kohezif tek bir değişiklik (route.ts + system prompt + hardening + doküman + canlıya alma). İç bölünme plan-phase task'larına bırakılır (Faz 15 Alpfit emsali).
- **Canlıya alma zamanlaması — Faz 18 sonunda:** 5-dil gözle doğrulama biter bitmez canlıya alınır → şu an offline olan chatbot en hızlı düzelir. Sonraki versiyon-sonu fazları (teknik borç + senaryo testi) zaten-canlı Groq chatbot'u üzerinde koşar. Gerekçe: v0.4 zaten canlı (`f173234`) → bu geçiş incremental (v0.2'deki "89-commit ilk-production" riski yok); v0.4 emsali de bunu destekler (Faz 16'da canlı → Faz 17 canlıyı test etti). "Versiyon sonu release adımı" (v0.2 deseni) reddedildi — canlı 503'ü gereksiz uzatırdı.
- **Branch stratejisi — yeni v0.5 branch + v0.4 doc-merge önce:** Önce `revize/v0.4-versiyon-sonu` → `main` doc-only merge finalize edilir (v0.4 kodu zaten canlı → etkisiz temizlik), sonra temiz `revize/v0.5-chatbot-groq` açılır. Gerekçe: branch adı işe uyar, geçmiş temiz kalır (mevcut branch adı v0.5 için bayat olurdu).
- **Groq istemci yönü — OpenAI-uyumlu drop-in:** Mevcut `ReadableStream` + `text/plain` streaming sözleşmesi **korunur** (UI `Chatbot.tsx` dokunulmaz); `@anthropic-ai/sdk` → Groq OpenAI-uyumlu istemci (groq-sdk / openai SDK / raw fetch — **kesin paket research-phase'de** netleşir). Vercel AI SDK (`@ai-sdk/groq`) reddedildi: streaming mimarisini değiştirir + daha fazla bağımlılık. Gerekçe: kriter-1 ("streaming/sanitizasyon/offline korunur") + ILKELER kalıcılık (minimal mimari drift). **Not:** her iki yol da bir Groq paketi ekler → `package.json` Dokunulmazlar, kullanıcı onayı gerekir.
- **Girdi sertleştirme — per-mesaj byte cap: reddet (400) + makul limit:** Mesaj byte limiti aşılınca istek 400 ile reddedilir (net/dürüst); kesin limit değeri (~birkaç KB/mesaj, örn. 8KB) research-phase'de netleşir. `slice(-12)` (son 12 mesaj) geçmiş sınırı zaten var; byte cap tek uzun mesaj vektörünü kapatır. "Sessiz kırp" ve "yalnız toplam payload sınırı" reddedildi (birincisi sessiz, ikincisi tek uzun mesajı yakalamaz).
- **System prompt — cerrahi düzenleme:** İngilizce **talimat dili** korunur (çıktı dili ayrı komutlanır); TR dil listesine **eklenir ve varsayılan yapılır** (mevcut prompt TR'yi listelemiyor, İngilizce'ye düşüyor — `route.ts:14`); **"asla fiyat/rakam uydurma"** kuralı eklenir (dürüstlük konvansiyonu sağlamlaştırması — `gpt-oss` bu yüzden elenmişti). Crew OS **taksonomisi korunur** (Bunker OS sızmaz); booking sözü verilmez → mevcut **keşif görüşmesi / e-posta CTA'sı** kalır (takvim v0.6). Tam yeniden yazım yok (doğrulanmış marka sesi korunur).
- **API içi stream-hata fallback metni TR'ye çevrilir:** `route.ts:73` şu an İngilizce ("The assistant hit an error…") → TR (TR-birincil ürün tutarlılığı; kenar-durum).
- **`CHAT_MODEL` env override deseni korunur:** yeni varsayılan `llama-3.3-70b-versatile`.

### Kullanıcı Tercihleri

- **Test yaklaşımı:** byte-cap + sanitizasyon **saf mantığı** için Vitest node testi (kümülatif — her feature kendi testini ekler). LLM çıktısı CI'da test **edilmez** (token maliyeti + non-deterministik + key gerektirir) → kriter-4 **gözle 5-dil doğrulama** + `next build` temiz kalır.
- **Operasyonel sıra (kritik):** `GROQ_API_KEY` Vercel env'e **canlıya almadan ÖNCE** eklenir (kullanıcı aksiyonu; koda gömülmez — sır yönetimi ilkesi). Test key repo-dışı `.env.keys.local`'da (git-ignore; canlı deploy'da kullanılmaz — Vercel env ayrı).
- **UI dokunulmaz:** `Chatbot.tsx` offline/thinking/streaming davranışı text/plain sözleşmesi korunduğu için aynen kalır.

### Kapsam Dışı

- **Booking + botun takvim erişimi** → v0.6 (ayrı/daha büyük iş: tool/function calling + takvim + PII/spam güvenliği; DECISIONS 2026-07-21).
- **`Chatbot.tsx` UI değişikliği** — streaming sözleşmesi korunduğu için gereksiz.
- **Non-TR çeviri senkronu / AR-dil stratejisi** → numarasız aday (bu fazın işi değil). Not: system prompt İngilizce talimat + runtime dil algılama olduğundan chatbot çıktısı zaten kullanıcı diline uyarlanır — `messages/*.json` çeviri senkronundan bağımsız.
- **Diğer AI sağlayıcıları** (Gemini Flash, `gpt-oss-120b` vb.) — DECISIONS 2026-07-21'de canlı testle elendi (Gemini üretim güvenilmezliği/PII; gpt-oss rakam uydurma + TR'yi saymama), yeniden açılmaz.
- **`ANTHROPIC_API_KEY` bekleme kalemi** — geçiş bunu geçersizleştirir (yerine `GROQ_API_KEY`).

---

## Araştırma Bulguları

> Bu bölüm `/devflow:research-phase` oturumunda dolduruldu (2026-07-21). Kaynaklar: Groq resmi docs (`console.groq.com/docs/{models,text-chat,libraries}`), `groq-typescript` README, web (rate-limit/free-tier 2026). Kullanıcı 2 karar noktasını onayladı (aşağıda).

### Değerlendirilen Yaklaşımlar

**A. Groq istemci kütüphanesi** (discuss "kesin paket research'te" demişti; `@ai-sdk/groq` zaten elenmişti)
- **`groq-sdk` (resmi):** `import Groq from "groq-sdk"` → `new Groq()` (apiKey varsayılan `GROQ_API_KEY`, baseURL gömülü). OpenAI-uyumlu yüzey, tipli, streaming `create({stream:true})` async-iterable. **Artı:** `@anthropic-ai/sdk` kalkar → **net bağımlılık farkı SIFIR**; mevcut "resmi SDK" desenini korur; en az mimari drift (kriter-1 + ILKELER kalıcılık). **Eksi:** `package.json` Dokunulmaz → kullanıcı onayı (alındı).
- Ham `fetch`: 0 yeni paket ama SSE'yi elle ayrıştırır (`data:` satırları + `[DONE]` + her chunk `JSON.parse`). Daha kırılgan/çok kod; bakımlı SDK'ya karşı ILKELER kalıcılık zayıf.
- `openai` SDK + `baseURL`: groq-sdk ile birebir API ama OpenAI-markalı **net +1** bağımlılık — avantajı yok.
- **Seçilen (kullanıcı onaylı): `groq-sdk`.** Net-sıfır bağımlılık + resmi drop-in + minimal drift.

**B. Streaming adaptasyonu (Anthropic → OpenAI-uyumlu)** — `ReadableStream<Uint8Array>` + `text/plain` + `TextEncoder` sarmalayıcı **aynen korunur** (Chatbot.tsx dokunulmaz). Yalnız iki nokta değişir: (1) system prompt yerleşimi, (2) delta event şekli (aşağıda Teknik Kararlar).

**C. Girdi sertleştirme — per-mesaj byte cap** (discuss: reddet-400 + ~8KB). Ölçüm **UTF-8 byte** (`new TextEncoder().encode(content).length`), **karakter değil** — TR/AR çok-baytlı karakterlerde char-sayımı düşük ölçer; byte doğru sınır. Öneri **8 KB (8192 byte)/mesaj**: uzun meşru ziyaretçi paragrafı <1KB, 8KB ≈ ~1500 kelime → bol pay bırakır, tek-mesaj token-yakma/DoS vektörünü kapatır. Kesin değer plan-phase'de teyit (bloke değil).

**D. Test edilebilirlik** — sanitizasyon + byte-cap **saf, export edilen bir fonksiyona** çıkarılır (route.ts şu an inline; TASK-5 deseni Vitest node) → LLM/route ayağa kaldırmadan birim test (kullanıcı tercihi + QUALITY §5/§8). Konum önerisi `src/lib/chat-sanitize.ts` (route + test ortak import); kesin yer plan-phase.

### Kullanılacak Araçlar/Kütüphaneler
- **`groq-sdk`** (npm, güncel) — OpenAI-uyumlu Groq istemcisi; `@anthropic-ai/sdk`'nin **yerini alır** (ekle+çıkar, net 0). `package.json` Dokunulmaz → onay alındı. Kaynak: **yeni** bağımlılık.
- **Model `llama-3.3-70b-versatile`** — Groq **üretim** modeli (deprecated değil); **131.072** token context, **32.768** max completion → mevcut `max_tokens: 1024` bol yeter. Kaynak: `console.groq.com/docs/models`.
- **Base URL** `https://api.groq.com/openai/v1` — groq-sdk'ye **gömülü**, ayrıca yapılandırma gerektirmez. Kaynak: dış (SDK varsayılanı).

### Dikkat Edilecekler

- **System prompt yerleşimi değişir (kritik tuzak):** Anthropic ayrı `system:` parametresi kullanır (`route.ts:57`); OpenAI-uyumlu Groq system prompt'u **`messages` dizisinin ilk elemanı** olarak ister: `[{ role: "system", content: SYSTEM_PROMPT }, ...sanitized]`. Atlanırsa marka kimliği/dil talimatı hiç uygulanmaz. Kaynak: `route.ts:8-16,57` (repoda-tanımlı).
- **Delta event şekli değişir:** Anthropic `content_block_delta`/`text_delta` (`route.ts:61-67`) → OpenAI `for await (const c of stream) c.choices[0]?.delta?.content ?? ""`. Enqueue/encode aynı. Kaynak: `route.ts:61-68` (repoda-tanımlı).
- **`GROQ_API_KEY` = yeni sır, çift kaynak:** groq-sdk varsayılan `GROQ_API_KEY` env okur. Kaynak: **dış** — (a) Vercel env (prod, canlıya-almadan ÖNCE, kullanıcı aksiyonu; koda gömülmez), (b) yerel `.env.keys.local` (git-ignore `.env*.local` ile; dosya **mevcut** ✓, canlı deploy'da kullanılmaz). Değer asla koda/dokümana yazılmaz.
- **Anahtar-yok guard korunur (mesaj değişir):** `GROQ_API_KEY` yoksa mevcut desen gibi **503** (zarif offline) döner; `route.ts:21-24` `ANTHROPIC_API_KEY` → `GROQ_API_KEY` + mesaj string'i güncellenir. Kaynak: `route.ts:21-24` (repoda-tanımlı).
- **Byte-cap 400 → istemcide generic "offline" görünür (kabul):** `Chatbot.tsx:38` `!res.ok` olan **her** yanıtı offline sayar (`t("error")`) → byte-cap 400'ü ayrı "mesaj çok uzun" olarak göstermez. UI dokunulmaz kararıyla tutarlı; kimse meşru olarak 8KB+ tek mesaj yollamaz (adversarial edge). Plan/verify ayrı UX **beklememeli**. Kaynak: `Chatbot.tsx:38-42` (repoda-tanımlı).
- **Kimlik tanımlayıcı drift'i kriter-5'ten geniş (`ANTHROPIC_API_KEY` → `GROQ_API_KEY`):** kriter-5 yalnız M5+OVERVIEW sayıyor ama tanımlayıcı şu **ziyaretçi/dev** sitelerinde de geçiyor — plan-phase için checklist: `route.ts:21,23` (kod, çekirdek) · **`messages/{tr,en,ar,de,es}.json:494` ×5 (ziyaretçi-görünür offline kopya — karar aşağıda)** · `.env.example` (anahtar+yorum+`CHAT_MODEL` varsayılanı) · `README.md:20,30,38` · `CLAUDE.md:284` (Dokunulmaz → onay) · `MASTER_PROMPT_v2.md:36,42` (brief — hassas; ayrı ele al) · `_dev/` operasyonel (MEMORY "Chatbot env" satırı). Tarihsel/append-only `_dev/` kayıtları (DECISIONS vb.) dokunulmaz. Kaynak: grep 2026-07-21.
- **Free-tier limitleri (2026-06):** 30 RPM · **1.000 RPD** · 12K TPM · 100K TPD, kartsız. Tanıtım sitesi için muhtemelen yeterli; RPD/TPD tükenirse Groq **429** → istemci zaten zarif offline'a düşer (mevcut fallback). Honest degradation; hacim büyürse ücretli tier ($0.59/$0.79 /1M) yolu açık ama $0 hedefi şimdilik. Kaynak: dış (web, Groq free-tier).
- **Groq mid-stream/429 hatası:** `create({stream:true})` çağrı anında (auth/429) veya `for await` içinde throw edebilir; mevcut `try/catch` (`route.ts:69-77`) fallback metnini enqueue eder → aynı desen korunur, fallback metni **TR'ye** çevrilir. `maxDuration=30` Groq ~600ms için bol. Kaynak: `route.ts:69-77` (repoda-tanımlı).

### Teknik Kararlar

- **[Karar C.1] Groq istemcisi: `groq-sdk`** (kullanıcı onaylı). Gerekçe: net-sıfır bağımlılık (Anthropic çıkar/Groq girer), resmi OpenAI-uyumlu drop-in, mevcut streaming sözleşmesini korur (kriter-1), ILKELER kalıcılık (bakımlı SDK > el-yazımı SSE). `package.json` değişimi onay alındı.
- **[Karar C.2] Offline hata kopyası yeniden yazılır — dev anahtar-adı kaldırılır** (kullanıcı onaylı). `messages/*.json:494` ×5 "Add an ANTHROPIC_API_KEY" → ziyaretçiye uygun kopya ("birazdan tekrar deneyin / e-posta"). Gerekçe: canlıya alınınca offline = geçici hata (anahtar-eksik değil) → anahtar-adı iması yanlış olurdu; craft + dürüstlük. TR kaynak yazılır, non-TR değer-senkronu implementasyon task'ında. Bu bir **değer** değişimi (anahtar EKLEME/rename değil) → i18n disiplini korunur; ama tanımlayıcı TR dahil yanlış olduğundan bu fazın işi (çeviri-senkronu numarasız adayından ayrı).
- **[Karar C.3] System prompt cerrahi düzenleme** (discuss kararının somutlaşması): İngilizce talimat dili korunur; dil satırı (`route.ts:14`) TR **eklenir + varsayılan yapılır** ("You support Turkish, English, Arabic, German, and Spanish… **Default to Turkish** if unclear"); **"asla fiyat/rakam/istatistik/tarih uydurma; bilmediğin somut sayıyı söyleme → keşif görüşmesine yönlendir"** kuralı eklenir (dürüstlük; `gpt-oss` bu yüzden elendi). Crew OS taksonomisi **zaten doğru** (prompt "Our flagship layer is Crew OS", Bunker sızmıyor ✓); booking sözü yok, keşif görüşmesi/e-posta CTA korunur (takvim v0.6). Tam yeniden yazım yok.
- **[Karar C.4] Fallback stream-hata metni TR'ye çevrilir** (`route.ts:73`, "The assistant hit an error…" → TR). Bu, i18n `error` (offline) string'inden **ayrı** — runtime stream-içi enjekte edilen kenar-durum metni.
- **[Karar C.5] `CHAT_MODEL` override deseni korunur** (`route.ts:6`, repoda-tanımlı); yeni varsayılan `process.env.CHAT_MODEL ?? "llama-3.3-70b-versatile"`.
- **[Karar C.6] Sanitizasyon+byte-cap saf fonksiyona çıkarılır** (Vitest node testi için); `max_tokens: 1024` + `text/plain` streaming sözleşmesi + `slice(-12)` geçmiş sınırı korunur. Byte-cap her tutulan mesajın `content`'ine uygulanır (yalnız trailing değil — history de istemciden gelir/güvenilmez). Kesin dosya konumu + cap değeri (öneri 8192) plan-phase.

---

## Task Listesi

> `/devflow:plan-phase 18` (2026-07-22) — C1 kohezif değişimi 8 küçük, bağımlılık-sıralı task'a bölündü. Detay/icra → `tasks/TASK-18.0X.md`.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 18.01 | TASK-18.01 | ⬜ Bekliyor | Branch finalize — v0.4 doc-merge → main + `revize/v0.5-chatbot-groq` aç (operasyonel ön-koşul) |
| 18.02 | TASK-18.02 | ⬜ Bekliyor | Sanitize + byte-cap saf modül (`src/lib/chat-sanitize.ts`) + Vitest node testleri (Karar C.6) |
| 18.03 | TASK-18.03 | ⬜ Bekliyor | Sağlayıcı geçişi Anthropic → Groq (`groq-sdk`) + system prompt cerrahi (route.ts + package.json; C.1/C.3/C.4/C.5) |
| 18.04 | TASK-18.04 | ⬜ Bekliyor | Ziyaretçi offline kopya yeniden yazımı — messages ×5 `chat.error` (Karar C.2) |
| 18.05 | TASK-18.05 | ⬜ Bekliyor | Dev/ops kimlik referansları — .env.example, README.md, CLAUDE.md (Dokunulmaz → onay) |
| 18.06 | TASK-18.06 | ⬜ Bekliyor | `_dev/` stack dokümanları — M5 + OVERVIEW (Korumalı → onay) + MEMORY env (kabul kriteri 5) |
| 18.07 | TASK-18.07 | ⬜ Bekliyor | 5-dil gözle doğrulama gate (test key node harness; kabul kriteri 4 — marka mührü) |
| 18.08 | TASK-18.08 | ⬜ Bekliyor | Go-live — GROQ_API_KEY Vercel env (kullanıcı) + merge v0.5 → main + canlı duman testi (milestone) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

**Bağımlılık zinciri:** 18.01 (branch) → 18.02 (sanitize) → 18.03 (Groq+prompt) → 18.04/18.05/18.06 (kopya+kimlik+docs) → 18.07 (5-dil mühür) → 18.08 (go-live). Kritik kapı: 18.07 geçmeden 18.08 yapılmaz; 18.08 env-önce-merge-sonra.

---

## UAT Sonuçları

> Bu bölüm `/devflow:verify-phase` oturumunda doldurulacak.

**Tarih:** [tarih]
**Toplam Senaryo:** X | **Geçen:** Y | **Kalan:** Z

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | [Senaryo 1] | ✅/❌ | [not] |

---

## Retrospektif

> Bu bölüm `/devflow:review-phase` oturumunda doldurulacak.

### Ne İyi Gitti?
- [Tekrarlanması gereken pratikler]

### Ne Kötü Gitti?
- [Sorunlar ve darboğazlar]

### Sonraki Faz İçin Öneriler
- [Alınan dersler, tavsiyeler]

---

## Kalite Kontrol Sonuçları

> Bu bölüm `/devflow:review-phase` oturumunda doldurulacak.

| Eksen | Durum | Not |
|-------|-------|-----|
| Modülerlik | ✅ / ⚠️ / ❌ | ... |
| Güvenlik | ✅ / ⚠️ / ❌ | ... |
| Bakım Maliyeti | ✅ / ⚠️ / ❌ | ... |
| Performans | ✅ / ⚠️ / ❌ | ... |
| Hata Yönetimi | ✅ / ⚠️ / ❌ | ... |
| Test Kapsamı | ✅ / ⚠️ / ❌ | ... |
| Erişilebilirlik | ✅ / N/A | ... |

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-21
**Son Güncelleme:** 2026-07-22 — plan-phase 18: 8 task dokümanı oluşturuldu (18.01–18.08), Task Listesi + bağımlılık zinciri dolduruldu. Sıradaki adım: verify-plan 18.
