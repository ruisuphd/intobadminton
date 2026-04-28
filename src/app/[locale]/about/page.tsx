import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { isSupportedLocale, siteLocales } from "@/lib/locale";

export function generateStaticParams() {
  return siteLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const isZh = safeLocale === "zh";
  return {
    title: isZh ? "关于 — IntoBadminton" : "About — IntoBadminton",
    description: isZh
      ? "由仍在打比赛的球员搭建。我们的推荐方法、引用规则和编辑独立性。"
      : "Built by a competitive player. How IntoBadminton recommends gear, cites reviews, and stays editorially independent.",
    alternates: {
      canonical: `/${safeLocale}/about/`,
      languages: {
        en: "/en/about/",
        "zh-Hans": "/zh/about/",
      },
    },
  };
}

export default async function LocalizedAboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AboutPage locale={isSupportedLocale(locale) ? locale : "en"} />;
}
