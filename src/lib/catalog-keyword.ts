import type { ProductRecord, RacketProduct } from "@/lib/types/product";
import { humanize } from "@/lib/text";
import { tokenMatchesBlob } from "@/lib/search-fuzzy";

function isRacket(p: ProductRecord): p is RacketProduct {
  return p.category === "racket";
}

/** Lowercase searchable blob for a catalogue row — brand, name, category, specs. */
export function productSearchBlob(product: ProductRecord): string {
  const parts = [
    product.brand,
    product.name,
    product.category,
    product.id,
    humanize(product.category),
  ];

  if (isRacket(product)) {
    parts.push(
      product.weightClass,
      product.balanceCategory,
      product.shaftFlex,
      humanize(product.balanceCategory),
      humanize(product.shaftFlex)
    );
  }

  if (product.category === "shoes") {
    parts.push(product.cushioning, product.stability, humanize(product.cushioning));
  }

  if (product.category === "string") {
    parts.push(String(product.gaugeMm), product.feel, humanize(product.feel));
  }

  if (product.editorNote) parts.push(product.editorNote);

  return parts.join(" ").toLowerCase();
}

function queryTokens(raw: string): string[] {
  return raw
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

/** True when every query token matches the product blob (substring or fuzzy). */
export function productMatchesKeyword(
  product: ProductRecord,
  query: string | null | undefined
): boolean {
  const tokens = queryTokens(query ?? "");
  if (tokens.length === 0) return true;
  const blob = productSearchBlob(product);
  return tokens.every((token) => tokenMatchesBlob(token, blob));
}

export function filterProductsByKeyword(
  rows: ProductRecord[],
  query: string | null | undefined
): ProductRecord[] {
  const tokens = queryTokens(query ?? "");
  if (tokens.length === 0) return rows;
  return rows.filter((p) => productMatchesKeyword(p, query));
}
