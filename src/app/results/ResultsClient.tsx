"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import { ResultCard } from "@/components/ResultCard";
import { useProfile } from "@/context/ProfileContext";
import { companyInfo } from "@/lib/company";
import {
  computeEditorialRating,
  ratingDatePublished,
} from "@/lib/editorial-rating";
import { scoreProductCatalog } from "@/lib/scoring";
import type { ScoredProduct } from "@/lib/types/product";

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

export function ResultsClient() {
  const { profile, pushHistory } = useProfile();
  const rows = useMemo(
    () => scoreProductCatalog(profile).slice(0, 8),
    [profile]
  );

  useEffect(() => {
    if (rows.length === 0) return;
    const ids = rows.map((r) => r.id).join(",");
    const key = `pushed-${ids}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    pushHistory(rows.map((r) => r.id));
    trackEvent("recommendations_viewed", {
      result_count: rows.length,
      category: profile.category ?? "unknown",
      top_product_id: rows[0]?.id,
    });
  }, [rows, pushHistory, profile.category]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductJsonLd(rows)),
        }}
      />
      {rows.map((r, i) => (
        <ResultCard key={r.id} r={r} rank={i + 1} />
      ))}
    </div>
  );
}
