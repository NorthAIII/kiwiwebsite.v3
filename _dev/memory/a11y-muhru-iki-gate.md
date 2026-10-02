# Bir sayfayı a11y-mühürlerken iki gate'i de koş — axe WCAG-AA 0 ihlal ≠ Lighthouse a11y=100

`@axe-core/playwright` `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa'])` yalnız WCAG-AA kurallarını tarar; `landmark-one-main`/`region`/`heading-order` gibi Lighthouse **structural/best-practice** audit'leri bu alt-kümede **yok** → axe tohumu 0 ihlal (yeşil) verirken Lighthouse a11y skoru <100 olabilir.

Bu proje a11y'yi **iki ayrı gate**'le mühürler:

1. CI `subpages-a11y.spec.ts`/`home-a11y.spec.ts` axe-WCAG tohumu = regresyon güvencesi.
2. Manuel Lighthouse çift-tema = milestone skor gate (structural audit'leri kapsar).

Bir sayfayı "a11y bitti" saymadan önce **ikisini de** koş; "axe yeşil = 100" varsayma.

(Faz 8: 50 axe testi yeşilken 2 bülten sayfası a11y=98 — `<main>` yoktu; TASK-8.06 yakaladı. Detay → DECISIONS 2026-07-02, `phases/PHASE-8.md`.)

İlgili: [a11y/perf ölçümünde tema tuzağı](a11y-olcum-tema-tuzagi.md) (çift-tema neden şart).
