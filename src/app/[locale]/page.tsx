import { setRequestLocale } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SectorSolutions from "@/components/SectorSolutions";
import Bunker from "@/components/Bunker";
import Forum from "@/components/Forum";
import Chatbot from "@/components/Chatbot";
import Credibility from "@/components/Credibility";
import Footer from "@/components/Footer";

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
      <main>
        <Hero />
        <HowItWorks />
        <SectorSolutions />
        <Bunker />
        <Forum />
        <Chatbot />
        <Credibility />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
