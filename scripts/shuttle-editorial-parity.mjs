#!/usr/bin/env node
/**
 * Validate three-way shuttle editorial exit parity across PDP, catalog, and
 * commercial `/best/shuttles/` golden profiles.
 *
 * Usage:
 *   node scripts/shuttle-editorial-parity.mjs
 *   node scripts/shuttle-editorial-parity.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/shuttle-editorial-parity.mjs   Run shuttle editorial three-way parity guard
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
    "src/lib/shuttle-editorial-parity.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
