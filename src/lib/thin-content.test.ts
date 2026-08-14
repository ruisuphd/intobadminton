import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import reviewProductMap from "@/data/blog-review-product-map.json";
import { blogArticles, blogSlugs } from "./blog";
import { homeFeaturedReviews } from "./home-featured";
import { sitemapEntries } from "./sitemap";
import {
  ORIGINAL_EDITORIAL_SLUGS,
  REVIEW_INDEX_MIN_BODY_WORDS,
  adsAllowedOnReview,
  consolidatedNoindexSlugs,
  indexableReviewSlugs,
  isFounderFirsthandSlug,
  isOriginalEditorialSlug,
  isThinContentNoindex,
  noindexReviewSlugs,
  passesOriginalityGate,
  reviewBodyWordCount,
} from "./thin-content";

const FORUM_VOICE =
  /this post|this thread|CN forum|I still remembers|For me’s|I’s level|zhongyu|中羽|the original poster|netizen|upstairs said/i;


describe("original editorial allowlist", () => {
  it("matches null entries in the import source map", () => {
    const sourceMap = JSON.parse(
      readFileSync(
        join(process.cwd(), "scripts/blog-slug-source-map.json"),
        "utf8"
      )
    ) as Record<string, string | null>;
    const fromMap = Object.entries(sourceMap)
      .filter(([, source]) => source == null)
      .map(([slug]) => slug)
      .sort();
    expect([...ORIGINAL_EDITORIAL_SLUGS].sort()).toEqual(fromMap);
  });
});

describe("thin-content noindex set", () => {
  it("only lists slugs that exist in the corpus", () => {
    for (const slug of noindexReviewSlugs) {
      expect(blogSlugs, slug).toContain(slug);
    }
  });

  it("has no duplicates across the three reason lists", () => {
    expect(new Set(noindexReviewSlugs).size).toBe(noindexReviewSlugs.length);
  });

  it("noindexes every imported translation that is not founder-firsthand", () => {
    for (const slug of blogSlugs) {
      if (passesOriginalityGate(slug)) continue;
      expect(isThinContentNoindex(slug), slug).toBe(true);
      expect(adsAllowedOnReview(slug), slug).toBe(false);
    }
  });

  it("noindexes original editorials that are still under the length gate", () => {
    for (const slug of ORIGINAL_EDITORIAL_SLUGS) {
      if (reviewBodyWordCount(slug) < REVIEW_INDEX_MIN_BODY_WORDS) {
        expect(isThinContentNoindex(slug), slug).toBe(true);
      }
    }
  });

  it("keeps every noindexed article in the corpus", () => {
    for (const slug of noindexReviewSlugs) {
      expect(blogArticles.en.some((article) => article.slug === slug), slug).toBe(
        true
      );
    }
  });
});

describe("duplicate noindex set", () => {
  it("keeps the weaker FZ 88D slug out of the index", () => {
    expect(isThinContentNoindex("victor-fz-88d-power-purple-review")).toBe(
      true
    );
  });
});

describe("consolidated noindex set", () => {
  it("holds back overlapping SKU siblings", () => {
    expect(consolidatedNoindexSlugs.length).toBeGreaterThan(0);
    for (const slug of consolidatedNoindexSlugs) {
      expect(isThinContentNoindex(slug), slug).toBe(true);
    }
  });
});

describe("sitemap parity with the noindex set", () => {
  const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

  it("omits every noindexed review", () => {
    for (const slug of noindexReviewSlugs) {
      expect(urls, slug).not.toContain(`https://example.com/review/${slug}/`);
    }
  });

  it("omits spec PDPs", () => {
    expect(urls.some((url) => url.includes("/product/"))).toBe(false);
  });

  it("still emits the reviews hub and indexable articles", () => {
    expect(urls).toContain("https://example.com/review/");
    const indexable = indexableReviewSlugs(blogSlugs);
    expect(indexable.length).toBe(blogSlugs.length - noindexReviewSlugs.length);
    for (const slug of indexable) {
      expect(urls, slug).toContain(`https://example.com/review/${slug}/`);
    }
  });
});

describe("Lighthouse parity with the noindex set", () => {
  const configs = ["lighthouserc.json", "lighthouserc-baseline.json"];

  for (const file of configs) {
    it(`${file} audits no noindexed review`, () => {
      const config = JSON.parse(
        readFileSync(join(process.cwd(), file), "utf8")
      ) as { ci: { collect: { url: string[] } } };
      const audited = config.ci.collect.url;

      for (const slug of noindexReviewSlugs) {
        const offending = audited.filter((url) =>
          url.includes(`/review/${slug}/`)
        );
        expect(
          offending,
          `${file} audits /review/${slug}/, which is noindexed — swap it for an indexable page`
        ).toEqual([]);
      }
    });
  }
});

describe("homepage featured shelf", () => {
  const featured = homeFeaturedReviews.map((review) => review.slug);

  it("never features a noindexed review", () => {
    for (const slug of featured) {
      expect(isThinContentNoindex(slug), slug).toBe(false);
    }
  });

  it("never features a 1–2 minute note", () => {
    for (const review of homeFeaturedReviews) {
      expect(review.readingMinutes, review.slug).toBeGreaterThanOrEqual(4);
    }
  });

  it("features at most one article per catalogue product", () => {
    const productIds = featured
      .map((slug) => (reviewProductMap as Record<string, string>)[slug])
      .filter(Boolean);
    expect(new Set(productIds).size).toBe(productIds.length);
  });
});

describe("indexable core publication", () => {
  it("indexes every original editorial", () => {
    for (const slug of ORIGINAL_EDITORIAL_SLUGS) {
      expect(reviewBodyWordCount(slug), slug).toBeGreaterThanOrEqual(
        REVIEW_INDEX_MIN_BODY_WORDS
      );
      expect(isOriginalEditorialSlug(slug), slug).toBe(true);
      expect(isThinContentNoindex(slug), slug).toBe(false);
      expect(adsAllowedOnReview(slug), slug).toBe(true);
    }
  });

  it("indexes every founder-firsthand review", () => {
    for (const slug of blogSlugs) {
      if (!isFounderFirsthandSlug(slug)) continue;
      expect(reviewBodyWordCount(slug), slug).toBeGreaterThanOrEqual(
        REVIEW_INDEX_MIN_BODY_WORDS
      );
      expect(isThinContentNoindex(slug), slug).toBe(false);
      expect(adsAllowedOnReview(slug), slug).toBe(true);
    }
  });
});

describe("replicated-copy leftovers", () => {
  it("keeps forum voice off every indexable review", () => {
    for (const slug of indexableReviewSlugs(blogSlugs)) {
      const article = blogArticles.en.find((row) => row.slug === slug);
      expect(article, slug).toBeDefined();
      const text = [
        article?.title,
        article?.dek,
        article?.verdict,
        ...(article?.sections.map((section) => section.body) ?? []),
        article?.cta,
      ].join("\n");
      expect(text, slug).not.toMatch(FORUM_VOICE);
    }
  });
});
