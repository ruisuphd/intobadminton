import { describe, expect, it } from "vitest";
import { scoreProductCatalog } from "@/lib/scoring";
import { defaultUserProfile, type UserProfile } from "@/lib/taxonomy";

function profile(p: Partial<UserProfile>): UserProfile {
  return {
    ...defaultUserProfile(),
    ...p,
    body: {
      ...defaultUserProfile().body,
      ...(p.body ?? {}),
    },
  };
}

describe("scoreProductCatalog", () => {
  it("keeps beginner/budget users away from pro-only rackets", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "recreational",
        discipline: "doubles",
        styles: ["balanced"],
        category: "racket",
        body: { budgetMaxUsd: 130, injuryFlags: ["none"] },
      })
    );

    expect(rows.length).toBeGreaterThan(0);
    expect(rows.slice(0, 3).map((r) => r.id)).not.toContain("yy-astrox-100zz");
    expect(rows[0]?.priceUsd).toBeLessThanOrEqual(130);
  });

  it("prioritizes fast head-light frames for competitive doubles defense", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "competitive",
        discipline: "doubles",
        styles: ["defensive", "front_court"],
        category: "racket",
        body: { budgetMaxUsd: 320, injuryFlags: ["none"] },
      })
    );

    expect(rows.slice(0, 3).some((r) => r.headWeight === "head_light")).toBe(
      true
    );
    expect(rows[0]?.reasons.some((r) => r.code.includes("DOUBLES"))).toBe(true);
  });

  it("prioritizes power frames for competitive smash-heavy singles", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "competitive",
        discipline: "singles",
        styles: ["offensive", "smash_heavy"],
        category: "racket",
        body: { budgetMaxUsd: 350, injuryFlags: ["none"] },
      })
    );

    expect(rows[0]?.headWeight).toBe("head_heavy");
    expect(rows[0]?.reasons.some((r) => r.code.includes("OFFENSE"))).toBe(
      true
    );
  });

  it("penalizes extra-stiff frames for players with joint comfort flags", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "competitive",
        discipline: "singles",
        styles: ["offensive", "smash_heavy"],
        category: "racket",
        body: { budgetMaxUsd: 350, injuryFlags: ["knee"] },
      })
    );

    expect(rows[0]?.shaftFlex).not.toBe("extra_stiff");
  });

  it("returns no equipment for categories that are not live yet", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "doubles",
        styles: ["balanced"],
        category: "shoes",
      })
    );

    expect(rows).toEqual([]);
  });
});
