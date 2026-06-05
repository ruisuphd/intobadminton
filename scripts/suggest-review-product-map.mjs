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
  const brandSlug = id
    .replace(/^yy-/, "yonex-")
    .replace(/^ln-/, "li-ning-")
    .replace(/^vic-/, "victor-");
  const core = id.replace(/^(yy-|ln-|vic-|bonny-|kumpoo-|asics-)/, "");
  return [id, brandSlug, core];
}

/** Strip editorial suffixes so `yonex-nanoflare-1000z-play-review` matches `yy-nanoflare-1000z`. */
function normalizeArticleSlug(slug) {
  return slug.replace(
    /-(review|deep-dive|complete-buying-guide|buying-guide)$/,
    ""
  );
}

/** Slug patterns that need editorial pairing beyond substring heuristics. */
const SLUG_OVERRIDES = {
  "yonex-nanoflare-1000z-play-review": "yy-nanoflare-1000-play",
};

function suggest(slug) {
  if (SLUG_OVERRIDES[slug]) return SLUG_OVERRIDES[slug];
  const normalized = normalizeArticleSlug(slug);
  let best = null;
  let bestLen = 0;
  for (const id of ids) {
    for (const variant of aliases(id)) {
      if (
        (slug.includes(variant) || normalized.includes(variant)) &&
        variant.length > bestLen
      ) {
        best = id;
        bestLen = variant.length;
      }
    }
  }
  return best;
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
