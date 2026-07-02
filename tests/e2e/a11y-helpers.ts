import { type Page, type BrowserContext } from "@playwright/test";

// Paylaşımlı a11y ölçüm yardımcıları (Faz 8, TASK-8.01).
//
// `home-a11y.spec.ts` (Faz 5 tohumu) içindeki ölçüm disiplinini —  WCAG etiket
// alt-kümesi, uçtan-uca scroll (reveal opacity:1), locale-farkındalıklı navigasyon
// (NEXT_LOCALE cookie) — tek kaynağa çıkarır ki hem ana sayfa hem alt-sayfa
// spec'leri aynı kanıtlı deseni paylaşsın (kopya kod yok — Modülerlik ekseni).
// Gerekçe ve kanıt → `_dev/memory/a11y-olcum-tema-tuzagi.md`, `_dev/docs/TESTING.md`.

// 🔴 axe KAPSAMI = WCAG etiketleri (kullanıcı kararı 2026-06-30): ham full-ruleset
// best-practice (region/landmark/heading-order) Lighthouse'un saymadığı gürültü verir
// → regresyon olmadan kırmızı çıkabilir. Faz 4 a11y=100 bir Lighthouse skorudur
// (axe-core 4.11.4 WCAG alt-kümesi); @axe-core/playwright 4.12.1 ham ve farklı sürüm.
// withTags ile Faz 4'ün kilitlediği WCAG AA standardını regresyona bağlarız.
export const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// Sayfayı uçtan uca scroll'la. reducedMotion:'reduce' reveal'ları opacity:1'e düşürür
// (Faz 4 DEV-5: full-motion'da opacity:0 reveal axe taramasından düşer → yanlış yeşil),
// scroll ise IntersectionObserver-tetikli lazy mount/reveal'ları ateşler. İkisi birlikte
// tüm içeriği axe'a görünür kılar.
export async function scrollThrough(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 200));
    window.scrollTo(0, 0);
  });
}

// Locale-farkındalıklı navigasyon. next-intl `as-needed` prefix stratejisi:
//   - TR (varsayılan) → prefixsiz yol (`/`, `/bunker-os`). Accept-Language ile
//     `/en` vb.'ye yönlenmesini önlemek için NEXT_LOCALE=tr cookie ŞART
//     (cookie precedence > Accept-Language → TR ölçülür; MEMORY: locale tuzağı).
//   - EN/AR/DE/ES → açık-prefixli yol (`/ar/bunker-os`); cookie'siz doğrudan.
// `path` TR prefixsiz yoldur ("/" veya "/bunker-os"); locale prefix'i burada eklenir.
export async function gotoLocalized(
  page: Page,
  context: BrowserContext,
  locale: string,
  path: string,
): Promise<void> {
  if (locale === "tr") {
    await context.addCookies([
      { name: "NEXT_LOCALE", value: "tr", domain: "localhost", path: "/" },
    ]);
    await page.goto(path, { waitUntil: "networkidle" });
  } else {
    const target = path === "/" ? `/${locale}` : `/${locale}${path}`;
    await page.goto(target, { waitUntil: "networkidle" });
  }
}
