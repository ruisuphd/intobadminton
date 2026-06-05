"use client";

import Link from "next/link";
import { trackEvent } from "@/components/Analytics";
import { SaveProductButton } from "@/components/SaveProductButton";
import { compareLimit, useProfile } from "@/context/ProfileContext";
import type { ProductRecord } from "@/lib/types/product";

export function CatalogProductActions({ product }: { product: ProductRecord }) {
  const { compareIds, toggleCompare } = useProfile();
  const inCompare = compareIds.includes(product.id);
  const full = compareIds.length >= compareLimit && !inCompare;
  const label = `${product.brand} ${product.name}`;

  return (
    <div className="flex shrink-0 flex-col justify-center gap-2 border-l border-[color:var(--line)] px-4 py-4">
      <SaveProductButton id={product.id} label={label} size="sm" />
      <button
        type="button"
        onClick={() => {
          if (!full || inCompare) {
            toggleCompare(product.id);
            trackEvent(inCompare ? "compare_remove" : "compare_add", {
              product_id: product.id,
              product_brand: product.brand,
              source: "catalog",
            });
          }
        }}
        disabled={full && !inCompare}
        className="inline-flex h-8 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-3 text-xs font-medium text-[var(--text)] transition-colors enabled:hover:border-[var(--color-accent)] enabled:hover:text-[var(--color-accent)] disabled:opacity-40"
      >
        {inCompare ? "In compare" : full ? "Compare full" : "Compare"}
      </button>
      {compareIds.length > 0 && (
        <Link
          href="/compare/"
          onClick={() =>
            trackEvent("open_compare", {
              product_id: product.id,
              source: "catalog",
            })
          }
          className="text-center text-xs font-medium text-[var(--color-accent)] hover:underline"
        >
          Open compare
        </Link>
      )}
    </div>
  );
}
