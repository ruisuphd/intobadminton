#!/usr/bin/env node
/**
 * Validate owner-maintained GSC performance CSV and optional regression guard.
 *
 * Usage:
 *   node scripts/gsc-baseline.mjs validate [path]
 *   node scripts/gsc-baseline.mjs compare [path]
 *   node scripts/gsc-baseline.mjs --help
 *
 * Default path: docs/baselines/gsc-template.csv
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_PATH = resolve(ROOT, "docs/baselines/gsc-template.csv");
const BASELINE_JSON = resolve(ROOT, "docs/baselines/gsc-performance-baseline.json");

function usage() {
  console.log(`Usage:
  node scripts/gsc-baseline.mjs validate [csv-path]   Validate structure and metric sanity
  node scripts/gsc-baseline.mjs compare [csv-path]    Fail when clicks/impressions drop >10% vs committed baseline
`);
}

async function loadValidator() {
  return import("../src/lib/gsc-baseline.ts");
}

async function validate(csvPath) {
  const { validateGscCsv, formatGscValidationErrors } = await loadValidator();
  const content = readFileSync(csvPath, "utf8");
  const result = validateGscCsv(content);

  if (!result.hasFieldData) {
    console.log(
      `[gsc-baseline] ${csvPath.replace(ROOT + "/", "")}: structure ok (metrics empty — fill from Search Console)`
    );
  } else if (result.ok) {
    console.log(
      `[gsc-baseline] ${csvPath.replace(ROOT + "/", "")}: field data passes sanity checks`
    );
  }

  if (!result.ok) {
    console.error("[gsc-baseline] validation failed:");
    console.error(formatGscValidationErrors(result));
    process.exit(1);
  }
}

async function compare(csvPath) {
  const {
    validateGscCsv,
    parseGscCsv,
    primaryGscSnapshot,
    compareGscSnapshots,
    formatGscValidationErrors,
    GSC_REGRESSION_TOLERANCE,
  } = await loadValidator();

  const content = readFileSync(csvPath, "utf8");
  const validation = validateGscCsv(content);
  if (!validation.ok) {
    console.error("[gsc-baseline] validation failed:");
    console.error(formatGscValidationErrors(validation));
    process.exit(1);
  }

  const { rows } = parseGscCsv(content);
  const current = primaryGscSnapshot(rows);
  if (!current) {
    console.log(
      "[gsc-baseline] compare skipped — CSV metrics empty (structure-only template)"
    );
    return;
  }

  if (!existsSync(BASELINE_JSON)) {
    console.log(
      "[gsc-baseline] compare skipped — no committed baseline at docs/baselines/gsc-performance-baseline.json"
    );
    return;
  }

  const baselineDoc = JSON.parse(readFileSync(BASELINE_JSON, "utf8"));
  const baseline = baselineDoc.metrics;
  if (!baseline?.clicks || !baseline?.impressions) {
    console.log(
      "[gsc-baseline] compare skipped — committed baseline metrics empty (owner refresh pending)"
    );
    return;
  }

  const regressions = compareGscSnapshots(baseline, current);
  if (regressions.length > 0) {
    console.error("[gsc-baseline] search performance regressions detected:");
    for (const issue of regressions) {
      console.error(
        `  - ${issue.metric}: ${issue.current} vs baseline ${issue.baseline} (drop ${(issue.dropFraction * 100).toFixed(1)}% > ${GSC_REGRESSION_TOLERANCE * 100}%)`
      );
    }
    process.exit(1);
  }

  console.log("[gsc-baseline] no clicks/impressions regressions vs committed baseline");
}

const cmd = process.argv[2];
if (cmd === "--help" || cmd === "-h") {
  usage();
} else if (cmd === "validate") {
  const csvPath = resolve(ROOT, process.argv[3] ?? DEFAULT_PATH);
  await validate(csvPath);
} else if (cmd === "compare") {
  const csvPath = resolve(ROOT, process.argv[3] ?? DEFAULT_PATH);
  await compare(csvPath);
} else {
  usage();
  process.exit(cmd ? 1 : 0);
}
