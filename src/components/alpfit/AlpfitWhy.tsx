"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

/**
 * "Neden Alpfit Plus" — competitive why-list + a dark pull-quote aside.
 *
 * Two columns (1.12fr / 1fr, single on mobile): the left `why-list` opens with a
 * green-tinted lead card (dietitian differentiator + "18 rakip" honesty badge)
 * then four plain, top-ruled items; the right `<aside>` is the site's ink-panel
 * inversion (`bg-ink text-canvas` + adaptive `text-pulse-ink` accent — NO new
 * `--band-*` token). The aside flips to cream in dark theme by design (site
 * convention, memory: tema-fix-html-dark-token-flip); its muted source line uses
 * `text-canvas/65` — the AA-safe muted level on flipping ink panels (TASK-8.02),
 * one step above the artifact's `--band-soft` which fails AA on the dark-theme
 * cream flip. Named-key + map consumption (crew pattern) — no JSON arrays.
 */
const ITEMS = ["mobile", "multibranch", "nohardware", "singlesource"] as const;

export default function AlpfitWhy() {
  const t = useTranslations("alpfit");

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
      {/* Section head — eyebrow + title (no sub, artifact) */}
      <Reveal className="mb-12 max-w-[64ch]">
        <p
          data-reveal
          className="mb-[18px] inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-green before:h-0.5 before:w-5 before:rounded-[2px] before:bg-current before:opacity-55 before:content-['']"
        >
          {t("why.eyebrow")}
        </p>
        <h2
          data-reveal
          className="font-display text-[clamp(30px,4.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.021em] text-balance"
        >
          {t("why.title")}
        </h2>
      </Reveal>

      {/* Why: two-column (1.12fr / 1fr) → single column below lg */}
      <div className="grid items-start gap-8 lg:grid-cols-[1.12fr_1fr] lg:gap-[50px]">
        {/* Left — why-list: lead card + four top-ruled items */}
        <Reveal className="flex flex-col" stagger={0.06}>
          <div
            data-reveal
            className="mb-2 rounded-2xl border border-green/25 bg-[color-mix(in_srgb,var(--color-green)_8%,var(--color-surface))] p-6"
          >
            <h3 className="mb-2 text-[20px] font-semibold tracking-[-0.015em]">
              {t("why.lead.t")}
            </h3>
            <p className="text-[15px] leading-[1.55] text-ink-soft">
              {t("why.lead.d")}
            </p>
            <span className="mt-3 inline-flex items-center gap-[7px] text-[12.5px] font-[650] text-green before:h-1.5 before:w-1.5 before:rounded-full before:bg-green before:content-['']">
              {t("why.lead.badge")}
            </span>
          </div>

          {ITEMS.map((k) => (
            <div key={k} data-reveal className="border-t border-line py-6">
              <h3 className="mb-2 text-[20px] font-semibold tracking-[-0.015em]">
                {t(`why.items.${k}.t`)}
              </h3>
              <p className="text-[15px] leading-[1.55] text-ink-soft">
                {t(`why.items.${k}.d`)}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Right — dark aside: site ink-panel inversion, sticky on desktop.
            No decorative glow: the site's ink panels (Crew OS / Footer) carry none,
            and a translucent radial over the accent word breaks axe's background
            resolution in light theme (false-flags text-pulse-ink at 1.5:1). */}
        <aside className="self-start rounded-[18px] bg-ink p-8 text-canvas shadow-[0_2px_4px_rgba(18,20,15,0.05),0_24px_60px_-18px_rgba(18,20,15,0.2)] lg:sticky lg:top-24">
          <Reveal stagger={0.1}>
            <p
              data-reveal
              className="font-display text-[24px] font-medium leading-[1.32] tracking-[-0.01em]"
            >
              {t.rich("why.asideQ", {
                // Accent inherits the panel's own bg-ink so axe resolves its
                // contrast against the opaque panel (11.5:1) instead of the page
                // canvas — a small off-viewport inline node otherwise mis-resolves
                // to <body> and false-flags at 1.5:1. Same colour as the panel:
                // visually seamless, keeps the pulse-ink highlight.
                b: (chunks) => (
                  <b className="bg-ink font-semibold text-pulse-ink">{chunks}</b>
                ),
              })}
            </p>
            <p
              data-reveal
              className="mt-[22px] border-t border-canvas/15 pt-5 text-[13.5px] leading-[1.6] text-canvas/65"
            >
              {t("why.asideSrc")}
            </p>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
