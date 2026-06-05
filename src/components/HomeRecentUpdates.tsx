import Link from "next/link";
import { listEditorialUpdates } from "@/lib/editorial-updates";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

const KIND_LABEL: Record<string, string> = {
  best: "Best of",
  guide: "Guide",
  tool: "Tool",
  compare: "Compare",
  brand: "Brand",
  review: "Review",
  page: "Page",
};

/** Surfaces the three most recently reviewed pages on the homepage. */
export function HomeRecentUpdates({ locale }: { locale: SiteLocale }) {
  const updates = listEditorialUpdates(3);
  if (updates.length === 0) return null;

  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <section className="border-t border-[color:var(--line)] py-12 lg:py-14">
      <div className="layout-band max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-headline text-[var(--text)]">Recently updated</h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
              Editorial dates from our guides, best-of pages, and review notes —
              not a marketing newsletter.
            </p>
          </div>
          <Link
            href={localized("/updates/")}
            className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            All updates →
          </Link>
        </div>
        <ul className="mt-6 divide-y divide-[color:var(--line)] rounded-2xl border border-[color:var(--line)] bg-white">
          {updates.map((row) => (
            <li key={row.path}>
              <Link
                href={localized(row.path)}
                className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4 transition-colors hover:bg-[var(--surface-muted)]"
              >
                <span className="text-sm font-medium text-[var(--text)]">
                  {row.title}
                </span>
                <span className="flex shrink-0 items-center gap-3 text-xs text-[var(--color-subtle)]">
                  <span className="chip chip-secondary text-[10px]">
                    {KIND_LABEL[row.kind] ?? row.kind}
                  </span>
                  <time dateTime={row.lastReviewedAt}>{row.lastReviewedAt}</time>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
