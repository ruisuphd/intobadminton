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

  it("rewards founder firsthand testing on a verified racket", () => {
    // The 88S Pro 2024 carries founder firsthand testing plus high-confidence
    // market signals — the two product-side signals that still move the score.
    const product = lookupCatalogProduct(
      CATALOG,
      "Yonex",
      "Astrox 88S Pro (2024)"
    ) as RacketProduct;
    expect(product).toBeDefined();
    const rating = computeEditorialRating(product);
    expect(rating).not.toBeNull();
    expect(rating!.ratingValue).toBeGreaterThan(4.0);
  });

  it("publishes NO rating for unverified products rather than a lower one", () => {
    // A gap in our sourcing is a fact about us, not about the racket. We must
    // never express it as a worse star rating — the reader would read that as
    // "this is a worse product".
    const needsReview = CATALOG.filter(
      (p) => p.verificationStatus === "needs_review"
    );
    expect(needsReview.length).toBeGreaterThan(0);
    for (const product of needsReview) {
      expect(computeEditorialRating(product)).toBeNull();
    }
  });

  it("never lets our own record-keeping move the score", () => {
    // Regression guard for the old model, which moved stars on whether the
    // shaft-flex figure was sourced and whether our editor note ran past 100
    // characters. Two products identical except for those fields must rate
    // the same.
    const base = {
      id: "mock",
      category: "racket" as const,
      brand: "Test",
      name: "Mock",
      priceUsd: 200,
      verificationStatus: "editor_verified" as const,
      editorNote: "Short note.",
      marketSignals: [],
      reviewCount: 0,
      lastVerifiedAt: "2026-05-21",
    };
    const tidyRecords = {
      ...base,
      shaftFlexSource: "official" as const,
      editorNote: "A much longer editor note that comfortably runs past the old one-hundred-character threshold used before.",
    } as unknown as ProductRecord;
    const sparseRecords = {
      ...base,
      shaftFlexSource: "editor_estimate" as const,
    } as unknown as ProductRecord;

    expect(computeEditorialRating(tidyRecords)!.ratingValue).toBe(
      computeEditorialRating(sparseRecords)!.ratingValue
    );
  });

  it("rounds rating to one decimal", () => {
    for (const product of CATALOG) {
      const rating = computeEditorialRating(product);
      if (!rating) continue;
      const oneDecimal = Math.round(rating.ratingValue * 10) / 10;
      expect(rating.ratingValue).toBe(oneDecimal);
    }
  });

  it("exposes no aggregate-shaped fields (guards against AggregateRating)", () => {
    // `reviewCount` / `meetsAggregateThreshold` were what let callers emit a
    // schema.org AggregateRating over ratings we never collected. Keeping them
    // off the type is the cheapest way to stop that coming back.
    const rating = computeEditorialRating(
      CATALOG.find((p) => p.verificationStatus !== "needs_review")
    );
    expect(rating).not.toBeNull();
    expect(rating).not.toHaveProperty("reviewCount");
    expect(rating).not.toHaveProperty("meetsAggregateThreshold");
  });

  it("emits at least one rationale line for every rating", () => {
    for (const product of CATALOG) {
      const rating = computeEditorialRating(product);
      if (!rating) continue;
      expect(rating.rationale.length).toBeGreaterThan(0);
    }
  });

  // Observer-voice phrasings used in Sprint 6 paraphrased reviews (for
  // products NOT on the founder-firsthand list) must NOT trip the founder
  // firsthand rating boost. The regex at editorial-rating.ts:34 deliberately
  // looks for the literal phrases "founder firsthand" or "founder current";
  // observer phrasings use coach/club ecosystem framing instead, and a
  // build-time mistake here would be silently confer +0.3 stars onto
  // products Rui Su has not personally played.
  describe("observer voice does not trip the founder firsthand boost", () => {
    const observerPhrasings = [
      "the pattern I see most at our club when teammates switch to this frame",
      "from coach conversations and a few teammates at the Maynooth club",
      "a teammate switched to this racket mid-season and the doubles drives stayed cleaner",
      "club ecosystem observation rather than personal court time",
      "noticed across two coaching lineages at the Dublin clubs",
      "based on observer notes and source-review fact-checks, not personal testing",
      "Rui's observer notes from the coach lineage; no personal session log on this frame",
      "Editor reviewed source coverage from TiGe XLab and badmintoncn.com",
    ];

    for (const editorNote of observerPhrasings) {
      it(`does NOT boost on phrasing: "${editorNote.slice(0, 48)}…"`, () => {
        // Build a minimal mock racket product carrying only the editor note
        // we want to probe. Other rating signals (verification, market
        // signals, reviewCount) deliberately neutral so we can isolate the
        // founder-firsthand branch.
        const mockProduct = {
          id: "mock-observer",
          category: "racket" as const,
          brand: "Test",
          name: "Mock Observer Product",
          priceUsd: 200,
          verificationStatus: "editor_verified" as const,
          shaftFlexSource: "official" as const,
          editorNote,
          marketSignals: [],
          reviewCount: 0,
          lastVerifiedAt: "2026-05-21",
        } as unknown as ProductRecord;

        const rating = computeEditorialRating(mockProduct);
        expect(rating).not.toBeNull();
        // None of the rationale lines should claim founder personal testing.
        const claimsFirsthand = rating!.rationale.some((line) =>
          line.toLowerCase().includes("founder personally tested")
        );
        expect(claimsFirsthand).toBe(false);
      });
    }

    it("DOES boost on the canonical 'founder firsthand' phrasing", () => {
      // Positive control — make sure the regex still fires on the actual
      // pattern, so the suite would catch a regression that drops the
      // boost entirely.
      const mockProduct = {
        id: "mock-firsthand",
        category: "racket" as const,
        brand: "Test",
        name: "Mock Firsthand Product",
        priceUsd: 200,
        verificationStatus: "official_verified" as const,
        shaftFlexSource: "official" as const,
        editorNote:
          "Founder firsthand — Rui Su's current doubles frame across two club seasons.",
        marketSignals: [],
        reviewCount: 0,
        lastVerifiedAt: "2026-05-21",
      } as unknown as ProductRecord;

      const rating = computeEditorialRating(mockProduct);
      const claimsFirsthand = (rating?.rationale ?? []).some((line) =>
        line.toLowerCase().includes("founder personally tested")
      );
      expect(claimsFirsthand).toBe(true);
    });
  });
});
