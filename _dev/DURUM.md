# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-17 — **review-phase 16 ✅ — FAZ 16 TAMAMLANDI.** UAT 11/11, kalite 8 eksen ✅, 0 düzeltme task'ı. TB-D1 gym PNG hijyeni ✅ + TB-D2 npm audit ✅ (kabul+kayıt, sömürülemez build-zamanı postcss) + REL v0.4 TR canlı `f173234`. Retrospektif + kalite kontrol PHASE-16'ya yazıldı; M2:126/127 doküman-drift review'da kapandı; guardrail'ler regresyonsuz. **Versiyon Sonu Durumu `teknik_borç` → `senaryo_testi`.** Açık takipler (regresyon değil): branch→`main` merge bekliyor · canlı `ANTHROPIC_API_KEY` env yok (`/api/chat` 503) · non-TR alpfit stale-TR (prd-review). Fazlar 1–16 ✅. **v0.4 TR CANLI** (`main`=`f173234`). **Sıradaki: `/devflow:discuss-phase 17`** (versiyon-sonu senaryo testi fazı).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** **17 — v0.4 versiyon-sonu senaryo testi** (geçici ad — `discuss-phase 17` numarayı/kapsamı damgalar; henüz girilmedi). Önceki faz **16 ✅ tamamlandı** (v0.4 versiyon-sonu teknik borç + TR release): TB-D1 gym PNG hijyeni ✅ + TB-D2 npm audit ✅ (kabul+kayıt) + REL v0.4 TR canlı `f173234`. Fazlar 1–16 ✅; **v0.4 TR canlı** (`main`=`f173234`).
**Adım:** **discuss** — Faz 16 review ✅ (UAT 11/11, kalite 8 eksen ✅, 0 düzeltme task'ı; M2:126/127 doküman-drift kapandı; boyut kontrolü Adım 5b temiz ~4.9k token). Versiyon Sonu Durumu `teknik_borç` → `senaryo_testi`. **Sıradaki: `/devflow:discuss-phase 17`** (senaryo testi fazı — yeni oturum). **⚠️ Açık takipler (regresyon değil):** (1) `revize/v0.4-versiyon-sonu`→`main` **merge bekliyor** (TB-D1 silme canlıya merge'de yansır; canlıda hâlâ 200, 0 tüketici → etkisiz); (2) canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu); (3) non-TR alpfit stale-TR (versiyon-sınırı → prd-review).
**İlerleme:** review-phase 16 (2026-07-17) — Faz 16 ✅. Retrospektif + kalite kontrol (8 eksen ✅) + sonuç `phases/PHASE-16.md`'ye yazıldı; M2 modül dokümanı F2.8 gerçeklik-senkron; PHASES/MODULE-MAP/DURUM güncellendi. Sıradaki: senaryo testi fazı (discuss-phase 17).
**Son Faz Dokümanı:** `phases/PHASE-16.md` (✅). Önceki: `phases/PHASE-15.md` (✅ v0.4 içerik fazı). Release kaydı: `docs/RELEASE-v0.4.md`.

---

## Aktif Versiyon

**Versiyon:** v0.4 — Alpfit Plus ürün vitrini (re-kickoff 2026-07-16'da sabitlendi; Craft en üst eksen — ILKELER)
**Hedef:** Alpfit (F2.8) sayfasının "Alpfit Plus" zengin ürün landing page'ine yeniden tasarımı (artifact vizyonu) — Hero/before-after · Sorun · 4 Rol · Mobil uygulama mockup'ları · 9 Özellik · Neden/rekabet · Fiyat · Yol haritası+Store · Kapanış; React+Tailwind token+next-intl port, düzgün 5-dil namespace; dürüstlük 4/4 gerçek korunur; guardrail (a11y=100 çift-tema/perf tabanı/CLS≈0/i18n parite) regresyonsuz. Kesin faz kapsamı/bölünmesi discuss-phase 15'te
**Versiyon Sonu Durumu:** senaryo_testi (review-phase 16 damgaladı — v0.4 teknik borç fazı ✅). TR canlı (`f173234`); sıradaki senaryo testi (discuss-phase 17) → sonra zorunlu prd-review. non-TR çeviri prd-review'a.

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif/bekleyen task **yok** — Faz 16 ✅ tamamlandı (TASK-16.01 arşivli). Sıradaki faz (senaryo testi) henüz planlanmadı → `/devflow:discuss-phase 17`.
**Durum:** Fazlar 1–16 ✅; Versiyon Sonu Durumu `senaryo_testi`. **v0.4 TR canlı** (`f173234`). Senaryo testi çapraz-doğrulama fazıdır (tipik olarak yeni task üretmez).
**İlerleme:** review-phase 16 (2026-07-17) — Faz 16 ✅ (UAT 11/11, kalite 8 eksen ✅, 0 düzeltme task'ı). Sonuçlar `phases/PHASE-16.md` → Retrospektif + Kalite Kontrol Sonuçları.

---

## Task Durumu (Aktif Faz)

> **Faz 16 ✅ tamamlandı** (review-phase 16, 2026-07-17). Sıradaki faz **senaryo testi** (Faz 17) henüz girilmedi — `/devflow:discuss-phase 17` başlatır ve task tablosunu doldurur. Senaryo testi çapraz-doğrulama fazıdır (tipik olarak yeni task üretmez). Faz 16 task özeti `phases/PHASE-16.md`'ye mezun edildi.

_(Aktif faz task tablosu boş — sıradaki faz henüz planlanmadı.)_

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

**Aktif Task:** Aktif/bekleyen task **yok** — Faz 16 ✅ tamamlandı (review-phase 16). Sıradaki adım: `/devflow:discuss-phase 17` (senaryo testi fazı). **⚠️ Açık takipler (regresyon değil):** branch→main merge bekliyor · canlı `ANTHROPIC_API_KEY` env YOK (`/api/chat` 503 → chatbot "offline"; kullanıcı aksiyonu) · non-TR alpfit stale-TR (prd-review).
**Aktif Faz:** **17 — v0.4 versiyon-sonu senaryo testi** (geçici ad; henüz girilmedi — `discuss-phase 17` damgalar). Önceki **Faz 16 ✅** (v0.4 teknik borç + TR release): TB-D1 gym PNG ✅ + TB-D2 npm audit ✅ + REL TR canlı `f173234`. **Aktif Versiyon v0.4**, Versiyon Sonu Durumu: **senaryo_testi**. **v0.4 TR CANLI** (`main` = `f173234`). Fazlar 1–16 ✅. Faz dokümanı: `phases/PHASE-16.md` (✅); TB-D2 kararı `docs/DECISIONS.md`; release kaydı `docs/RELEASE-v0.4.md`.
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`
**v0.2 Release Runbook:** `docs/RELEASE-v0.2.md` (✅ Yayınlandı 2026-07-02 — canlı `a71adbc`; Sonuç + açık takip orada)

---

**Son Güncelleme:** 2026-07-17 — **review-phase 16 ✅ — FAZ 16 TAMAMLANDI.** UAT 11/11, kalite 8 eksen ✅, 0 düzeltme task'ı. TB-D1 gym PNG hijyeni ✅ + TB-D2 npm audit ✅ (kabul+kayıt) + REL v0.4 TR canlı `f173234`. Retrospektif + kalite kontrol PHASE-16'ya yazıldı; M2:126/127 doküman-drift review'da kapandı (F2.8 Kabul Kriterleri/Bağımlılık/Edge → v0.4 saf CSS/SVG gerçeğine senkron); guardrail'ler regresyonsuz; boyut kontrolü (Adım 5b) temiz. **Versiyon Sonu Durumu `teknik_borç` → `senaryo_testi`.** Açık takipler (regresyon değil): branch→`main` merge bekliyor · canlı `ANTHROPIC_API_KEY` env yok · non-TR alpfit stale-TR (prd-review). Fazlar 1–16 ✅. **v0.4 TR CANLI** (`f173234`). Branch `revize/v0.4-versiyon-sonu`. **Sıradaki: `/devflow:discuss-phase 17`** (senaryo testi fazı).
