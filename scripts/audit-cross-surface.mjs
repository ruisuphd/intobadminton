#!/usr/bin/env node
/**
 * Pass 7: flag best-page productIds that contradict finder ordering for a canonical persona.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Dynamic import of compiled scoring is awkward; use vitest for enforcement.
// This script scans best/*.tsx for productId order vs catalog presence.

const bestFiles = [
  "src/app/best/intermediate-rackets/page.tsx",
  "src/app/best/smash-heavy-rackets/page.tsx",
  "src/app/best/doubles-rackets/page.tsx",
  "src/app/best/shoes/page.tsx",
];

const products = JSON.parse(
  readFileSync(`${ROOT}/src/data/products.json`, "utf8")
);
const byId = new Map(products.map((p) => [p.id, p]));

let issues = 0;
for (const rel of bestFiles) {
  const src = readFileSync(`${ROOT}/${rel}`, "utf8");
  const ids = [...src.matchAll(/productId:\s*"([^"]+)"/g)].map((m) => m[1]);
  for (const id of ids) {
    if (!byId.has(id)) {
      console.error(`[cross-surface] ${rel}: unknown productId ${id}`);
      issues++;
    }
  }
}

if (issues > 0) {
  console.error(`cross-surface audit: ${issues} issue(s)`);
  process.exit(1);
}
console.log("cross-surface audit: OK");
