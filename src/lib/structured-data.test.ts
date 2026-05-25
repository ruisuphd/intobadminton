import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import { computeEditorialRating } from "@/lib/editorial-rating";
import { productReviewJsonLd } from "@/lib/structured-data";
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
  });
});
