# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — discuss-phase 5: Faz 5 (v0.2 test altyapısı D1) kapsam tartışması tamamlandı, faz tabloya 🔄 girdi. Kapsam = kümülatif harness (Vitest+RTL / Playwright+axe-core) + ilk GitHub Actions CI + tohum testler (i18n 5-dil parite Vitest + a11y regresyon `/` light+dark Playwright/axe). Kararlar PHASE-5.md'ye yazıldı. Versiyon Sonu Durumu içerik_fazları (değişmez). **Adım=research** (sıradaki: research-phase 5).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 5 — Test altyapısı (D1). 🔄 **discuss tamamlandı** (discuss-phase 5, 2026-06-30); kapsam PHASE-5.md'ye yazıldı. Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** research → `/devflow:research-phase 5`: kümülatif test harness + tohum testler için teknik araştırma (yeni oturum).
**İlerleme:** Kapsam = **altyapı + yüksek-değerli tohum** (kümülatif başlangıç). Yığın: **Vitest (+RTL +jest-dom) + Playwright (@playwright/test) + @axe-core/playwright.** CI: **ilk GitHub Actions** (build + Vitest/birim+i18n hızlı job + Playwright/a11y ayrı job). Tohum: **i18n 5-dil parite** (Vitest) + **a11y regresyon `/` light+dark** (Playwright/axe — Faz 4 a11y=100'ü kilitler). + kısa test convention notu. **Çapraz konu:** package.json devDependency ekleme install anında teyit (Dokunulmazlar); araç davranışını ampirik yokla (Faz 4 retro dersi). **Devralınan borç:** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi (harness sonra genişletir).
**Son Faz Dokümanı:** `phases/PHASE-5.md` (🔄 discuss tamamlandı)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** — Aktif task yok. Faz 5 discuss ✅; task'lar research→plan sonrası oluşur.
**Durum:** Faz 5 (test altyapısı D1) 🔄 — kapsam tartışıldı. Sıradaki adım faz döngüsünde research-phase 5 (task değil).
**İlerleme:** `/devflow:research-phase 5` ile harness/araç/CI teknik araştırmasını başlat (yeni oturum).

---

## Task Durumu (Aktif Faz)

> Faz 5 (test altyapısı D1) 🔄 — discuss ✅, **henüz planlanmadı** (research→plan sonrası task'lar oluşur). Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| — | — | — | Faz 5 henüz planlanmadı (research-phase 5 → plan-phase 5 sonrası) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

> Faz geçişinde sıfırlandı (Faz 4 ✅ → Faz 5 discuss). Faz 4 task özetleri `phases/PHASE-4.md` + `tasks/archive/TASK-4.0*.md`'de. Faz 5 task'ları çalışıldıkça buraya eklenir.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** — yok; Faz 5 discuss ✅. Sıradaki adım: `/devflow:research-phase 5` (test harness teknik araştırması)
**Aktif Faz:** 5 — Test altyapısı (D1) 🔄 · adım=research; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — discuss-phase 5: Faz 5 (v0.2 test altyapısı D1) kapsam tartışması tamamlandı; faz tabloya 🔄 girdi (PHASES/MODULE-MAP güncellendi). Kapsam = kümülatif harness (Vitest+RTL / Playwright+axe-core) + ilk GitHub Actions CI + tohum (i18n parite + a11y regresyon). Adım=research → research-phase 5.
