import { totalHelpful, type ReactionCounts } from "@/lib/reactions-api";

export function helpfulReactionCountLine(
  counts: ReactionCounts | null
): string | null {
  if (counts == null || totalHelpful(counts) <= 0) return null;
  const more =
    counts.more > 0 ? ` · ${counts.more} asked for more detail` : "";
  return `${counts.up} found this helpful${more}`;
}

/**
 * Subline under the reaction prompt. When the KV API is off, explain that
 * votes still steer editorial priority instead of showing an empty count row.
 */
export function helpfulReactionSubline(
  apiEnabled: boolean,
  counts: ReactionCounts | null
): string | null {
  const countLine = helpfulReactionCountLine(counts);
  if (countLine) return countLine;
  if (!apiEnabled) {
    return "Your vote helps us prioritize the next editorial sweep.";
  }
  return null;
}

export function helpfulReactionShellClass(
  apiEnabled: boolean,
  hasVote: boolean
): string {
  const base =
    "mt-12 rounded-2xl border border-[color:var(--line)] bg-white p-5";
  const minHeight =
    apiEnabled || hasVote ? "min-h-[8.5rem]" : "min-h-0";
  return `${base} ${minHeight}`;
}
