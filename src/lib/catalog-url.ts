import type { BalanceCategory, WeightClass } from "@/lib/types/product";
import type { EquipmentCategory } from "@/lib/taxonomy";
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
