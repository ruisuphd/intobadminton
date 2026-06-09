/**
 * Golden-profile regression guard for sharable `/compare/` URLs.
 *
 * Ensures compare share links resolve to valid catalog rows and that
 * URL serialisation round-trips to the same product id set.
 *
 * Committed expectations live in `docs/baselines/compare-share-queries.json`.
 */

import {
  evaluateBaselineE2eCoverage,
  type BaselineE2eCoverage,
} from "@/lib/baseline-coverage";
import { compareFieldsForItems } from "@/lib/compare-fields";
import {
  buildCompareSharePath,
  parseCompareShareIds,
} from "@/lib/compare-share-url";
import {
  evaluateFinderBaselineQuery,
  profileFromBaseline,
  type FinderBaselineFile,
  type FinderBaselineProfileSpec,
  type FinderBaselineQuery,
} from "@/lib/finder-baseline";
import type { ProductRecord, ScoredProduct } from "@/lib/types/product";
import type { UserProfile } from "@/lib/taxonomy";

export type CompareShareBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  /** Explicit product ids for the compare tray. */
  productIds?: string[];
  /** Reuse a committed finder golden profile and take top N scored rows. */
  finderProfileId?: string;
  /** How many top scored rows to compare when using finderProfileId (default 2). */
  topFromFinder?: number;
  /** Inline profile when not referencing finder baseline. */
  profile?: FinderBaselineProfileSpec;
  /** All compared products must share one category. */
  expectSameCategory?: boolean;
  /** Minimum comparable spec rows for the shared category. */
  minCompareFields?: number;
  /** Every resolved product id must include this substring. */
  expectAllProductIdContains?: string;
  /** Explicit share path (overrides generated path for e2e only). */
  sharePath?: string;
  /** Include in Playwright compare baseline e2e smoke. */
  e2e?: boolean;
  note?: string;
};

export type CompareShareBaselineFile = {
  version: number;
  updated?: string;
  coverage?: BaselineE2eCoverage;
  queries: CompareShareBaselineQuery[];
};

export type CompareShareBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type CompareShareBaselineResult = {
  ok: boolean;
  issues: CompareShareBaselineIssue[];
  checked: number;
};

export function resolveCompareProductIds(
  spec: CompareShareBaselineQuery,
  finderFile: FinderBaselineFile,
  lookup: (id: string) => ProductRecord | undefined,
  scoreFn: (profile: UserProfile) => ScoredProduct[]
): { ids: string[]; finderQuery?: FinderBaselineQuery } | null {
  if (spec.productIds?.length) {
    return { ids: spec.productIds.slice(0, 3) };
  }

  if (spec.finderProfileId) {
    const finderQuery = finderFile.queries.find(
      (q) => q.id === spec.finderProfileId
    );
    if (!finderQuery) return null;
    const profile = profileFromBaseline(finderQuery.profile);
    const rows = scoreFn(profile);
    const finderIssue = evaluateFinderBaselineQuery(finderQuery, rows);
    if (finderIssue) return null;
    const topN = spec.topFromFinder ?? 2;
    const ids = rows.slice(0, topN).map((row) => row.id);
    if (ids.length === 0) return null;
    return { ids, finderQuery };
  }

  if (spec.profile) {
    const profile = profileFromBaseline(spec.profile);
    const topN = spec.topFromFinder ?? 2;
    const ids = scoreFn(profile)
      .slice(0, topN)
      .map((row) => row.id);
    if (ids.length === 0) return null;
    return { ids };
  }

  void lookup;
  return null;
}

export function validateCompareShareBaselineFile(
  data: unknown
): { ok: true; file: CompareShareBaselineFile } | { ok: false; message: string } {
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

  const queries: CompareShareBaselineQuery[] = [];
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

    const hasSource =
      q.productIds !== undefined ||
      q.finderProfileId !== undefined ||
      q.profile !== undefined;
    if (!hasSource) {
      return {
        ok: false,
        message: `queries[${i}] must set productIds, finderProfileId, or profile`,
      };
    }

    queries.push({
      id: q.id.trim(),
      productIds: Array.isArray(q.productIds)
        ? q.productIds.map((id) => String(id))
        : undefined,
      finderProfileId:
        q.finderProfileId === undefined ? undefined : String(q.finderProfileId),
      topFromFinder:
        q.topFromFinder === undefined ? undefined : Number(q.topFromFinder),
      profile:
        q.profile === undefined
          ? undefined
          : (q.profile as FinderBaselineProfileSpec),
      expectSameCategory:
        q.expectSameCategory === undefined
          ? undefined
          : Boolean(q.expectSameCategory),
      minCompareFields:
        q.minCompareFields === undefined
          ? undefined
          : Number(q.minCompareFields),
      expectAllProductIdContains:
        q.expectAllProductIdContains === undefined
          ? undefined
          : String(q.expectAllProductIdContains),
      sharePath: q.sharePath === undefined ? undefined : String(q.sharePath),
      e2e: q.e2e === undefined ? undefined : Boolean(q.e2e),
      note: q.note === undefined ? undefined : String(q.note),
    });
  }

  if (queries.length === 0) {
    return { ok: false, message: "baseline.queries must not be empty" };
  }

  const coverageRaw = record.coverage;
  let coverage: BaselineE2eCoverage | undefined;
  if (coverageRaw != null) {
    if (typeof coverageRaw !== "object") {
      return { ok: false, message: "baseline.coverage must be an object" };
    }
    const c = coverageRaw as Record<string, unknown>;
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
        record.updated === undefined ? undefined : String(record.updated),
      coverage,
      queries,
    },
  };
}

export function evaluateCompareShareBaselineQuery(
  spec: CompareShareBaselineQuery,
  productIds: string[],
  lookup: (id: string) => ProductRecord | undefined
): CompareShareBaselineIssue | null {
  if (productIds.length === 0) {
    return {
      id: spec.id,
      message: "resolved zero product ids",
      note: spec.note,
    };
  }

  const sharePath = spec.sharePath ?? buildCompareSharePath(productIds);
  const parsed = parseCompareShareIds("/compare/", sharePath.split("?")[1] ?? "");
  if (!parsed) {
    return {
      id: spec.id,
      message: `share path "${sharePath}" did not parse to product ids`,
      note: spec.note,
    };
  }

  if (parsed.join(",") !== productIds.join(",")) {
    return {
      id: spec.id,
      message: `URL round-trip changed ids: direct "${productIds.join(",")}" vs parsed "${parsed.join(",")}"`,
      note: spec.note,
    };
  }

  const items = productIds
    .map((id) => lookup(id))
    .filter((item): item is ProductRecord => item != null);

  if (items.length !== productIds.length) {
    const missing = productIds.filter((id) => !lookup(id));
    return {
      id: spec.id,
      message: `unknown product id(s): ${missing.join(", ")}`,
      note: spec.note,
    };
  }

  if (spec.expectAllProductIdContains) {
    const needle = spec.expectAllProductIdContains;
    const bad = productIds.filter((id) => !id.includes(needle));
    if (bad.length > 0) {
      return {
        id: spec.id,
        message: `expected all ids to contain "${needle}", got: ${bad.join(", ")}`,
        note: spec.note,
      };
    }
  }

  const categories = new Set(items.map((item) => item.category));
  if (spec.expectSameCategory !== false && categories.size !== 1) {
    return {
      id: spec.id,
      message: `expected one shared category, got: ${[...categories].join(", ")}`,
      note: spec.note,
    };
  }

  const fields = compareFieldsForItems(items);
  const minFields = spec.minCompareFields ?? 4;
  if (fields.length < minFields) {
    return {
      id: spec.id,
      message: `only ${fields.length} compare fields for category (need ${minFields})`,
      note: spec.note,
    };
  }

  return null;
}

export function evaluateCompareShareBaseline(
  file: CompareShareBaselineFile,
  finderFile: FinderBaselineFile,
  lookup: (id: string) => ProductRecord | undefined,
  scoreFn: (profile: UserProfile) => ScoredProduct[]
): CompareShareBaselineResult {
  const issues: CompareShareBaselineIssue[] = [];

  const e2eCoverageIssue = evaluateBaselineE2eCoverage(
    file.coverage,
    file.queries,
    "compare-share"
  );
  if (e2eCoverageIssue) {
    issues.push({
      id: "coverage",
      message: e2eCoverageIssue.message,
    });
  }

  for (const spec of file.queries) {
    const resolved = resolveCompareProductIds(
      spec,
      finderFile,
      lookup,
      scoreFn
    );
    if (!resolved) {
      issues.push({
        id: spec.id,
        message: spec.finderProfileId
          ? `could not resolve finderProfileId "${spec.finderProfileId}"`
          : "missing product id source",
        note: spec.note,
      });
      continue;
    }

    const issue = evaluateCompareShareBaselineQuery(
      spec,
      resolved.ids,
      lookup
    );
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function sharePathForCompareQuery(
  spec: CompareShareBaselineQuery,
  finderFile: FinderBaselineFile,
  lookup: (id: string) => ProductRecord | undefined,
  scoreFn: (profile: UserProfile) => ScoredProduct[]
): string | null {
  if (spec.sharePath) return spec.sharePath;
  const resolved = resolveCompareProductIds(
    spec,
    finderFile,
    lookup,
    scoreFn
  );
  if (!resolved) return null;
  return buildCompareSharePath(resolved.ids);
}

export function formatCompareShareBaselineIssues(
  result: CompareShareBaselineResult
): string {
  if (result.ok) {
    return `[compare-baseline] ${result.checked} compare share URLs passed`;
  }
  const lines = result.issues.map((issue) => {
    const note = issue.note ? ` (${issue.note})` : "";
    return `  • ${issue.id}: ${issue.message}${note}`;
  });
  return `[compare-baseline] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
