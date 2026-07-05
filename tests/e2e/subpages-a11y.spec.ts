import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { WCAG_TAGS, scrollThrough, gotoLocalized } from "./a11y-helpers";

// Alt-sayfa a11y kümülatif regresyon tohumu (Faz 8, TD6 — TASK-8.01 harness'i).
//
// Ana sayfa çıtasını (`home-a11y.spec.ts`) 5 alt sayfaya taşır: her sayfa
// 5 dil × light+dark axe WCAG-AA 0 ihlal. Ölçüm disiplini `a11y-helpers.ts`'te
// paylaşılır (tema tuzağı + reveal tuzağı + locale tuzağı — MEMORY).
//
// 🔵 KÜMÜLATİF MÜHÜR DESENİ: `PAGES` başlangıçta BOŞ → bu spec hiçbir alt-sayfa
// iddiası enforce etmez (CI yeşil kalır). Fix task'ları (8.02–8.05) her sayfanın
// axe ihlallerini düzelttikten sonra sayfayı `PAGES`'e ekleyerek MÜHÜRLER — böylece
// düzeltilen sayfa CI'da otomatik regresyona bağlanır (fail-on-regression). Tam
// matris hedefi: 5 sayfa × 5 dil × 2 tema = 50 alt-sayfa testi (kullanıcı kararı:
// maksimum kapsam). Baseline envanteri → `_dev/tasks/archive/TASK-8.01.md`.

const LOCALES = ["tr", "en", "ar", "de", "es"] as const;

// Mühürlenmiş alt sayfalar. `path` = TR prefixsiz yol (locale prefix'i helper ekler).
// Fix task'ları buraya sayfa ekler: { label, path }.
const PAGES: { label: string; path: string }[] = [
  { label: "crew-os", path: "/crew-os" },
  { label: "spor-salonu-yazilimi", path: "/spor-salonu-yazilimi" },
  { label: "vaka-calismalari", path: "/vaka-calismalari" },
  { label: "bulten/ai-sdr-araclari", path: "/bulten/ai-sdr-araclari" },
  { label: "bulten/claude-opus-4-8-fable-5", path: "/bulten/claude-opus-4-8-fable-5" },
];

for (const { label, path } of PAGES) {
  for (const locale of LOCALES) {
    for (const colorScheme of ["light", "dark"] as const) {
      test(`${label} a11y — WCAG AA 0 ihlal (${locale}, ${colorScheme})`, async ({
        page,
        context,
      }) => {
        await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
        await gotoLocalized(page, context, locale, path);
        await scrollThrough(page);

        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

        expect(
          results.violations,
          results.violations
            .map((v) => `${v.id} (${v.nodes.length}) — ${v.help}`)
            .join("\n"),
        ).toEqual([]);
      });
    }
  }
}
