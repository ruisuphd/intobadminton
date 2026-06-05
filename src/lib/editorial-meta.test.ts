import { describe, expect, it } from "vitest";
import { blogArticles } from "@/lib/blog";
import {
  editorialMetaByPath,
  getEditorialMeta,
  lastModifiedForRoute,
} from "@/lib/editorial-meta";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("editorialMetaByPath registry", () => {
  it("covers every best-pick roundup with a price-check date", () => {
    const expected = [
      "/best/beginner-rackets/",
      "/best/intermediate-rackets/",
      "/best/doubles-rackets/",
      "/best/smash-heavy-rackets/",
      "/best/rackets-under-100/",
      "/best/rackets-under-150/",
      "/best/lightweight-rackets-5u/",
      "/best/rackets-for-shoulder-comfort/",
      "/best/control-rackets/",
      "/best/singles-rackets/",
      "/best/head-light-rackets/",
      "/best/wide-feet-badminton-shoes/",
      "/best/all-round-rackets/",
      "/best/rackets-under-200/",
      "/best/budget-badminton-shoes/",
      "/best/head-heavy-rackets-under-150/",
      "/best/shoes/",
      "/best/strings/",
    ];
    for (const path of expected) {
      const meta = editorialMetaByPath[path];
      expect(meta, `missing meta for ${path}`).toBeDefined();
      expect(meta.lastReviewedAt).toMatch(ISO_DATE);
      expect(meta.priceCheckedAt).toMatch(ISO_DATE);
    }
  });

  it("covers all three brand pages without price-check (brands have no prices)", () => {
    const expected = [
      "/brands/yonex/",
      "/brands/victor/",
      "/brands/li-ning/",
    ];
    for (const path of expected) {
      const meta = editorialMetaByPath[path];
      expect(meta, `missing meta for ${path}`).toBeDefined();
      expect(meta.lastReviewedAt).toMatch(ISO_DATE);
      expect(meta.priceCheckedAt).toBeUndefined();
    }
  });

  it("covers every compare-guide and every long-form guide", () => {
    const expected = [
      "/compare-guides/astrox-77-pro-vs-88s-pro/",
      "/compare-guides/yonex-astrox-vs-nanoflare/",
      "/compare-guides/yonex-victor-li-ning/",
      "/compare-guides/badminton-vs-tennis-shoes/",
      "/guides/racket-balance/",
      "/guides/string-tension/",
      "/guides/string-feel-vs-durability/",
      "/guides/shoes-footwork/",
      "/guides/wide-feet-badminton-shoes/",
      "/guides/doubles-roles/",
      "/guides/badminton-shoes-vs-running-shoes/",
      "/guides/doubles-positioning-and-rackets/",
      "/guides/equipment-authenticity/",
      "/guides/glossary/",
      "/guides/season-refresh/",
    ];
    for (const path of expected) {
      const meta = editorialMetaByPath[path];
      expect(meta, `missing meta for ${path}`).toBeDefined();
      expect(meta.lastReviewedAt).toMatch(ISO_DATE);
    }
  });

  it("never publishes a future review date on this build", () => {
    // Today's clock is whatever the test runner thinks. We only check the
    // dates are not absurd (e.g. a year ahead of UTC now).
    const horizon = new Date();
    horizon.setUTCFullYear(horizon.getUTCFullYear() + 1);
    for (const [path, meta] of Object.entries(editorialMetaByPath)) {
      const reviewed = new Date(meta.lastReviewedAt);
      expect(
        reviewed.getTime(),
        `${path} lastReviewedAt is more than a year ahead`
      ).toBeLessThan(horizon.getTime());
    }
  });
});

describe("getEditorialMeta", () => {
  it("resolves static paths from the registry", () => {
    expect(getEditorialMeta("/best/beginner-rackets/")).toMatchObject({
      lastReviewedAt: expect.stringMatching(ISO_DATE),
      priceCheckedAt: expect.stringMatching(ISO_DATE),
    });
  });

  it("resolves review routes by article updatedAt", () => {
    const sample = blogArticles.en[0];
    expect(getEditorialMeta(`/review/${sample.slug}/`)).toEqual({
      lastReviewedAt: sample.updatedAt,
    });
  });

  it("returns undefined for unknown routes", () => {
    expect(getEditorialMeta("/totally-not-a-page/")).toBeUndefined();
    expect(getEditorialMeta("/blog/this-slug-does-not-exist/")).toBeUndefined();
  });
});

describe("getEditorialMeta product pages", () => {
  it("uses lastVerifiedAt from the catalogue row", () => {
    const meta = getEditorialMeta("/product/yy-grpht-thrttl/");
    expect(meta?.lastReviewedAt).toMatch(ISO_DATE);
  });
});

describe("lastModifiedForRoute", () => {
  it("matches the visible lastReviewedAt", () => {
    expect(lastModifiedForRoute("/best/beginner-rackets/")).toBe(
      editorialMetaByPath["/best/beginner-rackets/"].lastReviewedAt
    );
  });

  it("returns undefined for routes without metadata", () => {
    expect(lastModifiedForRoute("/totally-not-a-page/")).toBeUndefined();
  });

  it("returns hub freshness for primary navigation routes", () => {
    expect(lastModifiedForRoute("/quiz/")).toBe("2026-05-24");
    expect(lastModifiedForRoute("/review/")).toBe("2026-05-24");
  });
});
