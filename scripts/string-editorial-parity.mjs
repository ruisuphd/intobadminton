#!/usr/bin/env node
/**
 * Validate three-way string editorial exit parity across PDP, catalog, and
 * commercial `/best/strings/` golden profiles.
 *
 * Usage:
 *   node scripts/string-editorial-parity.mjs
 *   node scripts/string-editorial-parity.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/string-editorial-parity.mjs   Run string editorial three-way parity guard
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
    "src/lib/string-editorial-parity.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
