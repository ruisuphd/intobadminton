import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import { computeEditorialRating } from "@/lib/editorial-rating";
import {
  DATASET_DESCRIPTION_MIN,
  datasetJsonLd,
  normalizeDatasetDescription,
  productReviewJsonLd,
} from "@/lib/structured-data";
import type { ProductRecord } from "@/lib/types/product";

const catalog = products as ProductRecord[];

describe("productReviewJsonLd", () => {
  it("emits Product with nested Review and editorial rating", () => {
    // Must be a verified product — unverified ones deliberately carry no star.
    const product = catalog.find(
      (p) => p.verificationStatus === "official_verified"
    );
    expect(product).toBeTruthy();

    const schema = productReviewJsonLd({
      product: product!,
      path: `/review/${product!.id}/`,
      description: "Tournament feather shuttle review.",
      reviewBody: "Hands-on AS-50 notes.",
      rating: computeEditorialRating(product),
    });

    expect(schema["@type"]).toBe("Product");
    const review = schema.review as Record<string, unknown>;
    expect(review["@type"]).toBe("Review");
    expect(review.reviewBody).toBe("Hands-on AS-50 notes.");
    expect(review.reviewRating).toBeTruthy();
  });

  it("never emits AggregateRating", () => {
    // One named critic's verdict is a Review. An AggregateRating would assert
    // we averaged ratings collected from other people, which we never did —
    // and self-generated aggregates are what draw a spammy-structured-markup
    // manual action.
    for (const product of catalog.slice(0, 40)) {
      const schema = productReviewJsonLd({
        product,
        path: `/review/${product.id}/`,
        description: "Editorial review.",
        reviewBody: "Body.",
        rating: computeEditorialRating(product),
      });
      expect(schema.aggregateRating).toBeUndefined();
    }
  });

  it("keeps Product schema even when the product has no rating", () => {
    // Offers/brand/spec data drive product rich results; an unverified product
    // should lose only its star, never its whole Product node.
    const unverified = catalog.find(
      (p) => p.verificationStatus === "needs_review"
    );
    expect(unverified).toBeTruthy();
    const schema = productReviewJsonLd({
      product: unverified!,
      path: `/review/${unverified!.id}/`,
      description: "Editorial review.",
      reviewBody: "Body.",
      rating: computeEditorialRating(unverified!),
    });
    expect(schema["@type"]).toBe("Product");
    expect(schema.offers).toBeTruthy();
    expect((schema.review as Record<string, unknown>).reviewRating).toBeUndefined();
  });
});

describe("normalizeDatasetDescription", () => {
  it("pads short comparison captions to Google's minimum length", () => {
    const desc = normalizeDatasetDescription("Spec", "Yonex Astrox 88 Pro review");
    expect(desc.length).toBeGreaterThanOrEqual(DATASET_DESCRIPTION_MIN);
    expect(desc).toContain("Spec.");
    expect(desc).toContain("Yonex Astrox 88 Pro review");
  });

  it("leaves long descriptions unchanged", () => {
    const long =
      "Editorial specification and measurement data from Li-Ning Halbertec flagship lineup comparison.";
    expect(normalizeDatasetDescription(long, "context")).toBe(long);
  });
});

describe("datasetJsonLd", () => {
  it("emits Dataset with license and valid description length", () => {
    const schema = datasetJsonLd({
      path: "/review/yonex-astrox-88-pro-2024-review/",
      name: "Yonex Astrox 88 Pro 2024 — structured data",
      description: "Aspect",
      comparison: {
        caption: "Aspect",
        columns: ["Weight", "Balance"],
        rows: [{ label: "Tested", values: ["88 g", "295 mm"] }],
      },
    });

    expect(schema["@type"]).toBe("Dataset");
    expect((schema.description as string).length).toBeGreaterThanOrEqual(
      DATASET_DESCRIPTION_MIN
    );
    expect(schema.license).toBeTruthy();
  });
});
