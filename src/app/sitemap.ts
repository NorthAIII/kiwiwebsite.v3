import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = "https://kiwiailab.com";
const PATHS = ["", "/bunker-os", "/spor-salonu-yazilimi", "/forum/ai-sdr-araclari"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    for (const path of PATHS) {
      entries.push({
        url: `${BASE}${prefix}${path || "/"}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}
