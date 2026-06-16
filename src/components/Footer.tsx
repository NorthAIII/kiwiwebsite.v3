"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

// Only entries with a real URL are rendered (see filter below) — we never ship
// dead "#" links. Fill the href as each handle goes live.
const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/KiwiAILab",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H10V9Z" />
      </svg>
    ),
  },
];

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
          <div data-reveal className="mt-10">
            <Magnetic>
              <a
                href="mailto:kivanc@kiwiailab.com"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 rounded-full bg-canvas px-7 py-4 text-[15px] font-medium text-ink"
              >
                {t("cta")}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-6 border-t border-canvas/15 pt-8 text-sm text-canvas/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-medium text-canvas">Kiwi AI Lab</span>
            <span className="text-canvas/30">·</span>
            <a href="mailto:kivanc@kiwiailab.com" className="hover:text-canvas">
              kivanc@kiwiailab.com
            </a>
            <span className="text-canvas/30">·</span>
            <div className="flex items-center gap-1">
              {SOCIALS.filter((s) => s.href !== "#").map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  data-cursor="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-full text-canvas/60 transition-colors hover:bg-canvas/10 hover:text-canvas"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-canvas/40">{t("language")}</span>
            <LanguageSwitcher tone="soft" drop="up" />
            <span className="text-canvas/40">
              © {year} {t("rights")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
