import { describe, it, expect } from "vitest";
import { localePath, localizedAlternates } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

// TB-1 SEO helper tohum testi (Faz 13, TASK-13.01).
//
// `localePath` + `localizedAlternates` saf fonksiyonlardır (node katmanı, DOM yok).
// Amaç: canonical/hreflang üretiminin deterministik olduğunu mühürlemek — sessiz
// SEO regresyonunu (yanlış canonical, eksik hreflang, kayıp x-default) yakalar.
//
// Locale döngüleri `routing.locales` üzerinden → yeni dil eklenince test otomatik
// kapsar (i18n-parity testinin tek-kaynak deseniyle hizalı).

const { defaultLocale } = routing; // "tr"

describe("localePath — locale→URL eşlemesi", () => {
  // Deterministik çıktı tablosu (TASK-13.01 beklenen değerleri).
  const cases: Array<[string, string, string]> = [
    ["tr", "", "/"],
    ["en", "", "/en"],
    ["ar", "", "/ar"],
    ["de", "", "/de"],
    ["es", "", "/es"],
    ["tr", "/crew-os", "/crew-os"],
    ["en", "/crew-os", "/en/crew-os"],
    ["ar", "/bulten/ai-sdr-araclari", "/ar/bulten/ai-sdr-araclari"],
    ["de", "/spor-salonu-yazilimi", "/de/spor-salonu-yazilimi"],
    ["es", "/vaka-calismalari", "/es/vaka-calismalari"],
  ];

  for (const [locale, path, expected] of cases) {
    it(`("${locale}", "${path}") → "${expected}"`, () => {
      expect(localePath(locale, path)).toBe(expected);
    });
  }

  it("varsayılan locale prefixsiz, non-TR prefixli", () => {
    for (const locale of routing.locales) {
      const home = localePath(locale, "");
      if (locale === defaultLocale) {
        expect(home).toBe("/");
      } else {
        expect(home).toBe(`/${locale}`);
      }
    }
  });

  it("path parametresi opsiyonel (varsayılan boş → home)", () => {
    expect(localePath("tr")).toBe("/");
    expect(localePath("en")).toBe("/en");
  });
});

describe("localizedAlternates — canonical + hreflang alternates", () => {
  it("canonical, çağrılan locale+path'in kendi URL'i (self-canonical)", () => {
    expect(localizedAlternates("tr", "/crew-os")?.canonical).toBe("/crew-os");
    expect(localizedAlternates("en", "/crew-os")?.canonical).toBe(
      "/en/crew-os",
    );
    expect(localizedAlternates("ar", "")?.canonical).toBe("/ar");
    expect(localizedAlternates("tr", "")?.canonical).toBe("/");
  });

  it("languages 5 locale + x-default içerir", () => {
    const languages = localizedAlternates("tr", "/crew-os")
      ?.languages as Record<string, string>;
    // Her locale girdisi kendi prefix'iyle.
    for (const locale of routing.locales) {
      expect(languages[locale]).toBe(localePath(locale, "/crew-os"));
    }
    // x-default → varsayılan locale (prefixsiz) URL'i.
    expect(languages["x-default"]).toBe(localePath(defaultLocale, "/crew-os"));
    // Anahtar sayısı = locale sayısı + x-default.
    expect(Object.keys(languages)).toHaveLength(routing.locales.length + 1);
  });

  it("x-default, varsayılan locale girdisiyle aynı değer taşır", () => {
    const languages = localizedAlternates("en", "/spor-salonu-yazilimi")
      ?.languages as Record<string, string>;
    expect(languages["x-default"]).toBe(languages[defaultLocale]);
  });

  it("canonical, çağrılan locale değişince değişir ama languages sabit kalır", () => {
    const path = "/vaka-calismalari";
    const trAlt = localizedAlternates("tr", path);
    const enAlt = localizedAlternates("en", path);
    // canonical locale'e bağlı.
    expect(trAlt?.canonical).not.toBe(enAlt?.canonical);
    // languages (5 dil + x-default) path'e bağlı, çağrı locale'inden bağımsız → eşit.
    expect(trAlt?.languages).toEqual(enAlt?.languages);
  });
});
