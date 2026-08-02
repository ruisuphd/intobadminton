import { describe, expect, it } from "vitest";
import { blogArticles, blogSlugs } from "./blog";
import { sitemapEntries } from "./sitemap";
import {
  indexableReviewSlugs,
  isThinContentNoindex,
  thinContentNoindexSlugs,
} from "./thin-content";

/** Body word count — headings and dek excluded, matching the thin-page audit. */
function bodyWordCount(slug: string): number {
  const article = blogArticles.en.find((a) => a.slug === slug);
  if (!article) return 0;
  return article.sections
    .flatMap((section) => section.body.split(/\s+/))
    .filter(Boolean).length;
}

const THIN_WORD_THRESHOLD = 400;

/** Pages expanded past the threshold — they must stay indexable. */
const EXPANDED_REVIEW_SLUGS = [
  "badminton-string-selector",
  "li-ning-halbertec-5000-racket-review",
  "li-ning-halbertec-9000-standalone-review",
  "rsl-aero-classic-tourney-shuttle-review",
  "rsl-aero-u-shuttle-review",
  "victor-p8500-ii-vs-a970-nitro-lite",
  "yonex-arcsaber-7-tour-review",
  "yonex-astrox-99-pro-3-deep-dive",
  "yonex-comfort-z3-shoes-review",
];

describe("thin-content noindex set", () => {
  it("only lists slugs that exist in the corpus", () => {
    for (const slug of thinContentNoindexSlugs) {
      expect(blogSlugs, slug).toContain(slug);
    }
  });

  it("has no duplicates", () => {
    expect(new Set(thinContentNoindexSlugs).size).toBe(
      thinContentNoindexSlugs.length
    );
  });

  it("only noindexes articles that are still thin", () => {
    // If an article here has been expanded, it should be earning impressions
    // again — remove it from the list rather than leaving it out of the index.
    for (const slug of thinContentNoindexSlugs) {
      expect(bodyWordCount(slug), slug).toBeLessThan(THIN_WORD_THRESHOLD);
    }
  });

  it("keeps every noindexed article live and linked from the reviews hub", () => {
    // `noindex, follow` only works if the page still exists and is reachable.
    for (const slug of thinContentNoindexSlugs) {
      expect(blogSlugs, slug).toContain(slug);
      expect(blogArticles.en.some((a) => a.slug === slug), slug).toBe(true);
    }
  });
});

describe("sitemap parity with the noindex set", () => {
  const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

  it("omits every noindexed review", () => {
    for (const slug of thinContentNoindexSlugs) {
      expect(urls, slug).not.toContain(`https://example.com/review/${slug}/`);
    }
  });

  it("still emits the reviews hub and indexable articles", () => {
    expect(urls).toContain("https://example.com/review/");
    const indexable = indexableReviewSlugs(blogSlugs);
    expect(indexable.length).toBe(
      blogSlugs.length - thinContentNoindexSlugs.length
    );
    for (const slug of indexable) {
      expect(urls, slug).toContain(`https://example.com/review/${slug}/`);
    }
  });
});

describe("expanded reviews", () => {
  it("clear the thin threshold", () => {
    for (const slug of EXPANDED_REVIEW_SLUGS) {
      expect(bodyWordCount(slug), slug).toBeGreaterThanOrEqual(
        THIN_WORD_THRESHOLD
      );
    }
  });

  it("stay indexable", () => {
    for (const slug of EXPANDED_REVIEW_SLUGS) {
      expect(isThinContentNoindex(slug), slug).toBe(false);
    }
  });
});
