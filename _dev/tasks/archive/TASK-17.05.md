# TASK-17.05: S4 — Kontroller & Kalıcılık (tema/dil/klavye, Alpfit dahil)

**Durum:** ✅ Tamamlandı
**Modül:** M3 Etkileşim (+M1 Living Flow / M4 i18n) (modules/M3-Etkilesim-Primitives.md)
**Feature:** S4 senaryo grubu — kontroller & kalıcılık (doğrulama)
**Faz:** Phase 17 (phases/PHASE-17.md)
**Bağımlılıklar:** TASK-17.04 ✅ (lineer sıra; aynı runtime katmanı)

---

## Hedef

**Gerçek tarayıcı runtime** (`page.route` + system Chrome) ile kontrol katmanının doğru ve kalıcı çalıştığını doğrula: **tema toggle** (`html.dark` + `localStorage` + reload kalıcılık + FOUC yok + Living Flow uniform sayfa-boyu remount yok), **dil-switcher path korur** (home + **`/spor-salonu-yazilimi` (Alpfit) dahil**, klavye/Escape/dış-tık kapanış), **klavye-only yolculuk** + **focus-visible yeşil outline**. v0.4 bu katmana dokunmadı → re-teyit; yeni yüzey Alpfit dil-switcher path-koruması. Tamamlanma = kontrol matrisi runtime'da koşuldu, triyajlı PHASE-17'ye kaydedildi.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-17.md` — Araştırma → S4 araç satırı (C: `page.route`+Chrome) + Dikkat Edilecekler (tema `html.dark`+localStorage; dil-switcher `router.replace` **butonu**; focus-visible `reducedMotion:'reduce'` şart)
- `_dev/memory/runtime-harness-selector-teyidi.md` — LanguageSwitcher `<a href>` değil `router.replace` **butonu**; tema `html.dark`+localStorage (prefers-color-scheme değil)
- `_dev/memory/playwright-bundled-chromium-webgl-yok.md` — focus-visible outline ölçümü `reducedMotion:'reduce'` şart (`transition-colors` outline-color anime → yanlış-negatif); WebGL için `channel:'chrome'`
- `_dev/memory/tema-fix-html-dark-token-flip.md` — tema `html.dark` class + CSS değişken flip
- `src/components/` → tema toggle + LanguageSwitcher bileşenleri

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-17.md` — Task Listesi 17.05 durumu + S4 bulgu notu

---

## Alt Görevler

- [x] **1. Tema toggle & kalıcılık** — ✅ GEÇTİ
  - Toggle → `html.dark` class + `localStorage("theme","dark")` + `bg` flip (light `rgb(247,246,241)` ↔ dark `rgb(19,21,16)`) + `aria-pressed` false→true; reload sonrası **kalıcı** + **FOUC yok** (pre-paint blocking `<head>` script; `earlyDark===finalDark===dark`, `.dark` body DOM'a girmeden var)
  - **Living Flow uniform sayfa-boyu remount YOK** (canvas 1→1, `data-s4probe` işareti korundu = aynı element, remount değil; renk MutationObserver ile yerinde çevrilir)

- [x] **2. Dil-switcher path korur (Alpfit dahil)** — ✅ GEÇTİ
  - home → DE = `/de`; **`/spor-salonu-yazilimi` → EN = `/en/spor-salonu-yazilimi`** (path korunur); `/crew-os` → `/en/crew-os` — üçü de finalPath+lang doğru
  - Menü kapanış: Escape ✓ / dış-tık (mousedown) ✓ / klavye (Enter aç→Escape kapat) ✓; `router.replace` butonu (a href değil — selector kaynaktan teyit)

- [x] **3. Klavye-only yolculuk + focus-visible** — ✅ GEÇTİ
  - Tab ile nav/CTA/dil-switcher/tema erişilebilir; **focus-visible yeşil 2px solid outline** (light `#1f7a3d`=rgb(31,122,61) + dark `#4fb06a`=rgb(79,176,106)), odak kaybı yok (16/16 Tab öğesi, `<body>`'ye hiç düşmedi)
  - Ölçüm `reducedMotion:'reduce'` (transition-colors yanlış-negatif tuzağı atlandı)

- [x] **4. Triyaj & kayıt** — ✅ 0 kapsam-içi bug; 3 harness ölçüm artefaktı (chunk URL-encode / MutationObserver bağlama-timing / hex-parse) düzeltildi → gerçek bug değil; PHASE-17 kaydı yapıldı

---

## Etkilenen Dosyalar

<!-- Doğrulama fazı: kaynak kod DEĞİŞMEZ. Runtime harness geçici (koşulur, silinir). Referans tanımlayıcılar ZATEN-VAR (tema toggle + LanguageSwitcher repoda). YENİ kalıcı dosya yok. -->

```
_dev/
├── tasks/TASK-17.05.md          # Oturum kaydı + kontrol matrisi
├── phases/PHASE-17.md           # Task Listesi 17.05 + notu
└── DURUM.md                     # Aktif task + özet
(geçici runtime harness proje-içine yazılıp koşulduktan sonra silinir — commit'lenmez)
```

---

## Dikkat Noktaları

- **Selector teyidi (memory):** LanguageSwitcher `<a href>` değil `router.replace` **butonu** → href beklersen yanlış-FAIL. Kaynaktan teyit et. Harness "FAIL" → önce **artefakt mı** diye sor.
- **Tema tuzağı (memory):** `html.dark` + CSS değişken flip → `emulateMedia` çevirmez; toggle butonu/localStorage üzerinden çevir. Light+dark iki koşu.
- **Focus-visible tuzağı (memory):** `reducedMotion:'reduce'` şart — full-motion'da `transition-colors` outline-color'ı anime eder → Tab-sonrası okuma ara-değer (yanlış-negatif).
- **`next start` DENENMEZ (memory):** doğrudan `page.route` interception; WebGL gerekiyorsa system Chrome.
- **v0.4 kontrol katmanına dokunmadı:** S4 re-teyit; yeni yüzey Alpfit dil-switcher path-koruması (`/spor-salonu-yazilimi` dahil).

---

## Test Kriterleri

- [x] Tema toggle → `html.dark`+localStorage+bg flip+aria-pressed; reload kalıcı + FOUC yok (early===final) — ✅
- [x] Living Flow uniform sayfa-boyu remount YOK (1→1, aynı element) — ✅
- [x] Dil-switcher path korur: home→`/de`, **`/spor-salonu-yazilimi`→`/en/spor-salonu-yazilimi`**, `/crew-os`→`/en/crew-os`; menü Escape/dış-tık/klavye kapanış — ✅
- [x] Klavye-only nav/CTA/dil/tema erişilebilir; focus-visible **yeşil outline** light+dark 2px, odak kaybı yok — ✅
- [x] Harness artefaktı ≠ gerçek bug ayrımı; bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi; geçici harness silindi — ✅

---

## Tamamlanma Kriterleri

- [x] Tüm alt görevler tamamlandı
- [x] Tüm test kriterleri karşılandı
- [x] Git commit & push yapıldı (conventional commits formatı)
- [x] Bu doküman güncellendi (oturum kaydı)
- [x] DURUM.md güncellendi

---

## Oturum Kayıtları

### Oturum — 2026-07-18

**Durum:** ✅ Tamamlandı — S4 kontrol matrisi runtime'da koştu (`page.route`+system Chrome), **22/22 PASS, 0 kapsam-içi bug**. Kaynak kod değişmedi (doğrulama fazı); geçici harness silindi.

**Son Yaklaşım:** Runtime C harness (`tests/_verify-s4.mjs`, tek-process `page.route`+system Chrome) proje-içine yazıldı, koşuldu, silindi. Task tamamlandı — sonraki adım yok (fazda 3 task kaldı: 17.06–17.08).

**Sonraki Adım Detayı:** Yeni oturum → `/devflow:run-task` → TASK-17.06 (S2 tam TR yolculuğu, C+A).

**Yapılanlar:**
- **Selector teyidi (memory `runtime-harness-selector-teyidi`):** ThemeToggle `<button aria-pressed>` → `html.dark`+`localStorage("theme")`+`themechange` event (useEffect yalnız **okur**, load'da class eklemez); LanguageSwitcher globe `<button aria-haspopup="listbox">` → `<ul role="listbox">`→`<button role="option">`→`router.replace(pathname,{locale})` (a href değil), kapanış Escape/mousedown-dış/seçim; FOUC pre-paint script (`layout.tsx:75` `<head>` blocking, `localStorage('theme')`→pre-paint `.dark`); LivingFlow tema flip = FlowCanvas MutationObserver `html` class → uniform rengi **yerinde günceller** (remount yok); FlowBackdrop page-level canvas yalnız `high` (home). Tahmin edilmedi, hepsi kaynaktan okundu.
- **Harness (C: `page.route`+system Chrome):** Chrome 149 `channel:'chrome'`+`--enable-unsafe-swiftshader`+`--disable-dev-shm-usage`+`--no-sandbox`; `.next` prerender+static diskten servis (ayrı server yok → sandbox `exit 144` atlandı, memory `page.route` ilk tercih). Taze `next build` (31 prerender HTML, 0 MISSING_MESSAGE) HEAD hizası. loadavg 1.42. Koşuldu, **silindi** (commit'lenmedi).
- **Ayırt-edicilik sanity GEÇTİ:** WebGL2 probe `has:true` (SwiftShader); home `high` → **FlowBackdrop fixed canvas=1** → ortam WebGL veriyor + hidratasyon çalışıyor → toggle/canvas/menü sonuçları gerçek (yanlış-static değil).

**S4 kontrol matrisi (v0.4 kontrol katmanına dokunmadı → re-teyit — HEPSİ GEÇTİ, 22/22):**

| Grup | Kontrol | Sonuç |
|------|---------|-------|
| Tema | light varsayılan: `html.dark` yok · `aria-pressed=false` · bg `rgb(247,246,241)` | ✅ |
| Tema | toggle→dark: `html.dark` var · `aria-pressed=true` · `localStorage.theme=dark` · bg `rgb(19,21,16)` | ✅ |
| Tema | **Living Flow uniform** — canvas 1→1, `data-s4probe` korundu (aynı element = remount YOK) | ✅ |
| Tema | reload **kalıcı** (dark+aria-pressed+localStorage korundu) | ✅ |
| Tema | **FOUC YOK** — `earlyDark===finalDark===dark`; `.dark` body DOM'a girmeden var (pre-paint) | ✅ |
| Dil | home → DE = `/de` (finalPath+lang=de) | ✅ |
| Dil | **`/spor-salonu-yazilimi` → EN = `/en/spor-salonu-yazilimi`** (Alpfit path korunur, lang=en) | ✅ |
| Dil | `/crew-os` → EN = `/en/crew-os` (lang=en) | ✅ |
| Dil | menü kapanış: Escape (`aria-expanded=false`) · dış-tık (mousedown) · klavye (Enter aç→Escape kapat) | ✅ |
| Klavye | focus-visible **yeşil 2px solid** — LIGHT `rgb(31,122,61)` · tema+dil+nav/CTA link | ✅ |
| Klavye | focus-visible **yeşil 2px solid** — DARK `rgb(79,176,106)` (token flip `--color-green`) · tema+dil+link | ✅ |
| Klavye | **odak kaybı YOK** — 16/16 Tab öğesi, `activeElement` hiç `<body>`'ye düşmedi (light+dark) | ✅ |

- **Triyaj — 3 harness ölçüm artefaktı (gerçek bug DEĞİL, memory: kör red yok → harness düzeltilir):**
  1. **Hidrasyon yok (ilk koşu):** `app/[locale]/{layout,page,not-found}` chunk URL'leri **URL-encoded** (`%5Blocale%5D`), disk dosyası literal `[locale]` → 404 → React boot etmedi. Fix: `decodeURIComponent(pathname)`. (`/script.js` Umami + `/icon.svg` 404'leri benign, render'a etkisiz.)
  2. **FOUC `bodyAtDark` yakalanmadı:** MutationObserver `document.documentElement`'e document_start'ta bağlanınca element henüz yok → hiç ateşlemedi. Fix: `document` childList/subtree gözlemi (document her zaman var) → `<body>` DOM'a girdiği an `.dark` durumu okunur. Gerçek kriter (early===final) zaten geçiyordu.
  3. **`--color-green` probe:** token `#1f7a3d` **hex** döndü, `parseRGB` hex'i yanlış ayrıştırdı. Fix: hex→rgb. Outline zaten `rgb(...)` doğru okunuyordu.
- **Kaynak kod değişmedi** (doğrulama fazı); geçici harness silindi (git temiz, `.next` gitignore).

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
**Tamamlanma:** 2026-07-18 (run-task 17.05)
