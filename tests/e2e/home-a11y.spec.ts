import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// a11y regresyon tohum testi (Faz 5, D1.3 — TASK-5.03).
//
// Ana sayfa `/` light + dark iki koşuda axe ile 0 ihlal. Faz 4'ün a11y=100
// kazanımını otomatik regresyona bağlar (Faz 4 retro önerisi). Seed'in 3 kanıtlı
// katmanından 3.'sü: Vitest-node (i18n parite) · Vitest-jsdom (smoke) · *Playwright/axe (bu)*.
//
// 🔴 axe KAPSAMI = WCAG etiketleri (kullanıcı kararı 2026-06-30): ham full-ruleset
// best-practice (region/landmark/heading-order) Lighthouse'un saymadığı gürültü verir
// → regresyon olmadan kırmızı çıkabilir. Faz 4 a11y=100 bir Lighthouse skorudur
// (axe-core 4.11.4 WCAG alt-kümesi); @axe-core/playwright 4.12.1 ham ve farklı sürüm.
// withTags ile Faz 4'ün kilitlediği WCAG AA standardını regresyona bağlarız.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// Sayfayı uçtan uca scroll'la. reducedMotion:'reduce' reveal'ları opacity:1'e düşürür
// (Faz 4 DEV-5: full-motion'da opacity:0 reveal axe taramasından düşer → yanlış yeşil),
// scroll ise IntersectionObserver-tetikli lazy mount/reveal'ları ateşler. İkisi birlikte
// tüm içeriği axe'a görünür kılar.
async function scrollThrough(page: Page): Promise<void> {
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

// light + dark iki koşu: `bg-ink`/`text-canvas` panelleri (SectorSolutions, Bunker,
// Footer) dark'ta krem'e döner → kontrast pass/fail flip eder; bir temada geçmek
// diğerini garanti etmez (memory/a11y-olcum-tema-tuzagi).
for (const colorScheme of ["light", "dark"] as const) {
  test(`anasayfa / a11y — WCAG AA 0 ihlal (${colorScheme})`, async ({ page, context }) => {
    // NEXT_LOCALE=tr cookie: `/` (prefixsiz TR) Accept-Language ile `/en` vb.'ye
    // yönlenir (next-intl localeDetection); cookie precedence > Accept-Language →
    // TR `/` ölçülür. NEXT_LOCALE next-intl runtime cookie'sidir (MEMORY).
    await context.addCookies([
      { name: "NEXT_LOCALE", value: "tr", domain: "localhost", path: "/" },
    ]);

    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });
    await scrollThrough(page);

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

    // Boş ihlal listesi beklenir; ihlal çıkarsa mesaj kural id + etkilenen düğümü gösterir.
    expect(
      results.violations,
      results.violations
        .map((v) => `${v.id} (${v.nodes.length}) — ${v.help}`)
        .join("\n"),
    ).toEqual([]);
  });
}
