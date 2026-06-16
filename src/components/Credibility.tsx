"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

export default function Credibility() {
  const t = useTranslations("credibility");
  const cards = ["founder", "always", "measured"] as const;

  return (
    <section className="border-t border-line bg-canvas-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mb-14 max-w-2xl">
          <h2 data-reveal className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal className="grid gap-10 sm:grid-cols-3" stagger={0.12}>
          {cards.map((c) => (
            <div key={c} data-reveal>
              <h3 className="mb-3 font-display text-xl text-green">{t(`${c}.title`)}</h3>
              <p className="text-[15px] leading-relaxed text-ink-soft">{t(`${c}.body`)}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
