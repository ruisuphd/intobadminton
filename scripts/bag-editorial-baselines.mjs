#!/usr/bin/env node
/**
 * Run all bag editorial regression guards in one operator command:
 * catalog exits, commercial exits, and three-way PDP parity.
 *
 * Usage:
 *   node scripts/bag-editorial-baselines.mjs
 *   node scripts/bag-editorial-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  {
    name: "catalog bag editorial exits",
    script: "scripts/catalog-bag-baseline.mjs",
  },
  {
    name: "commercial bag editorial exits",
    script: "scripts/commercial-bag-baseline.mjs",
  },
  {
    name: "bag editorial three-way parity",
    script: "scripts/bag-editorial-parity.mjs",
  },
];

function usage() {
  console.log(`Usage:
  node scripts/bag-editorial-baselines.mjs   Run bag editorial golden-profile guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[bag-editorial-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[bag-editorial-baselines] all guards passed");
