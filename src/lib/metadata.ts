import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";
import {
  buildLocalizedPath,
  defaultLocale,
  normalizePath,
  siteLocales,
} from "@/lib/locale";

/**
 * Canonical + hreflang alternates for a route path.
 *
 * English-only today: emits `en` and `x-default` pointing at the same URL.
 * When `siteLocales` gains more entries, every page using this helper picks up
 * reciprocal hreflang pairs automatically.
 */
export function pageAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const canonical = normalizePath(path);
  const languages: Record<string, string> = {};

  for (const locale of siteLocales) {
    languages[locale] = `${companyInfo.siteUrl}${buildLocalizedPath(locale, canonical)}`;
  }
  languages["x-default"] = `${companyInfo.siteUrl}${buildLocalizedPath(
    defaultLocale,
    canonical
  )}`;

  return { canonical, languages };
}
