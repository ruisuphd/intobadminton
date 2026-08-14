#!/usr/bin/env node
/**
 * Regenerate `src/data/home-featured-reviews.json` from `blog-articles.json`.
 * Homepage featured slots are publication pieces only: original editorial or
 * founder-firsthand, long enough to read, never a 1–2 minute court note.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const articles = JSON.parse(
  readFileSync(join(root, "src/data/blog-articles.json"), "utf8")
);
const sourceMap = JSON.parse(
  readFileSync(join(root, "scripts/blog-slug-source-map.json"), "utf8")
);
const reviewProductMap = JSON.parse(
  readFileSync(join(root, "src/data/blog-review-product-map.json"), "utf8")
);
const products = JSON.parse(
  readFileSync(join(root, "src/data/products.json"), "utf8")
);

const MIN_BODY_WORDS = 800;
const MIN_MINUTES = 4;
const FOUNDER_NOTE = /Founder (?:firsthand|current)/i;

const founderProductIds = new Set(
  products
    .filter((product) => FOUNDER_NOTE.test(product.editorNote ?? ""))
    .map((product) => product.id)
);

function bodyWords(article) {
  return article.sections
    .flatMap((section) => section.body.split(/\s+/))
    .filter(Boolean).length;
}

function readingMinutes(article) {
  const words = article.sections
    .flatMap((section) => `${section.heading} ${section.body}`.split(/\s+/))
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

function isOriginal(slug) {
  return sourceMap[slug] == null;
}

function isFounderFirsthand(slug) {
  const productId = reviewProductMap[slug];
  return Boolean(productId && founderProductIds.has(productId));
}

function isPublication(article) {
  const words = bodyWords(article);
  if (words < MIN_BODY_WORDS) return false;
  if (readingMinutes(article) < MIN_MINUTES) return false;
  return isOriginal(article.slug) || isFounderFirsthand(article.slug);
}

const PREFERRED = [
  "how-to-choose-a-badminton-racket",
  "badminton-string-selector",
  "yonex-nanoflare-1000z-review",
  "yonex-comfort-z3-shoes-review",
  "yonex-astrox-88d-pro-vs-88s-pro-2024",
  "yonex-arcsaber-7-pro-review",
];

const bySlug = new Map(articles.map((article) => [article.slug, article]));
const seenProducts = new Set();
const featured = [];

function take(article) {
  if (!article || !isPublication(article)) return;
  if (featured.some((row) => row.slug === article.slug)) return;
  const productId = reviewProductMap[article.slug];
  if (productId) {
    if (seenProducts.has(productId)) return;
    seenProducts.add(productId);
  }
  featured.push({
    slug: article.slug,
    title: article.title,
    updatedAt: article.updatedAt,
    readingMinutes: readingMinutes(article),
  });
}

for (const slug of PREFERRED) {
  if (featured.length >= 6) break;
  take(bySlug.get(slug));
}

const rest = [...articles]
  .filter(isPublication)
  .sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0
  );

for (const article of rest) {
  if (featured.length >= 6) break;
  take(article);
}

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
for (const row of featured) {
  console.log(`  ${row.readingMinutes} min  ${row.slug}`);
}
