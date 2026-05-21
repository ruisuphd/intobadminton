#!/usr/bin/env node
//
// audit-factcheck-freshness.mjs
//
// Scans every factCheck.checkedAt across src/lib/blog.ts and
// src/lib/blog-source-reviews.ts and reports drift:
//   - "fresh"        (≤ 90 days)   — no action needed
//   - "ageing"       (90-180 days) — informational
//   - "stale"        (180-365 days) — needs re-verify per IMPROVEMENT_PLAN §3.2
//   - "expired"      (> 365 days)  — fails the build per existing
//                                    claims-registry rule (same threshold as
//                                    postbuild-seo-audit.mjs enforces on
//                                    content/claims.json)
//
// Soft mode by default — prints the report but does not fail the build.
// Pass `--strict` to fail on expired entries.
//
// Why this script lives alongside the existing claims-registry check:
// the claims registry (content/claims.json) covers product specs that
// drive the finder; this script covers per-article factChecks that drive
// the reader's trust. Both freshness signals matter for E-E-A-T; both
// drift independently. Separate audits make each easier to track.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_FILES = [
  "src/lib/blog.ts",
  "src/lib/blog-source-reviews.ts",
];

const STRICT = process.argv.includes("--strict");
const NOW = new Date();
const DAY_MS = 24 * 60 * 60 * 1000;
const AGEING_THRESHOLD_DAYS = 90;
const STALE_THRESHOLD_DAYS = 180;
const EXPIRED_THRESHOLD_DAYS = 365;

function readAll(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractFactCheckEntries(src, file) {
  // factCheck objects can appear anywhere within a slug slice. We extract
  // each factCheck literal and tag it with the nearest preceding slug.
  const out = [];
  const slugRe = /slug:\s*["']([a-z0-9-]+)["']/g;
  const checkedAtRe = /checkedAt:\s*["'](\d{4}-\d{2}-\d{2})["']/g;
  const sourceNameRe = /sourceName:\s*["']([^"']+)["']/g;

  // Build a sorted list of (slug, position) so we can locate each
  // factCheck within its article.
  const slugPositions = [];
  let m;
  slugRe.lastIndex = 0;
  while ((m = slugRe.exec(src)) != null) {
    slugPositions.push({ slug: m[1], pos: m.index });
  }
  function slugForOffset(offset) {
    let last = "<unknown>";
    for (const sp of slugPositions) {
      if (sp.pos > offset) break;
      last = sp.slug;
    }
    return last;
  }

  // factChecks can occur inline; we capture each checkedAt and pair it
  // with the closest preceding sourceName within ~600 chars (single
  // factCheck object).
  const sourceNames = [];
  sourceNameRe.lastIndex = 0;
  while ((m = sourceNameRe.exec(src)) != null) {
    sourceNames.push({ name: m[1], pos: m.index });
  }
  function nearestSourceName(offset) {
    let bestName = "<unknown>";
    let bestDist = Infinity;
    for (const sn of sourceNames) {
      const d = offset - sn.pos;
      if (d > 0 && d < bestDist && d < 600) {
        bestDist = d;
        bestName = sn.name;
      }
    }
    return bestName;
  }

  checkedAtRe.lastIndex = 0;
  while ((m = checkedAtRe.exec(src)) != null) {
    const dateStr = m[1];
    const offset = m.index;
    out.push({
      slug: slugForOffset(offset),
      sourceName: nearestSourceName(offset),
      checkedAt: dateStr,
      file,
    });
  }
  return out;
}

const entries = [];
for (const rel of TARGET_FILES) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) continue;
  const src = readAll(filePath);
  entries.push(...extractFactCheckEntries(src, rel));
}

function ageDays(dateStr) {
  const t = Date.parse(dateStr + "T00:00:00Z");
  if (!Number.isFinite(t)) return Number.POSITIVE_INFINITY;
  return Math.round((NOW.getTime() - t) / DAY_MS);
}

const buckets = { fresh: [], ageing: [], stale: [], expired: [], invalid: [] };
for (const e of entries) {
  const age = ageDays(e.checkedAt);
  if (!Number.isFinite(age)) {
    buckets.invalid.push(e);
    continue;
  }
  if (age >= EXPIRED_THRESHOLD_DAYS) buckets.expired.push({ ...e, age });
  else if (age >= STALE_THRESHOLD_DAYS) buckets.stale.push({ ...e, age });
  else if (age >= AGEING_THRESHOLD_DAYS) buckets.ageing.push({ ...e, age });
  else buckets.fresh.push({ ...e, age });
}

console.log(
  `[factcheck-freshness] scanned ${entries.length} factCheck entries across ${TARGET_FILES.length} files`
);
console.log(
  `[factcheck-freshness]   ${buckets.fresh.length} fresh    (≤ ${AGEING_THRESHOLD_DAYS}d)`
);
console.log(
  `[factcheck-freshness]   ${buckets.ageing.length} ageing  (${AGEING_THRESHOLD_DAYS}-${STALE_THRESHOLD_DAYS}d)`
);
console.log(
  `[factcheck-freshness]   ${buckets.stale.length} stale   (${STALE_THRESHOLD_DAYS}-${EXPIRED_THRESHOLD_DAYS}d, needs re-verify)`
);
console.log(
  `[factcheck-freshness]   ${buckets.expired.length} expired (≥ ${EXPIRED_THRESHOLD_DAYS}d, fails build under --strict)`
);
if (buckets.invalid.length > 0) {
  console.log(
    `[factcheck-freshness]   ${buckets.invalid.length} invalid date strings (always investigated)`
  );
}

function printBucket(name, list) {
  if (list.length === 0) return;
  console.log(`\n${name} (${list.length}):`);
  for (const e of list.slice(0, 25)) {
    console.log(
      `  - ${e.checkedAt} (${e.age}d) — ${e.slug} · ${e.sourceName} [${e.file}]`
    );
  }
  if (list.length > 25) {
    console.log(`  ... and ${list.length - 25} more`);
  }
}

printBucket("STALE — needs re-verify", buckets.stale);
printBucket("EXPIRED — fails build under --strict", buckets.expired);
printBucket("INVALID date strings", buckets.invalid);

if (STRICT && (buckets.expired.length > 0 || buckets.invalid.length > 0)) {
  console.error(
    `\n[factcheck-freshness] FAIL — ${buckets.expired.length} expired + ${buckets.invalid.length} invalid factCheck entries under --strict`
  );
  process.exit(1);
}

console.log(
  `\n[factcheck-freshness] OK (soft audit). Use --strict in CI when ready to enforce.`
);
