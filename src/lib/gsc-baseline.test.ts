import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const GSC_TEMPLATE_PATH = resolve(
  process.cwd(),
  "docs/baselines/gsc-template.csv"
);

const GSC_HEADER =
  "date_range_start,date_range_end,clicks,impressions,ctr,position,note";

describe("gsc baseline template", () => {
  it("ships with the documented header and empty sample row", () => {
    const lines = readFileSync(GSC_TEMPLATE_PATH, "utf8").trim().split("\n");
    expect(lines[0]).toBe(GSC_HEADER);
    expect(lines.length).toBe(2);
    expect(lines[1].split(",").every((cell) => cell.trim() === "")).toBe(true);
  });
});
