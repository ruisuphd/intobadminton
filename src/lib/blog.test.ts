import { describe, expect, test } from "vitest";
import { blogArticles, blogSlugs, readingTimeMinutes } from "@/lib/blog";

describe("blog publishing metadata", () => {
  test("keeps every English article reachable through static blog routes", () => {
    const routeSlugs = new Set(blogSlugs);

    expect(blogArticles.en.map((article) => article.slug)).toEqual(
      expect.arrayContaining(blogSlugs)
    );

    for (const article of blogArticles.en) {
      expect(routeSlugs.has(article.slug)).toBe(true);
    }
  });

  test("publishes the remaining markdown review sources as English review articles", () => {
    expect(blogSlugs).toEqual(
      expect.arrayContaining([
        "li-ning-halbertec-7000-ii-review",
        "victor-carbonsonic-max-shuttle-review",
        "bonny-leisu-800-racket-review",
        "kumpoo-shanhai-new-racket-review",
        "li-ning-axforce-80-review",
      ])
    );
  });

  test("gives every review article a concise buyer-first summary", () => {
    const reviews = blogArticles.en.filter(
      (article) => article.category === "reviews"
    );

    expect(reviews.length).toBeGreaterThan(0);

    for (const article of reviews) {
      expect(article.reviewSummary, article.slug).toBeDefined();
      expect(article.reviewSummary?.verdict.trim(), article.slug).not.toBe("");
      expect(
        article.reviewSummary?.bestFor.length,
        article.slug
      ).toBeGreaterThanOrEqual(2);
      expect(
        article.reviewSummary?.bestFor.length,
        article.slug
      ).toBeLessThanOrEqual(3);
      expect(
        article.reviewSummary?.avoidIf.length,
        article.slug
      ).toBeGreaterThanOrEqual(1);
      expect(
        article.reviewSummary?.avoidIf.length,
        article.slug
      ).toBeLessThanOrEqual(3);
      expect(article.reviewSummary?.sourceHook.trim(), article.slug).not.toBe(
        ""
      );

      for (const bullet of [
        ...(article.reviewSummary?.bestFor ?? []),
        ...(article.reviewSummary?.avoidIf ?? []),
      ]) {
        expect(
          bullet.split(/\s+/).length,
          `${article.slug}: ${bullet}`
        ).toBeLessThanOrEqual(16);
      }
    }
  });

  test("enriches priority review articles with narrative buyer-first blocks", () => {
    const priorityReviewSlugs = [
      "li-ning-halbertec-8000-vs-9000-vs-9000-power",
      "yonex-astrox-99-pro-2-deep-dive",
      "victor-auraspeed-hs-plus-deep-dive",
    ];

    for (const slug of priorityReviewSlugs) {
      const article = blogArticles.en.find((item) => item.slug === slug);

      expect(article, slug).toBeDefined();
      expect(article?.story?.intro.trim(), slug).not.toBe("");

      const blockKinds = new Set(
        article?.story?.blocks.map((block) => block.kind)
      );

      expect(blockKinds.has("facts"), slug).toBe(true);
      expect(blockKinds.has("callout"), slug).toBe(true);
      expect(blockKinds.has("comparison"), slug).toBe(true);
      expect(blockKinds.has("verdict"), slug).toBe(true);
    }
  });

  test("counts rich narrative blocks in article reading time", () => {
    const article = blogArticles.en.find(
      (item) => item.slug === "li-ning-halbertec-8000-vs-9000-vs-9000-power"
    );

    expect(article?.story).toBeDefined();
    expect(readingTimeMinutes(article!)).toBeGreaterThanOrEqual(4);
  });
});
