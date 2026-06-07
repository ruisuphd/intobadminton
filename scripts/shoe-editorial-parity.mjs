#!/usr/bin/env node
/**
 * Validate three-way shoe editorial exit parity across PDP, catalog, and
 * commercial `/best/shoes/` golden profiles.
 *
 * Usage:
 *   node scripts/shoe-editorial-parity.mjs
 *   node scripts/shoe-editorial-parity.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/shoe-editorial-parity.mjs   Run shoe editorial three-way parity guard
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
    "src/lib/shoe-editorial-parity.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
