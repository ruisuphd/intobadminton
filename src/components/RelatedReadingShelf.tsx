import Link from "next/link";
import type { RelatedReadingItem } from "@/lib/related-content";

/**
 * Three-card related reading shelf for guides, best-of, and compare guides.
 */
export function RelatedReadingShelf({
  items,
}: {
  items: RelatedReadingItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[color:var(--line)] pt-10">
      <h2 className="text-lg font-semibold text-[var(--text)]">Keep reading</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex h-full flex-col rounded-2xl border border-[color:var(--line)] bg-white p-4 transition-shadow hover:shadow-md"
            >
              <h3 className="text-sm font-semibold leading-snug text-[var(--text)] text-balance">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[var(--color-muted)]">
                {item.summary}
              </p>
              <p className="mt-auto pt-3 text-xs font-medium text-[var(--color-accent)]">
                Read →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
