/**
 * Golden-profile regression guard for the equipment finder scoring engine.
 *
 * Committed expectations live in `docs/baselines/finder-profile-queries.json`.
 */

import type { ScoredProduct } from "@/lib/types/product";
import {
  defaultBodyProfile,
  defaultUserProfile,
  type BodyProfile,
  type Discipline,
  type EquipmentCategory,
  type PlayStyle,
  type SkillLevel,
  type UserProfile,
} from "@/lib/taxonomy";

export type FinderBaselineProfileSpec = {
  level?: SkillLevel;
  discipline?: Discipline;
  styles?: PlayStyle[];
  category?: EquipmentCategory;
  body?: Partial<BodyProfile>;
};

export type FinderBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  profile: FinderBaselineProfileSpec;
  minResults?: number;
  /** Top result product id must include this substring. */
  expectTopProductIdContains?: string;
  /** At least one result id must include this substring. */
  expectAnyProductIdContains?: string;
  /** Top result category must match. */
  expectTopCategory?: EquipmentCategory;
  /** Minimum fit score on the top result. */
  minTopFitScore?: number;
  /** Top N results must all be at or below this USD price (default topN=3). */
  maxTopNPriceUsd?: number;
  /** At least this many of the top N results must be at or above priceUsd. */
  minTopNPriceUsdCount?: number;
  /** Price threshold paired with minTopNPriceUsdCount (default 200). */
  minTopNPriceUsd?: number;
  /** How many top rows to check for price-band expectations (default 3). */
  topN?: number;
  /** Top result shaft flex must not equal this value (rackets). */
  expectTopShaftFlexNot?: string;
  /** Include in Playwright finder baseline e2e smoke. */
  e2e?: boolean;
  note?: string;
};

export type FinderBaselineFile = {
  version: number;
  updated?: string;
  queries: FinderBaselineQuery[];
};

export type FinderBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type FinderBaselineResult = {
  ok: boolean;
  issues: FinderBaselineIssue[];
  checked: number;
};

export function profileFromBaseline(spec: FinderBaselineProfileSpec): UserProfile {
  const body: BodyProfile = {
    ...defaultBodyProfile(),
    ...spec.body,
    injuryFlags: spec.body?.injuryFlags ?? ["none"],
  };

  return {
    ...defaultUserProfile(),
    level: spec.level ?? null,
    discipline: spec.discipline ?? null,
    styles: spec.styles ?? [],
    category: spec.category ?? "racket",
    body,
  };
}

export function validateFinderBaselineFile(
  data: unknown
): { ok: true; file: FinderBaselineFile } | { ok: false; message: string } {
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

  const queries: FinderBaselineQuery[] = [];
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
    if (q.profile == null || typeof q.profile !== "object") {
      return { ok: false, message: `queries[${i}].profile must be an object` };
    }

    const minResults =
      q.minResults === undefined ? undefined : Number(q.minResults);
    const minTopFitScore =
      q.minTopFitScore === undefined ? undefined : Number(q.minTopFitScore);
    const maxTopNPriceUsd =
      q.maxTopNPriceUsd === undefined ? undefined : Number(q.maxTopNPriceUsd);
    const minTopNPriceUsdCount =
      q.minTopNPriceUsdCount === undefined
        ? undefined
        : Number(q.minTopNPriceUsdCount);
    const minTopNPriceUsd =
      q.minTopNPriceUsd === undefined ? undefined : Number(q.minTopNPriceUsd);
    const topN = q.topN === undefined ? undefined : Number(q.topN);
    const e2e = q.e2e === undefined ? undefined : Boolean(q.e2e);

    if (minResults !== undefined && (!Number.isFinite(minResults) || minResults < 0)) {
      return {
        ok: false,
        message: `queries[${i}].minResults must be a non-negative number`,
      };
    }

    const hasExpectation =
      minResults !== undefined ||
      q.expectTopProductIdContains !== undefined ||
      q.expectAnyProductIdContains !== undefined ||
      q.expectTopCategory !== undefined ||
      minTopFitScore !== undefined ||
      maxTopNPriceUsd !== undefined ||
      minTopNPriceUsdCount !== undefined ||
      q.expectTopShaftFlexNot !== undefined;
    if (!hasExpectation) {
      return {
        ok: false,
        message: `queries[${i}] must set at least one expectation field`,
      };
    }

    queries.push({
      id: q.id.trim(),
      profile: q.profile as FinderBaselineProfileSpec,
      minResults,
      expectTopProductIdContains:
        q.expectTopProductIdContains === undefined
          ? undefined
          : String(q.expectTopProductIdContains),
      expectAnyProductIdContains:
        q.expectAnyProductIdContains === undefined
          ? undefined
          : String(q.expectAnyProductIdContains),
      expectTopCategory:
        q.expectTopCategory === undefined
          ? undefined
          : (String(q.expectTopCategory) as EquipmentCategory),
      minTopFitScore,
      maxTopNPriceUsd,
      minTopNPriceUsdCount,
      minTopNPriceUsd,
      topN,
      expectTopShaftFlexNot:
        q.expectTopShaftFlexNot === undefined
          ? undefined
          : String(q.expectTopShaftFlexNot),
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

function topSlice(rows: ScoredProduct[], topN: number): ScoredProduct[] {
  return rows.slice(0, Math.max(1, topN));
}

export function evaluateFinderBaselineQuery(
  spec: FinderBaselineQuery,
  rows: ScoredProduct[]
): FinderBaselineIssue | null {
  const minResults = spec.minResults ?? 1;

  if (rows.length < minResults) {
    return {
      id: spec.id,
      message: `expected at least ${minResults} result(s), got ${rows.length}`,
      note: spec.note,
    };
  }

  const top = rows[0];

  if (spec.expectTopCategory !== undefined && top.category !== spec.expectTopCategory) {
    return {
      id: spec.id,
      message: `expected top category "${spec.expectTopCategory}", got "${top.category}"`,
      note: spec.note,
    };
  }

  if (spec.minTopFitScore !== undefined && top.fitScore < spec.minTopFitScore) {
    return {
      id: spec.id,
      message: `expected top fitScore >= ${spec.minTopFitScore}, got ${top.fitScore}`,
      note: spec.note,
    };
  }

  if (spec.expectTopProductIdContains !== undefined) {
    if (!top.id.includes(spec.expectTopProductIdContains)) {
      return {
        id: spec.id,
        message: `top product id "${top.id}" does not contain "${spec.expectTopProductIdContains}"`,
        note: spec.note,
      };
    }
  }

  if (spec.expectAnyProductIdContains !== undefined) {
    const matched = rows.some((r) =>
      r.id.includes(spec.expectAnyProductIdContains!)
    );
    if (!matched) {
      const sample = rows
        .slice(0, 3)
        .map((r) => r.id)
        .join(", ");
      return {
        id: spec.id,
        message: `no result id contains "${spec.expectAnyProductIdContains}" (sample: ${sample})`,
        note: spec.note,
      };
    }
  }

  const topN = spec.topN ?? 3;

  if (spec.maxTopNPriceUsd !== undefined) {
    const slice = topSlice(rows, topN);
    for (const row of slice) {
      if (row.priceUsd > spec.maxTopNPriceUsd) {
        return {
          id: spec.id,
          message: `top-${topN} product "${row.id}" price $${row.priceUsd} exceeds max $${spec.maxTopNPriceUsd}`,
          note: spec.note,
        };
      }
    }
  }

  if (spec.minTopNPriceUsdCount !== undefined) {
    const threshold = spec.minTopNPriceUsd ?? 200;
    const slice = topSlice(rows, topN);
    const premium = slice.filter((r) => r.priceUsd >= threshold);
    if (premium.length < spec.minTopNPriceUsdCount) {
      return {
        id: spec.id,
        message: `expected at least ${spec.minTopNPriceUsdCount} of top-${topN} at >= $${threshold}, got ${premium.length}`,
        note: spec.note,
      };
    }
  }

  if (spec.expectTopShaftFlexNot !== undefined) {
    if (
      top.category === "racket" &&
      "shaftFlex" in top &&
      top.shaftFlex === spec.expectTopShaftFlexNot
    ) {
      return {
        id: spec.id,
        message: `top racket shaftFlex must not be "${spec.expectTopShaftFlexNot}"`,
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluateFinderBaseline(
  file: FinderBaselineFile,
  scoreFn: (profile: UserProfile) => ScoredProduct[]
): FinderBaselineResult {
  const issues: FinderBaselineIssue[] = [];

  for (const spec of file.queries) {
    const profile = profileFromBaseline(spec.profile);
    const rows = scoreFn(profile);
    const issue = evaluateFinderBaselineQuery(spec, rows);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatFinderBaselineIssues(result: FinderBaselineResult): string {
  if (result.ok) {
    return `[finder-baseline] ${result.checked} golden profiles passed`;
  }
  const lines = result.issues.map((issue) => {
    const note = issue.note ? ` (${issue.note})` : "";
    return `  • ${issue.id}: ${issue.message}${note}`;
  });
  return `[finder-baseline] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
