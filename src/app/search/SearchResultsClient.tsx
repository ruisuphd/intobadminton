"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SiteSearchForm } from "@/components/SiteSearchForm";
import {
  searchRecords,
  type SearchIndex,
  type SearchHit,
} from "@/lib/site-search";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function SearchResultsClient() {
  const searchParams = useSearchParams();
  const initialQuery = (searchParams?.get("q") ?? "").trim();
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${basePath}/search-index.json`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<SearchIndex>;
      })
      .then((data) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const hits: SearchHit[] = useMemo(() => {
    if (!index || !initialQuery.trim()) return [];
    return searchRecords(index.records, initialQuery);
  }, [index, initialQuery]);

  return (
    <>
      <SiteSearchForm defaultQuery={initialQuery} />

      {loadError && (
        <p className="mt-8 text-sm text-[var(--color-muted)]" role="alert">
          Search index could not load. Try again after a refresh.
        </p>
      )}

      {!loadError && !index && (
        <p className="mt-8 text-sm text-[var(--color-muted)]">Loading index…</p>
      )}

      {index && !initialQuery.trim() && (
        <p className="mt-8 text-sm text-[var(--color-muted)]">
          Enter a racket name, brand, or topic — e.g.{" "}
          <span className="font-medium text-[var(--text)]">Astrox 99</span>,{" "}
          <span className="font-medium text-[var(--text)]">string tension</span>
          , or{" "}
          <span className="font-medium text-[var(--text)]">wide feet shoes</span>
          .
        </p>
      )}

      {index && initialQuery.trim() && hits.length === 0 && (
        <p className="mt-8 text-sm text-[var(--color-muted)]">
          No matches for &ldquo;{initialQuery}&rdquo;. Try a shorter brand or
          model name, or browse{" "}
          <Link href="/review/" className="text-[var(--color-accent)] underline">
            all reviews
          </Link>
          .
        </p>
      )}

      {hits.length > 0 && (
        <ul className="mt-10 space-y-4">
          {hits.map((hit) => (
            <li key={hit.id}>
              <Link
                href={hit.href}
                className="card card-interactive block p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip chip-secondary">{hit.kind}</span>
                  <span className="sr-only">Relevance score {hit.score}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">
                  {hit.title}
                </h2>
                {hit.excerpt && (
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {hit.excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
