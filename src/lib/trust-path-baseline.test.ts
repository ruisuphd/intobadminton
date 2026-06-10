import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import {
  evaluateTrustPathBaseline,
  evaluateTrustPathBaselineQuery,
  formatTrustPathBaselineIssues,
  validateTrustPathBaselineFile,
} from "@/lib/trust-path-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/trust-path-queries.json"
);

describe("trust-path-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateTrustPathBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBe(14);
      expect(parsed.file.coverage?.minE2eGuards).toBe(14);
    }
  });

  it("passes all committed golden profiles", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateTrustPathBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateTrustPathBaseline(parsed.file);
    if (!result.ok) {
      console.error(formatTrustPathBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without path", () => {
    const parsed = validateTrustPathBaselineFile({
      version: 1,
      queries: [{ id: "empty", expectCatalogHref: "/catalog/" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags invalid path format", () => {
    const issue = evaluateTrustPathBaselineQuery({
      id: "test",
      path: "/about",
      expectCatalogHref: "/catalog/",
    });
    expect(issue?.message).toContain("must start and end with /");
  });

  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 4 },
      [{ e2e: true }],
      "trust-path"
    );
    expect(issue?.message).toContain("minE2eGuards");
  });
});
