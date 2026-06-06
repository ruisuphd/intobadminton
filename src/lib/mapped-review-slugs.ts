/**
 * All review article slugs with a committed product-map entry.
 * Shared by reviews-baseline parity guards and sync tooling.
 */

import blogReviewMap from "@/data/blog-review-product-map.json";

const map = blogReviewMap as Record<string, string>;

/** Sorted list of every slug in `blog-review-product-map.json`. */
export function mappedReviewSlugs(): string[] {
  return Object.keys(map).sort();
}

/** Product id for a mapped review slug, or undefined when absent. */
export function mappedProductIdForSlug(slug: string): string | undefined {
  return map[slug];
}
