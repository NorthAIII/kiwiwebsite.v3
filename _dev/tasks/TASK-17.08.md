# TASK-17.08: S9 — Adversarial/Holistik + Canlı Duman (test-what's-live)

**Durum:** ⬜ Bekliyor
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

- [ ] **1. `next build` temiz + 0 `MISSING_MESSAGE` (regresyon tabanı)**
  - Taze build 0 warn + tüm SSG sayfa-locale prerender'da 0 `MISSING_MESSAGE` (build log + prerender grep)

- [ ] **2. JS-kapalı SSG okunabilirlik (`page.route`, JS-off)**
  - 6 TR sayfa JS-off okunur (h1 + nav + `<main>` + metin; canvas=0 beklenen); **özellikle Alpfit saf CSS/SVG bölümler** (PhoneMockups, before/after) no-JS render + okunur (raster/`next/image` yok → JS-off'ta da tam)

- [ ] **3. Adversarial race (`page.route` + system Chrome)**
  - Hızlı **çok-tık tema toggle race** → final-tutarlı (`html.dark`==localStorage==`aria-pressed`) + reload kalıcı
  - Hızlı **dil zinciri** (en→de→ar→es→tr) → lang==url tutarlı, AR rtl
  - Hızlı **scroll/anchor storm** → bölümler sağlam + **nabız canvas 1→1 tek WebGL context** + anchor settle + scroll-lock yok + **0 ScrollTrigger/GSAP/Lenis hatası**

- [ ] **4. Canlı duman (curl kiwiailab.com — test-what's-live)**
  - Anahtar sayfalar **200**: `/` + `/spor-salonu-yazilimi` + `/crew-os` (canlı `f173234`)
  - **Alpfit Plus v0.4 marker canlı prerender'da** (`PhoneMockup` — araştırma: canlı 150× = branch build birebir); `/api/chat` → **503** (env yok, beklenen offline)
  - Shell tuzağı: `grep -c`/`grep -q` (marker sayımı; `grep|head` yanıltır)

- [ ] **5. Triyaj & kayıt (faz kapanışı)**
  - Kapsam-içi bug → düzeltme task'ı; harness artefaktı (`/script.js` / `/icon.svg` 404) ≠ gerçek bug; canlı ≠ branch delta notu (gym PNG unmerged, Alpfit etkilenmez); PHASE-17 kaydı

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

- [ ] `next build` temiz (0 warn) + tüm prerender **0 `MISSING_MESSAGE`**
- [ ] JS-off: 6 TR sayfa okunur (h1+nav+`<main>`+metin, canvas=0); **Alpfit CSS/SVG bölümler no-JS render + okunur**
- [ ] Adversarial: tema çok-tık race final-tutarlı + reload kalıcı; dil zinciri tutarlı (AR rtl); scroll storm → bölümler sağlam + nabız 1→1 tek WebGL context + **0 ScrollTrigger/GSAP/Lenis hatası**
- [ ] Canlı duman: `/`+`/spor-salonu-yazilimi`+`/crew-os` **200** + **Alpfit `PhoneMockup` marker canlı** + `/api/chat` **503**
- [ ] Harness artefaktı ≠ gerçek bug ayrımı; canlı≠branch-delta notu; bulgular triyaj + PHASE-17'ye; kaynak kod değişmedi; geçici harness silindi

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

**Durum:** [durum]

**Yapılanlar:**
- [doldurulacak]

---

**Oluşturulma:** 2026-07-17 (plan-phase 17)
