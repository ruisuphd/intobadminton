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
    expect(BEST_IMAGE_REQUIREMENTS.shuttles).toEqual({
      pickCount: 6,
      waivers: 4,
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
    expect(BEST_IMAGE_REQUIREMENTS["smash-heavy-rackets"]).toEqual({
      pickCount: 6,
      waivers: 0,
    });
    expect(BEST_IMAGE_REQUIREMENTS["singles-rackets"]).toEqual({
      pickCount: 6,
      waivers: 0,
    });
    expect(BEST_IMAGE_REQUIREMENTS["control-rackets"]).toEqual({
      pickCount: 6,
      waivers: 0,
    });
    expect(BEST_IMAGE_REQUIREMENTS["defensive-rackets"]).toEqual({
      pickCount: 6,
      waivers: 0,
    });
    expect(BEST_IMAGE_REQUIREMENTS["head-light-rackets"]).toEqual({
      pickCount: 6,
      waivers: 1,
    });
    expect(BEST_IMAGE_REQUIREMENTS["rackets-for-shoulder-comfort"]).toEqual({
      pickCount: 6,
      waivers: 1,
    });
    expect(BEST_IMAGE_REQUIREMENTS["wide-feet-badminton-shoes"]).toEqual({
      pickCount: 6,
      waivers: 1,
    });
    expect(BEST_IMAGE_REQUIREMENTS["budget-badminton-shoes"]).toEqual({
      pickCount: 6,
      waivers: 4,
    });
    expect(BEST_IMAGE_REQUIREMENTS["lightweight-rackets-5u"]).toEqual({
      pickCount: 6,
      waivers: 5,
    });
    expect(BEST_IMAGE_REQUIREMENTS["head-heavy-rackets-under-150"]).toEqual({
      pickCount: 6,
      waivers: 2,
    });
    expect(BEST_IMAGE_REQUIREMENTS["rackets-under-100"]).toEqual({
      pickCount: 6,
      waivers: 3,
    });
    expect(BEST_IMAGE_REQUIREMENTS.grips).toEqual({
      pickCount: 7,
      waivers: 3,
    });
    expect(BEST_IMAGE_REQUIREMENTS.bags).toEqual({
      pickCount: 2,
      waivers: 1,
    });
    expect(Object.keys(BEST_IMAGE_REQUIREMENTS)).toHaveLength(20);
  });

  it("passes verified-image guard for commercial /best/* landings", () => {
    const result = evaluateBestImageCoverage();
    if (!result.ok) {
      console.error(formatBestImageCoverageIssues(result.issues));
    }
    expect(result.ok).toBe(true);
  });

  it("documents Nanoray Light 70i waiver on four landings", () => {
    const nanoray = BEST_IMAGE_WAIVERS.filter(
      (w) => w.pickName === "Nanoray Light 70i"
    );
    expect(nanoray).toHaveLength(4);
    expect(nanoray.map((w) => w.slug).sort()).toEqual(
      [
        "head-light-rackets",
        "lightweight-rackets-5u",
        "rackets-for-shoulder-comfort",
        "rackets-under-100",
      ].sort()
    );
  });

  it("documents Bonny Future Land 3 waiver on wide-feet shoes landing", () => {
    expect(
      BEST_IMAGE_WAIVERS.some(
        (w) =>
          w.slug === "wide-feet-badminton-shoes" &&
          w.pickName.includes("Future Land 3")
      )
    ).toBe(true);
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
