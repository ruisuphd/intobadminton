/**
 * Shared HelpfulReaction API contract — request/response shapes used by the
 * Cloudflare Worker (`workers/reactions/index.js`) and the static-site client
 * (`reactions-api.ts`). Keep these aligned so deploy does not break the UI.
 */

export type Reaction = "up" | "down" | "more";

export type ReactionCounts = {
  up: number;
  down: number;
  more: number;
};

export const REACTION_VALUES: readonly Reaction[] = ["up", "down", "more"];

export const EMPTY_REACTION_COUNTS: ReactionCounts = { up: 0, down: 0, more: 0 };

export function isReaction(value: unknown): value is Reaction {
  return typeof value === "string" && REACTION_VALUES.includes(value as Reaction);
}

/** Parse aggregate counts from a JSON body — mirrors worker `parseCounts`. */
export function parseReactionCounts(data: unknown): ReactionCounts {
  if (data == null || typeof data !== "object") return { ...EMPTY_REACTION_COUNTS };
  const record = data as Record<string, unknown>;
  return {
    up: Number(record.up) || 0,
    down: Number(record.down) || 0,
    more: Number(record.more) || 0,
  };
}

export type ReactionPostPayload = {
  contentId: string;
  reaction: Reaction;
};

/** Validate POST body — mirrors worker POST guard. */
export function parseReactionPostPayload(
  body: unknown
): ReactionPostPayload | null {
  if (body == null || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const contentId = record.contentId;
  const reaction = record.reaction;
  if (
    typeof contentId !== "string" ||
    contentId.length === 0 ||
    contentId.length > 200 ||
    !isReaction(reaction)
  ) {
    return null;
  }
  return { contentId, reaction };
}

/** Build GET URL for a content id — mirrors client `fetchReactionCounts`. */
export function reactionCountsGetUrl(base: string, contentId: string): string {
  const origin = base.replace(/\/$/, "");
  return `${origin}?contentId=${encodeURIComponent(contentId)}`;
}
