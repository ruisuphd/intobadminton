/**
 * Golden-profile regression guard for sharable `/results/` URLs.
 *
 * Ensures profile URL serialisation round-trips to the same scoring output
 * as the finder golden profiles in `docs/baselines/finder-profile-queries.json`.
 *
 * Committed expectations live in `docs/baselines/results-url-queries.json`.
 */

import {
  evaluateBaselineE2eCoverage,
  type BaselineE2eCoverage,
} from "@/lib/baseline-coverage";
import type { ScoredProduct } from "@/lib/types/product";
import type { UserProfile } from "@/lib/taxonomy";
import {
  evaluateFinderBaselineQuery,
  profileFromBaseline,
  type FinderBaselineFile,
  type FinderBaselineProfileSpec,
  type FinderBaselineQuery,
} from "@/lib/finder-baseline";
import {
  profileFromSearchParams,
  profileToResultsPath,
} from "@/lib/profile-url";

export type ResultsUrlBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  /** Reuse a committed finder golden profile by id. */
  finderProfileId?: string;
  /** Inline profile when not referencing finder baseline. */
  profile?: FinderBaselineProfileSpec;
  /** Minimum rows after URL round-trip scoring. */
  minResults?: number;
  /** Top result product id must include this substring. */
  expectTopProductIdContains?: string;
  /** Top result category must match. */
  expectTopCategory?: string;
  /** Explicit share path (overrides generated path for e2e only). */
  sharePath?: string;
  /** Include in Playwright results-url e2e smoke. */
  e2e?: boolean;
  note?: string;
};

export type ResultsUrlBaselineFile = {
  version: number;
  updated?: string;
  coverage?: BaselineE2eCoverage;
  queries: ResultsUrlBaselineQuery[];
};

export type ResultsUrlBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type ResultsUrlBaselineResult = {
  ok: boolean;
  issues: ResultsUrlBaselineIssue[];
  checked: number;
};

function queryPathFromProfile(profile: UserProfile): string {
  return profileToResultsPath(profile);
}

function profileFromSharePath(path: string): UserProfile | null {
  const queryIndex = path.indexOf("?");
  if (queryIndex === -1) return null;
  const qs = path.slice(queryIndex + 1);
  return profileFromSearchParams(new URLSearchParams(qs));
}

export function resolveResultsUrlProfile(
  spec: ResultsUrlBaselineQuery,
  finderFile: FinderBaselineFile
): { profile: UserProfile; finderQuery?: FinderBaselineQuery } | null {
  if (spec.finderProfileId) {
    const finderQuery = finderFile.queries.find(
      (q) => q.id === spec.finderProfileId
    );
    if (!finderQuery) return null;
    return {
      profile: profileFromBaseline(finderQuery.profile),
      finderQuery,
    };
  }
  if (spec.profile) {
    return { profile: profileFromBaseline(spec.profile) };
  }
  return null;
}

export function validateResultsUrlBaselineFile(
  data: unknown
): { ok: true; file: ResultsUrlBaselineFile } | { ok: false; message: string } {
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

  const queries: ResultsUrlBaselineQuery[] = [];
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

    const hasProfile = q.finderProfileId !== undefined || q.profile !== undefined;
    if (!hasProfile) {
      return {
        ok: false,
        message: `queries[${i}] must set finderProfileId or profile`,
      };
    }

    queries.push({
      id: q.id.trim(),
      finderProfileId:
        q.finderProfileId === undefined ? undefined : String(q.finderProfileId),
      profile:
        q.profile === undefined
          ? undefined
          : (q.profile as FinderBaselineProfileSpec),
      minResults:
        q.minResults === undefined ? undefined : Number(q.minResults),
      expectTopProductIdContains:
        q.expectTopProductIdContains === undefined
          ? undefined
          : String(q.expectTopProductIdContains),
      expectTopCategory:
        q.expectTopCategory === undefined
          ? undefined
          : String(q.expectTopCategory),
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

export function evaluateResultsUrlBaselineQuery(
  spec: ResultsUrlBaselineQuery,
  directProfile: UserProfile,
  finderQuery: FinderBaselineQuery | undefined,
  scoreFn: (profile: UserProfile) => ScoredProduct[]
): ResultsUrlBaselineIssue | null {
  const sharePath = spec.sharePath ?? queryPathFromProfile(directProfile);
  const parsed = profileFromSharePath(sharePath);

  if (!parsed) {
    return {
      id: spec.id,
      message: `share path "${sharePath}" did not parse to a profile`,
      note: spec.note,
    };
  }

  const directRows = scoreFn(directProfile);
  const parsedRows = scoreFn(parsed);

  if (directRows.length === 0 || parsedRows.length === 0) {
    return {
      id: spec.id,
      message: `scoring returned empty rows (direct=${directRows.length}, parsed=${parsedRows.length})`,
      note: spec.note,
    };
  }

  if (directRows[0].id !== parsedRows[0].id) {
    return {
      id: spec.id,
      message: `URL round-trip changed top product: direct "${directRows[0].id}" vs parsed "${parsedRows[0].id}"`,
      note: spec.note,
    };
  }

  const expectation: FinderBaselineQuery = {
    id: spec.id,
    profile: directProfile as unknown as FinderBaselineProfileSpec,
    minResults: spec.minResults,
    expectTopProductIdContains: spec.expectTopProductIdContains,
    expectTopCategory: spec.expectTopCategory as FinderBaselineQuery["expectTopCategory"],
  };

  const mergedExpectation: FinderBaselineQuery = finderQuery
    ? {
        ...finderQuery,
        id: spec.id,
        minResults: spec.minResults ?? finderQuery.minResults,
        expectTopProductIdContains:
          spec.expectTopProductIdContains ??
          finderQuery.expectTopProductIdContains,
        expectTopCategory:
          (spec.expectTopCategory as FinderBaselineQuery["expectTopCategory"]) ??
          finderQuery.expectTopCategory,
      }
    : expectation;

  const finderIssue = evaluateFinderBaselineQuery(
    mergedExpectation,
    parsedRows
  );
  if (finderIssue) {
    return {
      id: spec.id,
      message: finderIssue.message,
      note: spec.note,
    };
  }

  return null;
}

export function evaluateResultsUrlBaseline(
  file: ResultsUrlBaselineFile,
  finderFile: FinderBaselineFile,
  scoreFn: (profile: UserProfile) => ScoredProduct[]
): ResultsUrlBaselineResult {
  const issues: ResultsUrlBaselineIssue[] = [];

  const e2eCoverageIssue = evaluateBaselineE2eCoverage(
    file.coverage,
    file.queries,
    "results-url"
  );
  if (e2eCoverageIssue) {
    issues.push({
      id: "coverage",
      message: e2eCoverageIssue.message,
    });
  }

  for (const spec of file.queries) {
    const resolved = resolveResultsUrlProfile(spec, finderFile);
    if (!resolved) {
      issues.push({
        id: spec.id,
        message: spec.finderProfileId
          ? `unknown finderProfileId "${spec.finderProfileId}"`
          : "missing profile spec",
        note: spec.note,
      });
      continue;
    }

    const issue = evaluateResultsUrlBaselineQuery(
      spec,
      resolved.profile,
      resolved.finderQuery,
      scoreFn
    );
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function sharePathForResultsUrlQuery(
  spec: ResultsUrlBaselineQuery,
  finderFile: FinderBaselineFile
): string | null {
  if (spec.sharePath) return spec.sharePath;
  const resolved = resolveResultsUrlProfile(spec, finderFile);
  if (!resolved) return null;
  return queryPathFromProfile(resolved.profile);
}

export function formatResultsUrlBaselineIssues(
  result: ResultsUrlBaselineResult
): string {
  if (result.ok) {
    return `[results-url-baseline] ${result.checked} share URLs passed`;
  }
  const lines = result.issues.map((issue) => {
    const note = issue.note ? ` (${issue.note})` : "";
    return `  • ${issue.id}: ${issue.message}${note}`;
  });
  return `[results-url-baseline] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
