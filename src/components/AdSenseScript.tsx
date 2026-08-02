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
 * IMPORTANT — this loader CAN render ads on its own.
 *
 * An earlier version of this comment claimed the loader "does NOT render ads"
 * and that all inventory stays consent-gated behind <AdSlot/>. That is false.
 * With Auto Ads enabled on the AdSense account, this script injects its own
 * ad containers directly into <body> — verified in a local build, where it
 * appends <ins class="adsbygoogle adsbygoogle-noablate" data-ad-hi="true">
 * (the Auto Ads anchor unit) on pages that contain no <AdSlot/> at all. It
 * currently reports data-ad-status="unfilled" only because the site is not
 * approved yet.
 *
 * Consequences to keep in mind:
 *   - NEXT_PUBLIC_ADSENSE_MODE="disabled" gates OUR <AdSlot/> components only.
 *     It has no effect on Auto Ads. It is not a kill switch for advertising.
 *   - The kill switch for Auto Ads lives in the AdSense dashboard
 *     (Ads → per-site settings → Auto ads), not in this repository.
 *
 * What this file does still guarantee: Google Consent Mode defaults, set by
 * <ConsentModeDefaults/> before this script loads, hold ad_storage /
 * ad_user_data / ad_personalization at "denied", and <FundingChoicesScript/>
 * supplies the TCF signal in regulated regions — so Auto Ads inventory should
 * serve non-personalised until the user opts in. That is a weaker guarantee
 * than "no ads render", and the difference matters for the compliance posture
 * described in docs/COMPLIANCE.md.
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
