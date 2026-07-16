"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import AlpfitHero from "./AlpfitHero";
import AlpfitRoles from "./AlpfitRoles";
import PhoneMockups from "./PhoneMockups";
import AlpfitFeatures from "./AlpfitFeatures";
import AlpfitWhy from "./AlpfitWhy";
import AlpfitPricing from "./AlpfitPricing";

/** Subject-scoped mailto for the closing CTAs (artifact L742-743). */
const MAILTO_DEMO = "mailto:kivanc@kiwiailab.com?subject=Alpfit%20Plus%20demo%20talebi";
const MAILTO_ASK = "mailto:kivanc@kiwiailab.com?subject=Alpfit%20Plus%20hakk%C4%B1nda";

// Roadmap "yakında" items (artifact L731 + Store, discuss-phase 15 / DURUM). Store =
// member e-commerce, an honest "coming" roadmap line — not in the product today.
const ROADMAP = ["payment", "qr", "store", "health", "ai"] as const;

/**
 * Alpfit Plus — kulüp işletme yazılımı ürün vitrini (F2.8 zengin yeniden tasarım).
 *
 * Composition shell over the page shell (PageHeader/Footer/SmoothScroll/CustomCursor
 * are wired in the route) and the single `<main>` landmark for the page. Full section
 * order: Hero · Sorun · 4 Rol · Telefon mockup'ları · 9 Özellik · Neden · Fiyat bandı ·
 * Yol haritası · Kapanış. Roadmap + Close are small inline blocks (no own component).
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

      <AlpfitWhy />

      <AlpfitPricing />

      {/* Yol haritası — dashed "yakında" box on the canvas (artifact L726-734) */}
      <div className="mx-auto max-w-[1400px] px-6 py-[68px] lg:px-10">
        <Reveal>
          <div
            data-reveal
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-dashed border-line bg-surface px-[26px] py-6"
          >
            <span className="whitespace-nowrap rounded-full border border-green/30 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-green">
              {t("roadmap.tag")}
            </span>
            <p className="text-[14.5px] leading-[1.55] text-ink-soft">
              {ROADMAP.map((k, i) => (
                <Fragment key={k}>
                  {i > 0 && " · "}
                  <b className="font-semibold text-ink">{t(`roadmap.items.${k}`)}</b>
                </Fragment>
              ))}
              {". "}
              {t("roadmap.suffix")}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Kapanış — centered close (artifact L736-746) */}
      <section className="mx-auto max-w-[1400px] px-6 py-[104px] text-center lg:px-10">
        <Reveal>
          <h2
            data-reveal
            className="mx-auto max-w-[20ch] font-display text-[clamp(32px,5vw,50px)] font-semibold leading-[1.08] tracking-[-0.02em] text-balance"
          >
            {t("close.title")}
          </h2>
          <p
            data-reveal
            className="mx-auto mt-[22px] max-w-[46ch] text-[18px] leading-[1.55] text-ink-soft"
          >
            {t("close.body")}
          </p>
          <div data-reveal className="mt-[34px] flex flex-wrap justify-center gap-3">
            <a
              href={MAILTO_DEMO}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
            >
              {t("close.ctaPrimary")}
              <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100">
                →
              </span>
            </a>
            <a
              href={MAILTO_ASK}
              data-cursor="hover"
              className="inline-flex items-center rounded-full border border-line bg-surface px-7 py-3.5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-ink-faint"
            >
              {t("close.ctaSecondary")}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
