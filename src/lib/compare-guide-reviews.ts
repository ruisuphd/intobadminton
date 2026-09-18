/**
 * Editorial review slugs linked from compare-guide `relatedLinks` shelves —
 * extended notes and multi-product breakdowns, distinct from PDP `reviewPath()` picks.
 *
 * Shared with reviews golden-profile CI (`requireCompareGuideReviewParity`).
 */
export type CompareGuideReviewLink = {
  slug: string;
  /** Compare-guide slug that surfaces this review in its related shelf. */
  fromCompareGuide: string;
};

export const compareGuideReviewLinks: CompareGuideReviewLink[] = [];

export function compareGuideReviewSlugs(): string[] {
  return compareGuideReviewLinks.map((entry) => entry.slug);
}

export function compareGuideReviewHrefs(): string[] {
  return compareGuideReviewSlugs().map((slug) => `/review/${slug}/`);
}
