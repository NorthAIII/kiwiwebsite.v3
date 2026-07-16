"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

/** Product-specific subject-scoped mailto (DECISIONS 2026-07-16; artifact L705-706). */
const MAILTO_DEMO = "mailto:kivanc@kiwiailab.com?subject=Alpfit%20Plus%20demo%20talebi";
const MAILTO_QUOTE = "mailto:kivanc@kiwiailab.com?subject=Alpfit%20Plus%20fiyat%20teklifi";

// Opaque lifted surface for the price-cards over the ink band. Visually identical
// to the artifact's translucent `--band-surface` over `--band`, but OPAQUE so it
// reads cleanly and so bright `text-pulse-ink` accents can inherit it (below).
const INK_LIFT = "bg-[color-mix(in_srgb,#fff_4%,var(--color-ink))]";

// "Her salonda dahil" — 7 named checklist keys (artifact L713-719). Named-key +
// map consumption (crew/roles pattern) — no JSON arrays, no copy-code.
const INCL = ["one", "two", "three", "four", "five", "six", "seven"] as const;

/** Decorative checkmark — the item label carries the meaning. */
function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-[18px] w-[18px] flex-none text-pulse-ink"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Pricing band — the page's ink-panel inversion (`bg-ink text-canvas`, research §3 /
 * TD4 a11y-seal): the whole `#fiyat` section is a full-bleed dark band that FLIPS to
 * cream in dark theme by design (site convention, memory: tema-fix-html-dark-token-flip).
 * Inner price-cards are an opaque lift (`INK_LIFT`); bright green accents use the
 * adaptive `--color-pulse-ink` token so they stay legible on the cream flip (WCAG AA).
 *
 * axe off-viewport guard (memory: axe-offscreen-inline-contrast, TASK-15.05): at the
 * a11y harness's scroll-0 reset this band is below the fold, so small OPAQUE
 * `text-pulse-ink` accents (eyebrow, ₺, free-row values) get their bg mis-resolved to
 * the page canvas and false-flag at ~1.5:1. Fix (visually seamless): give each such
 * accent the SAME opaque colour as its immediate backdrop (`bg-ink` on the band,
 * `INK_LIFT` on a card) so axe measures the real contrast (11.5:1). Muted text stays
 * `text-canvas/65` (translucent → axe "incomplete", not a violation) — the AA-safe
 * muted level on flipping ink panels (TASK-8.02), one step above the artifact's
 * `--band-soft` which fails AA on the dark cream flip.
 *
 * Honesty 4/4 real, published as-is (research / feature AP): ₺1.500 + KDV / salon / ay,
 * ₺1.200 (2nd branch −20%), ₺3.000 + KDV setup (free on annual prepay), 15-day trial.
 */
export default function AlpfitPricing() {
  const t = useTranslations("alpfit");

  return (
    <section id="fiyat" className="scroll-mt-24 bg-ink text-canvas">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Section head */}
        <Reveal className="mb-12 max-w-[64ch]">
          <p
            data-reveal
            className="mb-[18px] inline-flex items-center gap-2.5 bg-ink text-[12px] font-bold uppercase tracking-[0.15em] text-pulse-ink before:h-0.5 before:w-5 before:rounded-[2px] before:bg-current before:opacity-55 before:content-['']"
          >
            {t("pricing.eyebrow")}
          </p>
          <h2
            data-reveal
            className="font-display text-[clamp(30px,4.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.021em] text-balance"
          >
            {t("pricing.title")}
          </h2>
          <p
            data-reveal
            className="mt-[18px] max-w-[58ch] text-[18.5px] leading-[1.55] text-canvas/65"
          >
            {t("pricing.sub")}
          </p>
        </Reveal>

        {/* Price grid — 1.32fr / 1fr, single column below lg */}
        <div className="grid items-start gap-6 lg:grid-cols-[1.32fr_1fr]">
          {/* Price card */}
          <Reveal>
            <div
              data-reveal
              className={`rounded-[18px] border border-canvas/10 ${INK_LIFT} p-8 shadow-[0_2px_4px_rgba(18,20,15,0.05),0_24px_60px_-18px_rgba(18,20,15,0.2)] lg:p-[34px]`}
            >
              {/* Figure */}
              <div className="flex items-baseline gap-2">
                <span className={`font-display text-[30px] font-semibold text-pulse-ink ${INK_LIFT}`}>
                  {t("pricing.currency")}
                </span>
                <span className="font-display text-[clamp(52px,9vw,62px)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                  {t("pricing.amount")}
                </span>
                <span className="mb-[11px] self-end text-[15px] text-canvas/65">
                  {t("pricing.per")}
                </span>
              </div>
              <p className="mt-2.5 text-[13px] text-canvas/65">{t("pricing.note")}</p>

              {/* Rows */}
              <div className="mt-7">
                <div className="flex justify-between gap-3 border-t border-canvas/10 py-[15px] text-[15px]">
                  <span>{t("pricing.rows.setup.label")}</span>
                  <span className="text-end tabular-nums text-canvas/65">
                    {t("pricing.rows.setup.value")}
                  </span>
                </div>
                <div className="flex justify-between gap-3 border-t border-canvas/10 py-[15px] text-[15px]">
                  <span>{t("pricing.rows.setupFree.label")}</span>
                  <span className={`text-end font-[650] tabular-nums text-pulse-ink ${INK_LIFT}`}>
                    {t("pricing.rows.setupFree.value")}
                  </span>
                </div>
                <div className="flex justify-between gap-3 border-t border-canvas/10 py-[15px] text-[15px]">
                  <span>{t("pricing.rows.trial.label")}</span>
                  <span className={`text-end font-[650] tabular-nums text-pulse-ink ${INK_LIFT}`}>
                    {t("pricing.rows.trial.value")}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-[30px] flex flex-wrap gap-3">
                <a
                  href={MAILTO_DEMO}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-2 rounded-full bg-canvas px-7 py-3.5 text-[15px] font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
                >
                  {t("pricing.ctaPrimary")}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100">
                    →
                  </span>
                </a>
                <a
                  href={MAILTO_QUOTE}
                  data-cursor="hover"
                  className={`inline-flex items-center rounded-full border border-canvas/25 ${INK_LIFT} px-7 py-3.5 text-[15px] font-medium text-canvas transition-colors duration-300 hover:border-canvas/45`}
                >
                  {t("pricing.ctaSecondary")}
                </a>
              </div>

              {/* Founder note — logical start-border (RTL-safe) */}
              <p className="mt-[22px] border-s-2 border-pulse-ink ps-[14px] text-[13.5px] leading-[1.6] text-canvas/65">
                {t("pricing.founderNote")}
              </p>
            </div>
          </Reveal>

          {/* Included card */}
          <Reveal>
            <div
              data-reveal
              className={`rounded-[18px] border border-canvas/10 ${INK_LIFT} p-8 shadow-[0_2px_4px_rgba(18,20,15,0.05),0_24px_60px_-18px_rgba(18,20,15,0.2)] lg:p-[34px]`}
            >
              <div className="mb-[18px] text-[12px] font-bold uppercase tracking-[0.11em] text-canvas/65">
                {t("pricing.inclTitle")}
              </div>
              <ul className="flex list-none flex-col gap-[13px]">
                {INCL.map((k) => (
                  <li
                    key={k}
                    className="grid grid-cols-[auto_1fr] items-start gap-3 text-[15px] leading-[1.4]"
                  >
                    <Check />
                    {t(`pricing.incl.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
