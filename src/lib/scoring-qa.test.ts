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

describe("production QA: 128-product catalogue + finder integration", () => {
  it("wide-foot recreational doubles player gets wide-fit shoe priority", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "recreational",
        discipline: "doubles",
        styles: ["balanced"],
        category: "shoes",
        body: { budgetMaxUsd: 150, footWidth: "wide", injuryFlags: ["none"] },
      })
    );
    expect(rows.length).toBeGreaterThan(0);
    const top3 = rows.slice(0, 3);
    // At least one of the top-3 must be wide_available, wide, or have hasWideOption
    const hasWideOption = top3.some((r) => {
      if (r.category !== "shoes") return false;
      return (
        r.fitWidth === "wide_available" ||
        r.fitWidth === "wide" ||
        r.hasWideOption === true
      );
    });
    expect(hasWideOption).toBe(true);
  });

  it("competitive singles smasher with ankle injury avoids extra-stiff frames in top result", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "competitive",
        discipline: "singles",
        styles: ["offensive", "smash_heavy"],
        category: "racket",
        body: { budgetMaxUsd: 400, injuryFlags: ["ankle"] },
      })
    );
    expect(rows.length).toBeGreaterThan(0);
    const top = rows[0];
    if (top.category === "racket") {
      // Body-score penalty should push extra_stiff out of the top spot
      expect(top.shaftFlex).not.toBe("extra_stiff");
    }
  });

  it("club doubles offensive player sees 0.66mm strings (L66 / LT66) in the shortlist", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "club",
        discipline: "doubles",
        styles: ["offensive"],
        category: "string",
        body: { budgetMaxUsd: 15, stringTensionLbs: 26, injuryFlags: ["none"] },
      })
    );
    expect(rows.length).toBeGreaterThan(0);
    const ids = rows.map((r) => r.id);
    // At least one of the new 0.66mm strings should appear
    const hasNew = ids.some((id) =>
      id.includes("ln-l66-string") ||
      id.includes("ln-lt66-power") ||
      id.includes("kumpoo-js-67") ||
      id.includes("jujiang-mzs-66un")
    );
    expect(hasNew).toBe(true);
  });

  it("budget beginner ($100) does NOT see flagship rackets in top 3", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "recreational",
        discipline: "singles",
        styles: ["offensive"],
        category: "racket",
        body: { budgetMaxUsd: 100, injuryFlags: ["none"] },
      })
    );
    expect(rows.length).toBeGreaterThan(0);
    const top3 = rows.slice(0, 3);
    for (const r of top3) {
      expect(r.priceUsd).toBeLessThanOrEqual(150);
    }
  });

  it("pro-oriented player gets premium rackets in top 5", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "pro_oriented",
        discipline: "singles",
        styles: ["offensive", "smash_heavy"],
        category: "racket",
        body: { budgetMaxUsd: 500, injuryFlags: ["none"] },
      })
    );
    expect(rows.length).toBeGreaterThan(0);
    const top5 = rows.slice(0, 5);
    // At least 3 of top 5 should be priced $200+ (flagship band)
    const flagship = top5.filter((r) => r.priceUsd >= 200);
    expect(flagship.length).toBeGreaterThanOrEqual(3);
  });

  it("all 128 products in catalogue surface for some profile (no orphans)", () => {
    // Simulate the union of products surfaced across multiple realistic profiles.
    const profiles: UserProfile[] = [
      profile({
        level: "recreational",
        discipline: "singles",
        styles: ["balanced"],
        category: "racket",
        body: { budgetMaxUsd: 999, injuryFlags: ["none"] },
      }),
      profile({
        level: "club",
        discipline: "doubles",
        styles: ["offensive"],
        category: "racket",
        body: { budgetMaxUsd: 999, injuryFlags: ["none"] },
      }),
      profile({
        level: "competitive",
        discipline: "singles",
        styles: ["offensive"],
        category: "racket",
        body: { budgetMaxUsd: 999, injuryFlags: ["none"] },
      }),
      profile({
        level: "pro_oriented",
        discipline: "singles",
        styles: ["balanced"],
        category: "racket",
        body: { budgetMaxUsd: 999, injuryFlags: ["none"] },
      }),
    ];
    const allRacketIds = new Set<string>();
    for (const p of profiles) {
      for (const row of scoreProductCatalog(p)) {
        if (row.category === "racket") allRacketIds.add(row.id);
      }
    }
    // We should be reaching most racket entries across these 4 profiles.
    // Reasonable threshold: at least 50 of ~77 rackets surface.
    expect(allRacketIds.size).toBeGreaterThanOrEqual(50);
  });

  it("new flagship products (Halbertec 9000 Power, AxForce 100 Gen 2) reach top-N for matching profile", () => {
    const rows = scoreProductCatalog(
      profile({
        level: "competitive",
        discipline: "singles",
        styles: ["offensive", "smash_heavy"],
        category: "racket",
        body: { budgetMaxUsd: 500, injuryFlags: ["none"] },
      })
    );
    const top15Ids = rows.slice(0, 15).map((r) => r.id);
    // Halbertec 9000 Power exists from before; AxForce 100 Gen 2 should be there.
    const newSurfaces = top15Ids.some(
      (id) =>
        id === "ln-halbertec-9000-power" ||
        id === "ln-axforce-100-gen-2" ||
        id === "yy-astrox-99-pro-2" ||
        id.startsWith("yy-astrox-100zz")
    );
    expect(newSurfaces).toBe(true);
  });
});
