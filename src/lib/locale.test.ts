import { describe, expect, it } from "vitest";
import {
  buildLocalizedPath,
  isSupportedLocale,
  localizedRoutesFor,
  siteLocales,
} from "@/lib/locale";
import { sitemapEntries } from "@/lib/sitemap";

describe("locale routing", () => {
  it("supports English and Chinese locale prefixes", () => {
    expect(siteLocales).toEqual(["en", "zh"]);
    expect(isSupportedLocale("en")).toBe(true);
    expect(isSupportedLocale("zh")).toBe(true);
    expect(isSupportedLocale("fr")).toBe(false);
  });

  it("builds localized route paths without duplicating slashes", () => {
    expect(buildLocalizedPath("en", "/quiz/")).toBe("/en/quiz/");
    expect(buildLocalizedPath("zh", "guides")).toBe("/zh/guides/");
    expect(buildLocalizedPath("en", "/")).toBe("/en/");
  });

  it("generates localized core routes for both launch locales", () => {
    expect(localizedRoutesFor("zh")).toEqual([
      "/zh/",
      "/zh/quiz/",
      "/zh/results/",
      "/zh/guides/",
      "/zh/compare/",
      "/zh/review/",
      "/zh/methodology/",
      "/zh/source-policy/",
      "/zh/sources/",
      "/zh/about/",
      "/zh/security/",
      "/zh/privacy/",
      "/zh/cookies/",
      "/zh/terms/",
      "/zh/contact/",
      "/zh/blog/",
      "/zh/research/",
    ]);
  });
});

describe("sitemapEntries", () => {
  it("includes canonical and bilingual static routes", () => {
    const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

    expect(urls).toContain("https://example.com/");
    expect(urls).toContain("https://example.com/en/");
    expect(urls).toContain("https://example.com/zh/");
    expect(urls).toContain("https://example.com/zh/quiz/");
    expect(urls).toContain("https://example.com/en/guides/");
    expect(urls).toContain("https://example.com/security/");
    expect(urls).toContain("https://example.com/zh/security/");
    expect(urls).toContain("https://example.com/blog/");
    expect(urls).toContain("https://example.com/zh/blog/");
    expect(urls).toContain(
      "https://example.com/blog/used-racket-depreciation/"
    );
    expect(urls).toContain(
      "https://example.com/zh/blog/used-racket-depreciation/"
    );
    expect(urls).toContain("https://example.com/research/");
    expect(urls).toContain("https://example.com/zh/research/");
  });
});
