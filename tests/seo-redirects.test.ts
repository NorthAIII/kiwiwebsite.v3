import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { routing } from "../src/i18n/routing";

// TB-2 redirect locale-kapsam tohum testi (Faz 13, TASK-13.04).
//
// Config redirect `source` LİTERAL eşleşir → next-intl `as-needed` locale
// prefix'lerini (`/en`, `/ar`, `/de`, `/es`) otomatik kapsamaz. Her mantıksal
// redirect'in iki girişi olmalı: çıplak + `/:locale(en|ar|de|es)/…` twin; aksi
// halde `/en/forum` vb. sessizce 404 olur (AMPİRİK → memory
// next-config-redirect-locale-prefix). Bu test o gap'in geri gelmesini yakalar.
//
// Ayrıca sıra kritik: `:slug*` OPSİYONEL gruba derlenir → `/forum/:slug*` çıplak
// `/forum`'u da eşler (sıfır segment). Çıplak `/forum` (→ `/`) ile slug (→ `/bulten`)
// hedefleri IRAKSADIĞI için çıplak giriş slug'dan ÖNCE gelmeli. Test ilk-eşleşen
// redirect'in hedefini doğrulayarak bu sırayı da mühürler.
//
// Kaynak: `.next/routes-manifest.json` (build ground-truth — derlenmiş gerçek
// çıktı). Manifest yoksa AÇIK hata (silent skip yok); `next build` önce koşmalı
// (CI fast job build→test sırası bunu sağlar; yerelde `next build` gerekli).

const manifestPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  ".next",
  "routes-manifest.json",
);

// as-needed prefix: varsayılan locale (tr) çıplak → yalnız non-default locale'ler
// için prefixli twin gerekir.
const prefixLocales = routing.locales.filter(
  (l) => l !== routing.defaultLocale,
);
const localeGroup = `/:locale(${prefixLocales.join("|")})`; // "/:locale(en|ar|de|es)"

type Redirect = {
  source: string;
  destination: string;
  statusCode: number;
  regex: string;
  internal?: boolean;
};

function loadRedirects(): Redirect[] {
  if (!existsSync(manifestPath)) {
    throw new Error(
      `routes-manifest.json bulunamadı (${manifestPath}). Bu test build artefaktına ` +
        `dayanır — önce \`next build\` çalıştır (silent skip yok; CI fast job build→test ` +
        `sırası bunu sağlar).`,
    );
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
    redirects?: Redirect[];
  };
  // `internal` girişler next-intl/Next'in kendi yönlendirmeleri — yalnız uygulama
  // redirect'lerini denetle.
  return (manifest.redirects ?? []).filter((r) => !r.internal);
}

const redirects = loadRedirects();

// İlk eşleşen redirect'i (Next uygulama sırasıyla) döndürür — efektif davranış.
function firstMatch(path: string): Redirect | undefined {
  return redirects.find((r) => new RegExp(r.regex).test(path));
}

// Denetlenen mantıksal redirect'ler: her biri çıplak + locale-twin ister.
const logicalRedirects = [
  { bare: "/forum", twin: `${localeGroup}/forum` },
  { bare: "/forum/:slug*", twin: `${localeGroup}/forum/:slug*` },
  { bare: "/bunker-os", twin: `${localeGroup}/bunker-os` },
] as const;

describe("config redirect locale-kapsamı (çıplak + twin)", () => {
  for (const { bare, twin } of logicalRedirects) {
    it(`"${bare}" çıplak girişi var ve 308`, () => {
      const entry = redirects.find((r) => r.source === bare);
      expect(entry, `"${bare}" redirect'i routes-manifest'te yok`).toBeDefined();
      expect(entry!.statusCode).toBe(308);
    });

    it(`"${twin}" locale-twin girişi var ve 308`, () => {
      const entry = redirects.find((r) => r.source === twin);
      expect(
        entry,
        `"${twin}" locale-twin redirect'i routes-manifest'te yok (locale-gap)`,
      ).toBeDefined();
      expect(entry!.statusCode).toBe(308);
    });
  }
});

describe("locale-twin tüm non-default locale'leri kapsar", () => {
  // Her twin regex'i /en, /ar, /de, /es prefix'lerinin hepsini eşlemeli
  // (routing.locales tek kaynak → yeni dil eklenince otomatik kapsar).
  for (const { twin } of logicalRedirects) {
    const entry = redirects.find((r) => r.source === twin)!;
    const sample = twin.replace(`${localeGroup}`, "/__L__").replace("/:slug*", "");
    it(`"${twin}" → ${prefixLocales.length} locale prefix eşler`, () => {
      const rx = new RegExp(entry.regex);
      for (const locale of prefixLocales) {
        const path = sample.replace("/__L__", `/${locale}`);
        expect(rx.test(path), `${path} twin regex'ine uymuyor`).toBe(true);
      }
    });
  }
});

describe("efektif eşleşme (ilk-eşleşen redirect hedefi doğru)", () => {
  // Sıra tuzağını mühürler: çıplak /forum → / (slug'a düşmez), /forum/x → /bulten.
  const cases: Array<[string, string]> = [
    ["/forum", "/"],
    [`/${prefixLocales[0]}/forum`, "/:locale"],
    ["/forum/x", "/bulten/:slug*"],
    [`/${prefixLocales[0]}/forum/x`, "/:locale/bulten/:slug*"],
    ["/bunker-os", "/crew-os"],
    [`/${prefixLocales[0]}/bunker-os`, "/:locale/crew-os"],
  ];

  for (const [path, expectedDest] of cases) {
    it(`"${path}" → "${expectedDest}" (308)`, () => {
      const hit = firstMatch(path);
      expect(hit, `"${path}" hiçbir redirect'e uymuyor (404 gap)`).toBeDefined();
      expect(hit!.destination).toBe(expectedDest);
      expect(hit!.statusCode).toBe(308);
    });
  }

  it("çıplak /forum slug redirect'ine DÜŞMEZ (sıra mührü)", () => {
    // Bu regresyon testinin kalbi: /forum yanlışlıkla /bulten'e (404) gitmemeli.
    expect(firstMatch("/forum")!.destination).not.toBe("/bulten/:slug*");
  });
});
