import productsCatalog from "@/data/products.json";
import type { ProductRecord } from "@/lib/types/product";

const CATALOG = productsCatalog as ProductRecord[];

export function allCatalogProductIds(): string[] {
  return CATALOG.map((p) => p.id);
}

export function catalogProductById(id: string): ProductRecord | undefined {
  return CATALOG.find((p) => p.id === id);
}

export function productPath(id: string): string {
  return `/product/${id}/`;
}
