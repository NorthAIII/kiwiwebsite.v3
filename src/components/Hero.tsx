"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import LivingFlow from "./living-flow/LivingFlow";

export default function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero]", { opacity: 0, y: 36 });
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 1.1 } })
        .to("[data-hero='l1']", { opacity: 1, y: 0 }, 0.15)
        .to("[data-hero='l2']", { opacity: 1, y: 0 }, 0.32)
        .to("[data-hero='sub']", { opacity: 1, y: 0, duration: 0.9 }, 0.55)
        .to("[data-hero='cta']", { opacity: 1, y: 0, duration: 0.9 }, 0.7)
        .to("[data-hero='stats']", { opacity: 1, y: 0, duration: 0.9 }, 0.85);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <LivingFlow />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-24 lg:px-10">
        <div className="max-w-4xl">
          <p
            data-hero="l1"
            className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-green"
          >
            <span className="h-px w-8 bg-green/50" />
            AI automation, measured
          </p>

          <h1 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.98]">
            <span data-hero="l1" className="block">
              {t("lineOne")}
            </span>
            <span data-hero="l2" className="block text-green">
              {t("lineTwo")}
            </span>
          </h1>

          <p
            data-hero="sub"
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {t("sub")}
          </p>

          <div data-hero="cta" className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              data-cursor="hover"
              className="group relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas"
            >
              <span className="relative z-10">{t("ctaPrimary")}</span>
              <span className="absolute inset-0 -translate-x-full bg-green transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
            </a>
            <a
              href="#sectors"
              data-cursor="hover"
              className="group flex items-center gap-2 px-2 py-3.5 text-[15px] font-medium text-ink"
            >
              {t("ctaSecondary")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <dl
            data-hero="stats"
            className="mt-16 flex max-w-2xl flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6"
          >
            {[
              { n: "3", label: t("stats.products") },
              { n: "7/24", label: t("stats.assistants") },
              { n: "1:1", label: t("stats.founder") },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2.5">
                <dt className="font-display text-2xl text-green">{s.n}</dt>
                <dd className="max-w-[9rem] text-sm leading-tight text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint md:flex">
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-ink-faint/40" />
      </div>
    </section>
  );
}
