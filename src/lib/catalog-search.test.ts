import { describe, expect, it } from "vitest";
import {
  filterProductsByQuery,
  normalizeCatalogQuery,
  productMatchesCatalogQuery,
  productSearchBlob,
} from "@/lib/catalog-search";
import { allCatalogProducts } from "@/lib/product-filters";

describe("catalog-search", () => {
  const catalog = allCatalogProducts();
  const astrox100 = catalog.find((p) => p.id === "yy-astrox-100zz");

  it("normalizes whitespace in queries", () => {
    expect(normalizeCatalogQuery("  Astrox   77  ")).toBe("astrox 77");
    expect(normalizeCatalogQuery(null)).toBe("");
  });

  it("matches brand and model tokens", () => {
    expect(astrox100).toBeDefined();
    expect(productMatchesCatalogQuery(astrox100!, "yonex astrox")).toBe(true);
    expect(productMatchesCatalogQuery(astrox100!, "victor")).toBe(false);
  });

  it("matches spec tokens on rackets", () => {
    expect(astrox100).toBeDefined();
    const blob = productSearchBlob(astrox100!);
    expect(blob).toContain("4u");
    expect(productMatchesCatalogQuery(astrox100!, "4u")).toBe(true);
  });

  it("filters rows by multi-token query", () => {
    const rows = filterProductsByQuery(catalog, "yonex astrox");
    expect(rows.some((p) => p.id === "yy-astrox-100zz")).toBe(true);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.length).toBeLessThan(catalog.length);
  });

  it("returns all rows for empty query", () => {
    expect(filterProductsByQuery(catalog.slice(0, 5), "")).toHaveLength(5);
  });
});
