"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FilterChipGroup } from "@/components/FilterChipGroup";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import {
  BALANCE_OPTIONS,
  CATEGORY_OPTIONS,
  PRICE_BANDS,
  allCatalogProducts,
  balanceOptionsFor,
  brandOptionsFor,
  categoryOptionsFor,
  filterProducts,
  parseCatalogFiltersFromSearchParams,
  priceBandOptionsFor,
  type PriceBand,
  type ProductFilterState,
  weightClassOptionsFor,
} from "@/lib/product-filters";
import { catalogProductHref } from "@/lib/review-pages";
import { humanize } from "@/lib/text";
import type { BalanceCategory, ProductRecord, WeightClass } from "@/lib/types/product";
import type { EquipmentCategory } from "@/lib/taxonomy";

const CATALOG_PAGE_SIZE = 40;

function specLine(p: ProductRecord): string {
  if (p.category === "racket") {
    return `${p.weightClass} · ${humanize(p.balanceCategory)} · ${humanize(p.shaftFlex)} shaft`;
  }
  if (p.category === "shoes") {
    return `${humanize(p.cushioning)} cushion · ${humanize(p.stability)} stability`;
  }
  if (p.category === "string") {
    return `${p.gaugeMm} mm · ${humanize(p.feel)} feel`;
  }
  return humanize(p.category);
}

export function CatalogClient() {
  const searchParams = useSearchParams();
  const catalog = useMemo(() => allCatalogProducts(), []);

  const initialFilters = useMemo((): ProductFilterState => {
    const fromUrl = parseCatalogFiltersFromSearchParams(
      new URLSearchParams(searchParams?.toString() ?? "")
    );
    return {
      category: fromUrl.category ?? null,
      brand: fromUrl.brand ?? null,
      weightClass: fromUrl.weightClass ?? null,
      balance: fromUrl.balance ?? null,
      priceBand: fromUrl.priceBand ?? null,
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<ProductFilterState>(initialFilters);
  const [visibleCount, setVisibleCount] = useState(CATALOG_PAGE_SIZE);

  const baseRows = useMemo(
    () =>
      filterProducts(catalog, {
        category: filters.category,
        brand: filters.brand,
        weightClass: null,
        balance: null,
        priceBand: filters.priceBand,
      }),
    [catalog, filters.category, filters.brand, filters.priceBand]
  );

  const filtered = useMemo(
    () => filterProducts(catalog, filters),
    [catalog, filters]
  );

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const brands = useMemo(() => brandOptionsFor(baseRows), [baseRows]);
  const categories = useMemo(() => categoryOptionsFor(catalog), [catalog]);
  const priceBands = useMemo(() => priceBandOptionsFor(baseRows), [baseRows]);
  const weightClasses = useMemo(
    () => weightClassOptionsFor(baseRows),
    [baseRows]
  );
  const balances = useMemo(() => balanceOptionsFor(baseRows), [baseRows]);

  const showRacketFilters =
    (filters.category === "racket" || filters.category === null) &&
    (weightClasses.length > 0 || balances.length > 0);

  const patch = (next: Partial<ProductFilterState>) => {
    setVisibleCount(CATALOG_PAGE_SIZE);
    setFilters((prev) => ({ ...prev, ...next }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FilterChipGroup
          label="Category"
          chips={[
            { value: null, label: "All" },
            ...categories.map((c) => ({
              value: c,
              label: CATEGORY_OPTIONS.find((o) => o.value === c)?.label ?? c,
            })),
          ]}
          active={filters.category}
          onChange={(v) =>
            patch({
              category: v as EquipmentCategory | null,
              weightClass: null,
              balance: null,
            })
          }
        />

        <FilterChipGroup
          label="Brand"
          chips={[
            { value: null, label: "All" },
            ...brands.map((b) => ({ value: b, label: b })),
          ]}
          active={filters.brand}
          onChange={(v) => patch({ brand: v })}
        />

        <FilterChipGroup
          label="Price"
          chips={[
            { value: null, label: "All" },
            ...PRICE_BANDS.filter((b) => priceBands.includes(b.value)).map(
              (b) => ({ value: b.value, label: b.label })
            ),
          ]}
          active={filters.priceBand}
          onChange={(v) => patch({ priceBand: v as PriceBand | null })}
        />

        {showRacketFilters && (
          <>
            <FilterChipGroup
              label="Weight"
              chips={[
                { value: null, label: "All" },
                ...weightClasses.map((w) => ({ value: w, label: w })),
              ]}
              active={filters.weightClass}
              onChange={(v) =>
                patch({ weightClass: v as WeightClass | null })
              }
            />

            <FilterChipGroup
              label="Balance"
              chips={[
                { value: null, label: "All" },
                ...balances.map((b) => ({
                  value: b,
                  label:
                    BALANCE_OPTIONS.find((o) => o.value === b)?.label ??
                    humanize(b),
                })),
              ]}
              active={filters.balance}
              onChange={(v) =>
                patch({ balance: v as BalanceCategory | null })
              }
            />
          </>
        )}
      </div>

      <p className="text-sm text-[var(--color-muted)]">
        {filtered.length} product{filtered.length === 1 ? "" : "s"} match your
        filters. Run the{" "}
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          finder
        </Link>{" "}
        for a profile-scored shortlist.
      </p>

      <ul className="divide-y divide-[color:var(--line)] rounded-2xl border border-[color:var(--line)] bg-white">
        {visible.map((p) => (
          <li key={p.id}>
            <Link
              href={catalogProductHref(p)}
              className="flex gap-4 px-5 py-4 transition-colors hover:bg-[color:var(--surface-muted)]"
            >
              {canShowProductImage(p.image) ? (
                <ProductImageView
                  image={p.image}
                  size={72}
                  className="shrink-0"
                />
              ) : (
                <div
                  className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-[color:var(--surface-muted)] text-xs font-medium text-[var(--color-subtle)]"
                  aria-hidden
                >
                  {p.brand.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip chip-secondary text-[10px]">
                    {humanize(p.category)}
                  </span>
                  <span className="text-base font-medium text-[var(--text)]">
                    {p.brand} {p.name}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {specLine(p)} · ${p.priceUsd}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length > visibleCount && (
        <button
          type="button"
          onClick={() =>
            setVisibleCount((n) =>
              Math.min(n + CATALOG_PAGE_SIZE, filtered.length)
            )
          }
          className="btn-secondary mt-4"
        >
          Show more ({filtered.length - visibleCount} remaining)
        </button>
      )}

      {filtered.length === 0 && (
        <p className="text-sm text-[var(--color-muted)]">
          No products match — try clearing a filter or browse{" "}
          <Link href="/best/" className="text-[var(--color-accent)] underline">
            best-of guides
          </Link>
          .
        </p>
      )}
    </div>
  );
}
