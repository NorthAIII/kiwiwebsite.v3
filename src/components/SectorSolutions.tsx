"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import Reveal from "./Reveal";

const KEYS = ["gyms", "clinics", "ecommerce", "realestate"] as const;
type Key = (typeof KEYS)[number];

export default function SectorSolutions() {
  const t = useTranslations("sectors");
  const [active, setActive] = useState<Key>("gyms");
  const panelRef = useRef<HTMLDivElement>(null);

  const select = (k: Key) => {
    if (k === active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !panelRef.current) {
      setActive(k);
      return;
    }
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 14,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setActive(k);
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      },
    });
  };

  return (
    <section id="sectors" className="relative border-y border-line bg-canvas-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
        <Reveal className="mb-12 max-w-2xl">
          <p
            data-reveal
            className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green"
          >
            {t("label")}
          </p>
          <h2 data-reveal className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
            {t("title")}
          </h2>
          <p data-reveal className="mt-4 text-lg text-ink-soft">
            {t("sub")}
          </p>
        </Reveal>

        <div className="flex flex-wrap gap-2.5">
          {KEYS.map((k) => (
            <button
              key={k}
              data-cursor="hover"
              onClick={() => select(k)}
              aria-pressed={active === k}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === k
                  ? "border-ink bg-ink text-canvas"
                  : "border-line text-ink-soft hover:border-ink/40 hover:text-ink"
              }`}
            >
              {t(`items.${k}.name`)}
            </button>
          ))}
        </div>

        <div
          ref={panelRef}
          className="mt-10 grid gap-10 rounded-3xl border border-line bg-canvas p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-14"
        >
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
              {t(`items.${active}.name`)} · {t("oneAutomation")}
            </p>
            <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-tight">
              {t(`items.${active}.automation`)}
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              {t(`items.${active}.body`)}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-ink p-8 text-canvas">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-canvas/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-canvas/60">
              {t("projected")}
            </span>
            <div>
              <div className="font-display text-[clamp(3rem,7vw,5rem)] leading-none text-pulse">
                {t(`items.${active}.metricValue`)}
              </div>
              <p className="mt-3 text-[15px] text-canvas/70">{t(`items.${active}.metric`)}</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-ink-faint">{t("note")}</p>
      </div>
    </section>
  );
}
