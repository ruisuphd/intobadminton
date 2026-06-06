#!/usr/bin/env node
/**
 * Guard verified catalogue imagery on tier-4 budget landing SKUs.
 *
 * Usage:
 *   node scripts/tier4-image-baseline.mjs
 *   node scripts/tier4-image-baseline.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/tier4-image-baseline.mjs   Run tier-4 image baseline guard
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

execFileSync(
  "npx",
  [
    "vitest",
    "run",
    "src/lib/tier4-image-baseline.test.ts",
    "-t",
    "passes tier-4 image baseline",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
