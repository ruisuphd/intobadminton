"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BALANCE_OPTIONS,
  SHAFT_FLEX_OPTIONS,
  WEIGHT_CLASS_OPTIONS,
  balanceLabel,
  catalogBrands,
  filterCatalog,
  parseProductFacetFilters,
  productFacetSearchParams,
  shaftFlexLabel,
} from "@/lib/product-facets";
import { reviewPath } from "@/lib/review-pages";
import type { RacketProduct } from "@/lib/types/product";

function ProductRow({ product }: { product: RacketProduct }) {
  const reviewHref = reviewPath(product.id);
  const specBits = [
    product.weightClass,
    product.balanceCategory ? balanceLabel(product.balanceCategory) : null,
    product.shaftFlex ? shaftFlexLabel(product.shaftFlex) : null,
    product.priceUsd != null ? `$${product.priceUsd}` : null,
  ].filter(Boolean);

  return (
    <li className="rounded-2xl border border-[color:var(--line)] bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
            {product.brand}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[var(--text)]">
            {product.name}
          </h2>
          {specBits.length > 0 && (
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {specBits.join(" · ")}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {reviewHref && (
            <Link
              href={reviewHref}
              className="chip chip-secondary text-xs"
            >
              Review
            </Link>
          )}
          <Link href="/quiz/" className="chip chip-primary text-xs">
            Fit score
          </Link>
        </div>
      </div>
      {product.editorNote && (
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] line-clamp-3">
          {product.editorNote}
        </p>
      )}
    </li>
  );
}

export function CatalogBrowseClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseProductFacetFilters(searchParams),
    [searchParams]
  );
  const [queryDraft, setQueryDraft] = useState(filters.query ?? "");

  const results = useMemo(
    () => filterCatalog({ ...filters, category: filters.category ?? "racket" }),
    [filters]
  );

  const brands = useMemo(() => catalogBrands("racket"), []);

  const pushFilters = (next: ReturnType<typeof parseProductFacetFilters>) => {
    const params = productFacetSearchParams(next);
    const qs = params.toString();
    router.push(qs ? `/browse/?${qs}` : "/browse/");
  };

  const toggleWeight = (value: (typeof WEIGHT_CLASS_OPTIONS)[number]) => {
    const current = new Set(filters.weightClasses ?? []);
    if (current.has(value)) current.delete(value);
    else current.add(value);
    pushFilters({
      ...filters,
      weightClasses: [...current],
    });
  };

  const toggleBalance = (value: (typeof BALANCE_OPTIONS)[number]) => {
    const current = new Set(filters.balance ?? []);
    if (current.has(value)) current.delete(value);
    else current.add(value);
    pushFilters({
      ...filters,
      balance: [...current],
    });
  };

  const toggleFlex = (value: (typeof SHAFT_FLEX_OPTIONS)[number]) => {
    const current = new Set(filters.shaftFlex ?? []);
    if (current.has(value)) current.delete(value);
    else current.add(value);
    pushFilters({
      ...filters,
      shaftFlex: [...current],
    });
  };

  return (
    <div className="space-y-8">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          pushFilters({ ...filters, query: queryDraft.trim() || undefined });
        }}
      >
        <label className="sr-only" htmlFor="browse-q">
          Search catalog
        </label>
        <input
          id="browse-q"
          type="search"
          value={queryDraft}
          onChange={(event) => setQueryDraft(event.target.value)}
          placeholder="Filter by name, brand, or note…"
          className="h-12 min-w-0 flex-1 rounded-2xl border border-[color:var(--line-strong)] bg-white px-4 text-base text-[var(--text)]"
        />
        <button type="submit" className="btn-primary h-12 px-6">
          Apply
        </button>
      </form>

      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-medium text-[var(--text)]">
            Weight class
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {WEIGHT_CLASS_OPTIONS.map((weight) => (
              <button
                key={weight}
                type="button"
                aria-pressed={filters.weightClasses?.includes(weight) ?? false}
                onClick={() => toggleWeight(weight)}
                className={
                  filters.weightClasses?.includes(weight)
                    ? "chip chip-primary"
                    : "chip chip-secondary"
                }
              >
                {weight}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-[var(--text)]">
            Balance
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {BALANCE_OPTIONS.map((balance) => (
              <button
                key={balance}
                type="button"
                aria-pressed={filters.balance?.includes(balance) ?? false}
                onClick={() => toggleBalance(balance)}
                className={
                  filters.balance?.includes(balance)
                    ? "chip chip-primary"
                    : "chip chip-secondary"
                }
              >
                {balanceLabel(balance)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-[var(--text)]">
            Shaft flex
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {SHAFT_FLEX_OPTIONS.map((flex) => (
              <button
                key={flex}
                type="button"
                aria-pressed={filters.shaftFlex?.includes(flex) ?? false}
                onClick={() => toggleFlex(flex)}
                className={
                  filters.shaftFlex?.includes(flex)
                    ? "chip chip-primary"
                    : "chip chip-secondary"
                }
              >
                {shaftFlexLabel(flex)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-[var(--text)]">
            Max price (USD MSRP)
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[100, 150, 220, 300].map((cap) => (
              <button
                key={cap}
                type="button"
                aria-pressed={filters.maxPriceUsd === cap}
                onClick={() =>
                  pushFilters({
                    ...filters,
                    maxPriceUsd:
                      filters.maxPriceUsd === cap ? undefined : cap,
                  })
                }
                className={
                  filters.maxPriceUsd === cap
                    ? "chip chip-primary"
                    : "chip chip-secondary"
                }
              >
                Under ${cap}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-[var(--text)]">
            Brand
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                aria-pressed={filters.brand === brand}
                onClick={() =>
                  pushFilters({
                    ...filters,
                    brand: filters.brand === brand ? undefined : brand,
                  })
                }
                className={
                  filters.brand === brand
                    ? "chip chip-primary"
                    : "chip chip-secondary"
                }
              >
                {brand}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="text-sm text-[var(--color-muted)]">
        {results.length} racket{results.length === 1 ? "" : "s"} match.
        Need a ranked shortlist? Try the{" "}
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          equipment finder
        </Link>
        .
      </p>

      <ul className="grid gap-4">
        {results.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
