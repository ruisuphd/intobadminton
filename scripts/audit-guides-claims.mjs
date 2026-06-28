#!/usr/bin/env node
/**
 * Pass 11 + 17: cross-check guide TSX prose against content/claims.json keywords.
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const claims = JSON.parse(
  readFileSync(`${ROOT}/content/claims.json`, "utf8")
);
const guidesDir = `${ROOT}/src/app/guides`;

const issues = [];
for (const entry of readdirSync(guidesDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "glossary") continue;
  const pagePath = join(guidesDir, entry.name, "page.tsx");
  let src;
  try {
    src = readFileSync(pagePath, "utf8");
  } catch {
    continue;
  }
  if (/13\.4\s*m/i.test(src) && !claims.some((c) => String(c.value).includes("13.4"))) {
    issues.push(`${entry.name}: court dimension may not match claims.json`);
  }
}

if (issues.length) {
  console.warn(`guides-claims: ${issues.length} warning(s)`);
  for (const i of issues) console.warn(`  ${i}`);
} else {
  console.log("guides-claims: OK");
}
