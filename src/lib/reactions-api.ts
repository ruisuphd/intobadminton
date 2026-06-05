import {
  EMPTY_REACTION_COUNTS,
  parseReactionCounts,
  reactionCountsGetUrl,
  type Reaction,
  type ReactionCounts,
} from "@/lib/reactions-contract";

export type { Reaction, ReactionCounts };

const EMPTY_COUNTS = EMPTY_REACTION_COUNTS;

/** Returns the configured reactions API origin, or null when unset. */
export function reactionsApiUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_REACTIONS_API_URL?.trim();
  return raw || null;
}

export function reactionsApiEnabled(): boolean {
  return reactionsApiUrl() != null;
}

/** Fetch aggregate counts for a content id. Returns null when API is disabled or unreachable. */
export async function fetchReactionCounts(
  contentId: string
): Promise<ReactionCounts | null> {
  const base = reactionsApiUrl();
  if (!base) return null;
  try {
    const res = await fetch(reactionCountsGetUrl(base, contentId), {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) return null;
    return parseReactionCounts(await res.json());
  } catch {
    return null;
  }
}

/** Submit a vote and return updated counts. Returns null on failure. */
export async function submitReaction(
  contentId: string,
  reaction: Reaction
): Promise<ReactionCounts | null> {
  const base = reactionsApiUrl();
  if (!base) return null;
  try {
    const res = await fetch(base.replace(/\/$/, ""), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentId, reaction }),
    });
    if (!res.ok) return null;
    return parseReactionCounts(await res.json());
  } catch {
    return null;
  }
}

export function totalHelpful(counts: ReactionCounts): number {
  return counts.up + counts.down + counts.more;
}

export { EMPTY_COUNTS };
