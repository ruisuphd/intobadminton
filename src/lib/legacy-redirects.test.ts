import { describe, expect, it } from "vitest";
import {
  legacyRedirects,
  legacyRedirectSources,
  redirectForLegacyPath,
} from "@/lib/legacy-redirects";
import { sitemapEntries } from "@/lib/sitemap";

describe("legacy locale redirects", () => {
  it("maps previously submitted locale URLs to canonical English pages", () => {
    expect(redirectForLegacyPath("/en/")).toBe("/");
    expect(redirectForLegacyPath("/zh/")).toBe("/");
    expect(redirectForLegacyPath("/en/blog/racket-balance-vs-swing-speed/")).toBe(
      "/blog/racket-balance-vs-swing-speed/"
    );
    expect(redirectForLegacyPath("/zh/guides/string-tension/")).toBe(
      "/guides/string-tension/"
    );
  });

  it("keeps legacy locale URLs out of the sitemap", () => {
    const sitemapUrls = new Set(
      sitemapEntries("https://example.com").map((entry) => entry.url)
    );

    for (const source of legacyRedirectSources) {
      expect(sitemapUrls.has(`https://example.com${source}`)).toBe(false);
    }
  });

  it("has unique locale sources and canonical non-locale destinations", () => {
    const sources = legacyRedirects.map((entry) => entry.source);

    expect(new Set(sources).size).toBe(sources.length);

    for (const entry of legacyRedirects) {
      expect(entry.source).toMatch(/^\/(?:en|zh)\//);
      expect(entry.destination).not.toMatch(/^\/(?:en|zh)\//);
      expect(entry.destination).toMatch(/\/$/);
    }
  });
});
