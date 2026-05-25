import productsCatalog from "@/data/products.json";
import { companyInfo } from "@/lib/company";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = productsCatalog as ProductRecord[];

/**
 * Categories that get a dedicated `/review/[slug]/` page. Strings and grips
 * are intentionally excluded for now — their per-product content is thinner.
 * Shuttles join rackets and shoes once standalone editorial depth exists.
 */
const REVIEW_ELIGIBLE_CATEGORIES = new Set<ProductRecord["category"]>([
  "racket",
  "shoes",
  "shuttle",
]);

export function reviewableProducts(): ProductRecord[] {
  return CATALOG.filter((p) => REVIEW_ELIGIBLE_CATEGORIES.has(p.category));
}

export function reviewSlugs(): string[] {
  return reviewableProducts().map((p) => p.id);
}

export function reviewProductById(id: string): ProductRecord | undefined {
  return reviewableProducts().find((p) => p.id === id);
}

export function reviewPath(id: string): string {
  return `/review/${id}/`;
}

export function reviewUrl(id: string): string {
  return `${companyInfo.siteUrl}${reviewPath(id)}`;
}
