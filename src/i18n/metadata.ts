import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

// TB-1 tek-kaynak SEO helper'ı (Faz 13). locale→URL eşlemesi ve canonical/hreflang
// üretimi burada toplanır — sitemap.ts + sayfa metadata'sı hep buradan tüketir
// (kopya-kod/drift yok; Faz 10 `<Logo>` dersi). Değerler relative; layout'taki
// `metadataBase` (https://kiwiailab.com) bunları absolute'e çözer.

/**
 * Bir locale + path'i next-intl `as-needed` prefix kuralıyla kanonik URL path'ine
 * çevirir. Varsayılan locale (TR) prefixsiz; diğerleri `/<locale>` prefixli.
 * Sondaki slash yok (`trailingSlash:false` ile kanonik olan bu).
 *
 * `("tr","")→"/"`, `("en","")→"/en"`, `("tr","/crew-os")→"/crew-os"`,
 * `("en","/crew-os")→"/en/crew-os"`, `("ar","/bulten/x")→"/ar/bulten/x"`.
 */
export function localePath(locale: string, path = ""): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${path}` || "/";
}

/**
 * Bir path için Next Metadata `alternates` objesi üretir: self-canonical + 5-dil
 * hreflang `languages` + `x-default` (varsayılan locale, prefixsiz). `languages`
 * `routing.locales` üzerinden türetilir → yeni dil eklenince otomatik kapsar.
 *
 * Sığ-merge uyarısı: `alternates` bütün-obje olarak değişir → sayfa tarafı bu
 * objenin tamamını yazmalı (yalnız `canonical` yazmak `languages`'ı düşürür).
 */
export function localizedAlternates(
  locale: string,
  path = "",
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localePath(l, path);
  }
  languages["x-default"] = localePath(routing.defaultLocale, path);

  return {
    canonical: localePath(locale, path),
    languages,
  };
}
