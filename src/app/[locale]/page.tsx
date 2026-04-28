import type { Metadata } from "next";
import { LocalizedHome } from "@/components/LocalizedHome";
import { isSupportedLocale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const zh = locale === "zh";
  return {
    title: zh
      ? "个性化羽毛球装备推荐 — IntoBadminton"
      : "Personalized badminton equipment finder — IntoBadminton",
    description: zh
      ? "根据水平、打法、身体舒适度和预算推荐羽毛球装备。"
      : "Badminton equipment recommendations based on level, style, body comfort, and budget.",
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: "/en/",
        "zh-Hans": "/zh/",
      },
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LocalizedHome locale={isSupportedLocale(locale) ? locale : "en"} />;
}
