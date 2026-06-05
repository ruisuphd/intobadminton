import { catalogHrefFromKeywordQuery } from "@/lib/catalog-url";
import { countCatalogKeywordMatches } from "@/lib/site-search-catalog";
import { searchSite, type SearchEntryKind } from "@/lib/site-search";

const MIN_QUERY_LEN = 2;

const EDITORIAL_KINDS: ReadonlySet<SearchEntryKind> = new Set([
  "review",
  "guide",
  "best",
  "tool",
  "brand",
  "compare",
]);

/** True when the query matches at least one editorial index row (not catalogue SKU cards). */
export function hasEditorialSearchHits(query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return false;
  // Match the search results page cap so product rows cannot hide editorial hits.
  return searchSite(trimmed, 20).some((e) => EDITORIAL_KINDS.has(e.kind));
}

/**
 * Product-intent: catalogue keyword filter matches SKUs but site search has no
 * reviews, guides, best-of, tools, brands, or compare pages for the query.
 */
export function isProductIntentQuery(query: string): boolean {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LEN) return false;
  if (countCatalogKeywordMatches(trimmed) === 0) return false;
  return !hasEditorialSearchHits(trimmed);
}

/** Destination for a search form submit — catalog when only SKUs match, else `/search/`. */
export function searchSubmitHref(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "/search/";
  if (isProductIntentQuery(trimmed)) {
    return catalogHrefFromKeywordQuery(trimmed);
  }
  return `/search/?q=${encodeURIComponent(trimmed)}`;
}
