# TASK-17.08: S9 — Adversarial/Holistik + Canlı Duman (test-what's-live)

**Durum:** ✅ Tamamlandı
**Modül:** Tümü (M1–M6; holistik) — canlı duman M6
**Feature:** S9 senaryo grubu — adversarial/holistik + canlı duman (doğrulama; faz kapanış task'ı)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.07 ✅ (lineer sıra; faz son doğrulama task'ı)

---

## Hedef

v0.4'ü adversarial/holistik olarak kır ve canlıda dumanla: (1) **`next build` temiz + 0 `MISSING_MESSAGE`** (regresyon tabanı); (2) **JS-kapalı SSG okunabilirlik** (`page.route`, JS-off) — 6 sayfa okunur, **özellikle Alpfit saf CSS/SVG bölümler no-JS okunur** (raster yok); (3) **hızlı dil/tema toggle race** + **hızlı scroll/anchor zıplama** (nabız + ScrollTrigger/GSAP/Lenis kararlılığı, 0 hata); (4) **canlı duman (curl kiwiailab.com — test-what's-live, v0.4 canlı `f173234`)** — anahtar sayfalar 200 (`/` + `/spor-salonu-yazilimi` + `/crew-os`) + **Alpfit Plus v0.4 marker** (`PhoneMockup` canlı prerender'da) + `/api/chat` **503** (env yok, beklenen offline). Tamamlanma = adversarial + canlı duman koşuldu, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S9 araç satırı (A: `next build` temiz + C: JS-off/scroll-race + D: curl canlı) + Dikkat Edilecekler (**canlı ≠ branch delta:** `main`=`f173234` Alpfit içerir, gym-PNG-silme unmerged ama Alpfit'i etkilemez → canlı-branch birebir; Alpfit raster kullanmaz)
- `_dev/memory/sandbox-runtime-browser-page-route.md` — `page.route` interception (JS-off/race); harness artefaktı (`/script.js` Umami dış / `/icon.svg` route) 404 ≠ bug
- `_dev/memory/vercel-git-disconnect-deploy-tetiklenmez.md` — canlı-kod teyidi shell tuzağı (`grep -c`/`grep -q`, `grep|head` her zaman "VAR" basar)
- `_dev/MEMORY.md` → CI'yı REST ile okuma (public repo)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.08 durumu + S9 bulgu notu

---

## Alt Görevler

- [x] **1. `next build` temiz + 0 `MISSING_MESSAGE` (regresyon tabanı)** — ✅ taze build (HEAD `a103998`) 0 warn/error, "Compiled successfully", 37/37 SSG; 30 sayfa-locale prerender **0 `MISSING_MESSAGE`** (+ 0 IntlError/INSUFFICIENT_PATH); Alpfit 5-locale birebir (PhoneMockup=150, 8 section+roadmap=9 bölüm, 0 img/49 svg, tek `<main>`)

- [x] **2. JS-kapalı SSG okunabilirlik (`page.route`, JS-off)** — ✅ **40/40 PASS**; 6 TR sayfa JS-off okunur (h1 görünür+metinli, nav/header, `<main>`, metin 1252-5068 char, canvas=0, **0 gizli-opacity0 içerik**); Alpfit saf CSS/SVG: PhoneMockup 138 görünür render + 0 `<img>` + 49 `<svg>` + 8 `<section>` (raster yok → JS-off tam). Statik kanıt: `.reveal` class/`is-in` hiç kullanılmıyor (globals.css ölü baseline), 17 bileşen JS-off-güvenli `data-reveal` (CSS default opacity:1, GSAP JS-off'ta dokunmaz); prerender'da 0 inline opacity:0

- [x] **3. Adversarial race (`page.route` + system Chrome)** — ✅ **13/14 gerçek assertion PASS + 1 harness artefaktı (BULGU-S9, ürün bug'ı değil)**
  - Tema **9 tek-tık race** → final-tutarlı (`html.dark`=true==localStorage=dark==`aria-pressed`=true, bg `rgb(19,21,16)`), start→flip doğru, **reload-kalıcı** ✓
  - Dil zinciri en→de→ar→es→tr → **lang==target tutarlı** (5/5), AR **rtl** ✓; url==locale: en/de/ar/es doğru prefixli, **TR harness'ta `/tr`** (BULGU-S9 = harness middleware-siz artefaktı, aşağıda)
  - Scroll/anchor storm (3 tur, 8 anchor) → bölümler 7→7 sağlam + **nabız tek WebGL context 1→1** (remount/leak yok) + overflowX=0 + scroll-lock yok + anchor settle (#sectors top=1px) + **0 ScrollTrigger/GSAP/Lenis/WebGL hatası** ✓

- [x] **4. Canlı duman (curl kiwiailab.com — test-what's-live)** — ✅ `/`+`/spor-salonu-yazilimi`+`/crew-os` **200** (canlı `f173234`); Alpfit **PhoneMockup 150×** canlı (branch build birebir) + 0 `<img>`/49 `<svg>`/0 MISSING_MESSAGE; `/crew-os` "Crew OS" 14× / görünür "Bunker OS" 0; `/bunker-os`→308→`/crew-os`; **`/api/chat` → 503** (env yok, beklenen offline). `grep -c` kullanıldı (shell tuzağı önlendi)

- [x] **5. Triyaj & kayıt (faz kapanışı)** — ✅ 0 kapsam-içi bug; **BULGU-S9** (dil zinciri TR `/tr`) harness artefaktı olarak teyit + memory'ye eklendi (`sandbox-runtime-browser-page-route.md`); JS-off console 4×404 (`/script.js` umami + `/icon.svg`) benign harness artefaktı (motion-hata=0); canlı≠branch-delta (gym PNG unmerged, Alpfit raster kullanmaz → etkisiz); PHASE-17/DURUM kaydı; kaynak kod değişmedi; 3 geçici harness silindi

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Runtime harness geçici (koşulur, silinir). Referans tanımlayıcılar ZATEN-VAR (6 sayfa repoda; canlı f173234 dış/Vercel; PhoneMockup CSS-modül sınıfı). YENİ kalıcı dosya yok. -->

```
_dev/
├── tasks/TASK-17.08.md          # Oturum kaydı + adversarial + canlı duman sonuçları
├── phases/PHASE-17.md           # Task Listesi 17.08 + notu
└── DURUM.md                     # Aktif task + özet
(geçici runtime harness proje-içine yazılıp koşulduktan sonra silinir — commit'lenmez)
```

---

## Dikkat Noktaları

- **Canlı ≠ branch delta (araştırma):** canlı `main`=`f173234` Alpfit Plus'ı **içerir**; gym-PNG-silme (TASK-16.01) + phase-16/17 docs branch'te **unmerged** (8 commit ileri). Alpfit **raster kullanmaz** → gym PNG orphan (0 tüketici), Alpfit render'ını etkilemez → canlı ile branch build birebir. Canlı duman `f173234` Alpfit'ini doğrular; merge kapsam-dışı (finalizasyon).
- **`next start` DENENMEZ (memory):** JS-off/race `page.route` interception; WebGL için system Chrome.
- **Harness artefaktı ≠ bug (memory):** `/script.js` (Umami dış) + `/icon.svg` (app-router route) 404 harness kaynaklı; gerçek regresyon değil. Önce "artefakt mı" diye sor.
- **Shell tuzağı (memory):** canlı marker sayımında `grep -c`/`grep -q` — `grep|head -1 &&` boş girdide de "VAR" basar.

---

## Test Kriterleri

- [x] `next build` temiz (0 warn) + tüm prerender **0 `MISSING_MESSAGE`** — ✅ 37/37 SSG, 30 HTML 0 MISSING_MESSAGE
- [x] JS-off: 6 TR sayfa okunur (h1+nav+`<main>`+metin, canvas=0); **Alpfit CSS/SVG bölümler no-JS render + okunur** — ✅ 40/40 PASS (Alpfit PhoneMockup 138 görünür, 0 img/49 svg/8 bölüm)
- [x] Adversarial: tema çok-tık race final-tutarlı + reload kalıcı; dil zinciri tutarlı (AR rtl); scroll storm → bölümler sağlam + nabız 1→1 tek WebGL context + **0 ScrollTrigger/GSAP/Lenis hatası** — ✅ 13/14 (1 = BULGU-S9 harness artefaktı)
- [x] Canlı duman: `/`+`/spor-salonu-yazilimi`+`/crew-os` **200** + **Alpfit `PhoneMockup` marker canlı** + `/api/chat` **503** — ✅ 200/200/200 + PhoneMockup 150× + 503
- [x] Harness artefaktı ≠ gerçek bug ayrımı; canlı≠branch-delta notu; bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi; geçici harness silindi — ✅ tümü

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-18 (run-task TASK-17.08)

**Durum:** ✅ Tamamlandı — S9 adversarial/holistik + canlı duman GEÇTİ, 0 kapsam-içi bug (1 harness artefaktı triyajlandı). Faz 17'nin son task'ı.

**Yapılanlar:**
- **Katman A/C/D koşuldu** (araştırma araç-eşlemesi): A `next build` ground-truth + prerender grep; C `page.route`+system Chrome (JS-off + adversarial race); D curl canlı duman. 3 geçici harness proje-içine yazıldı (`tests/_verify-s9-{jsoff,race,livelang}.mjs`), koşuldu, **silindi** (git temiz, kaynak kod değişmedi).
- **1) Regresyon tabanı (A):** taze `next build` HEAD `a103998` → 0 warn/error, "Compiled successfully in 4.6s", **37/37 SSG**; 30 sayfa-locale prerender **0 `MISSING_MESSAGE`** + 0 IntlError/INSUFFICIENT_PATH. Alpfit 5-locale birebir: PhoneMockup=150, 8 `<section>`+roadmap=9 bölüm, 0 `<img>`/49 `<svg>`, tek `<main>`.
- **2) JS-off SSG okunabilirlik (C, `javaScriptEnabled:false`):** **40/40 PASS**. 6 TR sayfa: h1 görünür+metinli, nav/header, `<main>`, okunur metin (1252-5068 char), canvas=0 (JS-off beklenen), **0 gizli-opacity0 içerik**. Alpfit saf CSS/SVG: **PhoneMockup 138 görünür render** + 0 `<img>` + 49 `<svg>` + 8 `<section>` → raster yok, no-JS tam okunur. Statik kök-neden teyidi: `.reveal` CSS class'ı + `is-in` **hiç kullanılmıyor** (globals.css ölü baseline — JS-off gizleme riski yok); 17 bileşen JS-off-güvenli `data-reveal` (CSS default `opacity:1`, GSAP inline `opacity:0`'ı yalnız JS uygular); prerender'da 0 inline `opacity:0`.
- **3) Adversarial race (C, system Chrome swiftshader):** **13/14 gerçek assertion PASS + 1 harness artefaktı**. WebGL2 sanity has=true, home high FlowBackdrop canvas=1 (ayırt-edicilik). **Tema:** 9 tek-tık race → final-tutarlı (`html.dark`=true == `localStorage.theme`=dark == `aria-pressed`=true, bg `rgb(19,21,16)`), start=false→final=true flip doğru, **reload-kalıcı**. **Dil zinciri** en→de→ar→es→tr → **lang==target 5/5**, AR `dir=rtl`; url en/de/ar/es doğru prefixli. **Scroll/anchor storm** (3 tur × [scrollTo + 8 anchor scrollIntoView]) → bölümler 7→7 sağlam + **nabız tek WebGL context 1→1** (remount/leak yok) + overflowX=0 + scroll-lock yok + anchor settle (#sectors top=1px) + **0 ScrollTrigger/GSAP/Lenis/WebGL hatası** (toplam 4 console.error hepsi benign 404: `/script.js` umami + `/icon.svg`; motion-hata=0).
- **4) Canlı duman (D, curl kiwiailab.com — test-what's-live `f173234`):** `/`+`/spor-salonu-yazilimi`+`/crew-os` → **200/200/200**; Alpfit **PhoneMockup 150×** canlı (araştırma "150× = branch build birebir" teyitli) + 0 `<img>`/49 `<svg>`/0 MISSING_MESSAGE; `/crew-os` "Crew OS" 14× / görünür "Bunker OS" **0**; `/bunker-os`→**308**→`/crew-os`; **`/api/chat` → 503** (env yok, beklenen offline). `grep -c` kullanıldı (memory shell tuzağı önlendi).
- **BULGU-S9 (harness artefaktı, ÜRÜN BUG'I DEĞİL):** dil zincirinde default-locale TR seçimi harness'ta URL'i `/tr`'de bıraktı (harness `/` bekliyordu). Kök neden: next-intl `as-needed`'de TR kanonik `/`; prod'da `/tr`→**307**→`/` normalizasyonunu **middleware** yapar, `page.route` interception'da middleware yok → client `router.replace` URL'i `/tr`'de kalır (`html lang=tr` doğru set edilir; non-default en/de/ar/es doğru prefixli — yalnız default-locale strip ıraksadı). **Kör-red yok, 3 kanıtla teyit:** (1) `routing.ts` `localePrefix:'as-needed'`+`defaultLocale:'tr'`; (2) canlı `/tr`→307→`/`; (3) **belirleyici canlı probe:** gerçek middleware'li kiwiailab.com'da `/en`'den dil-switch TR → URL `/` (prefixsiz), lang=tr. BULGU-S2 (`history.back()`-after-SPA) ile aynı aile (page.route ↔ prod middleware ıraksaması). Memory'ye eklendi (`sandbox-runtime-browser-page-route.md`), takip gerektirmez.
- **Triyaj:** 0 kapsam-içi gerçek bug → düzeltme task'ı açılmadı. Canlı ≠ branch delta: gym-PNG-silme (TASK-16.01) main'e unmerged ama Alpfit raster kullanmaz → orphan PNG 0 tüketici, Alpfit render'ını etkilemez → canlı `f173234` = branch build birebir (PhoneMockup 150× iki tarafta). Merge kapsam dışı (versiyon-sonu finalizasyon). Kaynak kod değişmedi (doğrulama fazı).

**Sonuç:** S9 GEÇTİ. **Faz 17'nin 8/8 task'ı tamamlandı** → sıradaki adım `/devflow:verify-phase 17`.

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
