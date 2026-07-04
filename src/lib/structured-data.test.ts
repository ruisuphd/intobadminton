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
    const product = catalog.find((p) => p.id === "yy-as-50");
    expect(product).toBeTruthy();

    const schema = productReviewJsonLd({
      product: product!,
      path: "/review/yonex-aerosensa-50-shuttle-review/",
      description: "Tournament feather shuttle review.",
      reviewBody: "Hands-on AS-50 notes.",
      rating: computeEditorialRating(product),
    });

    expect(schema["@type"]).toBe("Product");
    const review = schema.review as Record<string, unknown>;
    expect(review["@type"]).toBe("Review");
    expect(review.reviewBody).toBe("Hands-on AS-50 notes.");
    expect(review.reviewRating).toBeTruthy();
    const aggregate = schema.aggregateRating as Record<string, unknown>;
    expect(aggregate["@type"]).toBe("AggregateRating");
    expect(aggregate.reviewCount).toBeGreaterThanOrEqual(1);
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
