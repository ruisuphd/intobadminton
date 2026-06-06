/**
 * Golden-profile regression guard for the homepage (`/`).
 *
 * Ensures the CrUX-priority landing resolves finder/catalog exits,
 * featured review slice, catalogue stats, and committed popular-search links.
 *
 * Committed expectations live in `docs/baselines/home-queries.json`.
 */

import catalogStats from "@/data/catalog-stats.json";
import {
  homeFeaturedReviewHrefs,
  homeFeaturedReviews,
  reviewArticleCount,
} from "@/lib/home-featured";
import { homePopularSearchHrefs } from "@/lib/home-popular-searches";

export type HomeBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  expectCatalogHref: string;
  expectFinderHref: string;
  expectMinFeaturedReviews?: number;
  expectMinReviewCount?: number;
  expectMinCatalogTotal?: number;
  /** Hrefs that must appear in the homepage popular-search grid. */
  expectPopularSearchHrefs?: string[];
  /** Review article hrefs that must appear in the homepage featured slice. */
  expectFeaturedReviewHrefs?: string[];
  /** Include in Playwright home baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  note?: string;
};

export type HomeBaselineFile = {
  version: number;
  updated?: string;
  queries: HomeBaselineQuery[];
};

export type HomeBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type HomeBaselineResult = {
  ok: boolean;
  issues: HomeBaselineIssue[];
  checked: number;
};

export const HOME_PATH = "/";

export function validateHomeBaselineFile(
  data: unknown
): { ok: true; file: HomeBaselineFile } | { ok: false; message: string } {
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

  const queries: HomeBaselineQuery[] = [];
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
    if (typeof q.expectCatalogHref !== "string" || !q.expectCatalogHref.trim()) {
      return {
        ok: false,
        message: `queries[${i}].expectCatalogHref must be a non-empty string`,
      };
    }
    if (typeof q.expectFinderHref !== "string" || !q.expectFinderHref.trim()) {
      return {
        ok: false,
        message: `queries[${i}].expectFinderHref must be a non-empty string`,
      };
    }

    const expectPopularSearchHrefs = Array.isArray(q.expectPopularSearchHrefs)
      ? q.expectPopularSearchHrefs.filter(
          (href): href is string => typeof href === "string" && href.trim().length > 0
        )
      : undefined;

    const expectFeaturedReviewHrefs = Array.isArray(q.expectFeaturedReviewHrefs)
      ? q.expectFeaturedReviewHrefs.filter(
          (href): href is string => typeof href === "string" && href.trim().length > 0
        )
      : undefined;

    queries.push({
      id: q.id,
      expectCatalogHref: q.expectCatalogHref,
      expectFinderHref: q.expectFinderHref,
      expectMinFeaturedReviews:
        typeof q.expectMinFeaturedReviews === "number"
          ? q.expectMinFeaturedReviews
          : undefined,
      expectMinReviewCount:
        typeof q.expectMinReviewCount === "number"
          ? q.expectMinReviewCount
          : undefined,
      expectMinCatalogTotal:
        typeof q.expectMinCatalogTotal === "number"
          ? q.expectMinCatalogTotal
          : undefined,
      expectPopularSearchHrefs,
      expectFeaturedReviewHrefs,
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

  return {
    ok: true,
    file: {
      version: record.version,
      updated:
        typeof record.updated === "string" ? record.updated : undefined,
      queries,
    },
  };
}

export function evaluateHomeBaselineQuery(
  spec: HomeBaselineQuery
): HomeBaselineIssue | null {
  if (spec.expectMinFeaturedReviews != null) {
    const count = homeFeaturedReviews.length;
    if (count < spec.expectMinFeaturedReviews) {
      return {
        id: spec.id,
        message: `featured review count ${count} < ${spec.expectMinFeaturedReviews}`,
        note: spec.note,
      };
    }
  }

  if (spec.expectMinReviewCount != null) {
    const count = reviewArticleCount;
    if (count < spec.expectMinReviewCount) {
      return {
        id: spec.id,
        message: `review article count ${count} < ${spec.expectMinReviewCount}`,
        note: spec.note,
      };
    }
  }

  if (spec.expectMinCatalogTotal != null) {
    const total = catalogStats.total ?? 0;
    if (total < spec.expectMinCatalogTotal) {
      return {
        id: spec.id,
        message: `catalog total ${total} < ${spec.expectMinCatalogTotal}`,
        note: spec.note,
      };
    }
  }

  if (spec.expectPopularSearchHrefs != null) {
    const live = new Set(homePopularSearchHrefs());
    for (const href of spec.expectPopularSearchHrefs) {
      if (!live.has(href)) {
        return {
          id: spec.id,
          message: `popular search href "${href}" missing from homepage grid`,
          note: spec.note,
        };
      }
    }
  }

  if (spec.expectFeaturedReviewHrefs != null) {
    const live = new Set(homeFeaturedReviewHrefs());
    for (const href of spec.expectFeaturedReviewHrefs) {
      if (!live.has(href)) {
        return {
          id: spec.id,
          message: `featured review href "${href}" missing from homepage slice`,
          note: spec.note,
        };
      }
    }
  }

  return null;
}

export function evaluateHomeBaseline(file: HomeBaselineFile): HomeBaselineResult {
  const issues: HomeBaselineIssue[] = [];

  for (const query of file.queries) {
    const issue = evaluateHomeBaselineQuery(query);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatHomeBaselineIssues(result: HomeBaselineResult): string {
  return result.issues
    .map(
      (issue) =>
        `[${issue.id}] ${issue.message}${issue.note ? ` (${issue.note})` : ""}`
    )
    .join("\n");
}
