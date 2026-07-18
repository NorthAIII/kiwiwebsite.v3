← [PHASE-17](PHASE-17.md) · araştırma-detayı

# Phase 17 — Araştırma Bulguları (doğrulama substratı & araç eşlemesi)

> `/devflow:research-phase 17` (2026-07-17). Bu bir doğrulama fazı → araştırma "kütüphane seçimi" değil **araç eşlemesi + ortam ampirik teyidi**: S1–S9'u hangi somut doğrulama yöntemine bağlıyoruz ve bu oturum onları koşturabiliyor mu. Tüm bulgular o oturumda ampirik teyit edildi (aşağıda).
>
> Bu bölüm review-phase 17'de parent'tan buraya taşındı (Boyut ve Bölünme — parent tek-okunabilir kalsın diye). Parent'ta özet + pointer durur.

---

## Ortam Ampirik Teyidi (research oturumu)

Faz 14'ün "taze devcontainer, araç yok" riski **o oturumda geçerli değildi** — araç zinciri hazır ve doğrulanmıştı:

- **node v24.16.0 · npm 11.13.0 · Playwright 1.61.1 · Chrome 149 (system) · Chromium 150 · loadavg 3.31 (< ~6 perf eşiği) · 20 çekirdek.** WebGL için system Chrome mevcut.
- **Deterministik katman koşuyor:** `npm run test` → **Vitest 5 dosya / 39 test / exit 0 / 526ms** (yeşil). S1/S6/parite/seo tohumları yerelde çalışır.
- **Build ground-truth mevcut:** `.next/server/app/**/*.html` prerender (5 dil × 6 sayfa) diskte. Redirect matrisi `.next/routes-manifest.json` regex'lerinde.
- **Canlı erişilebilir (test-what's-live):** kiwiailab.com `/` · `/spor-salonu-yazilimi` · `/crew-os` → **200**; canlı Alpfit Plus marker `PhoneMockup` **150×** (branch build prerender'ıyla **birebir aynı** → gym-PNG-silme branch delta'sı Alpfit sayfasını etkilemiyor, test-what's-live tutarlı); `/api/chat` → **503** (env yok, beklenen offline).

---

## Değerlendirilen Yaklaşımlar (doğrulama substratı)

- **A. Build ground-truth (deterministik) — prerender HTML grep + `routes-manifest.json` + Vitest.** Artı: deterministik, ayrı server yok, sandbox `exit 144` riski yok, hızlı, tekrarlanabilir. Eksi: yalnız statik SSG render'ı görür (runtime davranışı — WebGL degradasyon / toggle kalıcılık / klavye yolu — göremez).
- **B. Runtime tarayıcı — `next start` + Playwright `webServer` (standart `test:e2e`).** Artı: mühürlü CI aracı, gerçek layout/CSS/a11y. Eksi: bu sandbox `next start`/`next dev`'i per-session **`exit 144`** ile öldürebilir (`memory/sandbox-runtime-browser-page-route.md`) → yerelde flaky, güvenilmez.
- **C. Runtime tarayıcı — `page.route` interception + system Chrome.** Artı: ayrı server yok (sandbox öldürmez), `.next` prerender+static'i diskten byte-for-byte servis eder; WebGL için `channel:'chrome'`+`--enable-unsafe-swiftshader`. Eksi: harness proje-içine yazılmalı (scratchpad `playwright`'i çözemez), selector kaynaktan teyit edilmeli.
- **D. Canlı duman (curl).** Artı: test-what's-live (v0.4 canlı `f173234`), gerçek production. Eksi: yalnız HTTP kodu + ham HTML string (runtime davranış değil).
- **Seçilen — katmanlı öncelik:** **A birincil** (senaryoların çoğu build-ground-truth'ta deterministik çözülür); **runtime davranış statik okunamıyorsa C** (`page.route` **ilk tercih**, `next start`/B **denenmez** — memory kuralı); **a11y mührü otoritatif olarak CI'ın `a11y` job'u** (GitHub runner'da `test:e2e`, sandbox'tan bağımsız) — yerelde gerekirse `page.route`+axe ek nokta-kontrolü; **D hafif canlı duman** (anahtar sayfalar 200 + Alpfit marker + chat 503). Gerekçe: ILKELER kalıcılık/thoroughness + sandbox flaklığını tümüyle atlar (memory).

---

## Senaryo → Araç Eşlemesi (S1–S9)

| Senaryo | Birincil araç | Nasıl |
|---------|---------------|-------|
| **S1** giriş/route/redirect | A: `routes-manifest.json` + `seo-redirects.test.ts` (Vitest) + curl | Redirect 3 ailesi (`/bunker-os`→`/crew-os`, `/forum`→`/`, `/forum/:slug*`→`/bulten/:slug*`) çıplak+locale-twin 308 — tohum mühürlü; 6 sayfa × 5 dil prerender varlığı grep |
| **S2** tam TR yolculuğu | A: prerender grep + C: `page.route` (nav/CTA tık) | TR (`NEXT_LOCALE=tr` cookie) ana→alt çıkış/dönüş; `/tr/` sızıntı yok, kopuk link yok, boş bölüm yok; `<Logo>` tutarlı |
| **S3** Living Flow degradasyon | C: `page.route`+system Chrome (WebGL) | Ana sayfa nabız (light/dark/reduced/no-WebGL/mobil-low/AR-RTL×dark×reduced) + Alpfit before/after; 320/768/1440 taşma + CLS |
| **S4** kontroller & kalıcılık | C: `page.route`+Chrome | Tema toggle (localStorage+reload), dil-switcher path-koru (**Alpfit dahil**), klavye-only + focus-visible (`reducedMotion:'reduce'` şart) |
| **S5** taksonomi & dürüstlük | A: prerender grep | "Crew OS" var / görünür "Bunker" + URL'de yok (kod-adı kalıntısı hariç); Alpfit dürüstlük 4/4; uydurma sonuç/yasak metafor yok |
| **S6** 5-dil bütünlük | A: `i18n-parity.test.ts` (Vitest) + prerender `MISSING_MESSAGE` grep | `alpfit` **133 leaf × 5 dil = tam parite** (teyitli); 6×5 render'da `MISSING_MESSAGE` yok; AR-RTL `dir`/logical |
| **S7** chatbot 0-token | A: kod-inceleme (`route.ts`) + C: offline UI render | 503 kapısı + sanitizasyon `new Anthropic()` **öncesi** (teyitli: role-whitelist + `trim().length>0` + `slice(-12)` + malformed kısa-devre); **0 API çağrısı** |
| **S8** guardrail suite | B→CI: `test:e2e` (a11y job) + A: Vitest + prerender grep | a11y=100 çift-tema (home + 5 alt sayfa, subpages-a11y 50 test mühürlü) + axe yeşil; Alpfit 9-bölüm/PhoneMockups render; parite; CI (`fast`+`a11y`) yeşil |
| **S9** adversarial + canlı duman | A: `next build` temiz + C: JS-off/scroll-race + D: curl canlı | JS-kapalı SSG okunabilirlik (Alpfit saf CSS/SVG); hızlı toggle/scroll race; canlı kiwiailab.com 200 + Alpfit marker |

---

## Kullanılacak Araçlar/Kütüphaneler

- **Vitest 4.1.9** (`npm run test`) — deterministik tohumlar: `i18n-parity` (S6 parite, `alpfit` dahil), `seo-redirects` (S1), `seo-metadata`, `smoke`, `umami-script`. Yerelde koşuyor (39 test yeşil).
- **Playwright 1.61.1 + @axe-core/playwright 4.12.1** — a11y/E2E. Otoritatif mühür **CI `a11y` job** (`test:e2e`, `home-a11y` + `subpages-a11y` = 50+ test); yerel runtime davranışı için `page.route` harness'i.
- **system Chrome 149** — WebGL runtime (`channel:'chrome'` + `--enable-unsafe-swiftshader` + `--disable-dev-shm-usage`); Playwright-bundled chromium WebGL vermez.
- **`next build`** (CI-proven; verify-phase **taze** koşar) — prerender ground-truth üretimi.
- **curl** — canlı duman (kiwiailab.com 200 + marker), redirect HTTP kodu, chat 503.

---

## Dikkat Edilecekler

- **Prerender marker'ı = CSS-modül sınıf adı + render edilen metin, React bileşen adı DEĞİL.** `AlpfitHero`/`AlpfitShowcase` gibi bileşen adları HTML'e yazılmaz → S8/S5 render bütünlüğü grep'i `PhoneMockup` (CSS-modül sınıfı, `PhoneMockups.module.css`) + içerik string'leri (`roadmap`/before-after) üzerinden yapılır. (Research oturumunda kanıtlandı: bileşen adı grep'i 0, CSS sınıfı 150×.)
- **`.next` tazeliği:** mevcut `.next` önceki koşudan olabilir → **verify-phase taze `next build` koşar** (HEAD hizası garanti); araştırmadaki `.next` yalnız fizibilite teyidi.
- **`next start` denenmez (memory kuralı):** sandbox `exit 144` → runtime tarayıcı doğrudan `page.route` interception ile başlar; a11y mührü CI'da.
- **Ölçüm disiplini tuzakları (a11y/runtime — `a11y-helpers.ts` + memory):** locale tuzağı (TR alt sayfa prefixsiz → `NEXT_LOCALE=tr` cookie; EN/AR/DE/ES açık-prefix) · tema tuzağı (`html.dark` + light+dark iki koşu, `emulateMedia`) · reveal tuzağı (`reducedMotion:'reduce'` + uçtan-uca scroll) · stray/stale `next-server` (listening-PID teyit) · host yükü (`/proc/loadavg` perf-bitişik ölçüm öncesi) · runtime harness selector-teyidi (LanguageSwitcher `router.replace` **butonu** / Chatbot inline `#chat` / tema `html.dark`+localStorage).
- **Canlı ≠ branch delta:** canlı `main`=`f173234` Alpfit Plus'ı **içerir** ama gym-PNG-silme (TASK-16.01) + phase-16/17 docs branch'te **unmerged** (8 commit ileride). Alpfit sayfası raster kullanmaz → gym PNG orphan (0 tüketici), Alpfit render'ını etkilemez → canlı ile branch build birebir. Canlı duman `f173234` Alpfit'ini doğrular; merge kapsam-dışı (finalizasyon).

**Tanımlayıcı kaynakları** (research kaydeder, verify-plan doğrular):
- `alpfit` namespace (133 leaf × 5) → **repo:** `messages/{tr,en,ar,de,es}.json` (site-tanımlı, teyitli).
- `PhoneMockup` CSS sınıfı → **repo:** `src/components/alpfit/PhoneMockups.module.css`.
- Redirect 3 ailesi → **repo:** `next.config.ts`; runtime regex → build artefaktı `.next/routes-manifest.json`.
- Prerender HTML → build artefaktı `.next/server/app/**/*.html` (taze build ile yenilenir).
- Test tohumları → **repo:** `tests/` (`i18n-parity`, `seo-redirects`, `seo-metadata`, `smoke`, `umami-script`, `e2e/{home,subpages}-a11y`).
- `ANTHROPIC_API_KEY` → **dış:** Vercel env (canlıda YOK → `/api/chat` 503); yalnız slot adı, değer asla.
- `CHAT_MODEL` → **dış:** Vercel env (opsiyonel, varsayılan `claude-opus-4-8`).
- Canlı sürüm `f173234` → **dış:** `main`/Vercel.
- gym PNG `public/gym/{calendar,dashboard,member,messaging}.png` → **repo:** `main`'de var, branch'te silinmiş (unmerged).

---

## Teknik Kararlar

- **Deterministik build-ground-truth birincil substrat.** Senaryoların çoğu (S1/S5/S6/S8-parite/S9-build) SSG prerender + Vitest + routes-manifest ile server'sız/deterministik çözülür → sandbox flaklığı atlanır, tekrarlanabilir. Runtime tarayıcı yalnız statik okunamayan davranışa (S3 WebGL, S4 toggle/klavye, S7 offline UI, S9 JS-off/race) saklanır. (ILKELER kalıcılık + memory `page.route` ilk tercih.)
- **a11y mührü otoritatif olarak CI.** S8 a11y=100 çift-tema re-teyidi mühürlü `subpages-a11y.spec.ts` (5 sayfa × 5 dil × 2 tema = 50 test) + `home-a11y` → GitHub `a11y` job'unda koşar (sandbox'tan bağımsız, otoritatif). Yerel `page.route`+axe yalnız ek nokta-kontrolü; a11y-DERİNLİK Faz 8/15'te yapıldı, tekrar edilmez (yalnız regresyon re-teyit). *(Bu karar review-phase 17'de `docs/DECISIONS.md` 2026-07-18'e yükseltildi — sonraki senaryo testi fazları için kalıcı emsal.)*
- **Runtime tarayıcı = `page.route` interception, `next start` denenmez.** Memory kuralı gereği doğrudan `page.route`; WebGL için system Chrome. Harness proje-içine yazılır, koşulur, silinir; selector kaynaktan teyit edilir.
- **Canlı duman hafif tutulur.** kiwiailab.com anahtar sayfalar 200 + Alpfit marker + chat 503 (test-what's-live, tam yeniden ölçüm değil); tam doğrulama branch/build'de.
- **Chatbot 0-token, kod-inceleme yolu.** `route.ts` 503-kapısı + sanitizasyon `new Anthropic()` öncesinde (teyitli); env yok → zaten offline; hiçbir senaryo API çağrısı üretmez. (Per-mesaj max-byte cap yok = kayıtlı sahipli açık, prd-review — bu fazda litige edilmez.)

---

**Oluşturulma:** 2026-07-18 (review-phase 17 — PHASE-17.md'den bölündü; içerik research-phase 17 / 2026-07-17 oturumuna aittir)
