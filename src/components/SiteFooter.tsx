"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CookieSettingsLink } from "@/components/CookieSettings";
import { buildLocalizedPath, localeFromPath } from "@/lib/locale";
import { t } from "@/lib/i18n";

export function SiteFooter() {
  const locale = localeFromPath(usePathname());
  const copy = t(locale);
  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <footer className="mt-auto border-t border-zinc-200/80 py-12 dark:border-zinc-700/80">
      <div className="layout-band max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="font-semibold text-[var(--text)]">IntoBadminton</p>
            <p className="mt-2 max-w-sm text-sm text-[var(--color-muted)]">
              {copy.footer.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              href={localized("/")}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              {locale === "zh" ? "关于" : "About"}
            </Link>
            <Link
              href={localized("/contact/")}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              {locale === "zh" ? "联系" : "Contact"}
            </Link>
            <Link
              href={localized("/privacy/")}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              {locale === "zh" ? "隐私" : "Privacy"}
            </Link>
            <Link
              href={localized("/cookies/")}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              {locale === "zh" ? "Cookie" : "Cookies"}
            </Link>
            <Link
              href={localized("/terms/")}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              {locale === "zh" ? "条款" : "Terms"}
            </Link>
            <Link
              href={localized("/source-policy/")}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              {locale === "zh" ? "来源政策" : "Source policy"}
            </Link>
            <Link
              href={localized("/methodology/")}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            >
              {copy.footer.methodology}
            </Link>
            <CookieSettingsLink />
          </div>
        </div>
        <p className="mt-10 text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} IntoBadminton. Equipment is personal;
          results are informational.
        </p>
      </div>
    </footer>
  );
}
