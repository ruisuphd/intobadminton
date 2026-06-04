"use client";

import Link from "next/link";
import { useProfile } from "@/context/ProfileContext";
import { productDisplayName } from "@/lib/product-display-names";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

/** Surfaces the last finder shortlists on the homepage for return visits. */
export function HomeRecentShortlists({ locale }: { locale: SiteLocale }) {
  const { history } = useProfile();
  const recent = history.slice(0, 3);
  if (recent.length === 0) return null;

  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <section className="border-t border-[color:var(--line)] py-12 lg:py-16">
      <div className="layout-band max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-headline text-[var(--text)]">
              Your recent shortlists
            </h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              Stored on this device only. Re-run the finder to refresh rankings.
            </p>
          </div>
          <Link
            href={localized("/quiz/")}
            className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            Run finder again →
          </Link>
        </div>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {recent.map((entry) => {
            const names = entry.topIds
              .map((id) => productDisplayName(id) ?? id)
              .join(" · ");
            return (
              <li
                key={entry.at}
                className="card p-4"
              >
                <time
                  className="text-xs text-[var(--color-subtle)]"
                  dateTime={entry.at}
                >
                  {new Date(entry.at).toLocaleString()}
                </time>
                <p className="mt-2 text-sm font-medium text-[var(--text)] line-clamp-3">
                  {names}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
