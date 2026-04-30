import Script from "next/script";

/**
 * AdSense main loader script. Loads the AdSense JS library so that
 *   (a) AdSense's review crawler can verify integration, and
 *   (b) <ins class="adsbygoogle"> slots in <AdSlot/> can hydrate after
 *       user consent.
 *
 * Privacy posture: the loader script itself does NOT render ads. Ad
 * slots are still consent-gated in <AdSlot/> via canRenderAdSlot(). And
 * Google Consent Mode defaults (set by <ConsentModeDefaults/>) tell the
 * script that ad_storage / ad_user_data / ad_personalization are denied
 * until the user opts in — so even before consent, the script does not
 * collect personalized ad data.
 *
 * This is the standard production pattern for AdSense + GDPR: load the
 * library always, render nothing until consent, never personalize until
 * consent.
 */

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSenseScript() {
  if (!client) return null;

  return (
    <Script
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
