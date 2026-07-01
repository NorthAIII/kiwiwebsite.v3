import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { WCAG_TAGS, scrollThrough, gotoLocalized } from "./a11y-helpers";

// a11y regresyon tohum testi (Faz 5, D1.3 — TASK-5.03).
//
// Ana sayfa `/` light + dark iki koşuda axe ile 0 ihlal. Faz 4'ün a11y=100
// kazanımını otomatik regresyona bağlar (Faz 4 retro önerisi). Seed'in 3 kanıtlı
// katmanından 3.'sü: Vitest-node (i18n parite) · Vitest-jsdom (smoke) · *Playwright/axe (bu)*.
//
// Ölçüm disiplini (WCAG_TAGS, scrollThrough, gotoLocalized/NEXT_LOCALE cookie)
// `a11y-helpers.ts`'te paylaşılır (Faz 8 TASK-8.01 — alt-sayfa spec'iyle tek kaynak).

// light + dark iki koşu: `bg-ink`/`text-canvas` panelleri (SectorSolutions, Bunker,
// Footer) dark'ta krem'e döner → kontrast pass/fail flip eder; bir temada geçmek
// diğerini garanti etmez (memory/a11y-olcum-tema-tuzagi).
for (const colorScheme of ["light", "dark"] as const) {
  test(`anasayfa / a11y — WCAG AA 0 ihlal (${colorScheme})`, async ({ page, context }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    await gotoLocalized(page, context, "tr", "/");
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
