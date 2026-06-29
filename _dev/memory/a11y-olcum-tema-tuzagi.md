# a11y/perf ölçümünde tema tuzağı — Lighthouse default DARK + panel inversion

İki bağlantılı, proje-geneli ölçüm tuzağı. (Faz 4 TASK-4.01'de keşfedildi; o ana dek "Lighthouse light ölçer" varsayılıyordu — yanlıştı.)

## 1. Kanonik Lighthouse koşusu DARK render ediyor
- Tema init script'i (`src/app/[locale]/layout.tsx:76`) localStorage yoksa `window.matchMedia('(prefers-color-scheme: dark)')`'a düşer. `npx lighthouse --chrome-flags="--headless=new ..."` Chrome'u **dark** raporlar → sayfa **dark** render olur.
- Yani `docs/perf/README.md` kanonik yöntemi (ve v0.1 baseline'ı: `#8af28a`/`#f2f1e8` = dark token'lar) **DARK mode** ölçümüdür — "light gate" değil.
- **a11y skoru her iki temada da aynı** (aynı denetimler başarısız) ama **color-contrast'ta başarısız ÖĞELER temaya göre değişir** — bu yüzden tek koşuya güvenme.
- Belirli bir temayı **zorlamak için** Playwright kullan: `page.emulateMedia({ colorScheme: 'light'|'dark', reducedMotion: 'reduce' })`. Lighthouse CLI'da temiz bir renk-şeması bayrağı yok.

## 2. axe'i her iki temada + reduced-motion ile çalıştır
- Lighthouse'un kendi a11y koşusu full-motion olduğu için alt-fold reveal'lar (GSAP `opacity:0`) axe taramasından düşer → Lighthouse daha AZ color-contrast node görür. **Tam** envanter için `reducedMotion: 'reduce'` (reveal'lar `opacity:1`) + sayfayı uçtan uca scroll'la.
- axe-core'u offline enjekte et: lighthouse npx cache'inde gömülü — `~/.npm/_npx/<hash>/node_modules/axe-core/axe.min.js` (Lighthouse'un kullandığı aynı motor). `page.addScriptTag({ path })` + `axe.run(document, { runOnly: { type:'rule', values:[...] } })`.

## 3. `bg-ink` / `text-canvas` panelleri tema ile TERS çevrilir → kontrast pass/fail değişir
- Site genelinde "koyu panel" deseni `bg-ink p-… text-canvas` (örn. `SectorSolutions.tsx:116`, `Bunker.tsx`, `Footer`). Token'lar dark mode'da flip ettiği için panel **dark'ta krem** olur (`bg-ink` = `#f2f1e8`).
- Sonuç: panel içindeki `text-pulse` / `text-canvas/NN` öğeleri **light'ta geçer, dark'ta başarısız** (krem üstünde düşük kontrast). Tersi de mümkün.
- **Kural:** bir kontrast düzeltmesini değerlendirirken her zaman **hem light hem dark**'ta doğrula (ILKELER "light & dark"). Bir öğenin bir temada geçmesi diğerini garanti etmez.

İlişkili: [Perf ölçüm host-yükü + fresh-prod-serve disiplini](../MEMORY.md) (Süreç Disiplinleri) — aynı ölçüm-disiplini ailesi.
