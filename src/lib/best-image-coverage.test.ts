import { describe, expect, it } from "vitest";
import {
  BEST_IMAGE_REQUIREMENTS,
  BEST_IMAGE_WAIVERS,
  evaluateBestImageCoverage,
  formatBestImageCoverageIssues,
} from "@/lib/best-image-coverage";

describe("best-image-coverage", () => {
  it("covers strings and shoes commercial landings", () => {
    expect(BEST_IMAGE_REQUIREMENTS.strings).toEqual({
      pickCount: 6,
      waivers: 1,
    });
    expect(BEST_IMAGE_REQUIREMENTS.shoes).toEqual({ pickCount: 6, waivers: 0 });
  });

  it("passes verified-image guard for commercial /best/* landings", () => {
    const result = evaluateBestImageCoverage();
    if (!result.ok) {
      console.error(formatBestImageCoverageIssues(result.issues));
    }
    expect(result.ok).toBe(true);
  });

  it("documents L69 string image waiver", () => {
    expect(
      BEST_IMAGE_WAIVERS.some((w) => w.slug === "strings" && w.pickName === "L69")
    ).toBe(true);
  });
});
