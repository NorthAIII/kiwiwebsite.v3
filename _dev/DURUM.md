# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-01 — plan-phase 7 ✅: Faz 7 (Umami E1) 2 task'a bölündü. 7.01 = bileşen (`umami-script.tsx`) + `[locale]/layout.tsx` head entegrasyonu + izole render testi; 7.02 = before/after Lighthouse perf regresyon doğrulaması (Faz 6 tabanına karşı). Canlı +1 doğrulaması kod task'ı değil → verify-phase (merge-sonrası). Sıradaki adım: verify-plan 7.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 7 — Umami analytics (E1) (v0.2 son içerik fazı; discuss-phase 7 ✅ ile kapsam damgalandı). Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** verify-plan → `/devflow:verify-plan 7` (yeni oturum): plan review/doğrulama. plan-phase 7 ✅ ile 2 task yazıldı (7.01 bileşen+layout+izole render testi; 7.02 before/after perf regresyon). Spec: `docs/UMAMI-ANALYTICS.md`; kararlar PHASE-7 + DECISIONS. Disiplin: canlıda gerçekten saydığı gözle doğrulanır (MEMORY Süreç Disiplinleri) → milestone çekirdeği, verify-phase (merge-sonrası).
**İlerleme:** **plan-phase 7 ✅** (2026-07-01) — 2 task üretildi. 7.01 (bileşen `umami-script.tsx` + `[locale]/layout.tsx` head + izole render testi/next-script mock) · 7.02 (before/after Lighthouse perf regresyon doğrulaması, Faz 6 tabanına karşı; preconnect ölç-önce). Canlı +1 doğrulaması kod task'ı değil (data-domains=kiwiailab.com preview saymaz) → verify-phase. Çapraz konu: Faz 6 mobil perf tabanı (perf 90/LCP 3164ms; masaüstü 100) regresyonsuz kalmalı (7.02 guardrail). Versiyon Sonu Durumu içerik_fazları (değişmez); Umami bitince versiyon-sonu sabit fazları gelir. Devralınan sahipli borç (sonraki a11y/alt-sayfa fazına): alt-sayfa derin a11y + `text-pulse` süpürmesi; brief mobil açığın nihai doğrulaması gerçek-cihaz/Vercel field gerektirir (metodolojik duvar).
**Son Faz Dokümanı:** `phases/PHASE-7.md` (🔄 — Kapsam + Araştırma + Task Listesi yazıldı; verify-plan bekliyor)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif task yok — Faz 7 (Umami E1) plan-phase'den geçti, task'lar yazıldı ama henüz çalıştırılmadı (verify-plan bekliyor). İlk task: TASK-7.01.
**Durum:** Faz 7 aktif, adım=verify-plan. plan-phase 7 ✅ (2026-07-01). Sıradaki: verify-plan 7 → sonra run-task 7.01.
**İlerleme:** 2 task yazıldı (`tasks/TASK-7.01.md`, `tasks/TASK-7.02.md`). Planlama oturumu; task çalıştırılmadı.

---

## Task Durumu (Aktif Faz)

> Faz 7 (Umami E1) plan-phase'den geçti; 2 task yazıldı (verify-plan bekliyor). Faz 6 (mobil perf/LCP) ✅; 7 task'ı (6.01-6.07; 6.06 ❌ iptal) `tasks/archive/`'da, detay `phases/PHASE-6.md`. Faz 5 (test altyapısı D1) ✅; 5.01-5.05 archive'da. Faz 4 (v0.2 a11y) ✅; 4.01-4.08 archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 7.01 | TASK-7.01 | ⬜ Bekliyor | Umami bileşeni + `[locale]/layout.tsx` head entegrasyonu + izole render testi |
| 7.02 | TASK-7.02 | ⬜ Bekliyor | Before/after Lighthouse perf regresyon doğrulaması (Faz 6 tabanına karşı) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**Aktif faz task özeti yok** — Faz 7 (Umami E1) plan-phase'den geçti; 2 task yazıldı ama henüz çalıştırılmadı (tamamlanan task yok). Task'lar run-task'ta tamamlandıkça burası dolacak. Faz 6 task özetleri/sonuçları → `phases/PHASE-6.md` (UAT Sonuçları + Faz-Sonu Final Ölçüm + Retrospektif).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 7 plan ✅ (2 task yazıldı). Sıradaki adım: `/devflow:verify-plan 7` (plan review).
**Aktif Faz:** 7 — Umami analytics (E1) · adım=verify-plan; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-01 — plan-phase 7 ✅: Faz 7 (Umami E1) 2 task'a bölündü (7.01 bileşen+layout+izole render testi; 7.02 before/after perf regresyon doğrulaması). Task dokümanları yazıldı; task çalıştırılmadı. Sıradaki adım: `/devflow:verify-plan 7`.
