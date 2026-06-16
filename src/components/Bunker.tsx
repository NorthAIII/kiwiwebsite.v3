"use client";

import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const RUNNING = [
  { name: "Lapsed-member win-back", state: "running" },
  { name: "No-show recovery", state: "running" },
  { name: "Abandoned-cart reply", state: "running" },
  { name: "Lead → viewing", state: "queued" },
];

export default function Bunker() {
  const t = useTranslations("bunker");
  const points = ["one", "two", "three"] as const;

  return (
    <section id="bunker" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p data-reveal className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
            {t("label")}
          </p>
          <h2 data-reveal className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
            {t("title")}
          </h2>
          <p data-reveal className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            {t("body")}
          </p>
          <ul data-reveal className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px]">
                <span className="h-1.5 w-1.5 rounded-full bg-green" />
                {t(`points.${p}`)}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* the one strong visual — the operating layer, alive */}
        <Reveal>
          <div
            data-reveal
            className="relative overflow-hidden rounded-3xl border border-line bg-ink p-7 text-canvas shadow-[0_30px_80px_-40px_rgba(18,20,15,0.5)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg">Bunker OS</span>
              <span className="text-xs text-canvas/50">live · 4 flows</span>
            </div>
            <div className="space-y-2.5">
              {RUNNING.map((r, i) => (
                <div
                  key={r.name}
                  className="flex items-center gap-3 rounded-xl bg-canvas/[0.06] px-4 py-3.5"
                >
                  <span className="relative h-2 w-2 shrink-0">
                    <span
                      className={`absolute inset-0 rounded-full ${
                        r.state === "running" ? "bg-pulse" : "bg-canvas/30"
                      }`}
                    />
                  </span>
                  <span className="flex-1 text-sm text-canvas/85">{r.name}</span>
                  {/* travelling pulse along a track — the Living Flow motif */}
                  <span className="relative hidden h-px w-24 overflow-hidden bg-canvas/15 sm:block">
                    {r.state === "running" && (
                      <span
                        className="absolute top-1/2 h-[3px] w-6 -translate-y-1/2 rounded-full bg-pulse"
                        style={{ animation: `flowpulse 2.4s ${i * 0.4}s linear infinite` }}
                      />
                    )}
                  </span>
                  <span className="w-16 text-right text-xs tabular-nums text-canvas/45">
                    {r.state === "running" ? "active" : "queued"}
                  </span>
                </div>
              ))}
            </div>
            <style>{`@keyframes flowpulse{0%{left:-24px}100%{left:100%}}`}</style>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
