"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { trackEvent } from "@/components/Analytics";
import {
  helpfulReactionCountLine,
  helpfulReactionShellClass,
  helpfulReactionSubline,
} from "@/lib/helpful-reaction-ui";
import {
  fetchReactionCounts,
  reactionsApiEnabled,
  submitReaction,
  type Reaction,
  type ReactionCounts,
} from "@/lib/reactions-api";

const STORAGE_PREFIX = "intobadminton.reaction.v1.";

function readStoredVote(contentId: string): Reaction | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + contentId);
    if (raw === "up" || raw === "down" || raw === "more") return raw;
  } catch {
    // Treat any storage error as "no vote yet".
  }
  return null;
}

function subscribeNoop() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

/**
 * "Was this helpful?" reaction stripe.
 *
 * Votes persist in localStorage per content id. When
 * `NEXT_PUBLIC_REACTIONS_API_URL` is set, aggregate counts are fetched from
 * the Cloudflare Workers/KV backend and shown as social proof.
 */
export function HelpfulReaction({
  /** Unique article id, e.g. `blog:racket-balance-vs-swing-speed`. */
  contentId,
}: {
  contentId: string;
}) {
  const mounted = useIsClient();
  const [localVote, setLocalVote] = useState<Reaction | null>(null);
  const [cleared, setCleared] = useState(false);
  const [counts, setCounts] = useState<ReactionCounts | null>(null);
  const apiEnabled = reactionsApiEnabled();

  useEffect(() => {
    if (!apiEnabled) return;
    let cancelled = false;
    fetchReactionCounts(contentId).then((next) => {
      if (!cancelled && next) setCounts(next);
    });
    return () => {
      cancelled = true;
    };
  }, [contentId, apiEnabled]);

  const storedVote = mounted && !cleared ? readStoredVote(contentId) : null;
  const vote = cleared ? null : (localVote ?? storedVote);

  const submit = async (next: Reaction) => {
    setCleared(false);
    setLocalVote(next);
    try {
      localStorage.setItem(STORAGE_PREFIX + contentId, next);
    } catch {
      // Ignore — vote still counted via analytics below.
    }
    trackEvent("helpful_reaction", {
      content_id: contentId,
      reaction: next,
    });
    if (apiEnabled) {
      const updated = await submitReaction(contentId, next);
      if (updated) setCounts(updated);
    }
  };

  const subline =
    vote != null
      ? helpfulReactionCountLine(counts)
      : helpfulReactionSubline(apiEnabled, counts);
  const shellClass = helpfulReactionShellClass(apiEnabled, vote != null);

  if (mounted && vote != null) {
    return (
      <section aria-label="Was this helpful?" className={shellClass}>
        <p className="text-sm font-medium text-[var(--text)]">
          Thanks for the feedback.
        </p>
        <p className="mt-2 text-xs text-[var(--color-muted)]">
          {vote === "up"
            ? "We'll keep this article on the path it is on."
            : vote === "down"
              ? "Noted — we'll revisit this article in the next editorial sweep."
              : "Noted — we'll consider expanding this article with more detail."}
          {" "}
          <button
            type="button"
            onClick={() => {
              try {
                localStorage.removeItem(STORAGE_PREFIX + contentId);
              } catch {
                /* noop */
              }
              setCleared(true);
              setLocalVote(null);
            }}
            className="text-[var(--color-accent)] underline"
          >
            Change my vote
          </button>
        </p>
        {subline ? (
          <p className="mt-2 text-xs text-[var(--color-subtle)]">{subline}</p>
        ) : null}
      </section>
    );
  }

  return (
    <section aria-label="Was this helpful?" className={shellClass}>
      <p className="text-sm font-medium text-[var(--text)]">
        Was this article helpful?
      </p>
      {subline ? (
        <p className="mt-2 text-xs text-[var(--color-subtle)]">{subline}</p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <ReactionButton glyph="👍" label="Yes" onClick={() => submit("up")} />
        <ReactionButton
          glyph="🤔"
          label="Needs more detail"
          onClick={() => submit("more")}
        />
        <ReactionButton
          glyph="👎"
          label="Not for me"
          onClick={() => submit("down")}
        />
      </div>
    </section>
  );
}

function ReactionButton({
  glyph,
  label,
  onClick,
}: {
  glyph: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[color:var(--line-strong)] px-4 text-sm text-[var(--text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      <span aria-hidden>{glyph}</span>
      <span>{label}</span>
    </button>
  );
}
