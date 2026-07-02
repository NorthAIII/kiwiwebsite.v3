import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js ships untranspiled ESM; let Next handle it cleanly
  transpilePackages: ["three"],
  // The community section became the "Bülten"; keep old /forum links alive.
  async redirects() {
    return [
      { source: "/forum", destination: "/bulten", permanent: true },
      { source: "/forum/:slug*", destination: "/bulten/:slug*", permanent: true },
      // Internal codename "Bunker OS" was the only surface leaking to the URL;
      // the showcase route is now public /crew-os. Config `source` does not cover
      // locale prefixes automatically, so both entries are explicit (see PHASE-11).
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
