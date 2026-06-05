import displayNames from "@/data/product-display-names.json";

/** Lightweight id → name map for client UI (avoids importing full `products.json`). */
export function productDisplayName(id: string): string | undefined {
  return (displayNames as Record<string, string>)[id];
}
