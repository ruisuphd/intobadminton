import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GearProductPage } from "@/components/GearProductPage";
import { editorialPageMetadata } from "@/lib/metadata";
import {
  gearPath,
  reviewProductById,
  reviewSlugs,
} from "@/lib/review-pages";
import { humanize } from "@/lib/text";

export function generateStaticParams() {
  return reviewSlugs().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = reviewProductById(id);
  if (!product) {
    return { title: "Equipment — IntoBadminton" };
  }
  const path = gearPath(id);
  const title = `${product.brand} ${product.name} — ${humanize(product.category)} specs`;
  const description = `${product.brand} ${product.name} specs, reference price, and illustrative fit score in the IntoBadminton equipment finder.`;
  return editorialPageMetadata({ path, title, description });
}

export default async function GearProductRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = reviewProductById(id);
  if (!product) notFound();
  return <GearProductPage product={product} />;
}
