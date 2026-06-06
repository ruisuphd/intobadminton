#!/usr/bin/env node
/**
 * Sync `docs/baselines/reviews-queries.json` with the full mapped review corpus.
 *
 * Preserves existing rows (e2e flags, notes, custom patterns). Appends auto-generated
 * rows for any mapped slug missing from the baseline.
 *
 * Usage:
 *   node scripts/sync-reviews-baseline.mjs
 *   node scripts/sync-reviews-baseline.mjs --dry-run
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");

const baselinePath = resolve(ROOT, "docs/baselines/reviews-queries.json");
const map = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/blog-review-product-map.json"), "utf8")
);
const products = JSON.parse(
  readFileSync(resolve(ROOT, "src/data/products.json"), "utf8")
);
const explainerSlugs = new Set(
  JSON.parse(
    readFileSync(resolve(ROOT, "src/data/explainer-review-slugs.json"), "utf8")
  )
);

const productById = new Map(products.map((p) => [p.id, p]));

function catalogHrefFromProduct(product) {
  const params = new URLSearchParams();
  if (product.category) params.set("cat", product.category);
  if (product.brand?.trim()) params.set("brand", product.brand.trim());
  const qs = params.toString();
  return qs ? `/catalog/?${qs}` : "/catalog/";
}

function catalogLinkPatternFromProduct(product) {
  const brand = product.brand?.trim();
  if (brand) return `browse ${brand.toLowerCase()}`;
  return "browse";
}

const REVIEW_ELIGIBLE_CATEGORIES = new Set([
  "racket",
  "shoes",
  "shuttle",
  "string",
]);

function makeAutoRow(slug, productId) {
  const product = productById.get(productId);
  if (!product) {
    throw new Error(`missing product "${productId}" for slug "${slug}"`);
  }
  const row = {
    id: slug,
    slug,
    expectCatalogHref: catalogHrefFromProduct(product),
    expectMinRelatedReading: 3,
    note: "Auto-synced mapped corpus row — Sprint 61",
  };
  if (REVIEW_ELIGIBLE_CATEGORIES.has(product.category)) {
    row.expectProductId = productId;
    row.expectEquipmentFinderPanel = true;
    row.expectCatalogLinkPattern = catalogLinkPatternFromProduct(product);
  }
  return row;
}

const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
const existingBySlug = new Map(
  baseline.queries.map((row) => [row.slug, row])
);

function normalizeRow(row) {
  if (!row.expectProductId) return row;
  const product = productById.get(row.expectProductId);
  if (!product || REVIEW_ELIGIBLE_CATEGORIES.has(product.category)) return row;
  const { expectProductId, expectEquipmentFinderPanel, expectCatalogLinkPattern, ...rest } =
    row;
  return rest;
}

const hubRow = baseline.queries.find((q) => q.slug === "index");
const manualRows = baseline.queries
  .filter((q) => q.slug !== "index" && existingBySlug.has(q.slug))
  .map(normalizeRow);

const mappedSlugs = Object.keys(map).sort();
const missing = mappedSlugs.filter((slug) => !existingBySlug.has(slug));
const autoRows = missing.map((slug) => makeAutoRow(slug, map[slug]));

const explainerRows = baseline.queries.filter(
  (q) => q.slug !== "index" && q.expectUnmapped
);

const mergedArticleRows = [
  ...manualRows,
  ...autoRows.sort((a, b) => a.slug.localeCompare(b.slug)),
];

const queries = [hubRow, ...mergedArticleRows, ...explainerRows.filter(
  (q) => !mergedArticleRows.some((r) => r.slug === q.slug)
)];

const articleCount = queries.filter((q) => q.slug !== "index").length;

const next = {
  ...baseline,
  updated: new Date().toISOString().slice(0, 10),
  coverage: {
    ...baseline.coverage,
    minArticleSlugs: articleCount,
    requireFullMappedParity: true,
  },
  queries,
};

console.log(
  `reviews baseline: ${manualRows.length} manual + ${autoRows.length} auto = ${articleCount} article rows`
);
console.log(`mapped corpus: ${mappedSlugs.length}, explainers: ${explainerSlugs.size}`);

if (dryRun) {
  console.log("dry-run — no file written");
  process.exit(0);
}

writeFileSync(baselinePath, `${JSON.stringify(next, null, 2)}\n`);
console.log(`wrote ${baselinePath}`);
