"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/context/ConsentContext";
import { adsBlockedOnPath } from "@/lib/ads-inventory";
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
  const pathname = usePathname();
  const canLoadAd = canRenderAdSlot({
    client,
    slot: resolvedSlot,
    adsConsent: consent.ads,
    doNotSellShare: consent.doNotSellShare,
    operationalMode,
    inventoryAllowed: !adsBlockedOnPath(pathname ?? "/"),
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

  // Render nothing when ads can't load. We do NOT show a "Reserved slot"
  // placeholder — that visible cruft hurts AdSense review and looks
  // unprofessional to real users. Once AdSense approves and slot IDs are
  // configured, the same JSX hierarchy hydrates with a live ad unit.
  if (!canLoadAd) return null;

  return (
    <aside
      id={`ad-wrap-${id}`}
      className={`my-8 w-full rounded-2xl bg-[var(--surface)] p-6 text-center ${className}`}
      data-ad-region={id}
    >
      <p className="text-xs font-medium tracking-wide text-[var(--color-muted)] uppercase">
        {label === "Ad" ? "Advertisement" : label}
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

export function canRenderAdSlot({
  client,
  slot,
  adsConsent,
  doNotSellShare = false,
  operationalMode = "disabled",
  inventoryAllowed = true,
}: {
  client: string | undefined;
  slot: string | undefined;
  adsConsent: boolean;
  doNotSellShare?: boolean;
  operationalMode?: AdOperationalMode | string;
  inventoryAllowed?: boolean;
}) {
  return Boolean(
    inventoryAllowed &&
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
