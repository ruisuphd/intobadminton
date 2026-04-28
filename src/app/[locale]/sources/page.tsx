import type { Metadata } from "next";
import { SourcesPage } from "@/components/SourcesPage";
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
    title: isZh
      ? "信息来源 — IntoBadminton"
      : "Sources & editorial process — IntoBadminton",
    description: isZh
      ? "IntoBadminton 的数据来源与交叉验证流程，包括厂商资料、社区论坛、视频测评和 BWF 赛事。"
      : "Where IntoBadminton sources data, how we triangulate evidence across manufacturer specs, community forums, video reviews, and BWF events.",
    alternates: {
      canonical: `/${safeLocale}/sources/`,
      languages: {
        en: "/en/sources/",
        "zh-Hans": "/zh/sources/",
      },
    },
  };
}

export default async function LocalizedSourcesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SourcesPage locale={isSupportedLocale(locale) ? locale : "en"} />;
}
