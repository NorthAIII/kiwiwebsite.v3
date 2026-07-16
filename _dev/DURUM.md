# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **discuss-phase 16 + v0.4 TR PRODUCTION RELEASE — CANLIYA ALINDI 🚀.** Kullanıcı önceliğiyle (App Store lansman aciliyeti) v0.4 Alpfit Plus TR'de canlıya çıktı: `revize/alpfit-plus`→`main` temiz ff (16 commit), release kapısı `next build` exit 0 (5-locale SSG), canlı duman testi ✓ (5 dil 200 + v0.4 marker · TR title "Alpfit Plus — Kulüp İşletme Yazılımı" · AR RTL · /,/crew-os,/vaka 200 · /forum→/) → **canlı `f173234`**. Faz 16 (v0.4 versiyon-sonu teknik borç) girildi: `içerik_fazları`→`teknik_borç` damgalandı; kapsam gym PNG hijyeni (TB-D1) + npm audit (TB-D2); **non-TR çeviri ertelendi** (canlıda stale-TR — sonraki faz/prd-review). **⚠️ Açık takip: chatbot `ANTHROPIC_API_KEY` Vercel prod env'de YOK → `/api/chat` 503 offline** (kullanıcı aksiyonu — key eklenince açılır). Release kaydı `docs/RELEASE-v0.4.md`. Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:research-phase 16`** (kalan teknik borç task'ları).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **16 — v0.4 versiyon-sonu teknik borç (+ TR production release)** 🔄 (discuss ✅). Kapsam: gym PNG disk hijyeni (TB-D1) + npm audit (TB-D2); non-TR çeviri ertelendi. **v0.4 TR CANLIYA ALINDI** (bu oturum, operasyonel — `f173234`, `docs/RELEASE-v0.4.md`). Fazlar 1–15 ✅; **v0.4 TR canlı** (`main`).
**Adım:** **research** — discuss-phase 16 ✅ (versiyon-sonu tespiti `içerik_fazları`→`teknik_borç` damgalandı). **Sıradaki: `/devflow:research-phase 16`** (kalan teknik borç task'ları: gym PNG + npm audit). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env YOK** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** discuss-phase 16 (2026-07-16) — versiyon-sonu teknik borç fazı girildi + **kullanıcı önceliğiyle v0.4 TR production release yapıldı** (App Store lansman aciliyeti): temiz ff-merge (16 commit), build exit 0, canlı duman testi ✓ → `f173234` canlı. TR tam, non-TR stale-TR (ertelendi). Kalan iş: gym PNG hijyeni + npm audit (research/plan/run-task).
**Son Faz Dokümanı:** `phases/PHASE-16.md` (🔄). Önceki: `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** teknik_borç (discuss-phase 16 damgaladı — v0.4 içerik fazları ✅). TR canlıya alındı (`f173234`); non-TR çeviri + senaryo testi + prd-review arkada.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** **Faz 16 discuss ✅ + v0.4 TR release ✅ (canlı).** Aktif task yok (discuss tamam; research-phase 16 task'ları oluşturacak). Sıradaki adım: `/devflow:research-phase 16` (gym PNG hijyeni + npm audit).
**Durum:** Faz 16 🔄 (discuss ✅, Adım = **research**); Versiyon Sonu Durumu `teknik_borç`; kapsam TB-D1 gym PNG + TB-D2 npm audit; non-TR çeviri ertelendi. **v0.4 TR canlı** (`f173234`). Fazlar 1–15 ✅.
**İlerleme:** discuss-phase 16 (2026-07-16) — versiyon-sonu teknik borç fazı + **v0.4 TR production release** (kullanıcı önceliği, canlı `f173234`, `docs/RELEASE-v0.4.md`). Kalan: gym PNG + npm audit.

---

## Task Durumu (Aktif Faz)

> **Faz 16 🔄 girildi** (v0.4 versiyon-sonu teknik borç): discuss ✅, kapsam gym PNG hijyeni (TB-D1) + npm audit (TB-D2). Task'lar henüz oluşturulmadı — plan-phase 16 doldurur. **v0.4 TR production release yapıldı** (operasyonel, task değil — `docs/RELEASE-v0.4.md`, canlı `f173234`). Faz 15 task özetleri `phases/PHASE-15.md`'ye mezun (Task Listesi + `tasks/archive/TASK-15.*`).

_(Aktif faz task tablosu boş — Faz 16 task'ları plan-phase 16'da oluşturulacak; research-phase 16 sıradaki.)_

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 15 kapandı (v0.4 içerik fazı) → Faz 15 task özetleri PHASE-15'e mezun edildi.** Faz 16 girildi ama henüz task oluşmadı (plan-phase 16 doldurur) — ilk task tamamlanınca özet burada görünür.

_(Faz 16 task'ı henüz yok. Bu oturumda operasyonel v0.4 TR release yapıldı → `docs/RELEASE-v0.4.md`.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **Faz 16 discuss ✅ + v0.4 TR release ✅ (canlı `f173234`).** Aktif task yok — sıradaki adım: `/devflow:research-phase 16` (gym PNG hijyeni + npm audit). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env YOK** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — kullanıcı aksiyonu).
**Aktif Faz:** **16 🔄 — v0.4 versiyon-sonu teknik borç (+ TR release)** (discuss ✅, Adım = **research**). Kapsam TB-D1 gym PNG + TB-D2 npm audit; non-TR çeviri ertelendi. **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **teknik_borç**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–15 ✅. Faz dokümanı: `phases/PHASE-16.md`; release kaydı `docs/RELEASE-v0.4.md`; Faz 15 detayı `phases/PHASE-15.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **discuss-phase 16 + v0.4 TR PRODUCTION RELEASE (canlı `f173234`).** Kullanıcı önceliğiyle (App Store lansmanı) v0.4 Alpfit Plus TR'de canlıya alındı: temiz ff-merge (16 commit), build exit 0, canlı duman testi ✓ (5 dil 200 + marker · TR SEO title · AR RTL · diğer sayfalar 200 · /forum→/). Faz 16 (versiyon-sonu teknik borç) girildi: `içerik_fazları`→`teknik_borç`; kapsam gym PNG (TB-D1) + npm audit (TB-D2); non-TR çeviri ertelendi (canlıda stale-TR). **⚠️ Açık: chatbot `ANTHROPIC_API_KEY` env YOK → /api/chat 503** (kullanıcı aksiyonu). Kayıt: `docs/RELEASE-v0.4.md`, `phases/PHASE-16.md`. Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:research-phase 16`.**
