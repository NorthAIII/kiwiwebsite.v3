# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-07-02 — **run-task 9.05 (S3-degradasyon) tamamlandı:** standalone Playwright (`channel:'chrome'`+swiftshader) 57 kontrol 48✓·9 N/A·0✗ — FOUC yok (12/12), reduced/no-WebGL→StaticFlow + mobil-low→FlowCanvas (3 LivingFlow sayfası, ayırt-edicilik sanity ile geçerli), AR-RTL×dark×reduced 6/6, 320/768/1440 taşma yok+CLS<0.1. Kapsam-içi bug yok; nüans: 3 alt sayfa PageHeader (LivingFlow yok)→degradasyon N/A. Adım=task → sıradaki: **run-task TASK-9.06**.

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 9 (v0.2 versiyon-sonu **senaryo testi**) — discuss-phase 9 tamamlandı, PHASES tablosunda 🔄. Kapsam = ana sayfa + 5 alt sayfa uçtan-uca çapraz doğrulama (yeni feature üretmez), Faz 3 (v0.1 senaryo testi) deseninde ama alt sayfalar dahil (Faz 8 çıtaya çekti); alt-sayfa harness'i (`subpages-a11y.spec.ts` + `a11y-helpers.ts`) yeniden kullanılır. Faz 8 ✅; Faz 7 (Umami E1) ✅; Faz 6 (mobil perf/LCP) ✅; Faz 5 (test altyapısı D1) ✅; Faz 4 (v0.2 a11y) ✅.
**Adım:** task — sıradaki adım **run-task TASK-9.06** (S4 kontroller & kalıcılık — standalone Playwright: tema toggle+reload, dil-switcher path-koru, klavye-only + focus-visible; yeni oturum). 9.01 (S1) ✅, 9.02 (S5+S6-render) ✅, 9.03 (S8-suite+S6-parite) ✅, 9.04 (S8-Lighthouse) ✅, 9.05 (S3-degradasyon) ✅. Kapsam + Araştırma + Plan + verify-plan tamamlandı (`phases/PHASE-9.md`): 9 doğrulama task'ı (S1–S9 → TASK-9.01…9.09), suite-first hibrit metodoloji, TK1–TK7.
**İlerleme:** run-task 9.05 (S3-degradasyon, 2026-07-02) tamamlandı — standalone Playwright (`channel:'chrome'`+`--enable-unsafe-swiftshader`; bundled chromium WebGL vermez → memory) 57 kontrol 48✓·9 N/A·0✗: FOUC yok (12/12 light+dark), reduced/no-WebGL→StaticFlow + mobil-low→FlowCanvas (3 LivingFlow sayfası; ayırt-edicilik sanity mode-high canvas=1 ile geçerli), AR-RTL×dark×reduced 6/6, 320/768/1440 taşma yok+CLS<0.1 (maks 0.025). Kapsam-içi bug yok, kaynak kod değişmedi; nüans (record): 3 alt sayfa (vaka+2 bülten) LivingFlow yerine PageHeader→WebGL degradasyon N/A. **Bekleyen versiyon-sonu aksiyonu:** v0.2 production release (tüm revize `main`'e ilk merge) — Umami canlı +1 (S9-10 Faz 7) o adımda kapanır (senaryo testi kod-tarafı varlığı S8'de doğrular, canlı panel değil). **Kapsam dışı (bilinçli açık):** brief mobil perf (gerçek-cihaz duvarı), TB-C npm audit, `/bunker-os`→`/crew-os` redirect + `/forum`→404 (görsel/SEO versiyonu), dil setini değiştirme (prd-review).
**Son Faz Dokümanı:** `phases/PHASE-9.md` (🔄 Devam ediyor — 9 task, 9.01–9.04 ✅). Faz 8 ✅ `phases/PHASE-8.md`.

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** senaryo_testi

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Sıradaki aktif task **TASK-9.06** (S4 — kontroller & kalıcılık: standalone Playwright, tema toggle+reload kalıcılık + Living Flow uniform, dil-switcher path-koru/Escape/dış-tık, klavye-only yolculuk + yeşil focus-visible) — Faz 9, adım=task. 9.05 (S3-degradasyon) ✅ archive'da; **run-task ile TASK-9.06**'dan devam (yeni oturum).
**Durum:** Faz 9 (senaryo testi) 🔄 — adım=task. 9.01–9.05 ✅ (5/9). Faz 8 tüm task'ları ✅ (8.01→8.06) archive'da.
**İlerleme:** run-task 9.05 (S3-degradasyon) tamamlandı (2026-07-02): standalone Playwright (sistem Chrome + swiftshader) 57 kontrol 48✓·9 N/A·0✗ — FOUC yok, reduced/no-WebGL→StaticFlow + mobil-low→FlowCanvas (ayırt-edicilik sanity ile geçerli), AR-RTL×dark×reduced 6/6, taşma yok+CLS<0.1. Kapsam-içi bug yok, kaynak kod değişmedi; nüans: 3 alt sayfa PageHeader→degradasyon N/A.

---

## Task Durumu (Aktif Faz)

> Faz 9 (senaryo testi) 🔄 — 9 task hazır, 9.01–9.05 ✅ (5/9). Faz 8 ✅ (8.01-8.06 archive'da, detay `phases/PHASE-8.md`); Faz 7 (Umami E1) ✅; Faz 6 ✅ (6.06 ❌ iptal); Faz 5 ✅; Faz 4 ✅ — hepsi archive'da.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 9.01 | TASK-9.01 | ✅ Tamamlandı | S1 — giriş/yönlendirme matrisi (curl) |
| 9.02 | TASK-9.02 | ✅ Tamamlandı | S5 + S6-render — taksonomi/dürüstlük + non-TR render bütünlüğü (curl/script-strip) |
| 9.03 | TASK-9.03 | ✅ Tamamlandı | S8-suite + S6-parite — `test:e2e` 52 + `test` 7 + CI `fast`+`a11y` yeşil |
| 9.04 | TASK-9.04 | ✅ Tamamlandı | S8-Lighthouse — a11y=100 çift-tema (6 dark kanonik + 12 light/dark axe) + perf korunan taban |
| 9.05 | TASK-9.05 | ✅ Tamamlandı | S3 — degradasyon (standalone Playwright): 57 kontrol 48✓·9 N/A·0✗; reduced/no-WebGL→StaticFlow + mobil-low→FlowCanvas + AR-RTL×dark×reduced + taşma/CLS |
| 9.06 | TASK-9.06 | ⬜ Bekliyor | S4 — kontroller & kalıcılık (standalone Playwright) ← sıradaki |
| 9.07 | TASK-9.07 | ⬜ Bekliyor | S2 — tam TR yolculuğu + alt-sayfa çıkış/dönüş (curl+Playwright) |
| 9.08 | TASK-9.08 | ⬜ Bekliyor | S7 — chatbot 0-token (offline + sanitizasyon) |
| 9.09 | TASK-9.09 | ⬜ Bekliyor | S9 — adversarial / holistik kırma |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet. **Yeni faza geçildi → Faz 8 task özetleri sıfırlandı** (Faz 8 detayları `phases/PHASE-8.md` + `tasks/archive/`).

**TASK-9.05 (S3-degradasyon — mod kombinasyonları & Living Flow degradasyon):**
- Standalone Playwright (`channel:'chrome'`+`--enable-unsafe-swiftshader`; **bundled chromium WebGL vermiyor** → memory) 57 kontrol **48✓·9 N/A·0✗**: FOUC yok (12/12 light+dark, render-blocking init→early==final tema); reduced-motion→StaticFlow + no-WebGL shim→StaticFlow + mobil-low→FlowCanvas (3 LivingFlow sayfası; **ayırt-edicilik sanity** mode-high canvas=1 3/3 ile geçerli).
- AR-RTL×dark×reduced 6/6 (dir=rtl+html.dark+StaticFlow, taşma yok); 320/768/1440 yatay taşma yok + CLS<0.1 (18/18, maks 0.025); `/proc/loadavg` düşük.
- **Kapsam-içi bug yok, kaynak kod değişmedi.** Nüans (record): 3 alt sayfa (vaka-calismalari+2 bülten) LivingFlow yerine PageHeader→WebGL degradasyon N/A (bug değil; task Hedef'i "her alt sayfada LivingFlow" varsayımı düzeltildi).

**TASK-9.04 (S8-Lighthouse — a11y=100 çift-tema + perf korunan taban):**
- **6/6 dark kanonik Lighthouse a11y=100** (0 düşen audit; structural `landmark-one-main`/`heading-order` tema-bağımsız) + **12/12 gerçek light/dark axe 0 Lighthouse-ilgili ihlal** (LH npx-cache axe-core 4.12.1 = LH'nin bundle motoru; `localStorage` tema zorlama + `html.dark` themeOk teyit) → **a11y=100 çift-tema mühürlü** (iki-gate TK5: 9.03 axe WCAG-AA + 9.04 Lighthouse structural).
- Perf korunan taban regresyonsuz: masaüstü perf **100**/LCP 629ms/CLS 0 · mobil LCP **3171ms**(≈taban 3164, Lantern-deterministik comparable)/FCP 1516ms/CLS 0. LCP elementleri değişmedi (hero metni). **perf 65/TBT 2000 = ağır-SwiftShader env anomalisi** (6.01 birebir), ortamlar arası kıyaslanamaz/regresyon değil (a11y/CLS/LCP/FCP ortam-bağımsız güvenilir).
- Kapsam-içi bug yok, kaynak kod değişmedi. Brief mobil perf açığı (perf<95/LCP>2.5s) record-not-fix (TK7, CPU-bound WebGL gerçek-cihaz duvarı).

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Sıradaki TASK-9.06 (S4 kontroller & kalıcılık — standalone Playwright) — Faz 9, adım=task. 9.01–9.05 ✅ (5/9). Sıradaki: run-task TASK-9.06. Bekleyen: v0.2 production release (Umami canlı +1 orada kapanır).
**Aktif Faz:** 9 (v0.2 senaryo testi) · adım=task — Faz 8 ✅ (8.01→8.06; review tamam); Faz 7 ✅; Faz 6 ✅; Faz 5 ✅; Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: senaryo_testi
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-07-02 — run-task 9.05 (S3-degradasyon): standalone Playwright (`channel:'chrome'`+swiftshader) 57 kontrol 48✓·9 N/A·0✗ — FOUC yok (12/12), reduced/no-WebGL→StaticFlow + mobil-low→FlowCanvas (ayırt-edicilik sanity ile geçerli; bundled chromium WebGL vermez → memory), AR-RTL×dark×reduced 6/6, 320/768/1440 taşma yok+CLS<0.1. Kapsam-içi bug yok, kaynak kod değişmedi; nüans: 3 alt sayfa PageHeader→degradasyon N/A. Adım=task. Sıradaki: run-task TASK-9.06.
