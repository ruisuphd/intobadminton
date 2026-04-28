import { LocalizedSimplePage } from "@/components/LocalizedSimplePage";
import { isSupportedLocale } from "@/lib/locale";

export default async function LocalizedPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LocalizedSimplePage
      locale={isSupportedLocale(locale) ? locale : "en"}
      page="privacy"
    />
  );
}

