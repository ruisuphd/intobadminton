import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { EditorialArticlePage } from "@/components/EditorialArticlePage";
import { blogSlugs, getBlogArticle } from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { routeOgImages } from "@/lib/og";

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
      title: "Reviews — IntoBadminton",
      alternates: pageAlternates(articlePathForSlug(slug)),
      robots: { index: false, follow: true },
    };
  }
  const path = articlePathForSlug(slug);
  const images = [...routeOgImages(path)];
  return {
    title: article.title,
    description: article.dek,
    alternates: pageAlternates(path),
    openGraph: {
      title: article.title,
      description: article.dek,
      url: path,
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

export default async function ReviewArticleRoute({
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
