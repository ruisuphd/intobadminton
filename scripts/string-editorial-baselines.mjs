#!/usr/bin/env node
/**
 * Run all string editorial regression guards in one operator command:
 * catalog exits, commercial exits, and three-way PDP parity.
 *
 * Usage:
 *   node scripts/string-editorial-baselines.mjs
 *   node scripts/string-editorial-baselines.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const GUARDS = [
  {
    name: "catalog string editorial exits",
    script: "scripts/catalog-string-baseline.mjs",
  },
  {
    name: "commercial string editorial exits",
    script: "scripts/commercial-string-baseline.mjs",
  },
  {
    name: "string editorial three-way parity",
    script: "scripts/string-editorial-parity.mjs",
  },
];

function usage() {
  console.log(`Usage:
  node scripts/string-editorial-baselines.mjs   Run string editorial golden-profile guards
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const guard of GUARDS) {
  console.log(`\n[string-editorial-baselines] → ${guard.name}`);
  execFileSync("node", [guard.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[string-editorial-baselines] all guards passed");
