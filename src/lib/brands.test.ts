import { describe, expect, it } from "vitest";
import { brands, brandsByTier, getBrand } from "./brands";
import { CATEGORIES } from "./taxonomy";

describe("brand registry", () => {
  it("includes the three flagship brands by id", () => {
    const ids = brands.map((b) => b.id);
    expect(ids).toContain("yonex");
    expect(ids).toContain("victor");
    expect(ids).toContain("li-ning");
  });

  it("every brand has a unique id", () => {
    const ids = brands.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every brand declares categories that exist in the taxonomy", () => {
    const valid = new Set<string>(CATEGORIES);
    for (const b of brands) {
      expect(b.categoriesCovered.length).toBeGreaterThan(0);
      for (const cat of b.categoriesCovered) {
        expect(valid.has(cat)).toBe(true);
      }
    }
  });

  it("getBrand returns the matching record", () => {
    expect(getBrand("yonex")?.name).toBe("Yonex");
    expect(getBrand("does-not-exist")).toBeUndefined();
  });

  it("brandsByTier groups correctly", () => {
    expect(brandsByTier("flagship").map((b) => b.id)).toEqual([
      "yonex",
      "victor",
      "li-ning",
    ]);
  });
});
