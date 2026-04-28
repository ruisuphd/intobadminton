import type { Metadata } from "next";
import { BrandsPage } from "@/components/BrandsPage";
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
    title: isZh ? "覆盖品牌 — IntoBadminton" : "Brands we cover — IntoBadminton",
    description: isZh
      ? "IntoBadminton 涵盖的羽毛球品牌：尤尼克斯、胜利、李宁、薰风、川崎、Apacs、FZ Forza、RSL 等，附区域与品类信息。"
      : "The badminton brands IntoBadminton recommends from — Yonex, Victor, Li-Ning, Kumpoo, Kawasaki, Apacs, FZ Forza, RSL, and more.",
    alternates: {
      canonical: `/${safeLocale}/brands/`,
      languages: {
        en: "/en/brands/",
        "zh-Hans": "/zh/brands/",
      },
    },
  };
}

export default async function LocalizedBrandsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BrandsPage locale={isSupportedLocale(locale) ? locale : "en"} />;
}
