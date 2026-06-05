#!/usr/bin/env node
/**
 * Validate `/compare-guides/*` golden profiles against catalog exit wiring.
 *
 * Usage:
 *   node scripts/compare-guides-baseline.mjs
 *   node scripts/compare-guides-baseline.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/compare-guides-baseline.mjs   Run compare-guides golden-profile guard
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
    "src/lib/compare-guides-baseline.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
