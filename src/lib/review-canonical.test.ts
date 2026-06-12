import { describe, expect, it } from "vitest";
import { blogSlugs } from "@/lib/blog";
import {
  canonicalReviewSlug,
  duplicateReviewCanonicalSlugs,
} from "@/lib/review-canonical";

describe("duplicate review canonical map", () => {
  it("maps only known blog slugs on both sides", () => {
    const known = new Set<string>(blogSlugs);
    for (const [dup, canonical] of Object.entries(
      duplicateReviewCanonicalSlugs
    )) {
      expect(known.has(dup), `unknown duplicate slug ${dup}`).toBe(true);
      expect(known.has(canonical), `unknown canonical slug ${canonical}`).toBe(
        true
      );
    }
  });

  it("never chains or self-references", () => {
    for (const [dup, canonical] of Object.entries(
      duplicateReviewCanonicalSlugs
    )) {
      expect(dup).not.toBe(canonical);
      // a canonical target must itself be canonical
      expect(duplicateReviewCanonicalSlugs[canonical]).toBeUndefined();
    }
  });

  it("returns the slug itself for non-duplicates", () => {
    expect(canonicalReviewSlug("yonex-arcsaber-7-pro-review")).toBe(
      "yonex-arcsaber-7-pro-review"
    );
  });

  it("consolidates the RSL Aero U duplicate onto the Classic Tourney review", () => {
    expect(canonicalReviewSlug("rsl-aero-u-shuttle-review")).toBe(
      "rsl-aero-classic-tourney-shuttle-review"
    );
  });
});
