/**
 * AdSense main loader script.
 *
 * Critical: this MUST render as a literal <script> element in the static HTML
 * output, NOT as a next/script preload. AdSense's verification crawler is
 * server-side only — it does not execute JavaScript — so it cannot see scripts
 * that next/script injects after hydration. We use a plain <script> JSX element
 * so the SSR HTML contains the exact tag AdSense expects:
 *
 *   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX" crossorigin="anonymous"></script>
 *
 * Privacy posture is unchanged: the loader does NOT render ads. Ad slots stay
 * consent-gated in <AdSlot/> via canRenderAdSlot(), and Google Consent Mode
 * defaults (set by <ConsentModeDefaults/>) keep ad_storage / ad_user_data /
 * ad_personalization at "denied" until the user opts in.
 */

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSenseScript() {
  if (!client) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
