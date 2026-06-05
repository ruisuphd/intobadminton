import { filterProductsByKeyword } from "@/lib/catalog-keyword";
import { allCatalogProducts } from "@/lib/product-filters";

const MIN_QUERY_LEN = 2;

/** How many catalogue rows match the same keyword rules as `/catalog/?q=`. */
export function countCatalogKeywordMatches(query: string): number {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LEN) return 0;
  return filterProductsByKeyword(allCatalogProducts(), trimmed).length;
}
