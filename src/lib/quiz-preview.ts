import productsCatalog from "@/data/products.json";
import type { ProductRecord } from "@/lib/types/product";
import type { SkillLevel, UserProfile } from "@/lib/taxonomy";

const CATALOG = productsCatalog as ProductRecord[];

const LEVEL_ORDER: SkillLevel[] = [
  "recreational",
  "club",
  "competitive",
  "pro_oriented",
];

function levelIndex(level: SkillLevel): number {
  return LEVEL_ORDER.indexOf(level);
}

/**
 * Quick, coarse count of catalogue rows that pass the user's *partial* quiz
 * profile. This is NOT the full fit scorer — it is a "candidates remaining"
 * signal surfaced live as the user answers each question, to make the funnel
 * feel responsive without misleading them about the eventual rank order.
 *
 * Filters applied (only when the corresponding profile field is set):
 *   - Category
 *   - Skill level (must lie within product's min..max recommended band)
 *   - Budget max
 *
 * Style and discipline are NOT filtered here because they are best
 * expressed as *weights* (the real scorer applies them); a strict filter
 * would over-prune the count and feel jumpy.
 */
export function countMatchingProducts(profile: UserProfile): number {
  return CATALOG.filter((p) => {
    if (profile.category && p.category !== profile.category) return false;
    if (profile.level) {
      const lvl = levelIndex(profile.level);
      if (lvl < levelIndex(p.minRecommendedLevel)) return false;
      if (lvl > levelIndex(p.maxRecommendedLevel)) return false;
    }
    if (
      profile.body.budgetMaxUsd != null &&
      p.priceUsd > profile.body.budgetMaxUsd
    ) {
      return false;
    }
    return true;
  }).length;
}
