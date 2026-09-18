/**
 * Editorial review slugs linked from brand hub `relatedLinks` shelves —
 * product reviews, string/grip explainers, and buying guides surfaced on
 * `/brands/*` pages.
 *
 * Shared with reviews golden-profile CI (`requireBrandReviewParity`).
 */
export type BrandReviewLink = {
  slug: string;
  /** Brand slug that surfaces this review in its related shelf. */
  fromBrand: string;
};

export const brandReviewLinks: BrandReviewLink[] = [
  { slug: "how-to-choose-a-badminton-racket", fromBrand: "anta" },
];

export function brandReviewSlugs(): string[] {
  return brandReviewLinks.map((entry) => entry.slug);
}

export function brandReviewHrefs(): string[] {
  return brandReviewSlugs().map((slug) => `/review/${slug}/`);
}

/** Brand-shelf review shells not already covered by Lighthouse / compare-guide precache. */
export function brandReviewPrecachePaths(): string[] {
  const alreadyPrecached = new Set([
    "/review/how-to-choose-a-badminton-racket/",
  ]);
  return brandReviewHrefs().filter((href) => !alreadyPrecached.has(href));
}
