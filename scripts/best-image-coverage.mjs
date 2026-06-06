#!/usr/bin/env node
/**
 * Guard verified manufacturer imagery on commercial /best/* landings.
 *
 * Usage:
 *   node scripts/best-image-coverage.mjs
 *   node scripts/best-image-coverage.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/best-image-coverage.mjs   Run best-of image coverage guard
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

execFileSync(
  "npx",
  ["vitest", "run", "src/lib/best-image-coverage.test.ts", "-t", "passes verified"],
  { cwd: ROOT, stdio: "inherit" }
);
