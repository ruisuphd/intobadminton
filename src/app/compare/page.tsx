"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile } from "@/context/ProfileContext";
import type { ProductRecord, ScoredProduct } from "@/lib/types/product";
import { byId, scoreProductCatalog } from "@/lib/scoring";
import type { SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

function cell(p: ProductRecord | ScoredProduct, k: string): string {
  if (k === "confidence" && "confidence" in p) return p.confidence.label;
  if (k === "resale" && p.resale) {
    return `$${p.resale.estimatedUsedUsd} used · ${p.resale.depreciationPct}% dep.`;
  }
  const v = (p as unknown as Record<string, unknown>)[k];
  if (v == null) return "—";
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

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

  // URL-shareable compare sets: if the page is loaded with a `?p=id1,id2,...`
  // query parameter, seed the compare tray from it. Only hydrates if the
  // tray is currently empty so we never silently overwrite a user's own
  // saved comparison set. This pairs with the "Copy share link" button
  // below to make compare URLs portable across devices.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (compareIds.length > 0) return;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("p");
    if (!raw) return;
    const ids = raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (ids.length === 0) return;
    hydrateCompareFromIds(ids);
    // The history replaceState below removes the query param so a future
    // browser refresh does not re-seed; the user's local state is now the
    // authority.
    const url = new URL(window.location.href);
    url.searchParams.delete("p");
    window.history.replaceState({}, "", url.toString());
  }, [compareIds.length, hydrateCompareFromIds]);

  const [copied, setCopied] = useState(false);
  const handleCopyShareLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.search = `?p=${encodeURIComponent(compareIds.join(","))}`;
    navigator.clipboard?.writeText(url.toString()).then(() => {
      setCopied(true);
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
            {"Add gear from your"}{" "}
            <Link
              href={"/results/"}
              className="text-[var(--color-accent)] underline"
            >
              {"results"}
            </Link>
            {"."}
          </p>
        ) : (
          <>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--line-strong)]">
                    <th className="py-2 pr-4">Model</th>
                    {items.map((p) => (
                      <th key={p.id} className="py-2 pr-4 font-medium">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  {[
                    "brand",
                    "category",
                    "priceUsd",
                    "resale",
                    "headWeight",
                    "shaftFlex",
                    "gaugeMm",
                    "fitWidth",
                    "capacityRackets",
                    "weightVariants",
                    "gripSizes",
                    "balanceMm",
                    "confidence",
                    "lastVerifiedAt",
                  ].map((k) => (
                      <tr
                        key={k}
                        className="border-b border-[color:var(--line)]"
                      >
                        <td className="py-2 pr-4 font-medium text-[var(--text)]">
                          {k}
                        </td>
                        {items.map((p) => (
                          <td key={p.id + k} className="py-2 pr-4">
                            {cell(p, k)}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
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
