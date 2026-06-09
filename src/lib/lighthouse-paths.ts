/**
 * Parse committed Lighthouse CI URL lists into canonical site paths.
 *
 * Shared by PWA precache parity, reviews golden-profile guards, and tests.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const LIGHTHOUSE_CONFIG_PATH = resolve(process.cwd(), "lighthouserc.json");

/**
 * CrUX-priority paths that stay out of `lighthouserc-baseline.json` because
 * they are intentionally noindex — Lighthouse SEO scores ~0.69 on those URLs.
 */
export const LIGHTHOUSE_BASELINE_NOINDEX_EXEMPT_PATHS = [
  "/saved/",
  "/compare/",
  "/privacy-choices/",
] as const;

/** Convert a local LHCI collect URL to a trailing-slash site path. */
export function lighthouseUrlToPath(url: string): string {
  const path = new URL(url).pathname;
  if (path.endsWith("/index.html")) {
    const base = path.slice(0, -"/index.html".length);
    return base === "" ? "/" : `${base}/`;
  }
  return path.endsWith("/") ? path : `${path}/`;
}

export function lighthouseCollectUrls(
  configPath: string = LIGHTHOUSE_CONFIG_PATH
): string[] {
  const config = JSON.parse(readFileSync(configPath, "utf8")) as {
    ci: { collect: { url: string[] } };
  };
  return config.ci.collect.url;
}

export function lighthousePaths(
  configPath: string = LIGHTHOUSE_CONFIG_PATH
): string[] {
  return lighthouseCollectUrls(configPath).map(lighthouseUrlToPath);
}

/** Article slugs under `/review/[slug]/` in the full Lighthouse CI URL set. */
export function lighthouseReviewArticleSlugs(
  configPath: string = LIGHTHOUSE_CONFIG_PATH
): string[] {
  return lighthousePaths(configPath)
    .filter((path) => path.startsWith("/review/") && path !== "/review/")
    .map((path) => path.slice("/review/".length).replace(/\/$/, ""));
}
