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

**Tarih:** 2026-09-12 (3. koşum — TASK-18.11 düzeltmesi sonrası)
**Toplam Senaryo:** 39 | **Geçen:** 36 | **Kalan:** 3

**Mod:** otonom (kullanıcı seçimi). Probe katmanları: **gerçek `route.ts` POST handler'ı in-process** (gerçek `groq-sdk`, sahte `fetch` → sağlayıcıya giden payload yakalandı), **gerçek Groq API** (yerel, gerçek anahtar — üst-akış hata sınıfı için), **canlı `kiwiailab.com`** (~90 çağrı), **gerçek tarayıcı** (system Chrome + canlı sayfa + `page.route` enjeksiyonu), GitHub Actions REST (CI), Vitest/`next build` (yerel kapılar). Yokluk-iddialı her satır kanıt notu taşır (`kontrol:` / `ters-çevirme:`).

> **Yeniden koşum (Adım 10 kuralı):** bütün kontroller baştan yapıldı. Önceki turun sonuçları ve kanıt notları silindi; `→ TASK-X.YY` izleri korundu. Küme 33 → 39 büyüdü: TASK-18.11'in üst-akış zaman aşımı sözleşmesi ürün davranışı olarak ilk kez ölçüldü (**34** iki asılma ayağı, **35** meşru yavaş yanıt, **36** fallback metninin dili, **37** `maxRetries: 0` bütçe koruması, **38** kümülatif test), ve senaryo 19'un sınıf süpürmesi bir kardeş varyant açtı (**39**).

| # | Senaryo | Sonuç | Not |
|---|---------|-------|-----|
| 1 | Canlı `/api/chat` gerçek model yanıtı akıtıyor (gövde stream-içi fallback metni **değil**) — go-live milestone | ✅ Geçti | Yavaş tempolu 5 dil × 4 soru: 20/20 gerçek marka-sesli yanıt. `kontrol:` aynı uç kota baskısı altında fallback metni döndü — probe ikisini ayırt ediyor |
| 2 | Streaming sözleşmesi korunmuş: `text/plain; charset=utf-8` + `Cache-Control: no-store` + parçalı akış (UI dokunulmadı) | ✅ Geçti | Canlı başlıklar birebir; 20 çağrıda 9–28 parça, parça arası 0,014–0,127 s. `Chatbot.tsx` faz penceresinde **0 satır** değişti |
| 3 | Anahtar-yok guard: `GROQ_API_KEY` yokken **503** (zarif offline), hard-cut yok | ✅ Geçti | In-process route: 503 "Chat provider is not configured.", üst-akışa hiç gidilmiyor. `kontrol:` aynı çağrı anahtar VARKEN → 200 + gerçek yanıt |
| 4 | Ziyaretçi offline kopyası 5 dilde anahtar-adı içermez + e-posta CTA taşır (Karar C.2) | ✅ Geçti | 5/5 dilde anahtar adı yok, `kivanc@kiwiailab.com` var, kopya o dilde yazılmış |
| 5 | Sanitizasyon: `system` rolü elenir, boş içerik elenir, geçmiş son 12 mesaja iner | ✅ Geçti | Yakalanan payload = 1 system (route'un kendi prompt'u) + 12 geçmiş; enjekte `system`/`tool`/boş elendi ("IGNORE ALL" payload'a girmedi). `kontrol:` temiz 12'li set aynı yoldan 200 |
| 6 | Trailing-user zorunlu: son mesaj assistant ise **400** | ✅ Geçti | 400 "A trailing user message is required."; `kontrol:` son mesaj user → 200 |
| 7 | Per-mesaj byte-cap: tam 8192 byte geçer, 8193 → **400** (sessiz kırpma yok) | ✅ Geçti | 8192 → 200 · 8193 → 400 "Message too large." (in-process + canlı uçta birebir) |
| 8 | Byte-cap çok-baytlı doğruluk: char < 8192 ama UTF-8 byte > 8192 olan TR/AR metin → **400** | ✅ Geçti | TR 4800 char/9600 byte → 400; AR 5200 char/10400 byte → 400. `kontrol:` 2300 byte çok-baytlı → 200 |
| 9 | Canlı dil sadakati 5/5 (TR/EN/AR/DE/ES; tek dil / tek script, garble yok) | ✅ Geçti | 20/20 doğru dil + doğru script (AR arap, diğerleri latin), garble 0. `kontrol:` dedektör 18.07'nin Korece düşüş örneğinde kırmızı veriyor |
| 10 | Canlı dürüstlük: fiyat probu rakam vermez, keşif görüşmesine yönlendirir | ✅ Geçti | 5/5 dilde rakam reddi + keşif yönlendirmesi. Dedektör **genişletildi** — ilk hâli sözel aralığı ("birkaç bin TL") kaçırıyordu; genişletilmiş dedektör 7/7 bilinen kusur sınıfında kırmızı, canlı 20 yanıtta **0 ihlal** |
| 11 | Canlı taksonomi: "Bunker" sızıntısı yok, bayrak katman **Crew OS** adıyla anılır | ✅ Geçti | 20 canlı yanıtta 0 `Bunker`; Crew OS public adıyla anıldı. `kontrol:` dedektör "Bunker OS üzerinde çalışır" örneğinde kırmızı |
| 12 | Canlı booking yasağı: takvim/randevu sözü verilmez (takvim v0.6) | ✅ Geçti | 20/20 yanıtta takvim/randevu vaadi yok. `kontrol:` dedektör "takvimimden randevu ayarlayabilirim" örneğinde kırmızı |
| 13 | `CHAT_MODEL` override deseni çalışır; varsayılan `qwen/qwen3.8-27b` (Karar C.5) | ✅ Geçti | Yakalanan payload: `model=qwen/qwen3.8-27b`, `max_tokens=512`, `temperature=0.2`, `stream=true` |
| 14 | Geçersiz/emekli model → zarif degradasyon (200 + TR fallback metni, hard-cut yok) — M5 edge case | ✅ Geçti | Üst-akış 404 `model_not_found` → 200 + fallback; go-live teşhisi reprodüktif |
| 15 | Canlı site regresyonu: 8 sayfa/locale **200** + AR `<html dir="rtl">` | ✅ Geçti | 8/8 200; `<html lang="ar" dir="rtl">`; `kontrol:` `/bunker-os` → 308 `/crew-os` |
| 16 | i18n 5-dil anahtar paritesi korunur (eksik anahtar yok) | ✅ Geçti | `tests/i18n-parity.test.ts` yeşil. `ters-çevirme:` `de.json`'dan `chat.send` silindi → parite testi kırmızı → geri alındı, `git status` temiz |
| 17 | CI `fast` + `a11y` job'ları `main` HEAD'de `success` | ✅ Geçti | Run 34654953320 (`6ae2c3a`): fast ✓ a11y ✓. `kontrol:` repo genelinde `status=failure` sorgusu → 0 run |
| 18 | Yerel kapılar: `next build` temiz + Vitest tam suite yeşil | ✅ Geçti | build exit 0 (37 sayfa) + Vitest 7 dosya / 69 test (boş koşum değil) |
| 19 | Ürün-ağacı kimlik tutarlılığı: `README.md` + `.env.example` model/SDK adı kodla aynı | ✅ Geçti | Üçü de `qwen/qwen3.8-27b`; `README.md` SDK satırı `groq-sdk`. Sınıf süpürmesi kardeş varyant açtı → senaryo 39 | → TASK-18.10 |
| 20 | **Adversarial** — sanitizer daraltma: istemcinin ek alanları (`name`/`tool_calls`/serbest alan) sağlayıcı payload'ına geçmez | ✅ Geçti | Yakalanan payload'da her mesaj tam olarak `["content","role"]`; `name`/`tool_calls`/`function_call`/serbest alan düştü | → TASK-18.09 |
| 21 | **Adversarial** — girdi hacmi sınıfı: mesaj *sayısı* / toplam payload sınırı (byte-cap'in kardeş varyantı) | ✅ Geçti | 102 mesaj → 400 "Too many messages."; 12×4000 byte → 400 "Conversation too large."; `kontrol:` 12×1000 byte → 200 | → TASK-18.09 |
| 22 | **Adversarial** — sahte assistant geçmişiyle dürüstlük enjeksiyonu (uydurma fiyat modele tekrarlatılabiliyor mu) | ✅ Geçti | Canlı: enjekte "4.900 TL / %47" geçmişini reddetti, uydurma olduğunu açıkça söyleyip keşif görüşmesine yönlendirdi. `kontrol:` aynı yapıda temiz geçmiş → normal yanıt |
| 23 | **Adversarial** — kota tüketimi: `/api/chat`'te hız sınırı / origin kontrolü var mı | ❌ Kaldı | Serving katmanı: `Origin: https://evil.example` ve `Referer: evil` ile aynı sonuç, 20 ardışık istek hiç engellenmedi (20/20 aynı kod). Kaynakta da yok (route 0 eşleşme, `middleware.ts` matcher `api`'yi atlıyor, `vercel.json`/`vercel.ts` yok). → kapsam-dışı, v0.6 adayı |
| 24 | Hata gövdeleri (400/503) ve runtime log'u anahtar/iç detay sızdırmaz | ✅ Geçti | Canlı 3 hata gövdesi + in-process 400/503/stream-fallback: anahtar dizesi, `authorization`, dosya yolu, stack yok. `kontrol:` `console.error` **619 karakterlik gerçek** log bastı (boş değil) — içinde anahtar yok |
| 25 | **Adversarial** — `__proto__` taşıyan mesaj nesnesi global prototype'ı kirletmez | ✅ Geçti | Ham gövdede iki seviyede `"__proto__":{"polluted":…}` → `Object.prototype` temiz kaldı |
| 26 | QUALITY §8 — byte-cap + sanitizasyon + hacim sınırı davranışı kendi testini getirdi (kümülatif ilke) | ✅ Geçti | `tests/chat-sanitize.test.ts` sekiz describe bloğu dört sınırı da kapsıyor + meşru-trafik negatif kontrolü |
| 27 | QUALITY §2 — chatbot yüzeyi axe WCAG-AA 0 ihlal (CI a11y job) | ✅ Geçti | `main` HEAD a11y job `success`; "Playwright/axe (a11y `/` light+dark)" adımı success, 3 spec dosyası koşuyor (boş job değil) |
| 28 | Bot'un yönlendirdiği CTA **sitede gerçekten o adla var** (5 dil) | ✅ Geçti | 5 dilde **betimleyici** atıf (TR «sayfadaki ücretsiz keşif görüşmesi butonu» · EN «the button on this page» · AR «الزر الموجود في الصفحة» · DE «den Button auf der Seite» · ES «el botón de la página»); tırnaklı buton adı 0 | → TASK-18.10 |
| 29 | Marka sesi hitap tutarlılığı — DE (site `Sie`, bot `du`) | ✅ Geçti | DE 4/4 yanıt `Sie`/`Ihnen`/`Ihre`, **0** `du`/`dein`. Ek: TR 4/4 formal (sen-formu 0), ES 4/4 `tú` — üç dil de site kopyasıyla hizalı | → TASK-18.10 |
| 30 | **Serving zinciri** — düzeltmeler **canlıda** yürürlükte (yerel kaynak değil, deploy edilmiş kod ölçülür) | ✅ Geçti | Canlı deploy = `6ae2c3a` (HEAD, Vercel status success). 18.09 izleri: canlı uç "Too many messages." / "Conversation too large." / "Message too large." döndürüyor. 18.10 izleri: canlı yanıtlar betimleyici CTA + DE `Sie` taşıyor. 18.11 izi: kota baskısında canlı fallback **0,39–0,45 s**'de döndü — SDK retry uykusu yok, yani `maxRetries: 0` canlıda yürürlükte |
| 31 | **Adversarial (21'in kardeş varyantı)** — ham gövde boyutu: hacim kapıları `req.json()` **sonrası** çalışıyor; parse-öncesi bir sınır var mı | ✅ Geçti | Parse-öncesi sınır **serving katmanında**: canlı ~7,5MB → **413 FUNCTION_PAYLOAD_TOO_LARGE** (fonksiyon hiç koşmuyor); `kontrol:` ~2MB uygulamaya ulaşıp 400 "Message too large." — ikisi ayrışıyor. In-process 38,2MB → 400 (uygulama kapısı parse sonrası ama emilecek yüzey platformca sınırlı) |
| 32 | **Hata yönetimi (QUALITY §6)** — sağlayıcı tarafı hata/kesinti ziyaretçiye ham platform hatası olarak sızmıyor | ✅ Geçti | Gerçek tarayıcı (system Chrome, canlı `/en`, `page.route` ile 504 enjeksiyonu): panelde yerelleştirilmiş «The assistant can't respond right now…» göründü, `FUNCTION_INVOCATION_TIMEOUT`/deployment id **görünmedi**. `kontrol:` aynı probe 200 modunda gerçek yanıtı balonda gösterdi |
| 33 | **Canlı güvenilirlik** — asılı kalan sağlayıcı çağrısı ziyaretçiyi 30 s bekletmiyor; canlı 504 oranı (≥30 çağrı) | ✅ Geçti | Bu oturumda **~90 canlı çağrı, 0 tane 504** (önceki tur: 47 çağrının 2'si ~30,5 s'de 504). En uzun çağrı 1,44 s. Not: asılma hiç oluşmadığı için canlı zincirde zaman aşımının **tetiklenmesi** doğrudan gözlenmedi — tetiklendiğindeki davranış senaryo 34'te route katmanında ölçüldü | → TASK-18.11 |
| 34 | **Zaman aşımı sözleşmesi (M5 kabul kriteri)** — ilk token hiç gelmezse **ve** akış ortada susarsa yanıt 200 + fallback ile kapanıyor, `maxDuration`'a dayanmıyor | ✅ Geçti | Gerçek route + gerçek `groq-sdk` + sanal zaman: ilk-token asılması 20–21 s'de, stream-ortası sessizlik 5–6 s'de, sınır-altı damlama ≤25 s'de kapanıyor — üçü de 30 s'nin altında. `ters-çevirme:` (a) bekçi kapatıldı → 3 test kırmızı; (b) yalnız stream-ortası fallback kaldırıldı → 2 test kırmızı, ilk-token testi yeşil kaldı → iki ayak farklı şeyi ölçüyor. İkisi de geri alındı, `git status` temiz |
| 35 | **Negatif kontrol** — meşru yavaş yanıt (ölçülen 17,4 s sınıfı) zaman aşımına kurban gitmiyor; kusur yer değiştirmedi | ✅ Geçti | 17,4 s'de ilk token veren üst-akış kesilmeden tamamlandı, fallback eklenmedi; hızlı yanıt <1 s temiz. Ters-çevirme A'da bu iki negatif kontrol **yeşil kaldı** — kırmızıya dönen üç testin neyi ölçtüğünü ayıran kontrol grubu |
| 36 | **Yerelleştirme (QUALITY §4 + §1)** — zaman aşımı/stream-hata metnini **ziyaretçi kendi dilinde** görüyor mu (5 dil); 18.11 sonrası bu yol 200 döndüğü için `!res.ok` offline kopyası devrede değil | ❌ Kaldı | Metin `route.ts`'te sabit TR (`FALLBACK_MESSAGE`): EN/DE/AR/ES sorularının dördünde de gövdeye **aynı Türkçe cümle** aktı. Gerçek tarayıcıda doğrulandı: canlı `/en` sayfasında İngilizce soran ziyaretçi balonda «(Asistan bir hataya takıldı. Lütfen tekrar deneyin.)» gördü. Yol **canlıda gerçekten tetikleniyor** — hızlı ardışık 20 çağrının 5'i buraya düştü (kök neden yerel gerçek-Groq probuyla ölçüldü: `429 RateLimitError`, OTPM limit 1000). `kontrol:` aynı probe 504 modunda yerelleştirilmiş offline kopyasını gösterdi, 200 modunda gerçek yanıtı — üç sınıfı ayırt ediyor. `messages/*.json` `chat.error` 5 dilde hazır ama bu yolda **kullanılmıyor** | → TASK-18.12 |
| 37 | **Bütçe koruması** — üst-akış 429/5xx dönünce SDK retry uykusu bütçeyi yemiyor (`maxRetries: 0`), yanıt hızlıca fallback'e kapanıyor | ✅ Geçti | Üst-akış 429 → **tek** fetch çağrısı (retry yok), yanıt 1 ms'de fallback'le kapandı. Canlı teyit: kota baskısında fallback 0,39–0,45 s'de döndü. `kontrol:` `maxRetries: 2`'ye çevrilip aynı yük koşuldu — kota tazeyken iki değer de 8/8 temiz, yani ayrım yalnız kota dolu hâlde doğuyor; geri alındı |
| 38 | QUALITY §8 — üst-akış zaman aşımı davranışı kendi testini getirdi (kümülatif ilke) | ✅ Geçti | `tests/chat-route-timeout.test.ts` 5 test: ilk-token asılması · stream-ortası sessizlik · toplam bütçe · hızlı yanıt negatif · 17,4 s meşru yavaş yanıt negatif. Her test `fetchMock` çağrıldığını ayrıca doğruluyor (boş kapsamda sessiz PASS yok); ters-çevirme kırmızı üretiyor (senaryo 34) |
| 39 | **Sınıf süpürmesi (19'un kardeş varyantı)** — aynı kimlik sınıfının `README`/`.env.example` dışındaki ürün-ağacı yüzeyleri de kodla tutarlı mı | ❌ Kaldı | İki yüzey bayat: `.github/workflows/ci.yml:12` yorumu hâlâ «ANTHROPIC_API_KEY CI'da yok» diyor (TASK-18.05 dev/ops kimlik swap'ının atladığı kardeş dosya), ve `MASTER_PROMPT_v2.md` §6/§7 chatbot'u «Claude'u stream eder, varsayılan `claude-opus-4-8`, `ANTHROPIC_API_KEY`» diye tarif ediyor — OVERVIEW o dosyayı "çelişkide v2 geçerli" diye yetkili kaynak işaretlediği için çelişki sessiz kalmıyor. `kontrol:` aynı grep `README`/`.env.example`/`CLAUDE.md`/`src` üzerinde 0 eşleşme veriyor — tarama kör değil | → TASK-18.13 |
### Otomatik kontrol bulguları (Adım 1)

- **CI (1a):** `main` HEAD `6ae2c3a` → `fast` + `a11y` **success** (run 34654953320). Repo genelinde `status=failure` sorgusu **0 run**; son 40 run'da açık/başarısız/asılı workflow yok.
- **Bot/analiz araçları (1b):** repoda Dependabot config'i, açık PR veya bot önerisi **yok** (`.github/` yalnız `workflows/ci.yml` taşıyor) — bu alt-adım için tarayacak çıktı yok.
- **npm audit (1b) — kapsam-dışı, faz penceresine dokunmuyor, önceki tura göre değişmedi:** 9 açık (1 kritik / 4 high / 4 moderate). Kritik `next@15.5.19` upstream'inde; `sharp`/`undici` (dev/build), `nanoid`/`postcss` (build-zamanı), `fflate` (ZIP ayrıştırma yok), `vitest`/`@vitest/mocker` (test-zamanı) sömürülemez. `package.json`/`package-lock.json` **Dokunulmaz** → kullanıcı kararı. Kayıt zaten `DURUM.md` → "Sahipli teknik açıklar"da; bu tur **yeni kayıt açmadı**.
- **Güvenlik taraması (1c, faz penceresi `ed69ec7..HEAD`):** injection / auth atlaması / hardcoded secret / hassas veri loglama **bulgu yok**. Sır yalnız `process.env`'den okunuyor (`src/` içinde 2 kullanım); `git grep gsk_` ve `sk-`/`Bearer` desenleri boş (exit 1); `.env.keys.local` `.gitignore`'da (`git check-ignore` teyitli), git'te izlenen tek env dosyası `.env.example`. 18.11'in eklediği zaman aşımı kodu yeni bir yüzey açmıyor (timer + AbortSignal; log satırları yalnız süre yazıyor). Açık kalan tek güvenlik kalemi hız sınırı/origin (senaryo 23) — kapsam-dışı.
- **Artefakt süpürmesi (1c):** fazın iki ortak kapısı da tek çağrı yerinde ve atlayan site yok — `sanitizeMessages` yalnız `route.ts:49`'da (`src/app/` altında tek route var), üst-akış zaman aşımı invaryantının koruduğu işlem `chat.completions.create` yalnız `route.ts:83`'te ve `signal` ile bağlı. `Chatbot.tsx`'teki `fetch("/api/chat")` üst-akış değil kendi ucumuz; sınırı sunucunun 24 s bütçesidir.

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

- [PHASE-18-GOLIVE.md](PHASE-18-GOLIVE.md) — tarihsel-kayıt (marka mührü gate koşuları · model yeniden seçimi · iki canlı arızanın teşhisi · canlı kanıt artefaktları)
- [PHASE-18-ARASTIRMA.md](PHASE-18-ARASTIRMA.md) — araştırma-detayı (değerlendirilen Groq istemcileri · streaming adaptasyonu · byte-cap ölçüm kararı · dikkat edilecekler · teknik kararlar C.1–C.6)

---

## Sonuç

- **Tamamlanma Tarihi:** [Tarih]
- **Toplam Task:** [Sayı]
- **Notlar:** [Önemli kararlar, sonraki faza aktarılanlar]

---

**Oluşturulma:** 2026-07-21
**Son Güncelleme:** 2026-10-02 — **TASK-18.13 ✅ (üçüncü düzeltme turu 2/2).** Bayat Anthropic referansları kapandı: `ci.yml` yorumu + brief §6/§7 + üç yaşayan `_dev` dokümanı. Brief'in yetkisi → `PRD/NOTES.md`. 13/13 task ✅ → sırada verify-phase 18 (4. koşum, baştan).
