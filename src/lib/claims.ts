import claimsData from "../../content/claims.json" with { type: "json" };

/**
 * Source-authority tiers used for fact-checking, per `docs/FACT_CHECK_AUDIT.md`.
 *
 * - 1: manufacturer official product-specific page (strongest)
 * - 2: BWF Laws of Badminton / standards body
 * - 3: manufacturer support / brand-level page (acceptable for industry
 *   conventions like weight bands and grip-size ladders)
 * - 4: independent measurement (BadmintonCN, YuanShi) — must be disclosed
 *   to readers as community measurement, not manufacturer fact
 */
export type SourceTier = 1 | 2 | 3 | 4;

export type ClaimSource = {
  /** Human-readable source name. */
  name: string;
  /** Direct URL of the source. */
  url: string;
  /** ISO date (YYYY-MM-DD) when the claim was last verified against the source. */
  accessedAt: string;
  /** Verbatim quote from the source. */
  quote: string;
};

export type Claim = {
  /** Stable identifier, kebab-case, used to reference the claim from content. */
  id: string;
  /** Human-readable description of what is being asserted. */
  label: string;
  /** The asserted value. Number-like values are stringified for stable JSON. */
  value: string;
  /** Optional unit, e.g. "m", "g", "lb", "in". */
  unit?: string;
  sourceTier: SourceTier;
  source: ClaimSource;
  /**
   * Routes (with trailing slash) that reference this claim. Used by the
   * postbuild audit to flag orphan claims and to map editor changes back to
   * the pages that need re-checking.
   */
  usedOn: string[];
};

const claims = (claimsData.claims as Claim[]).slice();
const byId = new Map(claims.map((c) => [c.id, c]));

export function allClaims(): Claim[] {
  return claims;
}

export function getClaim(id: string): Claim | undefined {
  return byId.get(id);
}

const DAY_MS = 24 * 60 * 60 * 1000;
const STALE_WARN_DAYS = 180;
const STALE_FAIL_DAYS = 365;

export type ClaimFreshness = "fresh" | "warn" | "stale";

export function claimFreshness(claim: Claim, today: Date = new Date()): ClaimFreshness {
  const accessed = Date.parse(claim.source.accessedAt);
  if (!Number.isFinite(accessed)) return "stale";
  const ageDays = (today.getTime() - accessed) / DAY_MS;
  if (ageDays >= STALE_FAIL_DAYS) return "stale";
  if (ageDays >= STALE_WARN_DAYS) return "warn";
  return "fresh";
}

export const CLAIM_FRESHNESS_THRESHOLDS = {
  warnDays: STALE_WARN_DAYS,
  failDays: STALE_FAIL_DAYS,
} as const;
