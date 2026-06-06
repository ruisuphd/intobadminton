#!/usr/bin/env node
/**
 * Validate homepage golden profiles against discovery wiring.
 *
 * Usage:
 *   node scripts/home-baseline.mjs
 *   node scripts/home-baseline.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/home-baseline.mjs   Run homepage golden-profile guard
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
    "src/lib/home-baseline.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
