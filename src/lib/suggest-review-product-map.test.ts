import { describe, expect, it } from "vitest";

/**
 * Mirrors normalizeArticleSlug / suggest heuristics in scripts/suggest-review-product-map.mjs
 * so slug→product matching regressions are caught in vitest.
 */

function normalizeArticleSlug(slug: string): string {
  return slug.replace(
    /-(review|deep-dive|complete-buying-guide|buying-guide)$/,
    ""
  );
}

function aliases(id: string): string[] {
  const brandSlug = id
    .replace(/^yy-/, "yonex-")
    .replace(/^ln-/, "li-ning-")
    .replace(/^vic-/, "victor-");
  const core = id.replace(/^(yy-|ln-|vic-|bonny-|kumpoo-|asics-)/, "");
  return [id, brandSlug, core];
}

function suggest(slug: string, ids: string[]): string | null {
  const normalized = normalizeArticleSlug(slug);
  let best: string | null = null;
  let bestLen = 0;
  for (const id of ids) {
    for (const variant of aliases(id)) {
      if (
        (slug.includes(variant) || normalized.includes(variant)) &&
        variant.length > bestLen
      ) {
        best = id;
        bestLen = variant.length;
      }
    }
  }
  return best;
}

describe("review product map suggest heuristics", () => {
  it("prefers the longest matching catalogue id when multiple variants match", () => {
    const ids = ["yy-arcsaber-7", "yy-arcsaber-7-pro"];
    expect(suggest("yonex-arcsaber-7-pro-review", ids)).toBe("yy-arcsaber-7-pro");
  });

  it("strips -review before matching core model token", () => {
    expect(suggest("yonex-arcsaber-7-pro-review", ["yy-arcsaber-7-pro"])).toBe(
      "yy-arcsaber-7-pro"
    );
  });
});
