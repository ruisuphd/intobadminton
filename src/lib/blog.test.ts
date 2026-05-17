import { describe, expect, test } from "vitest";
import {
  blogArticles,
  blogSlugs,
  readingTimeMinutes,
  relatedArticles,
} from "@/lib/blog";

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

  test("publishes the latest local source reviews as longer buyer-first articles", () => {
    const latestSourceSlugs = [
      "yonex-arcsaber-7-pro-review",
      "asics-blast-ff-3-badminton-shoes-review",
      "yonex-astrox-nextage-review",
      "victor-drivex-10-review",
      "yonex-nanoflare-1000z-play-review",
      "li-ning-halbertec-7000-ii-review",
      "yonex-nanoflare-800-pro-tour-review",
      "yonex-nanoflare-nextage-review",
      "yonex-power-cushion-88-dial-3-review",
      "yonex-grpht-thrttl-training-shoe-review",
    ];

    expect(blogSlugs).toEqual(expect.arrayContaining(latestSourceSlugs));

    for (const slug of latestSourceSlugs) {
      const article = blogArticles.en.find((item) => item.slug === slug);

      expect(article, slug).toBeDefined();
      expect(article?.reviewSummary, slug).toBeDefined();
      expect(article?.story?.intro.trim(), slug).not.toBe("");
      expect(readingTimeMinutes(article!), slug).toBeGreaterThanOrEqual(4);
    }
  });

  test("relatedArticles surfaces lineage matches even across categories", () => {
    // The Halbertec 9000 Power deep-dive (review) should surface other
    // Halbertec articles — including the comparison article in a different
    // category — before unrelated Yonex or Bonny content. This validates
    // that product-series matching outranks pure category matching.
    const current = blogArticles.en.find(
      (a) => a.slug === "li-ning-halbertec-9000-power-deep-dive"
    );
    expect(current, "li-ning-halbertec-9000-power-deep-dive").toBeDefined();

    const related = relatedArticles(blogArticles.en, current!, 5);
    const relatedSlugs = related.map((a) => a.slug);

    // At least one Halbertec article should appear in the first 5 related.
    const halbertecMatches = relatedSlugs.filter((s) =>
      s.includes("halbertec")
    );
    expect(halbertecMatches.length).toBeGreaterThanOrEqual(1);

    // The Halbertec 8000-vs-9000-vs-9000-Power comparison (different category
    // from the 9000 Power deep-dive review) should be among them.
    expect(relatedSlugs).toContain(
      "li-ning-halbertec-8000-vs-9000-vs-9000-power"
    );
  });

  test("relatedArticles surfaces lineage matches within the Astrox 99 Pro trilogy", () => {
    // The Astrox 99 Pro Gen 3 review should surface at least one other 99 Pro
    // generation review ahead of unrelated content.
    const current = blogArticles.en.find(
      (a) => a.slug === "yonex-astrox-99-pro-3-deep-dive"
    );
    expect(current, "yonex-astrox-99-pro-3-deep-dive").toBeDefined();

    const related = relatedArticles(blogArticles.en, current!, 5);
    const relatedSlugs = related.map((a) => a.slug);

    const ninetyninePro = relatedSlugs.filter((s) =>
      s.includes("astrox-99-pro")
    );
    expect(ninetyninePro.length).toBeGreaterThanOrEqual(1);
  });

  test("relatedArticles excludes the current article from results", () => {
    const current = blogArticles.en[0];
    const related = relatedArticles(blogArticles.en, current, 5);

    for (const a of related) {
      expect(a.slug).not.toBe(current.slug);
    }
  });

  test("keeps published review articles grounded with fact-check source notes", () => {
    const reviews = blogArticles.en.filter(
      (article) => article.category === "reviews"
    );

    for (const article of reviews) {
      expect(article.factChecks?.length, article.slug).toBeGreaterThanOrEqual(1);

      for (const note of article.factChecks ?? []) {
        expect(note.sourceName.trim(), article.slug).not.toBe("");
        expect(note.title.trim(), article.slug).not.toBe("");
        expect(note.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(note.href).toMatch(/^https:\/\//);
        expect(note.note.trim(), article.slug).not.toBe("");
      }
    }
  });
});
