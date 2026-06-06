/**
 * Golden-profile regression guard for `/compare-guides/*` editorial routes.
 *
 * Ensures committed slugs resolve to valid catalog exit hrefs, related reading
 * shelves, manifest entries, and catalogue product wiring for duel picks.
 *
 * Committed expectations live in `docs/baselines/compare-guides-queries.json`.
 */

import { compareGuideByPath, COMPARE_GUIDES } from "@/lib/compare-guides";
import {
  catalogHrefFromCompareSlug,
  compareCatalogFilterSlugs,
} from "@/lib/catalog-url";
import { relatedReadingForPath } from "@/lib/related-content";
import { editorialReviewHref } from "@/lib/review-pages";
import type { ProductRecord } from "@/lib/types/product";

export type CompareGuidesBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  slug: string;
  expectCatalogHref: string;
  expectMinRelatedReading?: number;
  /** Slug must appear in `COMPARE_GUIDES` manifest. */
  expectInManifest?: boolean;
  /** Mapped catalogue ids on duel picks must resolve. */
  expectProductIds?: string[];
  /** Include in Playwright compare-guides baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  /** Duel layout must render a side-by-side comparison table. */
  expectComparisonTable?: boolean;
  /** Concept/duel layout must render Keep reading shelf. */
  expectKeepReadingShelf?: boolean;
  /** Hub layout must render finder CTA. */
  expectFinderCta?: boolean;
  note?: string;
};

export type CompareGuidesBaselineCoverageSpec = {
  minCatalogFilterSlugs?: number;
  minManifestEntries?: number;
};

export type CompareGuidesBaselineFile = {
  version: number;
  updated?: string;
  coverage?: CompareGuidesBaselineCoverageSpec;
  queries: CompareGuidesBaselineQuery[];
};

export type CompareGuidesBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type CompareGuidesBaselineResult = {
  ok: boolean;
  issues: CompareGuidesBaselineIssue[];
  checked: number;
};

export function compareGuidePathForSlug(slug: string): string {
  const trimmed = slug.trim();
  if (!trimmed || trimmed === "index") return "/compare-guides/";
  return `/compare-guides/${trimmed}/`;
}

export function validateCompareGuidesBaselineFile(
  data: unknown
): { ok: true; file: CompareGuidesBaselineFile } | { ok: false; message: string } {
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

  const queries: CompareGuidesBaselineQuery[] = [];
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

    const expectProductIds = Array.isArray(q.expectProductIds)
      ? q.expectProductIds.filter((id): id is string => typeof id === "string")
      : undefined;

    queries.push({
      id: q.id,
      slug: q.slug,
      expectCatalogHref: q.expectCatalogHref,
      expectMinRelatedReading:
        typeof q.expectMinRelatedReading === "number"
          ? q.expectMinRelatedReading
          : undefined,
      expectInManifest: q.expectInManifest === true,
      expectProductIds:
        expectProductIds && expectProductIds.length > 0
          ? expectProductIds
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
      expectComparisonTable: q.expectComparisonTable === true,
      expectKeepReadingShelf: q.expectKeepReadingShelf === true,
      expectFinderCta: q.expectFinderCta === true,
      note: typeof q.note === "string" ? q.note : undefined,
    });
  }

  const coverageRaw = record.coverage;
  let coverage: CompareGuidesBaselineCoverageSpec | undefined;
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
      minManifestEntries:
        typeof c.minManifestEntries === "number"
          ? c.minManifestEntries
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

export function evaluateCompareGuidesBaselineQuery(
  spec: CompareGuidesBaselineQuery,
  lookup: (id: string) => ProductRecord | undefined
): CompareGuidesBaselineIssue | null {
  const isIndex = spec.slug === "index";
  const href = isIndex ? "/catalog/" : catalogHrefFromCompareSlug(spec.slug);
  if (href !== spec.expectCatalogHref) {
    return {
      id: spec.id,
      message: `catalog href "${href}" !== expected "${spec.expectCatalogHref}"`,
      note: spec.note,
    };
  }

  const path = compareGuidePathForSlug(spec.slug);
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

  if (spec.expectInManifest && !isIndex && !compareGuideByPath(path)) {
    return {
      id: spec.id,
      message: `slug "${spec.slug}" missing from COMPARE_GUIDES manifest`,
      note: spec.note,
    };
  }

  if (spec.expectProductIds) {
    if (isIndex) {
      return {
        id: spec.id,
        message: "expectProductIds is not valid for hub index slug",
        note: spec.note,
      };
    }
    for (const productId of spec.expectProductIds) {
      const product = lookup(productId);
      if (!product) {
        return {
          id: spec.id,
          message: `expectProductId "${productId}" not in catalogue`,
          note: spec.note,
        };
      }

      const reviewHref = editorialReviewHref(productId);
      if (!reviewHref) {
        return {
          id: spec.id,
          message: `editorialReviewHref missing for mapped pick "${productId}"`,
          note: spec.note,
        };
      }
    }
  }

  return null;
}

export function evaluateCompareGuidesBaselineCoverage(
  file: CompareGuidesBaselineFile
): CompareGuidesBaselineIssue | null {
  const minSlugs = file.coverage?.minCatalogFilterSlugs;
  if (minSlugs != null) {
    const wired = compareCatalogFilterSlugs().length;
    if (wired < minSlugs) {
      return {
        id: "coverage",
        message: `catalog filter slugs ${wired} < ${minSlugs}`,
      };
    }
  }

  const minManifest = file.coverage?.minManifestEntries;
  if (minManifest != null && COMPARE_GUIDES.length < minManifest) {
    return {
      id: "coverage",
      message: `COMPARE_GUIDES entries ${COMPARE_GUIDES.length} < ${minManifest}`,
    };
  }

  return null;
}

export function evaluateCompareGuidesBaseline(
  file: CompareGuidesBaselineFile,
  lookup: (id: string) => ProductRecord | undefined
): CompareGuidesBaselineResult {
  const issues: CompareGuidesBaselineIssue[] = [];

  const coverageIssue = evaluateCompareGuidesBaselineCoverage(file);
  if (coverageIssue) issues.push(coverageIssue);

  for (const query of file.queries) {
    const issue = evaluateCompareGuidesBaselineQuery(query, lookup);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatCompareGuidesBaselineIssues(
  result: CompareGuidesBaselineResult
): string {
  return result.issues
    .map(
      (issue) =>
        `[${issue.id}] ${issue.message}${issue.note ? ` (${issue.note})` : ""}`
    )
    .join("\n");
}
