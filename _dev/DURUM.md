# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — research-phase 6: TR `/` mobil LCP araştırması tamam. Kök neden: CPU-bound WebGL main-thread (mobil "Other" 3663ms vs masaüstü 1202ms, tek fark 4× throttle). İki craft-koruyucu P1 lever (kullanıcı onayı): hero reveal transform-only + WebGL idle/post-load deferral; yardımcı Fraunces SOFT/WONK budama. LCP elementi henüz ampirik teyitsiz → ilk task element-denetimli ölçüm. Bulgular PHASE-6'ya + DECISIONS'a yazıldı. Adım → plan.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 6 — Mobil perf / LCP (v0.2). Kapsam discuss-phase 6'da damgalandı: ana sayfa TR `/` mobil-birincil, brief hedef (≥95 / <2.5s) / craft tavan. Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** plan → `/devflow:plan-phase 6` (yeni oturum): araştırma lever'larını task'lara böl (ölç-önce → L1 hero reveal → L2 WebGL deferral → L3 font budama → ara-ölç).
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

**Task:** Yok — Faz 6 araştırması tamam, henüz task yok; task'lar plan-phase'de oluşacak.
**Durum:** Faz döngüsü `plan` adımında. Sıradaki: `/devflow:plan-phase 6` (yeni oturum).
**İlerleme:** Faz 6 research tamam (PHASE-6 "Araştırma Bulguları" + DECISIONS yazıldı). Task'lar lever'lardan üretilecek.

---

## Task Durumu (Aktif Faz)

> Faz 6 (mobil perf/LCP) kapsam tartışması tamam; task'lar **henüz üretilmedi** — research/plan akışı üretecek. Faz 5 (test altyapısı D1) ✅; 5 task'ı (5.01-5.05) `tasks/archive/`'da, detay `phases/PHASE-5.md`. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | (henüz yok) | — | Faz 6 plan-phase'de lever'lardan üretilecek (research tamam) |

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

**Aktif Task:** Yok — Faz 6 research tamam. Sıradaki adım: `/devflow:plan-phase 6`
**Aktif Faz:** 6 — Mobil perf / LCP · adım=plan; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — research-phase 6: TR `/` mobil LCP araştırması tamam (kök neden CPU-bound WebGL main-thread; iki craft-koruyucu P1 lever onaylandı; LCP elementi ampirik teyit ilk task'a). Bulgular PHASE-6 "Araştırma Bulguları" + DECISIONS'a yazıldı; adım plan → `/devflow:plan-phase 6`.
