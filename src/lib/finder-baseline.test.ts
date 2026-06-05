import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { scoreProductCatalog } from "@/lib/scoring";
import {
  evaluateFinderBaseline,
  evaluateFinderBaselineQuery,
  formatFinderBaselineIssues,
  profileFromBaseline,
  validateFinderBaselineFile,
} from "@/lib/finder-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/finder-profile-queries.json"
);

describe("finder-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateFinderBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("passes all committed golden profiles against live scoring engine", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateFinderBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateFinderBaseline(parsed.file, (profile) =>
      scoreProductCatalog(profile)
    );
    if (!result.ok) {
      console.error(formatFinderBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without expectations", () => {
    const parsed = validateFinderBaselineFile({
      version: 1,
      queries: [{ id: "empty", profile: { category: "racket" } }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags minResults violations", () => {
    const issue = evaluateFinderBaselineQuery(
      { id: "test", profile: { category: "racket" }, minResults: 2 },
      [{ id: "a", fitScore: 0.8, priceUsd: 100 } as never]
    );
    expect(issue?.message).toContain("at least 2");
  });

  it("flags maxTopNPriceUsd violations", () => {
    const issue = evaluateFinderBaselineQuery(
      {
        id: "test",
        profile: { category: "racket" },
        maxTopNPriceUsd: 100,
        topN: 2,
      },
      [
        { id: "cheap", fitScore: 0.8, priceUsd: 90, category: "racket" } as never,
        { id: "dear", fitScore: 0.75, priceUsd: 250, category: "racket" } as never,
      ]
    );
    expect(issue?.message).toContain("exceeds max");
  });

  it("builds profiles with default injury flags", () => {
    const profile = profileFromBaseline({ category: "racket", level: "club" });
    expect(profile.body.injuryFlags).toEqual(["none"]);
    expect(profile.level).toBe("club");
  });
});
