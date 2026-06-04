#!/usr/bin/env node
/**
 * Report new or unmapped markdown in blogs/ before import.
 * Exits 0 when blogs/ is absent (CI/cloud agents without the private drop).
 * Exits 1 when unmapped *.md files exist so cron/automation can open a PR.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOGS = resolve(ROOT, "blogs");
const SLUG_MAP = resolve(ROOT, "scripts/blog-slug-source-map.json");
const ARCHIVE = resolve(BLOGS, "_archive");

function listMarkdown(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name);
}

function main() {
  if (!existsSync(BLOGS)) {
    console.log(
      "check-new-blog-sources: blogs/ not present (gitignored local drop). Skipping."
    );
    process.exit(0);
  }

  const mapped = new Set(
    Object.values(JSON.parse(readFileSync(SLUG_MAP, "utf8"))).filter(Boolean)
  );
  const active = listMarkdown(BLOGS);
  const archived = listMarkdown(ARCHIVE);
  const unmapped = active.filter((name) => !mapped.has(name));

  console.log(`check-new-blog-sources: ${active.length} active markdown files`);
  console.log(`  mapped sources: ${mapped.size}`);
  console.log(`  archived: ${archived.length}`);
  console.log(`  unmapped active: ${unmapped.length}`);

  if (unmapped.length > 0) {
    console.error("\nUnmapped files (add to scripts/blog-slug-source-map.json):");
    for (const name of unmapped.sort()) {
      console.error(`  - ${name}`);
    }
    console.error(
      "\nNext: translate English section, run npm run blog:import && npm run blog:validate"
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
