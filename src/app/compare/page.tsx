"use client";

import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { useProfile } from "@/context/ProfileContext";
import type { RacketProduct } from "@/lib/types/product";
import { byId } from "@/lib/scoring";

function cell(p: RacketProduct, k: string): string {
  const v = (p as unknown as Record<string, unknown>)[k];
  if (v == null) return "—";
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

export default function ComparePage() {
  const { compareIds, clearCompare, toggleCompare } = useProfile();
  const items = compareIds
    .map((id) => byId(id))
    .filter((x): x is RacketProduct => x != null);

  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Compare
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">Up to three rackets side by side.</p>
        {compareIds.length === 0 ? (
          <p className="mt-8 text-sm text-[var(--color-muted)]">
            Add rackets from your{" "}
            <Link href="/results/" className="text-[var(--color-accent)] underline">
              results
            </Link>
            .
          </p>
        ) : (
          <>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-600">
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
                    "priceUsd",
                    "headWeight",
                    "shaftFlex",
                    "weightVariants",
                    "gripSizes",
                    "balanceMm",
                    "lastVerifiedAt",
                  ].map((k) => (
                      <tr
                        key={k}
                        className="border-b border-zinc-100 dark:border-zinc-800"
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
                className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-600"
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
        <AdSlot id="compare-below" className="mt-12" />
      </div>
    </main>
  );
}
