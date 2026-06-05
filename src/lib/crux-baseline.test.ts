import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CRUX_CSV_HEADER,
  CRUX_GOOD_THRESHOLDS,
  parseCruxCsv,
  validateCruxCsv,
} from "./crux-baseline";

const CRUX_TEMPLATE_PATH = resolve(
  process.cwd(),
  "docs/baselines/crux-template.csv"
);

describe("crux baseline", () => {
  const template = readFileSync(CRUX_TEMPLATE_PATH, "utf8");

  it("committed crux-template.csv passes structural validation", () => {
    const result = validateCruxCsv(template);
    if (!result.ok) {
      throw new Error(result.issues.map((i) => i.message).join("\n"));
    }
    expect(result.hasFieldData).toBe(false);
  });

  it("uses the documented CSV header", () => {
    const header = template.trim().split("\n")[0];
    expect(header).toBe(CRUX_CSV_HEADER);
  });

  it("lists only intobadminton.com URLs", () => {
    const { rows } = parseCruxCsv(template);
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      expect(row.url).toMatch(/^https:\/\/intobadminton\.com\//);
    }
  });

  it("flags CWV regressions when field data is present", () => {
    const sample = `${CRUX_CSV_HEADER}
https://intobadminton.com/,mobile,3000,150,0.05,
`;
    const result = validateCruxCsv(sample);
    expect(result.hasFieldData).toBe(true);
    expect(result.ok).toBe(false);
    expect(result.issues.some((i) => i.message.includes("LCP"))).toBe(true);
  });

  it("accepts good field data", () => {
    const sample = `${CRUX_CSV_HEADER}
https://intobadminton.com/,mobile,2000,100,0.05,PSI Jun 2026
`;
    const result = validateCruxCsv(sample);
    expect(result.ok).toBe(true);
    expect(result.hasFieldData).toBe(true);
  });

  it("rejects partial metric rows", () => {
    const sample = `${CRUX_CSV_HEADER}
https://intobadminton.com/,mobile,2000,,0.05,
`;
    const result = validateCruxCsv(sample);
    expect(result.ok).toBe(false);
    expect(result.issues.some((i) => i.message.includes("together"))).toBe(true);
  });

  it("documents Google good thresholds", () => {
    expect(CRUX_GOOD_THRESHOLDS.lcp_ms).toBe(2500);
    expect(CRUX_GOOD_THRESHOLDS.inp_ms).toBe(200);
    expect(CRUX_GOOD_THRESHOLDS.cls).toBe(0.1);
  });
});
