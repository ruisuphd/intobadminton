import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import blogReviewMap from "@/data/blog-review-product-map.json";
import products from "@/data/products.json";
import {
  evaluatePdpBaseline,
  evaluatePdpBaselineQuery,
  formatPdpBaselineIssues,
  reviewSlugForProductId,
  validatePdpBaselineFile,
} from "@/lib/pdp-baseline";
import { reviewProductById } from "@/lib/review-pages";
import type { ProductRecord } from "@/lib/types/product";

const BASELINE_PATH = resolve(
  process.cwd(),
  "docs/baselines/pdp-queries.json"
);

const catalog = products as ProductRecord[];
const map = blogReviewMap as Record<string, string>;

describe("pdp-baseline", () => {
  it("validates committed golden-profile JSON structure", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validatePdpBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.file.queries.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("passes all committed golden profiles against live catalogue", () => {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    const parsed = validatePdpBaselineFile(raw);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const result = evaluatePdpBaseline(
      parsed.file,
      (id) => reviewProductById(id) ?? catalog.find((p) => p.id === id),
      map
    );
    if (!result.ok) {
      console.error(formatPdpBaselineIssues(result));
    }
    expect(result.ok).toBe(true);
  });

  it("rejects baseline rows without productId", () => {
    const parsed = validatePdpBaselineFile({
      version: 1,
      queries: [{ id: "empty" }],
    });
    expect(parsed.ok).toBe(false);
  });

  it("flags product id mismatches", () => {
    const issue = evaluatePdpBaselineQuery(
      {
        id: "test",
        productId: "missing-product-id",
      },
      () => undefined,
      map
    );
    expect(issue?.message).toContain("not in catalogue");
  });

  it("flags review slug mismatches", () => {
    const issue = evaluatePdpBaselineQuery(
      {
        id: "test",
        productId: "yy-arcsaber-7-pro",
        expectReviewSlug: "wrong-slug",
      },
      (id) => reviewProductById(id),
      map
    );
    expect(issue?.message).toContain("review slug");
  });

  it("flags PDP-only products that become mapped", () => {
    const issue = evaluatePdpBaselineQuery(
      {
        id: "test",
        productId: "yy-ac102c",
        expectNoReviewSlug: true,
      },
      (id) => reviewProductById(id) ?? catalog.find((p) => p.id === id),
      { "some-review": "yy-ac102c" }
    );
    expect(issue?.message).toContain("must have no review map");
  });

  it("resolves reverse review slug from map", () => {
    expect(reviewSlugForProductId("yy-arcsaber-7-pro", map)).toBe(
      "yonex-arcsaber-7-pro-review"
    );
  });

  it("resolves sibling alias review slugs from map", () => {
    expect(reviewSlugForProductId("vic-thruster-ryuga-ii", map)).toBe(
      "victor-thruster-9900-curiosity-review"
    );
  });
});
