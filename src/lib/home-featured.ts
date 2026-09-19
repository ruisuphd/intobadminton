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
  const alreadyPrecached = new Set<string>([]);
  return homeFeaturedReviewHrefs().filter((href) => !alreadyPrecached.has(href));
}

export type OfflineRecoveryLink = {
  href: string;
  label: string;
  description: string;
};

const FEATURED_OFFLINE_LABELS: Record<string, string> = {};

const FEATURED_OFFLINE_DESCRIPTIONS: Record<string, string> = {};

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
