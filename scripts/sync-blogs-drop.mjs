#!/usr/bin/env node
/**
 * Copy the private blogs markdown drop into the repo workspace.
 * Usage:
 *   npm run blog:sync -- "/path/to/intobadminton/blogs"
 *   BLOGS_DROP_PATH="/path/to/blogs" npm run blog:sync
 *
 * Does not delete extra files in workspace blogs/ (additive copy only).
 */
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { resolveBlogsDir, REPO_ROOT } from "./blog-path.mjs";

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const name of readdirSync(src)) {
    const from = join(src, name);
    const to = join(dest, name);
    const st = statSync(from);
    if (st.isDirectory()) {
      copyDir(from, to);
    } else if (st.isFile()) {
      cpSync(from, to);
    }
  }
}

function main() {
  const argPath = process.argv[2]?.trim();
  const src = argPath || process.env.BLOGS_DROP_PATH?.trim();
  if (!src) {
    console.error(
      "sync-blogs-drop: provide source path as argument or set BLOGS_DROP_PATH"
    );
    console.error(
      'Example: npm run blog:sync -- "/Users/you/.../intobadminton/blogs"'
    );
    process.exit(1);
  }
  const resolvedSrc = resolve(src);
  if (!existsSync(resolvedSrc)) {
    console.error(`sync-blogs-drop: source not found: ${resolvedSrc}`);
    process.exit(1);
  }
  const dest = resolveBlogsDir();
  copyDir(resolvedSrc, dest);
  console.log(`sync-blogs-drop: copied ${resolvedSrc} → ${dest}`);
  console.log(`  repo root: ${REPO_ROOT}`);
}

main();
