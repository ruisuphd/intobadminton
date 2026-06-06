#!/usr/bin/env node
/**
 * Guard catalogue productId linkage on commercial /best/* landings.
 *
 * Usage:
 *   node scripts/best-product-id-coverage.mjs
 *   node scripts/best-product-id-coverage.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/best-product-id-coverage.mjs   Run best-of productId coverage guard
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
    "src/lib/best-product-id-coverage.test.ts",
    "-t",
    "passes productId",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
