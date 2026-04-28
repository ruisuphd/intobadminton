"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  buildLocalizedPath,
  localeFromPath,
  stripLocaleFromPath,
  type SiteLocale,
} from "@/lib/locale";
import { t } from "@/lib/i18n";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = t(locale);
  const otherLocale: SiteLocale = locale === "zh" ? "en" : "zh";
  const localized = (path: string) => buildLocalizedPath(locale, path);
  const switchHref = buildLocalizedPath(otherLocale, stripLocaleFromPath(pathname));

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-white/85 backdrop-blur-md">
      <div className="layout-band flex h-16 max-w-6xl items-center justify-between">
        <Link
          href={localized("/")}
          className="text-base font-semibold tracking-tight text-[var(--text)]"
        >
          IntoBadminton
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href={localized("/quiz/")}
            className="text-[var(--color-muted)] transition-colors hover:text-[var(--text)]"
          >
            {copy.nav.finder}
          </Link>
          <Link
            href={localized("/blog/")}
            className="hidden text-[var(--color-muted)] transition-colors hover:text-[var(--text)] sm:inline-flex"
          >
            {copy.nav.blog}
          </Link>
          <Link
            href={localized("/brands/")}
            className="hidden text-[var(--color-muted)] transition-colors hover:text-[var(--text)] sm:inline-flex"
          >
            {locale === "zh" ? "品牌" : "Brands"}
          </Link>
          <Link
            href={localized("/compare/")}
            className="hidden text-[var(--color-muted)] transition-colors hover:text-[var(--text)] sm:inline-flex"
          >
            {copy.nav.compare}
          </Link>
          <Link
            href={switchHref}
            className="text-[var(--color-muted)] transition-colors hover:text-[var(--text)]"
            hrefLang={otherLocale === "zh" ? "zh-Hans" : "en"}
          >
            {copy.nav.language}
          </Link>
        </nav>
      </div>
    </header>
  );
}
