import { describe, expect, it } from "vitest";
import { scoreProductCatalog } from "@/lib/scoring";
import { defaultUserProfile, type UserProfile } from "@/lib/taxonomy";
import type { ScoredProduct, ScoredRacket } from "@/lib/types/product";

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

function rackets(rows: ScoredProduct[]): ScoredRacket[] {
  return rows.filter(
    (r): r is ScoredRacket => r.category === "racket"
  );
}

describe("scoreProductCatalog", () => {
  it("attaches confidence signals from official specs and review evidence", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "competitive",
        discipline: "doubles",
        styles: ["defensive", "front_court"],
        category: "racket",
        body: { budgetMaxUsd: 320, injuryFlags: ["none"] },
      })
    );

    const withEvidence = rows.find((r) => r.id === "yy-nanoflare-1000z");

    expect(withEvidence?.confidence.level).toMatch(/^(medium|high)$/);
    expect(withEvidence?.evidenceProfile.officialSpec.status).toBe(
      "official_verified"
    );
    expect(
      withEvidence?.evidenceProfile.officialSpec.sourceAuthority.canVerifySpecs
    ).toBe(true);
    expect(withEvidence?.evidenceProfile.reviewEvidence.count).toBeGreaterThan(
      0
    );
    expect(
      withEvidence?.evidenceProfile.reviewEvidence.displayPolicy
    ).toBe("metadata_summary_link_only");
  });

  it("downgrades products that still need official verification", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "singles",
        styles: ["offensive", "smash_heavy"],
        category: "racket",
        body: { budgetMaxUsd: 230, injuryFlags: ["none"] },
      })
    );

    const needsReview = rows.find((r) => r.verificationStatus === "needs_review");
    const verified = rows.find(
      (r) => r.evidenceProfile.officialSpec.sourceAuthority.canVerifySpecs
    );

    expect(needsReview?.confidence.level).toBe("needs_verification");
    expect(needsReview?.fitScore).toBeLessThan(verified?.fitScore ?? 0);
  });

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

    const racketRows = rackets(rows);
    expect(
      racketRows.slice(0, 3).some((r) => r.headWeight === "head_light")
    ).toBe(true);
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

    const racketRows = rackets(rows);
    expect(racketRows[0]?.headWeight).toBe("head_heavy");
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

    expect(rackets(rows)[0]?.shaftFlex).not.toBe("extra_stiff");
  });

  it("recommends strings with tension and durability tradeoffs", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "doubles",
        styles: ["defensive", "front_court"],
        category: "string",
        body: { budgetMaxUsd: 25, stringTensionLbs: 25, injuryFlags: ["none"] },
      })
    );

    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.category).toBe("string");
    expect(rows[0]?.id).toMatch(/exbolt|bg80|bg65/);
    expect(rows[0]?.reasons.some((r) => r.code.includes("STRING"))).toBe(true);
  });

  it("recommends shoes by foot width and joint comfort flags", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "doubles",
        styles: ["balanced"],
        category: "shoes",
        body: {
          budgetMaxUsd: 180,
          footWidth: "wide",
          injuryFlags: ["ankle", "knee"],
        },
      })
    );

    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.category).toBe("shoes");
    expect(rows[0]?.reasons.some((r) => r.code.includes("SHOE"))).toBe(true);
    expect(rows[0]?.cons.join(" ")).toMatch(/fit|try|size/i);
  });

  it("recommends bags by capacity and wet/shoe compartment needs", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "recreational",
        discipline: "mixed",
        styles: ["balanced"],
        category: "bag",
        body: { budgetMaxUsd: 120, injuryFlags: ["none"] },
      })
    );

    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.category).toBe("bag");
    expect(rows[0]?.reasons.some((r) => r.code.includes("BAG"))).toBe(true);
  });

  it("attaches resale and depreciation estimates to scored gear", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "competitive",
        discipline: "doubles",
        styles: ["offensive", "smash_heavy"],
        category: "racket",
        body: { budgetMaxUsd: 350, injuryFlags: ["none"] },
      })
    );

    const resaleAware = rows.find((r) => r.id === "yy-astrox-88d-pro-2024");

    expect(resaleAware?.resale?.estimatedUsedUsd).toBeGreaterThan(0);
    expect(resaleAware?.resale?.depreciationPct).toBeGreaterThan(0);
    expect(resaleAware?.sourceChips.some((c) => c.type === "market_signal")).toBe(
      true
    );
  });
});
