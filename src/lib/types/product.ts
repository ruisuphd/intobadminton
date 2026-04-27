import type { SkillLevel } from "@/lib/taxonomy";

export type HeadWeight = "head_light" | "even" | "head_heavy";
export type ShaftFlex = "flexible" | "medium" | "stiff" | "extra_stiff";
export type WeightClass = "3U" | "4U" | "5U" | "6U" | "F";
export type SourceChip = "manufacturer_spec" | "review_summary" | "editor_note";

export type RacketProduct = {
  id: string;
  category: "racket";
  name: string;
  brand: string;
  priceUsd: number;
  headWeight: HeadWeight;
  shaftFlex: ShaftFlex;
  weightClass: WeightClass;
  balanceMm: number;
  stringPattern: string;
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
