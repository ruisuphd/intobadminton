import { isSupportedLocale } from "@/lib/locale";
import { ResultsShell } from "@/app/results/page";

export default async function LocalizedResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ResultsShell locale={isSupportedLocale(locale) ? locale : "en"} />;
}

