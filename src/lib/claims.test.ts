import { describe, expect, it } from "vitest";
import {
  allClaims,
  claimFreshness,
  CLAIM_FRESHNESS_THRESHOLDS,
  getClaim,
} from "@/lib/claims";

describe("claims registry", () => {
  it("loads claims from content/claims.json", () => {
    const claims = allClaims();
    expect(claims.length).toBeGreaterThan(0);
    for (const claim of claims) {
      expect(claim.id).toMatch(/^[a-z0-9-]+$/);
      expect(claim.label.length).toBeGreaterThan(0);
      expect(claim.value.length).toBeGreaterThan(0);
      expect(claim.sourceTier).toBeGreaterThanOrEqual(1);
      expect(claim.sourceTier).toBeLessThanOrEqual(4);
      expect(claim.source.url).toMatch(/^https?:\/\//);
      expect(claim.source.accessedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(claim.source.quote.length).toBeGreaterThan(0);
      expect(Array.isArray(claim.usedOn)).toBe(true);
    }
  });

  it("BWF claims are tier 2 (standards body)", () => {
    const bwfClaims = allClaims().filter((c) => c.id.startsWith("bwf-"));
    expect(bwfClaims.length).toBeGreaterThan(0);
    for (const claim of bwfClaims) {
      expect(claim.sourceTier).toBe(2);
    }
  });

  it("derived-convention claims (weight bands, grip ladder) are tier 4 with editorialNote", () => {
    const conventionIds = [
      "weight-class-3u-g",
      "weight-class-4u-g",
      "weight-class-5u-g",
      "yonex-grip-g4-inches",
      "yonex-grip-g5-inches",
    ];
    for (const id of conventionIds) {
      const claim = getClaim(id);
      expect(claim, `${id} should exist`).toBeDefined();
      expect(claim!.sourceTier).toBe(4);
      // Verbatim `quote` is required and kept tight; editor synthesis lives
      // in `editorialNote` so the fact-check gate stays auditable.
      expect(claim!.source.editorialNote, `${id} should carry editorialNote`).toBeTruthy();
    }
  });

  it("getClaim resolves by id", () => {
    expect(getClaim("bwf-court-length-m")?.value).toBe("13.4");
    expect(getClaim("does-not-exist")).toBeUndefined();
  });

  it("claimFreshness flags stale claims by accessedAt date", () => {
    const today = new Date("2026-05-15T00:00:00Z");
    const recentClaim = {
      id: "test",
      label: "test",
      value: "test",
      sourceTier: 2 as const,
      source: {
        name: "test",
        url: "https://example.com",
        accessedAt: "2026-05-10",
        quote: "test",
      },
      usedOn: [],
    };
    expect(claimFreshness(recentClaim, today)).toBe("fresh");

    const warnClaim = { ...recentClaim, source: { ...recentClaim.source, accessedAt: "2025-09-01" } };
    expect(claimFreshness(warnClaim, today)).toBe("warn");

    const staleClaim = { ...recentClaim, source: { ...recentClaim.source, accessedAt: "2024-01-01" } };
    expect(claimFreshness(staleClaim, today)).toBe("stale");
  });

  it("exports freshness thresholds", () => {
    expect(CLAIM_FRESHNESS_THRESHOLDS.warnDays).toBe(180);
    expect(CLAIM_FRESHNESS_THRESHOLDS.failDays).toBe(365);
  });
});
