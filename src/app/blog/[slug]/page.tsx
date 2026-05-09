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
  if (!article) {
    return {
      title: "Blog — IntoBadminton",
      alternates: { canonical: `/blog/${slug}/` },
      robots: { index: false, follow: true },
    };
  }
  const url = `/blog/${slug}/`;
  return {
    title: `${article.title} — IntoBadminton`,
    description: article.dek,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.dek,
      url,
      type: "article",
      siteName: "IntoBadminton",
      publishedTime: article.updatedAt,
      modifiedTime: article.updatedAt,
      authors: ["Rui Su"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
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
