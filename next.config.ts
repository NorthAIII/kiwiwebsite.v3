import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js ships untranspiled ESM; let Next handle it cleanly
  transpilePackages: ["three"],
  // Config `source` matches literally and does NOT cover next-intl `as-needed`
  // locale prefixes automatically — every redirect needs both a bare entry and a
  // `/:locale(en|ar|de|es)/…` twin, or the prefixed paths 404 (see PHASE-11/13 and
  // _dev/memory/next-config-redirect-locale-prefix.md).
  //
  // Ordering is critical here: `:slug*` compiles to an OPTIONAL group, so
  // `/forum/:slug*` also matches the bare `/forum` (zero segments). Because the
  // bare index and the slug redirects have DIFFERENT destinations (/ vs /bulten),
  // the exact bare entries must come FIRST — Next applies the first matching
  // redirect, and the bare regex is `$`-anchored (the truly specific match).
  async redirects() {
    return [
      // The community section became the "Bülten". Article slugs still live under
      // /bulten/<slug>, but there is no /bulten index page — its content lives on
      // the home page (#forum) — so the bare /forum index redirects to / (PHASE-13).
      { source: "/forum", destination: "/", permanent: true },
      {
        source: "/:locale(en|ar|de|es)/forum",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/forum/:slug*",
        destination: "/bulten/:slug*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar|de|es)/forum/:slug*",
        destination: "/:locale/bulten/:slug*",
        permanent: true,
      },
      // Internal codename "Bunker OS" was the only surface leaking to the URL;
      // the showcase route is now public /crew-os (PHASE-11).
      { source: "/bunker-os", destination: "/crew-os", permanent: true },
      {
        source: "/:locale(en|ar|de|es)/bunker-os",
        destination: "/:locale/crew-os",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
