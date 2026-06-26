"use client";

import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import KiwiMark from "./KiwiMark";

/** Lightweight header for sub-pages (logo → home, language, CTA). */
export default function PageHeader({ back, cta }: { back: string; cta: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link href="/" data-cursor="hover" className="group flex items-center gap-2.5">
          <KiwiMark size={22} className="text-green" />
          <span className="text-[15px] font-semibold tracking-tight">Kiwi AI Lab</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            data-cursor="hover"
            className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:inline"
          >
            ← {back}
          </Link>
          <ThemeToggle />
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
