import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Fraunces, Geist } from "next/font/google";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { UmamiScript } from "@/components/analytics/umami-script";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    metadataBase: new URL("https://kiwiailab.com"),
    openGraph: {
      title,
      description,
      type: "website",
      locale,
    },
    // NOT: alternates (canonical/hreflang) burada DEĞİL. Fail-safe mimari (Faz 13,
    // TB-1): layout hiçbir sayfaya canonical miras ETTİRMEZ → alternates set etmeyi
    // unutan bir sayfa "canonical yok" (zararsız) alır, yanlış `/`'a canonicalize
    // (zararlı) değil. Her sayfa kendi `localizedAlternates(locale, path)`'ini verir
    // (ana sayfa dahil → page.tsx generateMetadata).
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fraunces.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // set the theme before first paint to avoid a flash
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <UmamiScript />
      </head>
      <body className="grain">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
