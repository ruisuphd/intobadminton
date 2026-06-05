"use client";

import { AffiliateLink } from "@/components/AffiliateLink";
import {
  retailLinkForProduct,
  type ProductRetailLink,
} from "@/lib/product-retail";

type ProductBuyLinkProps = {
  id: string;
  brand: string;
  name: string;
  officialSourceUrl?: string;
  className?: string;
  /** Override computed retail link (tests / Storybook). */
  link?: ProductRetailLink;
};

export function ProductBuyLink({
  id,
  brand,
  name,
  officialSourceUrl,
  className = "inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-4 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]",
  link: linkOverride,
}: ProductBuyLinkProps) {
  const link =
    linkOverride ??
    retailLinkForProduct({ id, brand, name, officialSourceUrl });

  return (
    <AffiliateLink
      store={link.store}
      url={link.url}
      sku={id}
      eventLabel={id}
      className={className}
    >
      {link.label}
    </AffiliateLink>
  );
}
