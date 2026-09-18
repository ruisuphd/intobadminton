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

// 4. No indexable hub links into the removed set.
const hubs = [
  "/",
  "/review/",
  "/about/",
  "/methodology/",
  "/source-policy/",
  ...["anta", "bonny", "kawasaki", "kumpoo", "li-ning", "victor", "yonex"].map(
    (b) => `/brands/${b}/`
  ),
  ...[
    "shoes",
    "shuttles",
    "strings",
    "grips",
    "beginner-rackets",
    "singles-rackets",
    "doubles-rackets",
    "intermediate-rackets",
  ].map((b) => `/best/${b}/`),
  "/compare-guides/astrox-99-pro-vs-astrox-100zz/",
  "/compare-guides/nanoflare-1000z-vs-auraspeed-99/",
];
await inBatches(hubs, 8, async (path) => {
  const { status, body } = await get(path);
  if (status !== 200) return fail(`expected 200, got ${status}: ${path}`);
  for (const [, slug] of body.matchAll(/href="\/review\/([a-z0-9-]+)\/"/g)) {
    if (removedSet.has(slug)) fail(`${path} links to removed /review/${slug}/`);
  }
});

// 5. Returning visitors get the new precache, not stale translated pages.
const sw = await get("/sw.js");
if (!sw.body.includes(`const CACHE_VERSION = "${CACHE_VERSION}"`)) {
  fail(`sw.js is not on ${CACHE_VERSION} — deploy not live yet, or cache not bumped`);
}

// 6. The About page no longer describes the removed court notes.
const about = await get("/about/");
if (/court notes that started as Chinese-language/i.test(about.body)) {
  fail("/about/ still carries the pre-removal sourcing copy");
}

console.log(`[verify-removal] base ${BASE}`);
console.log(`[verify-removal] ${gone} removed URLs return 404`);
console.log(`[verify-removal] ${published.length} published articles checked`);
if (failures.length) {
  console.error(`[verify-removal] ${failures.length} failure(s):`);
  for (const message of failures.slice(0, 50)) console.error(`  - ${message}`);
  process.exit(1);
}
console.log("[verify-removal] all checks passed");
