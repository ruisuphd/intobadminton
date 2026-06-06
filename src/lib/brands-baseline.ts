/**
 * Golden-profile regression guard for `/brands/*` brand profile routes.
 *
 * Ensures committed slugs resolve to valid catalog exit hrefs, related reading
 * shelves on the hub, and catalogue CTA label wiring.
 *
 * Committed expectations live in `docs/baselines/brands-queries.json`.
 */

import {
  brandNameFromBrandSlug,
  catalogCtaLabelForBrandsIndex,
  catalogCtaLabelFromBrandSlug,
  catalogHrefFromBrandSlug,
  dedicatedBrandPageSlugs,
} from "@/lib/catalog-url";
import { relatedReadingForPath } from "@/lib/related-content";

export type BrandsBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  /** Brand slug, or `index` for `/brands/` hub. */
  slug: string;
  expectCatalogHref: string;
  expectMinRelatedReading?: number;
  /** Include in Playwright brands baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  /** Brand layout must render finder CTA. */
  expectFinderCta?: boolean;
  /** Hub layout must render Keep reading shelf. */
  expectKeepReadingShelf?: boolean;
  note?: string;
};

export type BrandsBaselineCoverageSpec = {
  minDedicatedBrandSlugs?: number;
};

export type BrandsBaselineFile = {
  version: number;
  updated?: string;
  coverage?: BrandsBaselineCoverageSpec;
  queries: BrandsBaselineQuery[];
};

export type BrandsBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type BrandsBaselineResult = {
  ok: boolean;
  issues: BrandsBaselineIssue[];
  checked: number;
};

export function brandPathForSlug(slug: string): string {
  const trimmed = slug.trim();
  if (!trimmed || trimmed === "index") return "/brands/";
  return `/brands/${trimmed}/`;
}

export function validateBrandsBaselineFile(
  data: unknown
): { ok: true; file: BrandsBaselineFile } | { ok: false; message: string } {
  if (data == null || typeof data !== "object") {
    return { ok: false, message: "baseline must be a JSON object" };
  }
  const record = data as Record<string, unknown>;
  if (typeof record.version !== "number" || !Number.isFinite(record.version)) {
    return { ok: false, message: "baseline.version must be a number" };
  }
  if (!Array.isArray(record.queries)) {
    return { ok: false, message: "baseline.queries must be an array" };
  }

  const queries: BrandsBaselineQuery[] = [];
  for (let i = 0; i < record.queries.length; i++) {
    const row = record.queries[i];
    if (row == null || typeof row !== "object") {
      return { ok: false, message: `queries[${i}] must be an object` };
    }
    const q = row as Record<string, unknown>;
    if (typeof q.id !== "string" || !q.id.trim()) {
      return {
        ok: false,
        message: `queries[${i}].id must be a non-empty string`,
      };
    }
    if (typeof q.slug !== "string" || !q.slug.trim()) {
      return {
        ok: false,
        message: `queries[${i}].slug must be a non-empty string`,
      };
    }
    if (typeof q.expectCatalogHref !== "string" || !q.expectCatalogHref.trim()) {
      return {
        ok: false,
        message: `queries[${i}].expectCatalogHref must be a non-empty string`,
      };
    }

    queries.push({
      id: q.id,
      slug: q.slug,
      expectCatalogHref: q.expectCatalogHref,
      expectMinRelatedReading:
        typeof q.expectMinRelatedReading === "number"
          ? q.expectMinRelatedReading
          : undefined,
      e2e: q.e2e === true,
      expectHeadingPattern:
        typeof q.expectHeadingPattern === "string"
          ? q.expectHeadingPattern
          : undefined,
      expectCatalogLinkPattern:
        typeof q.expectCatalogLinkPattern === "string"
          ? q.expectCatalogLinkPattern
          : undefined,
      expectFinderCta: q.expectFinderCta === true,
      expectKeepReadingShelf: q.expectKeepReadingShelf === true,
      note: typeof q.note === "string" ? q.note : undefined,
    });
  }

  const coverageRaw = record.coverage;
  let coverage: BrandsBaselineCoverageSpec | undefined;
  if (coverageRaw != null) {
    if (typeof coverageRaw !== "object") {
      return { ok: false, message: "baseline.coverage must be an object" };
    }
    const c = coverageRaw as Record<string, unknown>;
    coverage = {
      minDedicatedBrandSlugs:
        typeof c.minDedicatedBrandSlugs === "number"
          ? c.minDedicatedBrandSlugs
          : undefined,
    };
  }

  return {
    ok: true,
    file: {
      version: record.version,
      updated:
        typeof record.updated === "string" ? record.updated : undefined,
      coverage,
      queries,
    },
  };
}

export function evaluateBrandsBaselineQuery(
  spec: BrandsBaselineQuery
): BrandsBaselineIssue | null {
  const isIndex = spec.slug === "index";
  const href = isIndex ? "/catalog/" : catalogHrefFromBrandSlug(spec.slug);
  if (href !== spec.expectCatalogHref) {
    return {
      id: spec.id,
      message: `catalog href "${href}" !== expected "${spec.expectCatalogHref}"`,
      note: spec.note,
    };
  }

  const path = brandPathForSlug(spec.slug);
  const related = relatedReadingForPath(path);
  if (
    spec.expectMinRelatedReading != null &&
    related.length < spec.expectMinRelatedReading
  ) {
    return {
      id: spec.id,
      message: `related reading count ${related.length} < ${spec.expectMinRelatedReading}`,
      note: spec.note,
    };
  }

  const ctaLabel = isIndex
    ? catalogCtaLabelForBrandsIndex()
    : catalogCtaLabelFromBrandSlug(spec.slug);
  if (!ctaLabel.trim()) {
    return {
      id: spec.id,
      message: `catalog CTA label missing for slug "${spec.slug}"`,
      note: spec.note,
    };
  }

  if (!isIndex && !brandNameFromBrandSlug(spec.slug)) {
    return {
      id: spec.id,
      message: `unknown dedicated brand slug "${spec.slug}"`,
      note: spec.note,
    };
  }

  return null;
}

export function evaluateBrandsBaselineCoverage(
  file: BrandsBaselineFile
): BrandsBaselineIssue | null {
  const minSlugs = file.coverage?.minDedicatedBrandSlugs;
  if (minSlugs != null) {
    const wired = dedicatedBrandPageSlugs().length;
    if (wired < minSlugs) {
      return {
        id: "coverage",
        message: `dedicated brand slugs ${wired} < ${minSlugs}`,
      };
    }
  }

  return null;
}

export function evaluateBrandsBaseline(
  file: BrandsBaselineFile
): BrandsBaselineResult {
  const issues: BrandsBaselineIssue[] = [];

  const coverageIssue = evaluateBrandsBaselineCoverage(file);
  if (coverageIssue) issues.push(coverageIssue);

  for (const query of file.queries) {
    const issue = evaluateBrandsBaselineQuery(query);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatBrandsBaselineIssues(
  result: BrandsBaselineResult
): string {
  return result.issues
    .map(
      (issue) =>
        `[${issue.id}] ${issue.message}${issue.note ? ` (${issue.note})` : ""}`
    )
    .join("\n");
}
