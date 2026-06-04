"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { ResultCard } from "@/components/ResultCard";
import { useProfile } from "@/context/ProfileContext";
import { companyInfo } from "@/lib/company";
import {
  computeEditorialRating,
  ratingDatePublished,
} from "@/lib/editorial-rating";
import { parseTopN, profileFromSearchParams } from "@/lib/profile-url";
import {
  BALANCE_OPTIONS,
  PRICE_BANDS,
  filterProducts,
  priceBandOptionsFor,
  type PriceBand,
  type ProductFilterState,
} from "@/lib/product-filters";
import { scoreProductCatalog } from "@/lib/scoring";
import { humanize } from "@/lib/text";
import type { UserProfile } from "@/lib/taxonomy";
import type {
  BalanceCategory,
  ProductRecord,
  ScoredProduct,
  WeightClass,
} from "@/lib/types/product";
import { FilterChipGroup } from "@/components/FilterChipGroup";

/**
 * /results/ is `noindex` so the structured data won't appear in SERPs, but
 * we still emit it: (1) honest signal for any non-Google crawler or AI
 * agent that reads the page, (2) consistency with the editorial-rating
 * module used on /best/* pages, (3) easier QA — a stale /results/ render
 * can be inspected for the same schema shape as the public pages.
 */
function buildProductJsonLd(rows: ScoredProduct[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IntoBadminton equipment recommendations",
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => {
      const rating = computeEditorialRating(r);
      const datePublished = ratingDatePublished(r);
      const reviewBody =
        r.editorNote ??
        `Ranked #${i + 1} for this player profile by IntoBadminton's transparent fit-score model. ${r.pros[0] ?? ""}`.trim();

      const review = {
        "@type": "Review" as const,
        name: `${r.brand} ${r.name} — IntoBadminton editor's review`,
        author: {
          "@type": "Person" as const,
          name: companyInfo.founderName,
          url: companyInfo.founderWebsite,
        },
        publisher: {
          "@type": "Organization" as const,
          name: companyInfo.siteName,
          url: companyInfo.siteUrl,
        },
        datePublished,
        reviewBody,
        ...(rating
          ? {
              reviewRating: {
                "@type": "Rating" as const,
                ratingValue: rating.ratingValue,
                bestRating: rating.bestRating,
                worstRating: rating.worstRating,
              },
            }
          : {}),
      };

      const aggregateRating =
        rating && rating.meetsAggregateThreshold
          ? {
              "@type": "AggregateRating" as const,
              ratingValue: rating.ratingValue,
              reviewCount: rating.reviewCount,
              bestRating: rating.bestRating,
              worstRating: rating.worstRating,
            }
          : undefined;

      return {
        "@type": "ListItem" as const,
        position: i + 1,
        item: {
          "@type": "Product" as const,
          "@id": `${companyInfo.siteUrl}/results/#${r.id}`,
          name: r.name,
          brand: { "@type": "Brand" as const, name: r.brand },
          category: r.category,
          description:
            r.pros[0] ??
            `${r.brand} ${r.name} — recommended by IntoBadminton for the player profile in question.`,
          additionalProperty: [
            {
              "@type": "PropertyValue" as const,
              name: "Spec source",
              value: r.evidenceProfile.officialSpec.sourceAuthority.label,
            },
            {
              "@type": "PropertyValue" as const,
              name: "Confidence",
              value: r.confidence.label,
            },
          ],
          review,
          ...(aggregateRating ? { aggregateRating } : {}),
        },
      };
    }),
  };
}

function ResultsBody() {
  const { profile: contextProfile, pushHistory } = useProfile();
  const searchParams = useSearchParams();

  // Deep-linked profile takes precedence over localStorage / context. This
  // lets users share a `/results/?level=...&disc=...` URL that always
  // reproduces the same shortlist on the recipient's device — and lets
  // returning visitors bookmark a query they ran.
  const urlProfile = useMemo<UserProfile | null>(() => {
    if (!searchParams) return null;
    return profileFromSearchParams(searchParams);
  }, [searchParams]);

  const profile = urlProfile ?? contextProfile;

  const topN = useMemo(
    () => parseTopN(searchParams?.get("n")),
    [searchParams]
  );

  const allScored = useMemo(
    () => scoreProductCatalog(profile),
    [profile]
  );

  const brandOptions = useMemo(() => {
    const brands = new Set(allScored.map((r) => r.brand));
    return [...brands].sort((a, b) => a.localeCompare(b));
  }, [allScored]);

  const priceBandOptions = useMemo(
    () => priceBandOptionsFor(allScored),
    [allScored]
  );

  const weightOptions = useMemo(() => {
    const set = new Set<WeightClass>();
    for (const r of allScored) {
      if (r.category === "racket") set.add(r.weightClass);
    }
    return [...set].sort();
  }, [allScored]);

  const balanceOptions = useMemo(() => {
    const set = new Set<BalanceCategory>();
    for (const r of allScored) {
      if (r.category === "racket") set.add(r.balanceCategory);
    }
    return [...set];
  }, [allScored]);

  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [priceBandFilter, setPriceBandFilter] = useState<PriceBand | null>(
    null
  );
  const [weightFilter, setWeightFilter] = useState<WeightClass | null>(null);
  const [balanceFilter, setBalanceFilter] = useState<BalanceCategory | null>(
    null
  );

  const filteredScored = useMemo(() => {
    const specFiltered = filterProducts(
      allScored as ProductRecord[],
      {
        category: null,
        brand: brandFilter,
        weightClass: weightFilter,
        balance: balanceFilter,
        priceBand: priceBandFilter,
      } satisfies ProductFilterState
    );
    return specFiltered as ScoredProduct[];
  }, [allScored, brandFilter, priceBandFilter, weightFilter, balanceFilter]);

  const rows = useMemo(
    () => filteredScored.slice(0, topN),
    [filteredScored, topN]
  );
  const filteredOutCount = filteredScored.length - rows.length;

  useEffect(() => {
    if (rows.length === 0) return;
    const ids = rows.map((r) => r.id).join(",");
    const key = `pushed-${ids}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    // Only push to history when the active profile came from the user's own
    // localStorage / context — otherwise `pushHistory` snapshots the context
    // profile (which differs from the URL-derived one) and a shared
    // `/results/?...` visit would pollute the recipient's history with their
    // own profile paired with someone else's top IDs.
    if (!urlProfile) {
      pushHistory(rows.map((r) => r.id));
    }
    trackEvent("recommendations_viewed", {
      result_count: rows.length,
      category: profile.category ?? "unknown",
      top_product_id: rows[0]?.id,
      from_url: urlProfile != null,
    });
  }, [rows, pushHistory, profile.category, urlProfile]);

  if (!profile.level || !profile.discipline) {
    return (
      <div className="card p-6">
        <h2 className="font-semibold text-[var(--text)]">
          Complete your player profile first
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          We need at least your level and discipline to produce a responsible
          shortlist.
        </p>
        <Link
          href="/quiz/"
          className="mt-4 inline-block text-[var(--color-accent)] underline"
        >
          Start the finder
        </Link>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="font-semibold text-[var(--text)]">
          No strong matches yet
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          Try relaxing budget, choosing one fewer style tag, or selecting
          another equipment category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {brandOptions.length > 1 && (
          <FilterChipGroup
            label="Brand"
            chips={[
              { value: null, label: "All" },
              ...brandOptions.map((b) => ({ value: b, label: b })),
            ]}
            active={brandFilter}
            onChange={setBrandFilter}
          />
        )}
        {priceBandOptions.length > 1 && (
          <FilterChipGroup
            label="Price"
            chips={[
              { value: null, label: "All" },
              ...PRICE_BANDS.filter((b) =>
                priceBandOptions.includes(b.value)
              ).map((b) => ({ value: b.value, label: b.label })),
            ]}
            active={priceBandFilter}
            onChange={(v) => setPriceBandFilter(v as PriceBand | null)}
          />
        )}
        {weightOptions.length > 1 && (
          <FilterChipGroup
            label="Weight"
            chips={[
              { value: null, label: "All" },
              ...weightOptions.map((w) => ({ value: w, label: w })),
            ]}
            active={weightFilter}
            onChange={(v) => setWeightFilter(v as WeightClass | null)}
          />
        )}
        {balanceOptions.length > 1 && (
          <FilterChipGroup
            label="Balance"
            chips={[
              { value: null, label: "All" },
              ...balanceOptions.map((b) => ({
                value: b,
                label:
                  BALANCE_OPTIONS.find((o) => o.value === b)?.label ??
                  humanize(b),
              })),
            ]}
            active={balanceFilter}
            onChange={(v) => setBalanceFilter(v as BalanceCategory | null)}
          />
        )}
      </div>
      <JsonLd data={buildProductJsonLd(rows)} />
      {rows.map((r, i) => (
        <ResultCard key={r.id} r={r} rank={i + 1} />
      ))}
      {filteredOutCount > 0 && (
        <details className="card p-5 text-sm">
          <summary
            className="cursor-pointer list-none font-medium text-[var(--text)]"
            aria-live="polite"
          >
            {filteredOutCount} more {profile.category ?? "product"}
            {filteredOutCount === 1 ? "" : "s"} matched your profile but
            didn&apos;t make the top {rows.length} — why?
          </summary>
          <p className="mt-3 text-[var(--color-muted)]">
            Lower-ranked rows either fall outside your skill-band, stretch the
            budget by enough that the smooth budget decay pulled them below
            top-{rows.length}, or carry a confidence chip ({"“"}needs
            verification{"”"}) that reduces their score versus equivalent
            officially-verified rows. Bump <code>?n=12</code> or
            <code>?n=20</code> in the URL to see more.
          </p>
        </details>
      )}
    </div>
  );
}

export function ResultsClient() {
  // Wrap in Suspense because `useSearchParams()` requires it in Next 16's
  // static export when consumed by a client component — Next defers the
  // search-params read until the client hydrates.
  return (
    <Suspense fallback={null}>
      <ResultsBody />
    </Suspense>
  );
}
