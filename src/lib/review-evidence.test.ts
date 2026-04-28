import { describe, expect, it } from "vitest";
import {
  assertSafeEvidenceForDisplay,
  getAllEvidence,
  getEvidenceForProduct,
  getEvidenceSummary,
} from "@/lib/review-evidence";

describe("review evidence", () => {
  it("returns BadmintonCN search-reference evidence for supported products", () => {
    const rows = getEvidenceForProduct("yy-nanoflare-1000z");
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.sourceName).toContain("BadmintonCN");
  });

  it("keeps all seeded third-party evidence safe for metadata-only display", () => {
    expect(getAllEvidence().every(assertSafeEvidenceForDisplay)).toBe(true);
  });

  it("summarizes evidence counts and caution signals", () => {
    const summary = getEvidenceSummary("vic-thruster-ryuga-ii");
    expect(summary.count).toBeGreaterThanOrEqual(2);
    expect(summary.caution).toBeGreaterThanOrEqual(1);
  });
});
