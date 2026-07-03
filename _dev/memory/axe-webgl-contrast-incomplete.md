# axe color-contrast WebGL canvas arkasında "incomplete" verir (otomatik sertifika yok → craft son hakem)

**Tuzak:** Metin bir WebGL `<canvas>` (Living Flow fixed alanı) üstünde/önünde durduğunda, axe-core `color-contrast` kuralı o metnin efektif arka planını **hesaplayamaz** — canvas piksellerini örnekleyemez (yalnız DOM öğelerinin computed background renklerini kompoze eder). Sonuç: bu öğeler **`violations`'a değil `incomplete`'a** düşer ("needs review", `contrastRatio: 0`). Yani:

- **axe `violations` = 0 kalır** (WebGL-arkası öğe ihlal saymaz) → WCAG-AA tohumu (home-a11y.spec) yeşil.
- **Lighthouse a11y = 100 kalır** — Lighthouse `incomplete`'i skora **saymaz** (yalnız fail'i sayar).
- **Ama bu bir "kontrast temiz" sertifikası DEĞİL** — araç o metnin okunabilirliğini *bilmiyor*, ölçemedi. Otomatik gate burada kör.

**Ampirik (TASK-12.03, full-motion axe, chrome-channel/swiftshader):** alan yokken (reduced-motion, static) `color-contrast incomplete` ≈ 67 öğe (gradient/translucent tasarımın zaten mevcut sınırı); alan live iken (full-motion) ≈ 81–82 öğe → **fark ~15 öğe = tam olarak fixed alan-üstü metinler**. İhlal 0, incomplete artışı fixed canvas'ın izi.

**Doğru okuma:** WebGL-arkası-metin kontrastı **otomatik araçla sertifikalanamaz** → **craft görsel inceleme son hakemdir** (Living Flow gibi imza-alanlarda a11y kontrast gate'i her zaman full-motion görsel teyit + FlowVeil washi güvencesiyle tamamlanır). Bu yüzden Faz 12 karar-gate'inde Gate-1 (otomatik axe/LH) + Gate-3 (craft görsel) **birlikte** çalışır; biri diğerini kapatmaz. FlowVeil'in (`--flow-veil` token) amacı tam da alan-üstü metnin efektif arkaplanını canvas-baskın tutup okunabilirliği garantilemek.

**Ölçüm notu:** full-motion şart — reduced-motion tohumu alanı gizler (`FlowBackdrop` yalnız `high` modda mount, reduced→`static`), o modda alanın kontrast etkisi **hiç ölçülmez**. WebGL için bundled chromium yetmez → `channel:'chrome'` + `--enable-unsafe-swiftshader` ([playwright-bundled-chromium-webgl-yok](playwright-bundled-chromium-webgl-yok.md)).

İlgili: [aria-hidden color-contrast'tan muaf değil](aria-hidden-color-contrast-muafiyeti-degil.md) (dekoratif alan da denetlenir) · [a11y ölçümünde tema tuzağı](a11y-olcum-tema-tuzagi.md) (light+dark ayrı) · [tema-fix html.dark token flip](tema-fix-html-dark-token-flip.md) (`--flow-veil` bu desende).
