import type { SkillLevel } from "@/lib/taxonomy";

export type HeadWeight = "head_light" | "even" | "head_heavy";
export type ShaftFlex = "flexible" | "medium" | "stiff" | "extra_stiff";
export type WeightClass = "3U" | "4U" | "5U" | "6U" | "F";
export type SourceChip = "manufacturer_spec" | "review_summary" | "editor_note";
export type BalanceCategory = "head_light" | "even" | "head_heavy";
export type VerificationStatus =
  | "official_verified"
  | "editor_verified"
  | "needs_review";
export type RegionCode = "global" | "sg" | "cn" | "jp" | "kr" | "uk" | "us";

export type RacketProduct = {
  id: string;
  category: "racket";
  name: string;
  brand: string;
  priceUsd: number;
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
};

export type ProductRecord = RacketProduct;

export type ScoredRacket = RacketProduct & {
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
      source: RacketProduct["shaftFlexSource"];
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
