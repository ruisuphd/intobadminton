/**
 * The site is English-only. The few utilities below stay in place so existing
 * components that took a `locale` prop or called `buildLocalizedPath()` keep
 * working without invasive rewrites — they just always operate on "en" and
 * `buildLocalizedPath()` returns the path unchanged (no /en/ or /zh/ prefix).
 *
 * The /[locale]/ Next.js route tree was removed; only the root URLs remain.
 */

export const siteLocales = ["en"] as const;

export type SiteLocale = (typeof siteLocales)[number];

export const defaultLocale: SiteLocale = "en";

const coreRoutes = [
  "/",
  "/quiz/",
  "/results/",
  "/guides/",
  "/compare/",
  "/review/",
  "/methodology/",
  "/source-policy/",
  "/sources/",
  "/about/",
  "/brands/",
  "/security/",
  "/privacy/",
  "/cookies/",
  "/terms/",
  "/contact/",
  "/blog/",
  "/research/",
] as const;

export function isSupportedLocale(value: string): value is SiteLocale {
  return (siteLocales as readonly string[]).includes(value);
}

export function normalizePath(path: string): string {
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

/**
 * Returns the path unchanged (no locale prefix). Kept as a function so existing
 * callers do not need to be rewritten now that the site is English-only.
 */
export function buildLocalizedPath(_locale: SiteLocale, path: string): string {
  return normalizePath(path);
}

export function localizedRoutesFor(_locale: SiteLocale): string[] {
  return [...coreRoutes];
}

export function localeFromPath(_pathname: string): SiteLocale {
  return defaultLocale;
}

export function stripLocaleFromPath(pathname: string): string {
  return normalizePath(pathname);
}
