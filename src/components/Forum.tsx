"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "./Reveal";
import BulletinSubscribe from "./BulletinSubscribe";

export default function Forum() {
  const t = useTranslations("forum");

  return (
    <section id="forum" className="border-t border-line bg-canvas-deep/40">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
        <Reveal className="mb-12 max-w-2xl">
          <p data-reveal className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
            {t("label")}
          </p>
          <h2 data-reveal className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
            {t("title")}
          </h2>
          <p data-reveal className="mt-4 text-lg text-ink-soft">
            {t("sub")}
          </p>
        </Reveal>

        {/* Featured content — the first real article */}
        <Reveal className="mb-5">
          <Link
            href="/bulten/ai-sdr-araclari"
            data-reveal
            data-cursor="hover"
            className="group block overflow-hidden rounded-3xl border border-line bg-canvas p-8 transition-colors hover:border-ink/30 lg:p-10"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-green">
              {t("featured.kicker")}
            </p>
            <h3 className="max-w-2xl font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.05] transition-colors group-hover:text-green">
              {t("featured.title")}
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              {t("featured.excerpt")}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <span className="rounded-full bg-canvas-deep px-3 py-1 text-xs text-ink-soft">
                {t("featured.tag")}
              </span>
              <span className="text-ink-faint">{t("featured.readingTime")}</span>
              <span className="ml-auto flex items-center gap-2 font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                {t("featured.cta")} →
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Second published article — Claude models news */}
        <Reveal className="mb-5">
          <Link
            href="/bulten/claude-opus-4-8-fable-5"
            data-reveal
            data-cursor="hover"
            className="group block overflow-hidden rounded-3xl border border-line bg-canvas p-8 transition-colors hover:border-ink/30 lg:p-10"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-green">
              {t("featured2.kicker")}
            </p>
            <h3 className="max-w-2xl font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.05] transition-colors group-hover:text-green">
              {t("featured2.title")}
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              {t("featured2.excerpt")}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <span className="rounded-full bg-canvas-deep px-3 py-1 text-xs text-ink-soft">
                {t("featured2.tag")}
              </span>
              <span className="text-ink-faint">{t("featured2.readingTime")}</span>
              <span className="ml-auto flex items-center gap-2 font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                {t("featured2.cta")} →
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <div className="max-w-xs">
            <p className="text-sm font-medium text-ink">{t("cta")}</p>
            <p className="mt-1 text-xs text-ink-faint">{t("note")}</p>
          </div>
          <BulletinSubscribe />
        </div>
      </div>
    </section>
  );
}
