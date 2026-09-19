#!/usr/bin/env node
//
// Build gate: every published article must be original.
//
// `scripts/blog-slug-source-map.json` records where each article came from;
// `null` means IntoBadminton wrote it. Anything else was built from someone
// else's post (mostly translated forum threads) and must not ship. A review
// rewritten from scratch clears its entry and passes.
//
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const articles = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/data/blog-articles.json"), "utf8")
);
const sourceMap = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/blog-slug-source-map.json"), "utf8")
);

const issues = [];
for (const { slug } of articles) {
  if (!(slug in sourceMap)) {
    issues.push(`${slug}: no provenance entry in blog-slug-source-map.json`);
  } else if (sourceMap[slug] !== null) {
    issues.push(`${slug}: derived from ${sourceMap[slug]}`);
  }
}

if (issues.length) {
  console.error("check-published-provenance: FAILED");
  for (const issue of issues) console.error(" ", issue);
  process.exit(1);
}
console.log(`check-published-provenance: OK (${articles.length} original articles)`);
