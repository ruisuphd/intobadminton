/**
 * Golden-profile regression guard for `/guides/*` procedural routes.
 *
 * Ensures committed slugs resolve to valid catalog exit hrefs, related reading
 * shelves, and catalogue CTA label wiring.
 *
 * Committed expectations live in `docs/baselines/guides-queries.json`.
 */

import {
  evaluateBaselineE2eCoverage,
  type BaselineE2eCoverage,
} from "@/lib/baseline-coverage";
import {
  catalogCtaLabelFromGuideSlug,
  catalogHrefFromGuideSlug,
  guideCatalogFilterSlugs,
} from "@/lib/catalog-url";
import { relatedReadingForPath } from "@/lib/related-content";

export type GuidesBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  slug: string;
  expectCatalogHref: string;
  expectMinRelatedReading?: number;
  /** Include in Playwright guides baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  /** Guide layout must render Keep reading shelf. */
  expectKeepReadingShelf?: boolean;
  /** Hub layout must render finder CTA. */
  expectFinderCta?: boolean;
  note?: string;
};

export type GuidesBaselineCoverageSpec = BaselineE2eCoverage & {
  minCatalogFilterSlugs?: number;
};

export type GuidesBaselineFile = {
  version: number;
  updated?: string;
  coverage?: GuidesBaselineCoverageSpec;
  queries: GuidesBaselineQuery[];
};

export type GuidesBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type GuidesBaselineResult = {
  ok: boolean;
  issues: GuidesBaselineIssue[];
  checked: number;
};

export function guidePathForSlug(slug: string): string {
  const trimmed = slug.trim();
  if (!trimmed || trimmed === "index") return "/guides/";
  return `/guides/${trimmed}/`;
}

export function validateGuidesBaselineFile(
  data: unknown
): { ok: true; file: GuidesBaselineFile } | { ok: false; message: string } {
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

  const queries: GuidesBaselineQuery[] = [];
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
      expectKeepReadingShelf: q.expectKeepReadingShelf === true,
      expectFinderCta: q.expectFinderCta === true,
      note: typeof q.note === "string" ? q.note : undefined,
    });
  }

  const coverageRaw = record.coverage;
  let coverage: GuidesBaselineCoverageSpec | undefined;
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

export function evaluateGuidesBaselineQuery(
  spec: GuidesBaselineQuery
): GuidesBaselineIssue | null {
  const isIndex = spec.slug === "index";
  const href = isIndex ? "/catalog/" : catalogHrefFromGuideSlug(spec.slug);
  if (href !== spec.expectCatalogHref) {
    return {
      id: spec.id,
      message: `catalog href "${href}" !== expected "${spec.expectCatalogHref}"`,
      note: spec.note,
    };
  }

  const path = guidePathForSlug(spec.slug);
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

  if (isIndex) {
    return null;
  }

  const ctaLabel = catalogCtaLabelFromGuideSlug(spec.slug);
  if (!ctaLabel.trim()) {
    return {
      id: spec.id,
      message: `catalog CTA label missing for slug "${spec.slug}"`,
      note: spec.note,
    };
  }

  return null;
}

export function evaluateGuidesBaselineCoverage(
  file: GuidesBaselineFile
): GuidesBaselineIssue | null {
  const minSlugs = file.coverage?.minCatalogFilterSlugs;
  if (minSlugs != null) {
    const wired = guideCatalogFilterSlugs().length;
    if (wired < minSlugs) {
      return {
        id: "coverage",
        message: `catalog filter slugs ${wired} < ${minSlugs}`,
      };
    }
  }

  return null;
}

export function evaluateGuidesBaseline(
  file: GuidesBaselineFile
): GuidesBaselineResult {
  const issues: GuidesBaselineIssue[] = [];

  const coverageIssue = evaluateGuidesBaselineCoverage(file);
  if (coverageIssue) issues.push(coverageIssue);

  const e2eCoverageIssue = evaluateBaselineE2eCoverage(
    file.coverage,
    file.queries,
    "guides"
  );
  if (e2eCoverageIssue) {
    issues.push({
      id: "coverage",
      message: e2eCoverageIssue.message,
    });
  }

  for (const query of file.queries) {
    const issue = evaluateGuidesBaselineQuery(query);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatGuidesBaselineIssues(
  result: GuidesBaselineResult
): string {
  return result.issues
    .map(
      (issue) =>
        `[${issue.id}] ${issue.message}${issue.note ? ` (${issue.note})` : ""}`
    )
    .join("\n");
}
