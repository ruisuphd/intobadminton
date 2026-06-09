/**
 * Golden-profile regression guard for `/best/*` buying-guide routes.
 *
 * Ensures committed slugs resolve to valid catalog exit hrefs, related reading
 * shelves, and catalogue product wiring for mapped picks.
 *
 * Committed expectations live in `docs/baselines/best-queries.json`.
 */

import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import { illustrativeFitForProductId } from "@/lib/best-picks-scoring";
import {
  bestCatalogFilterSlugs,
  catalogHrefFromBestSlug,
} from "@/lib/catalog-url";
import { relatedReadingForPath } from "@/lib/related-content";
import { editorialReviewHref } from "@/lib/review-pages";
import type { ProductRecord } from "@/lib/types/product";

export type BestBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  slug: string;
  expectCatalogHref: string;
  expectMinRelatedReading?: number;
  /** Mapped catalogue id on a pick must resolve. */
  expectProductId?: string;
  /** illustrativeFitForProductId must return a fit score. */
  expectIllustrativeFit?: boolean;
  /** Include in Playwright best baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  /** Hub layout must render finder CTA. */
  expectFinderCta?: boolean;
  /** Hub layout must render Keep reading shelf. */
  expectKeepReadingShelf?: boolean;
  /** Buying-guide layout must render comparison table (not hub index). */
  expectComparisonTable?: boolean;
  note?: string;
};

export type BestBaselineCoverageSpec = {
  minCatalogFilterSlugs?: number;
  minE2eGuards?: number;
};

export type BestBaselineFile = {
  version: number;
  updated?: string;
  coverage?: BestBaselineCoverageSpec;
  queries: BestBaselineQuery[];
};

export type BestBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type BestBaselineResult = {
  ok: boolean;
  issues: BestBaselineIssue[];
  checked: number;
};

export function bestPathForSlug(slug: string): string {
  const trimmed = slug.trim();
  if (!trimmed || trimmed === "index") return "/best/";
  return `/best/${trimmed}/`;
}

export function validateBestBaselineFile(
  data: unknown
): { ok: true; file: BestBaselineFile } | { ok: false; message: string } {
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

  const queries: BestBaselineQuery[] = [];
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
      expectProductId:
        typeof q.expectProductId === "string" ? q.expectProductId : undefined,
      expectIllustrativeFit: q.expectIllustrativeFit === true,
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
      expectComparisonTable: q.expectComparisonTable === true,
      note: typeof q.note === "string" ? q.note : undefined,
    });
  }

  const coverageRaw = record.coverage;
  let coverage: BestBaselineCoverageSpec | undefined;
  if (coverageRaw != null) {
    if (typeof coverageRaw !== "object") {
      return { ok: false, message: "baseline.coverage must be an object" };
    }
    const c = coverageRaw as Record<string, unknown>;
    coverage = {
      minCatalogFilterSlugs:
        typeof c.minCatalogFilterSlugs === "number"
          ? c.minCatalogFilterSlugs
          : undefined,
      minE2eGuards:
        typeof c.minE2eGuards === "number" ? c.minE2eGuards : undefined,
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

export function evaluateBestBaselineQuery(
  spec: BestBaselineQuery,
  lookup: (id: string) => ProductRecord | undefined
): BestBaselineIssue | null {
  const isIndex = spec.slug === "index";
  const href = isIndex ? "/catalog/" : catalogHrefFromBestSlug(spec.slug);
  if (href !== spec.expectCatalogHref) {
    return {
      id: spec.id,
      message: `catalog href "${href}" !== expected "${spec.expectCatalogHref}"`,
      note: spec.note,
    };
  }

  const related = relatedReadingForPath(bestPathForSlug(spec.slug));
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

  if (spec.expectProductId) {
    if (isIndex) {
      return {
        id: spec.id,
        message: "expectProductId is not valid for hub index slug",
        note: spec.note,
      };
    }
    const product = lookup(spec.expectProductId);
    if (!product) {
      return {
        id: spec.id,
        message: `expectProductId "${spec.expectProductId}" not in catalogue`,
        note: spec.note,
      };
    }

    if (spec.expectIllustrativeFit) {
      const scored = illustrativeFitForProductId(spec.expectProductId);
      if (!scored || typeof scored.fitScore !== "number") {
        return {
          id: spec.id,
          message: `illustrative fit score missing for "${spec.expectProductId}"`,
          note: spec.note,
        };
      }
    }

    const reviewHref = editorialReviewHref(spec.expectProductId);
    if (!reviewHref) {
      return {
        id: spec.id,
        message: `editorialReviewHref missing for mapped pick "${spec.expectProductId}"`,
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluateBestBaselineCoverage(
  file: BestBaselineFile
): BestBaselineIssue | null {
  const minSlugs = file.coverage?.minCatalogFilterSlugs;
  if (minSlugs == null) return null;

  const wired = bestCatalogFilterSlugs().length;
  if (wired < minSlugs) {
    return {
      id: "coverage",
      message: `catalog filter slugs ${wired} < ${minSlugs}`,
    };
  }

  return null;
}

export function evaluateBestBaseline(
  file: BestBaselineFile,
  lookup: (id: string) => ProductRecord | undefined
): BestBaselineResult {
  const issues: BestBaselineIssue[] = [];

  const coverageIssue = evaluateBestBaselineCoverage(file);
  if (coverageIssue) issues.push(coverageIssue);

  const e2eCoverageIssue = evaluateBaselineE2eCoverage(
    file.coverage,
    file.queries,
    "best"
  );
  if (e2eCoverageIssue) {
    issues.push({
      id: "coverage",
      message: e2eCoverageIssue.message,
    });
  }

  for (const query of file.queries) {
    const issue = evaluateBestBaselineQuery(query, lookup);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatBestBaselineIssues(result: BestBaselineResult): string {
  return result.issues
    .map((issue) => `[${issue.id}] ${issue.message}${issue.note ? ` (${issue.note})` : ""}`)
    .join("\n");
}
