import { BlogIndex } from "@/components/BlogIndex";
import { isSupportedLocale } from "@/lib/locale";

export default async function LocalizedBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BlogIndex locale={isSupportedLocale(locale) ? locale : "en"} />;
}

