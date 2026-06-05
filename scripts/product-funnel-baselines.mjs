#!/usr/bin/env node
/**
 * Run all product-funnel regression guards in one operator command:
 * discovery (search + catalog + parity), finder scoring, results share URLs,
 * and compare share URLs.
 *
 * Usage:
 *   node scripts/product-funnel-baselines.mjs
 *   node scripts/product-funnel-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  { name: "discovery baselines", script: "scripts/discovery-baselines.mjs" },
  { name: "finder golden profiles", script: "scripts/finder-baseline.mjs" },
  { name: "results share URLs", script: "scripts/results-url-baseline.mjs" },
  { name: "compare share URLs", script: "scripts/compare-baseline.mjs" },
];

function usage() {
  console.log(`Usage:
  node scripts/product-funnel-baselines.mjs   Run discovery + finder + results + compare URL guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[product-funnel-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[product-funnel-baselines] all guards passed");
