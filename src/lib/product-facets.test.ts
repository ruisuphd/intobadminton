import { describe, expect, it } from "vitest";
import {
  filterCatalog,
  parseProductFacetFilters,
  productFacetSearchParams,
} from "./product-facets";

describe("product-facets", () => {
  it("filters by weight class", () => {
    const rows = filterCatalog({ weightClasses: ["5U"], category: "racket" });
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((row) => row.weightClass === "5U")).toBe(true);
  });

  it("filters by max price", () => {
    const rows = filterCatalog({ maxPriceUsd: 100, category: "racket" });
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((row) => (row.priceUsd ?? 0) <= 100)).toBe(true);
  });

  it("round-trips URL params", () => {
    const params = productFacetSearchParams({
      query: "nanoflare",
      weightClasses: ["4U"],
      balance: ["head_light"],
      maxPriceUsd: 250,
      category: "racket",
    });
    const parsed = parseProductFacetFilters(params);
    expect(parsed.query).toBe("nanoflare");
    expect(parsed.weightClasses).toEqual(["4U"]);
    expect(parsed.balance).toEqual(["head_light"]);
    expect(parsed.maxPriceUsd).toBe(250);
    expect(parsed.category).toBe("racket");
  });
});
