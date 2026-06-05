import { describe, expect, it } from "vitest";
import productsCatalog from "@/data/products.json";
import type { ProductRecord } from "@/lib/types/product";
import {
  filterProductsByKeyword,
  productMatchesKeyword,
  productSearchBlob,
} from "./catalog-keyword";

const CATALOG = productsCatalog as ProductRecord[];

describe("catalog-keyword", () => {
  it("matches brand and product name tokens", () => {
    const astrox = CATALOG.find((p) => p.name.includes("Astrox"));
    expect(astrox).toBeDefined();
    expect(productMatchesKeyword(astrox!, "yonex astrox")).toBe(true);
  });

  it("matches weight class on rackets", () => {
    const racket = CATALOG.find(
      (p) => p.category === "racket" && p.weightClass === "4U"
    );
    expect(racket).toBeDefined();
    expect(productMatchesKeyword(racket!, "4u")).toBe(true);
  });

  it("returns all rows for empty query", () => {
    expect(filterProductsByKeyword(CATALOG.slice(0, 5), "")).toHaveLength(5);
    expect(filterProductsByKeyword(CATALOG.slice(0, 5), "   ")).toHaveLength(5);
  });

  it("narrows rows when multiple tokens are required", () => {
    const filtered = filterProductsByKeyword(CATALOG, "yonex astrox 99");
    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.some(
        (p) => p.brand === "Yonex" && productSearchBlob(p).includes("astrox")
      )
    ).toBe(true);
    expect(
      filtered.every((p) =>
        ["yonex", "astrox", "99"].every((token) =>
          productSearchBlob(p).includes(token)
        )
      )
    ).toBe(true);
  });

  it("returns no rows when tokens do not match", () => {
    expect(filterProductsByKeyword(CATALOG, "zzzznotaproduct")).toHaveLength(0);
  });
});
