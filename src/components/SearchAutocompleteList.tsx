"use client";

import Link from "next/link";
import type { SearchSuggestion } from "@/lib/search-suggestions";
import type { SearchEntryKind } from "@/lib/site-search";

const KIND_LABEL: Record<SearchEntryKind, string> = {
  review: "Review",
  guide: "Guide",
  best: "Best of",
  tool: "Tool",
  brand: "Brand",
  compare: "Compare",
  product: "Product",
};

export function SearchAutocompleteList({
  suggestions,
  activeIndex,
  listId,
  onPick,
}: {
  suggestions: SearchSuggestion[];
  activeIndex: number;
  listId: string;
  onPick?: () => void;
}) {
  if (suggestions.length === 0) return null;

  return (
    <ul
      id={listId}
      role="listbox"
      className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-2xl border border-[color:var(--line)] bg-white py-1 shadow-lg"
    >
      {suggestions.map((row, idx) => {
        if (row.kind === "catalog") {
          return (
            <li key="catalog" role="presentation">
              <Link
                href={row.href}
                role="option"
                aria-selected={activeIndex === idx}
                onClick={onPick}
                className={`block px-4 py-3 text-sm transition-colors hover:bg-[color:var(--surface-muted)] ${
                  activeIndex === idx ? "bg-[color:var(--surface-muted)]" : ""
                }`}
              >
                <span className="chip chip-primary mr-2 text-[10px]">Catalog</span>
                <span className="font-medium text-[var(--text)]">
                  Browse {row.count} product{row.count === 1 ? "" : "s"}
                </span>
                <span className="mt-0.5 block text-[var(--color-muted)]">
                  Matching &ldquo;{row.query}&rdquo;
                </span>
              </Link>
            </li>
          );
        }

        const { entry } = row;
        return (
          <li key={entry.href} role="presentation">
            <Link
              href={entry.href}
              role="option"
              aria-selected={activeIndex === idx}
              onClick={onPick}
              className={`block px-4 py-3 text-sm transition-colors hover:bg-[color:var(--surface-muted)] ${
                activeIndex === idx ? "bg-[color:var(--surface-muted)]" : ""
              }`}
            >
              <span className="chip chip-secondary mr-2 text-[10px]">
                {KIND_LABEL[entry.kind]}
              </span>
              <span className="font-medium text-[var(--text)]">{entry.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
