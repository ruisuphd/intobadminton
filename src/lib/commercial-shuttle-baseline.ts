/**
 * Golden-query regression guard for shuttle SKU commercial editorial exits.
 *
 * Committed expectations live in `docs/baselines/commercial-shuttle-queries.json`.
 */

import type { ProductRecord } from "@/lib/types/product";
import {
  editorialReviewHref,
  editorialReviewKind,
  editorialReviewLinkLabel,
  type EditorialReviewKind,
} from "@/lib/review-pages";

export type CommercialShuttleBaselineQuery = {
  id: string;
  productId: string;
  expectHref: string;
  expectKind: EditorialReviewKind;
  expectAnchor?: string;
  expectLinkLabel?: string;
  e2e?: boolean;
  note?: string;
};

export type CommercialShuttleBaselineFile = {
  version: number;
  updated?: string;
  queries: CommercialShuttleBaselineQuery[];
};

export type CommercialShuttleBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type CommercialShuttleBaselineResult = {
  ok: boolean;
  issues: CommercialShuttleBaselineIssue[];
  checked: number;
};

export function validateCommercialShuttleBaselineFile(
  data: unknown
): { ok: true; file: CommercialShuttleBaselineFile } | { ok: false; message: string } {
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

  const queries: CommercialShuttleBaselineQuery[] = [];
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
      expectAnchor:
        q.expectAnchor === undefined ? undefined : String(q.expectAnchor).trim(),
      expectLinkLabel:
        q.expectLinkLabel === undefined ? undefined : String(q.expectLinkLabel),
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

export function evaluateCommercialShuttleBaselineQuery(
  spec: CommercialShuttleBaselineQuery,
  product: ProductRecord | undefined
): CommercialShuttleBaselineIssue | null {
  if (!product) {
    return {
      id: spec.id,
      message: `productId "${spec.productId}" not in catalogue`,
      note: spec.note,
    };
  }

  const href = editorialReviewHref(spec.productId);
  if (href !== spec.expectHref) {
    return {
      id: spec.id,
      message: `expected href "${spec.expectHref}", got "${href ?? "none"}"`,
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

  if (spec.expectLinkLabel) {
    const label = editorialReviewLinkLabel(spec.productId);
    if (label !== spec.expectLinkLabel) {
      return {
        id: spec.id,
        message: `expected link label "${spec.expectLinkLabel}", got "${label ?? "none"}"`,
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluateCommercialShuttleBaseline(
  file: CommercialShuttleBaselineFile,
  lookup: (productId: string) => ProductRecord | undefined
): CommercialShuttleBaselineResult {
  const issues: CommercialShuttleBaselineIssue[] = [];

  for (const spec of file.queries) {
    const issue = evaluateCommercialShuttleBaselineQuery(spec, lookup(spec.productId));
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatCommercialShuttleBaselineIssues(
  result: CommercialShuttleBaselineResult
): string {
  if (result.ok) {
    return `[commercial-shuttle-baseline] ${result.checked} golden queries passed`;
  }
  const lines = result.issues.map((issue) => {
    const note = issue.note ? ` (${issue.note})` : "";
    return `  • ${issue.id}: ${issue.message}${note}`;
  });
  return `[commercial-shuttle-baseline] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
