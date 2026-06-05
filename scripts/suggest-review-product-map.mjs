#!/usr/bin/env node
/**
 * Suggests blog slug → catalogue product id mappings for unmapped reviews.
 * Heuristic: slug contains a product id or its yonex-/li-ning-/victor- alias.
 *
 * Usage:
 *   node scripts/suggest-review-product-map.mjs
 *   node scripts/suggest-review-product-map.mjs --json   # machine-readable
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const asJson = process.argv.includes("--json");
const apply = process.argv.includes("--apply");

const map = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/blog-review-product-map.json"), "utf8")
);
const articles = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/blog-articles.json"), "utf8")
);
const products = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/products.json"), "utf8")
);

const ids = new Set(products.map((p) => p.id));
const slugs = articles.map((a) => a.slug);
const unmapped = slugs.filter((slug) => !map[slug]);

function aliases(id) {
  return [
    id,
    id.replace(/^yy-/, "yonex-"),
    id.replace(/^ln-/, "li-ning-"),
    id.replace(/^vic-/, "victor-"),
  ];
}

function suggest(slug) {
  for (const id of ids) {
    for (const variant of aliases(id)) {
      if (slug.includes(variant)) return id;
    }
  }
  return null;
}

const suggestions = {};
for (const slug of unmapped) {
  const productId = suggest(slug);
  if (productId) suggestions[slug] = productId;
}

if (apply && Object.keys(suggestions).length > 0) {
  const merged = { ...map, ...suggestions };
  const sorted = Object.fromEntries(
    Object.keys(merged)
      .sort()
      .map((k) => [k, merged[k]])
  );
  writeFileSync(
    resolve(ROOT, "src/data/blog-review-product-map.json"),
    `${JSON.stringify(sorted, null, 2)}\n`
  );
}

if (asJson) {
  console.log(JSON.stringify(suggestions, null, 2));
} else {
  console.log(
    `Unmapped: ${unmapped.length}; suggestions: ${Object.keys(suggestions).length}`
  );
  for (const [slug, id] of Object.entries(suggestions)) {
    console.log(`  ${slug} → ${id}`);
  }
  if (apply) {
    console.log(`Applied ${Object.keys(suggestions).length} mapping(s).`);
  }
}
