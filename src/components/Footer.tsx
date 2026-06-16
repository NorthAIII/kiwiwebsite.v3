"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Reveal from "./Reveal";

export default function Footer() {
  const t = useTranslations("footer");
  const year = 2026;

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-canvas">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <h2
            data-reveal
            className="font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.98]"
          >
            {t("tagline")}
          </h2>
          <a
            data-reveal
            href="mailto:kivanc@kiwiailab.com"
            data-cursor="hover"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-canvas px-7 py-4 text-[15px] font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            {t("cta")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <div className="mt-20 flex flex-col gap-6 border-t border-canvas/15 pt-8 text-sm text-canvas/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-medium text-canvas">Kiwi AI Lab</span>
            <span className="text-canvas/30">·</span>
            <a href="mailto:kivanc@kiwiailab.com" className="hover:text-canvas">
              kivanc@kiwiailab.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-canvas/40">{t("language")}</span>
            <LanguageSwitcher tone="soft" />
            <span className="text-canvas/40">
              © {year} {t("rights")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
