/**
 * Three-way parity guard for shuttle SKU editorial exits across PDP, catalog
 * browse, and commercial `/best/shuttles/` surfaces.
 *
 * Committed expectations are derived from:
 * - `docs/baselines/catalog-shuttle-queries.json`
 * - `docs/baselines/commercial-shuttle-queries.json`
 * - `docs/baselines/pdp-queries.json` (shuttle category rows)
 */

import type { CatalogShuttleBaselineFile } from "@/lib/catalog-shuttle-baseline";
import type { CommercialShuttleBaselineFile } from "@/lib/commercial-shuttle-baseline";
import type { PdpBaselineFile } from "@/lib/pdp-baseline";

export type ShuttleEditorialParityIssue = {
  productId: string;
  message: string;
};

export type ShuttleEditorialParityResult = {
  ok: boolean;
  issues: ShuttleEditorialParityIssue[];
  checked: number;
};

export function editorialHrefToSlug(href: string): string | null {
  const match = href.match(/^\/review\/([^/]+)\/$/);
  return match?.[1] ?? null;
}

export function evaluateShuttleEditorialParity(
  catalog: CatalogShuttleBaselineFile,
  commercial: CommercialShuttleBaselineFile,
  pdp: PdpBaselineFile
): ShuttleEditorialParityResult {
  const issues: ShuttleEditorialParityIssue[] = [];

  const commercialByProduct = new Map(
    commercial.queries.map((row) => [row.productId, row])
  );
  const pdpByProduct = new Map(
    pdp.queries
      .filter((row) => row.expectCategory === "shuttle")
      .map((row) => [row.productId, row])
  );

  for (const catalogRow of catalog.queries) {
    const { productId } = catalogRow;

    const commercialRow = commercialByProduct.get(productId);
    if (!commercialRow) {
      issues.push({
        productId,
        message: "missing commercial shuttle baseline row",
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
        message: "missing PDP shuttle golden-profile row",
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
    if (pdpRow.expectCategory !== "shuttle") continue;
    if (!catalogProductIds.has(pdpRow.productId)) {
      issues.push({
        productId: pdpRow.productId,
        message: "PDP shuttle row missing from catalog string baseline",
      });
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: catalog.queries.length,
  };
}

export function formatShuttleEditorialParityIssues(
  result: ShuttleEditorialParityResult
): string {
  if (result.ok) {
    return `[shuttle-editorial-parity] ${result.checked} shuttle SKUs passed three-way parity`;
  }
  const lines = result.issues.map(
    (issue) => `  • ${issue.productId}: ${issue.message}`
  );
  return `[shuttle-editorial-parity] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
