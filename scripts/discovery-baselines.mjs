#!/usr/bin/env node
/**
 * Run all discovery regression guards in one operator command:
 * site search, catalog keyword, and search↔catalog parity.
 *
 * Usage:
 *   node scripts/discovery-baselines.mjs
 *   node scripts/discovery-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  { name: "site search", script: "scripts/search-baseline.mjs" },
  { name: "catalog keyword", script: "scripts/catalog-baseline.mjs" },
  { name: "discovery parity", script: "scripts/discovery-parity.mjs" },
  { name: "homepage golden profiles", script: "scripts/home-baseline.mjs" },
];

function usage() {
  console.log(`Usage:
  node scripts/discovery-baselines.mjs   Run search + catalog + parity guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[discovery-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[discovery-baselines] all guards passed");
