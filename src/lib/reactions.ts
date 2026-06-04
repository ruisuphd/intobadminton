export type Reaction = "up" | "down" | "more";

export type ReactionCounts = {
  up: number;
  down: number;
  more: number;
};

const EMPTY_COUNTS: ReactionCounts = { up: 0, down: 0, more: 0 };

/** Minimum votes before we surface aggregate counts (avoids anchoring on noise). */
export const REACTION_COUNT_MIN_TOTAL = 5;

export function reactionsApiBase(): string | null {
  const raw = process.env.NEXT_PUBLIC_REACTIONS_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

export function reactionTotal(counts: ReactionCounts): number {
  return counts.up + counts.down + counts.more;
}

export function shouldShowReactionCounts(counts: ReactionCounts): boolean {
  return reactionTotal(counts) >= REACTION_COUNT_MIN_TOTAL;
}

/** Fetch aggregate counts for one content id. Returns null when no backend is configured. */
export async function fetchReactionCounts(
  contentId: string
): Promise<ReactionCounts | null> {
  const base = reactionsApiBase();
  if (!base || typeof fetch === "undefined") return null;

  try {
    const res = await fetch(
      `${base}/counts/${encodeURIComponent(contentId)}`,
      { method: "GET", credentials: "omit" }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<ReactionCounts>;
    return {
      up: Number(data.up) || 0,
      down: Number(data.down) || 0,
      more: Number(data.more) || 0,
    };
  } catch {
    return null;
  }
}

/** Submit an anonymized vote to the optional reactions backend. */
export async function submitReactionVote(
  contentId: string,
  reaction: Reaction
): Promise<void> {
  const base = reactionsApiBase();
  if (!base || typeof fetch === "undefined") return;

  try {
    await fetch(`${base}/vote`, {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentId, reaction }),
    });
  } catch {
    /* non-fatal — local vote + GA4 still recorded */
  }
}

export function formatReactionSummary(counts: ReactionCounts): string {
  const total = reactionTotal(counts);
  if (total === 0) return "";
  const helpfulPct = Math.round((counts.up / total) * 100);
  return `${helpfulPct}% found this helpful (${total} responses)`;
}

export { EMPTY_COUNTS };
