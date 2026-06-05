#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(
  readFileSync(join(root, "src/data/products.json"), "utf8")
);
const categories = ["racket", "shoes", "string", "bag", "shuttle", "grip"];
const counts = { total: products.length };
for (const category of categories) {
  counts[category] = products.filter((p) => p.category === category).length;
}
writeFileSync(
  join(root, "src/data/catalog-stats.json"),
  `${JSON.stringify(counts)}\n`
);
console.log("[catalog-stats]", counts);
