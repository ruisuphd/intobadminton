import { describe, expect, it } from "vitest";
import type { BlogArticle } from "@/lib/blog";
import {
  filterReviewArticles,
  reviewEquipmentType,
  reviewHubKind,
} from "@/lib/review-hub-filters";

const sample = (slug: string, title: string): BlogArticle => ({
  slug: slug as BlogArticle["slug"],
  updatedAt: "2026-01-01",
  title,
  dek: "",
  verdict: "",
  sections: [],
  cta: "",
});

describe("review-hub-filters", () => {
  it("classifies catalog vs guide slugs", () => {
    expect(reviewHubKind("yonex-astrox-88d-pro-vs-88s-pro-2024")).toBe("catalog");
    expect(reviewHubKind("how-to-read-badminton-reviews")).toBe("guides");
  });

  it("infers equipment type from slug/title", () => {
    expect(
      reviewEquipmentType(
        "yonex-65z4-shoes-review",
        "Yonex 65Z4 shoes review"
      )
    ).toBe("shoes");
    expect(
      reviewEquipmentType("li-ning-l69-string-review", "Li-Ning L69 string")
    ).toBe("string");
  });

  it("filters by query and kind", () => {
    const articles = [
      sample("yonex-astrox-88d-pro-vs-88s-pro-2024", "Astrox 88D vs 88S"),
      sample("how-to-read-badminton-reviews", "How to read reviews"),
    ];
    const filtered = filterReviewArticles(articles, {
      query: "astrox",
      kind: "all",
      equipment: "all",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].slug).toContain("astrox");
  });
});
