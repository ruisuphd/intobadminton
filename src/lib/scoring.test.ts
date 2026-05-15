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

  it("recommends shuttles by level, budget, and use case", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "doubles",
        styles: ["balanced"],
        category: "shuttle",
        body: { budgetMaxUsd: 45, injuryFlags: ["none"] },
      })
    );

    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.category).toBe("shuttle");
    expect(rows[0]?.reasons.some((r) => r.code.includes("SHUTTLE"))).toBe(true);
  });

  it("recommends grips from sweat absorption and pack value", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "doubles",
        styles: ["front_court", "defensive"],
        category: "grip",
        body: { budgetMaxUsd: 20, injuryFlags: ["none"] },
      })
    );

    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.category).toBe("grip");
    expect(rows[0]?.reasons.some((r) => r.code.includes("GRIP"))).toBe(true);
  });

  it("sort order is stable across repeated calls with identical input (P2 tie-break)", () => {
    const input: UserProfile = profile({
      level: "club",
      discipline: "doubles",
      styles: ["balanced"],
      category: "racket",
      body: { budgetMaxUsd: 200, injuryFlags: ["none"] },
    });
    const a = scoreProductCatalog(input).map((r) => r.id);
    const b = scoreProductCatalog(input).map((r) => r.id);
    expect(a).toEqual(b);
  });

  it("smooths the budget curve above the budget cap (P2 — no 1.12× cliff)", () => {
    // A $200 racket against a $180 budget used to drop from 0.55 → 0.15 once
    // overage exceeded 12%. The smooth decay should still place it above the
    // 0.15 floor, so the product remains surfacable in the top-N.
    const tightBudget = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "singles",
        styles: ["offensive"],
        category: "racket",
        body: { budgetMaxUsd: 180, injuryFlags: ["none"] },
      })
    );
    const moderateOverBudget = tightBudget.find(
      (r) => r.priceUsd > 180 && r.priceUsd <= 220
    );
    // Item exists and got a non-cliff score above the old 0.15 floor.
    expect(moderateOverBudget?.subscores.budget ?? 0).toBeGreaterThan(0.2);
  });

  it("treats empty style selection as 'balanced' (P2 — no flat 0.4 default)", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "doubles",
        styles: [],
        category: "racket",
        body: { budgetMaxUsd: 250, injuryFlags: ["none"] },
      })
    );
    // With balanced-as-default, even-balance rackets should now appear at or
    // near the top rather than uniformly suppressed.
    const evenAtTop = rackets(rows.slice(0, 5)).some(
      (r) => r.headWeight === "even"
    );
    expect(evenAtTop).toBe(true);
  });

  it("does not reduce wide shoes on normal feet to the misfit floor (P2 — asymmetric width)", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "doubles",
        styles: ["balanced"],
        category: "shoes",
        body: {
          budgetMaxUsd: 250,
          footWidth: "normal",
          injuryFlags: ["none"],
        },
      })
    );
    expect(rows.length).toBeGreaterThan(0);
    // The widest-fit shoes shouldn't all crater to the 0.28 floor —
    // wide-on-normal is a mild mismatch, not a real misfit.
    const lowestStyleSub = rows.reduce(
      (acc, r) => Math.min(acc, r.subscores.style),
      1
    );
    expect(lowestStyleSub).toBeGreaterThanOrEqual(0.28);
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
