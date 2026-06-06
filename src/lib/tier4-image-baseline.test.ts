import { describe, expect, it } from "vitest";
import {
  TIER4_BUDGET_PRODUCT_IDS,
  TIER4_IMAGE_MIN_VERIFIED,
  TIER4_IMAGE_WAIVERS,
  evaluateTier4ImageBaseline,
  hasVerifiedCatalogueImage,
} from "@/lib/tier4-image-baseline";

describe("tier4-image-baseline", () => {
  it("tracks 13 tier-4 budget landing SKUs", () => {
    expect(TIER4_BUDGET_PRODUCT_IDS).toHaveLength(13);
    expect(TIER4_BUDGET_PRODUCT_IDS).toContain("vic-thruster-hwql");
    expect(TIER4_BUDGET_PRODUCT_IDS).toContain("bonny-future-land-3");
  });

  it("documents waivers for CN-market SKUs without Western retailer photos", () => {
    expect(TIER4_IMAGE_WAIVERS.length).toBeGreaterThanOrEqual(12);
    expect(
      TIER4_IMAGE_WAIVERS.some((w) => w.productId === "vic-thruster-sr")
    ).toBe(true);
    expect(
      TIER4_IMAGE_WAIVERS.some((w) => w.productId === "bonny-future-land-3")
    ).toBe(true);
  });

  it("passes tier-4 image baseline with HWQL verified image", () => {
    const result = evaluateTier4ImageBaseline();
    if (!result.ok) {
      console.error(result.issues);
    }
    expect(result.ok).toBe(true);
    expect(result.verified).toBeGreaterThanOrEqual(TIER4_IMAGE_MIN_VERIFIED);
    expect(hasVerifiedCatalogueImage("vic-thruster-hwql")).toBe(true);
  });
});
