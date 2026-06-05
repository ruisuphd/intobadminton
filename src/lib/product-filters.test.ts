import { describe, expect, it } from "vitest";
import {
  filterProducts,
  priceInBand,
  racketsForSingles,
  racketsHeadLight,
  racketsUnderPrice,
} from "@/lib/product-filters";
import type { ProductRecord } from "@/lib/types/product";

describe("priceInBand", () => {
  it("classifies price bands", () => {
    expect(priceInBand(80, "under100")).toBe(true);
    expect(priceInBand(100, "under100")).toBe(false);
    expect(priceInBand(220, "200plus")).toBe(true);
  });
});

describe("filterProducts", () => {
  const sample: ProductRecord[] = [
    {
      id: "a",
      category: "racket",
      name: "A",
      brand: "Yonex",
      priceUsd: 90,
      weightClass: "4U",
      balanceCategory: "head_light",
    } as ProductRecord,
    {
      id: "b",
      category: "racket",
      name: "B",
      brand: "Victor",
      priceUsd: 220,
      weightClass: "3U",
      balanceCategory: "head_heavy",
    } as ProductRecord,
    {
      id: "c",
      category: "shoes",
      name: "C",
      brand: "Yonex",
      priceUsd: 120,
    } as ProductRecord,
  ];

  it("filters by brand and price band", () => {
    const out = filterProducts(sample, {
      category: null,
      brand: "Yonex",
      weightClass: null,
      balance: null,
      priceBand: "under100",
    });
    expect(out.map((p) => p.id)).toEqual(["a"]);
  });

  it("filters rackets by weight and balance", () => {
    const out = filterProducts(sample, {
      category: "racket",
      brand: null,
      weightClass: "3U",
      balance: "head_heavy",
      priceBand: null,
    });
    expect(out.map((p) => p.id)).toEqual(["b"]);
  });
});

describe("racketsUnderPrice", () => {
  it("returns sorted rackets at or below max", () => {
    const rows = racketsUnderPrice(100);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((r) => r.priceUsd <= 100)).toBe(true);
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i]!.priceUsd).toBeGreaterThanOrEqual(rows[i - 1]!.priceUsd);
    }
  });
});

describe("racketsForSingles", () => {
  it("returns rackets tagged for singles play", () => {
    const rows = racketsForSingles();
    expect(rows.length).toBeGreaterThan(0);
    expect(
      rows.every((r) =>
        r.bestFor.some(
          (tag) =>
            tag === "singles" ||
            tag === "all_round_singles" ||
            tag === "control_singles"
        )
      )
    ).toBe(true);
  });
});

describe("racketsHeadLight", () => {
  it("returns only head-light rackets", () => {
    const rows = racketsHeadLight();
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((r) => r.balanceCategory === "head_light")).toBe(true);
  });
});
