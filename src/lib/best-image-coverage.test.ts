import { describe, expect, it } from "vitest";
import {
  BEST_IMAGE_REQUIREMENTS,
  BEST_IMAGE_WAIVERS,
  countVerifiedPickCoverage,
  evaluateBestImageCoverage,
  formatBestImageCoverageIssues,
  pickHasVerifiedImage,
} from "@/lib/best-image-coverage";
import type { ProductRecord } from "@/lib/types/product";

describe("best-image-coverage", () => {
  it("covers key commercial landings with waiver-adjusted thresholds", () => {
    expect(BEST_IMAGE_REQUIREMENTS.strings).toEqual({
      pickCount: 6,
      waivers: 0,
    });
    expect(BEST_IMAGE_REQUIREMENTS.shoes).toEqual({ pickCount: 6, waivers: 0 });
    expect(BEST_IMAGE_REQUIREMENTS["all-round-rackets"]).toEqual({
      pickCount: 6,
      waivers: 0,
    });
    expect(BEST_IMAGE_REQUIREMENTS["intermediate-rackets"]).toEqual({
      pickCount: 6,
      waivers: 0,
    });
  });

  it("passes verified-image guard for commercial /best/* landings", () => {
    const result = evaluateBestImageCoverage();
    if (!result.ok) {
      console.error(formatBestImageCoverageIssues(result.issues));
    }
    expect(result.ok).toBe(true);
  });

  it("has no active image waivers on commercial landings", () => {
    expect(BEST_IMAGE_WAIVERS).toEqual([]);
  });

  it("counts catalogue-backed verified images via productId", () => {
    const catalog = [
      {
        id: "ln-l69-string",
        image: {
          url: "https://example.com/l69.png",
          verified: true,
        },
      },
    ] as ProductRecord[];

    const source = `
      productId: "ln-l69-string",
      bestFor: "Club play",
    `;

    expect(pickHasVerifiedImage(source, "ln-l69-string", catalog)).toBe(true);
    expect(countVerifiedPickCoverage(source, catalog)).toBe(1);
  });
});
