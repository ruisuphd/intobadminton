#!/usr/bin/env node
/**
 * Run all grip editorial regression guards in one operator command:
 * catalog exits, commercial exits, and three-way PDP parity.
 *
 * Usage:
 *   node scripts/grip-editorial-baselines.mjs
 *   node scripts/grip-editorial-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  {
    name: "catalog grip editorial exits",
    script: "scripts/catalog-grip-baseline.mjs",
  },
  {
    name: "commercial grip editorial exits",
    script: "scripts/commercial-grip-baseline.mjs",
  },
  {
    name: "grip editorial three-way parity",
    script: "scripts/grip-editorial-parity.mjs",
  },
];

function usage() {
  console.log(`Usage:
  node scripts/grip-editorial-baselines.mjs   Run grip editorial golden-profile guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[grip-editorial-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[grip-editorial-baselines] all guards passed");
