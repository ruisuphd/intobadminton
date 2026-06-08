#!/usr/bin/env node
/**
 * Validate grip SKU commercial editorial exit golden profiles.
 *
 * Usage:
 *   node scripts/commercial-grip-baseline.mjs
 *   node scripts/commercial-grip-baseline.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/commercial-grip-baseline.mjs   Run commercial grip golden-profile guard
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
    "src/lib/commercial-grip-baseline.test.ts",
    "-t",
    "passes all committed",
  ],
  { cwd: ROOT, stdio: "inherit" }
);
