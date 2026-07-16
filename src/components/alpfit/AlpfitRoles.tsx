"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

/**
 * Four-role card grid — "Herkes kendi ekranından." Each role's `device` drives
 * both the icon (phone / monitor) and reads alongside the i18n `dev` badge:
 * member & trainer are phone apps, dietitian & management are web panels.
 * Named-key + map consumption (crew pattern) — no JSON arrays, no copy-code.
 */
const ROLES = [
  { key: "member", device: "phone" },
  { key: "trainer", device: "phone" },
  { key: "dietitian", device: "monitor" },
  { key: "management", device: "monitor" },
] as const;

const ITEMS = ["one", "two", "three", "four"] as const;

/** Decorative role icon — the role title carries the meaning. */
function RoleIcon({ device }: { device: "phone" | "monitor" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden
    >
      {device === "phone" ? (
        <>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <line x1="11" y1="18.5" x2="13" y2="18.5" />
        </>
      ) : (
        <>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </>
      )}
    </svg>
  );
}

export default function AlpfitRoles() {
  const t = useTranslations("alpfit");

  return (
    <section
      id="roller"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
    >
      {/* Section head */}
      <Reveal className="mb-12 max-w-[64ch]">
        <p
          data-reveal
          className="mb-[18px] inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-green before:h-0.5 before:w-5 before:rounded-[2px] before:bg-current before:opacity-55 before:content-['']"
        >
          {t("roles.eyebrow")}
        </p>
        <h2
          data-reveal
          className="font-display text-[clamp(30px,4.2vw,44px)] font-semibold leading-[1.08] tracking-[-0.021em] text-balance"
        >
          {t("roles.title")}
        </h2>
        <p
          data-reveal
          className="mt-[18px] max-w-[58ch] text-[18.5px] leading-[1.55] text-ink-soft"
        >
          {t("roles.sub")}
        </p>
      </Reveal>

      {/* Role cards */}
      <Reveal className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {ROLES.map(({ key, device }) => (
          <div
            key={key}
            data-reveal
            className="flex flex-col gap-[14px] rounded-[18px] border border-line bg-surface p-[26px] shadow-[0_1px_2px_rgba(18,20,15,0.05),0_8px_24px_-8px_rgba(18,20,15,0.10)] transition-[translate,box-shadow,border-color] duration-200 ease-out hover:-translate-y-[3px] hover:border-green/40 hover:shadow-[0_2px_4px_rgba(18,20,15,0.05),0_24px_60px_-18px_rgba(18,20,15,0.18)]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-[12px] border border-green/20 bg-green/[0.13] text-green">
              <RoleIcon device={device} />
            </span>
            <h3 className="flex flex-wrap items-center gap-2.5 font-display text-[21px] font-semibold tracking-[-0.015em]">
              {t(`roles.${key}.title`)}
              <span className="rounded-[6px] border border-line px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.07em] text-ink-faint">
                {t(`roles.${key}.dev`)}
              </span>
            </h3>
            <ul className="flex list-none flex-col gap-[9px]">
              {ITEMS.map((i) => (
                <li
                  key={i}
                  className="relative ps-[18px] text-sm leading-[1.45] text-ink-soft before:absolute before:start-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-green/60 before:content-['']"
                >
                  {t(`roles.${key}.items.${i}`)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
