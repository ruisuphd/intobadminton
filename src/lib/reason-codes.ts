/**
 * Machine-readable reason codes for transparency (plan §2.2, §5).
 */
export const REASON_CODES = [
  "MATCH_STYLE_OFFENSE_HEAD_HEAVY",
  "MATCH_STYLE_DEFENSE_HEAD_LIGHT",
  "MATCH_STYLE_BALANCED_EVEN",
  "MATCH_DISCIPLINE_DOUBLES_LIGHTER",
  "MATCH_DISCIPLINE_SINGLES_STAMINA",
  "MATCH_LEVEL_FLEX",
  "MATCH_LEVEL_STIFF",
  "BUDGET_FIT",
  "BUDGET_STRETCH",
  "INJURY_AVOID_ULTRA_STIFF",
  "WEIGHT_CLASS_BUILD",
  "STRING_PATTERN_CONTROL",
  "STRING_REPULSION_HELP",
  "STRING_DURABILITY_VALUE",
  "STRING_TENSION_MATCH",
  "SHOE_WIDTH_MATCH",
  "SHOE_STABILITY_SUPPORT",
  "SHOE_CUSHION_COMFORT",
  "BAG_CAPACITY_MATCH",
  "BAG_SHOE_WET_COMPARTMENTS",
  "SHUTTLE_LEVEL_MATCH",
  "SHUTTLE_BUDGET_FIT",
  "GRIP_SWEAT_ABSORPTION",
  "GRIP_PACK_VALUE",
] as const;

export type ReasonCode = (typeof REASON_CODES)[number];

export const REASON_LABELS: Record<ReasonCode, string> = {
  MATCH_STYLE_OFFENSE_HEAD_HEAVY:
    "Head-heavy balance aligns with an offensive style.",
  MATCH_STYLE_DEFENSE_HEAD_LIGHT:
    "Head-light balance helps defensive and net play.",
  MATCH_STYLE_BALANCED_EVEN:
    "Even balance fits a balanced or all-round style.",
  MATCH_DISCIPLINE_DOUBLES_LIGHTER:
    "Lighter class often preferred for fast doubles exchanges.",
  MATCH_DISCIPLINE_SINGLES_STAMINA:
    "Setup suits longer singles rallies and coverage.",
  MATCH_LEVEL_FLEX:
    "More flexible shaft matches your current level and timing margin.",
  MATCH_LEVEL_STIFF:
    "Stiffer shaft matches your level and timing.",
  BUDGET_FIT: "Within your stated budget.",
  BUDGET_STRETCH: "Slightly above budget but strong match on other factors.",
  INJURY_AVOID_ULTRA_STIFF:
    "Softer setup to reduce shock for flagged joint concerns (not medical advice).",
  WEIGHT_CLASS_BUILD:
    "Racket weight class chosen for feel vs your build inputs.",
  STRING_PATTERN_CONTROL:
    "String pattern leans toward control for your style inputs.",
  STRING_REPULSION_HELP:
    "String choice adds repulsion support without changing racket class.",
  STRING_DURABILITY_VALUE:
    "Durability and tension hold matter for frequent club play.",
  STRING_TENSION_MATCH:
    "Your preferred tension sits inside this string's practical range.",
  SHOE_WIDTH_MATCH:
    "Shoe fit profile aligns with your foot-width input.",
  SHOE_STABILITY_SUPPORT:
    "Stability and lateral support match your comfort flags.",
  SHOE_CUSHION_COMFORT:
    "Cushioning profile suits knee, heel, or high-impact comfort needs.",
  BAG_CAPACITY_MATCH:
    "Bag capacity fits a regular club-session loadout.",
  BAG_SHOE_WET_COMPARTMENTS:
    "Dedicated shoe or wet compartments reduce gear-management friction.",
  SHUTTLE_LEVEL_MATCH:
    "Shuttle quality tier matches your playing level and session demands.",
  SHUTTLE_BUDGET_FIT:
    "Shuttle cost profile suits your stated budget.",
  GRIP_SWEAT_ABSORPTION:
    "Grip absorption suits frequent hand changes and longer rallies.",
  GRIP_PACK_VALUE:
    "Pack size gives practical value for regular replacement.",
};
