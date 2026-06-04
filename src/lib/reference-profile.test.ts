import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import { referenceClubDoublesProfile } from "@/lib/reference-profile";
import { scoreOneProduct } from "@/lib/scoring";
import type { ProductRecord } from "@/lib/types/product";

const catalog = products as ProductRecord[];

describe("referenceClubDoublesProfile", () => {
  it("scores a mapped racket for the reference profile", () => {
    const racket = catalog.find((p) => p.id === "yy-astrox-99-pro");
    expect(racket).toBeTruthy();
    const profile = referenceClubDoublesProfile("racket");
    const scored = scoreOneProduct(racket!, profile);
    expect(scored).toBeTruthy();
    expect(scored!.fitScore).toBeGreaterThan(0);
    expect(scored!.subscores.style).toBeGreaterThanOrEqual(0);
  });
});
