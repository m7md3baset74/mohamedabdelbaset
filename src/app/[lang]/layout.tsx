import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "../fonts";
import { dict } from "@/content/dict";
import { homePath, isLocale, locales, NOINDEX, SITE_URL } from "@/content/site";
import { Providers } from "@/components/providers";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = dict[lang].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: homePath(lang),
      languages: { en: "/", ar: "/ar", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      title: t.title,
      description: t.description,
      url: homePath(lang),
      locale: lang === "ar" ? "ar_EG" : "en_US",
      siteName: "Mohamed Abdelbaset",
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
    robots: NOINDEX ? { index: false, follow: false } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#0c0b0a",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={fontVariables}>
      <body>
        <Providers lang={lang}>{children}</Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
