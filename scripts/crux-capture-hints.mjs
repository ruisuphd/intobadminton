#!/usr/bin/env node
/**
 * Print PageSpeed Insights capture links for every URL in crux-template.csv.
 * Owner pastes LCP / INP / CLS from the CrUX section into the CSV rows.
 *
 * Usage:
 *   node scripts/crux-capture-hints.mjs
 *   node scripts/crux-capture-hints.mjs --help
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATE = resolve(ROOT, "docs/baselines/crux-template.csv");

function usage() {
  console.log(`Usage:
  node scripts/crux-capture-hints.mjs   Print PSI links for crux-template.csv URLs

After capture, paste mobile field LCP / INP / CLS into docs/baselines/crux-template.csv
then run: npm run lint:crux-baseline
`);
}

function psiUrl(pageUrl, device) {
  const formFactor = device === "desktop" ? "desktop" : "mobile";
  const params = new URLSearchParams({
    url: pageUrl,
    form_factor: formFactor,
  });
  return `https://pagespeed.web.dev/analysis?${params.toString()}`;
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

const lines = readFileSync(TEMPLATE, "utf8").trim().split(/\r?\n/);
const rows = lines.slice(1).filter((line) => line.trim());

if (rows.length === 0) {
  console.error("[crux-capture-hints] crux-template.csv has no data rows");
  process.exit(1);
}

console.log("[crux-capture-hints] PageSpeed Insights links for docs/baselines/crux-template.csv\n");

for (const line of rows) {
  const [url, device] = line.split(",").map((cell) => cell.trim());
  if (!url) continue;
  console.log(`${url} (${device})`);
  console.log(`  ${psiUrl(url, device)}\n`);
}

console.log(
  "Paste origin field-data LCP (ms), INP (ms), and CLS into the matching CSV row."
);
console.log("Validate: npm run lint:crux-baseline");
