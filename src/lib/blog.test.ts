import { describe, expect, test } from "vitest";
import { blogArticles, blogSlugs } from "@/lib/blog";

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
});
