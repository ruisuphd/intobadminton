import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import { validateFinderBaselineFile } from "@/lib/finder-baseline";
import { scoreProductCatalog } from "@/lib/scoring";
import {
  evaluateResultsUrlBaseline,
  evaluateResultsUrlBaselineQuery,
  formatResultsUrlBaselineIssues,
  sharePathForResultsUrlQuery,
  validateResultsUrlBaselineFile,
} from "@/lib/results-url-baseline";
import { profileFromBaseline } from "@/lib/finder-baseline";

const FINDER_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/finder-profile-queries.json"
);
const RESULTS_URL_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/results-url-queries.json"
);

describe("results-url-baseline", () => {
  it("validates committed results-url JSON structure", () => {
    const raw = JSON.parse(readFileSync(RESULTS_URL_BASELINE_PATH, "utf8"));
    const parsed = validateResultsUrlBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("passes all committed share URLs against live scoring engine", () => {
    const finderRaw = JSON.parse(readFileSync(FINDER_BASELINE_PATH, "utf8"));
    const finderParsed = validateFinderBaselineFile(finderRaw);
    expect(finderParsed.ok).toBe(true);
    if (!finderParsed.ok) return;

    const raw = JSON.parse(readFileSync(RESULTS_URL_BASELINE_PATH, "utf8"));
    const parsed = validateResultsUrlBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateResultsUrlBaseline(
      parsed.file,
      finderParsed.file,
      (profile) => scoreProductCatalog(profile)
    );
    if (!result.ok) {
      console.error(formatResultsUrlBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects rows without profile reference", () => {
    const parsed = validateResultsUrlBaselineFile({
      version: 1,
      queries: [{ id: "orphan" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags top-product drift after URL round-trip", () => {
    const profile = profileFromBaseline({
      level: "club",
      discipline: "doubles",
      styles: ["balanced"],
      category: "racket",
    });
    const issue = evaluateResultsUrlBaselineQuery(
      {
        id: "test",
        sharePath: "/results/?level=recreational&disc=singles&cat=racket",
      },
      profile,
      undefined,
      (parsed) => {
        if (parsed.level === "club") {
          return [
            {
              id: "club-top",
              fitScore: 0.9,
              priceUsd: 100,
              category: "racket",
            } as never,
          ];
        }
        return [
          {
            id: "rec-top",
            fitScore: 0.85,
            priceUsd: 90,
            category: "racket",
          } as never,
        ];
      }
    );
    expect(issue?.message).toContain("changed top product");
  });

  it("builds share paths for e2e rows", () => {
    const finderRaw = JSON.parse(readFileSync(FINDER_BASELINE_PATH, "utf8"));
    const finderParsed = validateFinderBaselineFile(finderRaw);
    expect(finderParsed.ok).toBe(true);
    if (!finderParsed.ok) return;

    const raw = JSON.parse(readFileSync(RESULTS_URL_BASELINE_PATH, "utf8"));
    const parsed = validateResultsUrlBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    for (const row of parsed.file.queries.filter((q) => q.e2e)) {
      const path = sharePathForResultsUrlQuery(row, finderParsed.file);
      expect(path).toMatch(/^\/results\/\?/);
    }
  });

  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 4 },
      [{ e2e: true }],
      "results-url"
    );
    expect(issue?.message).toContain("minE2eGuards");
  });

  it("commits minE2eGuards on golden-profile coverage", () => {
    const raw = JSON.parse(readFileSync(RESULTS_URL_BASELINE_PATH, "utf8"));
    const parsed = validateResultsUrlBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.coverage?.minE2eGuards).toBe(4);
    }
  });
});
