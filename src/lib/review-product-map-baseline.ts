/**
 * Golden-profile regression guard for review→catalogue product mappings.
 *
 * Ensures committed review slugs resolve to valid catalogue rows, coverage
 * thresholds hold, and explainer slugs stay intentionally unmapped.
 *
 * Committed expectations live in `docs/baselines/review-product-map-queries.json`.
 */

import { computeEditorialRating } from "@/lib/editorial-rating";
import { productReviewJsonLd } from "@/lib/structured-data";
import type { ProductRecord } from "@/lib/types/product";

export type ReviewProductMapBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  slug: string;
  /** Expected catalogue product id when mapped. */
  expectProductId?: string;
  /** Mapped product category must match. */
  expectCategory?: ProductRecord["category"];
  /** Product+Review JSON-LD must build without error. */
  expectProductJsonLd?: boolean;
  /** Slug must not appear in the review map (explainer articles). */
  expectUnmapped?: boolean;
  /** Include in Playwright review-map baseline e2e smoke. */
  e2e?: boolean;
  note?: string;
};

export type ReviewProductMapCoverageSpec = {
  minMappedCount?: number;
  minMappablePct?: number;
  /** Minimum expectUnmapped explainer rows in committed golden profiles. */
  minExplainerGuards?: number;
};

export type ReviewProductMapBaselineFile = {
  version: number;
  updated?: string;
  coverage?: ReviewProductMapCoverageSpec;
  queries: ReviewProductMapBaselineQuery[];
};

export type ReviewProductMapBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type ReviewProductMapBaselineResult = {
  ok: boolean;
  issues: ReviewProductMapBaselineIssue[];
  checked: number;
};

export function validateReviewProductMapBaselineFile(
  data: unknown
):
  | { ok: true; file: ReviewProductMapBaselineFile }
  | { ok: false; message: string } {
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

  const queries: ReviewProductMapBaselineQuery[] = [];
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
    if (q.expectUnmapped !== true && typeof q.expectProductId !== "string") {
      return {
        ok: false,
        message: `queries[${i}] needs expectProductId or expectUnmapped: true`,
      };
    }

    queries.push({
      id: q.id,
      slug: q.slug,
      expectProductId:
        typeof q.expectProductId === "string" ? q.expectProductId : undefined,
      expectCategory:
        typeof q.expectCategory === "string"
          ? (q.expectCategory as ProductRecord["category"])
          : undefined,
      expectProductJsonLd: q.expectProductJsonLd === true,
      expectUnmapped: q.expectUnmapped === true,
      e2e: q.e2e === true,
      note: typeof q.note === "string" ? q.note : undefined,
    });
  }

  let coverage: ReviewProductMapCoverageSpec | undefined;
  if (record.coverage != null) {
    if (typeof record.coverage !== "object") {
      return { ok: false, message: "baseline.coverage must be an object" };
    }
    const c = record.coverage as Record<string, unknown>;
    coverage = {
      minMappedCount:
        typeof c.minMappedCount === "number" ? c.minMappedCount : undefined,
      minMappablePct:
        typeof c.minMappablePct === "number" ? c.minMappablePct : undefined,
      minExplainerGuards:
        typeof c.minExplainerGuards === "number"
          ? c.minExplainerGuards
          : undefined,
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

export function evaluateReviewProductMapCoverage(
  coverage: ReviewProductMapCoverageSpec | undefined,
  articleSlugs: string[],
  explainerSlugs: Set<string>,
  map: Record<string, string>,
  queries: ReviewProductMapBaselineQuery[] = []
): ReviewProductMapBaselineIssue | null {
  if (!coverage) return null;

  const mappableTotal = articleSlugs.length - explainerSlugs.size;
  const mappedCount = Object.keys(map).length;
  const pct = mappableTotal
    ? Math.round((mappedCount / mappableTotal) * 100)
    : 0;

  if (
    coverage.minMappedCount != null &&
    mappedCount < coverage.minMappedCount
  ) {
    return {
      id: "coverage",
      message: `mapped count ${mappedCount} below minMappedCount ${coverage.minMappedCount}`,
    };
  }

  if (coverage.minMappablePct != null && pct < coverage.minMappablePct) {
    return {
      id: "coverage",
      message: `coverage ${pct}% below minMappablePct ${coverage.minMappablePct}`,
    };
  }

  if (coverage.minExplainerGuards != null) {
    const explainerGuards = queries.filter((q) => q.expectUnmapped).length;
    if (explainerGuards < coverage.minExplainerGuards) {
      return {
        id: "coverage",
        message: `explainer guards ${explainerGuards} below minExplainerGuards ${coverage.minExplainerGuards}`,
      };
    }
  }

  return null;
}

export function evaluateReviewProductMapBaselineQuery(
  spec: ReviewProductMapBaselineQuery,
  map: Record<string, string>,
  lookup: (id: string) => ProductRecord | undefined,
  explainerSlugs: Set<string>
): ReviewProductMapBaselineIssue | null {
  const mappedId = map[spec.slug];

  if (spec.expectUnmapped) {
    if (mappedId) {
      return {
        id: spec.id,
        message: `explainer slug "${spec.slug}" must stay unmapped, got "${mappedId}"`,
        note: spec.note,
      };
    }
    if (!explainerSlugs.has(spec.slug)) {
      return {
        id: spec.id,
        message: `expectUnmapped slug "${spec.slug}" is not in explainer allowlist`,
        note: spec.note,
      };
    }
    return null;
  }

  if (!spec.expectProductId) {
    return {
      id: spec.id,
      message: "missing expectProductId",
      note: spec.note,
    };
  }

  if (mappedId !== spec.expectProductId) {
    return {
      id: spec.id,
      message: `slug "${spec.slug}" maps to "${mappedId ?? "(missing)"}", expected "${spec.expectProductId}"`,
      note: spec.note,
    };
  }

  const product = lookup(spec.expectProductId);
  if (!product) {
    return {
      id: spec.id,
      message: `product id "${spec.expectProductId}" not in catalogue`,
      note: spec.note,
    };
  }

  if (spec.expectCategory && product.category !== spec.expectCategory) {
    return {
      id: spec.id,
      message: `product category "${product.category}" !== expected "${spec.expectCategory}"`,
      note: spec.note,
    };
  }

  if (spec.expectProductJsonLd) {
    const schema = productReviewJsonLd({
      product,
      path: `/review/${spec.slug}/`,
      description: "Editorial review dek.",
      reviewBody: "Editorial review dek.",
      rating: computeEditorialRating(product),
    });
    if (schema["@type"] !== "Product") {
      return {
        id: spec.id,
        message: `Product JSON-LD @type expected Product, got ${String(schema["@type"])}`,
        note: spec.note,
      };
    }
    const review = schema.review as Record<string, unknown> | undefined;
    if (review?.["@type"] !== "Review") {
      return {
        id: spec.id,
        message: "Product JSON-LD missing nested Review node",
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluateReviewProductMapBaseline(
  file: ReviewProductMapBaselineFile,
  map: Record<string, string>,
  articleSlugs: string[],
  explainerSlugs: Set<string>,
  lookup: (id: string) => ProductRecord | undefined,
  catalogHasId: (id: string) => boolean = (id) => lookup(id) != null
): ReviewProductMapBaselineResult {
  const issues: ReviewProductMapBaselineIssue[] = [];

  const coverageIssue = evaluateReviewProductMapCoverage(
    file.coverage,
    articleSlugs,
    explainerSlugs,
    map,
    file.queries
  );
  if (coverageIssue) issues.push(coverageIssue);

  for (const spec of file.queries) {
    const issue = evaluateReviewProductMapBaselineQuery(
      spec,
      map,
      lookup,
      explainerSlugs
    );
    if (issue) issues.push(issue);
  }

  const badIds = Object.entries(map).filter(([, id]) => !catalogHasId(id));
  if (badIds.length > 0) {
    issues.push({
      id: "invalid-catalog-ids",
      message: `${badIds.length} map entries point to missing catalogue ids (first: ${badIds[0][0]} → ${badIds[0][1]})`,
    });
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length + (file.coverage ? 1 : 0),
  };
}

export function formatReviewProductMapBaselineIssues(
  result: ReviewProductMapBaselineResult
): string {
  return result.issues
    .map((issue) => {
      const note = issue.note ? ` (${issue.note})` : "";
      return `[${issue.id}] ${issue.message}${note}`;
    })
    .join("\n");
}
