/**
 * Parity guard between product-intent search submit routing and catalogue
 * keyword filtering (`/catalog/?q=`).
 *
 * Committed expectations live in `docs/baselines/discovery-parity-queries.json`.
 */

import type { ProductRecord } from "@/lib/types/product";

export type DiscoveryParityQuery = {
  query: string;
  /** `searchSubmitHref` must include this substring (default `/catalog/?q=`). */
  expectSubmitHrefContains?: string;
  /** Minimum catalogue rows for the same keyword (default 1). */
  minCatalogResults?: number;
  /** At least one filtered product id must include this substring. */
  expectProductIdContains?: string;
  /** At least one filtered product brand must include this substring. */
  expectBrandContains?: string;
  /** Include in Playwright discovery parity e2e smoke. */
  e2e?: boolean;
  note?: string;
};

export type DiscoveryParityFile = {
  version: number;
  updated?: string;
  queries: DiscoveryParityQuery[];
};

export type DiscoveryParityIssue = {
  query: string;
  message: string;
  note?: string;
};

export type DiscoveryParityResult = {
  ok: boolean;
  issues: DiscoveryParityIssue[];
  checked: number;
};

export function validateDiscoveryParityFile(
  data: unknown
): { ok: true; file: DiscoveryParityFile } | { ok: false; message: string } {
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

  const queries: DiscoveryParityQuery[] = [];
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

    const expectSubmitHrefContains =
      q.expectSubmitHrefContains === undefined
        ? undefined
        : String(q.expectSubmitHrefContains);
    const expectProductIdContains =
      q.expectProductIdContains === undefined
        ? undefined
        : String(q.expectProductIdContains);
    const expectBrandContains =
      q.expectBrandContains === undefined
        ? undefined
        : String(q.expectBrandContains);
    const minCatalogResults =
      q.minCatalogResults === undefined
        ? undefined
        : Number(q.minCatalogResults);
    const e2e = q.e2e === undefined ? undefined : Boolean(q.e2e);

    if (
      expectSubmitHrefContains !== undefined &&
      !expectSubmitHrefContains
    ) {
      return {
        ok: false,
        message: `queries[${i}].expectSubmitHrefContains must be non-empty when set`,
      };
    }
    if (minCatalogResults !== undefined) {
      if (!Number.isFinite(minCatalogResults) || minCatalogResults < 0) {
        return {
          ok: false,
          message: `queries[${i}].minCatalogResults must be a non-negative number`,
        };
      }
    }

    const hasExpectation =
      expectSubmitHrefContains !== undefined ||
      expectProductIdContains !== undefined ||
      expectBrandContains !== undefined ||
      minCatalogResults !== undefined;
    if (!hasExpectation) {
      return {
        ok: false,
        message: `queries[${i}] must set at least one expectation field`,
      };
    }

    queries.push({
      query: q.query.trim(),
      expectSubmitHrefContains,
      expectProductIdContains,
      expectBrandContains,
      minCatalogResults,
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

export function evaluateDiscoveryParityQuery(
  spec: DiscoveryParityQuery,
  ctx: {
    submitHref: string;
    catalogCount: number;
    products: ProductRecord[];
  }
): DiscoveryParityIssue | null {
  const submitNeedle =
    spec.expectSubmitHrefContains ?? "/catalog/?q=";
  if (!ctx.submitHref.includes(submitNeedle)) {
    return {
      query: spec.query,
      message: `search submit href "${ctx.submitHref}" must include "${submitNeedle}"`,
      note: spec.note,
    };
  }

  const minCatalog = spec.minCatalogResults ?? 1;
  if (ctx.catalogCount < minCatalog) {
    return {
      query: spec.query,
      message: `expected at least ${minCatalog} catalog match(es), got ${ctx.catalogCount}`,
      note: spec.note,
    };
  }

  if (spec.expectProductIdContains !== undefined) {
    const matched = ctx.products.some((p) =>
      p.id.includes(spec.expectProductIdContains!)
    );
    if (!matched) {
      const sample = ctx.products
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
    const matched = ctx.products.some((p) =>
      p.brand.toLowerCase().includes(needle)
    );
    if (!matched) {
      const sample = ctx.products
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

export function evaluateDiscoveryParity(
  file: DiscoveryParityFile,
  ctxFn: (query: string) => {
    submitHref: string;
    catalogCount: number;
    products: ProductRecord[];
  }
): DiscoveryParityResult {
  const issues: DiscoveryParityIssue[] = [];

  for (const spec of file.queries) {
    const ctx = ctxFn(spec.query);
    const issue = evaluateDiscoveryParityQuery(spec, ctx);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatDiscoveryParityIssues(
  result: DiscoveryParityResult
): string {
  if (result.ok) {
    return `[discovery-parity] ${result.checked} golden pairs passed`;
  }
  const lines = result.issues.map((issue) => {
    const note = issue.note ? ` (${issue.note})` : "";
    return `  • "${issue.query}": ${issue.message}${note}`;
  });
  return `[discovery-parity] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
