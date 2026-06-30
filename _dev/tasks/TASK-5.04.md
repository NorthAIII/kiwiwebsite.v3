# TASK-5.04: CI İskeleti — İlk GitHub Actions Workflow

**Durum:** ⬜ Bekliyor
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

- [ ] **1. `.github/workflows/ci.yml` oluştur (YENİ)**
  - Trigger: `push` + `pull_request`. Branch kapsamı revize branch'lerini içermeli (→ Karar Noktaları)
  - `concurrency` (aynı ref'te eski run'ı iptal) — opsiyonel iyileştirme

- [ ] **2. Job `fast`** (hızlı geri bildirim)
  - `actions/checkout` → `actions/setup-node` (node 24, `cache: npm`)
  - `npm ci` → `npm run build` (next build) → `npm run test` (Vitest: birim + i18n parite)

- [ ] **3. Job `a11y`** (tarayıcı kurulumlu, ayrı job)
  - `checkout` → `setup-node` (node 24, npm cache) + Playwright browser cache (`~/.cache/ms-playwright`, key playwright sürümüne bağlı)
  - `npm ci` → `npx playwright install --with-deps chromium` → `npm run test:e2e`
  - (`test:e2e` webServer'ı prod build'i kendi koşar — research #8; ayrı build adımı gerekmeyebilir, icra teyit)

- [ ] **4. Kanıtla (entegrasyon doğrulama disiplini)**
  - Commit + push (revize branch) → workflow tetiklenir
  - `gh run list` / `gh run watch` ile koşuyu izle → **fast** ve **a11y** job'ları yeşil
  - Hata çıkarsa düzelt + tekrar push, yeşil olana dek (yml çoğu zaman ilk denemede tutmaz — ampirik düzelt)

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

- [ ] `ci.yml` revize branch push'ta **tetiklenir** (Actions sekmesinde/`gh run list`'te run görünür)
- [ ] `fast` job **yeşil** (build + Vitest birim+i18n)
- [ ] `a11y` job **yeşil** (playwright install + a11y `/` light+dark)
- [ ] Yeşil sonuç `gh run list` / `gh run watch` ile **ampirik** teyit edildi
- [ ] PR trigger'ı da tanımlı (push + pull_request)

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

- [ ] Tüm alt görevler tamamlandı
- [ ] Tüm test kriterleri karşılandı
- [ ] Git commit & push yapıldı (conventional commits formatı)
- [ ] Bu doküman güncellendi (oturum kaydı)
- [ ] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — [TARİH]

**Durum:** [✅/🔄/⏸️]

**Yapılanlar:**
- [...]

**Sorunlar:**
- [...]

**Kararlar:**
- [...] · docs/DECISIONS.md'ye eklendi: [Evet/Hayır]

**Dosya Değişiklikleri:**
- [...]

**Test Sonuçları:**
- [...]

---

## Sonuç Özeti

**Tamamlanma Tarihi:** [Tarih]

**Ne Yapıldı:**
- [...]

**Öğrenilenler:**
- [...]

---

**Oluşturulma:** 2026-06-30
