import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export type BestProductIdWaiver = {
  slug: string;
  pickName: string;
  reason: string;
};

/** Picks without a catalogue SKU — documented until ingest adds the product. */
export const BEST_PRODUCT_ID_WAIVERS: BestProductIdWaiver[] = [
  {
    slug: "strings",
    pickName: "Aerobite",
    reason: "Hybrid string not yet in catalogue — no single-SKU mapping.",
  },
  {
    slug: "strings",
    pickName: "BG80 Power",
    reason: "BG80 Power variant not yet ingested as a separate catalogue SKU.",
  },
];

/**
 * Commercial /best/* landings guarded for catalogue `productId` linkage.
 * `waivers` subtract from the six-pick default when no catalogue SKU exists.
 */
export const BEST_PRODUCT_ID_REQUIREMENTS: Record<
  string,
  { pickCount: number; waivers: number }
> = {
  strings: { pickCount: 6, waivers: 2 },
  shoes: { pickCount: 6, waivers: 0 },
  "beginner-rackets": { pickCount: 6, waivers: 0 },
  "doubles-rackets": { pickCount: 6, waivers: 0 },
  "smash-heavy-rackets": { pickCount: 6, waivers: 0 },
  "intermediate-rackets": { pickCount: 6, waivers: 0 },
  "singles-rackets": { pickCount: 6, waivers: 0 },
  "lightweight-rackets-5u": { pickCount: 6, waivers: 0 },
  "rackets-for-shoulder-comfort": { pickCount: 6, waivers: 0 },
  "all-round-rackets": { pickCount: 6, waivers: 0 },
  "control-rackets": { pickCount: 6, waivers: 0 },
  "defensive-rackets": { pickCount: 6, waivers: 0 },
  "head-heavy-rackets-under-150": { pickCount: 6, waivers: 0 },
  "head-light-rackets": { pickCount: 6, waivers: 0 },
  "rackets-under-100": { pickCount: 6, waivers: 0 },
  "budget-badminton-shoes": { pickCount: 6, waivers: 0 },
  "wide-feet-badminton-shoes": { pickCount: 6, waivers: 0 },
};

export type BestProductIdCoverageIssue = {
  slug: string;
  message: string;
};

export function countProductIdsInSource(source: string): number {
  return (source.match(/productId:\s*"/g) ?? []).length;
}

export function requirementForProductIdSlug(slug: string) {
  return BEST_PRODUCT_ID_REQUIREMENTS[slug];
}

export function evaluateBestProductIdCoverage(
  rootDir: string = process.cwd()
): { ok: boolean; issues: BestProductIdCoverageIssue[] } {
  const issues: BestProductIdCoverageIssue[] = [];

  for (const [slug, req] of Object.entries(BEST_PRODUCT_ID_REQUIREMENTS)) {
    const pagePath = resolve(rootDir, `src/app/best/${slug}/page.tsx`);
    if (!existsSync(pagePath)) {
      issues.push({ slug, message: `missing page: ${pagePath}` });
      continue;
    }

    const source = readFileSync(pagePath, "utf8");
    const wired = countProductIdsInSource(source);
    const required = req.pickCount - req.waivers;

    if (wired < required) {
      issues.push({
        slug,
        message: `expected ≥${required} productId links (${req.pickCount} picks − ${req.waivers} waiver), found ${wired}`,
      });
    }
  }

  return { ok: issues.length === 0, issues };
}

export function formatBestProductIdCoverageIssues(
  issues: BestProductIdCoverageIssue[]
): string {
  return issues.map((i) => `[${i.slug}] ${i.message}`).join("\n");
}
