/**
 * Golden-query regression guard for catalogue keyword search (`/catalog/?q=`).
 *
 * Committed expectations live in `docs/baselines/catalog-keyword-queries.json`.
 * CI runs this after unit tests to catch filter regressions before deploy.
 */

import type { ProductRecord } from "@/lib/types/product";

export type CatalogBaselineQuery = {
  query: string;
  /** At least one product id must include this substring. */
  expectProductIdContains?: string;
  /** At least one product brand must include this substring (case-insensitive). */
  expectBrandContains?: string;
  /** Minimum number of matching products (default 1 when any expectation is set). */
  minResults?: number;
  /** Maximum number of matching products (for empty-query guards). */
  maxResults?: number;
  /** Include in Playwright golden-query e2e smoke. */
  e2e?: boolean;
  note?: string;
};

export type CatalogBaselineFile = {
  version: number;
  updated?: string;
  queries: CatalogBaselineQuery[];
};

export type CatalogBaselineIssue = {
  query: string;
  message: string;
  note?: string;
};

export type CatalogBaselineResult = {
  ok: boolean;
  issues: CatalogBaselineIssue[];
  checked: number;
};

export function validateCatalogBaselineFile(
  data: unknown
): { ok: true; file: CatalogBaselineFile } | { ok: false; message: string } {
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

  const queries: CatalogBaselineQuery[] = [];
  for (let i = 0; i < record.queries.length; i++) {
    const row = record.queries[i];
    if (row == null || typeof row !== "object") {
      return { ok: false, message: `queries[${i}] must be an object` };
    }
    const q = row as Record<string, unknown>;
    if (typeof q.query !== "string" || !q.query.trim()) {
      return {
        ok: false,
        message: `queries[${i}].query must be a non-empty string`,
      };
    }

    const expectProductIdContains =
      q.expectProductIdContains === undefined
        ? undefined
        : String(q.expectProductIdContains);
    const expectBrandContains =
      q.expectBrandContains === undefined
        ? undefined
        : String(q.expectBrandContains);
    const minResults =
      q.minResults === undefined ? undefined : Number(q.minResults);
    const maxResults =
      q.maxResults === undefined ? undefined : Number(q.maxResults);
    const e2e = q.e2e === undefined ? undefined : Boolean(q.e2e);

    if (expectProductIdContains !== undefined && !expectProductIdContains) {
      return {
        ok: false,
        message: `queries[${i}].expectProductIdContains must be non-empty when set`,
      };
    }
    if (expectBrandContains !== undefined && !expectBrandContains) {
      return {
        ok: false,
        message: `queries[${i}].expectBrandContains must be non-empty when set`,
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
      expectProductIdContains !== undefined ||
      expectBrandContains !== undefined ||
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
      expectProductIdContains,
      expectBrandContains,
      minResults,
      maxResults,
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

export function evaluateCatalogBaselineQuery(
  spec: CatalogBaselineQuery,
  products: ProductRecord[]
): CatalogBaselineIssue | null {
  const minResults =
    spec.minResults ??
    (spec.expectProductIdContains || spec.expectBrandContains ? 1 : undefined);

  if (minResults !== undefined && products.length < minResults) {
    return {
      query: spec.query,
      message: `expected at least ${minResults} product(s), got ${products.length}`,
      note: spec.note,
    };
  }

  if (spec.maxResults !== undefined && products.length > spec.maxResults) {
    return {
      query: spec.query,
      message: `expected at most ${spec.maxResults} product(s), got ${products.length}`,
      note: spec.note,
    };
  }

  if (spec.expectProductIdContains !== undefined) {
    const matched = products.some((p) =>
      p.id.includes(spec.expectProductIdContains!)
    );
    if (!matched) {
      const sample = products
        .slice(0, 3)
        .map((p) => p.id)
        .join(", ");
      return {
        query: spec.query,
        message: `no product id contains "${spec.expectProductIdContains}" (sample: ${sample || "none"})`,
        note: spec.note,
      };
    }
  }

  if (spec.expectBrandContains !== undefined) {
    const needle = spec.expectBrandContains.toLowerCase();
    const matched = products.some((p) =>
      p.brand.toLowerCase().includes(needle)
    );
    if (!matched) {
      const sample = products
        .slice(0, 3)
        .map((p) => p.brand)
        .join(", ");
      return {
        query: spec.query,
        message: `no product brand contains "${spec.expectBrandContains}" (sample: ${sample || "none"})`,
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluateCatalogBaseline(
  file: CatalogBaselineFile,
  filterFn: (query: string) => ProductRecord[]
): CatalogBaselineResult {
  const issues: CatalogBaselineIssue[] = [];

  for (const spec of file.queries) {
    const products = filterFn(spec.query);
    const issue = evaluateCatalogBaselineQuery(spec, products);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatCatalogBaselineIssues(result: CatalogBaselineResult): string {
  if (result.ok) {
    return `[catalog-baseline] ${result.checked} golden queries passed`;
  }
  const lines = result.issues.map((issue) => {
    const note = issue.note ? ` (${issue.note})` : "";
    return `  • "${issue.query}": ${issue.message}${note}`;
  });
  return `[catalog-baseline] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
