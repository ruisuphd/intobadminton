/**
 * Golden-profile regression guard for `/review/` hub and article routes.
 *
 * Ensures the reviews index and committed article slugs resolve to valid
 * catalog exit hrefs, related reading shelves, finder wiring, and corpus size.
 *
 * Committed expectations live in `docs/baselines/reviews-queries.json`.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { blogArticles, getBlogArticle } from "@/lib/blog";
import { catalogHrefFromProduct } from "@/lib/catalog-url";
import { reviewProductIdForBlog } from "@/lib/content-links";
import { enrichmentForReviewArticle } from "@/lib/review-article-enrichment";
import { reviewProductById } from "@/lib/review-pages";
import {
  relatedReadingForPath,
  relatedReadingForReviewSlug,
} from "@/lib/related-content";

export type ReviewsBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  /** Hub slug `index` or blog article slug for `/review/[slug]/`. */
  slug: string;
  expectCatalogHref: string;
  expectMinRelatedReading?: number;
  expectMinArticles?: number;
  /** Mapped catalogue product id when the article links to a product row. */
  expectProductId?: string;
  /** Explainer slug must stay outside the product map. */
  expectUnmapped?: boolean;
  /** Mapped review layout must render the equipment finder panel. */
  expectEquipmentFinderPanel?: boolean;
  /** Include in Playwright reviews baseline e2e smoke. */
  e2e?: boolean;
  /** Case-insensitive substring for h1 assertion in e2e. */
  expectHeadingPattern?: string;
  /** Case-insensitive substring for catalog CTA link text in e2e. */
  expectCatalogLinkPattern?: string;
  /** Hub layout must render finder CTA. */
  expectFinderCta?: boolean;
  /** Hub or article layout must render Keep reading shelf. */
  expectKeepReadingShelf?: boolean;
  note?: string;
};

export type ReviewsBaselineCoverageSpec = {
  minArticleSlugs?: number;
  /** Every article slug in review-product-map-queries must appear here. */
  requireReviewMapParity?: boolean;
};

export type ReviewsBaselineFile = {
  version: number;
  updated?: string;
  coverage?: ReviewsBaselineCoverageSpec;
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

/** Product-mapped review slug → brand+category catalog exit; otherwise `/catalog/`. */
export function catalogHrefFromReviewSlug(slug: string): string {
  const productId = reviewProductIdForBlog(slug);
  if (!productId) return "/catalog/";
  const product = reviewProductById(productId);
  if (!product) return "/catalog/";
  return catalogHrefFromProduct(product);
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
    if (q.expectUnmapped === true && typeof q.expectProductId === "string") {
      return {
        ok: false,
        message: `queries[${i}] cannot set both expectUnmapped and expectProductId`,
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
      expectProductId:
        typeof q.expectProductId === "string" ? q.expectProductId : undefined,
      expectUnmapped: q.expectUnmapped === true,
      expectEquipmentFinderPanel: q.expectEquipmentFinderPanel === true,
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

  let coverage: ReviewsBaselineCoverageSpec | undefined;
  if (record.coverage != null) {
    if (typeof record.coverage !== "object") {
      return { ok: false, message: "baseline.coverage must be an object" };
    }
    const c = record.coverage as Record<string, unknown>;
    coverage = {
      minArticleSlugs:
        typeof c.minArticleSlugs === "number" ? c.minArticleSlugs : undefined,
      requireReviewMapParity: c.requireReviewMapParity === true,
    };
  }

  return {
    ok: true,
    file: {
      version: record.version,
      updated:
        typeof record.updated === "string" ? record.updated : undefined,
      coverage,
      queries,
    },
  };
}

export function evaluateReviewsBaselineQuery(
  spec: ReviewsBaselineQuery
): ReviewsBaselineIssue | null {
  const isIndex = spec.slug === "index";

  if (isIndex) {
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

    if (spec.expectProductId || spec.expectUnmapped || spec.expectEquipmentFinderPanel) {
      return {
        id: spec.id,
        message: "product-map fields are not valid for hub index slug",
        note: spec.note,
      };
    }

    return null;
  }

  const article = getBlogArticle("en", spec.slug);
  if (!article) {
    return {
      id: spec.id,
      message: `review article slug "${spec.slug}" not in corpus`,
      note: spec.note,
    };
  }

  const mappedId = reviewProductIdForBlog(spec.slug);

  if (spec.expectUnmapped) {
    if (mappedId) {
      return {
        id: spec.id,
        message: `slug "${spec.slug}" must stay unmapped, got product "${mappedId}"`,
        note: spec.note,
      };
    }
  } else if (spec.expectProductId) {
    if (mappedId !== spec.expectProductId) {
      return {
        id: spec.id,
        message: `mapped product "${mappedId ?? "(missing)"}" !== expected "${spec.expectProductId}"`,
        note: spec.note,
      };
    }
    if (!reviewProductById(spec.expectProductId)) {
      return {
        id: spec.id,
        message: `expectProductId "${spec.expectProductId}" not in catalogue`,
        note: spec.note,
      };
    }
  }

  const href = catalogHrefFromReviewSlug(spec.slug);
  if (href !== spec.expectCatalogHref) {
    return {
      id: spec.id,
      message: `catalog href "${href}" !== expected "${spec.expectCatalogHref}"`,
      note: spec.note,
    };
  }

  const related = relatedReadingForReviewSlug(spec.slug);
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

  if (spec.expectEquipmentFinderPanel) {
    const enrichment = enrichmentForReviewArticle(spec.slug, article);
    if (!enrichment) {
      return {
        id: spec.id,
        message: `equipment finder enrichment missing for mapped slug "${spec.slug}"`,
        note: spec.note,
      };
    }
  }

  return null;
}

const REVIEW_MAP_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/review-product-map-queries.json"
);

export function reviewMapBaselineArticleSlugs(): string[] {
  const raw = JSON.parse(readFileSync(REVIEW_MAP_BASELINE_PATH, "utf8"));
  if (!Array.isArray(raw.queries)) return [];
  return raw.queries
    .map((row: { slug?: string }) => row.slug)
    .filter(
      (slug: string | undefined): slug is string =>
        typeof slug === "string" && slug.trim().length > 0
    );
}

export function evaluateReviewsBaselineCoverage(
  file: ReviewsBaselineFile
): ReviewsBaselineIssue | null {
  const minSlugs = file.coverage?.minArticleSlugs;
  if (minSlugs != null) {
    const articleRows = file.queries.filter((q) => q.slug !== "index").length;
    if (articleRows < minSlugs) {
      return {
        id: "coverage",
        message: `article slug rows ${articleRows} < ${minSlugs}`,
      };
    }
  }

  if (file.coverage?.requireReviewMapParity) {
    const committed = new Set(
      file.queries.filter((q) => q.slug !== "index").map((q) => q.slug)
    );
    for (const slug of reviewMapBaselineArticleSlugs()) {
      if (!committed.has(slug)) {
        return {
          id: "coverage",
          message: `review map slug "${slug}" missing from reviews-queries.json`,
        };
      }
    }
  }

  return null;
}

export function evaluateReviewsBaseline(
  file: ReviewsBaselineFile
): ReviewsBaselineResult {
  const issues: ReviewsBaselineIssue[] = [];

  const coverageIssue = evaluateReviewsBaselineCoverage(file);
  if (coverageIssue) issues.push(coverageIssue);

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
