import type { ProductRecord } from "@/lib/types/product";

/**
 * Editorial rating model.
 *
 * The IntoBadminton site is editorial, not a retailer. This produces ONE
 * critic's rating — Rui Su's — for a third-party product. It is never an
 * aggregate of ratings collected from other people, and callers must not
 * emit it as schema.org `AggregateRating`.
 *
 * Rule the model has to obey: **stars describe the product and the evidence
 * behind it, never how complete our own records are.** An earlier version
 * moved the number on things like "is our shaft-flex figure sourced?" and
 * "is the editor note longer than 100 characters?" — a reader comparing 4.6
 * against 4.2 reasonably concludes the first racket is better, when it only
 * meant our spreadsheet was tidier. Those terms are gone.
 *
 * Where we have not verified a product's specs we now publish **no rating at
 * all** rather than a lower one. Not knowing enough about a racket is a fact
 * about us; marking the racket down for it would be a claim about the racket.
 *
 * Remaining signals, all genuinely about the product:
 *   - Base 4.0 because it survived editorial curation to be featured.
 *   - Founder firsthand court time.
 *   - High-confidence independent market signals.
 *   - Count of independent review sources.
 * Floored at 3.5 and capped at 5.0 so we never imply a perfect score.
 */

export type EditorialRating = {
  ratingValue: number; // 3.5..5.0, 1 decimal
  bestRating: 5;
  worstRating: 1;
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

  /*
   * We do not rate what we have not verified. Publishing a *lower* star for an
   * unverified product would turn a gap in our sourcing into a claim about the
   * racket. Callers already handle a null rating by rendering no stars, and
   * the page still shows the verification badge, so the reader loses nothing
   * except a number we had no standing to publish.
   */
  if (product.verificationStatus === "needs_review") return null;

  let stars = 4.0;
  const rationale: string[] = ["Curated /best/ pick (base 4.0)."];

  if (product.editorNote && FOUNDER_FIRSTHAND_PATTERN.test(product.editorNote)) {
    stars += 0.3;
    rationale.push("Founder personally tested this racket on court (+0.3).");
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

  return {
    ratingValue: stars,
    bestRating: 5,
    worstRating: 1,
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
