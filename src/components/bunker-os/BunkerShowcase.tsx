"use client";

import { useTranslations } from "next-intl";
import LivingFlow from "@/components/living-flow/LivingFlow";
import FlowScrim from "@/components/living-flow/FlowScrim";
import Reveal from "@/components/Reveal";

export default function BunkerShowcase() {
  const t = useTranslations("bunkerOs");
  const tb = useTranslations("bunker");

  const steps = ["connect", "build", "run", "measure"] as const;
  const sources = ["one", "two", "three", "four"] as const;
  const channels = ["one", "two", "three"] as const;
  const metrics = ["flows", "triggered", "hours", "attention"] as const;
  const flows = [
    { key: "one", state: "running" },
    { key: "two", state: "running" },
    { key: "three", state: "running" },
    { key: "four", state: "queued" },
  ] as const;

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative flex min-h-[72svh] items-center overflow-hidden">
        <LivingFlow />
        <FlowScrim />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 lg:px-10">
          <Reveal className="max-w-3xl">
            <p
              data-reveal
              className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-green"
            >
              <span className="h-px w-8 bg-green/50" />
              {t("eyebrow")}
            </p>
            <h1 data-reveal className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98]">
              {t("title")}
            </h1>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {t("lead")}
            </p>
            <a
              data-reveal
              href="/#contact"
              data-cursor="hover"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
            >
              {t("cta")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="border-t border-line bg-canvas-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="mb-14">
            <h2 data-reveal className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">
              {t("diagram.title")}
            </h2>
          </Reveal>

          <Reveal data-reveal className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
            {/* Sources */}
            <Station label={t("diagram.sources")}>
              {sources.map((k) => (
                <Chip key={k}>{t(`diagram.sourceItems.${k}`)}</Chip>
              ))}
            </Station>

            <Track />

            {/* Core */}
            <div data-reveal className="relative grid place-items-center rounded-3xl border border-ink/15 bg-ink p-8 text-canvas">
              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-canvas/50">
                <span className="relative h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-pulse" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-pulse opacity-60" />
                </span>
                {t("diagram.core")}
              </span>
              <svg width="40" height="40" viewBox="0 0 22 22" aria-hidden className="text-pulse">
                <path
                  d="M4 16 C 8 16, 9 6, 14 6 M11 12 C 14 12, 15 16, 18 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="11" cy="11" r="2.4" fill="currentColor" />
              </svg>
              <p className="mt-4 font-display text-2xl">{t("diagram.core")}</p>
              <p className="mt-1 text-sm text-canvas/60">{t("diagram.coreNote")}</p>
            </div>

            <Track />

            {/* Channels */}
            <Station label={t("diagram.channels")}>
              {channels.map((k) => (
                <Chip key={k}>{t(`diagram.channelItems.${k}`)}</Chip>
              ))}
            </Station>
          </Reveal>

          {/* Measurement feedback */}
          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-line bg-canvas px-6 py-4">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-green">
              {t("diagram.measure")}
            </span>
            <span className="relative hidden h-px flex-1 overflow-hidden bg-line sm:block">
              <span
                className="absolute top-1/2 h-[3px] w-8 -translate-y-1/2 rounded-full bg-green"
                style={{ animation: "bunkerback 3s linear infinite" }}
              />
            </span>
            <span className="text-sm text-ink-soft">↺</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="mb-14 max-w-2xl">
          <p data-reveal className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
            {t("how.title")}
          </p>
        </Reveal>
        <Reveal className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {steps.map((k) => (
            <div key={k} data-reveal data-cursor="hover" className="group bg-canvas px-2 py-8 sm:px-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="font-display text-5xl text-green/30 transition-colors duration-500 group-hover:text-green">
                  {t(`how.steps.${k}.n`)}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mb-2 font-display text-xl">{t(`how.steps.${k}.title`)}</h3>
              <p className="text-[15px] leading-relaxed text-ink-soft">{t(`how.steps.${k}.body`)}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Live operation panel */}
      <section className="border-t border-line bg-canvas-deep/40">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="grid items-stretch gap-10 lg:grid-cols-2">
            {/* metrics */}
            <div data-reveal>
              <h2 className="mb-8 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">
                {t("panel.title")}
              </h2>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
                {metrics.map((m) => (
                  <div key={m} className="bg-canvas p-6">
                    <div className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-none text-green">
                      {t(`panel.metrics.${m}.value`)}
                    </div>
                    <p className="mt-2 text-sm text-ink-soft">{t(`panel.metrics.${m}.label`)}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-ink-faint">{t("panel.metricsNote")}</p>
            </div>

            {/* running flows */}
            <div
              data-reveal
              className="relative self-start overflow-hidden rounded-3xl border border-line bg-ink p-7 text-canvas shadow-[0_30px_80px_-40px_rgba(18,20,15,0.5)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg">Bunker OS</span>
                <span className="text-xs text-canvas/50">
                  {t("panel.live")} · 4 {t("panel.flowsLabel")}
                </span>
              </div>
              <div className="space-y-2.5">
                {flows.map((r, i) => (
                  <div
                    key={r.key}
                    className="flex items-center gap-3 rounded-xl bg-canvas/[0.06] px-4 py-3.5"
                  >
                    <span className="relative h-2 w-2 shrink-0">
                      <span
                        className={`absolute inset-0 rounded-full ${
                          r.state === "running" ? "bg-pulse" : "bg-canvas/30"
                        }`}
                      />
                    </span>
                    <span className="flex-1 text-sm text-canvas/85">{tb(`flows.${r.key}`)}</span>
                    <span className="relative hidden h-px w-20 overflow-hidden bg-canvas/15 sm:block">
                      {r.state === "running" && (
                        <span
                          className="absolute top-1/2 h-[3px] w-6 -translate-y-1/2 rounded-full bg-pulse"
                          style={{ animation: `flowpulse 2.4s ${i * 0.4}s linear infinite` }}
                        />
                      )}
                    </span>
                    <span className="w-14 text-right text-xs tabular-nums text-canvas/45">
                      {r.state === "running" ? tb("statusActive") : tb("statusQueued")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes flowpulse { 0% { left: -24px } 100% { left: 100% } }
        @keyframes bunkerback { 0% { left: 100% } 100% { left: -32px } }
      `}</style>
    </main>
  );
}

function Station({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="rounded-3xl border border-line bg-canvas p-6">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-canvas-deep/50 px-3.5 py-1.5 text-sm text-ink">
      {children}
    </span>
  );
}

/** Animated pulse track between diagram stations (desktop only). */
function Track() {
  return (
    <div data-reveal className="hidden items-center lg:flex">
      <span className="relative h-px w-full min-w-[2rem] overflow-hidden bg-line">
        <span
          className="absolute top-1/2 h-[3px] w-7 -translate-y-1/2 rounded-full bg-green"
          style={{ animation: "flowpulse 2.2s linear infinite" }}
        />
      </span>
    </div>
  );
}
