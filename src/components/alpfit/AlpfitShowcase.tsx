"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import AlpfitHero from "./AlpfitHero";
import AlpfitRoles from "./AlpfitRoles";
import PhoneMockups from "./PhoneMockups";
import AlpfitFeatures from "./AlpfitFeatures";

/**
 * Alpfit Plus — kulüp işletme yazılımı ürün vitrini (F2.8 zengin yeniden tasarım).
 *
 * Composition shell over the page shell (PageHeader/Footer/SmoothScroll/CustomCursor
 * are wired in the route) and the single `<main>` landmark for the page. Sections land
 * progressively across Phase 15 tasks (Hero · Sorun+Roller · Telefon mockup'ları ·
 * 9 Özellik · Neden · Fiyat/Yol haritası/Kapanış).
 */
export default function AlpfitShowcase() {
  const t = useTranslations("alpfit");

  return (
    <main className="pt-16">
      <AlpfitHero />

      {/* Hero → content divider (artifact `.divide`, aligned to content column) */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <hr className="border-0 border-t border-line" aria-hidden />
      </div>

      {/* Sorun — single section-head, no own component */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="max-w-[64ch]">
          <p
            data-reveal
            className="mb-[18px] inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-green before:h-0.5 before:w-5 before:rounded-[2px] before:bg-current before:opacity-55 before:content-['']"
          >
            {t("problem.eyebrow")}
          </p>
          <h2
            data-reveal
            className="font-display text-[clamp(30px,4.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.021em] text-balance"
          >
            {t("problem.title")}
          </h2>
          <p
            data-reveal
            className="mt-[18px] max-w-[58ch] text-[18.5px] leading-[1.55] text-ink-soft"
          >
            {t("problem.body")}
          </p>
        </Reveal>
      </section>

      <AlpfitRoles />

      <PhoneMockups />

      <AlpfitFeatures />
    </main>
  );
}
