# DURUM — Proje Dashboard

**Son Güncelleme:** 2026-06-30 — verify-phase 5 ✅: UAT 13/13 geçti (otonom mod — node yok, CI + statik + task-kayıtlı kanıt). Otomatik kontroller: CI HEAD run `28471662528` iki job + her adım yeşil; `/security-review` HIGH/MEDIUM bulgu yok. Fail-on-regression task-kayıtlı (5.01 i18n + 5.03 a11y). Düzeltme task'ı yok → **Adım=review** (sıradaki: `/devflow:review-phase 5`).

<!-- KURAL: Bu satır her oturum sonunda ÜZERİNE YAZILIR — tek satır, tek cümle. "Önceki:" / "Eski:" prefix ile kümülatif yığma YASAK; HTML comment'e sarma da yasak (CLAUDE.md → Doküman Disiplini). Tarih + kısa özet yeterli; detay için git log + ilgili PHASE/TASK dokümanları. -->

---

## Aktif Faz

**Faz:** 5 — Test altyapısı (D1). 🔄 **UAT geçti, review bekliyor** — 5.01 ✅ + 5.02 ✅ + 5.03 ✅ + 5.04 ✅ + 5.05 ✅ (5/5); discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + **verify (UAT 13/13) ✅**. Faz 4 (v0.2 a11y 89→100) ✅.
**Adım:** review → `/devflow:review-phase 5` (yeni oturum): faz review + retrospektif + kalite kontrol.
**İlerleme:** Seed = 3 kanıtlı katman (Vitest-node i18n parite · Vitest-jsdom smoke · Playwright/axe a11y); ilk GitHub Actions CI (fast + a11y) iki job yeşil; `docs/TESTING.md` convention notu. **UAT 13/13 ✅** (otonom: CI run `28471662528` iki job+her adım yeşil + statik çapraz-kontrol + fail-on-regression task-kayıtlı 5.01/5.03); `/security-review` HIGH/MEDIUM yok; düzeltme task'ı doğmadı. **Devralınan borç:** alt-sayfa derin a11y + `text-pulse` ink-panel süpürmesi (harness sonra genişletir).
**Son Faz Dokümanı:** `phases/PHASE-5.md` (🔄 UAT 13/13 ✅, review bekliyor)

---

## Aktif Versiyon

**Versiyon:** v0.2 — a11y & Performans + teknik temel (v0.1 versiyon-sonu ölçümünün keşfettiği brief-bütçe açığını kapatma + teknik temel; prd-review 2026-06-29'da önceliklendirildi)
**Hedef:** a11y 89→≥100 (marka-yeşili kontrast + hero `<dl>` + dil-switcher aria) + mobil perf 87/LCP 3.1s → brief bütçesi + test altyapısı (D1) + Umami (E1); kesin faz kapsamı discuss-phase'de
**Versiyon Sonu Durumu:** içerik_fazları

<!-- Versiyon geçişlerinde güncellenir. discuss-phase versiyon sonu tespitinde bu alanı okur. -->
<!-- Değerler: içerik_fazları | teknik_borç | senaryo_testi | prd_review_bekliyor -->

---

## Aktif Task

**Task:** Yok — Faz 5 tüm task'lar ✅ (5/5) ve UAT 13/13 ✅. Düzeltme task'ı doğmadı.
**Durum:** Faz 5 (test altyapısı D1) 🔄 — UAT geçti, review bekliyor. Sıradaki adım faz döngüsünde `/devflow:review-phase 5`.
**İlerleme:** UAT tamam (13/13). `/devflow:review-phase 5` ile faz review + retrospektif + kalite kontrolünü çalıştır (yeni oturum).

---

## Task Durumu (Aktif Faz)

> Faz 5 (test altyapısı D1) 🔄 — icra tamam: 5.01 ✅ + 5.02 ✅ + 5.03 ✅ + 5.04 ✅ + 5.05 ✅ (5/5). discuss ✅ + research ✅ + plan ✅ + verify-plan ✅ + verify (UAT 13/13) ✅. Review bekliyor. Faz 4 (v0.2 a11y) ✅; 8 task'ı (4.01-4.08) `tasks/archive/`'da, detay `phases/PHASE-4.md`.

| # | Task | Durum | Açıklama |
|---|------|-------|----------|
| 5.01 | TASK-5.01 | ✅ Tamamlandı | Vitest kurulumu (node) + i18n 5-dil parite tohum |
| 5.02 | TASK-5.02 | ✅ Tamamlandı | Vitest jsdom katmanı + component smoke tohum |
| 5.03 | TASK-5.03 | ✅ Tamamlandı | Playwright + axe + a11y regresyon (`/` light+dark) |
| 5.04 | TASK-5.04 | ✅ Tamamlandı | CI iskeleti — ilk GitHub Actions (fast + a11y job) |
| 5.05 | TASK-5.05 | ✅ Tamamlandı | Kümülatif test convention notu (docs/TESTING.md) |

---

## Son Task Özetleri

> **KURAL:** Sadece son 2 task özeti tutulur, daha eskileri **gerçekten silinir** (HTML comment'e sarma, "Önceki:" prefix, üstü çizili etiket yasak — detay için git log + arşivlenmiş task dokümanı). Her özet kısa formatlı: paragraf yasak, **bullet zorunlu**, "Özet" alanı max 3 bullet.

**TASK-5.05 — Kümülatif test convention notu (docs/TESTING.md)** ✅ (2026-06-30)
- `_dev/docs/TESTING.md` (YENİ): komutlar (`npm run test` / `test:watch` / `test:e2e`) + test yerleri/config'ler + 3 katman (Vitest node/jsdom + Playwright/axe) ve ne için + a11y ölçüm disiplini (5 madde, **özet+pointer**, kopyalanmadı) + "yeni test nasıl eklenir" (katman seçimi/suffix/kümülatif beklenti) + CI. Kısa, tek-okunabilir. INDEX Bilgi Havuzu'na işlendi.
- Kanıt: statik çapraz-kontrol — belgelenen komut/yolların hepsi gerçek artefaktlarla birebir eşleşir (package.json 11-13 · tests/ · config'ler · ci.yml). Komut yeşilliği zaten TASK-5.04 CI (run `28470864743`) ile kanıtlı; bu task yalnız doküman, runner değişmedi.
- Not: ortamda node/npm yok (taze devcontainer) → yerel koşu yapılmadı, gerek de yoktu (CI yeşil). QUALITY §8 bayatlaması review-phase'e bırakıldı.

**TASK-5.04 — CI iskeleti: ilk GitHub Actions (fast + a11y job)** ✅ (2026-06-30)
- `.github/workflows/ci.yml` (YENİ, projenin ilk CI'ı): `on: push[**] + pull_request`, `concurrency` cancel-in-progress, `permissions: contents:read`. **fast** = checkout→setup-node(24,npm cache)→`npm ci`→`build`→`test`; **a11y** = +`actions/cache` (ms-playwright, lockfile-hash key)→`playwright install --with-deps chromium`→`test:e2e` (webServer kendi build koşar, ayrı build yok).
- Kanıt: revize branch push → run `28470864743` → iki job da **ilk denemede yeşil** (fast ~47s · a11y ~82s, paralel). `gh` ortamda yok → public Actions REST API+curl ile job-seviyesi `conclusion=success` ampirik gözlendi.
- Not: CI yalnız doğrular, deploy etmez (Vercel hâlâ yalnız `main`); `ANTHROPIC_API_KEY` CI'da yok → chatbot offline ama `/` build+a11y etkilenmez.

<!-- KURAL: Sadece son 2 task özeti tutulur, daha eskileri silinir (gerçek silme — HTML comment yasak). -->
<!-- KURAL: Sadece aktif fazın task'leri gösterilir. Geçmiş fazların bilgileri phases/ klasöründedir. -->
<!-- KURAL: "Son Tamamlanan Faz", "Son Tamamlanan Sprint" gibi ek özet bölümleri EKLEME — faz durum özeti PHASES.md'de, faz detayları PHASE-N.md'de. DURUM yalnızca aktif durum + son 2 task özeti. -->

## Duraklatma Notu

<!-- Bu bölüm sadece /devflow:pause kullanıldığında doldurulur. Devam edildiğinde silinir. -->

> ⏸️ **Duraklatma yok** — Aktif çalışma devam ediyor.

## Hızlı Erişim

**Aktif Task:** Yok — Faz 5 tüm task'lar ✅ (5/5) + UAT 13/13 ✅. Sıradaki adım: `/devflow:review-phase 5` (faz review)
**Aktif Faz:** 5 — Test altyapısı (D1) 🔄 UAT geçti · adım=review (review-phase); Faz 4 ✅; Aktif Versiyon v0.2, Versiyon Sonu Durumu: içerik_fazları
**Task Sistemi:** `tasks/TASKS-README.md`
**PRD (karar kaynağı):** `PRD/VIZYON.md` · `PRD/VERSIONS.md` · `PRD/features/`
**Revize Backlog (bilinen sorunlar):** `docs/REVIZE-BACKLOG.md`

---

**Son Güncelleme:** 2026-06-30 — verify-phase 5 ✅: faz UAT 13/13 geçti (otonom mod). Otomatik kontroller: CI HEAD run `28471662528` iki job + her adım yeşil; `/security-review` HIGH/MEDIUM yok. Fail-on-regression task-kayıtlı (5.01/5.03). Düzeltme task'ı doğmadı → adım=review → `/devflow:review-phase 5`.
