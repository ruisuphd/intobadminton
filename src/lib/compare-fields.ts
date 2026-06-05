import type { EquipmentCategory } from "@/lib/taxonomy";
import type { ProductRecord, ScoredProduct } from "@/lib/types/product";

export type CompareRowKey =
  | "brand"
  | "category"
  | "fitScore"
  | "priceUsd"
  | "resale"
  | "headWeight"
  | "shaftFlex"
  | "gaugeMm"
  | "fitWidth"
  | "capacityRackets"
  | "weightVariants"
  | "gripSizes"
  | "balanceMm"
  | "confidence"
  | "lastVerifiedAt";

export type CompareFieldDef = {
  key: CompareRowKey;
  label: string;
  /** When set, row only shows if every compared item shares this category. */
  categories?: EquipmentCategory[];
  /** Lower numeric values win (e.g. price). */
  lowerWins?: boolean;
  /** Higher numeric values win (e.g. fit score). */
  higherWins?: boolean;
};

const HEAD_WEIGHT_LABEL: Record<string, string> = {
  head_light: "Head-light",
  even: "Even balance",
  head_heavy: "Head-heavy",
};

const SHAFT_LABEL: Record<string, string> = {
  flexible: "Flexible",
  medium: "Medium",
  stiff: "Stiff",
  extra_stiff: "Extra stiff",
};

export const COMPARE_FIELDS: CompareFieldDef[] = [
  { key: "brand", label: "Brand" },
  { key: "category", label: "Category" },
  { key: "fitScore", label: "Fit score", higherWins: true },
  { key: "priceUsd", label: "Price (USD)", lowerWins: true },
  { key: "resale", label: "Used market" },
  {
    key: "headWeight",
    label: "Balance class",
    categories: ["racket"],
  },
  {
    key: "shaftFlex",
    label: "Shaft flex",
    categories: ["racket"],
  },
  {
    key: "gaugeMm",
    label: "Gauge (mm)",
    categories: ["string"],
    lowerWins: true,
  },
  {
    key: "fitWidth",
    label: "Fit width",
    categories: ["shoes"],
  },
  {
    key: "capacityRackets",
    label: "Racket capacity",
    categories: ["bag"],
    higherWins: true,
  },
  {
    key: "weightVariants",
    label: "Weight class",
    categories: ["racket"],
  },
  {
    key: "gripSizes",
    label: "Grip sizes",
    categories: ["racket"],
  },
  {
    key: "balanceMm",
    label: "Balance (mm)",
    categories: ["racket"],
  },
  { key: "confidence", label: "Evidence confidence" },
  { key: "lastVerifiedAt", label: "Last verified" },
];

function sharedCategory(items: ProductRecord[]): EquipmentCategory | null {
  const cats = new Set(items.map((p) => p.category));
  if (cats.size !== 1) return null;
  return [...cats][0] ?? null;
}

export function compareFieldsForItems(
  items: ProductRecord[]
): CompareFieldDef[] {
  const cat = sharedCategory(items);
  return COMPARE_FIELDS.filter((field) => {
    if (!field.categories) return true;
    if (!cat) return false;
    return field.categories.includes(cat);
  });
}

function formatHeadWeight(v: unknown): string {
  if (typeof v !== "string") return "—";
  return HEAD_WEIGHT_LABEL[v] ?? v;
}

function formatShaft(v: unknown): string {
  if (typeof v !== "string") return "—";
  return SHAFT_LABEL[v] ?? v;
}

export function compareCellValue(
  product: ProductRecord | ScoredProduct,
  key: CompareRowKey
): string {
  if (key === "fitScore" && "fitScore" in product) {
    return `${Math.round(product.fitScore * 100)}`;
  }
  if (key === "confidence" && "confidence" in product) {
    return product.confidence.label;
  }
  if (key === "resale" && product.resale) {
    const r = product.resale;
    return `$${r.estimatedUsedUsd} used · ${r.depreciationPct}% dep.`;
  }
  if (key === "headWeight" && "headWeight" in product) {
    return formatHeadWeight(product.headWeight);
  }
  if (key === "shaftFlex" && "shaftFlex" in product) {
    return formatShaft(product.shaftFlex);
  }
  if (key === "category") {
    return product.category;
  }
  const v = (product as unknown as Record<string, unknown>)[key];
  if (v == null) return "—";
  if (Array.isArray(v)) return v.join(", ");
  if (key === "priceUsd" && typeof v === "number") return `$${v}`;
  return String(v);
}

function numericForWinner(
  product: ProductRecord | ScoredProduct,
  key: CompareRowKey
): number | null {
  if (key === "fitScore" && "fitScore" in product) return product.fitScore;
  if (key === "priceUsd") return product.priceUsd;
  if (key === "gaugeMm" && "gaugeMm" in product) {
    const g = product.gaugeMm;
    return typeof g === "number" ? g : null;
  }
  if (key === "capacityRackets" && "capacityRackets" in product) {
    const c = product.capacityRackets;
    return typeof c === "number" ? c : null;
  }
  if (key === "balanceMm" && "balanceMm" in product) {
    const b = product.balanceMm;
    return typeof b === "number" ? b : null;
  }
  return null;
}

/** Product ids that win on this row (ties allowed). Empty when not comparable. */
export function compareWinners(
  items: (ProductRecord | ScoredProduct)[],
  field: CompareFieldDef
): Set<string> {
  const nums = items
    .map((p) => ({ id: p.id, n: numericForWinner(p, field.key) }))
    .filter((x): x is { id: string; n: number } => x.n != null);
  if (nums.length < 2) return new Set();

  const values = nums.map((x) => x.n);
  const best = field.lowerWins
    ? Math.min(...values)
    : field.higherWins
      ? Math.max(...values)
      : null;
  if (best == null) return new Set();

  return new Set(nums.filter((x) => x.n === best).map((x) => x.id));
}
