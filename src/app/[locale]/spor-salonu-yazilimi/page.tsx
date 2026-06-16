import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import GymSoftwareShowcase from "@/components/gym/GymSoftwareShowcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "tr" ? "Spor Salonu Yönetim Yazılımı — Kiwi AI Lab" : "Gym Management Software — Kiwi AI Lab";
  return { title };
}

export default async function GymSoftwarePage({
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
      <GymSoftwareShowcase />
      <Footer />
    </SmoothScroll>
  );
}
