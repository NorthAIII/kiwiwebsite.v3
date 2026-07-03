import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import ArticleAiSdr from "@/components/forum/ArticleAiSdr";
import { localizedAlternates } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forum" });
  return {
    title: `${t("featured.title")} — Kiwi AI Lab`,
    description: t("featured.excerpt"),
    alternates: localizedAlternates(locale, "/bulten/ai-sdr-araclari"),
  };
}

export default async function AiSdrArticlePage({
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
      <ArticleAiSdr />
      <Footer />
    </SmoothScroll>
  );
}
