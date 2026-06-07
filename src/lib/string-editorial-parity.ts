/**
 * Three-way parity guard for string SKU editorial exits across PDP, catalog
 * browse, and commercial `/best/strings/` surfaces.
 *
 * Committed expectations are derived from:
 * - `docs/baselines/catalog-string-queries.json`
 * - `docs/baselines/commercial-string-queries.json`
 * - `docs/baselines/pdp-queries.json` (string category rows)
 */

import type { CatalogStringBaselineFile } from "@/lib/catalog-string-baseline";
import type { CommercialStringBaselineFile } from "@/lib/commercial-string-baseline";
import type { PdpBaselineFile } from "@/lib/pdp-baseline";

export type StringEditorialParityIssue = {
  productId: string;
  message: string;
};

export type StringEditorialParityResult = {
  ok: boolean;
  issues: StringEditorialParityIssue[];
  checked: number;
};

export function editorialHrefToSlug(href: string): string | null {
  const match = href.match(/^\/review\/([^/]+)\/$/);
  return match?.[1] ?? null;
}

export function evaluateStringEditorialParity(
  catalog: CatalogStringBaselineFile,
  commercial: CommercialStringBaselineFile,
  pdp: PdpBaselineFile
): StringEditorialParityResult {
  const issues: StringEditorialParityIssue[] = [];

  const commercialByProduct = new Map(
    commercial.queries.map((row) => [row.productId, row])
  );
  const pdpByProduct = new Map(
    pdp.queries
      .filter((row) => row.expectCategory === "string")
      .map((row) => [row.productId, row])
  );

  for (const catalogRow of catalog.queries) {
    const { productId } = catalogRow;

    const commercialRow = commercialByProduct.get(productId);
    if (!commercialRow) {
      issues.push({
        productId,
        message: "missing commercial string baseline row",
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
        message: "missing PDP string golden-profile row",
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
    if (pdpRow.expectCategory !== "string") continue;
    if (!catalogProductIds.has(pdpRow.productId)) {
      issues.push({
        productId: pdpRow.productId,
        message: "PDP string row missing from catalog string baseline",
      });
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: catalog.queries.length,
  };
}

export function formatStringEditorialParityIssues(
  result: StringEditorialParityResult
): string {
  if (result.ok) {
    return `[string-editorial-parity] ${result.checked} string SKUs passed three-way parity`;
  }
  const lines = result.issues.map(
    (issue) => `  • ${issue.productId}: ${issue.message}`
  );
  return `[string-editorial-parity] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
