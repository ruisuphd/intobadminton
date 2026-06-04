#!/usr/bin/env node
/**
 * Reports review articles without a catalogue mapping in
 * `src/data/blog-review-product-map.json`.
 *
 * Exit 0 with warnings (default) or exit 1 when --strict.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const STRICT = process.argv.includes("--strict");

const map = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/blog-review-product-map.json"), "utf8")
);
const articles = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/blog-articles.json"), "utf8")
);

const slugs = articles.map((a) => a.slug);
const mapped = new Set(Object.keys(map));
const unmapped = slugs.filter((slug) => !mapped.has(slug));

const pct = slugs.length
  ? Math.round((mapped.size / slugs.length) * 100)
  : 0;

console.log(
  `Review product map: ${mapped.size}/${slugs.length} slugs mapped (${pct}%)`
);

if (unmapped.length > 0) {
  console.log(`Unmapped (${unmapped.length}):`);
  for (const slug of unmapped.slice(0, 20)) {
    console.log(`  - ${slug}`);
  }
  if (unmapped.length > 20) {
    console.log(`  … and ${unmapped.length - 20} more`);
  }
}

if (STRICT && unmapped.length > 0) {
  process.exit(1);
}
