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

export const compareGuideReviewLinks: CompareGuideReviewLink[] = [
  {
    slug: "yonex-nanoflare-800-pro-and-victor-hs-plus",
    fromCompareGuide: "nanoflare-800-pro-vs-auraspeed-hs-plus",
  },
  {
    slug: "yonex-nanoflare-speed-series-explained",
    fromCompareGuide: "nanoflare-1000z-vs-auraspeed-99",
  },
  {
    slug: "li-ning-halbertec-8000-vs-9000-vs-9000-power",
    fromCompareGuide: "astrox-99-pro-vs-halbertec-9000-power",
  },
  {
    slug: "li-ning-axforce-100-gen-2-vs-100zz-vs-90-new",
    fromCompareGuide: "halbertec-9000-power-vs-axforce-100-gen-2",
  },
  {
    slug: "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp",
    fromCompareGuide: "astrox-88d-pro-vs-axforce-90-new",
  },
  {
    slug: "yonex-astrox-88d-pro-vs-88s-pro-2024",
    fromCompareGuide: "astrox-77-pro-vs-88s-pro",
  },
  {
    slug: "li-ning-bladex-800-speed-tough-elastic",
    fromCompareGuide: "bladex-800-speed-vs-nanoflare-1000z",
  },
];

export function compareGuideReviewSlugs(): string[] {
  return compareGuideReviewLinks.map((entry) => entry.slug);
}

export function compareGuideReviewHrefs(): string[] {
  return compareGuideReviewSlugs().map((slug) => `/review/${slug}/`);
}
