import { describe, expect, it } from "vitest";
import { countCatalogKeywordMatches } from "./site-search-catalog";

describe("site-search-catalog", () => {
  it("returns zero for short or empty queries", () => {
    expect(countCatalogKeywordMatches("")).toBe(0);
    expect(countCatalogKeywordMatches("a")).toBe(0);
    expect(countCatalogKeywordMatches("  ")).toBe(0);
  });

  it("counts Yonex Nanoflare catalogue rows", () => {
    expect(countCatalogKeywordMatches("yonex nanoflare")).toBeGreaterThan(0);
  });

  it("returns zero when no catalogue row matches", () => {
    expect(countCatalogKeywordMatches("zzzznotaproduct")).toBe(0);
  });
});
