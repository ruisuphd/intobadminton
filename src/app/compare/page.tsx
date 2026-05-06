"use client";

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
  const { compareIds, clearCompare, toggleCompare, profile } = useProfile();
  const copy = t(locale).compare;
  const scored = new Map(scoreProductCatalog(profile).map((row) => [row.id, row]));
  const items = compareIds
    .map((id) => scored.get(id) ?? byId(id))
    .filter((x): x is ProductRecord | ScoredProduct => x != null);

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
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={clearCompare}
                className="rounded-2xl border border-[color:var(--line-strong)] px-4 py-2 text-sm"
              >
                Clear all
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
          </>
        )}
      </div>
    </main>
  );
}

export default function ComparePage() {
  return <CompareShell locale="en" />;
}
