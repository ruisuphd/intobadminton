"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import { ResultCard } from "@/components/ResultCard";
import { useProfile } from "@/context/ProfileContext";
import { companyInfo } from "@/lib/company";
import type { SiteLocale } from "@/lib/locale";
import { scoreProductCatalog } from "@/lib/scoring";
import type { ScoredProduct } from "@/lib/types/product";

function buildProductJsonLd(rows: ScoredProduct[], locale: SiteLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name:
      locale === "zh"
        ? "IntoBadminton 装备推荐结果"
        : "IntoBadminton equipment recommendations",
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        "@id": `${companyInfo.siteUrl}/results/#${r.id}`,
        name: r.name,
        brand: { "@type": "Brand", name: r.brand },
        category: r.category,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: r.priceUsd,
          availability: "https://schema.org/InStock",
          url: `${companyInfo.siteUrl}/results/`,
        },
      },
    })),
  };
}

export function ResultsClient({ locale = "en" }: { locale?: SiteLocale }) {
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
      <div className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-6">
        <h2 className="font-semibold text-[var(--text)]">
          Complete your player profile first
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          We need at least your level and discipline to produce a responsible
          shortlist.
        </p>
        <Link
          href={locale === "zh" ? "/zh/quiz/" : "/en/quiz/"}
          className="mt-4 inline-block text-[var(--color-accent)] underline"
        >
          {locale === "zh" ? "开始推荐" : "Start the finder"}
        </Link>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-6">
        <h2 className="font-semibold text-[var(--text)]">
          {locale === "zh" ? "暂时没有强匹配" : "No strong matches yet"}
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          {locale === "zh"
            ? "可以放宽预算、减少一个打法标签，或换一个装备类别。"
            : "Try relaxing budget, choosing one fewer style tag, or selecting another equipment category."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductJsonLd(rows, locale)),
        }}
      />
      {rows.map((r, i) => (
        <ResultCard key={r.id} r={r} rank={i + 1} locale={locale} />
      ))}
    </div>
  );
}
