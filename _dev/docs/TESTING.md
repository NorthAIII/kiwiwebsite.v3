# TESTING — Test Convention Notu

**Amaç:** Bu projede testin **nerede yaşadığı**, **nasıl koşulduğu** ve **nasıl büyüdüğü**. Kısa bir convention notudur — kapsamlı kılavuz değil. Test altyapısı Faz 5'te (D1) sıfırdan kuruldu (detay → `phases/PHASE-5.md`).

**Temel ilke:** Test atlanmaz; altyapı her geliştirmeyle **üstüne koyarak** büyür — her yeni yetenek kendi güvencesini de getirir (`ILKELER.md` → Kümülatif test altyapısı).

---

## Komutlar

| Komut | Ne koşar |
|-------|----------|
| `npm run test` | Vitest (tek sefer): birim mantığı + i18n parite (node) **ve** component smoke (jsdom) |
| `npm run test:watch` | Vitest watch modu (geliştirme sırasında) |
| `npm run test:e2e` | Playwright + axe: gerçek tarayıcıda a11y regresyon (`/` light+dark) |

`test:e2e` kendi içinde prod build koşar (`webServer: next build && next start`) — ayrı build adımı gerekmez. İlk koşuda Playwright tarayıcısı gerekiyorsa: `npx playwright install --with-deps chromium`.

---

## Test Yerleri ve Config'ler

| Katman | Dosya deseni | Config |
|--------|--------------|--------|
| Vitest (birim/parite + component) | `tests/**/*.test.{ts,tsx}` | `vitest.config.ts` + `vitest.setup.ts` |
| Playwright (a11y/E2E) | `tests/e2e/**/*.spec.ts` | `playwright.config.ts` |

İki runner desen bazında ayrılır (`.test.*` vs `.spec.ts`) ve Vitest `tests/e2e/**`'i ayrıca dışlar — çakışmazlar.

---

## 3 Katman ve Ne İçin

Seed, her katmanı uçtan-uca kanıtlayan bir tohum testle kuruldu:

1. **Vitest — node** (varsayılan ortam): saf mantık / veri doğrulaması, DOM gerektirmez (hızlı). Tohum: `tests/i18n-parity.test.ts` — `messages/{tr,en,ar,de,es}.json` anahtar kümeleri eşit (eksik/fazla anahtar = fail). **Değerler karşılaştırılmaz** — TR tek kaynak, stale çeviri versiyon-sınırına dek serbest (dil stratejisi → `docs/DECISIONS.md`).
2. **Vitest — jsdom** (`// @vitest-environment jsdom` pragma): component render + jest-dom matcher'ları. Tohum: `tests/smoke.test.tsx`. Not: jsdom'da WebGL yok → three.js/Living Flow birim-test **edilmez**; gerçek bileşenler (Hero vb.) next-intl/GSAP/three sürükler. Component smoke trivial/app-bağımsız tutulur.
3. **Playwright + axe** (gerçek tarayıcı, chromium): a11y/E2E. Tohum: `tests/e2e/home-a11y.spec.ts` — ana sayfa `/` light+dark axe WCAG AA 0 ihlal. jsdom gerçek layout/CSS/kontrastı yansıtmaz → a11y için gerçek tarayıcı şart.

---

## a11y Ölçüm Disiplini (kritik — özet)

a11y testi yazarken/değiştirirken bu kurallar pazarlık dışı (gerekçe ve kanıt → `memory/a11y-olcum-tema-tuzagi.md`, `phases/PHASE-4.md`, `phases/PHASE-5.md`):

- **Light + dark iki koşu** — `bg-ink`/`text-canvas` panelleri dark'ta krem'e döner → kontrast pass/fail flip eder; bir temada geçmek diğerini garanti etmez (`emulateMedia({ colorScheme })`).
- **`NEXT_LOCALE=tr` cookie** — `/` (prefixsiz TR) Accept-Language ile `/en` vb.'ye yönlenir (next-intl localeDetection); cookie precedence ile TR `/` ölçülür.
- **`reducedMotion: 'reduce'` + uçtan-uca scroll** — full-motion'da reveal `opacity:0` kalır ve axe gizli içeriği atlar (yanlış yeşil); reduced-motion + scroll tüm içeriği görünür kılar.
- **axe `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])`** — Faz 4'ün kilitlediği WCAG AA standardını bağlar. Ham full-ruleset best-practice (region/landmark/heading-order) Lighthouse'un saymadığı gürültü verir; "Lighthouse a11y=100" ham axe 0-ihlal'i **garanti etmez** (ayrı sürüm + alt-küme farkı).

---

## Yeni Test Nasıl Eklenir (kümülatif beklenti)

> **Her yeni feature/fix kendi testini ekler.** Geriye dönük güven zamanla **artmalı**, azalmamalı.

Katman seçimi:

- **Saf mantık / veri / i18n** → `tests/<ad>.test.ts` (Vitest node, varsayılan). Yeni bir `messages` anahtarı eklersen parite testi 5 dili otomatik kapsar.
- **Component render davranışı** → `tests/<ad>.test.tsx`, dosya başına `// @vitest-environment jsdom`. WebGL/ağır bağımlılık sürüklemeyen birim tut.
- **a11y / sayfa davranışı (E2E)** → `tests/e2e/<ad>.spec.ts` (Playwright). a11y için yukarıdaki ölçüm disiplinini uygula. Yeni sayfaların a11y'sini buraya ekleyerek alt-sayfa kapsamı kümülatif büyür.

Seed yalnız harness + tohumdur; alt-sayfa derin a11y gibi genişlemeler bilinçle sonraki feature'lara bırakıldı (`phases/PHASE-5.md` → Kapsam Dışı).

---

## CI

Push ve PR'da (tüm branch'ler — `revize/...` dahil) otomatik koşar: `.github/workflows/ci.yml` — iki paralel job:

- **fast** — `npm ci` → `next build` → `npm run test` (Vitest)
- **a11y** — `npm ci` → `playwright install chromium` → `npm run test:e2e` (Playwright/axe)

CI yalnız **doğrular, deploy etmez** (Vercel hâlâ yalnız `main`→deploy). `GROQ_API_KEY` CI'da yok → chatbot offline fallback'e düşer; `/` build + a11y scan etkilenmez. Repo public → run/job durumu auth'suz REST API ile de okunabilir (`gh` yoksa; detay → MEMORY "Ortam & Araç Notları").

---

## Canlı Katman (elle, CI dışı)

Yukarıdaki üç katmanın göremediği davranış için ayrı bir katman. **CI'da koşmaz, elle tetiklenir** (kullanıcı kararı, Faz 19): canlıya istek atar ve koşanın IP'sini kilitleyebilir.

**Neden ayrı:** `/api/chat` koruması iki katmandır (DECISIONS 2026-10-02). Vercel WAF hız sınırı (429) yalnız Vercel serving zincirinde vardır. Origin kapısının canlıda doğru çalışması da Vercel'in `host` başlığına hangi değeri verdiğine bağlıdır. Vitest yalnız origin mantığını ölçer; yerel `next start` ve CI koşucusu WAF'sızdır.

| Script | Ne ölçer | Çıkış |
|--------|----------|-------|
| `ops/probe-chat-guard.mjs --base <url> [--burst \| --burst-only]` | Yabancı Origin → 403 · Origin'siz (curl) → 403 · kendi Origin → 400/503 ("kapıdan geçti"). `--burst`: ilk 429'a dek en fazla 13 istek, kaçıncıda geldiğini raporlar. **Model hiç çağrılmaz**: tek sabit gövde `{"messages":[]}`. | 0 eşleşme · 1 sapma · 2 ölçülemedi (argüman/ağ hatası ya da IP zaten sınırda) |
| `ops/firewall/drift.mjs` | Vercel'deki WAF kuralı ↔ repo spec'i `ops/firewall/chat-rate-limit.json`. Yetkili `vercel` CLI ister. Bekleyen draft varsa draft'ı ölçer ve uyarır. | 0 eşleşme · 1 drift · 2 kural yok / CLI hatası |

**Ne zaman koşulur:** WAF kuralı değiştiğinde (stage sonrası drift, publish sonrası probe) · `/api/chat` kapısı değişip canlıya çıktığında · versiyon-sonu UAT'de. Kullanım örnekleri ve senaryoların gerekçesi script başlıklarında.

**Pencere bütçesi:**

- WAF canlıyken IP başına 10 dakikada 6 istek sayılır. Origin senaryoları da sayılır (her koşu 3 istek, 403'ler dahil).
- Hobby'de system bypass yok: patlama koşanın IP'sini ≤10 dk 429'da tutar ve o sürede aynı IP'den chatbot da offline görünür. Patlama her zaman **en son** koşulur.
- Birden çok host (apex, `www`, `vercel.app`) probe'lanacaksa toplam istek önceden planlanır.

**Yerelde:** `npm run build` → `next start -p <boş port>` → `--base http://localhost:<port>`. Anahtarsız 403 · 403 · 503, anahtarlı 403 · 403 · 400 beklenir. WAF olmadığı için `--burst` yerelde her zaman "sınır gözlenmedi" ve çıkış 1 verir; bu beklenen sonuçtur. Bu host'ta `:3000` yabancı bir dinleyicidedir, başka port kullan (→ MEMORY "Ortam & Araç Notları").

---

**Oluşturulma:** 2026-06-30 (TASK-5.05)
