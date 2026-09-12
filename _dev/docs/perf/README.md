# Perf Taban Kayıtları — Ana Sayfa Lighthouse

Ana sayfa Lighthouse perf/a11y tabanları. Ölçüm **yerel production build** üzerinde (`next build && next start`); revize branch canlıya deploy olmuyor (kiwiailab.com eski kodu yansıtır) → bu "yerel taban". İlk taban: **v0.1, 2026-06-28** (TASK-2.03 / Phase 2). En güncel ölçüm: **v0.3 / Faz 14, 2026-07-05** (TASK-14.04; versiyon-sonu senaryo testi S8-Lighthouse re-teyit — 6/6 dark kanonik a11y=100 + 12/12 light/dark axe 0 LH-ilgili ihlal + desktop perf 100/CLS 0 Faz-12 birebir + mobil LCP korunan taban regresyonsuz; aşağıda **Faz 14 / TASK-14.04** bölümü).

> ⚠️ **İki kanonik-koşu tuzağı (Faz 4 TASK-4.01/4.08 düzeltmeleri — okumadan ölçme):**
> 1. **Ölçülen-locale:** Cookie'siz kanonik koşu Chrome `Accept-Language` ile `/` → **`/en`**'e redirect olur (next-intl `localeDetection`). v0.1 tabanı bu yüzden "TR `/`" değil, aslında **`/en`**'i ölçtü (artifact `finalUrl=/en` ile kanıtlı). **TR varsayılan** sayfasını ölçmek için `NEXT_LOCALE=tr` cookie şart (Lighthouse `--extra-headers='{"Cookie":"NEXT_LOCALE=tr"}'`). TR `/` sayfası `/en`'den **ağırdır** (hero metni daha uzun) — perf/LCP/FCP farkı buradan gelir, regresyon değil.
> 2. **Render-teması:** Kanonik `--headless=new` koşusu **DARK** render eder (tema init `prefers-color-scheme: dark`'a düşer) → Lighthouse a11y skoru **dark** temayı ölçer. Belirli temayı zorlamak için Playwright `emulateMedia({colorScheme})`. Detay → `_dev/memory/a11y-olcum-tema-tuzagi.md`.

Kanonik artefaktlar:
- **v0.1 (2026-06-28)** — `home-{mobile,desktop}-20260628.{html,json}` · *ölçülen sayfa: `/en`* (yukarıdaki #1)
- **v0.2/Faz 4 (2026-06-30)** — `home-{mobile,desktop}-20260630.{html,json}` (TR `/`, a11y=100); regresyon-repro `home-{mobile,desktop}-en-baseline-repro-20260630.json` (`/en`, baseline ile aynı sayfa)
- **v0.2/Faz 6 TASK-6.01 (2026-06-30)** — `home-mobile-20260630-lcp.json` (TR `/`, **element-denetimli**: LCP elementi `lcp-breakdown-insight`'tan okunabilir). Ölçüm ortamı Chrome 150 + **ağır** SwiftShader → perf/TBT şişkin (perf 62 / TBT 1842ms), LCP/FCP/CLS yine deterministik. **Bu ortam anomaliydi** (TASK-6.07 temsilî ortamı baseline'ı perf 84 / TBT 261ms ile ölçtü, Faz-4 ile birebir — 6.01/6.04 SwiftShader yükü 6.07'de tekrarlanmadı).
- **v0.2/Faz 6 final TASK-6.07 (2026-06-30)** — **kanonik:** `home-{mobile,desktop}-20260630-faz6.{html,json}` (TR `/`, L1+L2+L3, element-denetimli, median-LCP koşu). Attribution kanıtı (json): `home-mobile-20260630-faz6-baseline.json` (aynı-ortam lever-öncesi baseline = Faz-4 birebir) + `home-mobile-20260630-faz6-l1l2only.json` (L1+L2 tek başına = delta yok). Bu artefaktlar Faz-4 kanonik `home-*-20260630.{html,json}` dosyalarını **korur** (üzerine yazmaz).
- **v0.2/Faz 7 TASK-7.02 (2026-07-01)** — **kanonik (after=Umami'li):** `home-{mobile,desktop}-20260701-faz7.{html,json}` (TR `/`, Umami entegrasyonu HEAD, temsilî-median koşu; network-requests audit'inde `umami.kiwiailab.com` isteği **var** = script fiilen yüklendi). Attribution kanıtı (json, aynı-ortam before=Umami'siz): `home-{mobile,desktop}-20260701-faz7-before.json` (`layout.tsx` f065700'e döndürülüp yeniden build; umami isteği **yok**). Faz-6 kanonik dosyalarını korur.
- **v0.3/Faz 12 TASK-12.03 (2026-07-03)** — **kanonik:** `home-desktop-20260703-faz12.{html,json}` (TR `/`, B1 aşağı-taşıma shipped kod = fixed viewport canvas + adaptif veil + light-veil ince-ayarı, full-motion, çok-koşu). Karar-gate: desktop perf 100 / CLS ≈0 / LCP ~625ms — v0.1 desktop tabanı (`home-desktop-20260628`) ile regresyonsuz. Faz-7 kanonik dosyalarını korur.

---

## Arşiv — kapanmış versiyon ölçümleri

Kapanmış versiyonların koşu kayıtları alt-dokümanlara taşındı; bu dosya kanonik artefakt index'ini, aktif v0.3 ölçümlerini ve metodolojiyi tutar. Yeni ölçüm bölümleri buraya eklenir.

- **v0.1 Tabanı (2026-06-28)** → [`README-v0.1.md`](README-v0.1.md) — ölçülen sayfa aslında `/en`; masaüstü perf 100 / LCP 0.69 s, mobil perf 87 / LCP 3.1 s, a11y 89 (4 başarısız denetim: color-contrast, definition-list, dlitem, label-content-name-mismatch); brief bütçesi karşılanmadı.
- **v0.2** → [`README-v0.2.md`](README-v0.2.md) — beş ölçüm bölümü:
  - **Faz 4 — TASK-4.08:** a11y 89 → 100 (TR `/`, çift-tema axe 0 ihlal); `/en` apples-to-apples perf/LCP birebir (sıfır perf maliyeti); ilk TR `/` profili (mobil perf 84 / LCP ~3.6 s).
  - **Faz 6 — TASK-6.01 / TASK-6.04 / TASK-6.07 (final):** LCP elementi hero metni; L1+L2 Lantern'de delta üretmedi; final mobil perf 84→90 / LCP 3604→3164 ms (sürücü L3 font budama); ağır-SwiftShader ortamında perf/TBT ortamlar arası kıyaslanamaz.
  - **Faz 7 — TASK-7.02:** Umami sonrası aynı-ortam before/after — regresyon yok, preconnect eklenmedi.
  - **Faz 9 — TASK-9.04:** S8-Lighthouse re-teyit — 6/6 sayfa a11y=100 çift-tema; mobil LCP 3171 ms ≈ korunan taban.

---

## v0.3 / Faz 12 — TASK-12.03: B1 Living Flow aşağı-taşıma karar-gate (2026-07-03)

Living Flow'un fixed viewport canvas'a taşınması (12.01) + adaptif veil (12.02) + light-veil craft ince-ayarı (12.03) **shipped kod** üzerinde karar-gate ölçümü. Ortam: node 20.20.2 + Chrome 150 + LH 13.3.0 + axe-core 4.12.1, flags `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`. Taze prod build (`rm -rf .next && next build` → `next start -p 4173`, listening-PID teyit), düşük yük (load 1.3–2.5), TR `/` (`NEXT_LOCALE=tr`, finalUrl `/` teyit), **full-motion** (alan gerçekten render ederken — reduced-motion tohumu alanı gizler → onun kontrast etkisini ölçmez, karar-gate full-motion şart).

### Gate-2 — desktop perf 100 / CLS 0 (tuned build, çok-koşu)

| Preset (TR `/`) | perf (koşular → temsilî) | a11y | LCP | FCP | CLS | TBT | Verdi |
|---|---|---|---|---|---|---|---|
| Masaüstü | 100/100/100/100 → **100** | 100 (dark) | ~625 ms (620–631) | ~334 ms | **≈3.75e-6 (≈0)** | ~0–12 ms | taban ✓ regresyonsuz |

- **Baseline kıyası:** `home-desktop-20260628` (v0.1) = perf 100 / LCP 689ms / CLS 0. Tuned build = perf 100 / LCP ~625ms / CLS ≈0 → **regresyon yok** (LCP hafif daha iyi, gürültü bandında). LCP/CLS Lantern-deterministik → ortamlar arası kıyaslanabilir; desktop perf tarihsel olarak her ortamda stabil 100.
- **Perf hipotezi doğrulandı:** araştırma "canvas zaten `frameloop=always` render ettiğinden fixed'e almak artımlı GPU maliyetini ~sıfıra yaklaştırır" dedi → tek WebGL context korundu (Hero `high`'da canvas suppress, FlowBackdrop tek fixed canvas), deterministik metrikler baseline'a eşit → **aynı-ortam before/after gerekmedi**. Light-veil ince-ayarı CSS-only (`--flow-veil` token) → ince-ayar öncesi/sonrası desktop perf 100 birebir (sıfır perf maliyeti).
- **Mobil kapsam-dışı (tasarım gereği):** aşağı-taşınan alan yalnız `high` modda mount eder; mobil/low-power (`low`) Hero-contained kalır → fixed alan mobilde hiç render etmez, mobil taban değişmez (discuss: perf tabanına sıfır risk). Ölçülmedi (alan yok + SwiftShader mobil env-anomali).

### Gate-1 — a11y kontrast çift-tema (full-motion, alan render ederken)

`channel:'chrome'`+swiftshader Playwright/axe (bundled chromium WebGL vermez → memory `playwright-bundled-chromium-webgl-yok`); desktop viewport (1350px → `high` mod), `localStorage.theme` seed (FOUC), full-motion.

| Koşu | Alan live | WCAG-AA ihlal | color-contrast ihlal | Not |
|---|---|---|---|---|
| Light full-motion | ✓ (fixed z-0 canvas) | **0** | 0 | ~82 öğe `color-contrast` *incomplete* |
| Dark full-motion | ✓ | **0** | 0 | ~81 öğe *incomplete* |
| Light reduced (fallback) | — (static) | **0** | 0 | 67 *incomplete* (alan yok) |
| Dark reduced (fallback) | — (static) | **0** | 0 | 67 *incomplete* |

- **Lighthouse a11y 100** (dark kanonik, full-motion) — alan mount ederken bile.
- **`incomplete` nüansı (dürüst kayıt):** full-motion'da alan-üstü ~15 fazla öğe axe `color-contrast` *incomplete* verir (WebGL piksellerini axe algoritması **okuyamaz** → ne pass ne violation, "manuel incele"). Bu, otomatik aracın WebGL-arkası-metin için **yapısal sınırı**; ihlal değil (Lighthouse `incomplete`'i skora saymaz → a11y=100). Gerçek okunabilirlik teyidi bu yüzden **craft görsel** (Gate-3) işidir; FlowVeil washi tam bunu güvenceye alır. reduced-motion tabanında (67) da mevcut → gradient/translucent tasarımın önceki sınırı, Faz 12'ye özgü değil.

### Gate-3 — craft (karar: uygula + light-veil ince-ayarı)

Full-motion kareler (light/dark × 5 bölüm, SwiftShader) incelendi. Dark: parlayan yeşil = koyu zeminde ambient derinlik, premium (bleed yok). Light: Hero-altı başlık bantlarında en parlak nabız karelerinde metinle yarışma (restraint sınırı). **Craft ince-ayar:** `FlowVeil` tema-flip `--flow-veil` token'ı — light %70 (başlık okunabilirliği netleşir), dark %56 korunur. İnce-ayar sonrası görsel doğrulandı: light bleed azaldı (nabızlar soluklaştı, süreklilik korundu), dark birebir aynı. **Karar: uygula-onayla** (DECISIONS 2026-07-03).

---

## v0.3 / Faz 14 — TASK-14.04: S8-Lighthouse versiyon-sonu re-teyit (a11y=100 çift-tema + Living Flow perf tabanı) (2026-07-05)

v0.3 versiyon-sonu **senaryo testi** guardrail'i (S8 Lighthouse skor gate tarafı): kaynak kod **değişmedi** (doğrulama fazı) → yeni artefakt kaydedilmedi; skorlar korunan tabanla kıyaslandı, kayıt buraya. Ortam: node 20.20.2 + Chrome 150 + **Lighthouse 13.3.0** (npx-cache; 12.8.2 de mevcuttu ama Faz 12 desktop tabanı 13.3.0 → apples-to-apples için 13.3.0), flags `--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader`. Fresh-prod-serve (`rm -rf .next && next build` temiz → `next start -p 4173`, listening-PID 8846 teyit), düşük yük (load ~1.0-3.0), TR `/` (`NEXT_LOCALE=tr`, finalUrl `/` teyit). İki-gate disiplini: TASK-14.03 axe WCAG-AA suite gate'ini kapattı; bu task LH **structural skor gate**'ini kapatır.

### a11y=100 çift-tema (iki-gate, S8 skor gate tarafı)

- **Lighthouse kanonik (dark), 6 sayfa:** `/`·`/crew-os`·`/spor-salonu-yazilimi`·`/vaka-calismalari`·`/bulten/ai-sdr-araclari`·`/bulten/claude-opus-4-8-fable-5` → **6/6 a11y=100**, 0 düşen audit, `runtimeError=none`. Structural audit'ler (`landmark-one-main`/`heading-order`/`color-contrast`/`list`/`document-title`/`html-has-lang`/`meta-viewport`) hepsi pass → tema-bağımsız, light'a da geçerli. Bülten sayfalarında `<main>` var (Faz 8 fix korunuyor).
- **Gerçek light+dark axe, 6 sayfa × 2 tema = 12 koşu:** standalone Playwright (`channel:'chrome'`+swiftshader; `localStorage.theme` seed FOUC öncesi + `html.dark` themeOk teyit + `reducedMotion:'reduce'`+uçtan-uca scroll) + axe-core **4.12.1** (LH bundle motoru), violation'lar LH a11y audit-id kümesine filtreli → **12/12 koşuda 0 LH-ilgili ihlal, 0 tema-uyumsuzluk**. color-contrast çift-temada (dark-panel inversiyonu dahil) temiz → a11y=100 çift-tema doğrulandı.

### Perf korunan taban (home, full-motion, çok-koşu median)

| Preset (TR `/`) | perf | LCP | FCP | CLS | TBT | LCP elementi | Verdi |
|---|---|---|---|---|---|---|---|
| Masaüstü | **100** (100/100/100) | 624 ms (624/624/699) | ~512 ms | **0.000** | ~30 ms | hero metni | taban ✓ (Faz 12 birebir) |
| Mobil | 66 (env) | **~3010 ms** (3010/3009/3173) | ~1514 ms | **0.000** | ~2000 ms (env) | `<p data-hero="sub">` | comparable metrikler ✓ |

- **Masaüstü perf 100 / CLS 0 / LCP 624ms** = Faz 12 kanonik (`home-desktop-20260703-faz12`: perf 100 / LCP ~625ms / CLS≈0) ile **birebir** → Living Flow sayfa-boyu nabız imzası regresyonsuz.
- **LCP/FCP/CLS (Lantern-deterministik) korunan tabanla eşit/altında:** mobil LCP ~3010ms ≤ Faz-6/7 taban 3164ms / Faz-9 3171ms; FCP ~1514 ≈ 1506-1516ms; masaüstü LCP 624 ≤ 0.69s; CLS=0 her yerde. LCP elementleri değişmedi (hero metni). **Regresyon yok.**
- **perf 66 / TBT ~2000ms = ağır-SwiftShader ortam anomalisi** (Faz 9 perf 65/TBT 2000 + TASK-6.01 perf 62/TBT 1842 ile birebir; software-GL main-thread şişkinliği) — memory gereği **ortamlar arası kıyaslanamaz, regresyon sinyali değil**. Bu devcontainer 6.01/9.04'ün ağır-SwiftShader varyantı.
- **Brief mobil perf açığı record-not-fix:** mobil LCP ~3010ms > brief <2.5s; rep-env perf ~90 < 95. Kök neden CPU-bound WebGL (gerçek-cihaz duvarı, DECISIONS 2026-06-30). Senaryo testte kaydedildi, düzeltilmedi → prd-review B grubu.

---

## Metodoloji (tekrar için)

```
rm -rf .next && npm run build && npm run start -- -p 4173   # fresh yerel production sunum (dev build ile ÖLÇÜLMEZ)
CHROME_PATH=/usr/bin/google-chrome
LH="node ~/.npm/_npx/<hash>/node_modules/lighthouse/cli/index.js"   # npx cache (13.3.0); package.json'a EKLENMEZ
# TR `/`  : $LH http://localhost:4173/ --output=json,html --extra-headers='{"Cookie":"NEXT_LOCALE=tr"}' --chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage --enable-unsafe-swiftshader" --quiet
# Masaüstü: aynı + --preset=desktop
# /en (baseline-birebir, regresyon repro): cookie'yi at — Accept-Language `/` → `/en` redirect'i tetiklenir
```

- **Locale şart (yukarıdaki tuzak #1):** TR `/` için `NEXT_LOCALE=tr` cookie; cookie'siz `/en` ölçülür. Karşılaştırmada **aynı sayfayı** kullan.
- **Render dark (tuzak #2):** kanonik koşu dark; light teyidi için Playwright `emulateMedia({colorScheme:'light'})`.
- **axe (tam a11y envanteri):** Playwright + `emulateMedia({colorScheme, reducedMotion:'reduce'})` + uçtan-uca scroll + offline axe enjeksiyonu (`page.addScriptTag({path: ~/.npm/_npx/<hash>/node_modules/axe-core/axe.min.js})`); Lighthouse full-motion alt-fold reveal'ları (`opacity:0`) kaçırır → axe reduced-motion tam envanteri verir.
- **Fresh-prod-serve disiplini:** `rm -rf .next` + net port + listening-PID = senin process'in teyidi (stray `next-server` yanlış-negatifi; MEMORY Süreç Disiplinleri).
- **Yük gözlemi zorunlu:** her koşuda `cat /proc/loadavg` — host çekişmesi (yüksek load) TBT/LCP/perf'i bozar (a11y/CLS'yi değil). Düşük yükte (≤ ~6) ölç.
- Her preset 3+ koşu → median; localhost ağ-iyimser → perf "yerel taban", a11y/CLS ortamdan bağımsız (en güvenilir).
- Lighthouse `prefers-reduced-motion` set etmez → Living Flow WebGL tam-yük (gerçekçi en-kötü) ölçülür.
