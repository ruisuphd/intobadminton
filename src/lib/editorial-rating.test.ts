import products from "@/data/products.json";
import { describe, expect, it } from "vitest";
import {
  computeEditorialRating,
  lookupCatalogProduct,
} from "@/lib/editorial-rating";
import type { ProductRecord, RacketProduct } from "@/lib/types/product";

const CATALOG = products as ProductRecord[];

describe("editorial rating", () => {
  it("returns null for unknown products (no fake stars)", () => {
    expect(computeEditorialRating(undefined)).toBeNull();
  });

  it("never publishes a rating below 3.5 or above 5.0", () => {
    for (const product of CATALOG) {
      const rating = computeEditorialRating(product);
      if (!rating) continue;
      expect(rating.ratingValue).toBeGreaterThanOrEqual(3.5);
      expect(rating.ratingValue).toBeLessThanOrEqual(5.0);
    }
  });

  it("rates official_verified racket with founder firsthand testing 4.9 or 5.0", () => {
    // The 88S Pro 2024 has all the maximums: official_verified +
    // shaftFlexSource official + founder firsthand + high-confidence
    // market signals. Should land at the ceiling.
    const product = lookupCatalogProduct(
      CATALOG,
      "Yonex",
      "Astrox 88S Pro (2024)"
    ) as RacketProduct;
    expect(product).toBeDefined();
    const rating = computeEditorialRating(product);
    expect(rating).not.toBeNull();
    expect(rating!.ratingValue).toBeGreaterThanOrEqual(4.9);
  });

  it("rates needs_review + editor_estimate products lower", () => {
    const needsReview = CATALOG.find(
      (p) =>
        p.verificationStatus === "needs_review" &&
        p.category === "racket" &&
        (p as RacketProduct).shaftFlexSource === "editor_estimate"
    );
    if (!needsReview) return; // shape check rather than failure
    const rating = computeEditorialRating(needsReview);
    expect(rating).not.toBeNull();
    // Base 4.0 + 0 verifiability − 0.4 from two penalties = 3.6 floor
    expect(rating!.ratingValue).toBeLessThanOrEqual(4.2);
  });

  it("never reports a reviewCount below 1 when product exists", () => {
    for (const product of CATALOG) {
      const rating = computeEditorialRating(product);
      if (!rating) continue;
      expect(rating.reviewCount).toBeGreaterThanOrEqual(1);
    }
  });

  it("rounds rating to one decimal", () => {
    for (const product of CATALOG) {
      const rating = computeEditorialRating(product);
      if (!rating) continue;
      const oneDecimal = Math.round(rating.ratingValue * 10) / 10;
      expect(rating.ratingValue).toBe(oneDecimal);
    }
  });

  it("only flags meetsAggregateThreshold when reviewCount >= 2", () => {
    for (const product of CATALOG) {
      const rating = computeEditorialRating(product);
      if (!rating) continue;
      if (rating.meetsAggregateThreshold) {
        expect(rating.reviewCount).toBeGreaterThanOrEqual(2);
      } else {
        expect(rating.reviewCount).toBeLessThanOrEqual(1);
      }
    }
  });

  it("emits at least one rationale line for every rating", () => {
    for (const product of CATALOG) {
      const rating = computeEditorialRating(product);
      if (!rating) continue;
      expect(rating.rationale.length).toBeGreaterThan(0);
    }
  });
});
