# Phase 18: v0.5 Chatbot — ücretsiz sağlayıcı geçişi + canlıya alma

**Durum:** ✅ Tamamlandı

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

> `/devflow:research-phase 18` (2026-07-21). Kaynaklar: Groq resmi docs, `groq-typescript` README, web (free-tier 2026). **Detay → [PHASE-18-ARASTIRMA.md](PHASE-18-ARASTIRMA.md)** (değerlendirilen istemciler A–D · dikkat edilecekler · teknik kararlar C.1–C.6 tam metni).

**Özet (kendi kendine yeten):** İstemci **`groq-sdk`** seçildi (kullanıcı onaylı) — `@anthropic-ai/sdk` kalktığı için **net bağımlılık farkı sıfır**, OpenAI-uyumlu resmi drop-in, mevcut `ReadableStream`+`text/plain` streaming sözleşmesi **aynen korunur** (`Chatbot.tsx` dokunulmaz). İki kritik adaptasyon: system prompt artık ayrı `system:` parametresi değil **`messages` dizisinin ilk elemanı**, ve delta şekli `content_block_delta` → `choices[0].delta.content`. Girdi sertleştirme **UTF-8 byte** ile ölçülür (karakter değil — TR/AR çok-baytlıda char-sayımı düşük ölçer), cap **8192 byte/mesaj**, aşımda **400 reddet** (sessiz kırpma yok); sanitizasyon test edilebilsin diye saf modüle (`src/lib/chat-sanitize.ts`) çıkarıldı. Anahtar-yok guard 503 kalır; byte-cap 400'ü UI generic "offline" olarak gösterir (bilinçli, UI dokunulmaz kararıyla tutarlı). ⚠️ **İki araştırma bulgusu 2026-09-11'de geçersizleşti:** `llama-3.3-70b-versatile` emekliye ayrıldı ve `max_tokens: 1024` ücretsiz tier OTPM limitine (1000) takıldı — güncel gerçeklik → **Go-live** bölümü + `docs/DECISIONS.md` 2026-09-11.

---

## Task Listesi

> `/devflow:plan-phase 18` (2026-07-22) — C1 kohezif değişimi 8 küçük, bağımlılık-sıralı task'a bölündü. Detay/icra → `tasks/TASK-18.0X.md`.

<!-- KURAL: Task Listesi yalnızca özet tablodur (#, Task, Durum, kısa açıklama). Task'ın icra detayı / oturum kaydı / çalışma notu buraya değil `tasks/TASK-N.md`'ye yazılır — bu bölüme sızan detay şişmedir, temizlenir (bölme değil). -->

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 18.01 | TASK-18.01 | ✅ Tamamlandı | Branch finalize — v0.4 doc-merge → main + `revize/v0.5-chatbot-groq` aç (operasyonel ön-koşul) |
| 18.02 | TASK-18.02 | ✅ Tamamlandı | Sanitize + byte-cap saf modül (`src/lib/chat-sanitize.ts`) + Vitest node testleri (Karar C.6) |
| 18.03 | TASK-18.03 | ✅ Tamamlandı | Sağlayıcı geçişi Anthropic → Groq (`groq-sdk`) + system prompt cerrahi (route.ts + package.json; C.1/C.3/C.4/C.5) |
| 18.04 | TASK-18.04 | ✅ Tamamlandı | Ziyaretçi offline kopya yeniden yazımı — messages ×5 `chat.error` (Karar C.2) |
| 18.05 | TASK-18.05 | ✅ Tamamlandı | Dev/ops kimlik referansları — .env.example, README.md, CLAUDE.md (Dokunulmaz → onay alındı) |
| 18.06 | TASK-18.06 | ✅ Tamamlandı | `_dev/` stack dokümanları — M5 + OVERVIEW (Korumalı → onay alındı) + MEMORY env (kabul kriteri 5) |
| 18.07 | TASK-18.07 | ✅ Tamamlandı | 5-dil gözle doğrulama gate (kabul kriteri 4 — marka mührü); 1. koşu başarısız → prompt sertleştirildi + `temperature: 0.2` → 2 koşu GREEN |
| 18.08 | TASK-18.08 | ✅ Tamamlandı | Go-live — GROQ_API_KEY Vercel env + merge v0.5 → main + canlı duman testi; **iki canlı arıza** (model emekliliği + OTPM) teşhis edilip düzeltildi (milestone) |
| 18.09 | TASK-18.09 | ✅ Tamamlandı | **Düzeltme (verify 18):** girdi daraltma + hacim sınırı — mesaj `{role,content}`'e indirgeniyor, `MAX_INCOMING_MESSAGES` 100 + `MAX_TOTAL_BYTES` 16384 (UAT 20/21); Vitest 52→64 |
| 18.10 | TASK-18.10 | ✅ Tamamlandı | **Düzeltme (verify 18):** marka mührü kopyası — betimleyici CTA atfı + etiket-alıntılama yasağı, 5 dil hitap kuralı, README model ailesi (UAT 19/28/29); harness 2×20 yanıt 0 ihlal |
| 18.11 | TASK-18.11 | ✅ Tamamlandı | **Düzeltme (verify 18, 2. tur):** üst-akış zaman aşımı — ilk token 20 s · sessizlik 5 s · toplam 24 s + SDK retry kapalı; değer canlı ölçümle seçildi (en yavaş meşru yanıt 17,4 s) ve kullanıcı onayladı (UAT 33); Vitest 64→69 |
| 18.12 | TASK-18.12 | ✅ Tamamlandı | **Düzeltme (verify 18, 3. tur):** chatbot hata/zaman-aşımı notu ziyaretçinin dilinde — Referer prefix'i → `NEXT_LOCALE` → TR, metin `chat.error` (yalnız hata anında yüklenir); yerelde gerçek Chrome 5/5 (UAT 36); Vitest 69→86 |
| 18.13 | TASK-18.13 | ✅ Tamamlandı | **Düzeltme (verify 18, 3. tur):** ürün ağacındaki bayat Anthropic referansları — `ci.yml` yorumu + `MASTER_PROMPT_v2.md` §6/§7 (dar güncelleme; model adı kopyalanmadı) + üç yaşayan `_dev` kopyası; süpürmede kalan 5 eşleşme gerekçeli sınıf dışı (UAT 39) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

**Bağımlılık zinciri:** 18.01 (branch) → 18.02 (sanitize) → 18.03 (Groq+prompt) → 18.04/18.05/18.06 (kopya+kimlik+docs) → 18.07 (5-dil mühür) → 18.08 (go-live). Kritik kapı: 18.07 geçmeden 18.08 yapılmaz; 18.08 env-önce-merge-sonra. **Düzeltme turu (verify 18):** 18.09 ve 18.10 birbirinden bağımsız — sırası serbest; ikisi de bittikten sonra `/devflow:verify-phase 18` baştan koşuldu (2026-09-12). **İkinci düzeltme turu:** 18.11 (üst-akış zaman aşımı) — bittiğinde `/devflow:verify-phase 18` yine baştan koşuldu (3. koşum, 36 ✅ / 3 ❌). **Üçüncü düzeltme turu (2026-10-02):** 18.12 (senaryo 36 — fallback metni ziyaretçi dilinde) ve 18.13 (senaryo 39 — `ci.yml` yorumu + `MASTER_PROMPT_v2.md` bayat Anthropic tarifi); birbirinden bağımsız. İkisi bitince verify yine **baştan**.

---

## Go-live Yolu (özet)

**Kabul kriteri 4 — marka mührü gate (TASK-18.07, 2026-07-22): ✅.** Nihai `route.ts` prompt'u + gerçek `sanitizeMessages` ile serversiz node harness'te 5 dil × 4 temsili soru koşuldu. 1. koşu ❌ (EN yanıtları Türkçeye/Koreceye düşüyor + çok-dilli script bozulması) → prompt dil kuralı sertleştirildi + `temperature: 0.2` eklendi (kullanıcı onaylı) → 2. ve 3. koşu **GEÇTİ**: dil sadakati 5/5, garble 0/20, taksonomi 5/5, dürüstlük 5/5. Go-live kapısı açıldı.

**Milestone — go-live (TASK-18.08, 2026-09-11): ✅ chatbot canlıda çalışıyor.** Env hiç eklenmemiş olduğu devralındı; eklendikten sonra `/api/chat` 503'ten 200'e döndü ama gövde stream-içi fallback'ti. **İki canlı arıza, ikisi de yalnız runtime log'unda görünür:** (1) Groq `llama-3.3-70b-versatile`'ı emekliye ayırmış → model `qwen/qwen3.8-27b` olarak yeniden seçildi (eleme kriteri ikinci kez uygulandı; `gpt-oss-120b` sertleştirilmiş prompt altında bile rakam uydurdu), (2) ücretsiz tier `max_tokens`'ı peşin rezerve ediyor → 1024 her çağrıyı 429'la reddettiriyordu, 512'ye indi. Canlı doğrulama: 5 dil temiz, 8/8 sayfa 200, deploy ataşı `git merge-base` ile teyitli. v0.4'ten devralınan `/api/chat` 503/offline takip kalemi kapandı.

**Artık durum (bloke değil):** ücretsiz kota tavanı (1.000 istek/gün · 8.000 TPM · **1.000 OTPM**) — tükenince Groq 429 döner ve zarif fallback'e düşülür; `GROQ_API_KEY` yalnız Production'da (preview'de chatbot offline görünür, bilinçli); TR yanıtlarda seyrek kelime tekrarı (prompt cilası, numarasız aday).

> **Detay → [PHASE-18-GOLIVE.md](PHASE-18-GOLIVE.md)** — marka mührü koşu tabloları, model yeniden seçim karşılaştırması, iki arızanın teşhis tablosu, canlı kanıt artefaktları.

---

## UAT Sonuçları

**Tarih:** 2026-10-02 (4. koşum — TASK-18.12 + 18.13 düzeltmeleri sonrası) · **Mod:** otonom
**Toplam Senaryo:** 44 | **Geçen:** 43 | **Kalan:** 1

- **Koşum geçmişi:** 29 senaryo / 24 ✅ (2026-09-11) → 33 / 31 (2026-09-12) → 39 / 36 (2026-09-29) → 44 / 43 (2026-10-02). Her ❌ ya bir düzeltme task'ına (18.09–18.13) ya kapsam-dışı kayda bağlandı.
- **Tek ❌ — senaryo 23:** `/api/chat`'te hız sınırı / origin kontrolü yok (route, middleware ve `vercel.json` katmanlarının hiçbirinde). Kapsam-dışı, v0.6 adayı; kayıt DURUM → sahipli açıklar + M5 edge case.
- **Probe katmanları:** gerçek `route.ts` in-process (gerçek `groq-sdk`, sahte `fetch`, sanal saat), canlı `kiwiailab.com` (~140 model çağrısı), gerçek Chrome 153, Vercel runtime log'u, GitHub Actions, Vitest / `next build`.
- **Senaryo doğurmayan kriter:** kabul kriteri 5 (`M5` + OVERVIEW stack satırı) kayıt katmanına baktığı için UAT'a girmedi; review-phase Adım 2'de karşılandı.

> **Detay → [PHASE-18-UAT.md](PHASE-18-UAT.md)** — 44 senaryonun sonuç ve kanıt notları (`kontrol:` / `ters-çevirme:`), otomatik kontrol bulguları (CI, analiz araçları, npm audit, faz-penceresi güvenlik taraması, artefakt süpürmesi).

---

## Retrospektif

> `/devflow:review-phase 18` (2026-10-02). Faz 18 = v0.5'in tek içerik fazı: 8 plan task'ı + 3 düzeltme turunda 5 task (18.09–18.13), UAT 4 koşum (29 → 33 → 39 → 44 senaryo; son koşum 43 ✅ / 1 ❌ kapsam-dışı). Takvim 2026-07-21 → 2026-10-02.

### Ne İyi Gitti?

- **Değerler tahminle değil ölçümle seçildi ve ölçüm dört kez öneriyi düzeltti.** `MAX_TOTAL_BYTES` gerçek 12 turlu TR sohbetinin ölçümüyle (1.968 byte → 16384) seçildi. Zaman aşımında canlı ölçüm (en yavaş başarılı yanıt 17,4 s) task'ın 12–15 s önerisini çürüttü, 20 s seçildi. `max_tokens` 512 ve model `qwen/qwen3.8-27b` runtime log'undan geldi.
- **Her düzeltme task'ı kendi kapısını bozuk girdiyle sınadı.** 18.09 (eski kaynakla 9 kırmızı), 18.10 (8 ihlal, boş kapsamda exit 2), 18.11 (iki ayrı bozma: 3 ve 2 kırmızı), 18.12 (18 / 8 / 14 kırmızı), 18.13 (çapada 8 eşleşme). Yeşil testlerin gerçekten ölçtüğü her seferinde gösterildi.
- **Dürüstlük konvansiyonu iki kez model eleme kriteri oldu.** Temmuzda `gpt-oss-120b` rakam uydurduğu için düştü. Eylülde aynı aday kör reddedilmedi, sertleştirilmiş prompt altında yeniden sınandı ve yine düştü.
- **UAT her turda kardeş varyant aradı.** 20/21 (alan daraltma + hacim), 31 (ham gövde), 39 (kimlik sınıfı) bu yolla doğdu. Serving zinciri (senaryo 30) yerel kaynaktan ayrı bir katman olarak ölçüldü.
- **Mimari sözleşme korundu.** `Chatbot.tsx` faz penceresinde 0 satır değişti. `text/plain` streaming sözleşmesi aynı kaldı. Bağımlılık farkı net sıfır (`@anthropic-ai/sdk` çıktı, `groq-sdk` girdi).
- **Faz 17'nin üç önerisi bu fazda kapandı:** branch → `main` merge (18.01), chatbot per-mesaj byte cap (18.02), canlı chatbot anahtarı (18.08).

### Ne Kötü Gitti?

- **Go-live yarım kaldı ve 7 hafta görünmedi.** 2026-07-22'de kod `main`'e alındı ve "redeploy to pick up GROQ_API_KEY" boş commit'i atıldı, ama anahtar hiç eklenmemişti (`vercel env ls` 0 değişken). Task kapatılmadı. Canlı chatbot 2026-09-11'e kadar 503 kaldı. Memory'deki "canlıda gördüm iddiasını kanıta bağla" disiplini o oturumda uygulanmadı.
- **Araştırmanın üç dayanağı canlıda çürüdü, üçü de yalnız runtime'da görüldü.** Model emekliye ayrıldı (404). Kota modeli eksikti: research 30 RPM / 12K TPM saydı, OTPM 1000'den söz etmedi (429). "`maxDuration=30` bol" denmişti, asılı çağrı 504'e düştü (18.11).
- **Bir düzeltme bir sonrakini doğurdu.** 18.11 hata yolunu 504'ten 200+nota çevirdi. Bu, `Chatbot.tsx`'in `!res.ok` kapısını devreden çıkardı ve 18.04'ün 5 dilli offline kopyası atlandı; ziyaretçi sabit TR not gördü (18.12). Hata yolunun HTTP şeklini değiştiren task, ziyaretçinin o yolda gördüğü metnin kaynağını kontrol etmedi.
- **Kimlik süpürmesi parça parça yapıldı.** 18.05 `ci.yml`'i atladı ve brief'i bilinçle dışarıda bıraktı. 18.08 `README.md:14`'ü atladı. 18.10 ve 18.13 bunları kapattı. Süpürme dosya listesiyle yapıldı, sınıf grep'iyle değil. `_dev/`'i toptan dışlamak yaşayan dokümanları da gizledi.
- **18.07 marka mührü kapısı CTA etiketini ve hitap düzeyini ölçmüyordu.** Anthropic döneminden taşınan tırnaklı "Book a call" etiketi kapıdan yeşil geçip canlıya çıktı (UAT 28/29). Kapının ölçmediği eksen "geçti" değil "bakılmadı" demektir.
- **Marka mührü harness'i üç kez yeniden yazılıp silindi** (18.07, 18.08, 18.10). Faz 17'nin "geçici harness → kalıcı tohum" dersi bu fazda da tekrarladı.
- **Düzeltme turları doğrudan `main`'e, yani canlıya aktı.** 18.09–18.13'ün beşi de `main`'de. `revize/v0.5-chatbot-groq` `353d791`'de (18.08 kaydı) kaldı. CLAUDE.md'nin revize-branch kuralı metinde aynı, pratikte go-live'dan sonra askıya alındı. Bir neden: `GROQ_API_KEY` Preview env'de yok, yani chatbot branch preview'ında test edilemiyor.
- **Kota canlı deneyimi belirliyor.** Hızlı ardışık 20 çağrının 5'i 429'a düştü (OTPM 1000). Günlük 1.000 istek, hız sınırı olmadığı için dışarıdan tüketilebilir (senaryo 23). İkisi de bu fazın kapsamı dışında, ama ziyaretçinin gördüğü chatbot'u belirliyor.

### Sonraki Faz İçin Öneriler

- **Sıradaki faz v0.5 versiyon-sonu teknik borç fazıdır.** Versiyon Sonu Durumu hâlâ `içerik_fazları`; `teknik_borç` damgası discuss-phase'in işi. Aday kalemler DURUM → "Sahipli teknik açıklar" listesindedir.
- **`/api/chat` hız sınırı / origin kontrolünü teknik borç fazında yeniden tart.** Kayıtta v0.6 adayı, ama canlı ürün bugün açık: günlük kota dışarıdan tüketilirse chatbot herkes için o gün offline olur.
- **Canlı chatbot sağlığını izleyen bir şey yok.** Model emekliliği ve kota tükenmesi yalnız `vercel logs`'ta görünüyor. Llama, deploy olmadan emekliye ayrıldı. Günlük sentetik bir kontrol (yanıt gövdesinin fallback notu olmadığını doğrulayan) teknik borç adayıdır.
- **Marka mührü harness'ini repo içinde kalıcı, elle tetiklenen bir script'e çevirmeyi değerlendir.** CI'da koşmaz (token + anahtar, DECISIONS 2026-07-21), ama model ya da prompt değişiminde sıfırdan yazılmaz.
- **Hata yolunun HTTP şeklini değiştiren task, ziyaretçinin o yolda gördüğü metnin kaynağını da test etsin** (UI `!res.ok` kopyası mı, gövde notu mu). 18.11 → 18.12 zinciri bunu gösterdi.
- **Canlı feature düzeltmelerinin dalı prd-review'da karara bağlansın.** Ya düzeltmeler bilinçle `main`'de yürür ve kural metni buna göre yazılır, ya `GROQ_API_KEY` Preview env'e eklenir ve revize branch'i yeniden test edilebilir olur.
- **`max_tokens: 512` değişmez.** 2026-10-02 production log'u (son 3 saat, OTPM 429'ları) "Requested" değerini hem 512 (= `max_tokens`) hem 78–332 aralığında gösterdi. Talep her zaman `max_tokens` kadar sayılmıyor, ama ona kadar çıkabiliyor; 1024 limiti (1000) tek başına aşar. Memory atomu ve M5 bu ölçüme hizalandı. `route.ts`'teki gerekçe yorumu ("peşin rezerve ediyor") aynı inceliğe bir sonraki route dokunuşunda çekilsin — operatif hükmü (yükseltme canlıyı kırar) doğru, düzeltme task'ı gerektirmez.

### Task-Spesifik Teknik Öğrenimler

- **groq-sdk `create({ stream: true })` `APIPromise<Stream>` döner** — `await` şart; Anthropic'in senkron `messages.stream()`'inden farklı (18.03).
- **groq-sdk'nın istek `timeout`'u yalnız başlıklara kadar sayar ve retry'lanır; SSE iteratörü abort'u sessizce yutar** (`if (isAbortError(e)) return`). Akış ortasındaki iptalde `catch` çalışmaz, fallback döngü sonrasında bayrakla enqueue edilir (18.11, DECISIONS 2026-09-12).
- **SDK retry uykusu `retry-after`'ı dinler ve `AbortSignal` ile kesilemez** → `maxRetries: 0` (18.11).
- **Tip-yüklemeli `filter` runtime'da daraltma yapmaz.** Nesne `{ role, content }` olarak yeniden kurulmalı; aynı hamle `content`'i tek okumaya indirip getter yüzeyini kapatır (18.09).
- **next-intl 4 `NEXT_LOCALE` cookie'sini yalnız tarayıcı dili sayfa locale'inden farklıysa yazar.** Sunucu tarafında ziyaretçi dili için birincil kaynak Referer'dır (18.12, DECISIONS 2026-10-02).
- **Vitest sahte saati dinamik import'un gerçek I/O'sunu beklemez.** `advanceTimersByTimeAsync` pencerenin sonuna atlar; modül önbelleği `beforeAll`'da ısıtılmalı (18.12).
- **`git grep` pathspec'inde `':!_dev'` bu git'te exit 128 verir** (pathspec hatası, "eşleşme yok" değil). `':(exclude)_dev'` kullanılır; exit ≠ 0'ı "temiz" okuyan kapı fail-open olur (18.13).

### DevFlow'a Öneri

- **Commit'i olup kapanmamış task'ı mekanik olarak yakalayan bir kontrol yok.** TASK-18.08'in merge'ü ve `chore(TASK-18.08)` commit'i 2026-07-22'de atıldı, task dokümanına oturum kaydı düşmedi ve durum 7 hafta öyle kaldı. Öneri: `next`/`resume`, aktif fazdaki her `⬜`/`🔄` task için `git log --grep "TASK-X.YY"` bakıp "commit var, oturum kaydı yok" hâlini işaretlesin. Proje-özel değil, yöntemsel. (Kullanıcıya bildirildi.)
- **Faz 17'nin "geçici harness → kalıcı tohum" önerisi bu fazda üçüncü kez doğrulandı** (marka mührü harness'i 3 kez yazılıp silindi). Öneri aynı; yeni kalem değil, kanıt.

---

## Kalite Kontrol Sonuçları

> `/devflow:review-phase 18` oturumunda dolduruldu (2026-10-02). Güvenlik satırı faz-penceresi diff'i (`ed69ec7..8e5895b`) üzerinde değerlendirildi; son UAT commit'i (`8e5895b`) HEAD olduğu için UAT tablosu bugünkü kodu sınamıştır. Kanıtların çoğu UAT 4. koşumundan gelir (→ [PHASE-18-UAT.md](PHASE-18-UAT.md)).

| Eksen | Durum | Not |
|-------|-------|-----|
| Marka & Craft (imza) | ✅ | Canlı 5 dil: dil sadakati 20/20, garble 0, `Bunker` 0, fiyat probunda rakam 0, booking vaadi 0 (UAT 9–12). CTA betimleyici, DE `Sie` (UAT 28/29). Hata notu boş balonda boş satırla başlamıyor, AR'de RTL doğru (UAT 36/42). Kayıtlı küçük lekeler, bloke değil: TR "observable ve measured" yankısı, seyrek kelime tekrarı (18.07/18.08) → chatbot prompt cilası adayı. |
| Erişilebilirlik | ✅ | `Chatbot.tsx` faz penceresinde 0 satır değişti. CI `a11y` job HEAD'de 52 test geçti (UAT 27). AR balonu `direction: rtl` (UAT 36). |
| Performans | ✅ | İstemci bundle'ı değişmedi (UI dokunulmadı, `messages/*.json`'da yalnız `chat.error` değeri). `route.js` 43 KB, 5 dilin metni lazy chunk'ta ve yalnız hata anında yükleniyor (UAT 44). Canlı ~140 çağrıda 0 × 504, en uzun 1,7 s (UAT 33). Brief mobil perf açığı devralınan, bu fazın kapsamı dışı. |
| Yerelleştirme & RTL | ✅ | `chat.error` 5 dilde ziyaretçi kopyası (18.04, UAT 4). Hata notu ziyaretçinin dilinde: Referer → `NEXT_LOCALE` → TR (UAT 36/40/41). Bot hitabı dil başına sitenin hitabıyla hizalı (UAT 29). i18n parite 5/5, ters-çevirmeyle sınandı (UAT 16). |
| Modülerlik & Bakım | ✅ | Sanitizasyon saf modülde (`src/lib/chat-sanitize.ts`), route tek dosya, her sınır sabiti gerekçe yorumuyla. Model adı tek kaynakta: kod varsayılanı + README env tablosu, brief'e kopyalanmadı. Not: `resolveVisitorLocale` route içinde yaşıyor; DECISIONS 2026-10-02 konvansiyonu ikinci bir sunucu metni tüketicisi doğunca (v0.6 booking) onu `src/lib/`'e çıkarmayı gerektirir. |
| Hata Yönetimi & Degradasyon | ✅ | Anahtar yok → 503 (UAT 3). Girdi ihlali → 400 (UAT 6/7/8/21). Üst-akış hatası, ilk-token asılması ve stream-ortası sessizlik → 200 + ziyaretçinin dilinde not, `maxDuration`'a dayanmıyor (UAT 14/34/35). Retry kapalı, 429'da not 0,2–1,5 s'de geliyor (UAT 37). Platform hatası sızmıyor (UAT 32). |
| Güvenlik | ⚠️ | **Temiz olan:** girdi tam doğrulanıyor — dizi tipi, ham sayı ≤ 100, rol whitelist, `{role, content}` yeniden kurma, per-mesaj 8192 + toplam 16384 byte, trailing-user. Dinamik import yalnız `routing.locales` beyaz listesinden geçen değerle çalışıyor (path traversal 16/16 kapalı, UAT 40); `__proto__` kirletmiyor (UAT 25). Sır yalnız `process.env`'de, hata gövdeleri ve log anahtar taşımıyor (UAT 24). **⚠️ gerekçesi:** (1) `/api/chat`'te hız sınırı / origin kontrolü yok — kimliksiz POST sınırsız, günlük kota dışarıdan tüketilebilir (UAT 23 ❌, kapsam-dışı, v0.6 adayı). (2) npm audit 9 açık (1 kritik / 4 high / 4 moderate), çoğu `next@15.5.19` upstream'inde ve aralık-içi güncellemeyle kapanıyor; `package.json` Dokunulmaz → kullanıcı kararı bekliyor. groq-sdk sıfır açık ekledi. |
| Test Kapsamı | ✅ | Vitest 39 → **86** (7 dosya). `chat-sanitize.test.ts` 25 test, `chat-route-timeout.test.ts` 22 test (gerçek `route.ts` + gerçek `groq-sdk`, yalnız `fetch` sahte, sanal saat). Her davranış değişikliği kendi testini getirdi ve kapı bozuk girdiyle sınandı (UAT 26/38/43). LLM çıktısı CI'da test edilmiyor (bilinçli, DECISIONS 2026-07-21); o eksenin kapısı elle koşulan marka mührü harness'i ve kalıcı değil (→ Ne Kötü Gitti). |

---

## Alt Dokümanlar

- [PHASE-18-GOLIVE.md](PHASE-18-GOLIVE.md) — tarihsel-kayıt (marka mührü gate koşuları · model yeniden seçimi · iki canlı arızanın teşhisi · canlı kanıt artefaktları)
- [PHASE-18-ARASTIRMA.md](PHASE-18-ARASTIRMA.md) — araştırma-detayı (değerlendirilen Groq istemcileri · streaming adaptasyonu · byte-cap ölçüm kararı · dikkat edilecekler · teknik kararlar C.1–C.6)
- [PHASE-18-UAT.md](PHASE-18-UAT.md) — uat (4. koşumun 44 senaryosu ve kanıt notları · otomatik kontrol bulguları: CI, analiz araçları, npm audit, faz-penceresi güvenlik taraması, artefakt süpürmesi)

---

## Sonuç

- **Tamamlanma Tarihi:** 2026-10-02
- **Toplam Task:** 13 (18.01–18.08 plan + 18.09–18.13 üç düzeltme turu; hepsi ✅ ve arşivde)
- **Milestone karşılandı (6/6 ayak):** `route.ts` Groq'a geçti, streaming/sanitizasyon/zarif offline korundu (UAT 1/2/3/5) · system prompt TR-birincil + rakam uydurma yasağı (UAT 9/10) · per-mesaj byte cap (UAT 7/8) · 5 dil gözle doğrulandı (18.07 + UAT 9) · chatbot canlıda çalışıyor (UAT 1/30) · `M5` + OVERVIEW stack satırı güncel (review Adım 2'de okundu). Kapanış notu gerekmedi.
- **Kalite: 7 ✅ + 1 ⚠️** — ⚠️ Güvenlik (hız sınırı / origin yok, UAT 23; npm audit 9 açık, Dokunulmaz → kullanıcı kararı).
- **Kararlar** → `docs/DECISIONS.md` 2026-07-21 (sağlayıcı), 2026-07-22 (dil kuralı + `temperature`), 2026-09-11 ×2 (model + `max_tokens`; betimleyici CTA atfı + hitap), 2026-09-12 (zaman aşımı), 2026-10-02 (ziyaretçi dilinde sunucu metni).
- **Sonraki faza aktarılanlar:** v0.5 versiyon-sonu teknik borç fazı (discuss-phase `teknik_borç` damgalar). Adaylar: hız sınırı / origin, npm audit `next` güncellemesi, canlı chatbot sağlık kontrolü, marka mührü harness'inin kalıcılaşması, TB-3, prompt cilası, `GROQ_API_KEY` Preview env. Dal kuralı ve brief'in yetkisi → prd-review.

---

**Oluşturulma:** 2026-07-21
**Son Güncelleme:** 2026-10-02 — **review-phase 18: Faz 18 ✅ tamamlandı, faz donduruldu.** Milestone 6/6, kalite 7 ✅ + 1 ⚠️ (Güvenlik), düzeltme task'ı çıkmadı. Boyut (Adım 5b): retrospektif sonrası ~25,3k token → UAT Sonuçları [PHASE-18-UAT.md](PHASE-18-UAT.md)'ye bölündü, parent ~15,8k.
