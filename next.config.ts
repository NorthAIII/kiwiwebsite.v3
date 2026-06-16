import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js ships untranspiled ESM; let Next handle it cleanly
  transpilePackages: ["three"],
};

export default withNextIntl(nextConfig);
