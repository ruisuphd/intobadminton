"use client";

import Link from "next/link";
import { ProductBuyLink } from "@/components/ProductBuyLink";
import { SaveProductButton } from "@/components/SaveProductButton";
import { useProfile } from "@/context/ProfileContext";
import type { ProductRecord } from "@/lib/types/product";

export function ProductDetailActions({ product }: { product: ProductRecord }) {
  const { compareIds, toggleCompare } = useProfile();
  const inCompare = compareIds.includes(product.id);
  const label = `${product.brand} ${product.name}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SaveProductButton id={product.id} label={label} />
      <button
        type="button"
        onClick={() => toggleCompare(product.id)}
        className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-4 text-sm font-medium text-[var(--text)]"
      >
        {inCompare ? "Remove from compare" : "Add to compare"}
      </button>
      <ProductBuyLink
        id={product.id}
        brand={product.brand}
        name={product.name}
        officialSourceUrl={product.officialSourceUrl}
      />
      <Link
        href="/quiz/"
        className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--color-accent)] px-4 text-sm font-semibold text-white"
      >
        Run the finder
      </Link>
    </div>
  );
}
