import {
  defaultBodyProfile,
  type EquipmentCategory,
  type UserProfile,
} from "@/lib/taxonomy";

/**
 * Reference club doubles profile used to show an illustrative fit preview on
 * review pages without requiring a completed quiz. Documented in the
 * methodology page as "typical club doubles player".
 */
export function referenceClubDoublesProfile(
  category: EquipmentCategory
): UserProfile {
  return {
    level: "club",
    discipline: "doubles",
    styles: ["balanced"],
    category,
    body: {
      ...defaultBodyProfile(),
      budgetMaxUsd: 280,
      stringTensionLbs: 24,
    },
  };
}
