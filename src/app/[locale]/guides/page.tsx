import { isSupportedLocale } from "@/lib/locale";
import { GuidesShell } from "@/app/guides/page";

export default async function LocalizedGuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <GuidesShell locale={isSupportedLocale(locale) ? locale : "en"} />;
}

