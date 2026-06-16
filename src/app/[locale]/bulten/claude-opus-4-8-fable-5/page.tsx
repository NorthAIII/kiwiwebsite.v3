import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import ArticleClaude from "@/components/forum/ArticleClaude";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";
  const title = tr
    ? "Claude’un yeni modelleri: Opus 4.8 ve Fable 5 — Kiwi AI Lab"
    : "Claude’s new models: Opus 4.8 and Fable 5 — Kiwi AI Lab";
  const description = tr
    ? "Claude Opus 4.8 ve Fable 5 ne getiriyor ve otomasyon için ne anlama geliyor — modeller, bağlam pencereleri, fiyatlar."
    : "What Claude Opus 4.8 and Fable 5 bring and what they mean for automation — models, context windows, pricing.";
  return { title, description };
}

export default async function ClaudeModelsArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "bunkerOs" });

  return (
    <SmoothScroll>
      <CustomCursor />
      <PageHeader back={t("back")} cta={t("cta")} />
      <ArticleClaude />
      <Footer />
    </SmoothScroll>
  );
}
