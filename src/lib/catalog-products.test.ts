import { describe, expect, it } from "vitest";
import {
  allCatalogProductIds,
  catalogProductById,
  productPath,
} from "@/lib/catalog-products";

describe("catalog-products", () => {
  it("lists every catalogue id", () => {
    expect(allCatalogProductIds().length).toBeGreaterThan(50);
    expect(catalogProductById("yy-nanoflare-1000z")).toBeDefined();
  });

  it("builds stable product paths", () => {
    expect(productPath("yy-nanoflare-1000z")).toBe(
      "/product/yy-nanoflare-1000z/"
    );
  });
});
