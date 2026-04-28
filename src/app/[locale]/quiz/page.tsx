import { isSupportedLocale } from "@/lib/locale";
import { QuizShell } from "@/app/quiz/page";

export default async function LocalizedQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <QuizShell locale={isSupportedLocale(locale) ? locale : "en"} />;
}

