import { describe, expect, test } from "vitest";
import {
  blogArticles,
  blogSlugs,
  readingTimeMinutes,
  relatedArticles,
  sectionAnchorId,
} from "@/lib/blog";

describe("blog publishing metadata", () => {
  test("keeps every article reachable through static blog routes", () => {
    const routeSlugs = new Set(blogSlugs);
    expect(blogArticles.en.map((article) => article.slug)).toEqual(
      expect.arrayContaining([...blogSlugs])
    );
    for (const article of blogArticles.en) {
      expect(routeSlugs.has(article.slug)).toBe(true);
    }
  });

  test("publishes every routed blog article with required fields", () => {
    expect(blogArticles.en).toHaveLength(blogSlugs.length);
    for (const article of blogArticles.en) {
      expect(article.title.trim(), article.slug).not.toBe("");
      expect(article.dek.trim(), article.slug).not.toBe("");
      expect(article.verdict.trim(), article.slug).not.toBe("");
      expect(article.sections.length, article.slug).toBeGreaterThan(0);
      for (const section of article.sections) {
        expect(section.heading.trim(), article.slug).not.toBe("");
        expect(section.body.trim(), article.slug).not.toBe("");
      }
    }
  });

  test("keeps article bodies free of raw URLs, Chinese text, and markdown bold", () => {
    for (const article of blogArticles.en) {
      const blob = JSON.stringify(article);
      expect(blob, article.slug).not.toMatch(/https?:\/\//i);
      expect(blob, article.slug).not.toMatch(/[\u4e00-\u9fff]/);
      expect(blob, article.slug).not.toMatch(/\*\*[^*]+\*\*/);
      expect(article.dek.trim().length, article.slug).toBeGreaterThanOrEqual(50);
    }
  });

  test("generates unique section anchor ids when headings repeat", () => {
    const seen = new Map<string, number>();
    const ids = ["Overview", "Overview", "Verdict"].map((heading, index) =>
      sectionAnchorId(heading, index, seen)
    );
    expect(ids).toEqual(["overview", "overview-2", "verdict"]);
  });

  test("estimates reading time as at least one minute", () => {
    for (const article of blogArticles.en) {
      expect(readingTimeMinutes(article)).toBeGreaterThanOrEqual(1);
    }
  });

  test("returns related articles from the same product family when possible", () => {
    const current = blogArticles.en.find(
      (a) => a.slug === "badminton-string-selector"
    );
    expect(current).toBeDefined();
    const related = relatedArticles(blogArticles.en, current!, 3);
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((a) => a.slug !== current!.slug)).toBe(true);
  });
});
