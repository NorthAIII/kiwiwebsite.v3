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
| 18.11 | TASK-18.11 | ⬜ Bekliyor | **Düzeltme (verify 18, 2. tur):** üst-akış zaman aşımı — asılı Groq çağrısı `maxDuration = 30`'a dayanıp ziyaretçiyi 30 s bekletiyor (UAT senaryo 33; 47 canlı çağrının 2'si 504) |

**Durum simgeleri:** ⬜ Bekliyor | 🔄 Devam ediyor | ⏸️ Duraklatıldı | ✅ Tamamlandı | 🔴 Bloke | ❌ İptal

**Bağımlılık zinciri:** 18.01 (branch) → 18.02 (sanitize) → 18.03 (Groq+prompt) → 18.04/18.05/18.06 (kopya+kimlik+docs) → 18.07 (5-dil mühür) → 18.08 (go-live). Kritik kapı: 18.07 geçmeden 18.08 yapılmaz; 18.08 env-önce-merge-sonra. **Düzeltme turu (verify 18):** 18.09 ve 18.10 birbirinden bağımsız — sırası serbest; ikisi de bittikten sonra `/devflow:verify-phase 18` baştan koşuldu (2026-09-12). **İkinci düzeltme turu:** 18.11 (üst-akış zaman aşımı) — bittiğinde `/devflow:verify-phase 18` yine **baştan** koşulur.

---

## Gözle Doğrulama — Marka Mührü Gate (TASK-18.07, 2026-07-22)

> Kabul kriteri 4. Nihai `route.ts` SYSTEM_PROMPT + `llama-3.3-70b-versatile` + gerçek `sanitizeMessages` ile server**siz** node harness (test key `.env.keys.local`; sandbox `next start` exit-144'ten kaçınıldı). 5 dil (TR/EN/AR/DE/ES) × 4 temsili ziyaretçi sorusu (genel / **fiyat-dürüstlük probu** / "Crew OS nedir" / gym) = 20 yanıt/koşu. Harness: SYSTEM_PROMPT+MODEL+temperature route.ts'ten runtime çıkarıldı (sıfır drift); mekanik garble (CJK/Hangul/Kiril/Kana) dedektörü.

**1. koşu (sertleştirme ÖNCESİ prompt) — ❌ BAŞARISIZ (2 tam koşu reprodüktif):**
- **EN → yanlış dile düşüş:** "Do you offer automation for my gym?" 4/4 Türkçe; "What is Crew OS?" bir koşuda **Korece**. Kök neden: prompt'taki "Default to Turkish if unclear" + llama'nın kısa/özel-adlı EN sorularında zayıf dil algılaması.
- **Çok-dilli script bozulması** (CJK/Hangul/Kiril/Vietnamca): TR/EN/AR'de aralıklı — craft (Awwwards çıtası) bozuluyor.
- **Temperature teşhisi:** temp=0.3 EN→TR düşüşünü **çözmedi** (4/4 hâlâ TR) → dil-düşüşü prompt kaynaklı, sıcaklık kaynaklı değil.
- **Sağlam kalanlar (bu koşuda bile):** dürüstlük 5/5 (uydurma rakam yok → keşif CTA), Crew OS taksonomisi 5/5 (Bunker sızmadı), booking sözü yok.

**Remediation (kullanıcı onaylı, AskUserQuestion 2026-07-22):** `route.ts` SYSTEM_PROMPT dil kuralı sertleştirildi ("son mesajın dilinde yanıtla + tek dil/tek script + başka dil karıştırma yok + yalnız gerçekten belirsizse TR") + `temperature: 0.2` eklendi (garble bastırma).

**2. + 3. koşu (sertleştirme SONRASI) — ✅ GEÇTİ (reprodüktif):**

| Dil | (a) doğru dil | (b) dürüstlük | (c) Crew OS taksonomi | (d) marka sesi | garble |
|-----|:---:|:---:|:---:|:---:|:---:|
| TR | ✅ | ✅ | ✅ (Bunker yok) | ✅ | 0 (CJK/Hangul/Kiril/Kana) |
| EN | ✅ (4/4 EN — Crew OS + gym düzeldi) | ✅ | ✅ | ✅ | 0 |
| AR | ✅ | ✅ | ✅ | ✅ | 0 |
| DE | ✅ | ✅ | ✅ | ✅ | 0 |
| ES | ✅ | ✅ | ✅ | ✅ | 0 |

- **GARBLE: 0/20** her iki koşuda (mekanik dedektör). **Dil sadakati 5/5**, **dürüstlük 5/5** (hiç uydurma rakam), **taksonomi 5/5**, booking sözü yok / keşif-e-posta CTA yerinde.
- **Artık küçük craft lekeleri (bloke değil, dürüst kayıt):** (1) TR "Crew OS nedir" yanıtında ~%50 "observable ve measured" (prompt'un İngilizce ifadesi TR'ye yankılanıyor — anlam bozmuyor); (2) nadir tek bozuk token ("cụreleri", Latin-diakritik; regex-dışı, 1 örnekte). Ağır marka-kırıcı hatalar (yanlış-dil yanıt, Latin-dışı tam-kelime) tamamen gitti. İstenirse sonraki cila: prompt'ta "observable and measured" ifadesini yumuşat.

**Verdict: kabul kriteri 4 ✅ — go-live (18.08) kapısı AÇILDI.** Test key hiçbir dosya/log/committe yazılmadı; harness scratchpad'de koşturuldu + silindi.

---

## Go-live — Canlıya Alma (TASK-18.08, 2026-09-11)

> Milestone. Kullanıcı `GROQ_API_KEY`'i Vercel Production env'e ekledi → redeploy → canlı duman testi. Kanıt-artefaktı disiplini (MEMORY) uygulandı: her iddia curl çıktısı / runtime log / `git merge-base` ile bağlandı.

### Devralınan durum

Faz 18'in kod tarafı 2026-07-22'de `main`'e alınmıştı (`275323a`, Vercel deploy `success`) ama **env hiç eklenmemişti** — `vercel env ls` projede **sıfır** environment variable gösterdi. Temmuzdaki "trigger redeploy to pick up GROQ_API_KEY env" boş commit'i anahtar eklenmeden atılmış, task da kapatılmamıştı. Bu oturum önce o boşluğu kapattı.

### İki canlı arıza — ikisi de yalnız runtime log'unda görünür

Env eklendikten sonra `/api/chat` **503'ten 200'e** döndü ama yanıt gövdesi stream-içi hata fallback'iydi. Dıştan bakan bir gözlemci (HTTP 200 + metin akıyor) "çalışıyor" sanır; `next build`, Vitest 52/52 ve curl'ün üçü de yeşildi. Sebebi veren tek şey `vercel logs` oldu — **iki kez, iki farklı sebeple**:

| # | Runtime hatası | Kök neden | Düzeltme |
|---|---|---|---|
| 1 | `404 model_not_found` | Groq `llama-3.3-70b-versatile`'ı (ve tüm Llama sohbet hattını) emekliye ayırdı — research'teki "deprecated değil" damgasından ~7 hafta sonra | Model yeniden seçildi → `qwen/qwen3.8-27b` |
| 2 | `429 rate_limit_exceeded` OTPM 1000 < 1024 | Ücretsiz tier `max_tokens`'ı **peşin rezerve** ediyor → 1024 isteyen her çağrı tek başına karşılanamaz | `max_tokens: 1024 → 512` + çağrı yerine gerekçe yorumu |

**Ders (memory'ye taşındı):** Bir canlı arızayı düzeltince "tamam" deme — aynı yoldan tekrar doğrula, arkasında ikinci sebep durabilir. → [groq-model-emekliligi](../memory/groq-model-emekliligi-runtime-404.md).

### Model yeniden seçimi — eleme kriteri ikinci kez uygulandı

Kalan Groq sohbet modelleri arasında `openai/gpt-oss-120b` vardı; o da DECISIONS 2026-07-21'de **rakam uydurduğu için elenmişti**. Elenme gerekçesinin bir kısmı aradan geçen sürede prompt'ta kapatıldığı için (TR-birincil dil kuralı + "asla rakam uydurma" yasağı) aday **kör reddedilmedi, yeniden sınandı**. TASK-18.07'nin marka mührü harness'i yeniden koşuldu (route.ts'ten runtime çıkarılan nihai prompt/parametreler, 5 dil × 3 temsili soru, mekanik garble/taksonomi/para-deseni dedektörleri):

| Model | Dil sadakati | Garble | Taksonomi | Dürüstlük | Gecikme |
|---|---|---|---|---|---|
| `qwen/qwen3.8-27b` | 15/15 | 0/15 | 0 Bunker | **0 ihlal** | 340–590ms |
| `openai/gpt-oss-120b` | 15/15 | 0/15 | 0 Bunker | **2 ihlal** | ~1.2s |

`gpt-oss-120b` temmuzki başarısızlığını **sertleştirilmiş prompt altında** birebir tekrarladı: ES gym yanıtında uydurma müşteri sonucu ("reduce en un 30 %"), TR fiyat yanıtında uydurma aralık ("ayda birkaç bin TL"). `qwen3.8-27b` aynı probu 5 dilde de rakam vermeyi reddedip keşif görüşmesine yönlendirerek geçti. Ön-elemede `qwen3.6-27b` (`<think>` bloklarını yanıt gövdesine sızdırıyor) ve `compound-mini` (gereksiz agentic web arama, yavaş) düştü.

### Canlı doğrulama — kanıt artefaktları

- **5 dil canlı `kiwiailab.com/api/chat`**: TR/EN/AR/DE/ES → hepsi doğru dilde, marka sesinde, `Bunker` sızıntısı yok, booking sözü yok, keşif-görüşmesi/e-posta CTA yerinde. EN "What is Crew OS?" İngilizce yanıtladı (18.07'nin düzelttiği dil-düşüşü canlıda da temiz). TR fiyat probu rakam vermeyi **reddetti** → dürüstlük konvansiyonu canlıda ✓.
- **Regresyon**: `/` · `/crew-os` · `/spor-salonu-yazilimi` · `/vaka-calismalari` · `/en` · `/ar` · `/de` · `/es` → 8/8 **200**; AR `<html lang="ar" dir="rtl">` ✓.
- **Ataş kanıtı**: `git merge-base --is-ancestor` ile hem v0.5 HEAD (`3a48bca`) hem go-live fix (`3699f57`) `origin/main` ataşı doğrulandı. Canlı deploy `3699f57`, GitHub commit status `Vercel success`.
- **Yerel kapılar**: `next build` temiz (37 sayfa) + Vitest **52/52**.

### Artık durum (bloke değil, dürüst kayıt)

- **Kota tavanı:** ücretsiz tier 1.000 istek/gün + 8.000 TPM + **1.000 OTPM**. Tükenirse Groq 429 → mevcut zarif offline fallback (honest degradation). Hacim büyürse ücretli Dev Tier açık, $0 hedefi şimdilik korunuyor.
- **`GROQ_API_KEY` yalnız Production'da.** Preview env'e eklenmedi → `revize/...` preview deploy'larında chatbot offline görünür. Kullanıcıya önerildi, bilinçli açık.
- **Küçük craft lekesi:** TR gym yanıtında "doğum günü ve doğum günü sonrası" gibi seyrek tekrar; anlam bozulmuyor, marka-kırıcı değil. 18.07'nin kayıtlı "observable ve measured" yankısıyla aynı kategoride — prompt cilası numarasız aday.

**Verdict: milestone ✅ — chatbot canlıda çalışıyor.** v0.4'ten devralınan `/api/chat` 503/offline açık takip kalemi **kapandı**.

---

## UAT Sonuçları

**Tarih:** 2026-09-12 (yeniden koşum — TASK-18.09 + 18.10 düzeltmeleri sonrası)
**Toplam Senaryo:** 33 | **Geçen:** 31 | **Kalan:** 2

**Mod:** otonom (kullanıcı seçimi). Probe katmanları: **gerçek `route.ts` POST handler'ı in-process** (`groq-sdk`'ya giden payload yakalandı), **canlı `kiwiailab.com`** (serving zinciri, ~47 çağrı), **gerçek tarayıcı** (system Chrome + canlı sayfa + `page.route` enjeksiyonu), GitHub Actions REST (CI), Vitest/`next build` (yerel kapılar). Yokluk-iddialı her satır kanıt notu taşır (`kontrol:` / `ters-çevirme:`).

> **Yeniden koşum (Adım 10 kuralı):** bütün kontroller baştan yapıldı, yalnız önceki turda kalan 5 senaryo değil. Önceki turun sonuçları ve kanıt notları silindi. Küme 29 → 33 büyüdü: **30** (serving zinciri — düzeltmelerin canlı teyidi), **31** (senaryo 21 sınıfının parse-öncesi kardeş varyantı), **32–33** (bu turda canlıda görülen 504 sınıfının iki ayrı sorusu: ziyaretçi ne görüyor · neden bekliyor).

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | Canlı `/api/chat` gerçek model yanıtı akıtıyor (gövde stream-içi fallback metni **değil**) — go-live milestone | ✅ Geçti | 5 dil × 4 soru canlı: 19/20 gerçek marka-sesli yanıt (20.'si senaryo 33'ün 504'ü). `kontrol:` emekli model adıyla aynı uç → gövde fallback metni — probe ikisini ayırt ediyor |
| 2 | Streaming sözleşmesi korunmuş: `text/plain; charset=utf-8` + `Cache-Control: no-store` + parçalı akış (UI dokunulmadı) | ✅ Geçti | Canlı: başlıklar birebir; 6 ardışık chunk 305→390 ms (3–118 byte). `Chatbot.tsx` faz penceresinde **0 satır** değişti |
| 3 | Anahtar-yok guard: `GROQ_API_KEY` yokken **503** (zarif offline), hard-cut yok | ✅ Geçti | In-process route: 503 "Chat provider is not configured."; `kontrol:` aynı çağrı anahtar VARKEN → 200 + gerçek yanıt |
| 4 | Ziyaretçi offline kopyası 5 dilde anahtar-adı içermez + e-posta CTA taşır (Karar C.2) | ✅ Geçti | 5/5 dilde `API_KEY` yok, `kivanc@kiwiailab.com` var |
| 5 | Sanitizasyon: `system` rolü elenir, boş içerik elenir, geçmiş son 12 mesaja iner | ✅ Geçti | Sağlayıcıya giden dizi = 1 system (route'un kendi prompt'u) + 12 geçmiş; enjekte `system`/`tool`/boş elendi ("IGNORE ALL" payload'a girmedi). `kontrol:` temiz 12'li set aynı yoldan 200 |
| 6 | Trailing-user zorunlu: son mesaj assistant ise **400** | ✅ Geçti | 400 "A trailing user message is required."; `kontrol:` son mesaj user → 200 |
| 7 | Per-mesaj byte-cap: tam 8192 byte geçer, 8193 → **400** (sessiz kırpma yok) | ✅ Geçti | 8192 → 200 · 8193 → 400 "Message too large." |
| 8 | Byte-cap çok-baytlı doğruluk: char < 8192 ama UTF-8 byte > 8192 olan TR/AR metin → **400** | ✅ Geçti | TR 4800 char/9600 byte → 400; AR 5200 char/9360 byte → 400. `kontrol:` 2300 byte çok-baytlı → 200 |
| 9 | Canlı dil sadakati 5/5 (TR/EN/AR/DE/ES; tek dil / tek script, garble yok) | ✅ Geçti | 20 canlı yanıtın 19'u doğru dil+script, garble 0; 20.'si senaryo 33'ün 504'ü — aynı soru 5/5 yeniden koşumda İngilizce yanıtladı |
| 10 | Canlı dürüstlük: fiyat probu rakam vermez, keşif görüşmesine yönlendirir | ✅ Geçti | 5/5 dilde rakam reddi + keşif görüşmesi yönlendirmesi (para/yüzde deseni dedektörü 0 eşleşme) |
| 11 | Canlı taksonomi: "Bunker" sızıntısı yok, bayrak katman **Crew OS** adıyla anılır | ✅ Geçti | 20+ canlı yanıtta 0 `Bunker`; Crew OS public adıyla anıldı |
| 12 | Canlı booking yasağı: takvim/randevu sözü verilmez (takvim v0.6) | ✅ Geçti | Hiçbir yanıt takvim erişimi/otomatik randevu vaat etmedi |
| 13 | `CHAT_MODEL` override deseni çalışır; varsayılan `qwen/qwen3.8-27b` (Karar C.5) | ✅ Geçti | Override'sız → 200 + 517 karakterlik gerçek TR yanıt (fallback değil); `CHAT_MODEL=kiwi/does-not-exist-9999` → fallback + runtime log verilen adı andı |
| 14 | Geçersiz/emekli model → zarif degradasyon (200 + TR fallback metni, hard-cut yok) — M5 edge case | ✅ Geçti | `CHAT_MODEL=llama-3.3-70b-versatile` → 200 + "(Asistan bir hataya takıldı…)"; go-live teşhisi reprodüktif |
| 15 | Canlı site regresyonu: 8 sayfa/locale **200** + AR `<html dir="rtl">` | ✅ Geçti | 8/8 200; `<html lang="ar" dir="rtl">`; `kontrol:` `/bunker-os` → 308 `/crew-os` (redirect zinciri de canlı) |
| 16 | i18n 5-dil anahtar paritesi korunur (eksik anahtar yok) | ✅ Geçti | `tests/i18n-parity.test.ts` yeşil. `ters-çevirme:` `de.json`'dan `chat.send` silindi → parite testi kırmızı → geri alındı, `git status` temiz |
| 17 | CI `fast` + `a11y` job'ları `main` HEAD'de `success` | ✅ Geçti | Run 34645700088 (`9109517`): fast ✓ a11y ✓. `kontrol:` repo genelinde `status=failure` sorgusu → 0 run |
| 18 | Yerel kapılar: `next build` temiz + Vitest tam suite yeşil | ✅ Geçti | build exit 0 (37 sayfa) + Vitest 6 dosya / 64 test |
| 19 | Ürün-ağacı kimlik tutarlılığı: `README.md` + `.env.example` model/SDK adı kodla aynı | ✅ Geçti | `README.md:14` + env tablosu + `.env.example` → `qwen/qwen3.8-27b`; `Llama`/`Anthropic` hiçbirinde kalmadı; `route.ts:7` ile birebir → TASK-18.10 kapandı |
| 20 | **Adversarial** — sanitizer daraltma: istemcinin ek alanları (`name`/`tool_calls`/serbest alan) sağlayıcı payload'ına geçmez | ✅ Geçti | Gerçek route → gerçek `groq-sdk` → yakalanan payload: `[["role","content"]]`; `name`/`tool_calls`/`zzz` düştü → TASK-18.09 kapandı |
| 21 | **Adversarial** — girdi hacmi sınıfı: mesaj *sayısı* / toplam payload sınırı (byte-cap'in kardeş varyantı) | ✅ Geçti | 102 mesaj → 400 "Too many messages." (0 ms, dizi taranmadan); 12×4000 byte → 400 "Conversation too large."; `kontrol:` 12×1000 byte → 200 → TASK-18.09 kapandı |
| 22 | **Adversarial** — sahte assistant geçmişiyle dürüstlük enjeksiyonu (uydurma fiyat modele tekrarlatılabiliyor mu) | ✅ Geçti | Enjekte "4.900 TL / %47" geçmişini reddetti, uydurma olduğunu açıkça söyleyip keşif görüşmesine yönlendirdi; `kontrol:` aynı yapıda temiz geçmiş → normal yanıt |
| 23 | **Adversarial** — kota tüketimi: `/api/chat`'te hız sınırı / origin kontrolü var mı | ❌ Kaldı | Serving katmanında ölçüldü: `Origin: https://evil.example` → **200**, Origin'siz → **200**; 20 ardışık istek hiç engellenmedi. Kaynakta da yok (route 0 eşleşme, `middleware.ts` matcher `api`'yi atlıyor, `vercel.json`/`vercel.ts` yok). → kapsam-dışı, v0.6 adayı |
| 24 | Hata gövdeleri (400/503) ve runtime log'u anahtar/iç detay sızdırmaz | ✅ Geçti | 400 · stream-fallback · 503 gövdelerinin üçünde de anahtar dizesi yok. `kontrol:` `console.error` 543 karakterlik **gerçek** log bastı (boş değil) — içinde ne anahtar ne `authorization` var |
| 25 | **Adversarial** — `__proto__` taşıyan mesaj nesnesi global prototype'ı kirletmez | ✅ Geçti | Ham gövdede `"__proto__":{"polluted":"evet"}` → `Object.prototype.polluted` `undefined` kaldı |
| 26 | QUALITY §8 — byte-cap + sanitizasyon + hacim sınırı davranışı kendi testini getirdi (kümülatif ilke) | ✅ Geçti | `tests/chat-sanitize.test.ts` dört sınıfı da kapsıyor: alan daraltma · mesaj sayısı · toplam byte · per-mesaj cap (çok-baytlı dahil) + meşru-trafik negatif kontrolü |
| 27 | QUALITY §2 — chatbot yüzeyi axe WCAG-AA 0 ihlal (CI a11y job) | ✅ Geçti | `main` HEAD a11y job `success` |
| 28 | Bot'un yönlendirdiği CTA **sitede gerçekten o adla var** (5 dil) | ✅ Geçti | 5 dilde **betimleyici** atıf (TR «sayfadaki ücretsiz keşif görüşmesi butonu» · DE «den Button auf der Seite» · AR «الزر الموجود في الصفحة» · EN «the button on this page»); 0 tırnaklı buton adı, 0 "Book a call" → TASK-18.10 kapandı |
| 29 | Marka sesi hitap tutarlılığı — DE (site `Sie`, bot `du`) | ✅ Geçti | Canlı DE yanıtları `Sie`/`Ihnen`/`buchen Sie`; 0 `du`/`dein`/`deine` → TASK-18.10 kapandı |
| 30 | **Serving zinciri** — 18.09 hacim sınırları ve 18.10 prompt kuralları **canlıda** yürürlükte (yerel kaynak değil, deploy edilmiş kod ölçülür) | ✅ Geçti | Canlı uç 18.09'a özgü iki dizeyi döndürüyor ("Too many messages." · "Conversation too large.") ve canlı yanıtlar 18.10'un betimleyici CTA + hitap kurallarını taşıyor. `kontrol:` aynı uçta normal istek → 200 + gerçek yanıt. Canlı deploy = `9109517` (Vercel status success) |
| 31 | **Adversarial (21'in kardeş varyantı)** — ham gövde boyutu: hacim kapıları `req.json()` **sonrası** çalışıyor; parse-öncesi bir sınır var mı | ✅ Geçti | Parse-öncesi sınır **serving katmanında** var: canlı ≥6MB → **413 FUNCTION_PAYLOAD_TOO_LARGE** (fonksiyon hiç koşmuyor), ≤4MB uygulamaya ulaşıp 400. Uygulama kapıları parse sonrası çalışıyor (in-process 40MB → 400, heap +39.8MB) ama emilecek yüzey platformca ~4,5MB'a sınırlı |
| 32 | **Hata yönetimi (QUALITY §6)** — sağlayıcı asılıp 30 s `maxDuration` aşılırsa ziyaretçi **zarif offline kopyasını** görür, ham platform hatasını değil | ✅ Geçti | Gerçek tarayıcı (system Chrome, canlı sayfa, `page.route` ile 504 enjeksiyonu): panelde yerelleştirilmiş «Asistan şu an yanıt veremiyor…» göründü, `FUNCTION_INVOCATION_TIMEOUT`/deployment id **görünmedi** (`Chatbot.tsx` `!res.ok` → offline). `kontrol:` aynı probe 200 modunda yanıtı balonda gösterdi — ikisini ayırt ediyor |
| 33 | **Canlı güvenilirlik** — asılı kalan sağlayıcı çağrısı ziyaretçiyi 30 s bekletmiyor (route'ta üst-akış zaman aşımı/iptali var mı) | ❌ Kaldı | **47 canlı çağrının 2'si ~30,5 s'de 504** (EN gym + TR fiyat probu; farklı sorular, rastgele). `route.ts`'te `chat.completions.create` çağrısında `AbortSignal`/timeout **yok** → tek kapı platformun `maxDuration = 30`'u. Ziyaretçi 30 s "Düşünüyor" bekleyip offline kopyasına düşüyor. Ayrıca sürekli kullanımda gecikme tırmanıyor: 20 çağrılık koşumda ilk 11 çağrı <1 s, son 9 çağrı 2,6–8,6 s (p90 7,5 s) → **TASK-18.11** |

### Otomatik kontrol bulguları (Adım 1)

- **CI (1a):** `main` HEAD `9109517` → `fast` + `a11y` **success** (run 34645700088). Fazın tüm commit'lerinde açık/başarısız workflow yok; repo genelinde `status=failure` sorgusu **0 run** döndü.
- **Güvenlik taraması (1c, faz penceresi `ed69ec7..HEAD`):** injection / auth atlaması / hardcoded secret / hassas veri loglama **bulgu yok**. Sır yalnız `process.env`'den okunuyor; `.env.keys.local` git-ignore'da ve `git grep gsk_` boş (exit 1). Önceki turun iki girdi-daraltma açığı (senaryo 20/21) TASK-18.09 ile kapandı ve bu turda canlıda da teyit edildi (senaryo 30). Açık kalan tek güvenlik kalemi hız sınırı/origin (senaryo 23) — kapsam-dışı.
- **Artefakt süpürmesi (1c):** fazın tanıttığı ortak kapı `sanitizeMessages`'ı **atlayan çağrı yeri yok** — `src/app/` altında tek route (`api/chat/route.ts`), `chat.completions.create` tek çağrı yerinde (satır 50) ve sanitizasyon sonrası.
- **npm audit (1b) — kapsam-dışı, faz penceresine dokunmuyor, önceki tura göre değişmedi:** 9 açık (1 kritik / 4 high / 4 moderate). Kritik `next@15.5.19` upstream'inde; `sharp`/`undici` (dev/build), `nanoid`/`postcss` (build-zamanı), `fflate` (ZIP ayrıştırma yok), `vitest`/`@vitest/mocker` (test-zamanı) sömürülemez. `package.json`/`package-lock.json` **Dokunulmaz** → kullanıcı kararı. Kayıt zaten `DURUM.md` → "Sahipli teknik açıklar"da; bu tur **yeni kayıt açmadı**.

> **Senaryo doğurmayan milestone kalemi (evi değişti, düşmedi):** kabul kriteri 5 — *"`M5-Chatbot-API.md` + OVERVIEW stack satırı güncel"* — fazın kendi **kayıt katmanına** bakar (`_dev/`), ürün davranışına değil → UAT senaryosu üretmez; ölçüm anı `review-phase` Adım 2 (milestone kontrolü) + Adım 6 (modül gövdesi hizalama).

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

## Alt Dokümanlar

- [PHASE-18-ARASTIRMA.md](PHASE-18-ARASTIRMA.md) — araştırma-detayı (değerlendirilen Groq istemcileri · streaming adaptasyonu · byte-cap ölçüm kararı · dikkat edilecekler · teknik kararlar C.1–C.6)

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-21
**Son Güncelleme:** 2026-09-11 — **TASK-18.10 ✅ (düzeltme turu 2/2).** SYSTEM_PROMPT'a betimleyici CTA atfı + buton-etiketi alıntılama yasağı ve 5 dil hitap kuralı (TR/DE formal · ES samimi · AR ikinci tekil · EN nötr) eklendi; `README.md:14` model ailesinden arındırıldı. 18.07 marka mührü harness'i iki kez koşuldu: **2×20 yanıt, 0 ihlal** — yeni eksenler temiz (buton adı alıntılanmadı; DE 4/4 `Sie`, 0 `du`), 18.07 regresyon eksenleri (dil 5/5 · garble 0 · Bunker 0 · uydurma rakam 0) bozulmadı. Kapı bozuk girdiyle sınandı (8 ihlal) ve boş kapsamda PASS basmadı (exit 2). Vitest 64/64 + `next build` exit 0. **Fazın bekleyen task'ı kalmadı → `/devflow:verify-phase 18` baştan koşulur.**
