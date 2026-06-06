import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export type BestImageWaiver = {
  slug: string;
  pickName: string;
  reason: string;
};

/** Documented gaps until a verified manufacturer/retailer image is available. */
export const BEST_IMAGE_WAIVERS: BestImageWaiver[] = [
  {
    slug: "strings",
    pickName: "L69",
    reason:
      "L69 (2026) has no verified UK/EU distributor product image yet; awaiting official retailer listing.",
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
  strings: { pickCount: 6, waivers: 1 },
  shoes: { pickCount: 6, waivers: 0 },
  "beginner-rackets": { pickCount: 6, waivers: 0 },
  "doubles-rackets": { pickCount: 6, waivers: 0 },
};

export type BestImageCoverageIssue = {
  slug: string;
  message: string;
};

export function countVerifiedImagesInSource(source: string): number {
  return (source.match(/verified:\s*true/g) ?? []).length;
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
    const verified = countVerifiedImagesInSource(source);
    const required = req.pickCount - req.waivers;

    if (verified < required) {
      issues.push({
        slug,
        message: `expected ≥${required} verified images (${req.pickCount} picks − ${req.waivers} waiver), found ${verified}`,
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
