# TASK-5.03: Playwright + axe Harness + a11y Regresyon Tohum Testi (`/` light+dark)

**Durum:** ⬜ Bekliyor
**Modül:** M6 (infra, çapraz) + M1–M3 (a11y yüzeyi) — `modules/M6-SEO-Deploy.md`
**Feature:** D1.1 (test harness — Playwright/axe katmanı) + D1.3 (a11y regresyon tohum)
**Faz:** Phase 5 (phases/PHASE-5.md)
**Bağımlılıklar:** TASK-5.01, TASK-5.02 (bağımsız toolchain; lineer sıra gereği sonra)

---

## Hedef

`@playwright/test` + `@axe-core/playwright` kur, chromium browser'ı indir, prod-build hedefli `playwright.config.ts` (chromium-only) + `npm run test:e2e` ekle ve **a11y regresyon tohumunu** yaz: ana sayfa `/` **light + dark** iki koşuda WCAG-etiketli axe ile **0 ihlal**. Tamamlanma: `npm run test:e2e` `/` light+dark yeşil (gerçek ampirik baseline) **ve** kontrast regresyonu enjekte edilince kırmızı (fail-on-regression). Seed'in 3. kanıtlı katmanı; Faz 4'ün a11y=100 kazanımını otomatik kilitler.

---

## Bağlam

Faz 4 ana sayfayı a11y=100'e çıkardı; bu tohum o kazanımı **otomatik regresyon testine bağlar** (Faz 4 retro önerisi) ve sahipli alt-sayfa a11y borcunu sonradan süpürecek harness'i kurar. Seed'in 3 katmanından 3.'sü (Vitest-node · Vitest-jsdom · **Playwright/axe**).

**🔴 EN KRİTİK RİSK — Lighthouse-altküme ≠ ham axe full-ruleset + sürüm drift:** Faz 4'ün **a11y=100**'ü bir **Lighthouse** skorudur (Lighthouse, axe-core 4.11.4'ün WCAG'a maplenmiş **alt kümesini** koşar). Ham `@axe-core/playwright` varsayılan **tüm ruleset'i** (best-practice dahil) ve **axe-core 4.12.1** kullanır. İki fark birikince "Lighthouse a11y=100" → "@axe-core/playwright 0 ihlal" **garanti etmez**; tohum, Lighthouse'un saymadığı best-practice ihlalleri (region/landmark/heading-order) yüzünden **regresyon olmadan** kırmızı çıkabilir. **Kaçınma:** axe kapsamı `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])` (kullanıcı kararı 2026-06-30) — Faz 4'ün kilitlediği WCAG AA standardını regresyona bağlar, best-practice gürültüsü dışarıda. **Yine de plan değil icra ampirik koşacak:** gerçek 0-ihlal baseline'ı `/` light+dark'ta sabitle (Faz 4 DEV-1 dersinin tekrarı).

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-5.md` — "Araştırma Bulguları" → Dikkat Edilecekler #1–#8 (hepsi bu task'a uygulanır) + Teknik Kararlar
- `_dev/phases/PHASE-4.md` — a11y ölçüm yöntemi (light+dark, reducedMotion, scroll, NEXT_LOCALE cookie); DEV-1/DEV-5 dersleri
- `_dev/memory/a11y-olcum-tema-tuzagi.md` — tema tuzağı (bg-ink/text-canvas dark'ta krem'e döner)
- `_dev/MEMORY.md` — Accept-Language redirect tuzağı (NEXT_LOCALE=tr cookie)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-5.md` — Task Listesi tablosunda 5.03 durumu
- `_dev/docs/DECISIONS.md` — **yalnız** ampirik baseline beklenmedik çıkarsa (örn. WCAG-etiketli axe `/`'da ihlal bulur → karar)

---

## Alt Görevler

- [ ] **1. Playwright/axe devDependency'lerini ekle + browser indir** *(install anında teyit — Dokunulmazlar)*
  - `@playwright/test@1.61.1` (Faz 4 npx `playwright-core 1.61.1` ile birebir), `@axe-core/playwright@4.12.1` (axe-core ~4.12.1 bundle)
  - `npx playwright install --with-deps chromium` (yerel) — package-lock referansına güvenme (research: taze install)

- [ ] **2. `playwright.config.ts` oluştur (YENİ)**
  - `testDir: './tests/e2e'`, spec deseni `*.spec.ts`
  - **chromium-only** project (a11y tek motor yeter, CI hızlı)
  - `webServer`: **prod build** zemini (Faz 4 ölçüm zemini) — `command: 'npm run build && npm run start'` (research #8: basit/robust), `port: 3000`, `reuseExistingServer: !process.env.CI`
  - `npm run test:e2e` scripti → `playwright test`

- [ ] **3. `tests/e2e/home-a11y.spec.ts` oluştur (YENİ)**
  - **İki koşu** (light + dark) — parametrize veya iki `test()`:
    - `context.addCookies([{ name: 'NEXT_LOCALE', value: 'tr', ... }])` → TR `/` (Accept-Language redirect tuzağı)
    - `page.emulateMedia({ colorScheme: 'light'|'dark', reducedMotion: 'reduce' })`
    - `/`'a git, **uçtan-uca scroll** (lazy reveal `opacity:0` tuzağı — tüm içeriği görünür yap)
    - `new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()`
    - `expect(results.violations).toEqual([])`

- [ ] **4. Kanıtla (kur+kanıtla milestone)**
  - **Ampirik baseline:** `npm run test:e2e` koş → `/` light+dark gerçek 0-ihlal teyit et (varsayım değil). İhlal çıkarsa → **Karar Noktaları**'na bak (kullanıcıya getir)
  - **Fail-on-regression:** geçici bir kontrast regresyonu enjekte et (örn. soluk metin token'ı) → test kırmızı → geri al, tekrar yeşil
  - `next build` temiz

---

## Etkilenen Dosyalar

```
package.json                  # 2 devDep + test:e2e scripti — zaten var
playwright.config.ts          # YENİ
tests/e2e/
└── home-a11y.spec.ts         # YENİ
```

> Not: `next build` çıktısı / `src/` runtime'ı **değişmez** — yalnız test katmanı eklenir.

---

## Dikkat Noktaları

*(research "Dikkat Edilecekler" → bu task'ın tam çekirdeği)*

1. **🔴 WCAG etiketleri şart** (`wcag2a/2aa/21a/21aa`) — ham full-ruleset best-practice gürültüsü (region/landmark/heading-order) regresyon olmadan kırmızı verebilir. Ampirik baseline sabitle.
2. **Locale tuzağı** — `/` (prefixsiz TR) Accept-Language ile `/en`'e yönlenir; **`NEXT_LOCALE=tr` cookie şart** (cookie precedence > Accept-Language). `NEXT_LOCALE` = next-intl runtime cookie (dış/runtime, repoda env/sabit değil). (MEMORY)
3. **Tema tuzağı** — daima **light + dark iki koşu**; `bg-ink`/`text-canvas` panelleri (SectorSolutions, Bunker, Footer) dark'ta krem'e döner → kontrast pass/fail flip eder. (`memory/a11y-olcum-tema-tuzagi.md`)
4. **Reveal `opacity:0` tuzağı** — full-motion'da scroll-reveal içerik `opacity:0` kalır, axe gizli içeriği atlar (yanlış yeşil). `reducedMotion: 'reduce'` + **uçtan-uca scroll** şart. (Faz 4 DEV-5)
5. **Gerçek tarayıcı zemini** — Playwright chromium gerçek render+CSS+kontrast ölçer (jest-axe jsdom yanıltıcı yeşili değil). Living Flow WebGL render olur; a11y kapsamı kontrast/markup.
6. **Prod build (dev değil)** — Faz 4 ölçüm zemini birebir. `webServer` prod start.
7. **Playwright taze install** — `npx playwright install --with-deps chromium`; package-lock'taki `@playwright/test` Next'in opsiyonel peer'ı (yanıltıcı).
8. **Chatbot offline a11y'yi etkilemez** — CI/yerel testte `ANTHROPIC_API_KEY` yokken chatbot zarif "offline" fallback'e düşer (M5); `/` yine render olur, a11y scan etkilenmez. (Yeni bir a11y ihlali çıkmadığını ampirik teyit et.)

---

## Test Kriterleri

- [ ] `npm run test:e2e` yeşil: `/` **light** ve **dark** axe (WCAG etiketleri) **0 ihlal**
- [ ] Baseline **ampirik** sabitlendi (gerçek koşu çıktısı, "Faz 4'te 100'dü → temizdir" varsayımı değil)
- [ ] **Fail-on-regression:** kontrast regresyonu enjekte edilince test kırmızı → geri alınınca yeşil
- [ ] `playwright.config.ts` chromium-only + prod-build webServer; `testDir: tests/e2e`
- [ ] `npm run build` temiz geçer

---

## Karar Noktaları

- **Ampirik koşuda `/` light/dark'ta WCAG-etiketli axe ihlal BULURSA** (Lighthouse'un saymadığı bir şey): bu **regresyon değil keşif** → dur, kullanıcıya getir. Seçenekler: (a) düzelt (yeni minik a11y task), (b) o kuralı bilinçli scope-dışı bırak + gerekçe, (c) sahipli borç olarak kaydet. **Beklenti:** WCAG-AA scope ile temiz geçer (Faz 4 standardı), ama ampirik teyit zorunlu — varsayma.
- **webServer wiring:** `npm run build && npm run start` (research #8 basit/robust) seçildi; CI'da çift-build kabul. Alternatif (build'i ayrı adımda koşup `start`-only webServer) bilinçli ileri optimizasyon — şimdi değil.

---

## Risk ve Geri Dönüş Planı

- **Risk:** Yeni devDep + browser install; ampirik baseline beklenenden farklı çıkabilir (kritik risk yukarıda) → Karar Noktaları akışı.
- **Rollback:** 2 devDep + `playwright.config.ts` + `tests/e2e/home-a11y.spec.ts` geri al; `package-lock.json` restore. Browser cache (`~/.cache/ms-playwright`) repoyu etkilemez.

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
