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
const MIN_COVERAGE = Number(
  process.argv.find((arg) => arg.startsWith("--min-coverage="))?.split("=")[1] ??
    "0"
);

const map = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/blog-review-product-map.json"), "utf8")
);
const articles = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/blog-articles.json"), "utf8")
);
const products = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/products.json"), "utf8")
);
const catalogIds = new Set(products.map((p) => p.id));

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

const badIds = Object.entries(map).filter(([, id]) => !catalogIds.has(id));
if (badIds.length > 0) {
  console.error(`Invalid catalogue ids (${badIds.length}):`);
  for (const [slug, id] of badIds.slice(0, 10)) {
    console.error(`  - ${slug} → ${id}`);
  }
  process.exit(1);
}

if (MIN_COVERAGE > 0 && pct < MIN_COVERAGE) {
  console.error(
    `Coverage ${pct}% is below --min-coverage=${MIN_COVERAGE}`
  );
  process.exit(1);
}

if (STRICT && unmapped.length > 0) {
  process.exit(1);
}
