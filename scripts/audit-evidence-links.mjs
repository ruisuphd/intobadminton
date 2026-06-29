#!/usr/bin/env node
/**
 * Pass 10: verify review-evidence.json source URLs are reachable (HEAD).
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rows = JSON.parse(
  readFileSync(`${ROOT}/src/data/review-evidence.json`, "utf8")
);

const STRICT = process.env.AUDIT_EVIDENCE_STRICT === "1";
const unique = [...new Set(rows.map((r) => r.sourceUrl).filter(Boolean))];
const broken = [];
const timeout = 8000;

async function head(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      signal: ctrl.signal,
      redirect: "follow",
    });
    return res.ok || res.status === 405;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

let ok = 0;
for (const url of unique.slice(0, 40)) {
  if (await head(url)) ok++;
  else broken.push(url);
}

if (broken.length) {
  console.warn(
    `evidence links: ${broken.length}/${unique.length} unreachable (sampled 40)`
  );
  for (const u of broken.slice(0, 10)) console.warn(`  ${u}`);
  if (STRICT) process.exit(1);
} else {
  console.log(`evidence links: OK (sampled ${Math.min(40, unique.length)})`);
}
