import Link from "next/link";
import { FitScoreBadge } from "@/components/FitScoreBadge";
import { ProductImageView } from "@/components/ProductImage";
import { catalogProductHref } from "@/lib/review-pages";
import {
  compareCellValue,
  compareFieldsForItems,
  compareWinners,
  type CompareFieldDef,
} from "@/lib/compare-fields";
import type { ProductRecord, ScoredProduct } from "@/lib/types/product";

function isScored(p: ProductRecord | ScoredProduct): p is ScoredProduct {
  return "fitScore" in p;
}

function CompareCell({
  product,
  field,
  winners,
}: {
  product: ProductRecord | ScoredProduct;
  field: CompareFieldDef;
  winners: Set<string>;
}) {
  const won = winners.has(product.id);

  if (field.key === "fitScore" && isScored(product)) {
    return (
      <td className="py-3 pr-4 align-top">
        <div className="flex flex-col gap-1">
          <FitScoreBadge fitScore={product.fitScore} size={48} showLabel={false} />
          {won && (
            <span className="chip chip-secondary w-fit text-[10px]">Best fit</span>
          )}
        </div>
      </td>
    );
  }

  return (
    <td className="py-3 pr-4 align-top text-[var(--color-muted)]">
      <span className={won ? "font-medium text-[var(--text)]" : undefined}>
        {compareCellValue(product, field.key)}
      </span>
      {won && field.key !== "fitScore" && (
        <span className="ml-2 chip chip-secondary text-[10px]">Best</span>
      )}
    </td>
  );
}

export function CompareTable({
  items,
}: {
  items: (ProductRecord | ScoredProduct)[];
}) {
  const fields = compareFieldsForItems(items);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Side-by-side comparison of {items.length} badminton products
        </caption>
        <thead>
          <tr className="border-b border-[color:var(--line-strong)]">
            <th scope="col" className="sticky left-0 z-10 bg-[var(--surface)] py-3 pr-4 font-medium text-[var(--text)]">
              Spec
            </th>
            {items.map((p) => (
              <th
                key={p.id}
                scope="col"
                className="min-w-[10rem] py-3 pr-4 align-top font-medium text-[var(--text)]"
              >
                <div className="flex flex-col gap-2">
                  {p.image && (
                    <ProductImageView
                      image={p.image}
                      size={72}
                      className="rounded-lg border border-[color:var(--line)]"
                    />
                  )}
                  <span className="text-sm leading-snug text-[var(--text)]">
                    {p.name}
                  </span>
                  <span className="text-xs font-normal text-[var(--color-subtle)]">
                    {p.brand}
                  </span>
                  <Link
                    href={catalogProductHref(p)}
                    className="text-xs font-medium text-[var(--color-accent)] hover:underline"
                  >
                    View details →
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => {
            const winners = compareWinners(items, field);
            const singleWinner = winners.size === 1;
            return (
              <tr
                key={field.key}
                className={`border-b border-[color:var(--line)] ${
                  singleWinner ? "bg-[color:var(--color-accent-soft)]/30" : ""
                }`}
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-[var(--surface)] py-3 pr-4 font-medium text-[var(--text)]"
                >
                  {field.label}
                </th>
                {items.map((p) => (
                  <CompareCell
                    key={p.id + field.key}
                    product={p}
                    field={field}
                    winners={winners}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
