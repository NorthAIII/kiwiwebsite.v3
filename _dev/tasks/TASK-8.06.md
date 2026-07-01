# TASK-8.06: Bülten makale sayfalarına `<main>` landmark (a11y=100 tamamlama)

**Durum:** ⬜ Bekliyor
**Modül:** M2 (forum article bileşenleri) + M2 (bülten route)
**Feature:** TD5 (alt-sayfa derin a11y — milestone #1 tamamlama)
**Faz:** Phase 8 (phases/PHASE-8.md)
**Bağımlılıklar:** TASK-8.05 ✅ (bülten sayfaları harness'e mühürlü)

---

## Hedef

İki bülten makale sayfasına (`/bulten/ai-sdr-araclari`, `/bulten/claude-opus-4-8-fable-5`) tek `<main>` landmark ekle ki Lighthouse `landmark-one-main` audit'i geçsin ve her iki sayfa **a11y=100 çift-tema** olsun (milestone #1). Şu an bu iki sayfa a11y=**98** — sayfa `<main>` landmark'ı içermiyor. Görsel değişim **sıfır** (`<main>` styling'siz block wrapper). Tamamlanmış sayılır: iki bülten sayfası Lighthouse a11y=100 (dark ölçüm; light kontrast axe ile zaten kanıtlı) + e2e 52 test regresyonsuz + görsel birebir aynı.

---

## Bağlam

verify-phase 8 UAT #3 bulgusu. axe WCAG-tag suite (`subpages-a11y.spec.ts`, `withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"])`) bu iki sayfayı 0 ihlalle geçirdi — çünkü `landmark-one-main` axe-core'da **`best-practice`** etiketli, WCAG alt-kümesinde değil. 8.05 mührü yalnız bu axe koşusuna dayandı; Lighthouse a11y=100 skor gate'i (milestone #1) plan gereği verify-phase'e ertelenmişti (`PHASE-8.md` → Task Listesi → Plan notları: "Lighthouse a11y=100 çift-tema … manuel verify ölçümü"). verify ölçümü boşluğu yakaladı.

**Kök neden (kod teyitli):** Bülten `page.tsx`'leri içeriği `<SmoothScroll><CustomCursor/><PageHeader/><ArticleXxx/><Footer/></SmoothScroll>` ile sarar; `ArticleAiSdr`/`ArticleClaude` bileşenleri kök olarak `<article className="mx-auto max-w-2xl …">` render eder — **`<main>` yok**. Diğer alt sayfalar bunu içermiyor değil: `BunkerShowcase`, `GymSoftwareShowcase`, `CaseStudies` her biri kök `<main className="pt-16">` render eder → onlar a11y=100. Bülten `<article>` kullanıp `<main>` sarmadığı için landmark eksik.

---

## Referans Dokümanlar

**Okunması Gereken:**
- `_dev/phases/PHASE-8.md` — UAT Sonuçları (#3 bulgusu + kök neden), milestone #1
- `src/components/forum/ArticleAiSdr.tsx` · `src/components/forum/ArticleClaude.tsx` — kök `<article>` (sarılacak)
- `src/components/CaseStudies.tsx` (satır 130 `<main className="pt-16">`) — proje deseni (kök main)

**Güncellenmesi Gereken (Task Sonunda):**
- `_dev/DURUM.md` — Task durumu ve özet
- `_dev/phases/PHASE-8.md` — Task Listesi tablosunda 8.06 durumu

---

## Alt Görevler

- [ ] **1. ArticleAiSdr'a `<main>` landmark ekle**
  - `src/components/forum/ArticleAiSdr.tsx`: kök `<article className="…">…</article>`'ı `<main>` ile sar (`<main><article className="…">…</article></main>`). `<main>` styling almaz → görsel birebir aynı. `<article>` semantiği korunur (makale içeriği).

- [ ] **2. ArticleClaude'a `<main>` landmark ekle**
  - `src/components/forum/ArticleClaude.tsx`: aynı desen (kök `<article>`'ı styling'siz `<main>` ile sar).

- [ ] **3. Ölç + mühür teyidi**
  - `next build` temiz. Prod-serve (fresh-PID) + Lighthouse a11y (Chrome 150 SwiftShader flag'leri, `NEXT_LOCALE=tr` cookie) iki bülten sayfasında **=100** (dark kanonik). `npm run test:e2e` 52 test regresyonsuz (mühür zaten var, ihlal artmaz). Görsel: TR/AR screenshot birebir (main wrapper görünmez).

---

## Etkilenen Dosyalar

```
src/components/forum/
├── ArticleAiSdr.tsx    # kök <article> → <main><article>…</article></main> (görsel değişimsiz)
└── ArticleClaude.tsx   # aynı desen
```

---

## Dikkat Noktaları

- **Sıfır görsel değişim şartı:** `<main>` styling almaz (display:block, margin/padding yok) → layout birebir. Craft üst eksen — screenshot ile teyit.
- **Tek main kuralı:** Sayfada tek `<main>` olmalı (`landmark-no-duplicate-main`). Bülten page.tsx'lerinde başka `<main>` yok (PageHeader/Footer `<header>`/`<footer>`) → tek main garantili.
- **Ölçüm disiplini (memory):** Lighthouse kanonik headless dark render eder; a11y skoru tema-bağımsız (landmark yapısal) → tek dark koşu skoru kanıtlar, light kontrast axe light+dark ile zaten kanıtlı. `NEXT_LOCALE=tr` cookie (TR prefixsiz yol `/en`'e yönlenmesin) + SwiftShader flag'leri (LivingFlow) + fresh-serve PID teyidi.
- **Regresyon:** axe WCAG suite `<main>` eklemekten etkilenmez (yalnız landmark best-practice kuralını çözer) → 52 test yeşil kalır. Diğer 3 alt sayfa + home zaten a11y=100, dokunulmaz.
- **i18n:** yeni anahtar yok (yalnız markup wrapper) → parite etkisiz.

---

## Test Kriterleri

- [ ] `/bulten/ai-sdr-araclari` + `/bulten/claude-opus-4-8-fable-5` Lighthouse a11y=**100** (dark ölçüm; `landmark-one-main` geçer).
- [ ] `npm run test:e2e` yeşil — 52 test regresyonsuz (iki bülten sayfası hâlâ 0 ihlal, 5 dil × 2 tema).
- [ ] Görsel: iki sayfa TR (LTR) + AR (RTL) screenshot birebir aynı (main wrapper görünmez, craft korunur).
- [ ] `next build` temiz; Vitest 7 test yeşil.
- [ ] Ana sayfa + diğer 3 alt sayfa a11y=100 regresyonsuz (dokunulmadı).

---

## Risk ve Geri Dönüş Planı

- **Beklenmeyen görsel kayma** (main'in bir global stil miras alması) → screenshot ile teyit; kayarsa `<main>` yerine `<main className="contents">` (layout'a şeffaf) değerlendir. Düşük risk (main default block, article zaten kendi max-w/mx-auto'suna sahip).
- **Rollback:** `git checkout -- src/components/forum/ArticleAiSdr.tsx src/components/forum/ArticleClaude.tsx`.

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

**Durum:** [doldurulacak]

---

**Oluşturulma:** 2026-07-01 (verify-phase 8, UAT #3 bulgusu)
