"use client";

import { useEffect } from "react";
import { useConsent } from "@/context/ConsentContext";
import { adConsentOperational, type AdOperationalMode } from "@/lib/consent";

/**
 * Reserves a layout band for AdSense (plan §2.3.1). Replace the inner placeholder
 * with your ad unit after AdSense approval.
 */
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  id,
  label = "Ad",
  slot,
  className = "",
}: {
  id: string;
  label?: string;
  slot?: string;
  className?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const defaultSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;
  const operationalMode =
    process.env.NEXT_PUBLIC_ADSENSE_MODE || "disabled";
  const resolvedSlot = slot || defaultSlot;
  const { consent } = useConsent();
  const canLoadAd = canRenderAdSlot({
    client,
    slot: resolvedSlot,
    adsConsent: consent.ads,
    doNotSellShare: consent.doNotSellShare,
    operationalMode,
  });

  useEffect(() => {
    if (!canLoadAd) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense can throw during local development or repeated test renders.
    }
  }, [canLoadAd]);

  return (
    <aside
      id={`ad-wrap-${id}`}
      className={`my-8 min-h-[180px] w-full rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface)] p-6 text-center ${className}`}
      data-ad-region={id}
    >
      <p className="text-xs font-medium tracking-wide text-[var(--color-muted)] uppercase">
        {label === "Ad" ? "Advertisement" : label}
      </p>
      {canLoadAd ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={resolvedSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Non-essential advertising is off. Reserved slot{" "}
          <code className="text-xs">{id}</code>
        </p>
      )}
    </aside>
  );
}

export function canRenderAdSlot({
  client,
  slot,
  adsConsent,
  doNotSellShare = false,
  operationalMode = "disabled",
}: {
  client: string | undefined;
  slot: string | undefined;
  adsConsent: boolean;
  doNotSellShare?: boolean;
  operationalMode?: AdOperationalMode | string;
}) {
  return Boolean(
    client &&
      slot &&
      adConsentOperational(
        { ads: adsConsent, doNotSellShare },
        operationalMode
      )
  );
}

export function AdSidebar() {
  return (
    <div className="hidden w-[300px] shrink-0 lg:block">
      <div className="sticky top-24">
        <AdSlot id="sidebar-lg" label="Sponsored" />
      </div>
    </div>
  );
}
