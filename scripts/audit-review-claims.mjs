#!/usr/bin/env node
/**
 * Passes 12–13: extract spec-like claims from reviews and flag drift vs products.json.
 * Writes scripts/review-claims-manifest.json
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const articles = JSON.parse(
  readFileSync(`${ROOT}/src/data/blog-articles.json`, "utf8")
);
const products = JSON.parse(
  readFileSync(`${ROOT}/src/data/products.json`, "utf8")
);
const map = JSON.parse(
  readFileSync(`${ROOT}/src/data/blog-review-product-map.json`, "utf8")
);

const byId = new Map(products.map((p) => [p.id, p]));

const FLEX_PATTERNS = [
  { re: /extra[- ]?stiff/i, catalog: "extra_stiff" },
  { re: /\bstiff\b/i, catalog: "stiff" },
  { re: /\bmedium\b/i, catalog: "medium" },
  { re: /\bflex(?:ible)?\b/i, catalog: "flexible" },
];

function extractClaims(text) {
  const claims = [];
  for (const { re, catalog } of FLEX_PATTERNS) {
    if (re.test(text)) claims.push({ type: "shaftFlex", value: catalog });
  }
  const tension = text.match(/(\d{2})\s*[–-]\s*(\d{2})\s*lb/gi);
  if (tension) claims.push({ type: "tensionMention", value: tension.join("; ") });
  const weight = text.match(/(\d{2,3})\s*g\b/gi);
  if (weight) claims.push({ type: "weightMention", value: weight.slice(0, 3).join("; ") });
  return claims;
}

const manifest = [];
const drift = [];

for (const article of articles) {
  const blob = [
    article.title,
    article.dek,
    article.verdict,
    ...(article.sections ?? []).map((s) => `${s.heading}\n${s.body}`),
    article.comparison
      ? JSON.stringify(article.comparison)
      : "",
  ].join("\n");
  const productId =
    article.relatedReviewProductId ?? map[article.slug];
  const extracted = extractClaims(blob);
  manifest.push({
    slug: article.slug,
    productId: productId ?? null,
    claimCount: extracted.length,
    claims: extracted,
  });

  if (!productId) continue;
  const row = byId.get(productId);
  if (!row || row.category !== "racket") continue;

  const nameNeedle = row.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const flexToken = "(extra[- ]?stiff|stiff|medium|flexible)";
  const specPatterns = [
    new RegExp(
      `${nameNeedle}[\\s\\S]{0,220}shaft\\s+stiffness\\s+${flexToken}\\b`,
      "i"
    ),
    new RegExp(
      `${nameNeedle}[\\s\\S]{0,220}shaft\\s+flex\\s+${flexToken}\\b`,
      "i"
    ),
    new RegExp(
      `shaft\\s+stiffness\\s+${flexToken}\\b[\\s\\S]{0,80}${nameNeedle}`,
      "i"
    ),
  ];
  let nearMatch = null;
  for (const re of specPatterns) {
    const m = blob.match(re);
    if (m) {
      nearMatch = m;
      break;
    }
  }
  if (nearMatch) {
    const phrase = nearMatch[1].toLowerCase();
    let articleFlex;
    if (/extra/.test(phrase)) articleFlex = "extra_stiff";
    else if (phrase === "stiff") articleFlex = "stiff";
    else if (phrase === "medium") articleFlex = "medium";
    else articleFlex = "flexible";
    if (articleFlex !== row.shaftFlex) {
      const severity =
        article.slug.includes("-vs-") || article.slug.includes("vs-")
          ? "P1"
          : "P0";
      drift.push({
        slug: article.slug,
        productId,
        field: "shaftFlex",
        article: articleFlex,
        catalog: row.shaftFlex,
        severity,
      });
    }
  }
}

writeFileSync(
  `${ROOT}/scripts/review-claims-manifest.json`,
  JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), manifest, drift }, null, 2)
);

const p0 = drift.filter((d) => d.severity === "P0");
if (p0.length) {
  console.error(`review-claims: ${p0.length} P0 drift`);
  for (const d of p0.slice(0, 20)) {
    console.error(`  ${d.slug}: ${d.field} article=${d.article} catalog=${d.catalog}`);
  }
  process.exit(1);
}

if (drift.length) {
  console.warn(`review-claims: ${drift.length} P1 drift (non-blocking)`);
  for (const d of drift.slice(0, 15)) {
    console.warn(`  ${d.slug}: ${d.field} article=${d.article} catalog=${d.catalog}`);
  }
} else {
  console.log("review-claims: no flex drift detected");
}
console.log(`review-claims manifest: ${manifest.length} articles`);
