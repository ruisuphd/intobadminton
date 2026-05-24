#!/usr/bin/env node
/**
 * Glossary autolink CI gate — reads src/data/blog-articles.json.
 */
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_PATH = `${ROOT}/src/data/blog-articles.json`;
const GLOSSARY_PATH = `${ROOT}/src/app/guides/glossary/page.tsx`;
const WARN_ONLY = process.argv.includes("--warn");
const MIN_OCCURRENCES = 3;

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function loadGlossary() {
  const src = await readFile(GLOSSARY_PATH, "utf8");
  const out = [];
  const re = /\{\s*id:\s*"([^"]+)",\s*term:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) != null) {
    out.push({ id: m[1], term: m[2] });
  }
  return out;
}

async function loadArticles() {
  const raw = await readFile(BLOG_PATH, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const glossary = await loadGlossary();
  const articles = await loadArticles();
  const findings = [];

  for (const article of articles) {
    const linkedIds = new Set();
    for (const section of article.sections ?? []) {
      for (const link of section.glossaryLinks ?? []) {
        linkedIds.add(link.id);
      }
    }
    const bodies = (article.sections ?? []).map((s) => s.body).join(" ");
    for (const { id, term } of glossary) {
      const re = new RegExp(`\\b${escapeRegex(term)}\\b`, "gi");
      const count = (bodies.match(re) ?? []).length;
      if (count >= MIN_OCCURRENCES && !linkedIds.has(id)) {
        findings.push({ slug: article.slug, term, id, count });
      }
    }
  }

  if (findings.length === 0) {
    console.log("check-glossary-links: OK");
    return;
  }

  for (const f of findings) {
    console.log(
      `${f.slug}: "${f.term}" appears ${f.count}x without glossaryLinks entry (#${f.id})`
    );
  }
  if (!WARN_ONLY) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
