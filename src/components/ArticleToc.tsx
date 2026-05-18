"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * Sticky table of contents that highlights the section the reader is
 * currently in. The list of items is generated server-side from the article's
 * `<h2>` headings (passed as a prop) so the ToC is visible without JS; the
 * active-section highlighting is the only client-only behavior.
 *
 * Mobile: collapses to a "Jump to" disclosure to preserve vertical space.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(
    items[0]?.id ?? null
  );

  useEffect(() => {
    if (items.length === 0) return;
    const observed: Element[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is still
        // intersecting. If multiple sections overlap, prefer the one whose
        // top edge is closest to (and above) the viewport-top sentinel.
        const candidates = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
        if (candidates.length > 0) {
          setActiveId(candidates[0].target.id);
        }
      },
      {
        // Trigger when a heading is in the top ~30% of the viewport — that's
        // where a reader's eye naturally lands when scrolling slowly.
        rootMargin: "-10% 0px -60% 0px",
        threshold: 0,
      }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }
    return () => {
      observer.disconnect();
      observed.length = 0;
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile / narrow viewports: collapsible disclosure. */}
      <details className="lg:hidden mb-6 rounded-2xl border border-[color:var(--line)] bg-white p-4">
        <summary className="cursor-pointer text-sm font-medium text-[var(--text)]">
          Jump to section ({items.length})
        </summary>
        <ol className="mt-3 space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1 ${
                  activeId === item.id
                    ? "font-medium text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:text-[var(--text)]"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>

      {/* Desktop: sticky sidebar. The parent layout decides where to mount
          this and gives it the necessary width — we just paint the list. */}
      <nav
        aria-label="On this page"
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
          On this page
        </p>
        <ol className="space-y-2 border-l border-[color:var(--line)] pl-4 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1 transition-colors ${
                  activeId === item.id
                    ? "font-medium text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:text-[var(--text)]"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
