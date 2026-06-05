#!/usr/bin/env node
/**
 * Validate on-site search golden queries against the live index.
 *
 * Uses Vitest so `@/` path aliases and the full search index graph resolve
 * the same way as unit tests.
 *
 * Usage:
 *   node scripts/search-baseline.mjs
 *   node scripts/search-baseline.mjs --help
 */
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage:
  node scripts/search-baseline.mjs   Run golden-query regression guard
`);
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  usage();
  process.exit(0);
}

execFileSync(
  "npx",
  ["vitest", "run", "src/lib/search-baseline.test.ts", "-t", "passes all committed"],
  { cwd: ROOT, stdio: "inherit" }
);
