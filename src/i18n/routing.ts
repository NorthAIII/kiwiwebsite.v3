import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // TR is the primary language (client decision). EN live; AR (RTL), DE, ES
  // scaffolded for Phase 2 + geo-detected switch (§2).
  locales: ["tr", "en", "ar", "de", "es"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Locales that render right-to-left.
export const rtlLocales: Locale[] = ["ar"];
