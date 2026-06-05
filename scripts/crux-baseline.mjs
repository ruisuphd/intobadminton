#!/usr/bin/env node
/**
 * Validate owner-maintained CrUX field-data CSV.
 *
 * Usage:
 *   node scripts/crux-baseline.mjs validate [path]
 *   node scripts/crux-baseline.mjs --help
 *
 * Default path: docs/baselines/crux-template.csv
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_PATH = resolve(ROOT, "docs/baselines/crux-template.csv");

function usage() {
  console.log(`Usage:
  node scripts/crux-baseline.mjs validate [csv-path]   Validate structure and CWV thresholds
`);
}

async function loadValidator() {
  const mod = await import("../src/lib/crux-baseline.ts");
  return mod;
}

async function validate(csvPath) {
  const { validateCruxCsv, formatCruxValidationErrors } = await loadValidator();
  const content = readFileSync(csvPath, "utf8");
  const result = validateCruxCsv(content);

  if (!result.hasFieldData) {
    console.log(
      `[crux-baseline] ${csvPath.replace(ROOT + "/", "")}: structure ok (metrics empty — fill from PageSpeed Insights)`
    );
  } else if (result.ok) {
    console.log(
      `[crux-baseline] ${csvPath.replace(ROOT + "/", "")}: field data within good CWV thresholds`
    );
  }

  if (!result.ok) {
    console.error("[crux-baseline] validation failed:");
    console.error(formatCruxValidationErrors(result));
    process.exit(1);
  }
}

const cmd = process.argv[2];
if (cmd === "--help" || cmd === "-h") {
  usage();
} else if (cmd === "validate") {
  const csvPath = resolve(ROOT, process.argv[3] ?? DEFAULT_PATH);
  await validate(csvPath);
} else {
  usage();
  process.exit(cmd ? 1 : 0);
}
