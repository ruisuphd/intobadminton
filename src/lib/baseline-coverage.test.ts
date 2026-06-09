import { describe, expect, it } from "vitest";
import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";

describe("baseline-coverage", () => {
  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 44 },
      [{ e2e: true }],
      "catalog-racket"
    );
    expect(issue?.message).toContain("minE2eGuards");
    expect(issue?.message).toContain("catalog-racket");
  });

  it("passes when e2e count meets guard", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 2 },
      [{ e2e: true }, { e2e: true }],
      "commercial-shoe"
    );
    expect(issue).toBeNull();
  });
});
