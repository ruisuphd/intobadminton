import productsCatalog from "@/data/products.json";
import type {
  BalanceCategory,
  ProductRecord,
  RacketProduct,
  WeightClass,
} from "@/lib/types/product";
import { CATEGORIES, type EquipmentCategory } from "@/lib/taxonomy";

const CATALOG = productsCatalog as ProductRecord[];

export type PriceBand = "under100" | "under150" | "under200" | "200plus";

export type ProductFilterState = {
  category: EquipmentCategory | null;
  brand: string | null;
  weightClass: WeightClass | null;
  balance: BalanceCategory | null;
  priceBand: PriceBand | null;
};

export const PRICE_BANDS: { value: PriceBand; label: string; max?: number; min?: number }[] = [
  { value: "under100", label: "Under $100", max: 100 },
  { value: "under150", label: "Under $150", max: 150 },
  { value: "under200", label: "Under $200", max: 200 },
  { value: "200plus", label: "$200+", min: 200 },
];

export const WEIGHT_CLASSES: WeightClass[] = ["3U", "4U", "5U", "6U", "F"];

export const BALANCE_OPTIONS: { value: BalanceCategory; label: string }[] = [
  { value: "head_light", label: "Head-light" },
  { value: "even", label: "Even" },
  { value: "head_heavy", label: "Head-heavy" },
];

export const CATEGORY_OPTIONS: { value: EquipmentCategory; label: string }[] = [
  { value: "racket", label: "Rackets" },
  { value: "shoes", label: "Shoes" },
  { value: "string", label: "Strings" },
  { value: "shuttle", label: "Shuttles" },
  { value: "grip", label: "Grips" },
  { value: "bag", label: "Bags" },
];

export function allCatalogProducts(): ProductRecord[] {
  return CATALOG;
}

function isRacket(p: ProductRecord): p is RacketProduct {
  return p.category === "racket";
}

export function priceInBand(priceUsd: number, band: PriceBand): boolean {
  switch (band) {
    case "under100":
      return priceUsd < 100;
    case "under150":
      return priceUsd < 150;
    case "under200":
      return priceUsd < 200;
    case "200plus":
      return priceUsd >= 200;
  }
}

export function filterProducts(
  rows: ProductRecord[],
  filters: ProductFilterState
): ProductRecord[] {
  return rows.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.brand && p.brand !== filters.brand) return false;
    if (filters.priceBand && !priceInBand(p.priceUsd, filters.priceBand))
      return false;
    if (filters.weightClass || filters.balance) {
      if (!isRacket(p)) return false;
      if (filters.weightClass && p.weightClass !== filters.weightClass)
        return false;
      if (filters.balance && p.balanceCategory !== filters.balance) return false;
    }
    return true;
  });
}

export function brandOptionsFor(rows: ProductRecord[]): string[] {
  return [...new Set(rows.map((p) => p.brand))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function weightClassOptionsFor(rows: ProductRecord[]): WeightClass[] {
  const set = new Set<WeightClass>();
  for (const p of rows) {
    if (isRacket(p)) set.add(p.weightClass);
  }
  return WEIGHT_CLASSES.filter((w) => set.has(w));
}

export function balanceOptionsFor(rows: ProductRecord[]): BalanceCategory[] {
  const set = new Set<BalanceCategory>();
  for (const p of rows) {
    if (isRacket(p)) set.add(p.balanceCategory);
  }
  return BALANCE_OPTIONS.map((o) => o.value).filter((v) => set.has(v));
}

export function categoryOptionsFor(rows: ProductRecord[]): EquipmentCategory[] {
  const set = new Set(rows.map((p) => p.category));
  return CATEGORY_OPTIONS.map((o) => o.value).filter((v) => set.has(v));
}

export function priceBandOptionsFor(rows: ProductRecord[]): PriceBand[] {
  return PRICE_BANDS.map((b) => b.value).filter((band) =>
    rows.some((p) => priceInBand(p.priceUsd, band))
  );
}

export function racketsUnderPrice(maxUsd: number): RacketProduct[] {
  return CATALOG.filter(
    (p): p is RacketProduct => isRacket(p) && p.priceUsd <= maxUsd
  ).sort((a, b) => a.priceUsd - b.priceUsd || a.name.localeCompare(b.name));
}

const PRICE_BAND_SET = new Set<PriceBand>(PRICE_BANDS.map((b) => b.value));

/** Deep-link catalog filters from `?cat=racket&brand=Yonex&price=under100`. */
export function parseCatalogFiltersFromSearchParams(
  params: URLSearchParams
): Partial<ProductFilterState> {
  const out: Partial<ProductFilterState> = {};

  const cat = params.get("cat");
  if (cat && (CATEGORIES as readonly string[]).includes(cat)) {
    out.category = cat as EquipmentCategory;
  }

  const brand = params.get("brand")?.trim();
  if (brand) out.brand = brand;

  const price = params.get("price");
  if (price && PRICE_BAND_SET.has(price as PriceBand)) {
    out.priceBand = price as PriceBand;
  }

  const weight = params.get("weight");
  if (weight && (WEIGHT_CLASSES as readonly string[]).includes(weight)) {
    out.weightClass = weight as WeightClass;
  }

  const balance = params.get("balance");
  if (
    balance &&
    BALANCE_OPTIONS.some((o) => o.value === balance)
  ) {
    out.balance = balance as BalanceCategory;
  }

  return out;
}
