#!/usr/bin/env node
/**
 * Validate three-way grip editorial exit parity across PDP, catalog, and
 * commercial `/best/grips/` golden profiles.
 *
 * Usage:
 *   node scripts/grip-editorial-parity.mjs
 *   node scripts/grip-editorial-parity.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/grip-editorial-parity.mjs   Run grip editorial three-way parity guard
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
    "src/lib/grip-editorial-parity.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
