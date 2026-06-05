import { humanize } from "@/lib/text";
import type {
  ProductRecord,
  RacketProduct,
  ShoeProduct,
  StringProduct,
} from "@/lib/types/product";

export type SpecRow = { label: string; value: string };

export function specRowsForProduct(product: ProductRecord): SpecRow[] {
  const rows: SpecRow[] = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: humanize(product.category) },
    { label: "Price (USD)", value: `$${product.priceUsd}` },
    {
      label: "Evidence",
      value: humanize(product.verificationStatus.replace(/_/g, " ")),
    },
    { label: "Last verified", value: product.lastVerifiedAt },
  ];

  if (product.category === "racket") {
    const r = product as RacketProduct;
    rows.push(
      { label: "Weight class", value: r.weightClass },
      { label: "Balance", value: humanize(r.balanceCategory) },
      { label: "Shaft flex", value: humanize(r.shaftFlex) },
      { label: "Head weight", value: humanize(r.headWeight) }
    );
    if (r.balanceMm != null) {
      rows.push({ label: "Balance (mm)", value: String(r.balanceMm) });
    }
  }

  if (product.category === "shoes") {
    const s = product as ShoeProduct;
    rows.push(
      { label: "Fit width", value: humanize(s.fitWidth) },
      { label: "Cushioning", value: humanize(s.cushioning) },
      { label: "Stability", value: humanize(s.stability) }
    );
  }

  if (product.category === "string") {
    const str = product as StringProduct;
    rows.push(
      { label: "Gauge", value: `${str.gaugeMm} mm` },
      { label: "Feel", value: humanize(str.feel) }
    );
  }

  if (product.bestFor.length > 0) {
    rows.push({
      label: "Best for",
      value: product.bestFor.map(humanize).join(", "),
    });
  }

  if (product.editorNote) {
    rows.push({ label: "Editor note", value: product.editorNote });
  }

  return rows;
}
