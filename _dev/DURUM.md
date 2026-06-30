# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — plan-phase 6: 7 task dokümanı oluşturuldu (TASK-6.01-6.07). Sıra: ölç-önce (LCP elementi + taban) → L1 hero reveal transform-only → L2 WebGL idle deferral → ara-ölç (L3/P2 karar kapısı) → L3 Fraunces axes budama → P2 Living Flow mobil degradasyon (koşullu) → faz-sonu ölçüm+kayıt. Ölçüm task'ları node'lu ortam ister. Adım → verify-plan.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 6 — Mobil perf / LCP (v0.2). Kapsam discuss-phase 6'da damgalandı: ana sayfa TR `/` mobil-birincil, brief hedef (≥95 / <2.5s) / craft tavan. Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** verify-plan → `/devflow:verify-plan 6` (yeni oturum): 7 task dokümanını (6.01-6.07) milestone/gereksinim/kalite/tutarlılık açısından doğrula.
**İlerleme:** Araştırma tamam. Kök neden: **CPU-bound WebGL main-thread** (mobil "Other" 3663ms vs masaüstü 1202ms, tek fark 4× CPU throttle; FCP 1657ms ama LCP 3604ms = 1.9s bloke boşluğu). İki craft-koruyucu P1 lever (kullanıcı onayı 2026-06-30): **hero reveal transform-only** (`Hero.tsx:18` opacity:0 LCP cezası) + **WebGL idle/post-load deferral** (`LivingFlow.tsx:40` yalnız 1 rAF); yardımcı **Fraunces SOFT/WONK budama** (`layout.tsx:13`, kullanılmıyor → craft-nötr). **Açık:** LCP elementi (metin/canvas) ampirik teyitsiz → ilk task `largest-contentful-paint-element` denetimli ölçüm yapmalı. Guardrail: a11y=100 çift-tema (CI) / CLS=0 / masaüstü 99-100 / i18n parite. **Ölçüm:** TR `/` mobil median + `NEXT_LOCALE=tr` cookie + fresh prod build + düşük host-yük (`docs/perf/README.md`); **node bu oturum ortamında yok** → ölçüm/build node'lu ortamda. **Devralınan sahipli borç (kapsam dışı):** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi. **Başlangıç tabanı:** TR `/` mobil perf 84 / LCP ~3.6s.
**Son Faz Dokümanı:** `phases/PHASE-6.md` (🔄 — araştırma bulguları yazıldı)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Yok — 7 task dokümanı yazıldı (TASK-6.01-6.07), henüz çalıştırılmadı. Sıradaki adım plan doğrulama.
**Durum:** Faz döngüsü `verify-plan` adımında. Sıradaki: `/devflow:verify-plan 6` (yeni oturum).
**İlerleme:** Faz 6 task'ları lever'lardan üretildi (ölç-önce → L1 → L2 → ara-ölç → L3 → P2 koşullu → faz-sonu). plan-phase'de task çalıştırılmaz; doğrulama ayrı oturumda.

---

## Task Durumu (Aktif Faz)

> Faz 6 (mobil perf/LCP) task'ları plan-phase'de üretildi (7 task, bekliyor; doğrulama verify-plan'de). Faz 5 (test altyapısı D1) ✅; 5 task'ı (5.01-5.05) `tasks/archive/`'da, detay `phases/PHASE-5.md`. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 6.01 | TASK-6.01 | ⬜ Bekliyor | Ölç-önce: LCP elementi + TR `/` mobil taban (element-denetimli) |
| 6.02 | TASK-6.02 | ⬜ Bekliyor | L1: Hero reveal opacity→transform-only |
| 6.03 | TASK-6.03 | ⬜ Bekliyor | L2: WebGL init mobilde idle/post-load deferral |
| 6.04 | TASK-6.04 | ⬜ Bekliyor | Ara-ölç: L1+L2 sonrası median + L3/P2 karar kapısı |
| 6.05 | TASK-6.05 | ⬜ Bekliyor | L3: Fraunces SOFT/WONK axes budama (craft-nötr) |
| 6.06 | TASK-6.06 | ⬜ Bekliyor | P2: Living Flow mobil degradasyon ayarı (koşullu) |
| 6.07 | TASK-6.07 | ⬜ Bekliyor | Faz sonu ölçüm + kanonik artefakt + DECISIONS + guardrail |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

> Yeni faza (6) geçildi — Faz 5 task özetleri sıfırlandı (detay: `phases/PHASE-5.md` + `tasks/archive/TASK-5.0*.md`). İlk Faz 6 task'ı tamamlanınca buraya özet eklenir.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — 7 task yazıldı (6.01-6.07), bekliyor. Sıradaki adım: `/devflow:verify-plan 6`
**Aktif Faz:** 6 — Mobil perf / LCP · adım=verify-plan; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — plan-phase 6: 7 task dokümanı oluşturuldu (TASK-6.01-6.07; ölç-önce → L1 hero reveal → L2 WebGL deferral → ara-ölç → L3 font budama → P2 degradasyon koşullu → faz-sonu ölçüm). PHASE-6 task listesi + DURUM güncellendi; adım verify-plan → `/devflow:verify-plan 6`.
