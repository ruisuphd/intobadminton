#!/usr/bin/env node
/**
 * Validate product-intent search routing ↔ catalogue filter parity.
 *
 * Usage:
 *   node scripts/discovery-parity.mjs
 *   node scripts/discovery-parity.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/discovery-parity.mjs   Run discovery parity regression guard
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
    "src/lib/discovery-parity.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
