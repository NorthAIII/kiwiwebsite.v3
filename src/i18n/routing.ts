import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // EN default; AR (RTL), DE, ES scaffolded for Phase 2 + geo-detected switch (§2).
  locales: ["en", "ar", "de", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Locales that render right-to-left.
export const rtlLocales: Locale[] = ["ar"];
