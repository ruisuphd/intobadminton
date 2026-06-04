import type { BlogArticle } from "@/lib/blog";
import { reviewProductIdForBlog } from "@/lib/content-links";
import { computeEditorialRating } from "@/lib/editorial-rating";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { referenceClubDoublesProfile } from "@/lib/reference-profile";
import { reviewProductById } from "@/lib/review-pages";
import { scoreOneProduct } from "@/lib/scoring";
import { productReviewJsonLd } from "@/lib/structured-data";
import type { ProductRecord, ScoredProduct } from "@/lib/types/product";
import type { EditorialRating } from "@/lib/editorial-rating";

export type ReviewArticleEnrichment = {
  product: ProductRecord;
  scored: ScoredProduct | null;
  rating: EditorialRating;
  productSchema: ReturnType<typeof productReviewJsonLd>;
};

/**
 * When a blog slug maps to a catalogue product, attach Product + Review
 * JSON-LD and fit-score data for the editorial review page.
 */
export function enrichmentForReviewArticle(
  slug: string,
  article: BlogArticle
): ReviewArticleEnrichment | null {
  const productId = reviewProductIdForBlog(slug);
  if (!productId) return null;

  const product = reviewProductById(productId);
  if (!product) return null;

  const rating = computeEditorialRating(product);
  if (!rating) return null;

  const path = articlePathForSlug(slug);
  const reviewBody = article.sections
    .map((section) => section.body)
    .join("\n\n")
    .slice(0, 5000);
  const referenceProfile = referenceClubDoublesProfile(product.category);
  const scored = scoreOneProduct(product, referenceProfile);

  return {
    product,
    scored,
    rating,
    productSchema: productReviewJsonLd({
      product,
      path,
      description: article.dek || article.title,
      reviewBody: reviewBody || article.dek,
      rating,
    }),
  };
}
