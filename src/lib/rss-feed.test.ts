import { describe, expect, it } from "vitest";
import { buildRssXml, rssItems } from "@/lib/rss-feed";

describe("rssItems", () => {
  it("returns review and guide entries with absolute links", () => {
    const items = rssItems(5);
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]?.link).toMatch(/^https:\/\/intobadminton\.com\//);
  });
});

describe("buildRssXml", () => {
  it("emits valid RSS root", () => {
    const xml = buildRssXml([
      {
        title: "Test",
        link: "https://intobadminton.com/review/test/",
        description: "Dek",
        pubDate: new Date("2026-01-01").toUTCString(),
      },
    ]);
    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain("<rss version=\"2.0\">");
    expect(xml).toContain("<title>Test</title>");
  });
});
