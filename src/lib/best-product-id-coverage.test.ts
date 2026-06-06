import { describe, expect, it } from "vitest";
import {
  BEST_PRODUCT_ID_REQUIREMENTS,
  BEST_PRODUCT_ID_WAIVERS,
  evaluateBestProductIdCoverage,
  formatBestProductIdCoverageIssues,
} from "@/lib/best-product-id-coverage";

describe("best-product-id-coverage", () => {
  it("covers key commercial landings with waiver-adjusted thresholds", () => {
    expect(BEST_PRODUCT_ID_REQUIREMENTS.strings).toEqual({
      pickCount: 6,
      waivers: 2,
    });
    expect(BEST_PRODUCT_ID_REQUIREMENTS.shoes).toEqual({
      pickCount: 6,
      waivers: 0,
    });
    expect(BEST_PRODUCT_ID_REQUIREMENTS["smash-heavy-rackets"]).toEqual({
      pickCount: 6,
      waivers: 0,
    });
  });

  it("passes productId linkage guard for commercial /best/* landings", () => {
    const result = evaluateBestProductIdCoverage();
    if (!result.ok) {
      console.error(formatBestProductIdCoverageIssues(result.issues));
    }
    expect(result.ok).toBe(true);
  });

  it("documents strings and beginner pick waivers", () => {
    expect(
      BEST_PRODUCT_ID_WAIVERS.some(
        (w) => w.slug === "strings" && w.pickName === "Aerobite"
      )
    ).toBe(true);
    expect(
      BEST_PRODUCT_ID_WAIVERS.some(
        (w) =>
          w.slug === "beginner-rackets" && w.pickName === "Astrox 77 Play"
      )
    ).toBe(true);
  });
});
