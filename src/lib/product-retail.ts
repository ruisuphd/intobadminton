import type { AffiliateStore } from "@/lib/affiliate";

/** Map catalog brand names to affiliate store identifiers. */
export function affiliateStoreForBrand(brand: string): AffiliateStore {
  const key = brand.trim().toLowerCase();
  if (key === "yonex") return "yonex-direct";
  if (key === "victor") return "victor-direct";
  if (key === "li-ning" || key === "lining") return "li-ning-direct";
  return "amazon";
}

export type ProductRetailLink = {
  store: AffiliateStore;
  url: string;
  label: string;
};

/**
 * Outbound retailer link for a catalog row. Prefers the manufacturer product page
 * when we have one; falls back to an Amazon search for the model name.
 */
export function retailLinkForProduct(input: {
  id: string;
  brand: string;
  name: string;
  officialSourceUrl?: string;
}): ProductRetailLink {
  const store = affiliateStoreForBrand(input.brand);
  if (input.officialSourceUrl?.startsWith("http")) {
    return {
      store,
      url: input.officialSourceUrl,
      label: `Check at ${input.brand}`,
    };
  }
  const query = encodeURIComponent(`${input.brand} ${input.name} badminton`);
  return {
    store: "amazon",
    url: `https://www.amazon.com/s?k=${query}`,
    label: "Search retailers",
  };
}
