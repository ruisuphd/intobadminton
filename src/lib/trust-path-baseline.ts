/**
 * Golden-profile regression guard for E-E-A-T trust paths:
 * `/about/`, `/sources/`, `/data/`, `/authors/rui-su/`, `/source-policy/`, `/faq/`,
 * `/authors/`, `/methodology/`, `/contact/`, `/cookies/`, `/security/`,
 * `/privacy-choices/`, `/research/`, `/updates/`.
 *
 * Ensures committed paths resolve catalog exits and stay in the CrUX
 * monitoring + Playwright e2e smoke set.
 *
 * Committed expectations live in `docs/baselines/trust-path-queries.json`.
 */

import {
  evaluateBaselineE2eCoverage,
  type BaselineE2eCoverage,
} from "@/lib/baseline-coverage";

export type TrustPathBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  /** Site path, e.g. `/about/`. */
  path: string;
  expectCatalogHref: string;
  /** Include in Playwright trust-path baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  note?: string;
};

export type TrustPathBaselineFile = {
  version: number;
  updated?: string;
  coverage?: BaselineE2eCoverage;
  queries: TrustPathBaselineQuery[];
};

export type TrustPathBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type TrustPathBaselineResult = {
  ok: boolean;
  issues: TrustPathBaselineIssue[];
  checked: number;
};

export function validateTrustPathBaselineFile(
  data: unknown
): { ok: true; file: TrustPathBaselineFile } | { ok: false; message: string } {
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

  const queries: TrustPathBaselineQuery[] = [];
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
    if (typeof q.path !== "string" || !q.path.trim()) {
      return {
        ok: false,
        message: `queries[${i}].path must be a non-empty string`,
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
      path: q.path,
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
      note: typeof q.note === "string" ? q.note : undefined,
    });
  }

  let coverage: BaselineE2eCoverage | undefined;
  if (record.coverage != null) {
    if (typeof record.coverage !== "object") {
      return { ok: false, message: "baseline.coverage must be an object" };
    }
    const c = record.coverage as Record<string, unknown>;
    coverage = {
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

export function evaluateTrustPathBaselineQuery(
  spec: TrustPathBaselineQuery
): TrustPathBaselineIssue | null {
  if (!spec.path.startsWith("/") || !spec.path.endsWith("/")) {
    return {
      id: spec.id,
      message: `path "${spec.path}" must start and end with /`,
      note: spec.note,
    };
  }
  return null;
}

export function evaluateTrustPathBaseline(
  file: TrustPathBaselineFile
): TrustPathBaselineResult {
  const issues: TrustPathBaselineIssue[] = [];

  const e2eCoverageIssue = evaluateBaselineE2eCoverage(
    file.coverage,
    file.queries,
    "trust-path"
  );
  if (e2eCoverageIssue) {
    issues.push({
      id: "coverage",
      message: e2eCoverageIssue.message,
    });
  }

  const paths = new Set<string>();
  for (const query of file.queries) {
    if (paths.has(query.path)) {
      issues.push({
        id: query.id,
        message: `duplicate path "${query.path}"`,
        note: query.note,
      });
    }
    paths.add(query.path);

    const issue = evaluateTrustPathBaselineQuery(query);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatTrustPathBaselineIssues(
  result: TrustPathBaselineResult
): string {
  return result.issues
    .map(
      (issue) =>
        `[${issue.id}] ${issue.message}${issue.note ? ` (${issue.note})` : ""}`
    )
    .join("\n");
}
