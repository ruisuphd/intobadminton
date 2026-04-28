import { isSupportedLocale } from "@/lib/locale";
import { ReviewShell } from "@/app/review/page";

export default async function LocalizedReviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ReviewShell locale={isSupportedLocale(locale) ? locale : "en"} />;
}
