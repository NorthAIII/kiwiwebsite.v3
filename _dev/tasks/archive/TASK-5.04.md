# TASK-5.04: CI İskeleti — İlk GitHub Actions Workflow

**Durum:** ✅ Tamamlandı
**Modül:** M6 (build/yayın katmanı) — `modules/M6-SEO-Deploy.md`
**Feature:** D1.4 (CI iskeleti)
**Faz:** Phase 5 (phases/PHASE-5.md)
**Bağımlılıklar:** TASK-5.01 ✅, TASK-5.02 ✅, TASK-5.03 ✅ (`npm run test` + `npm run test:e2e` + config'ler hazır olmalı)

---

## Hedef

Projenin **ilk CI'ını** kur: `.github/workflows/ci.yml`, push + pull_request'te (revize branch dahil) **2 job** koşar — *fast* (`npm ci` → `next build` → `vitest`) + *a11y* (`npm ci` → `playwright install chromium` → `next build` → `playwright`). Tamamlanma: workflow revize branch'ine push'ta tetiklenir ve **her iki job YEŞİL** koşar — `gh` ile ampirik gözlenir ("yml doğru görünüyor" yeterli değil).

---

## Bağlam

Bu projenin **ilk CI'ı**: şu an `.github/` yok; Vercel git-entegrasyonu yalnız `main`→deploy yapıyor, **doğrulama yapmıyor**. Kümülatif teste gerçek güç CI'dan gelir — otomatik koşmayan test çürür (rot). MEMORY süreç disiplini bu task'ın çekirdeği: *"entegrasyon eklerken canlıda gerçekten çalıştığını gözle doğrula — kod ekledim tamamdır deme."* Burada "gerçekten çalışıyor" = GitHub Actions'ta run'ın yeşil olduğunu görmek.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-5.md` — "Araştırma Bulguları" → Teknik Kararlar (CI = 2 job, push+PR revize dahil, cache) + Dikkat #8 (CI build maliyeti)
- `_dev/MEMORY.md` — Süreç Disiplinleri (entegrasyonu canlıda gözle doğrula)
- `package.json` + `playwright.config.ts` + `vitest.config.ts` (5.01–5.03 çıktıları — komut/config kaynağı)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-5.md` — Task Listesi tablosunda 5.04 durumu

---

## Alt Görevler

- [x] **1. `.github/workflows/ci.yml` oluştur (YENİ)**
  - Trigger: `push` (`branches: ['**']` — tüm branch, revize garanti dahil) + `pull_request`
  - `concurrency` (aynı ref'te eski run'ı iptal) + `permissions: contents: read` (minimal)

- [x] **2. Job `fast`** (hızlı geri bildirim)
  - `actions/checkout@v4` → `actions/setup-node@v4` (node 24, `cache: npm`)
  - `npm ci` → `npm run build` (next build) → `npm run test` (Vitest: birim + i18n parite)

- [x] **3. Job `a11y`** (tarayıcı kurulumlu, ayrı job)
  - `checkout@v4` → `setup-node@v4` (node 24, npm cache) + Playwright browser cache (`actions/cache@v4`, `~/.cache/ms-playwright`, key=`hashFiles('package-lock.json')` → playwright sürümü dahil)
  - `npm ci` → `npx playwright install --with-deps chromium` → `npm run test:e2e`
  - **Karar netleşti:** `test:e2e` webServer'ı (`build && start`, CI'da `reuseExistingServer=false`) prod build'i kendi koşar → **ayrı `next build` adımı eklenmedi** (çift-build'den kaçınıldı; research #8 ile tutarlı).

- [x] **4. Kanıtla (entegrasyon doğrulama disiplini)**
  - Commit + push (revize branch `revize/devflow-kurulum`) → workflow tetiklendi (run id `28470864743`)
  - **`gh` bu ortamda yok** → public Actions REST API (`api.github.com/.../actions/runs/:id/jobs`) curl ile izlendi (repo public, auth gerekmedi) — eşdeğer ampirik gözlem
  - İlk denemede **iki job da yeşil**: fast ✅ (~47s) + a11y ✅ (~82s, paralel). Düzeltme gerekmedi.

---

## Etkilenen Dosyalar

```
.github/
└── workflows/
    └── ci.yml      # YENİ
```

---

## Dikkat Noktaları

- **Node 24** — `vitest@4` engines `node>=24`; `setup-node` `node-version: 24` (yerel v24.16 ile uyumlu).
- **Cache** — npm cache (`setup-node cache: npm`) + Playwright browser cache run süresini düşürür; cache miss'te de çalışmalı.
- **İki job da `next build` koşar** — research #8: ilk CI'da basit/robust; `.next` artifact paylaşımı bilinçli **ileri optimizasyon** (şimdi değil).
- **Revize branch dahil** — milestone #4: revize branch'inde de tetiklenir + yeşil rapor. CI ≠ Vercel deploy: CI yalnız doğrular, **`main`'e/canlıya dokunmaz**, deploy tetiklemez (Vercel hâlâ yalnız `main` push'ta deploy eder).
- **`ANTHROPIC_API_KEY` CI'da yok** — chatbot offline fallback'e düşer; `/` build + a11y scan etkilenmez (5.03 Dikkat #8). Secret CI'a eklenmez (gerek yok).
- **"yml doğru görünüyor" YASAK** — run'ın gerçekten yeşil koştuğunu `gh` ile gör (MEMORY süreç disiplini).

---

## Test Kriterleri

- [x] `ci.yml` revize branch push'ta **tetiklendi** (run id `28470864743`, head_branch=`revize/devflow-kurulum`)
- [x] `fast` job **yeşil** (build + Vitest birim+i18n) — conclusion=success
- [x] `a11y` job **yeşil** (playwright install + a11y `/` light+dark) — conclusion=success
- [x] Yeşil sonuç **ampirik** teyit edildi — `gh` yok, public Actions REST API curl ile gözlendi (job-seviyesi conclusion=success ×2 + run-seviyesi success)
- [x] PR trigger'ı da tanımlı (`on: push` + `pull_request`)

---

## Karar Noktaları

- **Trigger branch kapsamı:** `branches: ['**']` (tüm branch — basit, revize otomatik dahil) vs `[main, 'revize/**']` (açık liste). **Öneri:** push tüm branch + pull_request (en basit, revize garanti dahil); verify-plan/icra teyit eder.
- **a11y job'da ayrı build adımı:** `test:e2e` webServer build+start koşuyorsa job'da ek `next build` gereksiz; netleşmesi icrada (webServer reuse mantığına göre).

---

## Risk ve Geri Dönüş Planı

- **Risk:** İlk CI — yml sözdizimi/job hataları olası; cache key yanlışlığı. Push revize branch'e → **`main` canlıyı etkilemez** (yalnız doğrulama job'ı, deploy değil).
- **Rollback:** `ci.yml`'i sil veya düzelt; workflow'u devre dışı bırak. Hiçbir runtime/build dosyasına dokunmaz.

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-06-30

**Durum:** ✅

**Yapılanlar:**
- `.github/workflows/ci.yml` oluşturuldu (projenin ilk CI'ı): `on: push [**] + pull_request`, `concurrency` (cancel-in-progress), `permissions: contents: read`.
- **fast** job: checkout@v4 → setup-node@v4 (node 24, npm cache) → `npm ci` → `npm run build` → `npm run test`.
- **a11y** job: checkout@v4 → setup-node@v4 (node 24, npm cache) → `npm ci` → `actions/cache@v4` (ms-playwright, key=lockfile hash) → `npx playwright install --with-deps chromium` → `npm run test:e2e`. Ayrı `next build` adımı yok (webServer kendi build+start koşar).
- Commit + push (revize branch) → run tetiklendi → public Actions REST API ile izlendi → iki job da ilk denemede yeşil.

**Sorunlar:**
- **Ortamda `node`, `gh` ve `python` yok** (taze cloud devcontainer; dokümandaki `/home/kivanc` değil `/workspaces`). Workflow GitHub runner'da koştuğu için node yerelde gerekmedi; YAML doğrulaması GitHub parser'ına bırakıldı (zaten istenen ampirik kanıt). Kanıtlama `gh` yerine **public REST API + curl** ile yapıldı (repo public → auth gerekmedi).

**Kararlar:**
- a11y job'da ayrı `next build` adımı **eklenmedi** — `test:e2e` webServer'ı CI'da (`reuseExistingServer=false`) zaten prod build koşar; ek adım çift-build olurdu (research #8 ile tutarlı). · docs/DECISIONS.md'ye eklendi: Hayır (icra detayı, mimari karar değil)
- Trigger = `push: branches['**'] + pull_request` (karar noktası: en basit, revize garanti dahil). · DECISIONS: Hayır

**Dosya Değişiklikleri:**
- `.github/workflows/ci.yml` (YENİ)

**Test Sonuçları:**
- Run `28470864743` (revize/devflow-kurulum): genel conclusion=**success**. fast=success (~47s) · a11y=success (~82s), paralel. PR trigger tanımlı.

---

## Sonuç Özeti

**Tamamlanma Tarihi:** 2026-06-30

**Ne Yapıldı:**
- Projenin ilk CI'ı (`.github/workflows/ci.yml`) kuruldu: push (tüm branch) + PR'da iki paralel job — **fast** (build + Vitest birim/i18n parite) ve **a11y** (Playwright/axe `/` light+dark). npm + Playwright-browser cache; CI yalnız doğrular, deploy etmez.
- İlk push'ta iki job da yeşil koştu, ampirik teyit edildi (run `28470864743`). Faz 5 seed'inin (3 kanıtlı katman) artık otomatik regresyon koruması var.

**Öğrenilenler:**
- Bu cloud ortamında `gh`/`node`/`python` yok; **public repo + Actions REST API + curl** `gh`'ye tam eşdeğer ampirik CI gözlemi sağladı (job-seviyesi `conclusion` polling).
- `playwright.config` webServer `reuseExistingServer=false` (CI) sayesinde a11y job'unda ayrı build adımına gerek yok — `test:e2e` prod build'i kendi koşar.

---

**Oluşturulma:** 2026-06-30
