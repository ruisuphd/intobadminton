import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/ProductDetailPage";
import {
  allCatalogProductIds,
  catalogProductById,
  productPath,
} from "@/lib/catalog-products";
import { pageAlternates } from "@/lib/metadata";
import { routeOgImages } from "@/lib/og";

export function generateStaticParams() {
  return allCatalogProductIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = catalogProductById(id);
  if (!product) {
    return {
      title: "Product — IntoBadminton",
      robots: { index: false, follow: true },
    };
  }
  const path = productPath(id);
  const title = `${product.brand} ${product.name} — specs & finder fit`;
  const description = `Verified ${product.category} specs for ${product.brand} ${product.name} ($${product.priceUsd}). Compare, save, and run the IntoBadminton finder for a scored shortlist.`;
  const images = [...routeOgImages(path)];
  return {
    title,
    description,
    alternates: pageAlternates(path),
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: "IntoBadminton",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((img) => img.url),
    },
  };
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = catalogProductById(id);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
