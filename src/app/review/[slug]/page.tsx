import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductReviewPage } from "@/components/ProductReviewPage";
import { reviewPath, reviewProductById, reviewSlugs } from "@/lib/review-pages";

export function generateStaticParams() {
  return reviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = reviewProductById(slug);
  if (!product) {
    return {
      title: "Review — IntoBadminton",
      alternates: { canonical: reviewPath(slug) },
      robots: { index: false, follow: true },
    };
  }
  const title = `${product.brand} ${product.name} review`;
  const description =
    product.editorNote ??
    `Verified specs, source authority, and on-court behaviour for the ${product.brand} ${product.name}.`;
  const path = reviewPath(product.id);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
      siteName: "IntoBadminton",
      publishedTime: product.lastVerifiedAt,
      modifiedTime: product.lastVerifiedAt,
      authors: ["Rui Su"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductReviewRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = reviewProductById(slug);
  if (!product) notFound();
  return <ProductReviewPage product={product} />;
}
