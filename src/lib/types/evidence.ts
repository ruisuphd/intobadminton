import type { EquipmentCategory } from "@/lib/taxonomy";

export type SourcePlatform =
  | "official_brand"
  | "first_party"
  | "reddit"
  | "badmintoncn"
  | "badmintoncentral"
  | "retailer"
  | "youtube"
  | "blog"
  | "other_forum";

export type RightsStatus =
  | "approved"
  | "permission_required"
  | "manual_citation_only"
  | "blocked"
  | "unknown";

export type CrawlMethod =
  | "manual"
  | "official_api"
  | "partner_feed"
  | "firecrawl_research"
  | "user_submission"
  | "not_allowed";

export type SourceRecord = {
  id: string;
  platform: SourcePlatform;
  name: string;
  homepage: string;
  language: string[];
  rightsStatus: RightsStatus;
  crawlMethod: CrawlMethod;
  allowedUse: string[];
  prohibitedUse: string[];
  lastCheckedAt: string;
  notes: string;
};

export type RawEvidence = {
  id: string;
  sourceId: string;
  sourceUrl: string;
  productIds: string[];
  language: string;
  publishedAt?: string;
  collectedAt: string;
  authorHandle?: string;
  excerptHash: string;
  quoteAllowed: boolean;
  originalExcerpt?: string;
};

export type ReviewSignal = {
  id: string;
  rawEvidenceId: string;
  productId: string;
  category: EquipmentCategory;
  sentiment: -2 | -1 | 0 | 1 | 2;
  themes: ReviewTheme[];
  confidence: number;
  sourceWeight: number;
  summary: string;
  humanReviewed: boolean;
};

export type ReviewTheme =
  | "power"
  | "control"
  | "defense"
  | "speed"
  | "durability"
  | "comfort"
  | "stiffness"
  | "value"
  | "fit_width"
  | "injury_comfort";

export type ProductAggregate = {
  productId: string;
  sampleSize: number;
  confidence: "low" | "medium" | "high";
  durabilityScore?: number;
  stiffnessConsensus?: number;
  swingSpeedConsensus?: number;
  comfortScore?: number;
  updatedAt: string;
};

export type ProductAlias = {
  productId: string;
  canonicalName: string;
  brandAliases: string[];
  modelAliases: string[];
  languages: string[];
  notes?: string;
};

export type FirstPartyReview = {
  id: string;
  productId: string;
  submittedAt: string;
  consent: true;
  status: "local_draft" | "pending_moderation" | "approved" | "rejected";
  level: string;
  discipline: string;
  ownedMonths?: number;
  fit: 1 | 2 | 3 | 4 | 5;
  comfort: 1 | 2 | 3 | 4 | 5;
  power: 1 | 2 | 3 | 4 | 5;
  control: 1 | 2 | 3 | 4 | 5;
  durability: 1 | 2 | 3 | 4 | 5;
  summary: string;
};
