import type { ReviewTheme, SourcePlatform } from "@/lib/types/evidence";

export type EvidenceDisplayPolicy =
  | "metadata_summary_link_only"
  | "quote_allowed"
  | "first_party";

export type ReviewEvidence = {
  id: string;
  productId: string;
  sourceName: string;
  platform: SourcePlatform;
  language: string;
  sourceUrl: string;
  sourceKind: "search_result_metadata" | "first_party" | "licensed_api";
  displayPolicy: EvidenceDisplayPolicy;
  themes: ReviewTheme[];
  sentiment: -2 | -1 | 0 | 1 | 2;
  confidence: number;
  summary: string;
  collectedAt: string;
  rightsNote: string;
};
