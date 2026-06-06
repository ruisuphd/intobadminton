#!/usr/bin/env node
/**
 * Print owner capture hints for CrUX and GSC baseline CSVs.
 *
 * Usage:
 *   node scripts/performance-capture-hints.mjs
 *   node scripts/performance-capture-hints.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const HINTS = [
  { name: "crux", script: "scripts/crux-capture-hints.mjs" },
  { name: "gsc", script: "scripts/gsc-capture-hints.mjs" },
];

function usage() {
  console.log(`Usage:
  node scripts/performance-capture-hints.mjs   Print CrUX + GSC owner capture steps
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

for (const hint of HINTS) {
  console.log(`\n[performance-capture-hints] → ${hint.name}`);
  execFileSync("node", [hint.script], { cwd: ROOT, stdio: "inherit" });
}

console.log("\n[performance-capture-hints] done — fill CSVs then npm run lint:performance-baselines");
