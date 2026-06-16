"use client";

import { useEffect, useState } from "react";

/** Light is the default; this toggles the dark alternative and persists it. */
export default function ThemeToggle({ tone = "ink" }: { tone?: "ink" | "soft" }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
    window.dispatchEvent(new Event("themechange"));
  };

  const color = tone === "soft" ? "text-canvas/70 hover:text-canvas" : "text-ink-soft hover:text-ink";

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="hover"
      aria-label={dark ? "Aydınlık tema / Light" : "Koyu tema / Dark"}
      aria-pressed={dark}
      className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${color}`}
    >
      {/* render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && dark ? (
        // sun
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        // moon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
