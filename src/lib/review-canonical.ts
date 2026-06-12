/**
 * Canonical consolidation for near-duplicate review articles.
 *
 * Several review slugs were minted from the same source markdown so that each
 * catalog product row could carry a "read full review" link. The bodies are
 * 83–98% identical (Sprint 129 audit), which left pairs of self-canonical,
 * indexable duplicates competing in search. Internal links keep working —
 * only `<link rel="canonical">` (and hreflang alternates) on the secondary
 * slug point at the primary sibling, consolidating ranking signals.
 *
 * Direction: the slug with the larger internal-link surface (catalog /
 * commercial / PDP baseline hrefs) is the canonical target. For
 * `rsl-aero-u-shuttle-review` the content itself reviews the Classic Tourney
 * shuttle, so it canonicalises to that review regardless of link counts.
 */
export const duplicateReviewCanonicalSlugs: Record<string, string> = {
  // Content is the RSL Classic Tourney review (source never mentions Aero U).
  "rsl-aero-u-shuttle-review": "rsl-aero-classic-tourney-shuttle-review",
  // Same FZ/Forza 88D body published under both brand framings.
  "fz-forza-88d-review": "victor-fz-88d-power-purple-review",
  // Same Astrox 99 Pro source split across generation-angle slugs.
  "yonex-astrox-99-pro-gen-1-review": "yonex-astrox-99-pro-2-deep-dive",
  // Same Auraspeed HS Plus body under deep-dive and attack-review slugs.
  "victor-auraspeed-hs-plus-deep-dive": "victor-auraspeed-hs-plus-attack-review",
  // Same AxForce 90 New comparison body; the full comparison slug is primary.
  "li-ning-axforce-90-new-5u-deep-dive":
    "li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp",
  // Same 100ZZ variant comparison; the VA edition is Viktor Axelsen's, so the
  // Axelsen slug is both better-linked and factually right.
  "yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai":
    "yonex-astrox-100zz-axelsen-va-vs-kurenai",
  // Same Bladex 800 Speed vs Halbertec 9000 Power comparison body.
  "li-ning-bladex-800-speed-vs-halbertec-9000-power":
    "li-ning-halbertec-9000-power-deep-dive",
};

/** Canonical slug for a review article (itself when not a duplicate). */
export function canonicalReviewSlug(slug: string): string {
  return duplicateReviewCanonicalSlugs[slug] ?? slug;
}
