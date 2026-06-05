import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import products from "@/data/products.json";
import {
  bestPathForSlug,
  evaluateBestBaseline,
  evaluateBestBaselineQuery,
  formatBestBaselineIssues,
  validateBestBaselineFile,
} from "@/lib/best-baseline";
import { catalogHrefFromBestSlug } from "@/lib/catalog-url";
import { reviewProductById } from "@/lib/review-pages";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/best-queries.json"
);

const catalog = products as ProductRecord[];

describe("best-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateBestBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validateBestBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluateBestBaseline(
      parsed.file,
      (id) => reviewProductById(id) ?? catalog.find((p) => p.id === id)
    );
    if (!result.ok) {
      console.error(formatBestBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without slug", () => {
    const parsed = validateBestBaselineFile({
      version: 1,
      queries: [{ id: "empty", expectCatalogHref: "/catalog/" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags catalog href mismatches", () => {
    const issue = evaluateBestBaselineQuery(
      {
        id: "test",
        slug: "beginner-rackets",
        expectCatalogHref: "/catalog/?cat=shoes",
      },
      () => undefined
    );
    expect(issue?.message).toContain("catalog href");
  });

  it("flags missing product ids", () => {
    const issue = evaluateBestBaselineQuery(
      {
        id: "test",
        slug: "defensive-rackets",
        expectCatalogHref: catalogHrefFromBestSlug("defensive-rackets"),
        expectProductId: "missing-product-id",
      },
      () => undefined
    );
    expect(issue?.message).toContain("not in catalogue");
  });

  it("builds canonical best paths", () => {
    expect(bestPathForSlug("beginner-rackets")).toBe("/best/beginner-rackets/");
  });
});
