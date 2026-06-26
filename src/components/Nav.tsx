"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import KiwiMark from "./KiwiMark";

export default function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#how", label: t("howItWorks") },
    { href: "#sectors", label: t("sectors") },
    { href: "#bunker", label: t("bunker") },
    { href: "#forum", label: t("forum") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <a href="#top" data-cursor="hover" className="group flex items-center gap-2.5">
          <KiwiMark size={22} className="text-green" />
          <span className="text-[15px] font-semibold tracking-tight">Kiwi AI Lab</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <a
            href="#contact"
            data-cursor="hover"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
          >
            {t("cta")}
          </a>
        </div>
      </nav>
    </header>
  );
}
