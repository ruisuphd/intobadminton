import { describe, expect, it } from "vitest";
import { catalogProductById } from "@/lib/catalog-products";
import { specRowsForProduct } from "@/lib/product-spec-rows";

describe("specRowsForProduct", () => {
  it("includes racket-specific rows", () => {
    const product = catalogProductById("yy-nanoflare-1000z");
    expect(product).toBeDefined();
    const rows = specRowsForProduct(product!);
    expect(rows.some((r) => r.label === "Shaft flex")).toBe(true);
    expect(rows.some((r) => r.label === "Price (USD)")).toBe(true);
  });
});
