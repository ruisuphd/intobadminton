/**
 * Three-way parity guard for shoe SKU editorial exits across PDP, catalog
 * browse, and commercial `/best/shoes/` surfaces.
 *
 * Committed expectations are derived from:
 * - `docs/baselines/catalog-shoe-queries.json`
 * - `docs/baselines/commercial-shoe-queries.json`
 * - `docs/baselines/pdp-queries.json` (shoe category rows)
 */

import type { CatalogShoeBaselineFile } from "@/lib/catalog-shoe-baseline";
import type { CommercialShoeBaselineFile } from "@/lib/commercial-shoe-baseline";
import type { PdpBaselineFile } from "@/lib/pdp-baseline";

export type ShoeEditorialParityIssue = {
  productId: string;
  message: string;
};

export type ShoeEditorialParityResult = {
  ok: boolean;
  issues: ShoeEditorialParityIssue[];
  checked: number;
};

export function editorialHrefToSlug(href: string): string | null {
  const match = href.match(/^\/review\/([^/]+)\/$/);
  return match?.[1] ?? null;
}

export function evaluateShoeEditorialParity(
  catalog: CatalogShoeBaselineFile,
  commercial: CommercialShoeBaselineFile,
  pdp: PdpBaselineFile
): ShoeEditorialParityResult {
  const issues: ShoeEditorialParityIssue[] = [];

  const commercialByProduct = new Map(
    commercial.queries.map((row) => [row.productId, row])
  );
  const pdpByProduct = new Map(
    pdp.queries
      .filter((row) => row.expectCategory === "shoes")
      .map((row) => [row.productId, row])
  );

  for (const catalogRow of catalog.queries) {
    const { productId } = catalogRow;

    const commercialRow = commercialByProduct.get(productId);
    if (!commercialRow) {
      issues.push({
        productId,
        message: "missing commercial shoe baseline row",
      });
      continue;
    }

    if (commercialRow.expectHref !== catalogRow.expectHref) {
      issues.push({
        productId,
        message: `catalog/commercial href mismatch: "${catalogRow.expectHref}" vs "${commercialRow.expectHref}"`,
      });
    }

    if (commercialRow.expectKind !== catalogRow.expectKind) {
      issues.push({
        productId,
        message: `catalog/commercial kind mismatch: "${catalogRow.expectKind}" vs "${commercialRow.expectKind}"`,
      });
    }

    const pdpRow = pdpByProduct.get(productId);
    if (!pdpRow) {
      issues.push({
        productId,
        message: "missing PDP shoe golden-profile row",
      });
      continue;
    }

    const expectedSlug = editorialHrefToSlug(catalogRow.expectHref);
    if (!expectedSlug) {
      issues.push({
        productId,
        message: `invalid catalog expectHref "${catalogRow.expectHref}"`,
      });
      continue;
    }

    if (pdpRow.expectReviewSlug !== expectedSlug) {
      issues.push({
        productId,
        message: `PDP review slug "${pdpRow.expectReviewSlug ?? "none"}" does not match catalog href slug "${expectedSlug}"`,
      });
    }

    if (pdpRow.expectReviewKind !== catalogRow.expectKind) {
      issues.push({
        productId,
        message: `PDP review kind "${pdpRow.expectReviewKind ?? "none"}" does not match catalog kind "${catalogRow.expectKind}"`,
      });
    }
  }

  const catalogProductIds = new Set(catalog.queries.map((row) => row.productId));
  for (const pdpRow of pdp.queries) {
    if (pdpRow.expectCategory !== "shoes") continue;
    if (!catalogProductIds.has(pdpRow.productId)) {
      issues.push({
        productId: pdpRow.productId,
        message: "PDP shoe row missing from catalog shoe baseline",
      });
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: catalog.queries.length,
  };
}

export function formatShoeEditorialParityIssues(
  result: ShoeEditorialParityResult
): string {
  if (result.ok) {
    return `[shoe-editorial-parity] ${result.checked} shoe SKUs passed three-way parity`;
  }
  const lines = result.issues.map(
    (issue) => `  • ${issue.productId}: ${issue.message}`
  );
  return `[shoe-editorial-parity] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
