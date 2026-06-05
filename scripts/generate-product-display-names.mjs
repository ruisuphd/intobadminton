#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(
  readFileSync(join(root, "src/data/products.json"), "utf8")
);
const names = Object.fromEntries(products.map((p) => [p.id, p.name]));
writeFileSync(
  join(root, "src/data/product-display-names.json"),
  `${JSON.stringify(names)}\n`
);
console.log(`[product-display-names] wrote ${Object.keys(names).length} entries`);
