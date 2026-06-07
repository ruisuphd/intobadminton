/**
 * Three-way parity guard for racket SKU editorial exits across PDP, catalog
 * browse, and commercial `/best/rackets/` surfaces.
 *
 * Committed expectations are derived from:
 * - `docs/baselines/catalog-racket-queries.json`
 * - `docs/baselines/commercial-racket-queries.json`
 * - `docs/baselines/pdp-queries.json` (racket category rows)
 */

import type { CatalogRacketBaselineFile } from "@/lib/catalog-racket-baseline";
import type { CommercialRacketBaselineFile } from "@/lib/commercial-racket-baseline";
import type { PdpBaselineFile } from "@/lib/pdp-baseline";

/** PDP-only alias SKUs guarded elsewhere — not on commercial `/best/*` racket picks. */
const PDP_PARITY_EXCLUSIONS = new Set([
  "vic-thruster-ryuga-ii",
  "bonny-leisu-800",
]);

export type RacketEditorialParityIssue = {
  productId: string;
  message: string;
};

export type RacketEditorialParityResult = {
  ok: boolean;
  issues: RacketEditorialParityIssue[];
  checked: number;
};

export function editorialHrefToSlug(href: string): string | null {
  const match = href.match(/^\/review\/([^/]+)\/$/);
  return match?.[1] ?? null;
}

export function evaluateRacketEditorialParity(
  catalog: CatalogRacketBaselineFile,
  commercial: CommercialRacketBaselineFile,
  pdp: PdpBaselineFile
): RacketEditorialParityResult {
  const issues: RacketEditorialParityIssue[] = [];

  const commercialByProduct = new Map(
    commercial.queries.map((row) => [row.productId, row])
  );
  const pdpByProduct = new Map(
    pdp.queries
      .filter((row) => row.expectCategory === "racket")
      .map((row) => [row.productId, row])
  );

  for (const catalogRow of catalog.queries) {
    const { productId } = catalogRow;

    const commercialRow = commercialByProduct.get(productId);
    if (!commercialRow) {
      issues.push({
        productId,
        message: "missing commercial racket baseline row",
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
        message: "missing PDP racket golden-profile row",
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
    if (pdpRow.expectCategory !== "racket") continue;
    if (PDP_PARITY_EXCLUSIONS.has(pdpRow.productId)) continue;
    if (!catalogProductIds.has(pdpRow.productId)) {
      issues.push({
        productId: pdpRow.productId,
        message: "PDP racket row missing from catalog racket baseline",
      });
    }
  }

  return {
    ok: issues.length === 0,
    issues,
    checked: catalog.queries.length,
  };
}

export function formatRacketEditorialParityIssues(
  result: RacketEditorialParityResult
): string {
  if (result.ok) {
    return `[racket-editorial-parity] ${result.checked} racket SKUs passed three-way parity`;
  }
  const lines = result.issues.map(
    (issue) => `  • ${issue.productId}: ${issue.message}`
  );
  return `[racket-editorial-parity] ${result.issues.length} failure(s):\n${lines.join("\n")}`;
}
