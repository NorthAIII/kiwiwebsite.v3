"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const THREADS = ["one", "two", "three", "four"] as const;

export default function Forum() {
  const t = useTranslations("forum");

  return (
    <section id="forum" className="border-t border-line bg-canvas-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
        <Reveal className="mb-12 max-w-2xl">
          <p data-reveal className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
            {t("label")}
          </p>
          <h2 data-reveal className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
            {t("title")}
          </h2>
          <p data-reveal className="mt-4 text-lg text-ink-soft">
            {t("sub")}
          </p>
        </Reveal>

        <Reveal className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line" stagger={0.08}>
          {THREADS.map((k) => (
            <a
              key={k}
              href="#contact"
              data-reveal
              data-cursor="hover"
              className="group flex items-center gap-5 bg-canvas px-6 py-6 transition-colors hover:bg-canvas-deep/50 lg:px-8"
            >
              <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-green sm:grid">
                {/* flow-node mark */}
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <circle cx="8" cy="8" r="2.4" fill="currentColor" />
                  <path d="M2 8h3M11 8h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[15px] font-medium text-ink transition-colors group-hover:text-green sm:text-base">
                  {t(`threads.${k}.title`)}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-ink-faint">
                  {t(`threads.${k}.tag`)} · {t(`threads.${k}.replies`)} {t("repliesLabel")}
                </p>
              </div>
              <span className="shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
                →
              </span>
            </a>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-ink-faint">{t("note")}</p>
          <a
            href="#contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
          >
            {t("cta")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
