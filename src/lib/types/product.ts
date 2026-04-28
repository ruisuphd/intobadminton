import type { EquipmentCategory, FootWidth, SkillLevel } from "@/lib/taxonomy";

export type HeadWeight = "head_light" | "even" | "head_heavy";
export type ShaftFlex = "flexible" | "medium" | "stiff" | "extra_stiff";
export type WeightClass = "3U" | "4U" | "5U" | "6U" | "F";
export type SourceChip =
  | "manufacturer_spec"
  | "review_summary"
  | "editor_note"
  | "market_signal";
export type BalanceCategory = "head_light" | "even" | "head_heavy";
export type VerificationStatus =
  | "official_verified"
  | "editor_verified"
  | "needs_review";
export type RegionCode = "global" | "sg" | "cn" | "jp" | "kr" | "uk" | "us";

export type ResaleEstimate = {
  estimatedUsedUsd: number;
  depreciationPct: number;
  confidence: "low" | "medium" | "high";
  basis: string;
  updatedAt: string;
};

export type MarketSignal = {
  source: "badmintoncn" | "reddit" | "youtube" | "marketplace" | "editor";
  label: string;
  summary: string;
  href?: string;
  confidence: "low" | "medium" | "high";
};

type BaseProduct = {
  id: string;
  category: EquipmentCategory;
  name: string;
  brand: string;
  priceUsd: number;
  launchYear?: number;
  regionAvailability: RegionCode[];
  officialSourceUrl: string;
  lastVerifiedAt: string;
  verificationStatus: VerificationStatus;
  maxRecommendedLevel: SkillLevel;
  minRecommendedLevel: SkillLevel;
  bestFor: string[];
  sourceUrls: string[];
  editorNote?: string;
  reviewCount?: number;
  resale?: ResaleEstimate;
  marketSignals?: MarketSignal[];
};

export type RacketProduct = BaseProduct & {
  category: "racket";
  headWeight: HeadWeight;
  shaftFlex: ShaftFlex;
  weightClass: WeightClass;
  weightVariants: WeightClass[];
  gripSizes: string[];
  balanceMm: number;
  balanceCategory: BalanceCategory;
  swingWeightEstimate: "fast" | "medium" | "heavy";
  commonStringTensionLbs: {
    min: number;
    max: number;
  };
  shaftFlexSource: "official" | "retailer" | "editor_estimate";
};

export type StringProduct = BaseProduct & {
  category: "string";
  gaugeMm: number;
  feel: "soft" | "medium" | "hard";
  repulsion: "medium" | "high" | "very_high";
  control: "medium" | "high" | "very_high";
  durability: "low" | "medium" | "high" | "very_high";
  tensionRangeLbs: { min: number; max: number };
};

export type ShoeProduct = BaseProduct & {
  category: "shoes";
  fitWidth: FootWidth | "wide_available";
  cushioning: "low" | "medium" | "high";
  stability: "medium" | "high" | "very_high";
  weightFeel: "fast" | "medium" | "protective";
  hasWideOption?: boolean;
};

export type BagProduct = BaseProduct & {
  category: "bag";
  capacityRackets: number;
  sizeClass: "compact" | "club" | "tournament";
  hasShoeCompartment: boolean;
  hasWetCompartment: boolean;
  carryStyle: "backpack" | "duffel" | "racket_bag";
};

/**
 * Shuttles. Speed code 75/76/77 corresponds to slow/medium/fast (international
 * convention; lower number = lower temperature room = slower flight).
 */
export type ShuttleProduct = BaseProduct & {
  category: "shuttle";
  feathered: boolean;
  /** Goose, duck, or nylon synthetic. */
  material: "goose_feather" | "duck_feather" | "nylon" | "hybrid";
  /** International speed code: 75 (slow) – 79 (fast). */
  speedCode?: number;
  /** Tube count, typically 12. */
  unitsPerTube: number;
  /** BWF approval for tournament use. */
  bwfApproved: boolean;
  durabilityTier: "practice" | "club" | "tournament" | "pro";
};

export type GripProduct = BaseProduct & {
  category: "grip";
  /** Overgrip wraps over the existing grip; replacement substitutes it. */
  gripType: "overgrip" | "replacement";
  feel: "tacky" | "dry" | "towel" | "perforated";
  thicknessMm?: number;
  sweatAbsorption: "low" | "medium" | "high";
  /** Pieces per package. */
  packCount: number;
};

/** Catch-all for vibration dampeners, racket covers, towels, stencils, etc. */
export type AccessoryProduct = BaseProduct & {
  category: "accessory";
  accessoryType:
    | "vibration_dampener"
    | "racket_cover"
    | "stencil"
    | "towel"
    | "wristband"
    | "headband"
    | "ankle_brace"
    | "knee_brace"
    | "stringing_clamp"
    | "other";
  /** Free-form short description in case the type alone isn't enough. */
  detail?: string;
};

export type ProductRecord =
  | RacketProduct
  | StringProduct
  | ShoeProduct
  | BagProduct
  | ShuttleProduct
  | GripProduct
  | AccessoryProduct;

export type ScoredProduct = ProductRecord & {
  fitScore: number;
  confidence: {
    level: "high" | "medium" | "low" | "needs_verification";
    score: number;
    label: string;
  };
  evidenceProfile: {
    officialSpec: {
      status: VerificationStatus;
      lastVerifiedAt: string;
      href: string;
    };
    editorSignal: {
      note?: string;
      source: "official" | "retailer" | "editor_estimate" | "community_signal";
    };
    reviewEvidence: {
      count: number;
      positive: number;
      caution: number;
      confidence: "none" | "low" | "medium";
      displayPolicy: "metadata_summary_link_only";
    };
  };
  subscores: {
    style: number;
    discipline: number;
    level: number;
    budget: number;
    body: number;
  };
  reasons: { code: string; label: string; weight: number }[];
  pros: string[];
  cons: string[];
  sourceChips: { type: SourceChip; label: string; href?: string }[];
};

export type ScoredRacket = ScoredProduct & RacketProduct;
