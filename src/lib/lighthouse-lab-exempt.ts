/**
 * CrUX-priority paths monitored for field data but excluded from Lighthouse lab
 * baseline (`lighthouserc-baseline.json`) because `noindex` tanks the SEO category.
 */
export const LIGHTHOUSE_LAB_EXEMPT_PATHS = [
  "/results/",
  "/compare/",
  "/saved/",
  "/product/yy-grpht-thrttl/",
] as const;

export function isLighthouseLabExemptPath(path: string): boolean {
  return (LIGHTHOUSE_LAB_EXEMPT_PATHS as readonly string[]).includes(path);
}
