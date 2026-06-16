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
    ];
  },
};

export default withNextIntl(nextConfig);
