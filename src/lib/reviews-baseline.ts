/**
 * Golden-profile regression guard for `/review/` hub route.
 *
 * Ensures the reviews index resolves to valid catalog exit hrefs, related
 * reading shelves, finder CTA wiring, and minimum article corpus size.
 *
 * Committed expectations live in `docs/baselines/reviews-queries.json`.
 */

import { blogArticles } from "@/lib/blog";
import { relatedReadingForPath } from "@/lib/related-content";

export type ReviewsBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  /** Hub slug — only `index` for `/review/` is supported today. */
  slug: string;
  expectCatalogHref: string;
  expectMinRelatedReading?: number;
  expectMinArticles?: number;
  /** Include in Playwright reviews baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  /** Hub layout must render finder CTA. */
  expectFinderCta?: boolean;
  /** Hub layout must render Keep reading shelf. */
  expectKeepReadingShelf?: boolean;
  note?: string;
};

export type ReviewsBaselineFile = {
  version: number;
  updated?: string;
  queries: ReviewsBaselineQuery[];
};

export type ReviewsBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type ReviewsBaselineResult = {
  ok: boolean;
  issues: ReviewsBaselineIssue[];
  checked: number;
};

export function reviewPathForSlug(slug: string): string {
  const trimmed = slug.trim();
  if (!trimmed || trimmed === "index") return "/review/";
  return `/review/${trimmed}/`;
}

export function reviewArticleCount(): number {
  return blogArticles.en.length;
}

export function validateReviewsBaselineFile(
  data: unknown
): { ok: true; file: ReviewsBaselineFile } | { ok: false; message: string } {
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

  const queries: ReviewsBaselineQuery[] = [];
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
    if (typeof q.slug !== "string" || !q.slug.trim()) {
      return {
        ok: false,
        message: `queries[${i}].slug must be a non-empty string`,
      };
    }
    if (typeof q.expectCatalogHref !== "string" || !q.expectCatalogHref.trim()) {
      return {
        ok: false,
        message: `queries[${i}].expectCatalogHref must be a non-empty string`,
      };
    }

    queries.push({
      id: q.id,
      slug: q.slug,
      expectCatalogHref: q.expectCatalogHref,
      expectMinRelatedReading:
        typeof q.expectMinRelatedReading === "number"
          ? q.expectMinRelatedReading
          : undefined,
      expectMinArticles:
        typeof q.expectMinArticles === "number" ? q.expectMinArticles : undefined,
      e2e: q.e2e === true,
      expectHeadingPattern:
        typeof q.expectHeadingPattern === "string"
          ? q.expectHeadingPattern
          : undefined,
      expectCatalogLinkPattern:
        typeof q.expectCatalogLinkPattern === "string"
          ? q.expectCatalogLinkPattern
          : undefined,
      expectFinderCta: q.expectFinderCta === true,
      expectKeepReadingShelf: q.expectKeepReadingShelf === true,
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

export function evaluateReviewsBaselineQuery(
  spec: ReviewsBaselineQuery
): ReviewsBaselineIssue | null {
  if (spec.slug !== "index") {
    return {
      id: spec.id,
      message: `unsupported reviews hub slug "${spec.slug}" — only index is wired`,
      note: spec.note,
    };
  }

  const path = reviewPathForSlug(spec.slug);
  const related = relatedReadingForPath(path);
  if (
    spec.expectMinRelatedReading != null &&
    related.length < spec.expectMinRelatedReading
  ) {
    return {
      id: spec.id,
      message: `related reading count ${related.length} < ${spec.expectMinRelatedReading}`,
      note: spec.note,
    };
  }

  if (spec.expectMinArticles != null) {
    const count = reviewArticleCount();
    if (count < spec.expectMinArticles) {
      return {
        id: spec.id,
        message: `review article count ${count} < ${spec.expectMinArticles}`,
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluateReviewsBaseline(
  file: ReviewsBaselineFile
): ReviewsBaselineResult {
  const issues: ReviewsBaselineIssue[] = [];

  for (const query of file.queries) {
    const issue = evaluateReviewsBaselineQuery(query);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatReviewsBaselineIssues(
  result: ReviewsBaselineResult
): string {
  return result.issues
    .map(
      (issue) =>
        `[${issue.id}] ${issue.message}${issue.note ? ` (${issue.note})` : ""}`
    )
    .join("\n");
}
