export type Reaction = "up" | "down" | "more";

export type ReactionCounts = {
  up: number;
  down: number;
  more: number;
};

const EMPTY_COUNTS: ReactionCounts = { up: 0, down: 0, more: 0 };

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
    const url = `${base.replace(/\/$/, "")}?contentId=${encodeURIComponent(contentId)}`;
    const res = await fetch(url, { method: "GET", cache: "no-store" });
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

export function totalHelpful(counts: ReactionCounts): number {
  return counts.up + counts.down + counts.more;
}

export { EMPTY_COUNTS };
