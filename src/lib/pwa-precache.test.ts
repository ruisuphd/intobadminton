import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { PRECACHE_ASSERT_PATHS } from "./pwa-precache-paths";

const SW_PATH = resolve(process.cwd(), "public/sw.js");
const LIGHTHOUSE_PATH = resolve(process.cwd(), "lighthouserc.json");

function lighthousePaths(): string[] {
  const config = JSON.parse(readFileSync(LIGHTHOUSE_PATH, "utf8")) as {
    ci: { collect: { url: string[] } };
  };
  return config.ci.collect.url.map((url) => {
    let path = new URL(url).pathname;
    if (path.endsWith("/index.html")) {
      path = `${path.slice(0, -"/index.html".length)}/`;
    } else if (!path.endsWith("/")) {
      path = `${path}/`;
    }
    return path;
  });
}

describe("PWA service worker precache", () => {
  const source = readFileSync(SW_PATH, "utf8");

  it("uses ib-v26 cache version", () => {
    expect(source).toContain('const CACHE_VERSION = "ib-v26"');
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
});
