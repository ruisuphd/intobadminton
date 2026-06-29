#!/usr/bin/env node
/**
 * Pass 8: validate products.json schema completeness per category.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(
  readFileSync(`${ROOT}/src/data/products.json`, "utf8")
);

const BASE = [
  "id",
  "category",
  "name",
  "brand",
  "priceUsd",
  "regionAvailability",
  "officialSourceUrl",
  "lastVerifiedAt",
  "verificationStatus",
  "minRecommendedLevel",
  "maxRecommendedLevel",
  "bestFor",
  "sourceUrls",
];

const BY_CATEGORY = {
  racket: ["headWeight", "shaftFlex", "weightVariants"],
  string: ["gaugeMm", "feel", "repulsion", "durability"],
  shoes: ["fitWidth", "cushioning", "stability"],
  bag: ["capacityRackets", "sizeClass"],
  shuttle: ["feathered", "material", "unitsPerTube", "durabilityTier"],
  grip: ["gripType", "feel", "sweatAbsorption", "packCount"],
};

const LEVEL_ORDER = ["recreational", "club", "competitive", "pro_oriented"];
const SHAFT = ["flexible", "medium", "stiff", "extra_stiff"];

const issues = [];

for (const p of products) {
  for (const f of BASE) {
    if (p[f] == null) issues.push(`${p.id}: missing ${f}`);
  }
  const extra = BY_CATEGORY[p.category] ?? [];
  for (const f of extra) {
    if (p[f] == null) issues.push(`${p.id}: missing ${f} (${p.category})`);
  }
  const minI = LEVEL_ORDER.indexOf(p.minRecommendedLevel);
  const maxI = LEVEL_ORDER.indexOf(p.maxRecommendedLevel);
  if (minI < 0 || maxI < 0 || minI > maxI) {
    issues.push(`${p.id}: invalid level band`);
  }
  try {
    new URL(p.officialSourceUrl);
  } catch {
    issues.push(`${p.id}: bad officialSourceUrl`);
  }
  if (p.category === "racket" && !SHAFT.includes(p.shaftFlex)) {
    issues.push(`${p.id}: bad shaftFlex ${p.shaftFlex}`);
  }
}

const MIN = { racket: 30, shoes: 15, string: 5, shuttle: 3, grip: 5, bag: 2 };
const counts = {};
for (const p of products) counts[p.category] = (counts[p.category] ?? 0) + 1;
for (const [cat, min] of Object.entries(MIN)) {
  if ((counts[cat] ?? 0) < min) {
    issues.push(`category ${cat}: ${counts[cat] ?? 0} < ${min}`);
  }
}

if (issues.length) {
  console.error(`catalog schema: ${issues.length} issue(s)`);
  for (const i of issues.slice(0, 30)) console.error(`  ${i}`);
  if (issues.length > 30) console.error(`  ... and ${issues.length - 30} more`);
  process.exit(1);
}
console.log(`catalog schema: OK (${products.length} products)`);
