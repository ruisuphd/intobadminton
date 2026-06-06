#!/usr/bin/env node
/**
 * Print owner steps for filling docs/baselines/gsc-template.csv from Search Console.
 *
 * Usage:
 *   node scripts/gsc-capture-hints.mjs
 *   node scripts/gsc-capture-hints.mjs --help
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATE = resolve(ROOT, "docs/baselines/gsc-template.csv");
const BASELINE_JSON = resolve(ROOT, "docs/baselines/gsc-performance-baseline.json");

function usage() {
  console.log(`Usage:
  node scripts/gsc-capture-hints.mjs   Print GSC export steps for gsc-template.csv

After capture, run: npm run lint:gsc-baseline
Optional regression guard: npm run lint:gsc-baseline:compare
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

const header = readFileSync(TEMPLATE, "utf8").trim().split(/\r?\n/)[0];
console.log("[gsc-capture-hints] Google Search Console capture for gsc-template.csv\n");
console.log("1. Open https://search.google.com/search-console");
console.log("2. Property: https://intobadminton.com/");
console.log("3. Performance → filter Last 28 days (or match your reporting window)");
console.log("4. Copy site-wide totals into one CSV row:");
console.log(`   ${header}`);
console.log("5. Save to docs/baselines/gsc-template.csv (overwrite the placeholder row)");
console.log(
  "6. Optional: commit a snapshot to docs/baselines/gsc-performance-baseline.json for compare guard"
);

try {
  const baseline = JSON.parse(readFileSync(BASELINE_JSON, "utf8"));
  if (baseline.capturedAt) {
    console.log(`\nCommitted baseline captured: ${baseline.capturedAt}`);
    if (baseline.clicks != null) {
      console.log(
        `  clicks=${baseline.clicks} impressions=${baseline.impressions} ctr=${baseline.ctr} position=${baseline.position}`
      );
    }
  }
} catch {
  console.log("\nNo committed gsc-performance-baseline.json snapshot yet.");
}

console.log("\nValidate: npm run lint:gsc-baseline");
