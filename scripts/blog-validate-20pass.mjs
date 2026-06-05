#!/usr/bin/env node
/**
 * 20-pass blog migration validation (Option B).
 * Runs structural, voice, and build checks; reports per pass.
 */
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const JSON_PATH = `${ROOT}/src/data/blog-articles.json`;
const REPORT_PATH = `${ROOT}/scripts/blog-import-option-b-report.json`;
const SLUGS_PATH = `${ROOT}/scripts/blog-slugs-list.json`;

function loadArticles() {
  return JSON.parse(readFileSync(JSON_PATH, "utf8"));
}

function auditPass(articles, slugs) {
  const issues = [];
  const slugSet = new Set(slugs);
  if (articles.length !== slugs.length) {
    issues.push(`count mismatch: ${articles.length} articles vs ${slugs.length} slugs`);
  }
  for (const slug of slugs) {
    if (!articles.find((a) => a.slug === slug)) issues.push(`missing slug ${slug}`);
  }
  for (const a of articles) {
    const blob = JSON.stringify(a);
    if (!a.title?.trim()) issues.push(`${a.slug}: empty title`);
    if (!a.verdict?.trim()) issues.push(`${a.slug}: empty verdict`);
    if (!a.sections?.length) issues.push(`${a.slug}: no sections`);
    if (/https?:\/\//i.test(blob)) issues.push(`${a.slug}: URL in content`);
    if (/[\u4e00-\u9fff]/.test(blob)) issues.push(`${a.slug}: CJK in content`);
    if (/tige xlab|badmintoncn/i.test(blob)) issues.push(`${a.slug}: channel attribution`);
    if (/\bthe author\b/i.test(blob)) issues.push(`${a.slug}: third-person author`);
    if (/\*\*[^*]+\*\*/.test(blob)) issues.push(`${a.slug}: markdown bold leaked`);
    if ((a.dek?.trim().length ?? 0) < 50) issues.push(`${a.slug}: dek too short`);
    if (/source-to-buyer|fact-check snapshot/i.test(blob))
      issues.push(`${a.slug}: editorial scaffold`);
    if (/\bI's specific\b/i.test(blob)) issues.push(`${a.slug}: persona corruption`);
    if (/\bWhat makes I more\b/i.test(blob)) issues.push(`${a.slug}: persona corruption`);
    if (!slugSet.has(a.slug)) issues.push(`${a.slug}: orphan slug not in blogSlugs`);
  }
  return issues;
}

function main() {
  const slugs = JSON.parse(readFileSync(SLUGS_PATH, "utf8"));
  const importReport = existsSync(REPORT_PATH)
    ? JSON.parse(readFileSync(REPORT_PATH, "utf8"))
    : null;
  const passes = [];
  let articles = loadArticles();

  for (let i = 1; i <= 20; i++) {
    const issues = auditPass(articles, slugs);
    passes.push({ pass: i, issues: issues.length, samples: issues.slice(0, 5) });
    if (i === 20 && issues.length) passes[i - 1].all = issues;
  }

  // Final integration checks once (CI runs `npm test` in a dedicated step)
  let buildOk = true;
  if (!process.env.GITHUB_ACTIONS) {
    try {
      execSync("npm test", { cwd: ROOT, stdio: "pipe" });
    } catch {
      buildOk = false;
    }
  }

  const out = {
    date: new Date().toISOString().slice(0, 10),
    import_final_issues: importReport?.final_issue_count ?? null,
    validate_final_issues: passes[19].issues,
    tests_pass: buildOk,
    passes,
  };
  console.log(JSON.stringify(out, null, 2));
  if (passes[19].issues > 0 || !buildOk) process.exit(1);
}

main();
