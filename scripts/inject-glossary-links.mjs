#!/usr/bin/env node
//
// inject-glossary-links.mjs
//
// One-shot migration script: scans src/lib/blog.ts for articles that use
// a glossary term 3+ times without already linking to its glossary anchor,
// then injects a `glossaryLinks: [...]` array on the FIRST section of each
// violating article. Idempotent — articles that already have a
// `glossaryLinks:` entry on their first section are skipped.
//
// Usage:
//   node scripts/inject-glossary-links.mjs            # in-place edit
//   node scripts/inject-glossary-links.mjs --dry-run  # report what would change
//
// This script is intentionally text-based on raw source. The TS literals
// in src/lib/blog.ts are stable enough that a careful regex pass is
// safer than an AST rewrite and faster to audit by humans.

import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_PATH = `${ROOT}/src/lib/blog.ts`;
const GLOSSARY_PATH = `${ROOT}/src/app/guides/glossary/page.tsx`;
const DRY_RUN = process.argv.includes("--dry-run");
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

function extractArticleSlices(src) {
  const slices = [];
  const sliceRe =
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?(?=\{\s*slug:\s*"|\]\s*,\s*zh:|\]\s*,?\s*\}\s*;)/g;
  let m;
  while ((m = sliceRe.exec(src)) != null) {
    slices.push({ slug: m[1], start: m.index, end: m.index + m[0].length });
  }
  return slices;
}

function findFirstSectionBodyEnd(slice, startOffset) {
  // Search for `sections: [` in the slice, then the first `body: "..."`
  // after it, then return the position of the closing `,\n        },` so
  // we can inject `glossaryLinks: [...]` between the body and the closing
  // brace.
  const sectionsIdx = slice.indexOf("sections: [");
  if (sectionsIdx === -1) return null;
  const rest = slice.slice(sectionsIdx);
  const bodyRe = /body:\s*"((?:[^"\\]|\\.)*)"/;
  const bodyMatch = bodyRe.exec(rest);
  if (!bodyMatch) return null;
  // Position immediately after the closing quote of body's value.
  const afterBodyInRest = bodyMatch.index + bodyMatch[0].length;
  const absolute = startOffset + sectionsIdx + afterBodyInRest;
  return absolute;
}

async function main() {
  const glossary = await loadGlossary();
  const src = await readFile(BLOG_PATH, "utf8");
  const slices = extractArticleSlices(src);
  if (slices.length === 0) {
    throw new Error("inject-glossary-links: parsed 0 article slices");
  }

  // For each slice, find which glossary terms appear 3+ times in any body.
  // Skip slices that already have a `glossaryLinks:` entry anywhere in the
  // slice (idempotency guard).
  const edits = [];
  for (const { slug, start, end } of slices) {
    const text = src.slice(start, end);
    // Aggregate all body and intro strings into one searchable text blob.
    const bodyRe = /body:\s*"((?:[^"\\]|\\.)*)"/g;
    const introRe = /intro:\s*"((?:[^"\\]|\\.)*)"/;
    let bodies = [];
    let b;
    bodyRe.lastIndex = 0;
    while ((b = bodyRe.exec(text)) != null) bodies.push(b[1]);
    const intro = text.match(introRe);
    if (intro) bodies.push(intro[1]);
    const haystack = bodies.join("\n");
    // Existing linked ids inside this slice (via glossaryLinks arrays).
    const linkedIds = new Set();
    const linksRe =
      /glossaryLinks:\s*\[\s*((?:\{[^}]*\}\s*,?\s*)+)\]/g;
    const idRe = /id:\s*"([^"]+)"/g;
    let lm;
    while ((lm = linksRe.exec(text)) != null) {
      const arr = lm[1];
      let im;
      idRe.lastIndex = 0;
      while ((im = idRe.exec(arr)) != null) linkedIds.add(im[1]);
    }
    // Also count plain-text path mentions.
    const needed = [];
    for (const { id, term } of glossary) {
      if (term.length < 3) continue;
      const occ = (haystack.match(
        new RegExp(`\\b${escapeRegex(term)}\\b`, "gi")
      ) ?? []).length;
      if (occ < MIN_OCCURRENCES) continue;
      const pathRe = new RegExp(
        `/guides/glossary/(?:#${escapeRegex(id)}|\\b)`,
        "i"
      );
      if (pathRe.test(haystack)) continue;
      if (linkedIds.has(id)) continue;
      needed.push({ term, id });
    }
    if (needed.length === 0) continue;

    const insertionPoint = findFirstSectionBodyEnd(text, start);
    if (insertionPoint === null) {
      console.warn(
        `[inject] could not find first section body for ${slug} — skipping`
      );
      continue;
    }

    // Build the glossaryLinks literal.
    const literal =
      ",\n          glossaryLinks: [" +
      needed
        .map(({ term, id }) => `{ term: "${term}", id: "${id}" }`)
        .join(", ") +
      "]";
    edits.push({ slug, offset: insertionPoint, insert: literal, needed });
  }

  if (edits.length === 0) {
    console.log("[inject] nothing to do — all articles already satisfied.");
    return;
  }

  // Apply edits in reverse offset order so earlier insertions don't shift
  // later offsets.
  edits.sort((a, b) => b.offset - a.offset);
  let out = src;
  for (const e of edits) {
    out = out.slice(0, e.offset) + e.insert + out.slice(e.offset);
    const termList = e.needed.map((n) => n.term).join(", ");
    console.log(`[inject] ${e.slug} ← ${termList}`);
  }

  if (DRY_RUN) {
    console.log(`\n[inject] DRY RUN — ${edits.length} edits queued (not written)`);
  } else {
    await writeFile(BLOG_PATH, out);
    console.log(`\n[inject] wrote ${edits.length} edits to ${BLOG_PATH}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
