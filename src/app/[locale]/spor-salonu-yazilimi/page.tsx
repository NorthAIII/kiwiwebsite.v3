import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import AlpfitShowcase from "@/components/alpfit/AlpfitShowcase";
import { localizedAlternates } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "alpfit" });
  return {
    title: `${t("meta.title")} — Kiwi AI Lab`,
    description: t("meta.description"),
    alternates: localizedAlternates(locale, "/spor-salonu-yazilimi"),
  };
}

export default async function GymSoftwarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "alpfit" });

  return (
    <SmoothScroll>
      <CustomCursor />
      <PageHeader back={t("back")} cta={t("cta")} />
      <AlpfitShowcase />
      <Footer />
    </SmoothScroll>
  );
}
