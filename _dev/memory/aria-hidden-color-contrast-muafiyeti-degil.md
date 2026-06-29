# `aria-hidden` color-contrast denetiminden muaf tutmaz

**Yanlış varsayım (yaygın inanış):** "Dekoratif/düşük-kontrastlı bir öğeye `aria-hidden="true"` eklersem axe/Lighthouse `color-contrast` denetiminden çıkar."

**Gerçek (kanıtlı):** Çıkmaz. **axe-core 4.11.4** ile kontrollü test edildi (TASK-4.02, 2026-06-29):
- Doğrudan `aria-hidden="true"` olan öğe → **hâlâ flag'lenir**.
- `aria-hidden="true"` ebeveyn içindeki öğe → **hâlâ flag'lenir**.
- Sebep: `color-contrast` kuralı **görsel görünürlüğü** (`isVisibleOnScreen`) baz alır, erişilebilirlik ağacını değil. `aria-hidden` görsel render'ı değiştirmediği için öğe kapsamda kalır.

**Neden kritik:** **Lighthouse 13.3.0 bu axe-core 4.11.4'ü bundle ediyor** (aynı npx paketi `~/.npm/_npx/ffe2131771d88588/...`). Yani a11y skoru gate'i de aynı davranır → aria-hidden ile color-contrast fix'i a11y=100'e **katkı sağlamaz**.

**Doğru yaklaşımlar (görsel korunarak color-contrast'tan çıkarma):**
- **CSS pseudo-element** — metni text-node yerine `::before { content: attr(data-n) }` ile render et (Tailwind: `before:content-[attr(data-n)]` + `before:text-*` renk/transition). axe text-node taramaz → **temiz** (kanıtlı, görsel birebir). TASK-4.02'de seçilen çözüm.
- **Kontrast geçen renk/opaklık** — eşiği (3:1 large / 4.5:1 normal) gerçekten geçir. Dürüst ama görünüm değişir.
- **SVG `<text>`** → axe'ta "incomplete" verir (temiz değil) — kullanma.
- **Salt punctuation/ayraç** (örn. "·") komşu metin run'ına dahil olup ölçümde hiç görünmeyebilir — fix gerekip gerekmediğini önce gerçek axe koşusunda teyit et.

İlgili: a11y/perf ölçümünde tema tuzağı ([a11y-olcum-tema-tuzagi.md](a11y-olcum-tema-tuzagi.md)) — axe'ı her zaman light+dark koş.
