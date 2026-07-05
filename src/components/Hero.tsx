"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { Link } from "@/i18n/navigation";
import LivingFlow from "./living-flow/LivingFlow";
import FlowScrim from "./living-flow/FlowScrim";
import Magnetic from "./Magnetic";

export default function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero]", { y: 36 });
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 1.1 } })
        .to("[data-hero='l1']", { y: 0 }, 0.15)
        .to("[data-hero='l2']", { y: 0 }, 0.32)
        .to("[data-hero='sub']", { y: 0, duration: 0.9 }, 0.55)
        .to("[data-hero='cta']", { y: 0, duration: 0.9 }, 0.7)
        .to("[data-hero='stats']", { y: 0, duration: 0.9 }, 0.85);
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
      <FlowScrim />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-24 lg:px-10">
        <div className="max-w-4xl">
          <p
            data-hero="l1"
            className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-green"
          >
            <span className="h-px w-8 bg-green/50" />
            {t("eyebrow")}
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
            <Magnetic>
              <a
                href="#contact"
                data-cursor="hover"
                className="group relative inline-block overflow-hidden rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas"
              >
                <span className="relative z-10">{t("ctaPrimary")}</span>
                <span className="absolute inset-0 -translate-x-full bg-green transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
              </a>
            </Magnetic>
            <a
              href="#sectors"
              data-cursor="hover"
              className="group flex items-center gap-2 px-2 py-3.5 text-[15px] font-medium text-ink"
            >
              {t("ctaSecondary")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div
            data-hero="stats"
            className="mt-16 flex max-w-2xl flex-wrap items-center gap-x-8 gap-y-5 border-t border-line pt-6"
          >
            <Link
              href="/spor-salonu-yazilimi"
              data-cursor="hover"
              className="group flex items-center gap-2.5"
            >
              <span className="relative h-2 w-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-green" />
                <span className="absolute inset-0 animate-ping rounded-full bg-green opacity-60" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium text-ink transition-colors group-hover:text-green">
                  {t("stats.liveProduct")}
                </span>
                <span className="block text-xs uppercase tracking-[0.12em] text-ink-faint">
                  {t("stats.liveLabel")}
                </span>
              </span>
              <span className="text-ink-faint transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-green">
                →
              </span>
            </Link>

            <span className="h-8 w-px bg-line" />

            <Link
              href="/crew-os"
              data-cursor="hover"
              className="group flex items-center gap-2.5"
            >
              <svg width="18" height="18" viewBox="0 0 22 22" aria-hidden className="shrink-0 text-green">
                <path
                  d="M4 16 C 8 16, 9 6, 14 6 M11 12 C 14 12, 15 16, 18 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <circle cx="11" cy="11" r="2.1" fill="currentColor" />
              </svg>
              <span className="leading-tight">
                <span className="block text-sm font-medium text-ink transition-colors group-hover:text-green">
                  {t("stats.crewOs")}
                </span>
                <span className="block text-xs uppercase tracking-[0.12em] text-ink-faint">
                  {t("stats.crewOsLabel")}
                </span>
              </span>
              <span className="text-ink-faint transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-green">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-ink-faint md:flex">
        <span className="text-xs uppercase tracking-[0.2em]">{t("scroll")}</span>
        <span className="h-16 w-px animate-pulse bg-ink-faint/60" />
      </div>
    </section>
  );
}
