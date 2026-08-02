import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import reviewProductMap from "@/data/blog-review-product-map.json";
import { blogArticles, blogSlugs } from "./blog";
import { homeFeaturedReviews } from "./home-featured";
import { sitemapEntries } from "./sitemap";
import {
  duplicateNoindexSlugs,
  indexableReviewSlugs,
  isThinContentNoindex,
  noindexReviewSlugs,
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
    for (const slug of noindexReviewSlugs) {
      expect(blogSlugs, slug).toContain(slug);
    }
  });

  it("has no duplicates", () => {
    // Within each list, and across the two — a slug on both would make the
    // reason it is noindexed ambiguous.
    expect(new Set(noindexReviewSlugs).size).toBe(noindexReviewSlugs.length);
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
    for (const slug of noindexReviewSlugs) {
      expect(blogSlugs, slug).toContain(slug);
      expect(blogArticles.en.some((a) => a.slug === slug), slug).toBe(true);
    }
  });
});

describe("duplicate noindex set", () => {
  it("is not a second home for thin pages", () => {
    // These are noindexed for duplicating a sibling, not for being short. A
    // slug that is also thin belongs in `thinContentNoindexSlugs`, where the
    // word-count guard above will keep watching it.
    for (const slug of duplicateNoindexSlugs) {
      expect(bodyWordCount(slug), slug).toBeGreaterThanOrEqual(
        THIN_WORD_THRESHOLD
      );
    }
  });

  it("keeps the sibling it duplicates indexable", () => {
    // Noindexing both halves of a duplicate pair would remove the coverage
    // entirely rather than de-duplicate it.
    expect(isThinContentNoindex("fz-forza-88d-review")).toBe(false);
    expect(isThinContentNoindex("victor-fz-88d-power-purple-review")).toBe(
      true
    );
  });
});

describe("sitemap parity with the noindex set", () => {
  const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

  it("omits every noindexed review", () => {
    for (const slug of noindexReviewSlugs) {
      expect(urls, slug).not.toContain(`https://example.com/review/${slug}/`);
    }
  });

  it("still emits the reviews hub and indexable articles", () => {
    expect(urls).toContain("https://example.com/review/");
    const indexable = indexableReviewSlugs(blogSlugs);
    expect(indexable.length).toBe(
      blogSlugs.length - noindexReviewSlugs.length
    );
    for (const slug of indexable) {
      expect(urls, slug).toContain(`https://example.com/review/${slug}/`);
    }
  });
});

describe("Lighthouse parity with the noindex set", () => {
  // Lighthouse scores a noindexed page ~0.69 on SEO because "Page is blocked
  // from indexing" is a hard fail in that category, and lighthouserc.json
  // asserts categories.seo >= 0.95 as an error. Auditing a page we chose not to
  // index is meaningless, and it turns an intentional change into a red build:
  // adding gosen-ryoga-shiden-review and anta-ah600w-racket-review to the
  // noindex set failed CI on exactly this.
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
  // The generator sorts by updatedAt and takes six. Before this guard it had no
  // notion of the noindex set or of duplicate pairs, and it had already put both
  // halves of the Auraspeed HS Plus pair into the six slots — two entries about
  // one racket, on the page an AdSense reviewer opens first.
  const featured = homeFeaturedReviews.map((review) => review.slug);

  it("never features a noindexed review", () => {
    for (const slug of featured) {
      expect(isThinContentNoindex(slug), slug).toBe(false);
    }
  });

  it("features at most one article per catalogue product", () => {
    const productIds = featured
      .map((slug) => (reviewProductMap as Record<string, string>)[slug])
      .filter(Boolean);
    expect(new Set(productIds).size).toBe(productIds.length);
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
