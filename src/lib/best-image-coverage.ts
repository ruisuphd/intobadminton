import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import products from "@/data/products.json";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = products as ProductRecord[];

export type BestImageWaiver = {
  slug: string;
  pickName: string;
  reason: string;
};

/** Documented gaps until a verified manufacturer/retailer image is available. */
export const BEST_IMAGE_WAIVERS: BestImageWaiver[] = [
  {
    slug: "head-light-rackets",
    pickName: "Nanoray Light 70i",
    reason:
      "Discontinued Yonex entry SKU — no verified manufacturer or distributor product photo yet",
  },
  {
    slug: "rackets-for-shoulder-comfort",
    pickName: "Nanoray Light 70i",
    reason:
      "Discontinued Yonex entry SKU — no verified manufacturer or distributor product photo yet",
  },
];

/**
 * Commercial /best/* landings guarded for verified manufacturer photography.
 * `waivers` subtract from the six-pick default when a SKU lacks a distributor image.
 */
export const BEST_IMAGE_REQUIREMENTS: Record<
  string,
  { pickCount: number; waivers: number }
> = {
  strings: { pickCount: 6, waivers: 0 },
  shoes: { pickCount: 6, waivers: 0 },
  "beginner-rackets": { pickCount: 6, waivers: 0 },
  "doubles-rackets": { pickCount: 6, waivers: 0 },
  "all-round-rackets": { pickCount: 6, waivers: 0 },
  "intermediate-rackets": { pickCount: 6, waivers: 0 },
  "smash-heavy-rackets": { pickCount: 6, waivers: 0 },
  "singles-rackets": { pickCount: 6, waivers: 0 },
  "control-rackets": { pickCount: 6, waivers: 0 },
  "defensive-rackets": { pickCount: 6, waivers: 0 },
  "head-light-rackets": { pickCount: 6, waivers: 1 },
  "rackets-for-shoulder-comfort": { pickCount: 6, waivers: 1 },
};

export type BestImageCoverageIssue = {
  slug: string;
  message: string;
};

/** @deprecated Prefer {@link countVerifiedPickCoverage} — counts inline `verified: true` only. */
export function countVerifiedImagesInSource(source: string): number {
  return (source.match(/verified:\s*true/g) ?? []).length;
}

export function productIdsInBestSource(source: string): string[] {
  return [...source.matchAll(/productId:\s*"([^"]+)"/g)].map((m) => m[1]);
}

/** True when inline pick image or catalogue SKU image is verified. */
export function pickHasVerifiedImage(
  source: string,
  productId: string,
  catalog: ProductRecord[] = CATALOG
): boolean {
  const product = catalog.find((p) => p.id === productId);
  if (product?.image?.verified) return true;

  const escaped = productId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = new RegExp(
    `productId:\\s*"${escaped}"[\\s\\S]{0,1400}?verified:\\s*true`
  );
  return block.test(source);
}

/** Count picks with verified imagery via inline block or catalogue `productId` fallback. */
export function countVerifiedPickCoverage(
  source: string,
  catalog: ProductRecord[] = CATALOG
): number {
  const ids = productIdsInBestSource(source);
  return ids.filter((id) => pickHasVerifiedImage(source, id, catalog)).length;
}

export function requirementForSlug(slug: string) {
  return BEST_IMAGE_REQUIREMENTS[slug];
}

export function evaluateBestImageCoverage(
  rootDir: string = process.cwd()
): { ok: boolean; issues: BestImageCoverageIssue[] } {
  const issues: BestImageCoverageIssue[] = [];

  for (const [slug, req] of Object.entries(BEST_IMAGE_REQUIREMENTS)) {
    const pagePath = resolve(rootDir, `src/app/best/${slug}/page.tsx`);
    if (!existsSync(pagePath)) {
      issues.push({ slug, message: `missing page: ${pagePath}` });
      continue;
    }

    const source = readFileSync(pagePath, "utf8");
    const verified = countVerifiedPickCoverage(source);
    const required = req.pickCount - req.waivers;

    if (verified < required) {
      issues.push({
        slug,
        message: `expected ≥${required} verified pick images (${req.pickCount} picks − ${req.waivers} waiver), found ${verified}`,
      });
    }
  }

  return { ok: issues.length === 0, issues };
}

export function formatBestImageCoverageIssues(
  issues: BestImageCoverageIssue[]
): string {
  return issues.map((i) => `[${i.slug}] ${i.message}`).join("\n");
}
