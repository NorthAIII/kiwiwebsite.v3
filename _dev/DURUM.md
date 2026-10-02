# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-10-02 — **review-phase 18:** Faz 18 ✅ (milestone 6/6, kalite 7 ✅ + 1 ⚠️ Güvenlik, düzeltme task'ı yok); v0.5 içerik fazları bitti → sırada discuss-phase (versiyon-sonu teknik borç).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 19 — v0.5 versiyon-sonu teknik borç kapatma** (geçici ad, `PHASES.md` → Sıradaki Fazlar'ın ilk maddesi; numara, ad ve kapsam discuss-phase'de damgalanır — Faz Durumu tablosuna henüz eklenmedi). Fazlar 1–18 ✅.
**Adım:** **discuss** — review-phase 18 ✅ (2026-10-02). Versiyon Sonu Durumu hâlâ **`içerik_fazları`**; discuss-phase versiyon-sonu tespitinde `teknik_borç` damgalar. **Sıradaki: `/devflow:discuss-phase`**.

**v0.5 durumu ve açık kalemler:**

1. **Faz 18 ✅ — Chatbot Groq geçişi + canlıya alma.** Chatbot canlıda (`qwen/qwen3.8-27b`). Retrospektif + kalite → `phases/PHASE-18.md`; UAT detayı → `phases/PHASE-18-UAT.md`.
2. **`GROQ_API_KEY` yalnız Production'da.** Preview'e eklenmedi → `revize/...` preview deploy'larında chatbot offline görünür (bilinçli açık). Faz 18'in düzeltme turları bu yüzden de doğrudan `main`'e aktı → dal kuralı prd-review kalemi (retro 18).
3. **Booking + takvim → v0.6** — ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
4. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
5. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
6. **Sahipli teknik açıklar (teknik borç fazı adayları):**
   - TB-3 runtime invariant tohumu (Faz 12'den).
   - ⚠️ **npm audit 9 açık (1 kritik / 4 high / 4 moderate)** — kritik+high'ların çoğu `next@15.5.19` upstream'inde ve **aralık-içi `next@15.5.24`** ile kapanıyor; DECISIONS 2026-07-16'nın "güvenli fix yok" gerekçesi bu kalemler için artık geçerli değil (`package.json`/`package-lock.json` Dokunulmaz → kullanıcı kararı). `undici` (jsdom, dev-only) · `nanoid`/`postcss` (build-zamanı) · `fflate` sömürülemez; groq-sdk sıfır açık ekledi.
   - **`/api/chat` hız sınırı / origin kontrolü yok** (UAT 18 senaryo 23; middleware `api`'yi atlıyor, `vercel.json` yok → 1.000 istek/gün kotası dışarıdan tüketilebilir). Kayıtta v0.6 adayı; retro 18: canlı ürün bugün açık, teknik borç fazında yeniden tartılsın.
   - **Canlı chatbot sağlık kontrolü yok** (retro 18): model emekliliği ve kota tükenmesi yalnız `vercel logs`'ta görünür, Llama deploy olmadan emekliye ayrıldı → günlük sentetik kontrol adayı.
   - **Marka mührü harness'i kalıcı değil** (retro 18): Faz 18'de 3 kez yazılıp silindi → repo içinde elle tetiklenen script adayı (CI'da koşmaz).
   - Chatbot prompt cilası (TR "observable ve measured" yankısı, seyrek kelime tekrarı).
   - Brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**İlerleme:** Faz 18 ✅ (2026-10-02) — 13 task (3 düzeltme turu), UAT 4 koşum (son: 44 senaryo / 43 ✅, tek ❌ senaryo 23 kapsam-dışı), Vitest 39 → 86. v0.5'in tek içerik fazı kapandı.
**Aktif Faz Dokümanı:** henüz yok (discuss-phase açar). Son tamamlanan faz → `phases/PHASE-18.md`; faz geçmişi → `PHASES.md`.

---

## Aktif Versiyon

**Versiyon:** **v0.5 — Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (re-kickoff 2026-07-21 damgaladı; v0.4 ✅ → `PRD/VERSIONS.md`). Anthropic Opus → Groq ($0/kartsız). Canlıya alma ✅ 2026-09-11, içerik fazı (Faz 18) ✅ 2026-10-02.
**Hedef (v0.5):** `route.ts` Groq'a geçer (streaming/sanitizasyon/zarif offline fallback korunur) + system prompt TR-birincil dil algılama + "fiyat/rakam uydurma" yasağı + hardening per-mesaj max-byte cap + 5-dil çıktı gözle doğrulama → canlıya alma. Kaynak / 5 kabul kriteri: DECISIONS 2026-07-21. **Karşılandı** (Faz 18).
**Versiyon Sonu Durumu:** **içerik_fazları** (v0.5'in tek içerik fazı Faz 18 ✅; discuss-phase versiyon-sonu tespitinde sırasıyla teknik_borç → senaryo_testi → prd_review_bekliyor'a ilerletir).

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** yok — Faz 19 henüz planlanmadı (discuss → research → plan).
**Durum:** Fazlar 1–18 ✅. Versiyon Sonu Durumu **`içerik_fazları`**. Chatbot canlıda; canlı = `main` HEAD.
**İlerleme:** review-phase 18 (2026-10-02) — Faz 18 kapandı, düzeltme task'ı çıkmadı. Sırada `/devflow:discuss-phase`.

## Task Durumu (Aktif Faz)

> **Faz 19 henüz planlanmadı** — task'lar plan-phase'de eklenir. Faz 18'in 13 task'ının (18.01–18.13, hepsi ✅) tablosu `phases/PHASE-18.md` → Task Listesi'nde, icra detayı `tasks/archive/TASK-18.YY.md`'de.

---

## Son Task Özetleri

> **Faz 18 kapandı → task özetleri `phases/PHASE-18.md`'ye mezun edildi** (Task Listesi + Retrospektif); icra detayı `tasks/archive/TASK-18.YY.md`'de. Faz 19'un task'ı olmadığı için burada tutulacak özet yok.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** yok (Faz 19 planlanmadı). Son tamamlanan task: `tasks/archive/TASK-18.13.md`.
**Aktif Faz:** **Faz 19 (geçici ad) — v0.5 versiyon-sonu teknik borç**, Adım **discuss**. **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`içerik_fazları`**. **Canlı = `main` HEAD** (her push deploy); chatbot canlıda (`qwen/qwen3.8-27b`). Son faz dokümanı: `phases/PHASE-18.md` (alt-dokümanlar: `-ARASTIRMA` · `-GOLIVE` · `-UAT`).
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21; go-live'daki model + `max_tokens` kararları → DECISIONS 2026-09-11; zaman aşımı → 2026-09-12; ziyaretçi dilinde sunucu metni → 2026-10-02.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** **ana sayfa mesaj netliği / ilk-ekran anlaşılırlığı** (kullanıcı 2026-10-02: ziyaretçi kim olduğumuzu ve ne yaptığımızı anlamadan çıkıyor; teşhis + hero çapası çelişkisi → `PRD/NOTES.md`; booking/takvimle önceliği yarışır, sıra prd-refine'da damgalanır) · v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · **brief'in yetkisi + kalan bayatlığı** (OVERVIEW "çelişkide v2 geçerli" + Korumalı `ILKELER.md:34` örneği; → `PRD/NOTES.md`) · **dal kuralı go-live sonrası** (canlı feature düzeltmeleri `main`'de mi, Preview env + revize branch mi; retro 18 → prd-review). Teknik borç adayları yukarıda (Aktif Faz → madde 6).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)
