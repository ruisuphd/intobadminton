/**
 * Resolve the private blogs/ drop directory.
 * Override with BLOGS_DIR (absolute or relative to repo root).
 */
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function resolveBlogsDir() {
  const raw = process.env.BLOGS_DIR?.trim();
  if (raw) {
    return resolve(raw.startsWith("/") ? raw : resolve(ROOT, raw));
  }
  return resolve(ROOT, "blogs");
}

export function blogsPresent(dir = resolveBlogsDir()) {
  return existsSync(dir);
}

export const REPO_ROOT = ROOT;
