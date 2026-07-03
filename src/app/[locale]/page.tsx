import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { localizedAlternates } from "@/i18n/metadata";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import FlowBackdrop from "@/components/living-flow/FlowBackdrop";
import FlowVeil from "@/components/living-flow/FlowVeil";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SectorSolutions from "@/components/SectorSolutions";
import Bunker from "@/components/Bunker";
import Forum from "@/components/Forum";
import Chatbot from "@/components/Chatbot";
import Credibility from "@/components/Credibility";
import Footer from "@/components/Footer";

// Ana sayfa self-canonical + 5-dil hreflang alternates. title/description/openGraph
// layout'tan sığ-merge ile gelir (burada yalnız alternates döndürülür → drift yok).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localizedAlternates(locale, "") };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Nav />
      {/* Page-level Living Flow layer (desktop/high-power) — sits behind the
          content (main/Footer are relative z-10) and above the opaque body bg. */}
      <FlowBackdrop />
      <main className="relative z-10">
        <Hero />
        {/* Below-hero sections share one readability veil that scrolls with the
            content, washing the fixed Living Flow back so body copy always wins
            while the field stays visible (B1 / TK3). Hero stays unveiled = full
            intensity. Sections keep their own backgrounds for per-section lift. */}
        <div className="relative isolate">
          <FlowVeil />
          <div className="relative z-10">
            <HowItWorks />
            <SectorSolutions />
            <Bunker />
            <Forum />
            <Chatbot />
            <Credibility />
          </div>
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </SmoothScroll>
  );
}
