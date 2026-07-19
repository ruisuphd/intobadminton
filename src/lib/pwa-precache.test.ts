import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { homeFeaturedReviewHrefs } from "./home-featured";
import { homePopularSearchPrecachePaths } from "./home-popular-searches";
import { lighthousePaths } from "./lighthouse-paths";
import { PRECACHE_ASSERT_PATHS } from "./pwa-precache-paths";

const SW_PATH = resolve(process.cwd(), "public/sw.js");

describe("PWA service worker precache", () => {
  const source = readFileSync(SW_PATH, "utf8");

  it("uses ib-v37 cache version", () => {
    expect(source).toContain('const CACHE_VERSION = "ib-v37"');
  });

  it("precaches finder, catalog, search, saved, compare, updates, review, guides, offline, data, methodology, tools, faq, best, brands, dedicated brand landings, compare-guides shells, tier-1 best-of landings, long-tail best-of landings, price-band best-of, contact, research, legal cluster, trust cluster, sample PDP and review shells, procedural guide landings, glossary, season-refresh, and remaining tool shells", () => {
    for (const path of PRECACHE_ASSERT_PATHS) {
      expect(source).toContain(`"${path}"`);
    }
  });

  it("precaches every Lighthouse CI URL", () => {
    for (const path of lighthousePaths()) {
      expect(source, `missing precache for ${path}`).toContain(`"${path}"`);
    }
  });

  it("precaches every homepage featured review shell", () => {
    for (const path of homeFeaturedReviewHrefs()) {
      expect(source, `missing precache for ${path}`).toContain(`"${path}"`);
    }
  });

  it("precaches every homepage popular-search deep link", () => {
    for (const path of homePopularSearchPrecachePaths()) {
      expect(source, `missing precache for ${path}`).toContain(`"${path}"`);
    }
  });
});
