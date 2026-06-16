import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Fraunces, Geist } from "next/font/google";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import "../globals.css";

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

export const metadata: Metadata = {
  title: "Kiwi AI Lab — We listen. Then we automate.",
  description:
    "An AI automation agency. We map your business, find where repetitive work leaks time and money, and wire it to automation you can measure.",
  metadataBase: new URL("https://kiwiailab.com"),
  openGraph: {
    title: "Kiwi AI Lab",
    description: "İşinizi analiz ederiz. Sonra otomatikleştiririz.",
    type: "website",
  },
  alternates: {
    canonical: "/",
    languages: { tr: "/", en: "/en", ar: "/ar", de: "/de", es: "/es" },
  },
};

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
      </head>
      <body className="grain">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
