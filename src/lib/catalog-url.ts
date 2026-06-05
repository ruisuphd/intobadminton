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
  /** Keyword filter — brand, model name, or spec tokens. */
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
