import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const SW_PATH = resolve(process.cwd(), "public/sw.js");

describe("PWA service worker precache", () => {
  const source = readFileSync(SW_PATH, "utf8");

  it("uses ib-v10 cache version", () => {
    expect(source).toContain('const CACHE_VERSION = "ib-v10"');
  });

  it("precaches finder, catalog, search, saved, compare, updates, review, guides, offline, data, methodology, tools, faq, best, brands, and compare-guides shells", () => {
    for (const path of [
      "/quiz/",
      "/catalog/",
      "/search/",
      "/saved/",
      "/compare/",
      "/review/",
      "/updates/",
      "/guides/",
      "/offline/",
      "/data/",
      "/methodology/",
      "/tools/",
      "/faq/",
      "/best/",
      "/brands/",
      "/compare-guides/",
    ]) {
      expect(source).toContain(`"${path}"`);
    }
  });
});
