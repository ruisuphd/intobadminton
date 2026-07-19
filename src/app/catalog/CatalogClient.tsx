"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/components/Analytics";
import { useProfile } from "@/context/ProfileContext";
import { CatalogProductActions } from "@/components/CatalogProductActions";
import { FilterChipGroup } from "@/components/FilterChipGroup";
import {
  ProductImageView,
  canShowProductImage,
} from "@/components/ProductImage";
import {
  catalogSearchParamsFromState,
  parseCatalogSearchParams,
  type CatalogSort,
  type CatalogUrlState,
} from "@/lib/catalog-url";
import { catalogFitScore, isFinderProfileReady } from "@/lib/profile-ready";
import {
  BALANCE_OPTIONS,
  CATEGORY_OPTIONS,
  PRICE_BANDS,
  allCatalogProducts,
  balanceOptionsFor,
  brandOptionsFor,
  categoryOptionsFor,
  filterProducts,
  priceBandOptionsFor,
  type PriceBand,
  type ProductFilterState,
  weightClassOptionsFor,
} from "@/lib/product-filters";
import { filterProductsByKeyword } from "@/lib/catalog-keyword";
import { catalogProductHref } from "@/lib/review-pages";
import { humanize } from "@/lib/text";
import type { BalanceCategory, ProductRecord, WeightClass } from "@/lib/types/product";
import type { EquipmentCategory } from "@/lib/taxonomy";

const BASE_SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

const FIT_SORT_OPTION: { value: CatalogSort; label: string } = {
  value: "fit-desc",
  label: "Best fit for you",
};

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

function sortProducts(
  rows: ProductRecord[],
  sort: CatalogSort,
  profile: ReturnType<typeof useProfile>["profile"] | null
): ProductRecord[] {
  const next = [...rows];
  switch (sort) {
    case "fit-desc": {
      if (!profile || !isFinderProfileReady(profile)) {
        return sortProducts(rows, "price-asc", profile);
      }
      return next.sort((a, b) => {
        const fitDelta = catalogFitScore(b, profile) - catalogFitScore(a, profile);
        if (fitDelta !== 0) return fitDelta;
        return a.name.localeCompare(b.name);
      });
    }
    case "price-desc":
      return next.sort((a, b) => b.priceUsd - a.priceUsd || a.name.localeCompare(b.name));
    case "name":
      return next.sort(
        (a, b) =>
          a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name)
      );
    case "price-asc":
    default:
      return next.sort((a, b) => a.priceUsd - b.priceUsd || a.name.localeCompare(b.name));
  }
}

function filtersFromState(state: CatalogUrlState): ProductFilterState {
  return {
    category: state.category,
    brand: state.brand,
    weightClass: state.weightClass,
    balance: state.balance,
    priceBand: state.priceBand,
  };
}

export function CatalogClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { profile, storageReady } = useProfile();
  const catalog = useMemo(() => allCatalogProducts(), []);
  const profileReady = storageReady && isFinderProfileReady(profile);
  const sortOptions = useMemo(
    () =>
      profileReady
        ? [FIT_SORT_OPTION, ...BASE_SORT_OPTIONS]
        : BASE_SORT_OPTIONS,
    [profileReady]
  );

  const state = useMemo(
    () => parseCatalogSearchParams(searchParams),
    [searchParams]
  );
  const filters = filtersFromState(state);
  const urlKeyword = state.q ?? "";
  const [keywordDraft, setKeywordDraft] = useState(urlKeyword);
  const [seenUrlKeyword, setSeenUrlKeyword] = useState(urlKeyword);
  if (urlKeyword !== seenUrlKeyword) {
    setSeenUrlKeyword(urlKeyword);
    setKeywordDraft(urlKeyword);
  }

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

  const filtered = useMemo(() => {
    const specFiltered = filterProducts(catalog, filters);
    const keywordFiltered = filterProductsByKeyword(
      specFiltered,
      keywordDraft.trim() || null
    );
    return sortProducts(
      keywordFiltered,
      state.sort,
      profileReady ? profile : null
    );
  }, [
    catalog,
    filters,
    keywordDraft,
    state.sort,
    profile,
    profileReady,
  ]);

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

  const replaceState = (next: CatalogUrlState) => {
    const params = catalogSearchParamsFromState(next);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const patch = (next: Partial<CatalogUrlState>) => {
    const merged = { ...state, ...next };
    trackEvent("catalog_filter", {
      category: merged.category ?? "all",
      brand: merged.brand ?? "all",
      price_band: merged.priceBand ?? "all",
      weight: merged.weightClass ?? "all",
      balance: merged.balance ?? "all",
      sort: merged.sort,
      keyword: merged.q ? "yes" : "no",
    });
    replaceState(merged);
  };

  useEffect(() => {
    const trimmed = keywordDraft.trim();
    const nextQ = trimmed.length > 0 ? trimmed : null;
    if (nextQ === state.q) return;
    const timer = window.setTimeout(() => {
      patch({ q: nextQ });
    }, 250);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce keyword → URL only
  }, [keywordDraft, state.q]);

  const onFinderCta = () => {
    trackEvent("catalog_finder_cta", {
      result_count: filtered.length,
      category: filters.category ?? "all",
      price_band: filters.priceBand ?? "all",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="catalog-keyword" className="sr-only">
          Search catalog by name or spec
        </label>
        <input
          id="catalog-keyword"
          type="search"
          value={keywordDraft}
          onChange={(e) => setKeywordDraft(e.target.value)}
          placeholder="Search by brand, model, or spec (e.g. Yonex 4U head-light)"
          className="w-full rounded-xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
          autoComplete="off"
          enterKeyHint="search"
        />
      </div>

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

        <FilterChipGroup
          label="Sort"
          chips={sortOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          active={state.sort}
          onChange={(v) => patch({ sort: (v ?? "price-asc") as CatalogSort })}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-muted)]">
          {filtered.length} product{filtered.length === 1 ? "" : "s"} match your
          {state.q ? " search and filters" : " filters"}.
        </p>
        <Link
          href="/quiz/"
          onClick={onFinderCta}
          className="btn-primary text-sm"
        >
          Score these with the finder
        </Link>
      </div>

      <ul className="divide-y divide-[color:var(--line)] rounded-2xl border border-[color:var(--line)] bg-white">
        {filtered.map((p) => (
          <li key={p.id} className="flex flex-col sm:flex-row sm:items-stretch">
            <Link
              href={catalogProductHref(p)}
              onClick={() =>
                trackEvent("catalog_product_click", {
                  product_id: p.id,
                  product_brand: p.brand,
                  category: p.category,
                })
              }
              className="flex min-w-0 flex-1 gap-4 px-5 py-4 transition-colors hover:bg-[color:var(--surface-muted)]"
            >
              {canShowProductImage(p.image) ? (
                <ProductImageView
                  image={p.image}
                  size={72}
                  hideCaption
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
            <CatalogProductActions product={p} />
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-sm text-[var(--color-muted)]">
          No products match — try clearing your{" "}
          {keywordDraft.trim() ? (
            <>
              search or{" "}
              <button
                type="button"
                onClick={() => setKeywordDraft("")}
                className="text-[var(--color-accent)] underline"
              >
                keyword
              </button>
            </>
          ) : (
            "filters"
          )}{" "}
          or browse{" "}
          <Link href="/best/" className="text-[var(--color-accent)] underline">
            best-of guides
          </Link>
          .
        </p>
      )}
    </div>
  );
}
