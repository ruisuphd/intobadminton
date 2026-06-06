#!/usr/bin/env node
/**
 * Run all regression guards in one operator command:
 * product funnel (discovery, finder, results, compare) and editorial
 * (review map, PDP golden profiles).
 *
 * Usage:
 *   node scripts/all-baselines.mjs
 *   node scripts/all-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  { name: "product funnel", script: "scripts/product-funnel-baselines.mjs" },
  { name: "editorial", script: "scripts/editorial-baselines.mjs" },
  { name: "performance", script: "scripts/performance-baselines.mjs" },
];

function usage() {
  console.log(`Usage:
  node scripts/all-baselines.mjs   Run all golden-profile regression guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[all-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[all-baselines] all guards passed");
