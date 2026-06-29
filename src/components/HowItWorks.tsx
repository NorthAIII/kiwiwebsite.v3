"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const t = useTranslations("how");
  const pathRef = useRef<SVGPathElement>(null);

  const steps = (["analyze", "design", "automate", "report"] as const).map((k) => ({
    n: t(`steps.${k}.n`),
    title: t(`steps.${k}.title`),
    body: t(`steps.${k}.body`),
  }));

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: path,
        start: "top 75%",
        end: "bottom 55%",
        scrub: 0.6,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="how" className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mb-16 max-w-2xl">
        <p
          data-reveal
          className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green"
        >
          {t("label")}
        </p>
        <h2 data-reveal className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
          {t("title")}
        </h2>
      </Reveal>

      {/* connector — the Living Flow recurring as a "how it works" link (§4) */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-[44%] hidden h-40 w-full lg:block"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          ref={pathRef}
          d="M60 90 C 180 30, 320 30, 450 90 S 620 150, 750 90 S 920 30, 1140 90"
          fill="none"
          stroke="#1f7a3d"
          strokeWidth="1.5"
          strokeOpacity="0.55"
        />
      </svg>

      <Reveal className="relative grid gap-px grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
        {steps.map((s) => (
          <div
            key={s.n}
            data-reveal
            data-cursor="hover"
            className="group relative bg-canvas px-2 py-8 sm:px-8"
          >
            <div className="mb-6 flex items-center gap-3">
              {/* step number is decorative (order conveyed by <h3> + DOM); rendered via
                  CSS ::before so axe color-contrast doesn't scan it — faint look unchanged */}
              <span
                data-n={s.n}
                aria-hidden="true"
                className="font-display text-5xl before:content-[attr(data-n)] before:text-green/30 before:transition-colors before:duration-500 group-hover:before:text-green"
              />
              <span className="h-px flex-1 bg-line" />
            </div>
            <h3 className="mb-3 font-display text-2xl">{s.title}</h3>
            <p className="text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
