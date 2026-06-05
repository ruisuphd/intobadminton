import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  evaluateToolsBaseline,
  evaluateToolsBaselineQuery,
  formatToolsBaselineIssues,
  toolPathForSlug,
  validateToolsBaselineFile,
} from "@/lib/tools-baseline";
import { catalogHrefFromToolSlug } from "@/lib/catalog-url";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/tools-queries.json"
);

describe("tools-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateToolsBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateToolsBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateToolsBaseline(parsed.file);
    if (!result.ok) {
      console.error(formatToolsBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without slug", () => {
    const parsed = validateToolsBaselineFile({
      version: 1,
      queries: [{ id: "empty", expectCatalogHref: "/catalog/" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags catalog href mismatches", () => {
    const issue = evaluateToolsBaselineQuery({
      id: "test",
      slug: "string-tension-calculator",
      expectCatalogHref: "/catalog/?cat=shoes",
    });
    expect(issue?.message).toContain("catalog href");
  });

  it("builds canonical tool paths", () => {
    expect(toolPathForSlug("string-tension-calculator")).toBe(
      "/tools/string-tension-calculator/"
    );
  });

  it("matches live catalog href for string tension calculator", () => {
    expect(catalogHrefFromToolSlug("string-tension-calculator")).toBe(
      "/catalog/?cat=string"
    );
  });
});
