import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  GSC_CSV_HEADER,
  GSC_REGRESSION_TOLERANCE,
  compareGscSnapshots,
  parseGscCsv,
  primaryGscSnapshot,
  validateGscCsv,
} from "./gsc-baseline";

const GSC_TEMPLATE_PATH = resolve(
  process.cwd(),
  "docs/baselines/gsc-template.csv"
);

describe("gsc baseline template", () => {
  const template = readFileSync(GSC_TEMPLATE_PATH, "utf8");

  it("ships with the documented header and empty sample row", () => {
    const lines = template.trim().split("\n");
    expect(lines[0]).toBe(GSC_CSV_HEADER);
    expect(lines.length).toBe(2);
    expect(lines[1].split(",").every((cell) => cell.trim() === "")).toBe(true);
  });

  it("committed gsc-template.csv passes structural validation", () => {
    const result = validateGscCsv(template);
    if (!result.ok) {
      throw new Error(result.issues.map((i) => i.message).join("\n"));
    }
    expect(result.hasFieldData).toBe(false);
  });

  it("accepts good field data from a Search Console export", () => {
    const sample = `${GSC_CSV_HEADER}
2026-05-08,2026-06-04,42,1200,3.5,18.2,28d summary
`;
    const result = validateGscCsv(sample);
    expect(result.ok).toBe(true);
    expect(result.hasFieldData).toBe(true);
  });

  it("rejects partial metric rows", () => {
    const sample = `${GSC_CSV_HEADER}
2026-05-08,2026-06-04,42,1200,,18.2,
`;
    const result = validateGscCsv(sample);
    expect(result.ok).toBe(false);
    expect(result.issues.some((i) => i.message.includes("together"))).toBe(true);
  });

  it("flags ctr that does not match clicks/impressions", () => {
    const sample = `${GSC_CSV_HEADER}
2026-05-08,2026-06-04,42,1200,9.9,18.2,
`;
    const result = validateGscCsv(sample);
    expect(result.ok).toBe(false);
    expect(result.issues.some((i) => i.message.includes("ctr"))).toBe(true);
  });

  it("extracts a primary snapshot for regression compare", () => {
    const sample = `${GSC_CSV_HEADER}
2026-05-08,2026-06-04,100,1000,10,12.5,
`;
    const { rows } = parseGscCsv(sample);
    const snapshot = primaryGscSnapshot(rows);
    expect(snapshot?.clicks).toBe(100);
    expect(snapshot?.ctr).toBe(0.1);
  });

  it("detects >10% clicks/impressions regression vs baseline", () => {
    const baseline = {
      date_range_start: "2026-04-01",
      date_range_end: "2026-04-28",
      clicks: 100,
      impressions: 1000,
      ctr: 0.1,
      position: 12,
      note: "",
    };
    const current = {
      ...baseline,
      clicks: 80,
      impressions: 850,
    };
    const issues = compareGscSnapshots(baseline, current);
    expect(issues.some((i) => i.metric === "clicks")).toBe(true);
    expect(issues.some((i) => i.metric === "impressions")).toBe(true);
  });

  it("documents the regression tolerance", () => {
    expect(GSC_REGRESSION_TOLERANCE).toBe(0.1);
  });
});
