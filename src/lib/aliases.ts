import aliases from "@/data/product-aliases.json";
import type { ProductAlias } from "@/lib/types/evidence";

const rows = aliases as ProductAlias[];

function norm(s: string): string {
  return s.toLocaleLowerCase().replace(/[\s_-]+/g, "");
}

export function findProductAlias(input: string): ProductAlias | undefined {
  const n = norm(input);
  return rows.find((row) => {
    const tokens = [
      row.canonicalName,
      ...row.brandAliases,
      ...row.modelAliases,
    ].map(norm);
    return tokens.some((t) => n.includes(t) || t.includes(n));
  });
}

export function aliasesForProduct(productId: string): ProductAlias | undefined {
  return rows.find((row) => row.productId === productId);
}

export function allProductAliases(): ProductAlias[] {
  return rows;
}
