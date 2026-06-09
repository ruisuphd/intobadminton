import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  evaluateCompareShareBaseline,
  evaluateCompareShareBaselineQuery,
  formatCompareShareBaselineIssues,
  sharePathForCompareQuery,
  validateCompareShareBaselineFile,
} from "@/lib/compare-baseline";
import { validateFinderBaselineFile } from "@/lib/finder-baseline";
import { byId, scoreProductCatalog } from "@/lib/scoring";

const FINDER_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/finder-profile-queries.json"
);
const COMPARE_BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/compare-share-queries.json"
);

describe("compare-baseline", () => {
  it("validates committed compare-share JSON structure", () => {
    const raw = JSON.parse(readFileSync(COMPARE_BASELINE_PATH, "utf8"));
    const parsed = validateCompareShareBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("passes all committed compare share URLs against live catalog", () => {
    const finderRaw = JSON.parse(readFileSync(FINDER_BASELINE_PATH, "utf8"));
    const finderParsed = validateFinderBaselineFile(finderRaw);
    expect(finderParsed.ok).toBe(true);
    if (!finderParsed.ok) return;

    const raw = JSON.parse(readFileSync(COMPARE_BASELINE_PATH, "utf8"));
    const parsed = validateCompareShareBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateCompareShareBaseline(
      parsed.file,
      finderParsed.file,
      (id) => byId(id),
      (profile) => scoreProductCatalog(profile)
    );
    if (!result.ok) {
      console.error(formatCompareShareBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects rows without product id source", () => {
    const parsed = validateCompareShareBaselineFile({
      version: 1,
      queries: [{ id: "orphan" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags id drift after URL round-trip", () => {
    const issue = evaluateCompareShareBaselineQuery(
      {
        id: "test",
        productIds: ["yy-astrox-100zz", "yy-nanoflare-1000z"],
        sharePath: "/compare/?p=yy-nanoflare-1000z,yy-astrox-100zz",
      },
      ["yy-astrox-100zz", "yy-nanoflare-1000z"],
      () => undefined
    );
    expect(issue?.message).toContain("changed ids");
  });

  it("builds share paths for e2e rows", () => {
    const finderRaw = JSON.parse(readFileSync(FINDER_BASELINE_PATH, "utf8"));
    const finderParsed = validateFinderBaselineFile(finderRaw);
    expect(finderParsed.ok).toBe(true);
    if (!finderParsed.ok) return;

    const raw = JSON.parse(readFileSync(COMPARE_BASELINE_PATH, "utf8"));
    const parsed = validateCompareShareBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    for (const row of parsed.file.queries.filter((q) => q.e2e)) {
      const path = sharePathForCompareQuery(
        row,
        finderParsed.file,
        (id) => byId(id),
        (profile) => scoreProductCatalog(profile)
      );
      expect(path).toMatch(/^\/compare\/\?p=/);
    }
  });

  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 4 },
      [{ e2e: true }],
      "compare-share"
    );
    expect(issue?.message).toContain("minE2eGuards");
  });

  it("commits minE2eGuards on golden-profile coverage", () => {
    const raw = JSON.parse(readFileSync(COMPARE_BASELINE_PATH, "utf8"));
    const parsed = validateCompareShareBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.coverage?.minE2eGuards).toBe(4);
    }
  });
});
