import type { ProductRecord } from "@/lib/types/product";

/**
 * Editorial rating model.
 *
 * The IntoBadminton site is editorial, not a retailer. We do not generate
 * star ratings out of thin air — every fractional star is anchored to a
 * real signal we already record per product (source verification, founder
 * firsthand testing, independent community reviews, high-confidence market
 * signals).
 *
 * The rating function is intentionally conservative:
 *   - Base 4.0 because these products survived an editorial filter to be
 *     featured on a /best/ page in the first place.
 *   - Capped at 5.0 and floored at 3.5 so we never imply a "perfect" rating
 *     and never publish anything below the curation threshold.
 *
 * The ratingCount we report to Google is derived from real review-source
 * count: founder editor note + cited market signals + raw reviewCount field.
 * We never inflate.
 */

export type EditorialRating = {
  ratingValue: number; // 3.5..5.0, 1 decimal
  reviewCount: number; // distinct review sources, never zero
  bestRating: 5;
  worstRating: 1;
  /** True if the rating has at least 2 independent sources backing it. */
  meetsAggregateThreshold: boolean;
  /** Plain-English breakdown of where each rating signal came from. */
  rationale: string[];
};

const FOUNDER_FIRSTHAND_PATTERN = /founder firsthand|founder current/i;

export function lookupCatalogProduct(
  catalog: ProductRecord[],
  brand: string,
  name: string
): ProductRecord | undefined {
  return catalog.find((p) => p.brand === brand && p.name === name);
}

export function computeEditorialRating(
  product: ProductRecord | undefined
): EditorialRating | null {
  if (!product) return null;

  let stars = 4.0;
  const rationale: string[] = ["Curated /best/ pick (base 4.0)."];

  if (product.verificationStatus === "official_verified") {
    stars += 0.4;
    rationale.push("Specs match official manufacturer product page (+0.4).");
  } else if (product.verificationStatus === "editor_verified") {
    stars += 0.2;
    rationale.push("Specs editor-verified across two retailer sources (+0.2).");
  } else if (product.verificationStatus === "needs_review") {
    stars -= 0.2;
    rationale.push("Spec source still needs verification (−0.2).");
  }

  if (product.category === "racket") {
    if (product.shaftFlexSource === "official") {
      stars += 0.2;
      rationale.push("Shaft flex matches official manufacturer source (+0.2).");
    } else if (product.shaftFlexSource === "editor_estimate") {
      stars -= 0.2;
      rationale.push("Shaft flex is an editor estimate, not source-verified (−0.2).");
    }
  }

  if (product.editorNote && FOUNDER_FIRSTHAND_PATTERN.test(product.editorNote)) {
    stars += 0.3;
    rationale.push("Founder personally tested this racket on court (+0.3).");
  } else if (product.editorNote && product.editorNote.length > 100) {
    stars += 0.1;
    rationale.push("Substantive editor note backing the pick (+0.1).");
  }

  const highConfSignals = (product.marketSignals ?? []).filter(
    (s) => s.confidence === "high"
  ).length;
  if (highConfSignals > 0) {
    const bonus = Math.min(highConfSignals * 0.15, 0.3);
    stars += bonus;
    rationale.push(
      `${highConfSignals} high-confidence market signal${
        highConfSignals === 1 ? "" : "s"
      } (+${bonus.toFixed(2)}).`
    );
  }

  const independentReviews = product.reviewCount ?? 0;
  if (independentReviews >= 3) {
    stars += 0.1;
    rationale.push(`${independentReviews} independent review sources (+0.1).`);
  }

  // Clamp + round to 1 decimal.
  stars = Math.max(3.5, Math.min(5.0, stars));
  stars = Math.round(stars * 10) / 10;

  const distinctSources =
    (product.editorNote ? 1 : 0) +
    (product.marketSignals?.length ?? 0) +
    independentReviews;

  // Never undercount the editor note + at least 1 source the curation
  // already implies. Never overcount above the real distinct sources we
  // actually publish.
  const reviewCount = Math.max(
    1,
    Math.min(distinctSources, 99)
  );

  return {
    ratingValue: stars,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
    meetsAggregateThreshold: reviewCount >= 2,
    rationale,
  };
}

/**
 * Best-known last-verified date for a product, used as datePublished on the
 * primary review JSON-LD. Falls back to today only if the product has no
 * verification date (which should not happen in current data).
 */
export function ratingDatePublished(
  product: ProductRecord | undefined
): string {
  if (product?.lastVerifiedAt) return product.lastVerifiedAt;
  return new Date().toISOString().slice(0, 10);
}
