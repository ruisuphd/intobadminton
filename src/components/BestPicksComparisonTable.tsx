"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import productsCatalog from "@/data/products.json";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import {
  computeEditorialRating,
  lookupCatalogProduct,
} from "@/lib/editorial-rating";
import { illustrativeFitForProductId } from "@/lib/best-picks-scoring";
import type { ProductRecord } from "@/lib/types/product";
import type { Pick } from "@/components/BestPicksPage";
import { productHref } from "@/lib/review-pages";

const CATALOG = productsCatalog as ProductRecord[];

/**
 * Side-by-side comparison table above the per-product write-ups on /best/*.
 *
 * SEO note: the table is hydrated client-side for sort interactivity, but the
 * underlying HTML on first paint already contains every spec row. Server-side
 * rendering means crawlers see the comparison data without executing JS.
 *
 * UX note: only show the columns that *every* pick actually fills. A column
 * full of "—" reads as a missing data field and hurts trust.
 */

type SortKey = "rank" | "name" | "priceUsd" | "rating" | "fitScore";

type Row = {
  pick: Pick;
  ratingValue: number | null;
  ratingCount: number | null;
  fitScore: number | null;
  specMap: Record<string, string>;
};

function deriveRows(picks: Pick[]): { rows: Row[]; specLabels: string[] } {
  const rows: Row[] = picks.map((pick) => {
    const catalogMatch = lookupCatalogProduct(CATALOG, pick.brand, pick.name);
    const rating = computeEditorialRating(catalogMatch);
    const specMap: Record<string, string> = {};
    for (const s of pick.specs) {
      specMap[s.label] = s.value;
    }
    const scored = illustrativeFitForProductId(pick.productId);
    return {
      pick,
      ratingValue: rating?.ratingValue ?? null,
      ratingCount: rating?.meetsAggregateThreshold ? rating.reviewCount : null,
      fitScore: scored?.fitScore ?? null,
      specMap,
    };
  });

  // Only include a spec column if at least 2 picks actually carry that label.
  const allLabels = new Set<string>();
  for (const r of rows) for (const label of Object.keys(r.specMap)) allLabels.add(label);
  const specLabels = [...allLabels].filter(
    (label) => rows.filter((r) => r.specMap[label] != null).length >= 2
  );

  return { rows, specLabels };
}

function compareBy(
  a: Row,
  b: Row,
  key: SortKey,
  direction: 1 | -1
): number {
  let result = 0;
  switch (key) {
    case "rank":
      result = a.pick.rank - b.pick.rank;
      break;
    case "name":
      result = `${a.pick.brand} ${a.pick.name}`.localeCompare(
        `${b.pick.brand} ${b.pick.name}`
      );
      break;
    case "priceUsd":
      result = a.pick.priceUsd - b.pick.priceUsd;
      break;
    case "rating":
      result = (a.ratingValue ?? 0) - (b.ratingValue ?? 0);
      break;
    case "fitScore":
      result = (a.fitScore ?? 0) - (b.fitScore ?? 0);
      break;
  }
  return result * direction;
}

export function BestPicksComparisonTable({ picks }: { picks: Pick[] }) {
  const { rows, specLabels } = useMemo(() => deriveRows(picks), [picks]);
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [direction, setDirection] = useState<1 | -1>(1);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => compareBy(a, b, sortKey, direction)),
    [rows, sortKey, direction]
  );

  const headerButton = (key: SortKey, label: string) => {
    const active = key === sortKey;
    return (
      <button
        type="button"
        onClick={() => {
          if (active) {
            setDirection((d) => (d === 1 ? -1 : 1));
          } else {
            setSortKey(key);
            setDirection(1);
          }
        }}
        className={`inline-flex items-center gap-1 ${
          active
            ? "text-[var(--color-accent)]"
            : "text-[var(--text)] hover:text-[var(--color-accent)]"
        }`}
      >
        {label}
        {active ? <span aria-hidden>{direction === 1 ? "▲" : "▼"}</span> : null}
      </button>
    );
  };

  // `aria-sort` belongs on the column header (<th>), not the trigger inside.
  // This helper returns the appropriate value per column.
  const sortAttrFor = (key: SortKey): "ascending" | "descending" | "none" => {
    if (sortKey !== key) return "none";
    return direction === 1 ? "ascending" : "descending";
  };

  return (
    <section
      className="my-8 overflow-x-auto rounded-2xl border border-[color:var(--line)] bg-white"
      aria-label="Side-by-side comparison of every pick on this page"
    >
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-[color:var(--surface-muted)] text-[var(--text)]">
          <tr>
            <th
              scope="col"
              aria-sort={sortAttrFor("rank")}
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
            >
              {headerButton("rank", "#")}
            </th>
            <th
              scope="col"
              aria-sort={sortAttrFor("name")}
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
            >
              {headerButton("name", "Pick")}
            </th>
            <th
              scope="col"
              aria-sort={sortAttrFor("priceUsd")}
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
            >
              {headerButton("priceUsd", "Price (USD)")}
            </th>
            <th
              scope="col"
              aria-sort={sortAttrFor("rating")}
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
            >
              {headerButton("rating", "Editorial rating")}
            </th>
            <th
              scope="col"
              aria-sort={sortAttrFor("fitScore")}
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
            >
              {headerButton("fitScore", "Finder fit")}
            </th>
            {specLabels.map((label) => (
              <th
                key={label}
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text)]"
              >
                {label}
              </th>
            ))}
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text)]"
            >
              Best for
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:var(--line)] text-[var(--text-secondary)]">
          {sorted.map((row) => (
            <tr key={`${row.pick.brand}-${row.pick.name}`}>
              <th
                scope="row"
                className="px-4 py-3 align-top font-semibold text-[var(--text)]"
              >
                #{row.pick.rank}
              </th>
              <td className="px-4 py-3 align-top">
                {row.pick.productId ? (
                  <Link
                    href={productHref(row.pick.productId)}
                    className="font-medium text-[var(--text)] hover:text-[var(--color-accent)]"
                  >
                    {row.pick.brand} {row.pick.name}
                  </Link>
                ) : (
                  <a
                    href={`#${row.pick.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-medium text-[var(--text)] hover:text-[var(--color-accent)]"
                  >
                    {row.pick.brand} {row.pick.name}
                  </a>
                )}
              </td>
              <td className="px-4 py-3 align-top tabular-nums">
                ~${row.pick.priceUsd}
              </td>
              <td className="px-4 py-3 align-top">
                {row.ratingValue != null ? (
                  <span className="inline-flex items-center gap-1">
                    <span aria-hidden>★</span>
                    <span className="tabular-nums font-medium text-[var(--text)]">
                      {row.ratingValue.toFixed(1)}
                    </span>
                    {row.ratingCount != null && (
                      <span className="text-xs text-[var(--color-subtle)]">
                        ({row.ratingCount})
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-subtle)]">—</span>
                )}
              </td>
              <td className="px-4 py-3 align-top">
                {row.fitScore != null ? (
                  <FitScoreBadge fitScore={row.fitScore} size={40} showLabel={false} />
                ) : (
                  <span className="text-xs text-[var(--color-subtle)]">—</span>
                )}
              </td>
              {specLabels.map((label) => (
                <td key={label} className="px-4 py-3 align-top">
                  {row.specMap[label] ?? (
                    <span className="text-xs text-[var(--color-subtle)]">—</span>
                  )}
                </td>
              ))}
              <td className="px-4 py-3 align-top text-xs text-[var(--color-muted)]">
                {row.pick.bestFor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-[color:var(--line)] px-4 py-3 text-xs text-[var(--color-muted)]">
        Finder fit scores use the{" "}
        <Link href="/methodology/" className="text-[var(--color-accent)] hover:underline">
          reference club doubles profile
        </Link>
        .{" "}
        <Link href="/quiz/" className="text-[var(--color-accent)] hover:underline">
          Take the quiz
        </Link>{" "}
        for your shortlist.
      </p>
    </section>
  );
}
