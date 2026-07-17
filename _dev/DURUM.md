# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-17 — **discuss-phase 17 ✅ — FAZ 17 GİRİLDİ (v0.4 versiyon-sonu senaryo testi).** Kapsam ana sayfa + 5 alt sayfa uçtan-uca (Faz 14 çıtası); **v0.4 delta odağı = Alpfit Plus ürün vitrini** (9 bölüm SSG render + saf CSS/SVG PhoneMockups + `alpfit` 133-leaf 5-dil parite + before/after Living Flow + dürüstlük 4/4); **canlı katman = branch/build + hafif canlı duman** (test-what's-live, v0.4 canlıda `f173234`); TR birincil + non-TR tutarlılık (alpfit stale-TR görünür kopukluk yok), chatbot 0-token, keşfet+kaydet+triyaj, otonom; S1–S9 onaylandı. Kapsam `phases/PHASE-17.md`'ye yazıldı. Açık takipler (regresyon değil): branch→`main` merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env yok (`/api/chat` 503) · non-TR alpfit stale-TR (prd-review). Fazlar 1–16 ✅, Faz 17 🔄. **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:research-phase 17`** (yeni oturum).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi, kapsam damgalandı). Doğrulama fazı — yeni feature üretilmez; ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus ürün vitrini** (Faz 15) + test-what's-live (v0.4 canlıda `f173234`). Önceki faz **16 ✅** (v0.4 versiyon-sonu teknik borç + TR release). Fazlar 1–16 ✅.
**Adım:** **research** — Kapsam tartışması ✅ (`phases/PHASE-17.md` → Kapsam Tartışması). Kararlar: kapsam ana sayfa + 5 alt sayfa (Faz 14 çıtası) · branch/build + canlı duman · TR birincil + non-TR tutarlılık · chatbot 0-token · keşfet+kaydet+triyaj · otonom · S1–S9 yeterli. **Sıradaki: `/devflow:research-phase 17`** (araç eşlemesi + ortam ampirik teyidi — yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 gym PNG silme; versiyon-sonu finalizasyona, kapsam dışı; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review).
**İlerleme:** discuss-phase 17 (2026-07-17) — Faz 17 girildi (🔄). Kapsam tartışması `phases/PHASE-17.md`'ye yazıldı; PHASES/MODULE-MAP/DURUM güncellendi (faz promosyonu). Sıradaki: research-phase 17.
**Son Faz Dokümanı:** `phases/PHASE-17.md` (🔄). Önceki: `phases/PHASE-16.md` (✅ v0.4 teknik borç), `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** senaryo_testi (review-phase 16 damgaladı — v0.4 teknik borç fazı ✅). **Faz 17 (senaryo testi) 🔄 girildi** (discuss-phase 17); TR canlı (`f173234`) → Faz 17 test-what's-live literal → sonra zorunlu prd-review. non-TR çeviri prd-review'a.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif/bekleyen task **yok** — Faz 17 girildi (kapsam tartışması), task'lar `/devflow:plan-phase 17`'de yazılır (research-phase 17'den sonra). Senaryo testi çapraz-doğrulama fazıdır (tipik olarak yeni feature task'ı üretmez).
**Durum:** Fazlar 1–16 ✅, Faz 17 🔄 (senaryo testi, Adım: research); Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`).
**İlerleme:** discuss-phase 17 (2026-07-17) — kapsam tartışması ✅; kararlar `phases/PHASE-17.md` → Kapsam Tartışması. Sıradaki adım research-phase 17.

---

## Task Durumu (Aktif Faz)

> **Faz 17 🔄 girildi** (discuss-phase 17, 2026-07-17). Kapsam tartışması ✅; task tablosu `/devflow:plan-phase 17`'de (research-phase 17'den sonra) doldurulur. Senaryo testi çapraz-doğrulama fazıdır (S1–S9 senaryo grupları → task'lar; tipik olarak yeni feature üretmez). Kapsam → `phases/PHASE-17.md`.

_(Aktif faz task tablosu boş — plan-phase 17 henüz koşulmadı.)_

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 16 kapandı (v0.4 versiyon-sonu teknik borç) → Faz 16 task özeti (TASK-16.01) PHASE-16'ya mezun edildi.**

_(Yeni faz henüz girilmedi — güncel task özeti yok. Faz 16 task özeti `phases/PHASE-16.md`'de.)_

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Aktif/bekleyen task **yok** — Faz 17 girildi (kapsam tartışması ✅). Sıradaki adım: `/devflow:research-phase 17`. **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu) · non-TR alpfit stale-TR (prd-review).
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** 🔄 (discuss-phase 17 girdi). Doğrulama fazı: ana sayfa + 5 alt sayfa uçtan-uca (S1–S9), delta odağı **Alpfit Plus** + test-what's-live. Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release). **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-17.md` (🔄); release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-17 — **discuss-phase 17 ✅ — FAZ 17 GİRİLDİ (v0.4 versiyon-sonu senaryo testi, 🔄).** Kapsam ana sayfa + 5 alt sayfa uçtan-uca (Faz 14 çıtası); v0.4 delta odağı **Alpfit Plus ürün vitrini** (9 bölüm SSG render + saf CSS/SVG PhoneMockups + `alpfit` 133-leaf 5-dil parite + before/after Living Flow + dürüstlük 4/4); canlı katman branch/build + hafif canlı duman (test-what's-live, v0.4 canlıda); TR birincil + non-TR tutarlılık (alpfit stale-TR), chatbot 0-token, keşfet+kaydet+triyaj, otonom; S1–S9 onaylandı. Kapsam `phases/PHASE-17.md`'ye yazıldı; PHASES/MODULE-MAP faz promosyonu yapıldı. Açık takipler (regresyon değil): branch→`main` merge bekliyor (gym PNG, versiyon-sonu finalizasyona) · canlı `ANTHROPIC_API_KEY` env yok · non-TR alpfit stale-TR (prd-review). Fazlar 1–16 ✅, Faz 17 🔄. **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:research-phase 17`**.
