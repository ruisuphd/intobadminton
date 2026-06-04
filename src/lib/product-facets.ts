import productsCatalog from "@/data/products.json";
import type {
  BalanceCategory,
  RacketProduct,
  ShaftFlex,
  WeightClass,
} from "@/lib/types/product";
import type { EquipmentCategory } from "@/lib/taxonomy";

const CATALOG = (productsCatalog as RacketProduct[]).filter(
  (product) => product.category === "racket"
);

export type ProductFacetFilters = {
  category?: EquipmentCategory;
  weightClasses?: WeightClass[];
  balance?: BalanceCategory[];
  shaftFlex?: ShaftFlex[];
  maxPriceUsd?: number;
  brand?: string;
  query?: string;
};

export type ProductFacetChip = {
  key: keyof ProductFacetFilters | "query";
  label: string;
  value: string;
};

export const WEIGHT_CLASS_OPTIONS: WeightClass[] = ["3U", "4U", "5U", "6U"];
export const BALANCE_OPTIONS: BalanceCategory[] = [
  "head_light",
  "even",
  "head_heavy",
];
export const SHAFT_FLEX_OPTIONS: ShaftFlex[] = [
  "flexible",
  "medium",
  "stiff",
  "extra_stiff",
];

const BALANCE_LABEL: Record<BalanceCategory, string> = {
  head_light: "Head-light",
  even: "Even",
  head_heavy: "Head-heavy",
};

const FLEX_LABEL: Record<ShaftFlex, string> = {
  flexible: "Flexible",
  medium: "Medium",
  stiff: "Stiff",
  extra_stiff: "Extra stiff",
};

export function balanceLabel(value: BalanceCategory): string {
  return BALANCE_LABEL[value];
}

export function shaftFlexLabel(value: ShaftFlex): string {
  return FLEX_LABEL[value];
}

function matchesQuery(product: RacketProduct, query: string): boolean {
  const haystack = [
    product.brand,
    product.name,
    product.editorNote ?? "",
    product.category,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .every((token) => haystack.includes(token));
}

export function filterCatalog(filters: ProductFacetFilters): RacketProduct[] {
  return CATALOG.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (
      filters.weightClasses?.length &&
      !filters.weightClasses.includes(product.weightClass)
    ) {
      return false;
    }
    if (
      filters.balance?.length &&
      (!product.balanceCategory ||
        !filters.balance.includes(product.balanceCategory))
    ) {
      return false;
    }
    if (
      filters.shaftFlex?.length &&
      (!product.shaftFlex || !filters.shaftFlex.includes(product.shaftFlex))
    ) {
      return false;
    }
    if (
      filters.maxPriceUsd != null &&
      product.priceUsd != null &&
      product.priceUsd > filters.maxPriceUsd
    ) {
      return false;
    }
    if (filters.query && !matchesQuery(product, filters.query)) return false;
    return true;
  }).sort((a, b) => {
    const brand = a.brand.localeCompare(b.brand);
    if (brand !== 0) return brand;
    return a.name.localeCompare(b.name);
  });
}

export function parseProductFacetFilters(
  params: URLSearchParams
): ProductFacetFilters {
  const weightClasses = params
    .getAll("weight")
    .filter((value): value is WeightClass =>
      WEIGHT_CLASS_OPTIONS.includes(value as WeightClass)
    );
  const balance = params
    .getAll("balance")
    .filter((value): value is BalanceCategory =>
      BALANCE_OPTIONS.includes(value as BalanceCategory)
    );
  const shaftFlex = params
    .getAll("flex")
    .filter((value): value is ShaftFlex =>
      SHAFT_FLEX_OPTIONS.includes(value as ShaftFlex)
    );
  const maxPriceRaw = params.get("maxPrice");
  const maxPriceUsd =
    maxPriceRaw != null && maxPriceRaw !== ""
      ? Number.parseInt(maxPriceRaw, 10)
      : undefined;
  const category = params.get("category") as EquipmentCategory | null;

  return {
    category: category ?? undefined,
    weightClasses: weightClasses.length ? weightClasses : undefined,
    balance: balance.length ? balance : undefined,
    shaftFlex: shaftFlex.length ? shaftFlex : undefined,
    maxPriceUsd:
      maxPriceUsd != null && Number.isFinite(maxPriceUsd)
        ? maxPriceUsd
        : undefined,
    brand: params.get("brand") ?? undefined,
    query: params.get("q") ?? undefined,
  };
}

export function productFacetSearchParams(
  filters: ProductFacetFilters
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.category) params.set("category", filters.category);
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.maxPriceUsd != null) {
    params.set("maxPrice", String(filters.maxPriceUsd));
  }
  for (const weight of filters.weightClasses ?? []) {
    params.append("weight", weight);
  }
  for (const balance of filters.balance ?? []) {
    params.append("balance", balance);
  }
  for (const flex of filters.shaftFlex ?? []) {
    params.append("flex", flex);
  }
  return params;
}

export function catalogBrands(category?: EquipmentCategory): string[] {
  const brands = new Set<string>();
  for (const product of CATALOG) {
    if (category && product.category !== category) continue;
    brands.add(product.brand);
  }
  return [...brands].sort();
}

export { CATALOG as productCatalog };
