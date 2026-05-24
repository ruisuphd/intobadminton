#!/usr/bin/env node
//
// Build gate: blog articles must not contain third-party channel attribution.
//
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOG_JSON = path.join(ROOT, "src/data/blog-articles.json");

const FORBIDDEN = [/\bTiGe XLab\b/i, /\bBadmintonCN\b/i, /泰戈/, /\bthe author\b/i, /\*\*[^*]+\*\*/];

function main() {
  const articles = JSON.parse(fs.readFileSync(BLOG_JSON, "utf8"));
  const issues = [];
  for (const article of articles) {
    const blob = JSON.stringify(article);
    for (const pat of FORBIDDEN) {
      if (pat.test(blob)) {
        issues.push(`${article.slug}: forbidden pattern ${pat}`);
      }
    }
  }
  if (issues.length) {
    console.error("check-source-attribution: FAILED");
    for (const i of issues) console.error(" ", i);
    process.exit(1);
  }
  console.log("check-source-attribution: OK");
}

main();
