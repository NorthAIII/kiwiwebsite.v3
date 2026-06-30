# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — run-task 5.04 ✅: Projenin ilk CI'ı (`.github/workflows/ci.yml`) kuruldu — push[**]+PR'da 2 paralel job: **fast** (build+Vitest) + **a11y** (Playwright/axe `/` light+dark). İlk push'ta iki job da yeşil, ampirik teyit (run `28470864743`; `gh` yok → public Actions REST API+curl). **Adım=task** (sıradaki: run-task TASK-5.05 convention notu).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 5 — Test altyapısı (D1). 🔄 **icra sürüyor** — 5.01 ✅ + 5.02 ✅ + 5.03 ✅ + 5.04 ✅ (4/5); plan ✅ + verify-plan ✅ + discuss ✅ + research ✅. Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** task → `/devflow:run-task` (yeni oturum): TASK-5.05'ten devam et.
**İlerleme:** 5.01 ✅ + 5.02 ✅ + 5.03 ✅ → seed = 3 kanıtlı katman; **5.04 ✅** ilk GitHub Actions CI (fast: build+Vitest · a11y: Playwright/axe), iki job paralel yeşil, ampirik teyit (run `28470864743`) → **seed artık otomatik regresyon korumalı**. Kalan 1 task — **5.05** test convention notu docs/TESTING.md (D1.5). **CI notu:** `gh` ortamda yok → public Actions REST API+curl ile gözlendi (eşdeğer); a11y job'da ayrı build yok (webServer `reuseExistingServer=false` kendi build koşar). **Devralınan borç:** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi (harness sonra genişletir).
**Son Faz Dokümanı:** `phases/PHASE-5.md` (🔄 icra — 5.01 ✅ + 5.02 ✅ + 5.03 ✅ + 5.04 ✅, 1 task ⬜)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** TASK-5.05 sıradaki (⬜ Bekliyor) — `/devflow:run-task` ile başlar. 5.01 ✅ + 5.02 ✅ + 5.03 ✅ + 5.04 ✅ tamamlandı.
**Durum:** Faz 5 (test altyapısı D1) 🔄 — icra sürüyor, 5.04 ✅ (4/5). Sıradaki adım faz döngüsünde run-task TASK-5.05.
**İlerleme:** `/devflow:run-task` ile TASK-5.05'i (kümülatif test convention notu — docs/TESTING.md) çalıştır (yeni oturum). Faz 5'in son task'ı; tamamlanınca adım=verify.

---

## Task Durumu (Aktif Faz)

> Faz 5 (test altyapısı D1) 🔄 — icra sürüyor: 5.01 ✅ + 5.02 ✅ + 5.03 ✅ + 5.04 ✅ (4/5), 1 task ⬜. discuss ✅ + research ✅ + plan ✅ + verify-plan ✅. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 5.01 | TASK-5.01 | ✅ Tamamlandı | Vitest kurulumu (node) + i18n 5-dil parite tohum |
| 5.02 | TASK-5.02 | ✅ Tamamlandı | Vitest jsdom katmanı + component smoke tohum |
| 5.03 | TASK-5.03 | ✅ Tamamlandı | Playwright + axe + a11y regresyon (`/` light+dark) |
| 5.04 | TASK-5.04 | ✅ Tamamlandı | CI iskeleti — ilk GitHub Actions (fast + a11y job) |
| 5.05 | TASK-5.05 | ⬜ Bekliyor | Kümülatif test convention notu (docs/TESTING.md) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-5.04 — CI iskeleti: ilk GitHub Actions (fast + a11y job)** ✅ (2026-06-30)
- `.github/workflows/ci.yml` (YENİ, projenin ilk CI'ı): `on: push[**] + pull_request`, `concurrency` cancel-in-progress, `permissions: contents:read`. **fast** = checkout→setup-node(24,npm cache)→`npm ci`→`build`→`test`; **a11y** = +`actions/cache` (ms-playwright, lockfile-hash key)→`playwright install --with-deps chromium`→`test:e2e` (webServer kendi build koşar, ayrı build yok).
- Kanıt: revize branch push → run `28470864743` → iki job da **ilk denemede yeşil** (fast ~47s · a11y ~82s, paralel). `gh` ortamda yok → public Actions REST API+curl ile job-seviyesi `conclusion=success` ampirik gözlendi.
- Not: CI yalnız doğrular, deploy etmez (Vercel hâlâ yalnız `main`); `ANTHROPIC_API_KEY` CI'da yok → chatbot offline ama `/` build+a11y etkilenmez.

**TASK-5.03 — Playwright/axe + a11y regresyon tohum (`/` light+dark)** ✅ (2026-06-30)
- 2 devDep (caret): `@playwright/test@^1.61.1` + `@axe-core/playwright@^4.12.1` (axe-core 4.12.1); chromium-1228 indirildi. `playwright.config.ts` (chromium-only, prod webServer `build && start`, port 3000) + `test:e2e` scripti + `tests/e2e/home-a11y.spec.ts` (light+dark, `NEXT_LOCALE=tr` cookie + `emulateMedia` + scroll + `withTags(wcag2a/2aa/21a/21aa)`).
- Kanıt: `npm run test:e2e` 2/2 yeşil 0 ihlal (ampirik baseline); fail-on-regression: `--color-ink` soluk → light kırmızı (`color-contrast`) + dark yeşil → geri al → yeşil. Vitest 6/6; build temiz. **Seed = 3 kanıtlı katman tamam.**
- Not: 🔴 kritik risk gerçekleşmedi — WCAG-AA scope (`withTags`) Lighthouse-altküme vs ham full-ruleset farkını nötralize etti; `.gitignore`'a Playwright çıktı klasörleri eklendi.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** TASK-5.05 sıradaki (⬜; 5.01 ✅ + 5.02 ✅ + 5.03 ✅ + 5.04 ✅, 1 task ⬜). Sıradaki adım: `/devflow:run-task` → TASK-5.05
**Aktif Faz:** 5 — Test altyapısı (D1) 🔄 · adım=task (run-task); Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — run-task 5.04 ✅: İlk GitHub Actions CI (`ci.yml`) kuruldu — push[**]+PR'da fast (build+Vitest) + a11y (Playwright/axe) paralel job; ilk push'ta iki job da yeşil, ampirik teyit (run `28470864743`; `gh` yok → public REST API+curl). Adım=task → run-task TASK-5.05 (son task).
