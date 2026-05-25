import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { EditorialArticlePage } from "@/components/EditorialArticlePage";
import { editorialSlugs } from "@/lib/blog-migrations";
import { getBlogArticle } from "@/lib/blog";
import { routeOgImages } from "@/lib/og";

export function generateStaticParams() {
  return editorialSlugs().map((slug) => ({ slug }));
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
      title: "Comparisons — IntoBadminton",
      alternates: pageAlternates(`/comparisons/${slug}/`),
      robots: { index: false, follow: true },
    };
  }
  const url = `/comparisons/${slug}/`;
  const images = [...routeOgImages(url)];
  return {
    title: article.title,
    description: article.dek,
    alternates: pageAlternates(url),
    openGraph: {
      title: article.title,
      description: article.dek,
      url,
      type: "article",
      siteName: "IntoBadminton",
      publishedTime: article.updatedAt,
      modifiedTime: article.updatedAt,
      authors: ["Rui Su"],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
      images: images.map((img) => img.url),
    },
  };
}

export default async function ComparisonArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getBlogArticle("en", slug)) {
    notFound();
  }
  return <EditorialArticlePage locale="en" slug={slug} />;
}
