# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-16 — **research-phase 16 ✅ (v0.4 versiyon-sonu teknik borç araştırması).** TB-D1 (gym PNG): `public/gym/*.png` (4 dosya, ~1.7MB) grep 0 kod-tüketicisi (eski `components/gym/` 15.07'de silinmişti, sayfa artık `components/alpfit/*` saf CSS/SVG) → güvenle silinir + M2:123 stale açıklama güncellenir. TB-D2 (npm audit): 2 moderate tek kök nedenden = Next'e gömülü `postcss@8.4.31` (GHSA-qx2v-qp2m-jg93, CVSS 6.1); **her Next 15.x/16.x aynı pin → sürüm-fix'i yok**, npm'in tek önerisi katastrofik downgrade, bu proje bağlamında (build-zamanı, geliştirici-CSS, statik) **sömürülemez** → **kabul + kayıt** (kullanıcı onayı; `overrides`/downgrade yok; `docs/DECISIONS.md` 2026-07-16). **v0.4 TR CANLI** (`main` = `f173234`). **⚠️ Açık takip: chatbot `ANTHROPIC_API_KEY` Vercel prod env'de YOK → `/api/chat` 503 offline** (kullanıcı aksiyonu). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:plan-phase 16`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **16 — v0.4 versiyon-sonu teknik borç (+ TR production release)** 🔄 (discuss ✅, research ✅). Kapsam: gym PNG disk hijyeni (TB-D1) + npm audit (TB-D2, kabul+kayıt); non-TR çeviri ertelendi. **v0.4 TR CANLIYA ALINDI** (operasyonel — `f173234`, `docs/RELEASE-v0.4.md`). Fazlar 1–15 ✅; **v0.4 TR canlı** (`main`).
**Adım:** **plan** — research-phase 16 ✅ (TB-D1 gym PNG: 0 tüketici → silinir; TB-D2 npm audit: sömürülemez postcss-in-next, güvenli fix yok → kabul+kayıt, `docs/DECISIONS.md` 2026-07-16). **Sıradaki: `/devflow:plan-phase 16`** (task yazımı: gym PNG silme + M2:123 senkron; npm audit borcu kayıtlı — kod task'ı değil). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env YOK** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** research-phase 16 (2026-07-16) — teknik borç araştırması tamam: TB-D1 (gym PNG, ~1.7MB, grep 0 tüketici → güvenle silinir); TB-D2 (npm audit, 2 moderate = Next'e gömülü postcss@8.4.31, sömürülemez, sürüm-fix'i yok → kabul+kayıt). Bulgular `phases/PHASE-16.md`; karar `docs/DECISIONS.md`. Önceki oturum: discuss-phase 16 + v0.4 TR production release (`f173234` canlı).
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

**Task:** **Faz 16 research ✅.** Aktif task yok (araştırma tamam; plan-phase 16 task'ları oluşturacak). Sıradaki adım: `/devflow:plan-phase 16`.
**Durum:** Faz 16 🔄 (discuss ✅, research ✅, Adım = **plan**); Versiyon Sonu Durumu `teknik_borç`; kapsam TB-D1 gym PNG silme (+M2:123 senkron) + TB-D2 npm audit (kabul+kayıt, kod task'ı değil); non-TR çeviri ertelendi. **v0.4 TR canlı** (`f173234`). Fazlar 1–15 ✅.
**İlerleme:** research-phase 16 (2026-07-16) — TB-D1 gym PNG grep 0 tüketici (→ silinir); TB-D2 npm audit sömürülemez postcss-in-next, güvenli fix yok (→ kabul+kayıt, `docs/DECISIONS.md`). Bulgular `phases/PHASE-16.md`.

---

## Task Durumu (Aktif Faz)

> **Faz 16 🔄** (v0.4 versiyon-sonu teknik borç): discuss ✅, research ✅, kapsam gym PNG hijyeni (TB-D1) + npm audit (TB-D2). Araştırma bulguları `phases/PHASE-16.md`; TB-D2 kararı `docs/DECISIONS.md` 2026-07-16. Task'lar henüz oluşturulmadı — plan-phase 16 doldurur (TB-D1 = silme+doküman task'ı; TB-D2 = kabul+kayıt, kod task'ı değil). **v0.4 TR production release** operasyonel (task değil — `docs/RELEASE-v0.4.md`, canlı `f173234`). Faz 15 task özetleri `phases/PHASE-15.md`'ye mezun.

_(Aktif faz task tablosu boş — Faz 16 task'ları plan-phase 16'da oluşturulacak; research ✅, plan sıradaki.)_

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

**Aktif Task:** **Faz 16 research ✅.** Aktif task yok — sıradaki adım: `/devflow:plan-phase 16`. **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env YOK** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — kullanıcı aksiyonu).
**Aktif Faz:** **16 🔄 — v0.4 versiyon-sonu teknik borç (+ TR release)** (discuss ✅, research ✅, Adım = **plan**). Kapsam TB-D1 gym PNG silme + TB-D2 npm audit (kabul+kayıt); non-TR çeviri ertelendi. **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **teknik_borç**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–15 ✅. Faz dokümanı: `phases/PHASE-16.md`; TB-D2 kararı `docs/DECISIONS.md`; release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-16 — **research-phase 16 ✅** (v0.4 versiyon-sonu teknik borç araştırması). TB-D1 (gym PNG ~1.7MB): grep 0 kod-tüketicisi → güvenle silinir (+ M2:123 stale açıklama senkronu). TB-D2 (npm audit, 2 moderate): tek kök = Next'e gömülü `postcss@8.4.31` (GHSA-qx2v-qp2m-jg93), her Next 15.x/16.x aynı pin → güvenli sürüm-fix'i yok; bu proje bağlamında sömürülemez → **kabul + kayıt** (`overrides`/downgrade yok — `docs/DECISIONS.md` 2026-07-16). Adım = plan. **v0.4 TR CANLI** (`f173234`). **⚠️ Açık: chatbot `ANTHROPIC_API_KEY` env YOK → /api/chat 503** (kullanıcı aksiyonu). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:plan-phase 16`.**
