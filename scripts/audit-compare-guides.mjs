#!/usr/bin/env node
/**
 * Pass 16: compare-guide TSX productId + spec bullets vs products.json.
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = `${ROOT}/src/app/compare-guides`;
const products = JSON.parse(
  readFileSync(`${ROOT}/src/data/products.json`, "utf8")
);
const byId = new Map(products.map((p) => [p.id, p]));

const FLEX_WORDS = {
  flexible: /\bflex(?:ible)?\b/i,
  medium: /\bmedium\b/i,
  stiff: /\b(?:extra[- ]?stiff|extra stiff)\b/i,
  extra_stiff: /\b(?:extra[- ]?stiff|extra stiff)\b/i,
};

function humanFlex(f) {
  return f.replace(/_/g, " ");
}

const issues = [];
const pages = readdirSync(guidesDir).filter(
  (d) => d !== "page.tsx" && !d.startsWith(".")
);

for (const dir of pages) {
  const pagePath = join(guidesDir, dir, "page.tsx");
  let src;
  try {
    src = readFileSync(pagePath, "utf8");
  } catch {
    continue;
  }
  const productIds = [
    ...src.matchAll(/productId:\s*"([^"]+)"/g),
  ].map((m) => m[1]);
  for (const id of productIds) {
    const row = byId.get(id);
    if (!row) {
      issues.push(`${dir}: unknown productId ${id}`);
      continue;
    }
    if (row.category === "racket") {
      const block = src.includes(`productId: "${id}"`)
        ? src.slice(src.indexOf(`productId: "${id}"`), src.indexOf(`productId: "${id}"`) + 1200)
        : "";
      const flex = row.shaftFlex;
      if (flex === "extra_stiff" && /\bstiff\b/i.test(block) && !/extra[- ]?stiff/i.test(block)) {
        issues.push(
          `${dir}: ${id} catalog extra_stiff but compare copy may say stiff only`
        );
      }
      const tensionMax = row.commonStringTensionLbs?.max;
      if (tensionMax && block) {
        const m = block.match(/(\d{2})\s*[–-]\s*(\d{2})\s*lb/i);
        if (m && Number(m[2]) !== tensionMax) {
          issues.push(
            `${dir}: ${id} tension max in copy ${m[2]} vs catalog ${tensionMax}`
          );
        }
      }
    }
  }
}

if (issues.length) {
  console.warn(`compare-guides audit: ${issues.length} warning(s)`);
  for (const i of issues) console.warn(`  ${i}`);
  // Warnings only until backlog cleared
  process.exit(0);
}
console.log(`compare-guides audit: OK (${pages.length} pages)`);
