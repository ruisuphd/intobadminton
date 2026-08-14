/**
 * Screens that must not carry Google-served ads (Publisher Policy 11112688 /
 * 11169917). Prefix rules only — keep this module free of the review corpus
 * so client components can import it without pulling blog JSON.
 *
 * Review-article gating lives in `adsAllowedOnReview` (`thin-content.ts`).
 */
const BLOCKED_EXACT = new Set([
  "/quiz/",
  "/results/",
  "/saved/",
  "/compare/",
  "/setup/",
  "/offline/",
  "/privacy-choices/",
  "/catalog/",
  "/search/",
  "/review/submit/",
]);

const BLOCKED_PREFIXES = ["/product/", "/compare/?"] as const;

export function normalizeInventoryPath(pathname: string): string {
  if (!pathname) return "/";
  const trimmed = pathname.split("?")[0] ?? pathname;
  if (trimmed === "/") return "/";
  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

/** True when this URL must never load adsbygoogle.js or render an AdSlot. */
export function adsBlockedOnPath(pathname: string): boolean {
  const path = normalizeInventoryPath(pathname);
  if (BLOCKED_EXACT.has(path)) return true;
  return BLOCKED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix)
  );
}

/**
 * Loader script is allowed only when AdSense mode is fully enabled.
 * `disabled` keeps ads.txt + the ca-pub meta tag (verification) but must not
 * inject Auto Ads on thin or generated screens.
 */
export function shouldLoadAdSenseLoader(
  mode: string | undefined = process.env.NEXT_PUBLIC_ADSENSE_MODE
): boolean {
  return Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT) && mode === "cmp_tcf";
}
