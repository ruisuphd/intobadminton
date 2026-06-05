#!/usr/bin/env node
/**
 * Run all editorial regression guards in one operator command:
 * review→product map, catalogue PDP, best-of, and compare-guides golden profiles.
 *
 * Usage:
 *   node scripts/editorial-baselines.mjs
 *   node scripts/editorial-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  {
    name: "review product map",
    script: "scripts/review-product-map-baseline.mjs",
  },
  {
    name: "PDP golden profiles",
    script: "scripts/pdp-baseline.mjs",
  },
  {
    name: "best-of golden profiles",
    script: "scripts/best-baseline.mjs",
  },
  {
    name: "compare-guides golden profiles",
    script: "scripts/compare-guides-baseline.mjs",
  },
];

function usage() {
  console.log(`Usage:
  node scripts/editorial-baselines.mjs   Run editorial golden-profile guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[editorial-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[editorial-baselines] all guards passed");
