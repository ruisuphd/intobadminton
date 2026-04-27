import { describe, expect, it } from "vitest";
import { exportReviewsJson, parseReviews } from "@/lib/reviews";
import type { FirstPartyReview } from "@/lib/types/evidence";

const review: FirstPartyReview = {
  id: "r1",
  productId: "p1",
  submittedAt: "2026-04-27T00:00:00.000Z",
  consent: true,
  status: "local_draft",
  level: "club",
  discipline: "doubles",
  fit: 4,
  comfort: 4,
  power: 3,
  control: 5,
  durability: 4,
  summary: "Stable and easy to defend with.",
};

describe("review storage helpers", () => {
  it("parses review arrays and ignores invalid JSON", () => {
    expect(parseReviews(JSON.stringify([review]))).toHaveLength(1);
    expect(parseReviews("{bad")).toEqual([]);
  });

  it("exports reviews with metadata", () => {
    const parsed = JSON.parse(exportReviewsJson([review])) as {
      source: string;
      reviews: FirstPartyReview[];
    };
    expect(parsed.source).toContain("IntoBadminton");
    expect(parsed.reviews[0]?.id).toBe("r1");
  });
});
