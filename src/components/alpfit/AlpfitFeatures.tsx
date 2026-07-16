"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

/**
 * Nine-feature grid — "Kulübün tamamını yönetir." Fixed key array + map (crew
 * pattern, no JSON arrays): each cell reads title `features.fN.t` + description
 * `features.fN.d`. Ports the artifact `.features` — 3 cols → 2 → 1 with a 1px
 * hairline (gap-px over bg-line) and surface cells that tint green on hover.
 */
const FEATURES = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"] as const;

export default function AlpfitFeatures() {
  const t = useTranslations("alpfit");

  return (
    <section
      id="ozellikler"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
    >
      {/* Section head — eyebrow + title (no sub, artifact) */}
      <Reveal className="mb-12 max-w-[64ch]">
        <p
          data-reveal
          className="mb-[18px] inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-green before:h-0.5 before:w-5 before:rounded-[2px] before:bg-current before:opacity-55 before:content-['']"
        >
          {t("features.eyebrow")}
        </p>
        <h2
          data-reveal
          className="font-display text-[clamp(30px,4.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.021em] text-balance"
        >
          {t("features.title")}
        </h2>
      </Reveal>

      {/* Feature grid — 1px hairline (gap-px + bg-line); cells stay opaque surface */}
      <Reveal
        className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.05}
      >
        {FEATURES.map((k) => (
          <div
            key={k}
            data-reveal
            className="flex flex-col gap-[9px] bg-surface px-[25px] py-[27px] transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--color-green)_5%,var(--color-surface))]"
          >
            <h3 className="text-[19px] font-semibold tracking-[-0.015em]">
              {t(`features.${k}.t`)}
            </h3>
            <p className="text-sm leading-[1.5] text-ink-soft">
              {t(`features.${k}.d`)}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
