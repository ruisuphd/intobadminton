import reviewProductMap from "@/data/blog-review-product-map.json";
import productsCatalog from "@/data/products.json";
import { blogArticles, blogSlugs, type BlogSlug } from "@/lib/blog";
import { editorNoteIsFounderFirsthand } from "@/lib/founder-notes";
import type { ProductRecord } from "@/lib/types/product";

/**
 * Internal gate (not a Google quota): do not index or put ads on a review
 * under this many body words, or that fails the originality test below.
 */
export const REVIEW_INDEX_MIN_BODY_WORDS = 800;

/**
 * Slugs whose source map entry is null — original IntoBadminton editorials,
 * not imported forum markdown. Tests assert this matches
 * `scripts/blog-slug-source-map.json`.
 */
export const ORIGINAL_EDITORIAL_SLUGS: readonly string[] = [
  "badminton-bag-loadout",
  "badminton-equipment-for-kids",
  "badminton-glossary-terms-every-player-should-know",
  "badminton-shoe-fit-stability",
  "badminton-string-selector",
  "beginner-racket-mistakes",
  "how-to-choose-a-badminton-racket",
  "how-to-read-badminton-reviews",
  "li-ning-thunder-100-gen-2-vs-gen-1",
  "racket-balance-vs-swing-speed",
  "used-racket-depreciation",
  "victor-drivex-12-vs-astrox-88d-pro",
  "yonex-grip-sizes-explained",
];

const originalEditorialSet: ReadonlySet<string> = new Set(
  ORIGINAL_EDITORIAL_SLUGS
);

const CATALOG = productsCatalog as ProductRecord[];
const REVIEW_MAP = reviewProductMap as Record<string, string>;

const founderFirsthandProductIds: ReadonlySet<string> = new Set(
  CATALOG.filter((product) =>
    editorNoteIsFounderFirsthand(product.editorNote)
  ).map((product) => product.id)
);

export function reviewBodyWordCount(slug: string): number {
  const article = blogArticles.en.find((row) => row.slug === slug);
  if (!article) return 0;
  return article.sections
    .flatMap((section) => section.body.split(/\s+/))
    .filter(Boolean).length;
}

export function isOriginalEditorialSlug(slug: string): boolean {
  return originalEditorialSet.has(slug);
}

export function isFounderFirsthandSlug(slug: string): boolean {
  const productId = REVIEW_MAP[slug];
  return Boolean(productId && founderFirsthandProductIds.has(productId));
}

/**
 * A public content URL must be original editorial or mapped to a catalogue
 * row the founder actually played. Length is not a licence to index a
 * translated forum note.
 */
export function passesOriginalityGate(slug: string): boolean {
  return isOriginalEditorialSlug(slug) || isFounderFirsthandSlug(slug);
}

export function passesLengthGate(slug: string): boolean {
  return reviewBodyWordCount(slug) >= REVIEW_INDEX_MIN_BODY_WORDS;
}

/**
 * Weaker siblings of a duplicate pair. These pages can clear the word-count
 * gate; they are held back because they republish the same SKU as another URL.
 */
export const duplicateNoindexSlugs: readonly BlogSlug[] = [
  // Same source file as `fz-forza-88d-review`. Brand/price still unsettled.
  "victor-fz-88d-power-purple-review",
];

/**
 * Overlapping SKU coverage Google asks us to expand or consolidate. Weaker
 * URLs stay in the corpus (and may 301 in the static export) so inbound
 * links do not 404.
 */
export const consolidatedNoindexSlugs: readonly BlogSlug[] = [
  "kawasaki-star-cross-second-perspective-review",
  "victor-auraspeed-hs-plus-attack-review",
  "victor-drivex-12-vs-drivex-10-and-88d-pro-2024",
  "victor-drivex-12-zsw-vs-original-comparison",
  "victor-yu-12-racket-review",
  "victor-p8500-ii-shoes-review",
  "yonex-astrox-99-pro-2-deep-dive",
  "yonex-astrox-99-pro-gen-1-review",
  "bonny-mojun-vs-arcsaber-11-pro-attack-racket-review",
  "li-ning-halbertec-8000-vs-yonex-arcsaber-11-pro",
];

const duplicateSet: ReadonlySet<string> = new Set(duplicateNoindexSlugs);
const consolidatedSet: ReadonlySet<string> = new Set(consolidatedNoindexSlugs);

function failsQualityGate(slug: string): boolean {
  return !passesLengthGate(slug) || !passesOriginalityGate(slug);
}

/**
 * Review slugs held back for length or originality (not duplicate/consolidate).
 * Computed from the live corpus so the list cannot drift from the JSON.
 */
export const thinContentNoindexSlugs: readonly BlogSlug[] = blogSlugs.filter(
  (slug) =>
    !duplicateSet.has(slug) &&
    !consolidatedSet.has(slug) &&
    failsQualityGate(slug)
);

const noindexSet: ReadonlySet<string> = new Set([
  ...thinContentNoindexSlugs,
  ...duplicateNoindexSlugs,
  ...consolidatedNoindexSlugs,
]);

/** Every review slug served `noindex, follow`, whatever the reason. */
export const noindexReviewSlugs: readonly BlogSlug[] = [
  ...thinContentNoindexSlugs,
  ...duplicateNoindexSlugs,
  ...consolidatedNoindexSlugs,
];

/** True when `/review/<slug>/` should render `noindex, follow`. */
export function isThinContentNoindex(slug: string): boolean {
  return noindexSet.has(slug);
}

/** Review slugs that belong in the sitemap — the corpus minus the noindex set. */
export function indexableReviewSlugs(slugs: readonly string[]): string[] {
  return slugs.filter((slug) => !isThinContentNoindex(slug));
}

/**
 * Ads may sit on a review only when it is also indexable publication content.
 * Auto Ads bypasses `<AdSlot/>`; keep the loader off these screens as well.
 */
export function adsAllowedOnReview(slug: string): boolean {
  return !isThinContentNoindex(slug);
}
