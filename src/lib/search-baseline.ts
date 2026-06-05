/**
 * Golden-query regression guard for on-site search (`searchSite`),
 * submit routing (`searchSubmitHref`), and autocomplete (`searchSuggestions`).
 *
 * Committed expectations live in `docs/baselines/site-search-queries.json`.
 * CI runs this after unit tests to catch index regressions before deploy.
 */

import type { SearchSuggestion } from "@/lib/search-suggestions";
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
  /** `searchSubmitHref` must equal this exactly. */
  expectSubmitHref?: string;
  /** `searchSubmitHref` must include this substring. */
  expectSubmitHrefContains?: string;
  /** First autocomplete row kind when suggestions are non-empty. */
  expectFirstSuggestionKind?: "catalog" | "entry";
  /** At least one entry suggestion href must include this substring. */
  expectSuggestionHrefContains?: string;
  /** Minimum autocomplete rows (including catalog CTA). */
  minSuggestions?: number;
  /** Include in Playwright golden-query e2e smoke. */
  e2e?: boolean;
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

    const expectSubmitHref =
      q.expectSubmitHref === undefined ? undefined : String(q.expectSubmitHref);
    const expectSubmitHrefContains =
      q.expectSubmitHrefContains === undefined
        ? undefined
        : String(q.expectSubmitHrefContains);
    const expectFirstSuggestionKind =
      q.expectFirstSuggestionKind === undefined
        ? undefined
        : String(q.expectFirstSuggestionKind);
    if (
      expectFirstSuggestionKind !== undefined &&
      expectFirstSuggestionKind !== "catalog" &&
      expectFirstSuggestionKind !== "entry"
    ) {
      return {
        ok: false,
        message: `queries[${i}].expectFirstSuggestionKind must be "catalog" or "entry"`,
      };
    }
    const expectSuggestionHrefContains =
      q.expectSuggestionHrefContains === undefined
        ? undefined
        : String(q.expectSuggestionHrefContains);
    const minSuggestions =
      q.minSuggestions === undefined ? undefined : Number(q.minSuggestions);
    const e2e = q.e2e === undefined ? undefined : Boolean(q.e2e);

    if (expectSubmitHref !== undefined && !expectSubmitHref) {
      return {
        ok: false,
        message: `queries[${i}].expectSubmitHref must be non-empty when set`,
      };
    }
    if (expectSubmitHrefContains !== undefined && !expectSubmitHrefContains) {
      return {
        ok: false,
        message: `queries[${i}].expectSubmitHrefContains must be non-empty when set`,
      };
    }
    if (
      expectSuggestionHrefContains !== undefined &&
      !expectSuggestionHrefContains
    ) {
      return {
        ok: false,
        message: `queries[${i}].expectSuggestionHrefContains must be non-empty when set`,
      };
    }
    if (
      minSuggestions !== undefined &&
      (!Number.isFinite(minSuggestions) || minSuggestions < 0)
    ) {
      return {
        ok: false,
        message: `queries[${i}].minSuggestions must be a non-negative number`,
      };
    }

    const hasExpectation =
      expectHrefContains !== undefined ||
      expectTopHref !== undefined ||
      minResults !== undefined ||
      maxResults !== undefined ||
      expectSubmitHref !== undefined ||
      expectSubmitHrefContains !== undefined ||
      expectFirstSuggestionKind !== undefined ||
      expectSuggestionHrefContains !== undefined ||
      minSuggestions !== undefined;
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
      expectSubmitHref,
      expectSubmitHrefContains,
      expectFirstSuggestionKind: expectFirstSuggestionKind as
        | "catalog"
        | "entry"
        | undefined,
      expectSuggestionHrefContains,
      minSuggestions,
      e2e,
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

export function evaluateSearchBaselineSubmit(
  spec: SearchBaselineQuery,
  submitHref: string
): SearchBaselineIssue | null {
  if (spec.expectSubmitHref !== undefined && submitHref !== spec.expectSubmitHref) {
    return {
      query: spec.query,
      message: `expected submit href "${spec.expectSubmitHref}", got "${submitHref}"`,
      note: spec.note,
    };
  }

  if (
    spec.expectSubmitHrefContains !== undefined &&
    !submitHref.includes(spec.expectSubmitHrefContains)
  ) {
    return {
      query: spec.query,
      message: `submit href "${submitHref}" does not contain "${spec.expectSubmitHrefContains}"`,
      note: spec.note,
    };
  }

  return null;
}

export function evaluateSearchBaselineSuggestions(
  spec: SearchBaselineQuery,
  suggestions: SearchSuggestion[]
): SearchBaselineIssue | null {
  if (spec.minSuggestions !== undefined && suggestions.length < spec.minSuggestions) {
    return {
      query: spec.query,
      message: `expected at least ${spec.minSuggestions} suggestion(s), got ${suggestions.length}`,
      note: spec.note,
    };
  }

  if (spec.expectFirstSuggestionKind !== undefined) {
    const first = suggestions[0]?.kind;
    if (first !== spec.expectFirstSuggestionKind) {
      return {
        query: spec.query,
        message: `expected first suggestion kind "${spec.expectFirstSuggestionKind}", got "${first ?? "(none)"}"`,
        note: spec.note,
      };
    }
  }

  if (spec.expectSuggestionHrefContains !== undefined) {
    const matched = suggestions.some(
      (row) =>
        row.kind === "entry" &&
        row.entry.href.includes(spec.expectSuggestionHrefContains!)
    );
    if (!matched) {
      const sample = suggestions
        .filter((row): row is Extract<SearchSuggestion, { kind: "entry" }> => row.kind === "entry")
        .slice(0, 3)
        .map((row) => row.entry.href)
        .join(", ");
      return {
        query: spec.query,
        message: `no suggestion href contains "${spec.expectSuggestionHrefContains}" (entries: ${sample || "none"})`,
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluateSearchBaseline(
  file: SearchBaselineFile,
  searchFn: (query: string) => SearchEntry[],
  options?: {
    submitHrefFn?: (query: string) => string;
    suggestionsFn?: (query: string) => SearchSuggestion[];
  }
): SearchBaselineResult {
  const issues: SearchBaselineIssue[] = [];

  for (const spec of file.queries) {
    if (
      spec.expectHrefContains !== undefined ||
      spec.expectTopHref !== undefined ||
      spec.minResults !== undefined ||
      spec.maxResults !== undefined
    ) {
      const hits = searchFn(spec.query);
      const issue = evaluateSearchBaselineQuery(spec, hits);
      if (issue) issues.push(issue);
    }

    if (
      options?.submitHrefFn &&
      (spec.expectSubmitHref !== undefined ||
        spec.expectSubmitHrefContains !== undefined)
    ) {
      const submitIssue = evaluateSearchBaselineSubmit(
        spec,
        options.submitHrefFn(spec.query)
      );
      if (submitIssue) issues.push(submitIssue);
    }

    if (
      options?.suggestionsFn &&
      (spec.expectFirstSuggestionKind !== undefined ||
        spec.expectSuggestionHrefContains !== undefined ||
        spec.minSuggestions !== undefined)
    ) {
      const suggestionIssue = evaluateSearchBaselineSuggestions(
        spec,
        options.suggestionsFn(spec.query)
      );
      if (suggestionIssue) issues.push(suggestionIssue);
    }
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
