import { describe, expect, it } from "vitest";
import { catalogFitScore, isFinderProfileReady } from "@/lib/profile-ready";
import { referenceClubDoublesProfile } from "@/lib/reference-profile";
import { byId } from "@/lib/scoring";

describe("profile-ready", () => {
  it("requires level and discipline", () => {
    expect(isFinderProfileReady(referenceClubDoublesProfile("racket"))).toBe(
      true
    );
    expect(
      isFinderProfileReady({
        ...referenceClubDoublesProfile("racket"),
        level: null,
      })
    ).toBe(false);
  });

  it("scores catalog rows with category-aligned profile", () => {
    const profile = referenceClubDoublesProfile("racket");
    const racket = byId("yy-nanoflare-1000z");
    expect(racket).toBeDefined();
    expect(catalogFitScore(racket!, profile)).toBeGreaterThan(0);
  });
});
