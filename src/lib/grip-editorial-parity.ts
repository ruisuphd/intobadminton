/**
 * Three-way parity guard for grip SKU editorial exits across PDP, catalog
 * browse, and commercial `/best/grips/` surfaces.
 *
 * Committed expectations are derived from:
 * - `docs/baselines/catalog-grip-queries.json`
 * - `docs/baselines/commercial-grip-queries.json`
 * - `docs/baselines/pdp-queries.json` (grip category rows)
 */

import type { CatalogGripBaselineFile } from "@/lib/catalog-grip-baseline";
import type { CommercialGripBaselineFile } from "@/lib/commercial-grip-baseline";
import type { PdpBaselineFile } from "@/lib/pdp-baseline";

export type GripEditorialParityIssue = {
  productId: string;
  message: string;
};

export type GripEditorialParityResult = {
  ok: boolean;
  issues: GripEditorialParityIssue[];
  checked: number;
};

export function editorialHrefToSlug(href: string): string | null {
  const match = href.match(/^\/review\/([^/]+)\/$/);
  return match?.[1] ?? null;
}

export function evaluateGripEditorialParity(
  catalog: CatalogGripBaselineFile,
  commercial: CommercialGripBaselineFile,
  pdp: PdpBaselineFile
): GripEditorialParityResult {
  const issues: GripEditorialParityIssue[] = [];

  const commercialByProduct = new Map(
    commercial.queries.map((row) => [row.productId, row])
  );
  const pdpByProduct = new Map(
    pdp.queries
      .filter((row) => row.expectCategory === "grip")
      .map((row) => [row.productId, row])
  );

  for (const catalogRow of catalog.queries) {
    const { productId } = catalogRow;

    const commercialRow = commercialByProduct.get(productId);
    if (!commercialRow) {
      issues.push({
        productId,
        message: "missing commercial grip baseline row",
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
        message: "missing PDP grip golden-profile row",
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
    if (pdpRow.expectCategory !== "grip") continue;
    if (!catalogProductIds.has(pdpRow.productId)) {
      issues.push({
        productId: pdpRow.productId,
        message: "PDP grip row missing from catalog string baseline",
      });
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: catalog.queries.length,
  };
}

export function formatGripEditorialParityIssues(
  result: GripEditorialParityResult
): string {
  if (result.ok) {
    return `[grip-editorial-parity] ${result.checked} grip SKUs passed three-way parity`;
  }
  const lines = result.issues.map(
    (issue) => `  • ${issue.productId}: ${issue.message}`
  );
  return `[grip-editorial-parity] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
