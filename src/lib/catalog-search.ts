import { humanize } from "@/lib/text";
import { tokenMatchesBlob } from "@/lib/search-fuzzy";
import type { ProductRecord, RacketProduct } from "@/lib/types/product";

/** Normalize catalog keyword query from URL or input. */
export function normalizeCatalogQuery(raw: string | null | undefined): string {
  return raw?.trim().toLowerCase().replace(/\s+/g, " ") ?? "";
}

function racketTokens(p: RacketProduct): string[] {
  return [
    p.weightClass,
    humanize(p.balanceCategory),
    humanize(p.shaftFlex),
    humanize(p.headWeight),
    ...p.bestFor.map(humanize),
  ];
}

/** Plain-text blob for fuzzy catalog keyword matching. */
export function productSearchBlob(product: ProductRecord): string {
  const parts = [
    product.id,
    product.brand,
    product.name,
    humanize(product.category),
    product.editorNote ?? "",
  ];

  if (product.category === "racket") {
    parts.push(...racketTokens(product));
  } else if (product.category === "shoes") {
    parts.push(
      humanize(product.cushioning),
      humanize(product.stability),
      humanize(product.fitWidth)
    );
  } else if (product.category === "string") {
    parts.push(`${product.gaugeMm}`, humanize(product.feel));
  }

  return parts.join(" ").toLowerCase();
}

/** True when every query token matches the product blob (substring or fuzzy). */
export function productMatchesCatalogQuery(
  product: ProductRecord,
  query: string
): boolean {
  const normalized = normalizeCatalogQuery(query);
  if (!normalized) return true;

  const blob = productSearchBlob(product);
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return tokens.every((token) => tokenMatchesBlob(token, blob));
}

export function filterProductsByQuery(
  rows: ProductRecord[],
  query: string
): ProductRecord[] {
  const normalized = normalizeCatalogQuery(query);
  if (!normalized) return rows;
  return rows.filter((row) => productMatchesCatalogQuery(row, normalized));
}
