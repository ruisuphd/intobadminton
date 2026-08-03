#!/usr/bin/env node
/**
 * Regenerate `src/data/home-featured-reviews.json` from `blog-articles.json`.
 * Run after blog import so the homepage does not bundle the full article corpus.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const articles = JSON.parse(
  readFileSync(join(root, "src/data/blog-articles.json"), "utf8")
);

/*
 * Two filters sit between "most recently updated" and "good enough for the
 * homepage". Recency alone had already put both halves of one duplicate pair
 * into the six slots.
 */

// 1. Never feature a page we chose not to index. Parsed out of thin-content.ts
//    rather than imported because this script runs as plain node before any TS
//    build step exists.
const noindexSource = readFileSync(
  join(root, "src/lib/thin-content.ts"),
  "utf8"
);
const noindexSlugs = new Set(
  [...noindexSource.matchAll(/^\s{2}"([a-z0-9-]+)",$/gm)].map((m) => m[1])
);

// 2. At most one article per catalogue product, so a split pair covering the
//    same racket cannot take two slots.
const reviewProductMap = JSON.parse(
  readFileSync(join(root, "src/data/blog-review-product-map.json"), "utf8")
);

const sorted = [...articles].sort((a, b) =>
  a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0
);

const seenProducts = new Set();
const eligible = sorted.filter((article) => {
  if (noindexSlugs.has(article.slug)) return false;
  const productId = reviewProductMap[article.slug];
  if (productId) {
    if (seenProducts.has(productId)) return false;
    seenProducts.add(productId);
  }
  return true;
});

const featured = eligible.slice(0, 6).map((article) => {
  const words = article.sections
    .flatMap((s) => `${s.heading} ${s.body}`.split(/\s+/))
    .filter(Boolean).length;
  return {
    slug: article.slug,
    title: article.title,
    updatedAt: article.updatedAt,
    readingMinutes: Math.max(1, Math.round(words / 225)),
  };
});

const payload = {
  reviewCount: articles.length,
  featured,
};

writeFileSync(
  join(root, "src/data/home-featured-reviews.json"),
  `${JSON.stringify(payload, null, 2)}\n`
);

console.log(
  `[home-featured] wrote ${featured.length} featured, reviewCount=${payload.reviewCount}`
);
