"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/context/ThemeContext";
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
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[var(--background)]/90 backdrop-blur-md dark:border-zinc-700/80">
      <div className="layout-band flex h-16 max-w-6xl items-center justify-between">
        <Link
          href={localized("/")}
          className="text-lg font-semibold tracking-tight text-[var(--text)]"
        >
          IntoBadminton
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href={localized("/quiz/")}
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            {copy.nav.finder}
          </Link>
          <Link
            href={localized("/guides/")}
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            {copy.nav.guides}
          </Link>
          <Link
            href={localized("/blog/")}
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            {copy.nav.blog}
          </Link>
          <Link
            href={localized("/research/")}
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            {copy.nav.research}
          </Link>
          <Link
            href={localized("/compare/")}
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            {copy.nav.compare}
          </Link>
          <Link
            href={localized("/review/")}
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
          >
            {copy.nav.review}
          </Link>
          <Link
            href={switchHref}
            className="text-[var(--color-muted)] transition hover:text-[var(--color-accent)]"
            hrefLang={otherLocale === "zh" ? "zh-Hans" : "en"}
          >
            {copy.nav.language}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
