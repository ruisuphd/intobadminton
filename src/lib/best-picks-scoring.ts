import { byId, scoreOneProduct } from "@/lib/scoring";
import { referenceClubDoublesProfile } from "@/lib/reference-profile";
import type { ScoredProduct } from "@/lib/types/product";

/**
 * Illustrative fit score for a catalog row on `/best/*` pages.
 *
 * Uses the same reference club-doubles profile documented on the methodology
 * page so readers can compare finder fit without taking the quiz first.
 */
export function illustrativeFitForProductId(
  productId: string | undefined
): ScoredProduct | null {
  if (!productId) return null;
  const product = byId(productId);
  if (!product) return null;
  const profile = referenceClubDoublesProfile(product.category);
  return scoreOneProduct(product, profile);
}
