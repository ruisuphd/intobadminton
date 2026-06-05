#!/usr/bin/env node
/**
 * Capture or compare Lighthouse category scores against a committed baseline.
 *
 * Usage:
 *   node scripts/lighthouse-baseline.mjs capture   # after `npm run build && npm start`
 *   node scripts/lighthouse-baseline.mjs compare   # fail if scores regress >0.05
 *   node scripts/lighthouse-baseline.mjs --help
 *
 * Requires @lhci/cli (same as npm run lint:lighthouse).
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE_PATH = resolve(ROOT, "docs/baselines/lighthouse-scores.json");
const BASELINE_CONFIG = resolve(ROOT, "lighthouserc-baseline.json");
const REGRESSION_TOLERANCE = 0.05;

function usage() {
  console.log(`Usage:
  node scripts/lighthouse-baseline.mjs capture   Write CrUX-priority baseline from LHCI
  node scripts/lighthouse-baseline.mjs compare   Fail on category score regression
`);
}

function runLhci({ configPath = BASELINE_CONFIG } = {}) {
  execFileSync(
    "npx",
    [
      "-y",
      "@lhci/cli@0.14.x",
      "autorun",
      `--config=${configPath}`,
      "--upload.target=filesystem",
    ],
    { cwd: ROOT, stdio: "inherit" }
  );
  const manifestCandidates = [
    resolve(ROOT, ".lighthouseci/manifest.json"),
    resolve(ROOT, "manifest.json"),
  ];
  const manifestPath = manifestCandidates.find((path) => existsSync(path));
  if (!manifestPath) {
    throw new Error("LHCI manifest not found — did autorun succeed?");
  }
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

function summariseManifest(entries) {
  const byUrl = {};
  for (const entry of entries) {
    const url = entry.url;
    const summary = entry.summary ?? {};
    byUrl[url] = {
      performance: summary.performance ?? null,
      accessibility: summary.accessibility ?? null,
      "best-practices": summary["best-practices"] ?? null,
      seo: summary.seo ?? null,
    };
  }
  return {
    capturedAt: new Date().toISOString().slice(0, 10),
    urls: byUrl,
  };
}

function capture() {
  const manifest = runLhci({ configPath: BASELINE_CONFIG });
  const baseline = {
    ...summariseManifest(manifest),
    source: "lighthouserc-baseline.json",
    note: "CrUX-priority URLs — refresh with npm run capture:lighthouse:baseline after build.",
  };
  writeFileSync(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(`[lighthouse-baseline] wrote ${BASELINE_PATH.replace(ROOT + "/", "")}`);
}

function findManifestPath() {
  const candidates = [
    resolve(ROOT, ".lighthouseci/manifest.json"),
    resolve(ROOT, "manifest.json"),
  ];
  return candidates.find((path) => existsSync(path));
}

function loadManifestForCompare() {
  const manifestPath = findManifestPath();
  if (manifestPath) {
    console.log(
      `[lighthouse-baseline] reusing ${manifestPath.replace(ROOT + "/", "")} from prior LHCI run`
    );
    return JSON.parse(readFileSync(manifestPath, "utf8"));
  }
  console.log("[lighthouse-baseline] no manifest found — running CrUX-priority LHCI subset");
  return runLhci({ configPath: BASELINE_CONFIG });
}

function compare() {
  if (!existsSync(BASELINE_PATH)) {
    console.error(
      `[lighthouse-baseline] no baseline at docs/baselines/lighthouse-scores.json — run capture first`
    );
    process.exit(1);
  }
  const expected = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  if (!expected.urls || Object.keys(expected.urls).length === 0) {
    console.error(
      `[lighthouse-baseline] baseline has no url scores — run capture:lighthouse:baseline first`
    );
    process.exit(1);
  }
  const manifest = loadManifestForCompare();
  const actual = summariseManifest(manifest);
  const failures = [];

  for (const [url, scores] of Object.entries(expected.urls ?? {})) {
    const got = actual.urls[url];
    if (!got) {
      failures.push(`${url}: missing from current run`);
      continue;
    }
    for (const cat of ["performance", "accessibility", "best-practices", "seo"]) {
      const exp = scores[cat];
      const cur = got[cat];
      if (exp == null || cur == null) continue;
      if (cur < exp - REGRESSION_TOLERANCE) {
        failures.push(
          `${url} ${cat}: ${cur.toFixed(2)} < baseline ${exp.toFixed(2)} (tol ${REGRESSION_TOLERANCE})`
        );
      }
    }
  }

  if (failures.length > 0) {
    console.error("[lighthouse-baseline] regressions detected:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log("[lighthouse-baseline] no regressions vs committed baseline");
}

const cmd = process.argv[2];
if (cmd === "--help" || cmd === "-h") {
  usage();
} else if (cmd === "capture") {
  capture();
} else if (cmd === "compare") {
  compare();
} else {
  usage();
  process.exit(cmd ? 1 : 0);
}
