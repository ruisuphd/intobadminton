import { isSupportedLocale } from "@/lib/locale";
import { CompareShell } from "@/app/compare/page";

export default async function LocalizedComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CompareShell locale={isSupportedLocale(locale) ? locale : "en"} />;
}

