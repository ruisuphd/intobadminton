import type { EquipmentCategory, UserProfile } from "@/lib/taxonomy";
import type { ProductRecord } from "@/lib/types/product";
import { scoreOneProduct } from "@/lib/scoring";

/** True when the user has completed enough of the finder for scoring. */
export function isFinderProfileReady(profile: UserProfile): boolean {
  return Boolean(profile.level && profile.discipline);
}

/** Align profile category to a catalogue row for cross-category browse/sort. */
export function profileForProductCategory(
  profile: UserProfile,
  category: EquipmentCategory
): UserProfile {
  return { ...profile, category };
}

/** Fit score for catalog sort; -1 when scoring is not applicable. */
export function catalogFitScore(
  product: ProductRecord,
  profile: UserProfile
): number {
  if (!isFinderProfileReady(profile)) return -1;
  const scored = scoreOneProduct(
    product,
    profileForProductCategory(profile, product.category)
  );
  return scored?.fitScore ?? -1;
}
