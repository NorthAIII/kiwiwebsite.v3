# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-10-02 — **verify-plan 19:** 7 task review edildi (4 mekanik düzeltme + 3 onaylı yapısal değişiklik) → sırada TASK-19.01.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **Faz 19 — v0.5 versiyon-sonu teknik borç — güvenlik (bağımlılık yaması + `/api/chat` kota koruması)** 🔄. Fazlar 1–18 ✅.
**Adım:** **task** — verify-plan 19 ✅ (2026-10-02): 7 task dokümanı (`tasks/TASK-19.01`–`19.07`) review edildi, düzeltmeler task dokümanlarında. Sıra: dal + yama → origin modülü → route kapısı → WAF spec + drift → probe → WAF canlı (`log` → 429, publish kullanıcıda) → preview kapısı + ff-merge + canlı ölçüm. Dal `revize/v0.5-teknik-borc` (19.01 açar). **Sıradaki: `/devflow:run-task` → TASK-19.01**.

**v0.5 durumu ve açık kalemler:**

1. **Faz 18 ✅ — Chatbot Groq geçişi + canlıya alma.** Chatbot canlıda (`qwen/qwen3.8-27b`). Retrospektif + kalite → `phases/PHASE-18.md`; UAT detayı → `phases/PHASE-18-UAT.md`.
2. **`GROQ_API_KEY` yalnız Production'da.** Preview'e eklenmedi → `revize/...` preview deploy'larında chatbot offline görünür (bilinçli açık). Faz 18'in düzeltme turları bu yüzden de doğrudan `main`'e aktı → dal kuralı prd-review kalemi (retro 18).
3. **Booking + takvim → v0.6** — ayrı/büyük iş (tool/function calling + takvim + PII/spam güvenliği).
4. **Çeviri senkronu** (non-TR + AR alpfit stale-TR, 133 leaf yapısal tam / değerler Türkçe, **ziyaretçi-görünür**) + **AR-dil stratejisi** → numarasız aday.
5. **BULGU-S3 craft** — alt-sayfa hero'ları (Alpfit + crew-os) `high` masaüstünde animasyonlu Living Flow göstermiyor (Craft üst eksen) → craft cila numarasız aday.
6. **Faz 19 kapsamında (güvenlik):** npm audit 9 açık (1 kritik / 4 high / 4 moderate, çoğu `next@15.5.19`'da) → TB-G1; `/api/chat` hız sınırı / origin kontrolü yok (UAT 18 senaryo 23) → TB-G2. Araştırma kararları → `phases/PHASE-19.md` → Araştırma Bulguları + DECISIONS 2026-10-02.
7. **Sahipli teknik açıklar (Faz 19'a alınmadı → prd-review'da yeniden tartılır):**
   - TB-3 runtime invariant tohumu (Faz 12'den).
   - **Canlı chatbot sağlık kontrolü yok** (retro 18): model emekliliği ve kota tükenmesi yalnız `vercel logs`'ta görünür, Llama deploy olmadan emekliye ayrıldı → günlük sentetik kontrol adayı (eklenirse TB-G2'nin origin/limit kapısından geçmeli).
   - **Marka mührü harness'i kalıcı değil** (retro 18): Faz 18'de 3 kez yazılıp silindi → repo içinde elle tetiklenen script adayı (CI'da koşmaz).
   - Chatbot prompt cilası (TR "observable ve measured" yankısı, seyrek kelime tekrarı) + `route.ts` `max_tokens` gerekçe yorumunun inceltilmesi (retro 18).
   - Brief mobil perf açığı (≈90 / LCP >2.5s; metodolojik duvar, DECISIONS 2026-06-30).

**İlerleme:** Faz 19 kapsamlandı, araştırıldı, planlandı ve plan doğrulandı (2026-10-02) — 2 iş birimi (TB-G1, TB-G2), 7 task, 0/7 tamam. Faz 18 ✅ (13 task, UAT 43/44, Vitest 86).
**Aktif Faz Dokümanı:** `phases/PHASE-19.md`. Son tamamlanan faz → `phases/PHASE-18.md`; faz geçmişi → `PHASES.md`.

---

## Aktif Versiyon

**Versiyon:** **v0.5 — Chatbot: ücretsiz sağlayıcı geçişi + canlıya alma** (re-kickoff 2026-07-21 damgaladı; v0.4 ✅ → `PRD/VERSIONS.md`). Anthropic Opus → Groq ($0/kartsız). Canlıya alma ✅ 2026-09-11, içerik fazı (Faz 18) ✅ 2026-10-02.
**Hedef (v0.5):** `route.ts` Groq'a geçer (streaming/sanitizasyon/zarif offline fallback korunur) + system prompt TR-birincil dil algılama + "fiyat/rakam uydurma" yasağı + hardening per-mesaj max-byte cap + 5-dil çıktı gözle doğrulama → canlıya alma. Kaynak / 5 kabul kriteri: DECISIONS 2026-07-21. **Karşılandı** (Faz 18).
**Versiyon Sonu Durumu:** **teknik_borç** (discuss-phase 19 damgaladı, 2026-10-02; Faz 19 ✅ olunca review-phase `senaryo_testi`'ye ilerletir).

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **TASK-19.01** — Dal aç + TB-G1 force'suz `npm audit fix` + yerel kapılar (`tasks/TASK-19.01.md`; dalı açar).
**Durum:** ⬜ Bekliyor. Fazlar 1–18 ✅, Faz 19 🔄. Versiyon Sonu Durumu **`teknik_borç`**. Chatbot canlıda; canlı = `main` HEAD.
**İlerleme:** verify-plan 19 ✅ (2026-10-02) — task listesi `phases/PHASE-19.md` → Task Listesi. Sırada `/devflow:run-task`.

## Task Durumu (Aktif Faz)

| # | Task | Durum |
|---|------|-------|
| 19.01 | Dal aç + TB-G1 force'suz `npm audit fix` + yerel kapılar | ⬜ |
| 19.02 | Origin modülü (saf) + Vitest node | ⬜ |
| 19.03 | Origin kapısı → `route.ts` + route testleri + M5 | ⬜ |
| 19.04 | WAF kural spec'i + drift script'i (publish yok) | ⬜ |
| 19.05 | Canlı probe script'i + TESTING.md | ⬜ |
| 19.06 | WAF canlı (`log` → 429) + patlama + drift | ⬜ |
| 19.07 | Preview kapısı → ff-merge `main` → canlı ölçüm | ⬜ |

---

## Son Task Özetleri

> Faz 19'un henüz tamamlanan task'ı yok — burada tutulacak özet yok. Faz 18'in task özetleri `phases/PHASE-18.md`'de, icra detayı `tasks/archive/TASK-18.YY.md`'de.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->
<!-- KURAL: Faz alt-fazlarının (verify-plan/plan/research/discuss) ayrı oturum özetlerini DURUM'a yazma — onlar faz dokümanına ait. -->
<!-- KURAL: Her task özeti kısa formatlı — paragraf yasak, bullet zorunlu, "Özet" alanı max 3 bullet. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** `tasks/TASK-19.01.md` (⬜, dalı açar). Son tamamlanan task: `tasks/archive/TASK-18.13.md`.
**Aktif Faz:** **Faz 19 — v0.5 versiyon-sonu teknik borç — güvenlik**, Adım **task**. **Aktif Versiyon v0.5.** Versiyon Sonu Durumu **`teknik_borç`**. **Canlı = `main` HEAD** (her push deploy); chatbot canlıda (`qwen/qwen3.8-27b`). Faz dokümanı: `phases/PHASE-19.md`; son tamamlanan: `phases/PHASE-18.md` (alt-dokümanlar: `-ARASTIRMA` · `-GOLIVE` · `-UAT`).
**v0.5 kaynağı (karar + 5 kabul kriteri):** `docs/DECISIONS.md` 2026-07-21; go-live'daki model + `max_tokens` kararları → DECISIONS 2026-09-11; zaman aşımı → 2026-09-12; ziyaretçi dilinde sunucu metni → 2026-10-02.
**Sonraki versiyon adayları (→ `PRD/VERSIONS.md`):** **ana sayfa mesaj netliği / ilk-ekran anlaşılırlığı** (kullanıcı 2026-10-02: ziyaretçi kim olduğumuzu ve ne yaptığımızı anlamadan çıkıyor; teşhis + hero çapası çelişkisi → `PRD/NOTES.md`; booking/takvimle önceliği yarışır, sıra prd-refine'da damgalanır) · v0.6 booking/takvim · çeviri senkronu (non-TR + AR) · BULGU-S3 craft cila · **brief'in yetkisi + kalan bayatlığı** (OVERVIEW "çelişkide v2 geçerli" + Korumalı `ILKELER.md:34` örneği; → `PRD/NOTES.md`) · **dal kuralı go-live sonrası** (canlı feature düzeltmeleri `main`'de mi, Preview env + revize branch mi; retro 18 → prd-review). Faz 19'a alınmayan sahipli teknik açıklar yukarıda (Aktif Faz → madde 7).
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.4 Release Kaydı:** `docs/RELEASE-v0.4.md` (✅ Yayınlandı 2026-07-16 — canlı `f173234`)
