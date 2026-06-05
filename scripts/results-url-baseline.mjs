#!/usr/bin/env node
/**
 * Validate sharable /results/ URL golden profiles against the live scoring engine.
 *
 * Usage:
 *   node scripts/results-url-baseline.mjs
 *   node scripts/results-url-baseline.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/results-url-baseline.mjs   Run results URL regression guard
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
    "src/lib/results-url-baseline.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
