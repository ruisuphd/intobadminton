import { describe, expect, it } from "vitest";
import {
  BUDGET_HARD_CAP_USD,
  clampBudgetUsd,
  parseTopN,
  profileFromSearchParams,
  profileToResultsPath,
  profileToSearchParams,
  resultsPathForProfile,
} from "@/lib/profile-url";
import { defaultUserProfile } from "@/lib/taxonomy";

describe("profile-url round trip", () => {
  it("returns null when neither level nor discipline is in the URL", () => {
    expect(profileFromSearchParams(new URLSearchParams())).toBeNull();
    expect(
      profileFromSearchParams(new URLSearchParams("budget=200"))
    ).toBeNull();
  });

  it("parses a complete profile from the URL", () => {
    const params = new URLSearchParams(
      "level=club&disc=doubles&styles=offensive,smash_heavy&cat=racket&budget=250&weight=78&foot=normal&tension=26&inj=knee,ankle"
    );
    const profile = profileFromSearchParams(params);
    expect(profile?.level).toBe("club");
    expect(profile?.discipline).toBe("doubles");
    expect(profile?.styles).toEqual(["offensive", "smash_heavy"]);
    expect(profile?.category).toBe("racket");
    expect(profile?.body.budgetMaxUsd).toBe(250);
    expect(profile?.body.weightKg).toBe(78);
    expect(profile?.body.footWidth).toBe("normal");
    expect(profile?.body.stringTensionLbs).toBe(26);
    expect(profile?.body.injuryFlags).toEqual(["knee", "ankle"]);
  });

  it("survives a serialise -> deserialise round trip", () => {
    const original = {
      ...defaultUserProfile(),
      level: "competitive" as const,
      discipline: "doubles" as const,
      styles: ["defensive", "front_court"] as const,
      category: "racket" as const,
      body: {
        ...defaultUserProfile().body,
        budgetMaxUsd: 320,
        weightKg: 82,
        footWidth: "wide" as const,
        stringTensionLbs: 27,
        injuryFlags: ["knee"] as const,
      },
    };
    const params = profileToSearchParams({
      ...original,
      styles: [...original.styles],
      body: { ...original.body, injuryFlags: [...original.body.injuryFlags] },
    });
    const restored = profileFromSearchParams(new URLSearchParams(params.toString()));
    expect(restored?.level).toBe(original.level);
    expect(restored?.discipline).toBe(original.discipline);
    expect(restored?.styles).toEqual(original.styles);
    expect(restored?.body.budgetMaxUsd).toBe(original.body.budgetMaxUsd);
    expect(restored?.body.footWidth).toBe(original.body.footWidth);
    expect(restored?.body.injuryFlags).toEqual(original.body.injuryFlags);
  });

  it("clamps out-of-range numeric values", () => {
    const profile = profileFromSearchParams(
      new URLSearchParams("level=club&disc=doubles&budget=999999&weight=5&tension=99")
    );
    expect(profile?.body.budgetMaxUsd).toBe(BUDGET_HARD_CAP_USD);
    // weight 5 is below the min (20), so it should be clamped to 20.
    expect(profile?.body.weightKg).toBe(20);
    // tension 99 is above max (40), clamps to 40.
    expect(profile?.body.stringTensionLbs).toBe(40);
  });

  it("rejects unknown enum values silently", () => {
    const profile = profileFromSearchParams(
      new URLSearchParams("level=club&disc=doubles&styles=lol,offensive&cat=spaceship")
    );
    expect(profile?.styles).toEqual(["offensive"]);
    expect(profile?.category).toBe("racket"); // fallback
  });

  it("parseTopN accepts only the allowed values", () => {
    expect(parseTopN(null)).toBe(8);
    expect(parseTopN("4")).toBe(4);
    expect(parseTopN("12")).toBe(12);
    expect(parseTopN("20")).toBe(20);
    expect(parseTopN("5")).toBe(8);
    expect(parseTopN("not-a-number")).toBe(8);
  });

  it("profileToResultsPath serialises level and discipline", () => {
    const path = profileToResultsPath({
      ...defaultUserProfile(),
      level: "club",
      discipline: "doubles",
    });
    expect(path).toMatch(/^\/results\/\?/);
    expect(path).toContain("level=club");
    expect(path).toContain("disc=doubles");
  });

  it("clampBudgetUsd applies the hard cap", () => {
    expect(clampBudgetUsd(50)).toBe(50);
    expect(clampBudgetUsd(-5)).toBe(0);
    expect(clampBudgetUsd(BUDGET_HARD_CAP_USD + 1000)).toBe(BUDGET_HARD_CAP_USD);
  });

  it("resultsPathForProfile builds a sharable results URL", () => {
    const profile = {
      ...defaultUserProfile(),
      level: "club" as const,
      discipline: "doubles" as const,
    };
    const path = resultsPathForProfile(profile, 4);
    expect(path.startsWith("/results/?")).toBe(true);
    const params = new URLSearchParams(path.slice("/results/?".length));
    expect(params.get("level")).toBe("club");
    expect(params.get("disc")).toBe("doubles");
    expect(params.get("n")).toBe("4");
    expect(resultsPathForProfile(profile, 99)).toContain("n=8");
  });
});
