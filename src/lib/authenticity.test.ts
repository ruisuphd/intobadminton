import { describe, expect, test } from "vitest";
import { authenticityBrands, authenticityGuide } from "@/lib/authenticity";
import { sitemapEntries } from "@/lib/sitemap";

describe("equipment authenticity guidance", () => {
  test("uses official brand sources and does not claim IntoBadminton certification", () => {
    expect(authenticityGuide.disclaimer).toMatch(/does not authenticate/i);

    expect(authenticityBrands.map((brand) => brand.name)).toEqual([
      "Yonex",
      "VICTOR",
      "Li-Ning",
    ]);

    for (const brand of authenticityBrands) {
      expect(brand.officialSourceName.trim(), brand.name).not.toBe("");
      expect(brand.officialSourceUrl, brand.name).toMatch(/^https:\/\//);
      expect(brand.officialQuote.split(/\s+/).length, brand.name).toBeLessThanOrEqual(14);
      expect(brand.limitation.trim(), brand.name).not.toBe("");
    }
  });

  test("adds the authenticity checks guide to the sitemap", () => {
    const urls = sitemapEntries("https://example.com").map((entry) => entry.url);

    expect(urls).toContain(
      "https://example.com/guides/equipment-authenticity/"
    );
  });
});
