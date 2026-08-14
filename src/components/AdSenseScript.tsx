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
 * With Auto Ads enabled on the AdSense account, this script injects its own
 * ad containers directly into <body> — verified in a local build, where it
 * appends <ins class="adsbygoogle adsbygoogle-noablate" data-ad-hi="true">
 * (the Auto Ads anchor unit) on pages that contain no <AdSlot/> at all.
 *
 * Inventory-value recovery:
 *   - The root layout keeps `google-adsense-account` meta + ads.txt so Google
 *     can still verify the site. This loader is NOT mounted site-wide.
 *   - `NEXT_PUBLIC_ADSENSE_MODE="disabled"` skips the loader entirely. That is
 *     the in-repo half of "Auto ads off"; the dashboard kill switch
 *     (Ads → per-site settings → Auto ads) is still required.
 *   - After approval, mount this component only on publication templates
 *     (guides, best-of, compare-guides, indexable reviews). Never on PDPs,
 *     quiz/results/saved/compare, or noindexed court notes.
 */

import { shouldLoadAdSenseLoader } from "@/lib/ads-inventory";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function AdSenseScript() {
  if (!client || !shouldLoadAdSenseLoader()) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
