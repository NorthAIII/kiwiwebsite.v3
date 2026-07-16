"use client";

import { useTranslations } from "next-intl";
import LivingFlow from "@/components/living-flow/LivingFlow";
import FlowScrim from "@/components/living-flow/FlowScrim";
import Reveal from "@/components/Reveal";

/** Product-specific demo request — subject-scoped mailto (DECISIONS 2026-07-16). */
const MAILTO_DEMO = "mailto:kivanc@kiwiailab.com?subject=Alpfit%20Plus%20demo%20talebi";

const ROWS = ["one", "two", "three", "four"] as const;

/**
 * Alpfit Plus hero — signature Living Flow field preserved (Craft üst eksen),
 * two-column: left copy (pilot chip → H1 with pixel-mark → sub → CTAs → note),
 * right an opaque `bg-surface` before/after compare card that lifts cleanly off
 * the flow. FlowScrim keeps the left copy legible over the particle field.
 * Logical/`rtl:` direction so AR mirrors correctly; the `.dot` pulse and Reveal
 * are motion-gated by the global reduced-motion rules.
 */
export default function AlpfitHero() {
  const t = useTranslations("alpfit");

  return (
    <section className="relative flex min-h-[72svh] items-center overflow-hidden">
      <LivingFlow />
      <FlowScrim />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10">
        {/* Left column — copy */}
        <Reveal>
          <p
            data-reveal
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium text-ink-soft shadow-[0_1px_2px_rgba(18,20,15,0.05)]"
          >
            {/* live pilot indicator — genuine live product, so the pulse is honest */}
            <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-green" />
              <span className="absolute inset-0 animate-ping rounded-full bg-pulse opacity-60" />
            </span>
            {t("hero.pilot")}
          </p>

          <h1
            data-reveal
            className="font-display text-[clamp(2.4rem,5.6vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.02em] text-balance"
          >
            {t("hero.h1lead")}
            <span className="relative inline-block whitespace-nowrap text-green">
              <span className="relative z-10">{t("hero.h1mark")}</span>
              {/* pixel-mark underline — pulse token, decorative */}
              <span
                aria-hidden
                className="absolute inset-x-[-0.08em] bottom-[0.08em] h-[0.3em] rounded bg-pulse/40"
              />
            </span>
            {t("hero.h1tail")}
          </h1>

          <p data-reveal className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ink-soft">
            {t("hero.sub")}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <a
              href={MAILTO_DEMO}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
            >
              {t("hero.ctaPrimary")}
              <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100">
                →
              </span>
            </a>
            <a
              href="#fiyat"
              data-cursor="hover"
              className="inline-flex items-center rounded-full border border-line bg-surface px-7 py-3.5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-ink-faint"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <p data-reveal className="mt-5 text-[13.5px] text-ink-faint">
            {t("hero.note")}
          </p>
        </Reveal>

        {/* Right column — before/after compare card (opaque surface over the flow) */}
        <Reveal>
          <div
            data-reveal
            className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_24px_60px_-18px_rgba(18,20,15,0.18)]"
          >
            <div className="grid grid-cols-[1fr_1px_1fr]">
              {/* today */}
              <div className="flex flex-col gap-1 bg-canvas-deep p-[22px]">
                <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                  {t("hero.compare.todayLabel")}
                </div>
                {ROWS.map((k) => (
                  <div key={k} className="py-1.5 text-sm text-ink-faint">
                    <s className="decoration-green/60 decoration-2">{t(`hero.compare.today.${k}`)}</s>
                  </div>
                ))}
              </div>

              {/* hairline divider */}
              <div aria-hidden className="bg-line" />

              {/* after */}
              <div className="flex flex-col gap-1 p-[22px]">
                <div className="mb-3.5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-green">
                  {t("hero.compare.afterLabel")}
                  <span className="font-display text-[14px] normal-case">+</span>
                </div>
                {ROWS.map((k) => (
                  <div key={k} className="flex items-center gap-2 py-1.5 text-sm font-medium text-ink">
                    <span aria-hidden className="shrink-0 font-bold text-green rtl:-scale-x-100">
                      →
                    </span>
                    {t(`hero.compare.after.${k}`)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
