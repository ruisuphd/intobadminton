import productsCatalog from "@/data/products.json";
import { companyInfo } from "@/lib/company";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = productsCatalog as ProductRecord[];

/**
 * Categories that get a dedicated `/review/[slug]/` page. Strings, shuttles,
 * grips, and bags are intentionally excluded for now — their per-product
 * content is thinner and the SEO upside per page is lower than rackets and
 * shoes. Re-add a category here once it has comparable editorial depth.
 */
const REVIEW_ELIGIBLE_CATEGORIES = new Set<ProductRecord["category"]>([
  "racket",
  "shoes",
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
