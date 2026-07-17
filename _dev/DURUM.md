# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-17 — **run-task 16.01 ✅ (TB-D1 tamam).** 4 orphan `public/gym/*.png` (~1.7MB, 0 tüketici) `git rm` ile silindi + dizin kalktı; silme öncesi/sonrası güvenlik grep'i kaynak/config 0 tüketici; M2:123 base "Açıklama" gerçek v0.4 yapısına senkronlandı (`components/alpfit/*`, saf CSS/SVG). Regresyon kapısı yeşil: `next build` temiz (0 MISSING_MESSAGE) + Vitest 39/39. Faz 16'nın tek task'ı bitti → **Adım = verify**. **TB-D2 (npm audit) task DEĞİL** (research'te kapandı; review-phase'de ✅). **v0.4 TR CANLI** (`main` = `f173234`). **⚠️ Açık takip: chatbot `ANTHROPIC_API_KEY` Vercel prod env'de YOK → `/api/chat` 503 offline** (kullanıcı aksiyonu). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:verify-phase 16`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **16 — v0.4 versiyon-sonu teknik borç (+ TR production release)** 🔄 (discuss ✅, research ✅, plan ✅, verify-plan ✅, run-task 16.01 ✅). Kapsam: gym PNG disk hijyeni (TB-D1 ✅) + npm audit (TB-D2, kabul+kayıt — review-phase'de ✅); non-TR çeviri ertelendi. **v0.4 TR CANLIYA ALINDI** (operasyonel — `f173234`, `docs/RELEASE-v0.4.md`). Fazlar 1–15 ✅; **v0.4 TR canlı** (`main`).
**Adım:** **verify** — TASK-16.01 ✅ tamamlandı (TB-D1: 4 orphan gym PNG silindi + M2:123 v0.4 senkron; regresyon kapısı yeşil — `next build` temiz, Vitest 39/39). Fazın tek task'ı bitti. TB-D2 task değil (research'te tamamlandı — audit raporu + `docs/DECISIONS.md` kabul+kayıt; review-phase'de ✅). **Sıradaki: `/devflow:verify-phase 16`** (UAT — yeni oturum). **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env YOK** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — regresyon değil).
**İlerleme:** run-task 16.01 (2026-07-17) — TB-D1 icra edildi: `git rm public/gym/*.png` (4 dosya, ~1.7MB) + dizin kalktı; güvenlik grep'i (öncesi+sonrası) kaynak/config 0 tüketici; M2:123 gerçek v0.4 yapısına senkron; `next build` temiz (0 MISSING_MESSAGE) + Vitest 39/39. Önceki oturum: verify-plan 16 (plan review). Bulgular/kararlar `phases/PHASE-16.md`, `docs/DECISIONS.md`.
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

**Task:** **TASK-16.01 ✅ Tamamlandı** (TB-D1 gym PNG disk hijyeni + M2:123 v0.4 senkronu — arşivlendi `tasks/archive/`). Aktif çalışılan/bekleyen task yok (fazın tek task'ı bitti); sıradaki adım UAT: `/devflow:verify-phase 16` (yeni oturum).
**Durum:** Faz 16 🔄 (discuss ✅, research ✅, plan ✅, verify-plan ✅, run-task 16.01 ✅, Adım = **verify**); Versiyon Sonu Durumu `teknik_borç`; kapsam TB-D1 gym PNG silme (✅ +M2:123 senkron) + TB-D2 npm audit (kabul+kayıt, kod task'ı değil — review-phase'de ✅); non-TR çeviri ertelendi. **v0.4 TR canlı** (`f173234`). Fazlar 1–15 ✅.
**İlerleme:** run-task 16.01 (2026-07-17) — TB-D1 tamamlandı (4 orphan gym PNG silindi ~1.7MB + dizin kalktı; M2:123 v0.4 senkron; `next build` temiz + Vitest 39/39). Task arşivlendi.

---

## Task Durumu (Aktif Faz)

> **Faz 16 🔄** (v0.4 versiyon-sonu teknik borç): discuss ✅, research ✅, plan ✅. Kapsam gym PNG hijyeni (TB-D1) + npm audit (TB-D2). plan-phase 16 tek task oluşturdu (TB-D1); TB-D2 = kabul+kayıt (kod task'ı değil, research'te kapandı — `docs/DECISIONS.md` 2026-07-16). **v0.4 TR production release** operasyonel (task değil — `docs/RELEASE-v0.4.md`, canlı `f173234`). Faz 15 task özetleri `phases/PHASE-15.md`'ye mezun.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 16.01 | TASK-16.01 | ✅ Tamamlandı | TB-D1 — gym PNG disk hijyeni (`public/gym/*.png` 4 orphan silindi) + M2:123 stale açıklama v0.4 senkronu |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Faz 15 kapandı (v0.4 içerik fazı) → Faz 15 task özetleri PHASE-15'e mezun edildi.**

**TASK-16.01 ✅** (2026-07-17) — TB-D1 gym PNG disk hijyeni + M2 doküman senkronu
- 4 orphan `public/gym/*.png` (~1.7MB, 0 kod tüketicisi) `git rm` ile silindi; boşalan `public/gym/` dizini kalktı. Silme öncesi+sonrası güvenlik grep'i kaynak/config 0 tüketici.
- M2:123 F2.8 base "Açıklama" stale eski yapıdan (`GymSoftwareShowcase.tsx`+`public/gym/*.png`+`next/image`) gerçek v0.4 yapısına (`components/alpfit/*`, saf CSS/SVG) senkronlandı (gerçeklik-drift kapatıldı).
- Regresyon kapısı yeşil (0 tüketici → runtime etkilenmedi): `next build` temiz (0 MISSING_MESSAGE) + Vitest 39/39.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** **TASK-16.01 ✅ Tamamlandı** (TB-D1 gym PNG silindi + M2:123 senkron; arşivlendi). Bekleyen task yok — fazın tek task'ı bitti. Sıradaki adım UAT: `/devflow:verify-phase 16`. **⚠️ Açık takip: canlı `ANTHROPIC_API_KEY` env YOK** (`/api/chat` 503 → chatbot "offline"; Vercel env'e eklenince açılır — kullanıcı aksiyonu).
**Aktif Faz:** **16 🔄 — v0.4 versiyon-sonu teknik borç (+ TR release)** (discuss ✅, research ✅, plan ✅, verify-plan ✅, run-task 16.01 ✅, Adım = **verify**). Kapsam TB-D1 gym PNG silme ✅ + TB-D2 npm audit (kabul+kayıt — review-phase'de ✅); non-TR çeviri ertelendi. **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **teknik_borç**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–15 ✅. Faz dokümanı: `phases/PHASE-16.md`; TB-D2 kararı `docs/DECISIONS.md`; release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-17 — **run-task 16.01 ✅** (TB-D1 tamam). 4 orphan `public/gym/*.png` (~1.7MB, 0 tüketici) `git rm` ile silindi + dizin kalktı; silme öncesi/sonrası güvenlik grep'i kaynak/config 0 tüketici; M2:123 base "Açıklama" gerçek v0.4 yapısına senkron (`components/alpfit/*`, saf CSS/SVG); regresyon kapısı yeşil (`next build` temiz 0 MISSING_MESSAGE + Vitest 39/39). Task arşivlendi. Fazın tek task'ı bitti → Adım = **verify**. **TB-D2 (npm audit) task DEĞİL** — research'te kapandı (`docs/DECISIONS.md` 2026-07-16); review-phase 16'da ✅. **v0.4 TR CANLI** (`f173234`). **⚠️ Açık: chatbot `ANTHROPIC_API_KEY` env YOK → /api/chat 503** (kullanıcı aksiyonu). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:verify-phase 16`.**
