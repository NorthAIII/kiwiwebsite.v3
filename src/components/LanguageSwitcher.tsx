"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  en: "EN",
  ar: "AR",
  de: "DE",
  es: "ES",
};

/** Persistent manual language switcher (§2). Geo auto-switch is layered on in Phase 2. */
export default function LanguageSwitcher({ tone = "ink" }: { tone?: "ink" | "soft" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={`flex items-center gap-1 text-xs font-medium ${
        tone === "soft" ? "text-canvas/60" : "text-ink-soft"
      }`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          data-cursor="hover"
          aria-current={l === locale ? "true" : undefined}
          disabled={pending}
          onClick={() => startTransition(() => router.replace(pathname, { locale: l }))}
          className={`rounded px-1.5 py-0.5 transition-colors hover:text-green ${
            l === locale ? "text-green" : ""
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
