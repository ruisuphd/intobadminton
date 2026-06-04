#!/usr/bin/env node
/**
 * Report new or unmapped markdown in blogs/ before import.
 * Exits 0 when blogs/ is absent in CI/local dev (unless REQUIRE_BLOGS=1).
 * Exits 1 when unmapped *.md exist, or when automation requires blogs but drop is missing.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { resolveBlogsDir } from "./blog-path.mjs";

const BLOGS = resolveBlogsDir();
const SLUG_MAP = new URL("../scripts/blog-slug-source-map.json", import.meta.url);
const ARCHIVE = join(BLOGS, "_archive");
const EN_MARKER = "## English Translation";
const CJK_RE = /[\u4e00-\u9fff]/;

const requireBlogs =
  process.env.REQUIRE_BLOGS === "1" || process.env.CURSOR_AGENT === "1";

function listMarkdown(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name);
}

function needsTranslation(name) {
  if (!CJK_RE.test(name)) return false;
  const text = readFileSync(join(BLOGS, name), "utf8");
  return !text.includes(EN_MARKER);
}

function main() {
  if (!existsSync(BLOGS)) {
    const msg =
      "check-new-blog-sources: blogs/ not present (gitignored local drop).";
    if (requireBlogs) {
      console.error(msg);
      console.error(
        "Cloud automation cannot read ~/Desktop/.../blogs. Sync first, e.g.:"
      );
      console.error(
        '  npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"'
      );
      console.error("Or set BLOGS_DIR to a mounted copy of that folder.");
      process.exit(1);
    }
    console.log(`${msg} Skipping.`);
    process.exit(0);
  }

  const mapped = new Set(
    Object.values(JSON.parse(readFileSync(SLUG_MAP, "utf8"))).filter(Boolean)
  );
  const active = listMarkdown(BLOGS);
  const archived = listMarkdown(ARCHIVE);
  const unmapped = active.filter((name) => !mapped.has(name));
  const chinesePending = active.filter(needsTranslation);

  console.log(`check-new-blog-sources: ${active.length} active markdown files`);
  console.log(`  blogs dir: ${BLOGS}`);
  console.log(`  mapped sources: ${mapped.size}`);
  console.log(`  archived: ${archived.length}`);
  console.log(`  unmapped active: ${unmapped.length}`);
  console.log(`  Chinese-named, missing English section: ${chinesePending.length}`);

  let failed = false;

  if (unmapped.length > 0) {
    failed = true;
    console.error("\nUnmapped files (add to scripts/blog-slug-source-map.json):");
    for (const name of unmapped.sort()) {
      console.error(`  - ${name}`);
    }
  }

  if (chinesePending.length > 0) {
    failed = true;
    console.error(
      "\nChinese filenames still need ## English Translation (keep Chinese above):"
    );
    for (const name of chinesePending.sort()) {
      console.error(`  - ${name}`);
    }
  }

  if (failed) {
    console.error(
      "\nNext: translate, rename to English, map slug, then npm run blog:import && npm run blog:validate"
    );
    process.exit(1);
  }

  const missingOnDisk = [...mapped].filter(
    (name) => !active.includes(name) && !archived.includes(name)
  );
  if (missingOnDisk.length > 0) {
    console.warn("\nMapped sources missing from blogs/ and _archive/:");
    for (const name of missingOnDisk.sort().slice(0, 20)) {
      console.warn(`  - ${name}`);
    }
    if (missingOnDisk.length > 20) {
      console.warn(`  … and ${missingOnDisk.length - 20} more`);
    }
  }

  process.exit(0);
}

main();
