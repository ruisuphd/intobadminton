/**
 * Canonical list of editorial comparison guides — single source for the hub
 * page, site search, and compare-guides layout engagement chrome.
 */
export type CompareGuideEntry = {
  href: string;
  title: string;
  dek: string;
  /** Extra tokens for site search matching. */
  keywords: string[];
};

export const COMPARE_GUIDES: CompareGuideEntry[] = [
  {
    href: "/compare-guides/yonex-astrox-vs-nanoflare/",
    title: "Yonex Astrox vs Nanoflare",
    dek: "Power-oriented Astrox vs speed-oriented Nanoflare — which family fits which role.",
    keywords: ["yonex", "astrox", "nanoflare", "power", "speed"],
  },
  {
    href: "/compare-guides/yonex-victor-li-ning/",
    title: "Yonex vs Victor vs Li-Ning",
    dek: "How the three flagship badminton brands actually differ — distribution, design philosophy, value, and roster.",
    keywords: ["yonex", "victor", "li-ning", "brand"],
  },
  {
    href: "/compare-guides/astrox-77-pro-vs-88s-pro/",
    title: "Astrox 77 Pro vs 88S Pro 2024",
    dek: "Both are even-balance Yonex frames. One is the friendliest pro-tier upgrade. The other is the doubles control benchmark.",
    keywords: ["astrox 77", "88s pro", "even balance"],
  },
  {
    href: "/compare-guides/badminton-vs-tennis-shoes/",
    title: "Badminton vs tennis shoes",
    dek: "Why one is built for forward gait and the other for lateral movement — and why mixing them hurts.",
    keywords: ["tennis shoes", "court shoes", "lateral"],
  },
  {
    href: "/compare-guides/astrox-99-pro-vs-astrox-100zz/",
    title: "Astrox 99 Pro vs Astrox 100ZZ",
    dek: "Both Yonex flagship attack frames with very different timing windows — head balance, shaft hardness, and who should buy which.",
    keywords: ["astrox 99", "100zz", "attack"],
  },
  {
    href: "/compare-guides/astrox-99-pro-vs-halbertec-9000-power/",
    title: "Astrox 99 Pro vs Halbertec 9000 Power",
    dek: "Two rival singles attack flagships compared on shaft tier, build feel, source authority, and resale.",
    keywords: ["halbertec", "9000", "singles attack"],
  },
  {
    href: "/compare-guides/astrox-88d-pro-vs-axforce-90-new/",
    title: "Astrox 88D Pro vs AxForce 90 New",
    dek: "Doubles rear-court attack compared — Yonex vs Li-Ning balance, shaft hardness, and mixed vs men's doubles fit.",
    keywords: ["88d pro", "axforce 90", "doubles"],
  },
  {
    href: "/compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/",
    title: "Halbertec 9000 Power vs AxForce 100 Gen 2",
    dek: "Two Li-Ning attack flagships compared — which is the right upgrade for singles smash specialists.",
    keywords: ["halbertec", "axforce 100", "li-ning"],
  },
  {
    href: "/compare-guides/bladex-800-speed-vs-nanoflare-1000z/",
    title: "Bladex 800 Speed vs Nanoflare 1000Z",
    dek: "Li-Ning's speed flagship against Yonex's hexagonal speed weapon — specs, drive feel, and source authority.",
    keywords: ["bladex", "nanoflare 1000z", "speed"],
  },
  {
    href: "/compare-guides/nanoflare-1000z-vs-auraspeed-99/",
    title: "Nanoflare 1000Z vs Auraspeed 99",
    dek: "Speed-series flagships compared — head-light feel, drive speed, and doubles-role fit.",
    keywords: ["auraspeed", "nanoflare", "victor"],
  },
  {
    href: "/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/",
    title: "Nanoflare 800 Pro vs Auraspeed HS Plus",
    dek: "Mid-flagship speed rackets compared on drive speed, swing weight, and source-authority confidence.",
    keywords: ["nanoflare 800", "auraspeed hs"],
  },
  {
    href: "/compare-guides/yonex-65z4-vs-eclipsion-z3/",
    title: "Yonex 65 Z4 vs Eclipsion Z3",
    dek: "Yonex's speed-oriented Z series against the premium Eclipsion stability shoe — fit, stability, and who buys which.",
    keywords: ["65z4", "eclipsion", "shoes"],
  },
];

export function compareGuideByPath(pathname: string): CompareGuideEntry | undefined {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return COMPARE_GUIDES.find((g) => g.href === path);
}
