import { describe, expect, it } from "vitest";
import {
  buildLocalizedPath,
  isSupportedLocale,
  localizedRoutesFor,
  siteLocales,
} from "@/lib/locale";
import { sitemapEntries } from "@/lib/sitemap";

describe("locale routing", () => {
  it("ships English-only", () => {
    expect(siteLocales).toEqual(["en"]);
    expect(isSupportedLocale("en")).toBe(true);
    expect(isSupportedLocale("zh")).toBe(false);
    expect(isSupportedLocale("fr")).toBe(false);
  });

  it("buildLocalizedPath returns paths unchanged (no /en/ prefix)", () => {
    expect(buildLocalizedPath("en", "/quiz/")).toBe("/quiz/");
    expect(buildLocalizedPath("en", "guides")).toBe("/guides/");
    expect(buildLocalizedPath("en", "/")).toBe("/");
  });

  it("localizedRoutesFor returns the canonical core routes", () => {
    const routes = localizedRoutesFor("en");
    expect(routes).toContain("/");
    expect(routes).toContain("/quiz/");
    expect(routes).toContain("/blog/");
    expect(routes).toContain("/about/");
    expect(routes).toContain("/brands/");
    expect(routes).toContain("/sources/");
  });
});

describe("sitemapEntries", () => {
  it("includes canonical English-only static routes", () => {
    const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

    expect(urls).toContain("https://example.com/");
    expect(urls).toContain("https://example.com/guides/");
    expect(urls).toContain("https://example.com/security/");
    expect(urls).toContain("https://example.com/blog/");
    expect(urls).toContain(
      "https://example.com/blog/used-racket-depreciation/"
    );
    expect(urls).toContain("https://example.com/research/");
    expect(urls).toContain("https://example.com/sources/");
    expect(urls).toContain("https://example.com/brands/");
  });

  it("includes the finder and dedicated brand pages", () => {
    const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

    expect(urls).toContain("https://example.com/quiz/");
    expect(urls).toContain("https://example.com/brands/yonex/");
    expect(urls).toContain("https://example.com/brands/victor/");
    expect(urls).toContain("https://example.com/brands/li-ning/");
  });

  it("does not emit Chinese locale routes", () => {
    const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

    expect(urls.some((u) => u.includes("/zh/"))).toBe(false);
    expect(urls.some((u) => u.includes("/en/"))).toBe(false);
  });

  it("does not emit thin or stateful utility routes", () => {
    const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

    // /results/ and /compare/ are stateful — they read from local storage and
    // would index as empty pages. /review/ and /setup/ are internal tools.
    // /privacy-choices/ is a CMP popup endpoint.
    expect(urls).not.toContain("https://example.com/results/");
    expect(urls).not.toContain("https://example.com/compare/");
    expect(urls).not.toContain("https://example.com/review/");
    expect(urls).not.toContain("https://example.com/setup/");
    expect(urls).not.toContain("https://example.com/privacy-choices/");
  });
});
