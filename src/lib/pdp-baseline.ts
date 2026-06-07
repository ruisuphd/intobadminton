/**
 * Golden-profile regression guard for catalogue PDP routes (`/product/[id]/`).
 *
 * Ensures committed product ids resolve to valid rows, spec tables, related
 * reading shelves, review reverse-map wiring, and Product JSON-LD.
 *
 * Committed expectations live in `docs/baselines/pdp-queries.json`.
 */

import { catalogHrefFromProduct } from "@/lib/catalog-url";
import {
  editorialReviewHref,
  editorialReviewKind,
  PRODUCT_REVIEW_ALIASES,
} from "@/lib/review-pages";
import { relatedReadingForProductCategory } from "@/lib/related-content";
import { specRowsForProduct } from "@/lib/product-spec-rows";
import { companyInfo } from "@/lib/company";
import type { ProductRecord } from "@/lib/types/product";

export type PdpBaselineQuery = {
  /** Stable id for logs and e2e test titles. */
  id: string;
  productId: string;
  expectCategory?: ProductRecord["category"];
  /** Reverse-mapped review slug must match. */
  expectReviewSlug?: string;
  /** Editorial exit kind — review vs multi-SKU guide explainer. */
  expectReviewKind?: "review" | "guide";
  /** Product must not appear in the review map. */
  expectNoReviewSlug?: boolean;
  expectMinSpecRows?: number;
  expectMinRelatedReading?: number;
  /** Product JSON-LD must build with @type Product and offers. */
  expectProductJsonLd?: boolean;
  /** catalogHrefFromProduct must include this substring. */
  expectCatalogHrefContains?: string;
  /** Include in Playwright PDP baseline e2e smoke. */
  e2e?: boolean;
  note?: string;
};

export type PdpBaselineFile = {
  version: number;
  updated?: string;
  queries: PdpBaselineQuery[];
};

export type PdpBaselineIssue = {
  id: string;
  message: string;
  note?: string;
};

export type PdpBaselineResult = {
  ok: boolean;
  issues: PdpBaselineIssue[];
  checked: number;
};

export function reviewSlugForProductId(
  productId: string,
  map: Record<string, string>
): string | undefined {
  const href = editorialReviewHref(productId);
  if (href) {
    const match = href.match(/^\/review\/([^/]+)\/$/);
    return match?.[1];
  }

  const resolvedId = PRODUCT_REVIEW_ALIASES[productId] ?? productId;
  const entry = Object.entries(map).find(([, id]) => id === resolvedId);
  return entry?.[0];
}

export function buildPdpProductJsonLd(product: ProductRecord, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${companyInfo.siteUrl}${path}#product`,
    name: `${product.brand} ${product.name}`,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.priceUsd,
      priceCurrency: "USD",
      url: product.officialSourceUrl,
      availability: "https://schema.org/InStock",
    },
  };
}

export function validatePdpBaselineFile(
  data: unknown
): { ok: true; file: PdpBaselineFile } | { ok: false; message: string } {
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

  const queries: PdpBaselineQuery[] = [];
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
    if (typeof q.productId !== "string" || !q.productId.trim()) {
      return {
        ok: false,
        message: `queries[${i}].productId must be a non-empty string`,
      };
    }

    queries.push({
      id: q.id,
      productId: q.productId,
      expectCategory:
        typeof q.expectCategory === "string"
          ? (q.expectCategory as ProductRecord["category"])
          : undefined,
      expectReviewSlug:
        typeof q.expectReviewSlug === "string" ? q.expectReviewSlug : undefined,
      expectReviewKind:
        q.expectReviewKind === "review" || q.expectReviewKind === "guide"
          ? q.expectReviewKind
          : undefined,
      expectNoReviewSlug: q.expectNoReviewSlug === true,
      expectMinSpecRows:
        typeof q.expectMinSpecRows === "number" ? q.expectMinSpecRows : undefined,
      expectMinRelatedReading:
        typeof q.expectMinRelatedReading === "number"
          ? q.expectMinRelatedReading
          : undefined,
      expectProductJsonLd: q.expectProductJsonLd === true,
      expectCatalogHrefContains:
        typeof q.expectCatalogHrefContains === "string"
          ? q.expectCatalogHrefContains
          : undefined,
      e2e: q.e2e === true,
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

export function evaluatePdpBaselineQuery(
  spec: PdpBaselineQuery,
  lookup: (id: string) => ProductRecord | undefined,
  map: Record<string, string>
): PdpBaselineIssue | null {
  const product = lookup(spec.productId);
  if (!product) {
    return {
      id: spec.id,
      message: `product id "${spec.productId}" not in catalogue`,
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

  const reviewSlug = reviewSlugForProductId(spec.productId, map);

  if (spec.expectNoReviewSlug) {
    if (reviewSlug) {
      return {
        id: spec.id,
        message: `product "${spec.productId}" must have no review map, got slug "${reviewSlug}"`,
        note: spec.note,
      };
    }
  } else if (spec.expectReviewSlug) {
    if (reviewSlug !== spec.expectReviewSlug) {
      return {
        id: spec.id,
        message: `review slug "${reviewSlug ?? "(missing)"}" !== expected "${spec.expectReviewSlug}"`,
        note: spec.note,
      };
    }
  }

  if (spec.expectReviewKind) {
    const kind = editorialReviewKind(spec.productId);
    if (kind !== spec.expectReviewKind) {
      return {
        id: spec.id,
        message: `editorial review kind "${kind ?? "(missing)"}" !== expected "${spec.expectReviewKind}"`,
        note: spec.note,
      };
    }
  }

  if (spec.expectMinSpecRows != null) {
    const specRows = specRowsForProduct(product);
    if (specRows.length < spec.expectMinSpecRows) {
      return {
        id: spec.id,
        message: `spec rows ${specRows.length} below expectMinSpecRows ${spec.expectMinSpecRows}`,
        note: spec.note,
      };
    }
  }

  if (spec.expectMinRelatedReading != null) {
    const related = relatedReadingForProductCategory(
      product.category,
      product.id
    );
    if (related.length < spec.expectMinRelatedReading) {
      return {
        id: spec.id,
        message: `related reading ${related.length} below expectMinRelatedReading ${spec.expectMinRelatedReading}`,
        note: spec.note,
      };
    }
  }

  if (spec.expectProductJsonLd) {
    const path = `/product/${product.id}/`;
    const schema = buildPdpProductJsonLd(product, path);
    if (schema["@type"] !== "Product") {
      return {
        id: spec.id,
        message: `Product JSON-LD @type expected Product, got ${String(schema["@type"])}`,
        note: spec.note,
      };
    }
    const offers = schema.offers as Record<string, unknown> | undefined;
    if (offers?.["@type"] !== "Offer") {
      return {
        id: spec.id,
        message: "Product JSON-LD missing nested Offer node",
        note: spec.note,
      };
    }
  }

  if (spec.expectCatalogHrefContains) {
    const href = catalogHrefFromProduct(product);
    if (!href.includes(spec.expectCatalogHrefContains)) {
      return {
        id: spec.id,
        message: `catalog href "${href}" missing "${spec.expectCatalogHrefContains}"`,
        note: spec.note,
      };
    }
  }

  return null;
}

export function evaluatePdpBaseline(
  file: PdpBaselineFile,
  lookup: (id: string) => ProductRecord | undefined,
  map: Record<string, string>
): PdpBaselineResult {
  const issues: PdpBaselineIssue[] = [];

  for (const spec of file.queries) {
    const issue = evaluatePdpBaselineQuery(spec, lookup, map);
    if (issue) issues.push(issue);
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: file.queries.length,
  };
}

export function formatPdpBaselineIssues(result: PdpBaselineResult): string {
  return result.issues
    .map((issue) => {
      const note = issue.note ? ` (${issue.note})` : "";
      return `[${issue.id}] ${issue.message}${note}`;
    })
    .join("\n");
}
