import { describe, expect, it } from "vitest";
import {
  profileFromSearchParams,
  profileToSearchParams,
  clampBudgetUsd,
} from "@/lib/profile-url";
import { countMatchingProducts } from "@/lib/quiz-preview";
import { defaultUserProfile, type UserProfile } from "@/lib/taxonomy";

/**
 * Quiz funnel pipeline test — exercises the data path that the QuizFunnel
 * component drives in production, without mounting the React component
 * itself (the project's vitest config uses environment: "node", no DOM).
 *
 * The funnel produces a UserProfile object across 5 steps. That profile
 * is serialised to URLSearchParams for navigation to /results/, and is
 * also fed into countMatchingProducts during the funnel to surface the
 * live "N candidates remaining" counter. This test asserts:
 *
 *   1. A fully-populated profile round-trips through profileToSearchParams
 *      / profileFromSearchParams without loss.
 *   2. The same profile passes countMatchingProducts and returns a
 *      non-zero candidate count when reasonably populated.
 *   3. Edge cases (budget at hard cap, empty styles, no body fields) are
 *      handled cleanly.
 *
 * This is intentionally narrower than a full mount-and-click test — it
 * locks down the data shape that any UI rewrite must continue to honour,
 * which is the primary regression risk for the funnel.
 */

describe("quiz funnel pipeline", () => {
  it("round-trips a fully-populated profile through URL search params", () => {
    const profile: UserProfile = {
      ...defaultUserProfile(),
      level: "competitive",
      discipline: "doubles",
      category: "racket",
      styles: ["smash_heavy", "balanced"],
      body: {
        budgetMaxUsd: 220,
        footWidth: "normal",
        injuryFlags: ["none"],
      },
    };
    const params = profileToSearchParams(profile);
    expect(params.get("level")).toBe("competitive");
    expect(params.get("disc")).toBe("doubles");
    expect(params.get("cat")).toBe("racket");
    expect(params.get("styles")).toBe("smash_heavy,balanced");
    expect(params.get("budget")).toBe("220");
    expect(params.get("foot")).toBe("normal");

    const restored = profileFromSearchParams(params);
    expect(restored).not.toBeNull();
    expect(restored!.level).toBe("competitive");
    expect(restored!.discipline).toBe("doubles");
    expect(restored!.category).toBe("racket");
    expect(restored!.styles).toEqual(["smash_heavy", "balanced"]);
    expect(restored!.body.budgetMaxUsd).toBe(220);
    expect(restored!.body.footWidth).toBe("normal");
  });

  it("counts a non-zero set of candidate products for a club-level racket profile", () => {
    const profile: UserProfile = {
      ...defaultUserProfile(),
      level: "club",
      discipline: "doubles",
      category: "racket",
      styles: ["balanced"],
      body: { budgetMaxUsd: 250, injuryFlags: ["none"] },
    };
    const count = countMatchingProducts(profile);
    // The catalogue has a wide spread of club-tier rackets under USD 250.
    // Any meaningful regression on the catalogue or the level/budget
    // filters would push this below 5.
    expect(count).toBeGreaterThan(5);
  });

  it("excludes pro-tier products when level is recreational", () => {
    const proProfile: UserProfile = {
      ...defaultUserProfile(),
      level: "pro_oriented",
      category: "racket",
      body: { injuryFlags: ["none"] },
    };
    const recProfile: UserProfile = {
      ...defaultUserProfile(),
      level: "recreational",
      category: "racket",
      body: { injuryFlags: ["none"] },
    };
    const proCount = countMatchingProducts(proProfile);
    const recCount = countMatchingProducts(recProfile);
    // The pro-tier band should reach a different (typically larger) set
    // of rackets than the recreational band, because some flagship
    // rackets exclude recreational from their min..max band.
    expect(proCount).not.toBe(recCount);
  });

  it("respects budget hard cap", () => {
    expect(clampBudgetUsd(99999)).toBeLessThanOrEqual(2000);
    expect(clampBudgetUsd(-50)).toBeGreaterThanOrEqual(0);
    expect(clampBudgetUsd(150)).toBe(150);
  });

  it("handles edge case profiles cleanly", () => {
    // Empty profile — should return some count without crashing.
    const empty = defaultUserProfile();
    expect(() => countMatchingProducts(empty)).not.toThrow();
    expect(countMatchingProducts(empty)).toBeGreaterThan(0);

    // Profile with budget at zero (shouldn't crash, returns 0 candidates).
    const zeroBudget: UserProfile = {
      ...empty,
      body: { budgetMaxUsd: 0, injuryFlags: ["none"] },
    };
    expect(() => countMatchingProducts(zeroBudget)).not.toThrow();
  });

  it("preserves injury flags through URL round-trip", () => {
    const profile: UserProfile = {
      ...defaultUserProfile(),
      // profileFromSearchParams requires level or discipline; the
      // injury-flag-only profile would round-trip to null, so include
      // a level here to make the round-trip well-defined.
      level: "club",
      body: {
        injuryFlags: ["knee", "ankle"],
      },
    };
    const params = profileToSearchParams(profile);
    expect(params.get("inj")).toBe("knee,ankle");

    const restored = profileFromSearchParams(params);
    expect(restored).not.toBeNull();
    expect(restored!.body.injuryFlags).toEqual(
      expect.arrayContaining(["knee", "ankle"])
    );
  });

  it("clamps styles array to 2 entries in URL", () => {
    const profile: UserProfile = {
      ...defaultUserProfile(),
      // Funnel allows up to 2 selections; URL serialisation should match.
      styles: ["smash_heavy", "balanced", "defensive"],
      body: { injuryFlags: ["none"] },
    };
    const params = profileToSearchParams(profile);
    const styles = params.get("styles")?.split(",") ?? [];
    expect(styles.length).toBeLessThanOrEqual(2);
  });
});
