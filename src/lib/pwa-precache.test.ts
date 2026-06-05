import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const SW_PATH = resolve(process.cwd(), "public/sw.js");

describe("PWA service worker precache", () => {
  const source = readFileSync(SW_PATH, "utf8");

  it("uses ib-v15 cache version", () => {
    expect(source).toContain('const CACHE_VERSION = "ib-v15"');
  });

  it("precaches finder, catalog, search, saved, compare, updates, review, guides, offline, data, methodology, tools, faq, best, brands, dedicated brand landings, compare-guides shells, and procedural guide landings", () => {
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
      "/brands/yonex/",
      "/brands/victor/",
      "/brands/li-ning/",
      "/brands/anta/",
      "/brands/bonny/",
      "/brands/kawasaki/",
      "/brands/kumpoo/",
      "/compare-guides/",
      "/compare-guides/yonex-astrox-vs-nanoflare/",
      "/guides/string-tension/",
      "/guides/wide-feet-badminton-shoes/",
      "/guides/shoes-footwork/",
      "/guides/racket-balance/",
      "/guides/badminton-shoes-vs-running-shoes/",
    ]) {
      expect(source).toContain(`"${path}"`);
    }
  });
});
