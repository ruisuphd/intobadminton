/**
 * Golden-profile regression guard for `/tools/*` interactive routes.
 *
 * Ensures committed slugs resolve to valid catalog exit hrefs and catalogue
 * CTA label wiring.
 *
 * Committed expectations live in `docs/baselines/tools-queries.json`.
 */

import {
  catalogCtaLabelFromToolSlug,
  catalogHrefFromToolSlug,
  toolCatalogFilterSlugs,
} from "@/lib/catalog-url";

export type ToolsBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  slug: string;
  expectCatalogHref: string;
  /** Include in Playwright tools baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  /** Tool layout must render finder CTA. */
  expectFinderCta?: boolean;
  note?: string;
};

export type ToolsBaselineCoverageSpec = {
  minCatalogFilterSlugs?: number;
};

export type ToolsBaselineFile = {
  version: number;
  updated?: string;
  coverage?: ToolsBaselineCoverageSpec;
  queries: ToolsBaselineQuery[];
};

export type ToolsBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type ToolsBaselineResult = {
  ok: boolean;
  issues: ToolsBaselineIssue[];
  checked: number;
};

export function toolPathForSlug(slug: string): string {
  const trimmed = slug.trim();
  if (!trimmed || trimmed === "index") return "/tools/";
  return `/tools/${trimmed}/`;
}

export function validateToolsBaselineFile(
  data: unknown
): { ok: true; file: ToolsBaselineFile } | { ok: false; message: string } {
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

  const queries: ToolsBaselineQuery[] = [];
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
      note: typeof q.note === "string" ? q.note : undefined,
    });
  }

  const coverageRaw = record.coverage;
  let coverage: ToolsBaselineCoverageSpec | undefined;
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

export function evaluateToolsBaselineQuery(
  spec: ToolsBaselineQuery
): ToolsBaselineIssue | null {
  const isIndex = spec.slug === "index";
  const href = isIndex ? "/catalog/" : catalogHrefFromToolSlug(spec.slug);
  if (href !== spec.expectCatalogHref) {
    return {
      id: spec.id,
      message: `catalog href "${href}" !== expected "${spec.expectCatalogHref}"`,
      note: spec.note,
    };
  }

  if (isIndex) {
    return null;
  }

  const ctaLabel = catalogCtaLabelFromToolSlug(spec.slug);
  if (!ctaLabel.trim()) {
    return {
      id: spec.id,
      message: `catalog CTA label missing for slug "${spec.slug}"`,
      note: spec.note,
    };
  }

  return null;
}

export function evaluateToolsBaselineCoverage(
  file: ToolsBaselineFile
): ToolsBaselineIssue | null {
  const minSlugs = file.coverage?.minCatalogFilterSlugs;
  if (minSlugs != null) {
    const wired = toolCatalogFilterSlugs().length;
    if (wired < minSlugs) {
      return {
        id: "coverage",
        message: `catalog filter slugs ${wired} < ${minSlugs}`,
      };
    }
  }

  return null;
}

export function evaluateToolsBaseline(
  file: ToolsBaselineFile
): ToolsBaselineResult {
  const issues: ToolsBaselineIssue[] = [];

  const coverageIssue = evaluateToolsBaselineCoverage(file);
  if (coverageIssue) issues.push(coverageIssue);

  for (const query of file.queries) {
    const issue = evaluateToolsBaselineQuery(query);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatToolsBaselineIssues(
  result: ToolsBaselineResult
): string {
  return result.issues
    .map(
      (issue) =>
        `[${issue.id}] ${issue.message}${issue.note ? ` (${issue.note})` : ""}`
    )
    .join("\n");
}
