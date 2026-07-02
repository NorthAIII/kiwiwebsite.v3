import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CaseStudies from "@/components/CaseStudies";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";
  return {
    title: tr ? "Vaka çalışmaları — Kiwi AI Lab" : "Case studies — Kiwi AI Lab",
    description: tr
      ? "Sektör sektör kurduğumuz otomasyonlar: durum, akış ve getirdiği sonuç. Spor salonu yazılımı Alpfit canlıda."
      : "The automations we ship, sector by sector: situation, flow, and the outcome it drives. The gym software, Alpfit, is live.",
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "crewOs" });

  return (
    <SmoothScroll>
      <CustomCursor />
      <PageHeader back={t("back")} cta={t("cta")} />
      <CaseStudies />
      <Footer />
    </SmoothScroll>
  );
}
