#!/usr/bin/env node
/**
 * Validate catalogue PDP golden profiles against the live product index.
 *
 * Usage:
 *   node scripts/pdp-baseline.mjs
 *   node scripts/pdp-baseline.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/pdp-baseline.mjs   Run PDP golden-profile guard
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
    "src/lib/pdp-baseline.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
