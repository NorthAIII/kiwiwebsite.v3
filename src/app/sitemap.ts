import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localePath } from "@/i18n/metadata";

const BASE = "https://kiwiailab.com";
const PATHS = [
  "",
  "/crew-os",
  "/spor-salonu-yazilimi",
  "/vaka-calismalari",
  "/bulten/ai-sdr-araclari",
  "/bulten/claude-opus-4-8-fable-5",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  // locale→URL eşlemesi ortak `localePath` util'inden gelir (tek kaynak; drift yok).
  // Non-TR home artık `/en/` değil `/en` (slashsiz, gerçek route) — kasıtlı normalizasyon.
  for (const locale of routing.locales) {
    for (const path of PATHS) {
      entries.push({
        url: `${BASE}${localePath(locale, path)}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}
