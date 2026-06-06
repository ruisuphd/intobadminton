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
