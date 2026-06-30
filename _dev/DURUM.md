# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — review-phase 6 ✅: Faz 6 (mobil perf/LCP) donduruldu. Retrospektif + kalite kontrol (8 eksen ✅) yazıldı; milestone karşılandı (ölçülebilir iyileşme: perf 84→90, LCP −440ms/−12%, sürücü L3); brief mobil açık dürüstçe kaydedildi; P2 craft-gate iptal; guardrail'ler regresyonsuz. Sıradaki içerik fazı: Umami (E1) → `/devflow:discuss-phase 7`.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 7 — Umami analytics (E1) (v0.2, geçici ad — henüz discuss-phase'den geçmedi; kesin kapsam/numara discuss-phase 7'de damgalanır). Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** discuss → `/devflow:discuss-phase 7` (yeni oturum): Umami analytics entegrasyon fazının kapsam tartışması. Spec hazır: `docs/UMAMI-ANALYTICS.md` (kod/değerler/uyarılar bekliyor). Disiplin: canlıda gerçekten saydığı gözle doğrulanır (MEMORY Süreç Disiplinleri).
**İlerleme:** **Faz 6 review ✅ tamamlandı** (2026-06-30) — milestone karşılandı (ölçülebilir mobil perf/LCP iyileşmesi, sürücü L3; brief mobil açık dürüstçe kaydedildi, P2 craft-gate iptal), 8 kalite ekseni ✅, guardrail'ler regresyonsuz. v0.2 kalan içerik fazı = Umami (E1). Versiyon Sonu Durumu içerik_fazları (değişmez). Devralınan sahipli borç (sonraki a11y/alt-sayfa fazına): alt-sayfa derin a11y + `text-pulse` süpürmesi; ayrıca brief mobil açığın nihai doğrulaması gerçek-cihaz/Vercel field gerektirir (metodolojik duvar).
**Son Faz Dokümanı:** `phases/PHASE-6.md` (✅ — donduruldu; retrospektif + kalite kontrol + sonuç tam)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Aktif task yok — Faz 6 ✅ donduruldu (review-phase 6 tamamlandı). Sıradaki adım yeni faz döngüsü: `/devflow:discuss-phase 7` (Umami E1 kapsam tartışması). Task'lar discuss→research→plan sonrası üretilecek.
**Durum:** Faz döngüsü dışında — faz geçişi. review-phase 6 ✅ (2026-06-30). Sıradaki: discuss-phase 7.
**İlerleme:** Faz 6 review tamam; faz dokümanı ✅. Yeni faz (Umami) henüz başlamadı — discuss-phase 7 ile kapsam damgalanacak (PHASES tablosuna promosyon orada yapılır).

---

## Task Durumu (Aktif Faz)

> Faz 7 (Umami E1) henüz discuss-phase'den geçmedi → task üretilmedi. Tablo discuss→research→plan sonrası dolar. Faz 6 (mobil perf/LCP) ✅; 7 task'ı (6.01-6.07; 6.06 ❌ iptal) `tasks/archive/`'da, detay `phases/PHASE-6.md`. Faz 5 (test altyapısı D1) ✅; 5.01-5.05 archive'da. Faz 4 (v0.2 a11y) ✅; 4.01-4.08 archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Aktif faz task'ı yok — `/devflow:discuss-phase 7` sonrası planlanır (Umami E1). |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**Aktif faz task özeti yok** — Faz 6 ✅ donduruldu, yeni faz (Umami E1) discuss-phase'den geçmedi → task üretilmedi. Yeni faz task'ları tamamlandıkça burası dolacak. Faz 6 task özetleri/sonuçları → `phases/PHASE-6.md` (UAT Sonuçları + Faz-Sonu Final Ölçüm + Retrospektif).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 6 ✅ donduruldu. Sıradaki adım: `/devflow:discuss-phase 7` (Umami E1 kapsam tartışması).
**Aktif Faz:** 7 — Umami analytics (E1) (geçici ad) · adım=discuss; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — review-phase 6 ✅: Faz 6 (mobil perf/LCP) donduruldu; retrospektif + kalite kontrol (8 eksen ✅) + sonuç yazıldı; milestone karşılandı (ölçülebilir iyileşme, sürücü L3), brief mobil açık dürüstçe kaydedildi, P2 craft-gate iptal; guardrail'ler regresyonsuz. Sıradaki içerik fazı Umami (E1) → `/devflow:discuss-phase 7`.
