import { Fraunces, Geist } from "next/font/google";
import LivingFlow from "@/components/living-flow/LivingFlow";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Global 404 — catches every URL that never matches the `[locale]` segment.
// Self-contained <html>/<body> because it renders under the bare root layout.
// TR is primary; a short EN line keeps it friendly for non-Turkish visitors.
export default function GlobalNotFound() {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="grain">
        <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 text-center">
          <LivingFlow />
          <div className="relative z-10">
            <p className="font-display text-[clamp(5rem,18vw,12rem)] leading-none text-green">
              404
            </p>
            <h1 className="mt-2 font-display text-[clamp(1.6rem,4vw,2.6rem)]">
              Burada bir akış yok.
            </h1>
            <p className="mt-3 text-ink-soft">This page isn’t wired up.</p>
            <a
              href="/"
              data-cursor="hover"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-canvas transition-transform duration-300 hover:scale-[1.03]"
            >
              Ana sayfa / Home
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
