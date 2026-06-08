#!/usr/bin/env node
/**
 * Fetch CrUX field-data metrics from PageSpeed Insights API and write
 * docs/baselines/crux-template.csv.
 *
 * Requires owner API key (free tier): https://developers.google.com/speed/docs/insights/v5/get-started
 *
 * Usage:
 *   GOOGLE_PSI_API_KEY=… node scripts/crux-capture-psi.mjs
 *   GOOGLE_PSI_API_KEY=… node scripts/crux-capture-psi.mjs --dry-run
 *   node scripts/crux-capture-psi.mjs --help
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATE = resolve(ROOT, "docs/baselines/crux-template.csv");
const HEADER = "url,device,lcp_ms,inp_ms,cls,note";

const METRIC_IDS = {
  lcp: "LARGEST_CONTENTFUL_PAINT_MS",
  inp: "INTERACTION_TO_NEXT_PAINT",
  inpFallback: "EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT",
  cls: "CUMULATIVE_LAYOUT_SHIFT_SCORE",
};

function usage() {
  console.log(`Usage:
  GOOGLE_PSI_API_KEY=… node scripts/crux-capture-psi.mjs [--dry-run]
  node scripts/crux-capture-psi.mjs --help

Fetches origin field data (CrUX) for each url+device row in crux-template.csv.
Validate after capture: npm run lint:crux-baseline
`);
}

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}

function metricPercentile(metrics, id, fallbackId) {
  const entry = metrics?.[id] ?? (fallbackId ? metrics?.[fallbackId] : undefined);
  if (!entry?.percentile && entry?.percentile !== 0) return null;
  return entry.percentile;
}

async function fetchCruxMetrics(url, device, apiKey) {
  const strategy = device === "desktop" ? "desktop" : "mobile";
  const params = new URLSearchParams({
    url,
    strategy,
    category: "performance",
  });
  if (apiKey) params.set("key", apiKey);

  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`;
  const res = await fetch(endpoint);
  const body = await res.json();

  if (!res.ok) {
    const msg = body?.error?.message ?? res.statusText;
    throw new Error(`PSI ${res.status}: ${msg}`);
  }

  const metrics = body.loadingExperience?.metrics;
  if (!metrics) {
    return { lcp_ms: null, inp_ms: null, cls: null, note: "no field data" };
  }

  const lcp_ms = metricPercentile(metrics, METRIC_IDS.lcp);
  const inp_ms = metricPercentile(
    metrics,
    METRIC_IDS.inp,
    METRIC_IDS.inpFallback
  );
  const clsRaw = metricPercentile(metrics, METRIC_IDS.cls);
  const cls = clsRaw != null ? Number((clsRaw / 100).toFixed(3)) : null;

  return {
    lcp_ms,
    inp_ms,
    cls,
    note: `psi capture ${new Date().toISOString().slice(0, 10)}`,
  };
}

function formatCell(value) {
  if (value == null || value === "") return "";
  return String(value);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    usage();
    process.exit(0);
  }

  const dryRun = process.argv.includes("--dry-run");
  const apiKey = process.env.GOOGLE_PSI_API_KEY?.trim() ?? "";

  if (!apiKey) {
    console.error(
      "[crux-capture-psi] Set GOOGLE_PSI_API_KEY (PageSpeed Insights API key) before running."
    );
    console.error(
      "  Manual capture: npm run capture:crux-hints — paste metrics into crux-template.csv"
    );
    process.exit(1);
  }

  const content = readFileSync(TEMPLATE, "utf8").trim();
  const lines = content.split(/\r?\n/);
  if (lines[0]?.trim() !== HEADER) {
    console.error(`[crux-capture-psi] expected header "${HEADER}"`);
    process.exit(1);
  }

  const outLines = [HEADER];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [url, device, , , , oldNote] = parseCsvLine(line);
    if (!url || !device) continue;

    process.stdout.write(`[crux-capture-psi] ${url} (${device})… `);

    try {
      const metrics = await fetchCruxMetrics(url, device, apiKey);
      const note = metrics.note || oldNote || "";
      outLines.push(
        [
          url,
          device,
          formatCell(metrics.lcp_ms),
          formatCell(metrics.inp_ms),
          formatCell(metrics.cls),
          note,
        ].join(",")
      );
      console.log(
        metrics.lcp_ms != null
          ? `LCP ${metrics.lcp_ms} INP ${metrics.inp_ms} CLS ${metrics.cls}`
          : "no field data"
      );
    } catch (err) {
      console.log(`failed: ${err.message}`);
      outLines.push(line);
    }

    await sleep(1200);
  }

  if (dryRun) {
    console.log("\n[crux-capture-psi] dry-run — CSV not written");
    console.log(outLines.join("\n"));
    return;
  }

  writeFileSync(TEMPLATE, `${outLines.join("\n")}\n`, "utf8");
  console.log(`\n[crux-capture-psi] wrote ${TEMPLATE.replace(ROOT + "/", "")}`);
  console.log("Validate: npm run lint:crux-baseline");
}

main().catch((err) => {
  console.error("[crux-capture-psi] fatal:", err);
  process.exit(1);
});
