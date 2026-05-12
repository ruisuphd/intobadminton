"use client";

import { trackEvent } from "@/components/Analytics";
import {
  buildAffiliateLink,
  type AffiliateStore,
} from "@/lib/affiliate";

type AffiliateLinkProps = {
  store: AffiliateStore;
  url: string;
  sku?: string;
  /** Short, stable identifier for analytics (e.g. product slug). */
  eventLabel?: string;
  className?: string;
  children: React.ReactNode;
};

export function AffiliateLink({
  store,
  url,
  sku,
  eventLabel,
  className,
  children,
}: AffiliateLinkProps) {
  const link = buildAffiliateLink({ store, url, sku });

  const handleClick = () => {
    trackEvent("affiliate_click", {
      store: link.store,
      sku: link.sku ?? "unknown",
      label: eventLabel ?? "unlabelled",
      tagged: link.tagged,
    });
  };

  return (
    <a
      href={link.href}
      rel={link.rel}
      target={link.target}
      data-affiliate-store={link.store}
      onClick={handleClick}
      className={className}
    >
      {children}
      <span
        aria-label="affiliate link"
        title="IntoBadminton may earn a commission from this link."
        className="ml-1.5 inline-flex items-center rounded-full bg-[color:var(--color-accent-soft)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--text)]"
      >
        Aff
      </span>
    </a>
  );
}
