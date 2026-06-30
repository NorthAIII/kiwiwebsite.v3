"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  tr: "Türkçe",
  en: "English",
  ar: "العربية",
  de: "Deutsch",
  es: "Español",
};

/**
 * Globe trigger that opens a small language menu (§2). Persistent, manual;
 * geo auto-switch is layered on in Phase 2.
 */
export default function LanguageSwitcher({
  tone = "ink",
  drop = "down",
}: {
  tone?: "ink" | "soft";
  drop?: "down" | "up";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (l: string) => {
    setOpen(false);
    if (l !== locale) startTransition(() => router.replace(pathname, { locale: l }));
  };

  const triggerColor = tone === "soft" ? "text-canvas/70 hover:text-canvas" : "text-ink-soft hover:text-ink";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        data-cursor="hover"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${LABELS[locale]} (${locale.toUpperCase()})`}
        className={`flex items-center gap-1.5 rounded-full px-1.5 py-1 transition-colors ${triggerColor}`}
      >
        {/* globe */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        <span className="text-xs font-medium uppercase">{locale}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute right-0 z-50 min-w-[9rem] overflow-hidden rounded-xl border border-line bg-canvas py-1 shadow-[0_20px_50px_-20px_rgba(18,20,15,0.4)] ${
            drop === "up" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                disabled={pending}
                onClick={() => select(l)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-canvas-deep ${
                  l === locale ? "text-green" : "text-ink"
                }`}
              >
                {LABELS[l]}
                {l === locale && <span className="text-green">•</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
