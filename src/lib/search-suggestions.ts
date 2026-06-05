import { catalogHrefFromKeywordQuery } from "@/lib/catalog-url";
import { countCatalogKeywordMatches } from "@/lib/site-search-catalog";
import { searchSite, type SearchEntry } from "@/lib/site-search";

export const MIN_SUGGESTION_QUERY_LEN = 2;
export const DEFAULT_SUGGESTION_LIMIT = 6;

export type CatalogSuggestion = {
  kind: "catalog";
  href: string;
  count: number;
  query: string;
};

export type EntrySuggestion = {
  kind: "entry";
  entry: SearchEntry;
};

export type SearchSuggestion = CatalogSuggestion | EntrySuggestion;

/** Mixed autocomplete rows: catalog CTA first when SKUs match, then editorial hits. */
export function searchSuggestions(
  query: string,
  limit = DEFAULT_SUGGESTION_LIMIT
): SearchSuggestion[] {
  const trimmed = query.trim();
  if (trimmed.length < MIN_SUGGESTION_QUERY_LEN) return [];

  const out: SearchSuggestion[] = [];
  const catalogCount = countCatalogKeywordMatches(trimmed);
  if (catalogCount > 0) {
    out.push({
      kind: "catalog",
      href: catalogHrefFromKeywordQuery(trimmed),
      count: catalogCount,
      query: trimmed,
    });
  }

  const editorialLimit = Math.max(0, limit - out.length);
  const entries = searchSite(trimmed, editorialLimit);
  for (const entry of entries) {
    out.push({ kind: "entry", entry });
  }

  return out.slice(0, limit);
}
