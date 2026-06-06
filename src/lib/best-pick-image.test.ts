import { describe, expect, it } from "vitest";
import { resolveBestPickImage } from "@/lib/best-pick-image";
import type { Pick } from "@/components/BestPicksPage";
import type { ProductRecord } from "@/lib/types/product";

const catalog: ProductRecord[] = [
  {
    id: "ln-l69-string",
    category: "string",
    name: "L69 String",
    brand: "Li-Ning",
    priceUsd: 14,
    regionAvailability: ["global"],
    officialSourceUrl: "https://lining.com/",
    lastVerifiedAt: "2026-04-30",
    verificationStatus: "editor_verified",
    minRecommendedLevel: "club",
    maxRecommendedLevel: "pro_oriented",
    bestFor: [],
    sourceUrls: [],
    image: {
      url: "https://example.com/l69.jpg",
      source: "lining",
      credit: "Image: Li-Ning",
      alt: "Li-Ning L69 string",
      verified: true,
    },
  } as ProductRecord,
];

describe("resolveBestPickImage", () => {
  it("prefers inline verified image over catalogue", () => {
    const pick: Pick = {
      rank: 1,
      name: "L69",
      brand: "Li-Ning",
      priceUsd: 8,
      bestFor: "test",
      specs: [],
      why: "why",
      tradeoff: "tradeoff",
      productId: "ln-l69-string",
      image: {
        url: "https://example.com/inline.jpg",
        source: "lining",
        credit: "inline",
        alt: "inline",
        verified: true,
      },
    };
    expect(resolveBestPickImage(pick, catalog)?.url).toBe(
      "https://example.com/inline.jpg"
    );
  });

  it("falls back to catalogue image when pick has productId only", () => {
    const pick: Pick = {
      rank: 5,
      name: "L69",
      brand: "Li-Ning",
      priceUsd: 8,
      bestFor: "test",
      specs: [],
      why: "why",
      tradeoff: "tradeoff",
      productId: "ln-l69-string",
    };
    expect(resolveBestPickImage(pick, catalog)?.url).toBe(
      "https://example.com/l69.jpg"
    );
  });
});
