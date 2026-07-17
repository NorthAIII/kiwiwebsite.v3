# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-17 — **verify-phase 16 ✅ — UAT 11/11 geçti, 0 düzeltme task'ı.** Otomatik kontroller: CI `d876054` success (fast+a11y iki job) · `npm audit` 2 moderate = DECISIONS 2026-07-16 birebir · security-review 0 bulgu (diff = 4 silinen PNG + `_dev/`, kod yüzeyi yok). UAT (otonom): silme+grep+build(37/37, 0 MISSING_MESSAGE)+Vitest 39/39+canlı duman(TR home/alpfit 200 + "Alpfit Plus" marker) hepsi yeşil. Açık takipler (regresyon değil): (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** — TB-D1 gym PNG silme canlıya merge'de yansır (canlıda hâlâ 200; 0 tüketici → etkisiz); (2) chatbot `ANTHROPIC_API_KEY` canlı env yok → `/api/chat` 503 (kullanıcı aksiyonu); (3) M2:126/127 minor artık-drift (review/audit). Faz → **Adım = review**. **v0.4 TR CANLI** (`main`=`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:review-phase 16`.**

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **16 — v0.4 versiyon-sonu teknik borç (+ TR production release)** 🔄 (discuss ✅, research ✅, plan ✅, verify-plan ✅, run-task 16.01 ✅, verify-phase ✅). Kapsam: gym PNG disk hijyeni (TB-D1 ✅) + npm audit (TB-D2, kabul+kayıt — review-phase'de ✅); non-TR çeviri ertelendi. **v0.4 TR CANLIYA ALINDI** (operasyonel — `f173234`, `docs/RELEASE-v0.4.md`). Fazlar 1–15 ✅; **v0.4 TR canlı** (`main`).
**Adım:** **review** — verify-phase 16 ✅: otomatik kontroller (CI success · npm audit 2 moderate = kayıt birebir · security-review 0 bulgu) + UAT **11/11 geçti** (otonom mod), 0 düzeltme task'ı. **Sıradaki: `/devflow:review-phase 16`** (faz review + retrospektif — yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 silme canlıya merge'de yansır); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) M2:126/127 minor artık-drift (review/audit).
**İlerleme:** verify-phase 16 (2026-07-17) — UAT 11/11 ✅ (silme teyidi + sayfa/SEO sağlığı + npm audit↔kayıt + Dokunulmazlık + canlı duman + build 37/37 + Vitest 39/39 + doküman senkron + chatbot degradasyon). CI `d876054` success. Düzeltme task'ı yok → faz Adım = review. Önceki oturum: run-task 16.01 ✅ (TB-D1 icra). Sonuçlar `phases/PHASE-16.md` → UAT Sonuçları.
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

**Task:** **TASK-16.01 ✅ Tamamlandı** (TB-D1 gym PNG disk hijyeni + M2:123 v0.4 senkronu — arşivlendi `tasks/archive/`). Aktif çalışılan/bekleyen task yok; verify-phase 16 ✅ (UAT 11/11, 0 düzeltme task'ı). Sıradaki adım: `/devflow:review-phase 16` (yeni oturum).
**Durum:** Faz 16 🔄 (discuss ✅, research ✅, plan ✅, verify-plan ✅, run-task 16.01 ✅, verify-phase ✅, Adım = **review**); Versiyon Sonu Durumu `teknik_borç`; kapsam TB-D1 gym PNG silme (✅ +M2:123 senkron) + TB-D2 npm audit (kabul+kayıt, kod task'ı değil — review-phase'de ✅); non-TR çeviri ertelendi. **v0.4 TR canlı** (`f173234`). Fazlar 1–15 ✅.
**İlerleme:** verify-phase 16 (2026-07-17) — UAT 11/11 geçti, otomatik kontroller yeşil (CI success · npm audit = kayıt · security-review 0 bulgu), 0 düzeltme task'ı. Önceki: run-task 16.01 ✅ (TB-D1 icra). Sonuçlar `phases/PHASE-16.md` → UAT Sonuçları.

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

**Aktif Task:** **TASK-16.01 ✅ Tamamlandı** (TB-D1 gym PNG silindi + M2:123 senkron; arşivlendi). Bekleyen task yok; verify-phase 16 ✅ (UAT 11/11, 0 düzeltme task'ı). Sıradaki adım: `/devflow:review-phase 16`. **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu) · M2:126/127 minor artık-drift.
**Aktif Faz:** **16 🔄 — v0.4 versiyon-sonu teknik borç (+ TR release)** (discuss ✅, research ✅, plan ✅, verify-plan ✅, run-task 16.01 ✅, verify-phase ✅, Adım = **review**). Kapsam TB-D1 gym PNG silme ✅ + TB-D2 npm audit (kabul+kayıt — review-phase'de ✅); non-TR çeviri ertelendi. **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **teknik_borç**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–15 ✅. Faz dokümanı: `phases/PHASE-16.md`; TB-D2 kararı `docs/DECISIONS.md`; release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-17 — **verify-phase 16 ✅ — UAT 11/11 geçti, 0 düzeltme task'ı.** Otomatik kontroller: CI `d876054` success (fast+a11y) · `npm audit` 2 moderate = DECISIONS 2026-07-16 birebir · security-review 0 bulgu (diff = 4 silinen PNG + `_dev/`, kod yüzeyi yok). UAT otonom: silme/grep/sayfa/SEO + build 37/37 (0 MISSING_MESSAGE) + Vitest 39/39 + canlı duman (TR home/alpfit 200 + "Alpfit Plus" marker) + chatbot 503 degradasyon — hepsi yeşil. Açık takipler (regresyon değil): (1) branch→`main` **merge bekliyor** (TB-D1 canlıya merge'de yansır; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) chatbot `ANTHROPIC_API_KEY` env yok; (3) M2:126/127 minor artık-drift. Faz → Adım = **review**. **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:review-phase 16`.**
