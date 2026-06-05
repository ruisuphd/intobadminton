/**
 * Golden-query regression guard for on-site search (`searchSite`).
 *
 * Committed expectations live in `docs/baselines/site-search-queries.json`.
 * CI runs this after unit tests to catch index regressions before deploy.
 */

import type { SearchEntry } from "@/lib/site-search";

export type SearchBaselineQuery = {
  query: string;
  /** At least one result href must include this substring. */
  expectHrefContains?: string;
  /** Top-ranked result href must equal this exactly. */
  expectTopHref?: string;
  /** Minimum number of results (default 1 when any expectation is set). */
  minResults?: number;
  /** Maximum number of results (for empty-query guards). */
  maxResults?: number;
  note?: string;
};

export type SearchBaselineFile = {
  version: number;
  updated?: string;
  queries: SearchBaselineQuery[];
};

export type SearchBaselineIssue = {
  query: string;
  message: string;
  note?: string;
};

export type SearchBaselineResult = {
  ok: boolean;
  issues: SearchBaselineIssue[];
  checked: number;
};

export function validateSearchBaselineFile(
  data: unknown
): { ok: true; file: SearchBaselineFile } | { ok: false; message: string } {
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

  const queries: SearchBaselineQuery[] = [];
  for (let i = 0; i < record.queries.length; i++) {
    const row = record.queries[i];
    if (row == null || typeof row !== "object") {
      return { ok: false, message: `queries[${i}] must be an object` };
    }
    const q = row as Record<string, unknown>;
    if (typeof q.query !== "string" || !q.query.trim()) {
      return { ok: false, message: `queries[${i}].query must be a non-empty string` };
    }

    const expectHrefContains =
      q.expectHrefContains === undefined
        ? undefined
        : String(q.expectHrefContains);
    const expectTopHref =
      q.expectTopHref === undefined ? undefined : String(q.expectTopHref);
    const minResults =
      q.minResults === undefined ? undefined : Number(q.minResults);
    const maxResults =
      q.maxResults === undefined ? undefined : Number(q.maxResults);

    if (expectHrefContains !== undefined && !expectHrefContains) {
      return {
        ok: false,
        message: `queries[${i}].expectHrefContains must be non-empty when set`,
      };
    }
    if (expectTopHref !== undefined && !expectTopHref) {
      return {
        ok: false,
        message: `queries[${i}].expectTopHref must be non-empty when set`,
      };
    }
    if (minResults !== undefined && (!Number.isFinite(minResults) || minResults < 0)) {
      return {
        ok: false,
        message: `queries[${i}].minResults must be a non-negative number`,
      };
    }
    if (maxResults !== undefined && (!Number.isFinite(maxResults) || maxResults < 0)) {
      return {
        ok: false,
        message: `queries[${i}].maxResults must be a non-negative number`,
      };
    }

    const hasExpectation =
      expectHrefContains !== undefined ||
      expectTopHref !== undefined ||
      minResults !== undefined ||
      maxResults !== undefined;
    if (!hasExpectation) {
      return {
        ok: false,
        message: `queries[${i}] must set at least one expectation field`,
      };
    }

    queries.push({
      query: q.query.trim(),
      expectHrefContains,
      expectTopHref,
      minResults,
      maxResults,
      note: q.note === undefined ? undefined : String(q.note),
    });
  }

  if (queries.length === 0) {
    return { ok: false, message: "baseline.queries must not be empty" };
  }

  return {
    ok: true,
    file: {
      version: record.version,
      updated:
        record.updated === undefined ? undefined : String(record.updated),
      queries,
    },
  };
}

export function evaluateSearchBaselineQuery(
  spec: SearchBaselineQuery,
  hits: SearchEntry[]
): SearchBaselineIssue | null {
  const minResults =
    spec.minResults ??
    (spec.expectHrefContains || spec.expectTopHref ? 1 : undefined);

  if (minResults !== undefined && hits.length < minResults) {
    return {
      query: spec.query,
      message: `expected at least ${minResults} result(s), got ${hits.length}`,
      note: spec.note,
    };
  }

  if (spec.maxResults !== undefined && hits.length > spec.maxResults) {
    return {
      query: spec.query,
      message: `expected at most ${spec.maxResults} result(s), got ${hits.length}`,
      note: spec.note,
    };
  }

  if (spec.expectTopHref !== undefined) {
    const top = hits[0]?.href;
    if (top !== spec.expectTopHref) {
      return {
        query: spec.query,
        message: `expected top href "${spec.expectTopHref}", got "${top ?? "(none)"}"`,
        note: spec.note,
      };
    }
  }

  if (spec.expectHrefContains !== undefined) {
    const matched = hits.some((h) =>
      h.href.includes(spec.expectHrefContains!)
    );
    if (!matched) {
      const sample = hits
        .slice(0, 3)
        .map((h) => h.href)
        .join(", ");
      return {
        query: spec.query,
        message: `no result href contains "${spec.expectHrefContains}" (top: ${sample || "none"})`,
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluateSearchBaseline(
  file: SearchBaselineFile,
  searchFn: (query: string) => SearchEntry[]
): SearchBaselineResult {
  const issues: SearchBaselineIssue[] = [];

  for (const spec of file.queries) {
    const hits = searchFn(spec.query);
    const issue = evaluateSearchBaselineQuery(spec, hits);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatSearchBaselineIssues(result: SearchBaselineResult): string {
  if (result.ok) {
    return `[search-baseline] ${result.checked} golden queries passed`;
  }
  const lines = result.issues.map((issue) => {
    const note = issue.note ? ` (${issue.note})` : "";
    return `  • "${issue.query}": ${issue.message}${note}`;
  });
  return `[search-baseline] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
