"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchSite, type SearchEntryKind } from "@/lib/site-search";

const KIND_LABEL: Record<SearchEntryKind, string> = {
  review: "Review",
  guide: "Guide",
  best: "Best of",
  tool: "Tool",
  brand: "Brand",
  compare: "Compare",
};

export function SiteSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => searchSite(query), [query]);

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="sr-only">Search IntoBadminton</span>
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search reviews, guides, tools…"
          autoComplete="off"
          autoFocus={initialQuery.length === 0}
          className="w-full rounded-2xl border border-[color:var(--line-strong)] bg-white px-5 py-4 text-base text-[var(--text)] placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </label>

      {query.trim().length === 0 ? (
        <p className="text-sm text-[var(--color-muted)]">
          Try &ldquo;astrox&rdquo;, &ldquo;wide feet shoes&rdquo;, or
          &ldquo;string tension&rdquo;.
        </p>
      ) : results.length === 0 ? (
        <p className="text-sm text-[var(--color-muted)]">
          No matches for &ldquo;{query.trim()}&rdquo;. Browse the{" "}
          <Link href="/review/" className="text-[var(--color-accent)] underline">
            reviews hub
          </Link>{" "}
          or run the{" "}
          <Link href="/quiz/" className="text-[var(--color-accent)] underline">
            finder
          </Link>
          .
        </p>
      ) : (
        <ul className="divide-y divide-[color:var(--line)] rounded-2xl border border-[color:var(--line)] bg-white">
          {results.map((entry) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className="block px-5 py-4 transition-colors hover:bg-[color:var(--surface-muted)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip chip-secondary text-[10px]">
                    {KIND_LABEL[entry.kind]}
                  </span>
                  <span className="text-base font-medium text-[var(--text)]">
                    {entry.title}
                  </span>
                </div>
                {entry.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)] line-clamp-2">
                    {entry.summary}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
