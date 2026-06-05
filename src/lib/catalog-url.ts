import { styleHeadPreference } from "@/lib/scoring";
import type { BalanceCategory, WeightClass } from "@/lib/types/product";
import type { EquipmentCategory, PlayStyle, UserProfile } from "@/lib/taxonomy";
import {
  BALANCE_OPTIONS,
  CATEGORY_OPTIONS,
  PRICE_BANDS,
  type PriceBand,
  type ProductFilterState,
} from "@/lib/product-filters";

export type CatalogSort = "price-asc" | "price-desc" | "name" | "fit-desc";

const SORT_VALUES: CatalogSort[] = [
  "price-asc",
  "price-desc",
  "name",
  "fit-desc",
];

const CATEGORY_VALUES = new Set(
  CATEGORY_OPTIONS.map((option) => option.value)
);
const PRICE_BAND_VALUES = new Set(PRICE_BANDS.map((band) => band.value));
const WEIGHT_VALUES = new Set(["3U", "4U", "5U", "6U", "F"]);
const BALANCE_VALUES = new Set(BALANCE_OPTIONS.map((option) => option.value));

export type CatalogUrlState = ProductFilterState & {
  sort: CatalogSort;
  /** Keyword filter — shareable via `?q=` */
  q: string | null;
};

export const DEFAULT_CATALOG_URL_STATE: CatalogUrlState = {
  category: null,
  brand: null,
  weightClass: null,
  balance: null,
  priceBand: null,
  sort: "price-asc",
  q: null,
};

function parseEnum<T extends string>(
  raw: string | null,
  allowed: Set<T>
): T | null {
  if (!raw || !allowed.has(raw as T)) return null;
  return raw as T;
}

export function parseCatalogSearchParams(
  params: URLSearchParams
): CatalogUrlState {
  const brand = params.get("brand")?.trim();
  const sort = parseEnum(params.get("sort"), new Set(SORT_VALUES));

  const qRaw = params.get("q")?.trim();

  return {
    category: parseEnum(
      params.get("cat"),
      CATEGORY_VALUES as Set<EquipmentCategory>
    ),
    brand: brand && brand.length > 0 ? brand : null,
    weightClass: parseEnum(
      params.get("weight"),
      WEIGHT_VALUES as Set<WeightClass>
    ),
    balance: parseEnum(
      params.get("balance"),
      BALANCE_VALUES as Set<BalanceCategory>
    ),
    priceBand: parseEnum(
      params.get("price"),
      PRICE_BAND_VALUES as Set<PriceBand>
    ),
    sort: sort ?? DEFAULT_CATALOG_URL_STATE.sort,
    q: qRaw && qRaw.length > 0 ? qRaw : null,
  };
}

export function catalogSearchParamsFromState(
  state: CatalogUrlState
): URLSearchParams {
  const params = new URLSearchParams();
  if (state.category) params.set("cat", state.category);
  if (state.brand) params.set("brand", state.brand);
  if (state.weightClass) params.set("weight", state.weightClass);
  if (state.balance) params.set("balance", state.balance);
  if (state.priceBand) params.set("price", state.priceBand);
  if (state.sort !== DEFAULT_CATALOG_URL_STATE.sort) {
    params.set("sort", state.sort);
  }
  if (state.q) params.set("q", state.q);
  return params;
}

export function catalogUrlFromState(state: CatalogUrlState): string {
  const params = catalogSearchParamsFromState(state);
  const query = params.toString();
  return query ? `/catalog/?${query}` : "/catalog/";
}

/** Shareable catalog URL with keyword prefill — used from site search. */
export function catalogHrefFromKeywordQuery(raw: string): string {
  const q = raw.trim();
  if (!q) return "/catalog/";
  return catalogUrlFromState({ ...DEFAULT_CATALOG_URL_STATE, q });
}

/** Brand-filtered catalog browse — used from `/brands/*` landings. */
export function catalogHrefFromBrand(brand: string): string {
  const trimmed = brand.trim();
  if (!trimmed) return "/catalog/";
  return catalogUrlFromState({
    ...DEFAULT_CATALOG_URL_STATE,
    brand: trimmed,
  });
}

/**
 * Best-of slug → shareable catalog filters (retailer-style guide → browse).
 * Unmapped slugs fall back to the full catalog index.
 */
type BestSlugCatalogFilters = Partial<
  Pick<CatalogUrlState, "category" | "weightClass" | "balance" | "priceBand">
>;

const BEST_SLUG_CATALOG_FILTERS: Record<string, BestSlugCatalogFilters> = {
  "beginner-rackets": { category: "racket" },
  "rackets-under-100": { category: "racket", priceBand: "under100" },
  "rackets-under-150": { category: "racket", priceBand: "under150" },
  "rackets-under-200": { category: "racket", priceBand: "under200" },
  "lightweight-rackets-5u": { category: "racket", weightClass: "5U" },
  "head-light-rackets": { category: "racket", balance: "head_light" },
  "head-heavy-rackets-under-150": {
    category: "racket",
    balance: "head_heavy",
    priceBand: "under150",
  },
  "control-rackets": { category: "racket", balance: "head_light" },
  "all-round-rackets": { category: "racket", balance: "even" },
  "singles-rackets": { category: "racket" },
  "doubles-rackets": { category: "racket" },
  "defensive-rackets": { category: "racket", balance: "head_light" },
  "smash-heavy-rackets": { category: "racket", balance: "head_heavy" },
  "intermediate-rackets": { category: "racket" },
  "rackets-for-shoulder-comfort": { category: "racket", balance: "head_light" },
  shoes: { category: "shoes" },
  "wide-feet-badminton-shoes": { category: "shoes" },
  "budget-badminton-shoes": { category: "shoes", priceBand: "under150" },
  strings: { category: "string" },
};

/** Filtered catalog browse — used from `/best/*` buying guides. */
export function catalogHrefFromBestSlug(slug: string): string {
  const filters = BEST_SLUG_CATALOG_FILTERS[slug.trim()];
  if (!filters) return "/catalog/";
  return catalogUrlFromState({
    ...DEFAULT_CATALOG_URL_STATE,
    ...filters,
  });
}

/**
 * Compare-guide slug → shareable catalog filters (retailer-style comparison → browse).
 * Unmapped slugs fall back to the full catalog index.
 */
type CompareSlugCatalogFilters = Partial<
  Pick<CatalogUrlState, "category" | "brand">
>;

const COMPARE_SLUG_CATALOG_FILTERS: Record<string, CompareSlugCatalogFilters> = {
  "yonex-astrox-vs-nanoflare": { category: "racket", brand: "Yonex" },
  "yonex-victor-li-ning": { category: "racket" },
  "astrox-77-pro-vs-88s-pro": { category: "racket", brand: "Yonex" },
  "badminton-vs-tennis-shoes": { category: "shoes" },
  "astrox-99-pro-vs-astrox-100zz": { category: "racket", brand: "Yonex" },
  "astrox-99-pro-vs-halbertec-9000-power": { category: "racket" },
  "astrox-88d-pro-vs-axforce-90-new": { category: "racket" },
  "halbertec-9000-power-vs-axforce-100-gen-2": {
    category: "racket",
    brand: "Li-Ning",
  },
  "bladex-800-speed-vs-nanoflare-1000z": { category: "racket" },
  "nanoflare-1000z-vs-auraspeed-99": { category: "racket" },
  "nanoflare-800-pro-vs-auraspeed-hs-plus": { category: "racket" },
  "yonex-65z4-vs-eclipsion-z3": { category: "shoes", brand: "Yonex" },
};

/** Filtered catalog browse — used from `/compare-guides/*` comparisons. */
export function catalogHrefFromCompareSlug(slug: string): string {
  const filters = COMPARE_SLUG_CATALOG_FILTERS[slug.trim()];
  if (!filters) return "/catalog/";
  return catalogUrlFromState({
    ...DEFAULT_CATALOG_URL_STATE,
    ...filters,
  });
}

/**
 * Guide slug → shareable catalog filters (retailer-style education → browse).
 * Unmapped slugs fall back to the full catalog index.
 */
type GuideSlugCatalogFilters = Partial<
  Pick<CatalogUrlState, "category" | "balance" | "priceBand">
>;

const GUIDE_SLUG_CATALOG_FILTERS: Record<string, GuideSlugCatalogFilters> = {
  "string-tension": { category: "string" },
  "string-feel-vs-durability": { category: "string" },
  "shoes-footwork": { category: "shoes" },
  "badminton-shoes-vs-running-shoes": { category: "shoes" },
  "wide-feet-badminton-shoes": { category: "shoes" },
  "racket-balance": { category: "racket" },
  "doubles-positioning-and-rackets": { category: "racket" },
  "doubles-roles": { category: "racket" },
  "equipment-authenticity": { category: "racket" },
  "season-refresh": {},
  glossary: { category: "racket" },
};

/** Filtered catalog browse — used from `/guides/*` procedural landings. */
export function catalogHrefFromGuideSlug(slug: string): string {
  const filters = GUIDE_SLUG_CATALOG_FILTERS[slug.trim()];
  if (!filters) return "/catalog/";
  return catalogUrlFromState({
    ...DEFAULT_CATALOG_URL_STATE,
    ...filters,
  });
}

const GUIDE_CATALOG_CTA_LABELS: Record<string, string> = {
  string: "Browse strings in catalog",
  shoes: "Browse shoes in catalog",
  racket: "Browse rackets in catalog",
};

/** Button label for guide → catalog CTA. */
export function catalogCtaLabelFromGuideSlug(slug: string): string {
  const filters = GUIDE_SLUG_CATALOG_FILTERS[slug.trim()];
  if (!filters?.category) return "Browse matching catalog";
  return (
    GUIDE_CATALOG_CTA_LABELS[filters.category] ?? "Browse matching catalog"
  );
}

/**
 * Tool slug → shareable catalog filters (retailer-style calculator → browse).
 * Unmapped slugs fall back to the full catalog index.
 */
type ToolSlugCatalogFilters = Partial<
  Pick<CatalogUrlState, "category" | "balance">
>;

const TOOL_SLUG_CATALOG_FILTERS: Record<string, ToolSlugCatalogFilters> = {
  "string-tension-calculator": { category: "string" },
  "skill-level-converter": { category: "racket" },
  "racket-balance-explainer": { category: "racket" },
  "court-diagram": {},
  "authenticity-checker": { category: "racket" },
};

/** Filtered catalog browse — used from `/tools/*` interactive landings. */
export function catalogHrefFromToolSlug(slug: string): string {
  const filters = TOOL_SLUG_CATALOG_FILTERS[slug.trim()];
  if (!filters) return "/catalog/";
  return catalogUrlFromState({
    ...DEFAULT_CATALOG_URL_STATE,
    ...filters,
  });
}

/** Button label for tool → catalog CTA. */
export function catalogCtaLabelFromToolSlug(slug: string): string {
  const filters = TOOL_SLUG_CATALOG_FILTERS[slug.trim()];
  if (!filters?.category) return "Browse matching catalog";
  return (
    GUIDE_CATALOG_CTA_LABELS[filters.category] ?? "Browse matching catalog"
  );
}

function budgetMaxToPriceBand(
  budgetMaxUsd: number | undefined
): PriceBand | null {
  if (budgetMaxUsd == null || !Number.isFinite(budgetMaxUsd)) return null;
  if (budgetMaxUsd <= 100) return "under100";
  if (budgetMaxUsd <= 150) return "under150";
  if (budgetMaxUsd <= 200) return "under200";
  return "200plus";
}

function profileBalanceFromStyles(
  styles: PlayStyle[]
): BalanceCategory | null {
  const want = styleHeadPreference(styles.length === 0 ? ["balanced"] : styles);
  if (want === "heavy") return "head_heavy";
  if (want === "light") return "head_light";
  return "even";
}

/** Map body weight to a racket weight class when the signal is strong. */
function profileWeightClassFromBody(
  category: EquipmentCategory | null | undefined,
  weightKg: number | undefined
): WeightClass | null {
  if (category !== "racket" || weightKg == null || !Number.isFinite(weightKg)) {
    return null;
  }
  if (weightKg < 60) return "5U";
  if (weightKg > 85) return "3U";
  return null;
}

/** Quiz profile → shareable catalog filters — used from `/results/`. */
export function catalogHrefFromProfile(profile: UserProfile): string {
  const balance =
    profile.category === "racket" && profile.styles.length > 0
      ? profileBalanceFromStyles(profile.styles)
      : null;
  const weightClass = profileWeightClassFromBody(
    profile.category,
    profile.body.weightKg
  );
  const hasCompleteProfile =
    profile.category != null &&
    profile.level != null &&
    profile.discipline != null;

  return catalogUrlFromState({
    ...DEFAULT_CATALOG_URL_STATE,
    category: profile.category ?? null,
    priceBand: budgetMaxToPriceBand(profile.body.budgetMaxUsd),
    balance,
    weightClass,
    sort: hasCompleteProfile ? "fit-desc" : DEFAULT_CATALOG_URL_STATE.sort,
  });
}

type ProductCatalogRef = {
  brand: string;
  category: EquipmentCategory;
};

/** Product row → brand + category filtered catalog — used on review/PDP panels. */
export function catalogHrefFromProduct(product: ProductCatalogRef): string {
  return catalogUrlFromState({
    ...DEFAULT_CATALOG_URL_STATE,
    category: product.category,
    brand: product.brand.trim() || null,
  });
}

/** Button label for product → catalog CTA. */
export function catalogCtaLabelFromProduct(product: ProductCatalogRef): string {
  const brand = product.brand.trim();
  if (brand) return `Browse ${brand} in catalog`;
  const categoryLabel = GUIDE_CATALOG_CTA_LABELS[product.category];
  return categoryLabel ?? "Browse matching catalog";
}
