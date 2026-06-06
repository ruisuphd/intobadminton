#!/usr/bin/env node
/**
 * Run owner-maintained performance baseline guards in one operator command:
 * CrUX field-data CSV structure/thresholds and GSC performance CSV sanity.
 *
 * Usage:
 *   node scripts/performance-baselines.mjs
 *   node scripts/performance-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  { name: "crux", script: "scripts/crux-baseline.mjs", args: ["validate"] },
  { name: "gsc", script: "scripts/gsc-baseline.mjs", args: ["validate"] },
];

function usage() {
  console.log(`Usage:
  node scripts/performance-baselines.mjs   Run CrUX + GSC baseline guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[performance-baselines] → ${guard.name}`);
  execFileSync("node", ["--experimental-strip-types", guard.script, ...guard.args], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

console.log("\n[performance-baselines] all guards passed");
