"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import { CompareTable } from "@/components/CompareTable";
import { useProfile } from "@/context/ProfileContext";
import type { ProductRecord, ScoredProduct } from "@/lib/types/product";
import { byId, scoreProductCatalog } from "@/lib/scoring";
import type { SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export function CompareShell({ locale = "en" }: { locale?: SiteLocale }) {
  const {
    compareIds,
    clearCompare,
    toggleCompare,
    hydrateCompareFromIds,
    profile,
  } = useProfile();
  const copy = t(locale).compare;
  const scored = new Map(scoreProductCatalog(profile).map((row) => [row.id, row]));
  const items = compareIds
    .map((id) => scored.get(id) ?? byId(id))
    .filter((x): x is ProductRecord | ScoredProduct => x != null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (compareIds.length > 0) return;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("p");
    if (!raw) return;
    const ids = raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (ids.length === 0) return;
    hydrateCompareFromIds(ids);
    const url = new URL(window.location.href);
    url.searchParams.delete("p");
    window.history.replaceState({}, "", url.toString());
  }, [compareIds.length, hydrateCompareFromIds]);

  const compareKey = compareIds.join(",");
  useEffect(() => {
    if (compareIds.length === 0) return;
    trackEvent("compare_view", {
      product_ids: compareKey,
      count: compareIds.length,
    });
  }, [compareKey, compareIds.length]);

  const [copied, setCopied] = useState(false);
  const handleCopyShareLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.search = `?p=${encodeURIComponent(compareIds.join(","))}`;
    navigator.clipboard?.writeText(url.toString()).then(() => {
      setCopied(true);
      trackEvent("compare_share_link", {
        product_ids: compareIds.join(","),
        count: compareIds.length,
      });
      window.setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
          {copy.title}
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">{copy.subtitle}</p>
        {compareIds.length === 0 ? (
          <p className="mt-8 text-sm text-[var(--color-muted)]">
            Add gear from your{" "}
            <Link
              href="/results/"
              className="text-[var(--color-accent)] underline"
            >
              results
            </Link>
            , the{" "}
            <Link
              href="/catalog/"
              className="text-[var(--color-accent)] underline"
            >
              catalog
            </Link>
            , or saved shelf.
          </p>
        ) : (
          <>
            <div className="mt-6">
              <CompareTable items={items} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={clearCompare}
                className="rounded-2xl border border-[color:var(--line-strong)] px-4 py-2 text-sm"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={handleCopyShareLink}
                aria-live="polite"
                className="rounded-2xl border border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/5 px-4 py-2 text-sm font-medium text-[color:var(--color-accent)]"
              >
                {copied ? "Link copied" : "Copy share link"}
              </button>
              {items.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleCompare(p.id)}
                  className="text-sm text-[var(--color-accent)]"
                >
                  Remove {p.name}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[var(--color-muted)]">
              Share the URL above to send this exact compare set to a teammate or
              opponent — they will land on this same comparison on any device.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

export default function ComparePage() {
  return <CompareShell locale="en" />;
}
