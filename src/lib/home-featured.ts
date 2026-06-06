import featuredData from "@/data/home-featured-reviews.json";
import { articlePathForSlug } from "@/lib/blog-migrations";

export type HomeFeaturedReview = {
  slug: string;
  title: string;
  updatedAt: string;
  readingMinutes: number;
};

type HomeFeaturedPayload = {
  reviewCount: number;
  featured: HomeFeaturedReview[];
};

const payload = featuredData as HomeFeaturedPayload;

/** Six latest reviews for the homepage — regenerated via `npm run home:featured`. */
export const homeFeaturedReviews = payload.featured;

export const reviewArticleCount = payload.reviewCount;

export function homeFeaturedReviewPath(slug: string): string {
  return articlePathForSlug(slug);
}

export function homeFeaturedReviewSlugs(): string[] {
  return homeFeaturedReviews.map((article) => article.slug);
}

export function homeFeaturedReviewHrefs(): string[] {
  return homeFeaturedReviewSlugs().map((slug) => homeFeaturedReviewPath(slug));
}

/** Featured review shells not already covered by Lighthouse / brand / compare precache. */
export function homeFeaturedReviewPrecachePaths(): string[] {
  const alreadyPrecached = new Set([
    "/review/gosen-ryoga-shiden-review/",
    "/review/anta-ah600w-racket-review/",
  ]);
  return homeFeaturedReviewHrefs().filter((href) => !alreadyPrecached.has(href));
}

export type OfflineRecoveryLink = {
  href: string;
  label: string;
  description: string;
};

const FEATURED_OFFLINE_LABELS: Record<string, string> = {
  "yonex-nanospeed-9900-ltg-green-sword-review": "NanoSpeed 9900 LTG review",
  "yonex-voltric-z-force-ltd-2012-review": "Voltric Z-Force LTD review",
  "gosen-ryoga-shiden-review": "Gosen Ryoga Shiden review",
  "victor-fz-100xx-budget-attack-review": "Victor FZ-100XX review",
  "anta-ah600w-racket-review": "Anta AH600W review",
  "bonny-leisu-800-lt-review": "Bonny Leisu 800 LT review",
};

const FEATURED_OFFLINE_DESCRIPTIONS: Record<string, string> = {
  "yonex-nanospeed-9900-ltg-green-sword-review":
    "Precached — homepage featured 2011 grail racket review.",
  "yonex-voltric-z-force-ltd-2012-review":
    "Precached — homepage featured Purple-Gold grail review.",
  "gosen-ryoga-shiden-review":
    "Precached — homepage featured cult speed blade review.",
  "victor-fz-100xx-budget-attack-review":
    "Precached — homepage featured budget attack racket review.",
  "anta-ah600w-racket-review":
    "Precached — homepage featured Anta debut racket review.",
  "bonny-leisu-800-lt-review":
    "Precached — homepage featured NF800LT tribute review.",
};

/** Homepage featured reviews for `/offline/` recovery sidebar — shared with parity CI. */
export function homeFeaturedOfflineRecoveryLinks(): OfflineRecoveryLink[] {
  return homeFeaturedReviews.map((article) => ({
    href: homeFeaturedReviewPath(article.slug),
    label: FEATURED_OFFLINE_LABELS[article.slug] ?? article.title,
    description:
      FEATURED_OFFLINE_DESCRIPTIONS[article.slug] ??
      `Precached — homepage featured review (${article.readingMinutes} min read).`,
  }));
}
