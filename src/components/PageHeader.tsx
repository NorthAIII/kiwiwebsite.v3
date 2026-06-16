"use client";

import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

/** Lightweight header for sub-pages (logo → home, language, CTA). */
export default function PageHeader({ back, cta }: { back: string; cta: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link href="/" data-cursor="hover" className="group flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="text-green">
            <path
              d="M4 16 C 8 16, 9 6, 14 6 M11 12 C 14 12, 15 16, 18 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="11" cy="11" r="2.1" fill="currentColor" />
          </svg>
          <span className="text-[15px] font-semibold tracking-tight">Kiwi AI Lab</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            data-cursor="hover"
            className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:inline"
          >
            ← {back}
          </Link>
          <LanguageSwitcher />
          <a
            href="/#contact"
            data-cursor="hover"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
          >
            {cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
