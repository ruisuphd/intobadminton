import type { Metadata } from "next";
import { BlogArticlePage } from "@/components/BlogArticlePage";
import { blogSlugs, getBlogArticle } from "@/lib/blog";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle("en", slug);
  return {
    title: article ? `${article.title} — IntoBadminton` : "Blog — IntoBadminton",
    description: article?.dek,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
  };
}

export default async function BlogArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogArticlePage locale="en" slug={slug} />;
}
