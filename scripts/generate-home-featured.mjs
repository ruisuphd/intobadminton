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

const sorted = [...articles].sort((a, b) =>
  a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0
);

const featured = sorted.slice(0, 6).map((article) => {
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
