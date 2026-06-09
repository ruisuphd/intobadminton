import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { searchSubmitHref } from "@/lib/search-submit-route";
import { searchSuggestions } from "@/lib/search-suggestions";
import { searchSite } from "@/lib/site-search";
import { evaluateBaselineE2eCoverage } from "@/lib/baseline-coverage";
import {
  evaluateSearchBaseline,
  evaluateSearchBaselineQuery,
  evaluateSearchBaselineSubmit,
  evaluateSearchBaselineSuggestions,
  formatSearchBaselineIssues,
  validateSearchBaselineFile,
} from "@/lib/search-baseline";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/site-search-queries.json"
);

describe("search-baseline", () => {
  it("validates committed golden-query JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateSearchBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(20);
    }
  });

  it("passes all committed golden queries against live search index", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateSearchBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateSearchBaseline(parsed.file, (query) =>
      searchSite(query)
    , {
      submitHrefFn: searchSubmitHref,
      suggestionsFn: (query) => searchSuggestions(query),
    });
    if (!result.ok) {
      console.error(formatSearchBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without expectations", () => {
    const parsed = validateSearchBaselineFile({
      version: 1,
      queries: [{ query: "test" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags minResults violations", () => {
    const issue = evaluateSearchBaselineQuery(
      { query: "foo", minResults: 1 },
      []
    );
    expect(issue?.message).toContain("at least 1");
  });

  it("flags expectTopHref mismatches", () => {
    const issue = evaluateSearchBaselineQuery(
      { query: "foo", expectTopHref: "/catalog/" },
      [{ title: "x", href: "/quiz/", kind: "tool", summary: "", keywords: [] }]
    );
    expect(issue?.message).toContain("/catalog/");
  });

  it("flags expectHrefContains mismatches", () => {
    const issue = evaluateSearchBaselineQuery(
      { query: "foo", expectHrefContains: "nanoflare" },
      [{ title: "x", href: "/quiz/", kind: "tool", summary: "", keywords: [] }]
    );
    expect(issue?.message).toContain("nanoflare");
  });

  it("accepts maxResults zero for nonsense queries", () => {
    const issue = evaluateSearchBaselineQuery(
      { query: "xyzzy", maxResults: 0 },
      []
    );
    expect(issue).toBeNull();
  });

  it("flags submit href mismatches", () => {
    const issue = evaluateSearchBaselineSubmit(
      { query: "ac102c", expectSubmitHrefContains: "/catalog/" },
      "/search/?q=ac102c"
    );
    expect(issue?.message).toContain("/catalog/");
  });

  it("flags suggestion kind mismatches", () => {
    const issue = evaluateSearchBaselineSuggestions(
      { query: "string tension", expectFirstSuggestionKind: "catalog" },
      [{ kind: "entry", entry: { title: "x", href: "/guides/string-tension/", kind: "guide", summary: "", keywords: [] } }]
    );
    expect(issue?.message).toContain("catalog");
  });

  it("enforces minE2eGuards coverage counter", () => {
    const issue = evaluateBaselineE2eCoverage(
      { minE2eGuards: 26 },
      [{ e2e: true }],
      "site-search"
    );
    expect(issue?.message).toContain("minE2eGuards");
  });
});
