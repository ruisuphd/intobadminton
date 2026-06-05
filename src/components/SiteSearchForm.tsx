"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { SearchAutocompleteList } from "@/components/SearchAutocompleteList";
import { catalogHrefFromKeywordQuery } from "@/lib/catalog-url";
import {
  MIN_SUGGESTION_QUERY_LEN,
  searchSuggestions,
} from "@/lib/search-suggestions";

export function SiteSearchForm({
  defaultQuery = "",
  compact = false,
}: {
  defaultQuery?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const inputId = useId();
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(defaultQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const suggestions = useMemo(
    () => (open ? searchSuggestions(query, compact ? 5 : 6) : []),
    [open, query, compact]
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const goSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      router.push("/search/");
      return;
    }
    router.push(`/search/?q=${encodeURIComponent(trimmed)}`);
  };

  const goCatalog = (q: string) => {
    const trimmed = q.trim();
    router.push(catalogHrefFromKeywordQuery(trimmed || ""));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    goSearch(query);
  };

  const pickSuggestion = (index: number) => {
    const row = suggestions[index];
    if (!row) return;
    setOpen(false);
    if (row.kind === "catalog") {
      router.push(row.href);
      return;
    }
    router.push(row.entry.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      if (e.key === "ArrowDown" && query.trim().length >= MIN_SUGGESTION_QUERY_LEN) {
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      pickSuggestion(activeIndex);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const inputClass = compact
    ? "h-9 min-w-0 flex-1 rounded-full border border-[color:var(--line-strong)] bg-white px-3 text-sm text-[var(--text)] placeholder:text-[var(--color-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    : "h-12 min-w-0 flex-1 rounded-2xl border border-[color:var(--line-strong)] bg-white px-4 text-base text-[var(--text)] placeholder:text-[var(--color-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";

  const primaryBtnClass = compact
    ? "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] px-3 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
    : "inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]";

  const secondaryBtnClass = compact
    ? "inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-white px-3 text-sm font-medium text-[var(--text)] hover:bg-[color:var(--surface-muted)]"
    : "inline-flex h-12 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--line-strong)] bg-white px-4 text-sm font-medium text-[var(--text)] hover:bg-[color:var(--surface-muted)]";

  return (
    <div
      ref={wrapRef}
      className={
        compact
          ? "relative flex w-full max-w-md items-center gap-1.5"
          : "relative flex w-full max-w-xl items-stretch gap-2"
      }
    >
      <form
        role="search"
        onSubmit={onSubmit}
        className="flex min-w-0 flex-1 items-stretch gap-2"
      >
        <label htmlFor={inputId} className="sr-only">
          Search reviews, products, and guides
        </label>
        <input
          id={inputId}
          name="q"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            if (query.trim().length >= MIN_SUGGESTION_QUERY_LEN) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search rackets, reviews, guides…"
          autoComplete="off"
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          className={inputClass}
        />
        <button type="submit" className={primaryBtnClass}>
          Search
        </button>
        <button
          type="button"
          onClick={() => goCatalog(query)}
          className={secondaryBtnClass}
          title="Browse matching products in the catalog"
        >
          Catalog
        </button>
      </form>
      {open && suggestions.length > 0 && (
        <SearchAutocompleteList
          listId={listId}
          suggestions={suggestions}
          activeIndex={activeIndex}
          onPick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
