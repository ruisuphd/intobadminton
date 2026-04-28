import type { Metadata } from "next";
import { MarketResearchPage } from "@/components/MarketResearchPage";
import { isSupportedLocale, type SiteLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Market research — IntoBadminton",
  description:
    "Rights-safe badminton market research signals used to improve equipment recommendations.",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

export default async function LocalizedResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: SiteLocale = isSupportedLocale(locale) ? locale : "en";
  return <MarketResearchPage locale={safeLocale} />;
}
