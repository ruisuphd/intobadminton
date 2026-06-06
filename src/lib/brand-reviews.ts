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
  { slug: "yonex-nanoflare-1000z-review", fromBrand: "yonex" },
  { slug: "yonex-comfort-z3-shoes-review", fromBrand: "yonex" },
  { slug: "yonex-aerosensa-50-shuttle-review", fromBrand: "yonex" },
  { slug: "li-ning-halbertec-7000-review", fromBrand: "li-ning" },
  { slug: "kumpoo-shura-2-racket-review", fromBrand: "kumpoo" },
  {
    slug: "kumpoo-fourth-major-badminton-brand-profile",
    fromBrand: "kumpoo",
  },
  { slug: "kumpoo-js-67-string-review", fromBrand: "kumpoo" },
  { slug: "kumpoo-kh-g805-lite-pro-shoes-review", fromBrand: "kumpoo" },
  {
    slug: "bonny-snake-breath-second-tier-flagship-review",
    fromBrand: "bonny",
  },
  { slug: "bonny-wuque-flagship-088-shoes-review", fromBrand: "bonny" },
  {
    slug: "bonny-mojun-vs-arcsaber-11-pro-attack-racket-review",
    fromBrand: "bonny",
  },
  { slug: "bonny-zhangui-dao-8888ax-ultra-review", fromBrand: "bonny" },
  { slug: "bonny-leisu-800-racket-review", fromBrand: "bonny" },
  { slug: "anta-ah600w-racket-review", fromBrand: "anta" },
  { slug: "how-to-choose-a-badminton-racket", fromBrand: "anta" },
  {
    slug: "kawasaki-chocolate-88d-vs-yonex-astrox-88d-pro",
    fromBrand: "kawasaki",
  },
  { slug: "kawasaki-master-mao-20-racket-review", fromBrand: "kawasaki" },
  { slug: "kawasaki-star-cross-racket-review", fromBrand: "kawasaki" },
  { slug: "kawasaki-kace-shoes-review", fromBrand: "kawasaki" },
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
    "/review/yonex-nanoflare-1000z-review/",
    "/review/anta-ah600w-racket-review/",
    "/review/how-to-choose-a-badminton-racket/",
  ]);
  return brandReviewHrefs().filter((href) => !alreadyPrecached.has(href));
}
