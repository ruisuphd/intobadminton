#!/usr/bin/env node
/**
 * Reports review articles without a catalogue mapping in
 * `src/data/blog-review-product-map.json`.
 *
 * Explainer slugs in `src/data/explainer-review-slugs.json` are intentional
 * (no single catalogue SKU) and excluded from actionable unmapped counts.
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
const explainerSlugs = new Set(
  JSON.parse(
    readFileSync(resolve(ROOT, "src/data/explainer-review-slugs.json"), "utf8")
  )
);
const catalogIds = new Set(products.map((p) => p.id));

const slugs = articles.map((a) => a.slug);
const mapped = new Set(Object.keys(map));
const unmapped = slugs.filter((slug) => !mapped.has(slug));
const actionableUnmapped = unmapped.filter((slug) => !explainerSlugs.has(slug));
const intentionalUnmapped = unmapped.filter((slug) => explainerSlugs.has(slug));

const mappableTotal = slugs.length - explainerSlugs.size;
const pct = mappableTotal
  ? Math.round((mapped.size / mappableTotal) * 100)
  : 0;

console.log(
  `Review product map: ${mapped.size}/${mappableTotal} mappable slugs mapped (${pct}%)`
);
console.log(
  `Intentional explainer slugs without map: ${intentionalUnmapped.length}`
);

if (actionableUnmapped.length > 0) {
  console.log(`Unmapped (${actionableUnmapped.length}):`);
  for (const slug of actionableUnmapped.slice(0, 20)) {
    console.log(`  - ${slug}`);
  }
  if (actionableUnmapped.length > 20) {
    console.log(`  … and ${actionableUnmapped.length - 20} more`);
  }
}

if (intentionalUnmapped.length > 0 && actionableUnmapped.length === 0) {
  console.log("Explainer slugs (intentional, no product map):");
  for (const slug of intentionalUnmapped) {
    console.log(`  - ${slug}`);
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

if (STRICT && actionableUnmapped.length > 0) {
  process.exit(1);
}
