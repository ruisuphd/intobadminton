import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  compareCellValue,
  compareFieldsForItems,
  compareWinners,
} from "@/lib/compare-fields";
import type { ProductRecord } from "@/lib/types/product";

const catalogue = products as ProductRecord[];

describe("compare-fields", () => {
  it("hides category-specific rows when products differ in category", () => {
    const racket = catalogue.find((p) => p.category === "racket");
    const shoes = catalogue.find((p) => p.category === "shoes");
    expect(racket).toBeDefined();
    expect(shoes).toBeDefined();
    const fields = compareFieldsForItems([racket!, shoes!]);
    const keys = fields.map((f) => f.key);
    expect(keys).not.toContain("headWeight");
    expect(keys).not.toContain("fitWidth");
    expect(keys).toContain("priceUsd");
  });

  it("shows racket-only rows for a homogeneous racket compare", () => {
    const rackets = catalogue.filter((p) => p.category === "racket").slice(0, 2);
    const fields = compareFieldsForItems(rackets);
    expect(fields.some((f) => f.key === "headWeight")).toBe(true);
  });

  it("picks lower price as winner", () => {
    const a = { ...catalogue[0], id: "a", priceUsd: 100 };
    const b = { ...catalogue[0], id: "b", priceUsd: 200 };
    const field = compareFieldsForItems([a, b]).find((f) => f.key === "priceUsd");
    expect(field).toBeDefined();
    const winners = compareWinners([a, b], field!);
    expect(winners.has("a")).toBe(true);
    expect(winners.has("b")).toBe(false);
  });

  it("formats head weight for display", () => {
    const p = catalogue.find(
      (x) => x.category === "racket" && "headWeight" in x
    ) as ProductRecord;
    expect(compareCellValue(p, "headWeight")).not.toBe("—");
  });
});
