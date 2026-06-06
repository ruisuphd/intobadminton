import products from "@/data/products.json";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = products as ProductRecord[];

/** Tier-4 / budget-SKU productIds on commercial specialty landings (Sprint 77 guard). */
export const TIER4_BUDGET_PRODUCT_IDS = [
  "bonny-carbon-armour",
  "bonny-future-land-3",
  "kumpoo-kh-g805-lite-pro",
  "kumpoo-shura-2",
  "kawasaki-kace",
  "kawasaki-crimson-blade",
  "vic-fz-88d-power-purple",
  "vic-thruster-sr",
  "vic-thruster-hwql",
  "ln-bladesabre-2-pro",
  "ln-bladex-arrow",
  "ln-axforce-10",
  "ln-axforce-80-jr",
] as const;

export type Tier4ImageWaiver = {
  productId: string;
  reason: string;
};

/** Documented gaps until a verified manufacturer/retailer image is available. */
export const TIER4_IMAGE_WAIVERS: Tier4ImageWaiver[] = [
  {
    productId: "bonny-future-land-3",
    reason:
      "Bonny wide-last shoe — no verified manufacturer or distributor product photo in Western catalogues yet",
  },
  {
    productId: "bonny-carbon-armour",
    reason:
      "Bonny protection shoe — China-market SKU; no verified Western distributor listing yet",
  },
  {
    productId: "kumpoo-kh-g805-lite-pro",
    reason:
      "Kumpoo campus shoe — no verified Western distributor product photo yet",
  },
  {
    productId: "kumpoo-shura-2",
    reason:
      "Kumpoo Shura II — China-market flagship; no verified Western distributor listing yet",
  },
  {
    productId: "kawasaki-kace",
    reason:
      "Kawasaki KACE shoe — no verified Western distributor product photo yet",
  },
  {
    productId: "kawasaki-crimson-blade",
    reason:
      "Kawasaki Crimson Blade — CN-market 5U; no verified Western distributor listing yet",
  },
  {
    productId: "vic-fz-88d-power-purple",
    reason:
      "Victor FZ 88D Power Purple — CN/SG niche SKU; no verified Western distributor listing yet",
  },
  {
    productId: "vic-thruster-sr",
    reason:
      "Victor Thruster SR Light (樱花刃) — CN-market TK-SR reskin; no verified Western distributor listing yet",
  },
  {
    productId: "ln-bladesabre-2-pro",
    reason:
      "Li-Ning Bladesabre 2 Pro — CN-market shoe; no verified Western distributor listing yet",
  },
  {
    productId: "ln-bladex-arrow",
    reason:
      "Li-Ning Bladex Arrow entry 5U — CN-market SKU; no verified Western distributor listing yet",
  },
  {
    productId: "ln-axforce-10",
    reason:
      "Li-Ning AxForce 10 entry attack — CN-market SKU; no verified Western distributor listing yet",
  },
  {
    productId: "ln-axforce-80-jr",
    reason:
      "Li-Ning AxForce 80 JR 5U — CN-market SKU; no verified Western distributor listing yet",
  },
];

/** Minimum tier-4 budget SKUs with verified catalogue imagery (waivers excluded). */
export const TIER4_IMAGE_MIN_VERIFIED = 1;

export type Tier4ImageBaselineIssue = {
  productId: string;
  message: string;
};

export function isTier4BudgetProductId(id: string): boolean {
  return (TIER4_BUDGET_PRODUCT_IDS as readonly string[]).includes(id);
}

export function tier4ImageWaiverFor(productId: string): Tier4ImageWaiver | undefined {
  return TIER4_IMAGE_WAIVERS.find((w) => w.productId === productId);
}

export function hasVerifiedCatalogueImage(
  productId: string,
  catalog: ProductRecord[] = CATALOG
): boolean {
  const product = catalog.find((p) => p.id === productId);
  return product?.image?.verified === true;
}

export function countTier4VerifiedImages(
  catalog: ProductRecord[] = CATALOG
): number {
  return TIER4_BUDGET_PRODUCT_IDS.filter(
    (id) => hasVerifiedCatalogueImage(id, catalog) && !tier4ImageWaiverFor(id)
  ).length;
}

export function evaluateTier4ImageBaseline(
  catalog: ProductRecord[] = CATALOG
): { ok: boolean; issues: Tier4ImageBaselineIssue[]; verified: number } {
  const issues: Tier4ImageBaselineIssue[] = [];
  const verified = TIER4_BUDGET_PRODUCT_IDS.filter((id) =>
    hasVerifiedCatalogueImage(id, catalog)
  ).length;

  if (verified < TIER4_IMAGE_MIN_VERIFIED) {
    issues.push({
      productId: "*",
      message: `expected ≥${TIER4_IMAGE_MIN_VERIFIED} tier-4 budget SKUs with verified catalogue images, found ${verified}`,
    });
  }

  for (const id of TIER4_BUDGET_PRODUCT_IDS) {
    if (tier4ImageWaiverFor(id)) continue;
    if (!hasVerifiedCatalogueImage(id, catalog)) {
      issues.push({
        productId: id,
        message: "missing verified catalogue image (no waiver documented)",
      });
    }
  }

  return { ok: issues.length === 0, issues, verified };
}

export function formatTier4ImageBaselineIssues(
  issues: Tier4ImageBaselineIssue[]
): string {
  return issues.map((i) => `[${i.productId}] ${i.message}`).join("\n");
}
