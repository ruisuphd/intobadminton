import { describe, expect, test } from "vitest";
import {
  blogArticles,
  blogSlugs,
  readingTimeMinutes,
  relatedArticles,
  sectionAnchorId,
} from "@/lib/blog";

const FIRST_PERSON_PATTERN =
  /\b(i|i'?m|i'?ve|my|me|mine|we|we'?ve|we'?re|our|ours)\b/i;

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

  test("uses first-person voice in imported review bodies", () => {
    const sample = blogArticles.en.filter((a) =>
      a.slug.includes("review") || a.slug.includes("vs") || a.slug.includes("guide")
    );
    expect(sample.length).toBeGreaterThan(50);
    const withFirstPerson = sample.filter((article) =>
      article.sections.some((s) => FIRST_PERSON_PATTERN.test(s.body))
    );
    expect(withFirstPerson.length / sample.length).toBeGreaterThan(0.6);
  });

  test("does not leak URLs or channel attribution in article bodies", () => {
    for (const article of blogArticles.en) {
      const blob = JSON.stringify(article);
      expect(blob, article.slug).not.toMatch(/https?:\/\//i);
      expect(blob.toLowerCase(), article.slug).not.toContain("tige xlab");
      expect(blob.toLowerCase(), article.slug).not.toContain("badmintoncn");
      expect(blob, article.slug).not.toMatch(/[\u4e00-\u9fff]/);
      expect(blob, article.slug).not.toMatch(/\*\*[^*]+\*\*/);
      expect(blob.toLowerCase(), article.slug).not.toContain("the author");
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
      (a) => a.slug === "yonex-astrox-88d-pro-vs-88s-pro-2024"
    );
    expect(current).toBeDefined();
    const related = relatedArticles(blogArticles.en, current!, 3);
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((a) => a.slug !== current!.slug)).toBe(true);
  });
});
