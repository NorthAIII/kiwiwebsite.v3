"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// No backend yet — submitting opens the visitor's mail client addressed to us.
// Swap the onSubmit for a real ESP/API call when one is wired up.
export default function BulletinSubscribe() {
  const t = useTranslations("forum.subscribe");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const href = `mailto:kivanc@kiwiailab.com?subject=${encodeURIComponent(
      t("subject"),
    )}&body=${encodeURIComponent(email)}`;
    window.location.href = href;
    setDone(true);
  }

  if (done) {
    return <p className="text-sm text-green">{t("done")}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm items-center gap-2 sm:w-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("placeholder")}
        className="min-w-0 flex-1 rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink/40 sm:w-56"
      />
      <button
        type="submit"
        data-cursor="hover"
        className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
      >
        {t("button")}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
