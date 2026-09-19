#!/usr/bin/env node
/**
 * Live check for the Sept 2026 removal of the translated review corpus.
 * Run after the GitHub Pages deploy, before the AdSense review request.
 *
 *   node docs/qa-adsense-recovery/verify-removal-live.mjs
 *   QA_BASE=http://127.0.0.1:4173 node docs/qa-adsense-recovery/verify-removal-live.mjs
 *
 * Exits 1 when any check fails.
 */
import { readFileSync } from "node:fs";

const BASE = (process.env.QA_BASE || "https://intobadminton.com").replace(/\/$/, "");
const CACHE_VERSION = "ib-v46";

const removed = JSON.parse(
  readFileSync(new URL("./removed-review-slugs.json", import.meta.url), "utf8")
);
const published = JSON.parse(
  readFileSync(new URL("../../scripts/blog-slugs-list.json", import.meta.url), "utf8")
);
const removedSet = new Set(removed);

const failures = [];
const fail = (message) => failures.push(message);

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { status: res.status, body: res.status === 200 ? await res.text() : "" };
}

async function inBatches(items, size, fn) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map(fn));
  }
}

// 1. Every removed article URL is gone, including its legacy aliases.
const removedPaths = removed.flatMap((slug) => [
  `/review/${slug}/`,
  `/blog/${slug}/`,
  `/comparisons/${slug}/`,
]);
// Retired duplicates that redirect to a kept original are allowed to exist.
const retired = JSON.parse(
  readFileSync(new URL("../../src/data/blog-url-migrations.json", import.meta.url), "utf8")
).retiredRedirects.map((entry) => entry.source);
const retiredSet = new Set(retired);
let gone = 0;
await inBatches(
  removedPaths.filter((path) => !retiredSet.has(path)),
  16,
  async (path) => {
    const { status } = await get(path);
    if (status === 404) gone += 1;
    else fail(`expected 404, got ${status}: ${path}`);
  }
);

// 2. Every published article is live and indexable.
await inBatches(published, 8, async (slug) => {
  const { status, body } = await get(`/review/${slug}/`);
  if (status !== 200) return fail(`expected 200, got ${status}: /review/${slug}/`);
  if (/<meta name="robots" content="noindex/i.test(body)) {
    fail(`published article is noindex: /review/${slug}/`);
  }
});

// 3. The sitemap lists exactly the published articles.
const sitemap = await get("/sitemap.xml");
const sitemapReviews = [...sitemap.body.matchAll(/\/review\/([a-z0-9-]+)\/<\/loc>/g)].map(
  (m) => m[1]
);
if (sitemapReviews.length !== published.length) {
  fail(`sitemap lists ${sitemapReviews.length} reviews, expected ${published.length}`);
}
for (const slug of sitemapReviews) {
  if (removedSet.has(slug)) fail(`sitemap still lists removed review ${slug}`);
}

// 4. No indexable page links into the removed set. Walk every sitemap URL,
// which covers every /best/, /compare-guides/, /guides/ and /brands/ page.
const sitemapPaths = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  new URL(m[1]).pathname
);
const pages = new Map();
await inBatches(sitemapPaths, 8, async (path) => {
  const { status, body } = await get(path);
  if (status !== 200) return fail(`sitemap URL returns ${status}: ${path}`);
  pages.set(path, body);
  for (const [, slug] of body.matchAll(/href="\/review\/([a-z0-9-]+)\/"/g)) {
    if (removedSet.has(slug)) fail(`${path} links to removed /review/${slug}/`);
  }
});

// 5. Returning visitors get the new precache, not stale translated pages.
const sw = await get("/sw.js");
if (!sw.body.includes(`const CACHE_VERSION = "${CACHE_VERSION}"`)) {
  fail(`sw.js is not on ${CACHE_VERSION} — deploy not live yet, or cache not bumped`);
}

// 6. No published article or trust page still describes the old corpus, and no
// article carries persona-normalizer debris ("the forum I report").
const STALE_COPY = [
  /noindexed/i,
  /imported forum/i,
  /imported threads/i,
  /court notes? (translated|that started)/i,
  /founder-firsthand tests/i,
  /planned ingestion pipeline/i,
  /unless rights allow/i,
  /\bthe forum I\b/i,
  /(?<!')\bI' measured/i,
];
const textOf = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'");
const copyPages = [
  ...published.map((slug) => `/review/${slug}/`),
  "/about/",
  "/methodology/",
  "/source-policy/",
];
await inBatches(copyPages, 8, async (path) => {
  const body = pages.get(path) ?? (await get(path)).body;
  const text = textOf(body);
  for (const pattern of STALE_COPY) {
    if (pattern.test(text)) fail(`${path} still matches stale copy ${pattern}`);
  }
});

// 7. The client JS no longer carries removed articles. Retired-redirect sources
// are allowed: they are URL strings in the redirect map, not article data.
const retiredSlugs = new Set(
  retired.map((source) => source.split("/").filter(Boolean).pop())
);
const chunkUrls = new Set();
for (const path of ["/", "/review/", "/search/"]) {
  const body = pages.get(path) ?? (await get(path)).body;
  for (const [, src] of body.matchAll(/<script[^>]+src="([^"]+\.js)"/g)) {
    chunkUrls.add(src);
  }
}
let chunksChecked = 0;
await inBatches([...chunkUrls], 8, async (src) => {
  const { status, body } = await get(src.startsWith("http") ? new URL(src).pathname : src);
  if (status !== 200) return;
  chunksChecked += 1;
  for (const slug of removed) {
    if (retiredSlugs.has(slug)) continue;
    if (body.includes(`"${slug}"`)) {
      fail(`client chunk ${src} still contains removed slug ${slug}`);
      break;
    }
  }
});

console.log(`[verify-removal] base ${BASE}`);
console.log(`[verify-removal] ${gone} removed URLs return 404`);
console.log(`[verify-removal] ${published.length} published articles checked`);
console.log(`[verify-removal] ${sitemapPaths.length} sitemap URLs walked, ${chunksChecked} JS chunks scanned`);
if (failures.length) {
  console.error(`[verify-removal] ${failures.length} failure(s):`);
  for (const message of failures.slice(0, 50)) console.error(`  - ${message}`);
  process.exit(1);
}
console.log("[verify-removal] all checks passed");
