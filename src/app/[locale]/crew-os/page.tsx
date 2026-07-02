import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import BunkerShowcase from "@/components/bunker-os/BunkerShowcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "crewOs" });
  return { title: `${t("title")} — Kiwi AI Lab`, description: t("lead") };
}

export default async function BunkerOsPage({
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
      <BunkerShowcase />
      <Footer />
    </SmoothScroll>
  );
}
