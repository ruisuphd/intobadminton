export const siteLocales = ["en", "zh"] as const;

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

export function buildLocalizedPath(locale: SiteLocale, path: string): string {
  const normalized = normalizePath(path);
  return normalized === "/" ? `/${locale}/` : `/${locale}${normalized}`;
}

export function localizedRoutesFor(locale: SiteLocale): string[] {
  return coreRoutes.map((route) => buildLocalizedPath(locale, route));
}

export function localeFromPath(pathname: string): SiteLocale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isSupportedLocale(first) ? first : defaultLocale;
}

export function stripLocaleFromPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isSupportedLocale(parts[0])) {
    return normalizePath(parts.slice(1).join("/") || "/");
  }
  return normalizePath(pathname);
}
