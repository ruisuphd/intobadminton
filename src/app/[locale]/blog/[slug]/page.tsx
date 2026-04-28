import type { Metadata } from "next";
import { BlogArticlePage } from "@/components/BlogArticlePage";
import { blogSlugs, getBlogArticle } from "@/lib/blog";
import { isSupportedLocale, siteLocales } from "@/lib/locale";

export function generateStaticParams() {
  return siteLocales.flatMap((locale) =>
    blogSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const article = getBlogArticle(safeLocale, slug);
  return {
    title: article ? `${article.title} — IntoBadminton` : "Blog — IntoBadminton",
    description: article?.dek,
    alternates: {
      canonical: `/${safeLocale}/blog/${slug}/`,
      languages: {
        en: `/en/blog/${slug}/`,
        "zh-Hans": `/zh/blog/${slug}/`,
      },
    },
  };
}

export default async function LocalizedBlogArticleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return (
    <BlogArticlePage
      locale={isSupportedLocale(locale) ? locale : "en"}
      slug={slug}
    />
  );
}
