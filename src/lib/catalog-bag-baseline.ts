/**
 * Golden-query regression guard for bag SKU catalog editorial exits.
 *
 * Committed expectations live in `docs/baselines/catalog-bag-queries.json`.
 */

import type { ProductRecord } from "@/lib/types/product";
import {
  catalogProductHref,
  editorialReviewKind,
  type EditorialReviewKind,
} from "@/lib/review-pages";

export type CatalogBagBaselineQuery = {
  id: string;
  productId: string;
  expectHref: string;
  expectKind: EditorialReviewKind;
  e2e?: boolean;
  note?: string;
};

export type CatalogBagBaselineFile = {
  version: number;
  updated?: string;
  queries: CatalogBagBaselineQuery[];
};

export type CatalogBagBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type CatalogBagBaselineResult = {
  ok: boolean;
  issues: CatalogBagBaselineIssue[];
  checked: number;
};

export function validateCatalogBagBaselineFile(
  data: unknown
): { ok: true; file: CatalogBagBaselineFile } | { ok: false; message: string } {
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

  const queries: CatalogBagBaselineQuery[] = [];
  for (let i = 0; i < record.queries.length; i++) {
    const row = record.queries[i];
    if (row == null || typeof row !== "object") {
      return { ok: false, message: `queries[${i}] must be an object` };
    }
    const q = row as Record<string, unknown>;
    if (typeof q.id !== "string" || !q.id.trim()) {
      return { ok: false, message: `queries[${i}].id must be a non-empty string` };
    }
    if (typeof q.productId !== "string" || !q.productId.trim()) {
      return {
        ok: false,
        message: `queries[${i}].productId must be a non-empty string`,
      };
    }
    if (typeof q.expectHref !== "string" || !q.expectHref.startsWith("/")) {
      return {
        ok: false,
        message: `queries[${i}].expectHref must be a site path`,
      };
    }
    if (q.expectKind !== "guide" && q.expectKind !== "review") {
      return {
        ok: false,
        message: `queries[${i}].expectKind must be "guide" or "review"`,
      };
    }

    queries.push({
      id: q.id.trim(),
      productId: q.productId.trim(),
      expectHref: q.expectHref,
      expectKind: q.expectKind,
      e2e: q.e2e === undefined ? undefined : Boolean(q.e2e),
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
      updated: record.updated === undefined ? undefined : String(record.updated),
      queries,
    },
  };
}

export function evaluateCatalogBagBaselineQuery(
  spec: CatalogBagBaselineQuery,
  product: ProductRecord | undefined
): CatalogBagBaselineIssue | null {
  if (!product) {
    return {
      id: spec.id,
      message: `productId "${spec.productId}" not in catalogue`,
      note: spec.note,
    };
  }

  const href = catalogProductHref(product);
  if (href !== spec.expectHref) {
    return {
      id: spec.id,
      message: `expected href "${spec.expectHref}", got "${href}"`,
      note: spec.note,
    };
  }

  const kind = editorialReviewKind(spec.productId);
  if (kind !== spec.expectKind) {
    return {
      id: spec.id,
      message: `expected editorial kind "${spec.expectKind}", got "${kind ?? "none"}"`,
      note: spec.note,
    };
  }

  return null;
}

export function evaluateCatalogBagBaseline(
  file: CatalogBagBaselineFile,
  lookup: (productId: string) => ProductRecord | undefined
): CatalogBagBaselineResult {
  const issues: CatalogBagBaselineIssue[] = [];

  for (const spec of file.queries) {
    const issue = evaluateCatalogBagBaselineQuery(spec, lookup(spec.productId));
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatCatalogBagBaselineIssues(
  result: CatalogBagBaselineResult
): string {
  if (result.ok) {
    return `[catalog-bag-baseline] ${result.checked} golden queries passed`;
  }
  const lines = result.issues.map((issue) => {
    const note = issue.note ? ` (${issue.note})` : "";
    return `  • ${issue.id}: ${issue.message}${note}`;
  });
  return `[catalog-bag-baseline] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
