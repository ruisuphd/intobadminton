#!/usr/bin/env node
/**
 * Run all shuttle editorial regression guards in one operator command:
 * catalog exits, commercial exits, and three-way PDP parity.
 *
 * Usage:
 *   node scripts/shuttle-editorial-baselines.mjs
 *   node scripts/shuttle-editorial-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  {
    name: "catalog shuttle editorial exits",
    script: "scripts/catalog-shuttle-baseline.mjs",
  },
  {
    name: "commercial shuttle editorial exits",
    script: "scripts/commercial-shuttle-baseline.mjs",
  },
  {
    name: "shuttle editorial three-way parity",
    script: "scripts/shuttle-editorial-parity.mjs",
  },
];

function usage() {
  console.log(`Usage:
  node scripts/shuttle-editorial-baselines.mjs   Run shuttle editorial golden-profile guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[shuttle-editorial-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[shuttle-editorial-baselines] all guards passed");
