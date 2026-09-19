import { describe, expect, it } from "vitest";
import blogReviewMap from "@/data/blog-review-product-map.json";
import products from "@/data/products.json";
import { blogArticles } from "@/lib/blog";
import { reviewProductIdForBlog } from "@/lib/content-links";
import { computeEditorialRating } from "@/lib/editorial-rating";
import { reviewProductById } from "@/lib/review-pages";
import { productReviewJsonLd } from "@/lib/structured-data";
import type { ProductRecord } from "@/lib/types/product";

const catalog = products as ProductRecord[];

describe("review article product schema wiring", () => {
  it("builds Product+Review JSON-LD for a mapped blog slug", () => {
    const slug = "victor-drivex-12-vs-astrox-88d-pro";
    const productId = reviewProductIdForBlog(slug);
    expect(productId).toBeTruthy();

    const product = reviewProductById(productId!);
    expect(product).toBeTruthy();

    const schema = productReviewJsonLd({
      product: product!,
      path: `/review/${slug}/`,
      description: "Editorial review dek.",
      reviewBody: "Editorial review dek.",
      rating: computeEditorialRating(product),
    });

    expect(schema["@type"]).toBe("Product");
    const review = schema.review as Record<string, unknown>;
    expect(review["@type"]).toBe("Review");
  });

  it("has at least one catalog id in the blog-review map", () => {
    const mapped = Object.values(blogReviewMap as Record<string, string>);
    expect(mapped.some((id) => catalog.some((p) => p.id === id))).toBe(true);
  });

  it("enriches a mapped comparison slug (AxForce 100 II)", () => {
    const slug = "li-ning-thunder-100-gen-2-vs-gen-1";
    const productId = reviewProductIdForBlog(slug);
    expect(productId).toBe("ln-axforce-100-gen-2");
    expect(reviewProductById(productId!)).toBeTruthy();
  });

  it("maps review slugs only to valid catalogue ids and published articles", () => {
    const map = blogReviewMap as Record<string, string>;
    const published = new Set<string>(blogArticles.en.map((article) => article.slug));
    for (const [slug, id] of Object.entries(map)) {
      expect(catalog.some((p) => p.id === id), id).toBe(true);
      expect(published.has(slug), slug).toBe(true);
    }
  });
});
