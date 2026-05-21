#!/usr/bin/env node
/**
 * Glossary autolink CI gate.
 *
 * Scans every blog article body in `src/lib/blog.ts` (the static content
 * source) for glossary terms defined in `src/app/guides/glossary/page.tsx`.
 * Flags any article that uses a glossary term 3+ times without linking to
 * its glossary entry — the heuristic implementation of the
 * IMPROVEMENT_PLAN §3.3 #18 "glossary autolink CI pass".
 *
 * Run modes:
 *   node scripts/check-glossary-links.mjs            # exit 1 on findings
 *   node scripts/check-glossary-links.mjs --warn     # report only
 *
 * The script is intentionally text-based (regex on raw source) rather than
 * AST-based — the cost/benefit of an AST pass is not worth the build-time
 * complexity for a project at this content size.
 */
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_PATH = `${ROOT}/src/lib/blog.ts`;
const GLOSSARY_PATH = `${ROOT}/src/app/guides/glossary/page.tsx`;
const WARN_ONLY = process.argv.includes("--warn");
const MIN_OCCURRENCES = 3;

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function loadGlossary() {
  const src = await readFile(GLOSSARY_PATH, "utf8");
  // Match `{ id: "...", term: "...", ... }` shape from the TERMS array.
  const out = [];
  const re = /\{\s*id:\s*"([^"]+)",\s*term:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) != null) {
    out.push({ id: m[1], term: m[2] });
  }
  return out;
}

async function loadArticles() {
  const src = await readFile(BLOG_PATH, "utf8");
  // Walk the file and extract `{ slug: "...", ..., sections: [...], story: {...}? }`
  // by token boundaries. Easier: collect every `body:` string and group by
  // the nearest preceding `slug:`. That over-approximates (story.intro is
  // not a `body:`), but it covers the worst-case "this term appears 3 times
  // in section bodies" pattern accurately.
  //
  // Also collects `glossaryLinks` arrays on each section so a section that
  // explicitly registers a glossary link counts as "linked" for that term,
  // even if the body string itself does not contain the path.
  const articles = [];
  const bodyRe = /body:\s*"((?:[^"\\]|\\.)*)"/g;
  const sliceRe = /\{\s*slug:\s*"([^"]+)"[\s\S]*?(?=\{\s*slug:\s*"|\]\s*,\s*zh:|\]\s*,?\s*\}\s*;)/g;
  const glossaryLinksRe =
    /glossaryLinks:\s*\[\s*((?:\{[^}]*\}\s*,?\s*)+)\]/g;
  const glossaryIdRe = /id:\s*"([^"]+)"/g;
  let m;
  while ((m = sliceRe.exec(src)) != null) {
    const slug = m[1];
    const slice = m[0];
    const bodies = [];
    let b;
    bodyRe.lastIndex = 0;
    while ((b = bodyRe.exec(slice)) != null) {
      bodies.push(b[1]);
    }
    const introRe = /intro:\s*"((?:[^"\\]|\\.)*)"/;
    const intro = slice.match(introRe);
    if (intro) bodies.push(intro[1]);

    // Collect glossaryLinks ids declared anywhere within this slug slice.
    const linkedIds = new Set();
    let gl;
    glossaryLinksRe.lastIndex = 0;
    while ((gl = glossaryLinksRe.exec(slice)) != null) {
      const arr = gl[1];
      let id;
      glossaryIdRe.lastIndex = 0;
      while ((id = glossaryIdRe.exec(arr)) != null) {
        linkedIds.add(id[1]);
      }
    }

    articles.push({
      slug,
      text: bodies.join("\n"),
      glossaryLinkedIds: linkedIds,
    });
  }
  // Defensive fallback: if nothing matched (file shape changed), bail loud.
  if (articles.length === 0) {
    throw new Error(
      "check-glossary-links: parsed 0 articles from src/lib/blog.ts. The " +
        "regex assumes the current shape — update the parser if the blog " +
        "module layout changed."
    );
  }
  return articles;
}

function countOccurrences(text, term) {
  const re = new RegExp(`\\b${escapeRegex(term)}\\b`, "gi");
  return (text.match(re) ?? []).length;
}

function hasLinkToGlossary(text, id) {
  // Match `/guides/glossary/#<id>` or any link into `/guides/glossary/`.
  const idRe = new RegExp(
    `/guides/glossary/(?:#${escapeRegex(id)}|\\b)`,
    "i"
  );
  return idRe.test(text);
}

async function main() {
  const [glossary, articles] = await Promise.all([
    loadGlossary(),
    loadArticles(),
  ]);
  console.log(
    `[check-glossary-links] ${glossary.length} glossary terms, ${articles.length} articles`
  );

  const findings = [];
  for (const article of articles) {
    for (const { id, term } of glossary) {
      // Skip extremely short or generic terms that would over-trigger.
      if (term.length < 3) continue;
      const count = countOccurrences(article.text, term);
      if (count < MIN_OCCURRENCES) continue;
      if (hasLinkToGlossary(article.text, id)) continue;
      if (article.glossaryLinkedIds && article.glossaryLinkedIds.has(id)) {
        continue;
      }
      findings.push({ slug: article.slug, term, id, count });
    }
  }

  if (findings.length === 0) {
    console.log(
      "[check-glossary-links] ok — every recurring glossary term is linked."
    );
    return;
  }

  console.log("");
  console.log(
    `[check-glossary-links] ${findings.length} potential autolink ${
      findings.length === 1 ? "miss" : "misses"
    }:`
  );
  for (const f of findings) {
    console.log(
      `  - /blog/${f.slug}/ uses "${f.term}" x${f.count} without linking to /guides/glossary/#${f.id}`
    );
  }

  if (WARN_ONLY) {
    console.log(
      "\n[check-glossary-links] running in --warn mode; not failing the build."
    );
    return;
  }
  console.log(
    "\n[check-glossary-links] failing the build. Re-run with --warn to inspect without failing."
  );
  process.exit(1);
}

await main();
