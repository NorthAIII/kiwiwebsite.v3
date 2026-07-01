# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-01 — discuss-phase 7 ✅: Faz 7 (Umami analytics E1) kapsam tartışması tamam. Kararlar: pageview-only + `afterInteractive` + hafif render testi + merge-sonrası canlı doğrulama (data-domains preview'ı saymaz, main=canlı). Faz 6 perf tabanı guardrail. PHASES/MODULE-MAP promosyonu yapıldı. Sıradaki adım: research-phase 7.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 7 — Umami analytics (E1) (v0.2 son içerik fazı; discuss-phase 7 ✅ ile kapsam damgalandı). Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** research → `/devflow:research-phase 7` (yeni oturum): Umami entegrasyonunun teknik araştırması. Kapsam netleşti (pageview-only, afterInteractive, `[locale]/layout.tsx` head, render testi, merge-sonrası canlı doğrulama). Spec: `docs/UMAMI-ANALYTICS.md`. Disiplin: canlıda gerçekten saydığı gözle doğrulanır (MEMORY Süreç Disiplinleri).
**İlerleme:** **discuss-phase 7 ✅** (2026-07-01) — kapsam tartışması tamam; 4 karar (pageview-only / afterInteractive / hafif render testi / merge-sonrası canlı doğrulama). Çapraz konu: Faz 6 mobil perf tabanı (perf 90/LCP 3164ms; masaüstü 100) regresyonsuz kalmalı — before/after perf kontrolü taşınacak. PHASES + MODULE-MAP promosyonu yapıldı (E1 → Faz 7 🔄). Versiyon Sonu Durumu içerik_fazları (değişmez); Umami bitince versiyon-sonu sabit fazları gelir. Devralınan sahipli borç (sonraki a11y/alt-sayfa fazına): alt-sayfa derin a11y + `text-pulse` süpürmesi; brief mobil açığın nihai doğrulaması gerçek-cihaz/Vercel field gerektirir (metodolojik duvar).
**Son Faz Dokümanı:** `phases/PHASE-7.md` (🔄 — Kapsam Tartışması yazıldı; research bekliyor)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif task yok — Faz 7 (Umami E1) discuss-phase'den geçti, henüz plan-phase yok. Task'lar research→plan sonrası üretilecek.
**Durum:** Faz 7 aktif, adım=research. discuss-phase 7 ✅ (2026-07-01). Sıradaki: research-phase 7.
**İlerleme:** Faz 7 kapsam damgalandı (PHASE-7.md Kapsam Tartışması ✅; PHASES + MODULE-MAP promosyonu yapıldı). Task listesi plan-phase 7'de dolacak.

---

## Task Durumu (Aktif Faz)

> Faz 7 (Umami E1) discuss-phase'den geçti; task'lar plan-phase 7'de üretilecek (research sonrası). Faz 6 (mobil perf/LCP) ✅; 7 task'ı (6.01-6.07; 6.06 ❌ iptal) `tasks/archive/`'da, detay `phases/PHASE-6.md`. Faz 5 (test altyapısı D1) ✅; 5.01-5.05 archive'da. Faz 4 (v0.2 a11y) ✅; 4.01-4.08 archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Aktif faz task'ı yok — `/devflow:research-phase 7` → `plan-phase 7` sonrası planlanır (Umami E1). |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**Aktif faz task özeti yok** — Faz 7 (Umami E1) discuss-phase'den geçti ama henüz task üretilmedi (plan-phase 7 bekliyor). Yeni faz task'ları tamamlandıkça burası dolacak. Faz 6 task özetleri/sonuçları → `phases/PHASE-6.md` (UAT Sonuçları + Faz-Sonu Final Ölçüm + Retrospektif).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 7 discuss ✅. Sıradaki adım: `/devflow:research-phase 7` (Umami E1 teknik araştırma).
**Aktif Faz:** 7 — Umami analytics (E1) · adım=research; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — review-phase 6 ✅: Faz 6 (mobil perf/LCP) donduruldu; retrospektif + kalite kontrol (8 eksen ✅) + sonuç yazıldı; milestone karşılandı (ölçülebilir iyileşme, sürücü L3), brief mobil açık dürüstçe kaydedildi, P2 craft-gate iptal; guardrail'ler regresyonsuz. Sıradaki içerik fazı Umami (E1) → `/devflow:discuss-phase 7`.
