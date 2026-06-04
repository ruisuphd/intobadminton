import Link from "next/link";
import type { BlogArticle } from "@/lib/blog";
import { articlePathForSlug } from "@/lib/blog-migrations";
import { readingTimeMinutes } from "@/lib/blog";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

/**
 * Three-card related reading shelf (reviews hub).
 */
export function RelatedPostsGrid({
  locale,
  articles,
}: {
  locale: SiteLocale;
  articles: BlogArticle[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[color:var(--line)] pt-10">
      <h2 className="text-lg font-semibold text-[var(--text)]">More reading</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((entry) => {
          const href = buildLocalizedPath(
            locale,
            articlePathForSlug(entry.slug)
          );
          const minutes = readingTimeMinutes(entry);
          return (
            <li key={entry.slug}>
              <Link
                href={href}
                className="flex h-full flex-col rounded-2xl border border-[color:var(--line)] bg-white p-4 transition-shadow hover:shadow-md"
              >
                <h3 className="text-sm font-semibold leading-snug text-[var(--text)] text-balance">
                  {entry.title}
                </h3>
                {entry.dek && (
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[var(--color-muted)]">
                    {entry.dek}
                  </p>
                )}
                <p className="mt-auto pt-3 text-xs text-[var(--color-subtle)]">
                  {minutes} min read
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
