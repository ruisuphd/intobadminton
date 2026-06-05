"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/components/Analytics";
import {
  fetchReactionCounts,
  reactionsApiEnabled,
  submitReaction,
  totalHelpful,
  type Reaction,
  type ReactionCounts,
} from "@/lib/reactions-api";

const STORAGE_PREFIX = "intobadminton.reaction.v1.";

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
  const [vote, setVote] = useState<Reaction | null>(null);
  const [counts, setCounts] = useState<ReactionCounts | null>(null);
  const [storedVoteLoaded, setStoredVoteLoaded] = useState(false);
  const apiEnabled = reactionsApiEnabled();

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time localStorage hydrate */
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + contentId);
      if (raw === "up" || raw === "down" || raw === "more") setVote(raw);
    } catch {
      // Treat any storage error as "no vote yet".
    }
    setStoredVoteLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [contentId]);

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

  const submit = async (next: Reaction) => {
    setVote(next);
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

  const countLine =
    counts != null && totalHelpful(counts) > 0 ? (
      <>
        {counts.up} found this helpful
        {counts.more > 0 ? ` · ${counts.more} asked for more detail` : ""}
      </>
    ) : null;

  const shellClass =
    "mt-12 min-h-[8.5rem] rounded-2xl border border-[color:var(--line)] bg-white p-5";

  if (storedVoteLoaded && vote != null) {
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
              setVote(null);
            }}
            className="text-[var(--color-accent)] underline"
          >
            Change my vote
          </button>
        </p>
        <p className="mt-2 min-h-[1rem] text-xs text-[var(--color-subtle)]">
          {countLine ?? "\u00a0"}
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Was this helpful?" className={shellClass}>
      <p className="text-sm font-medium text-[var(--text)]">
        Was this article helpful?
      </p>
      <p className="mt-2 min-h-[1rem] text-xs text-[var(--color-subtle)]">
        {countLine ?? "\u00a0"}
      </p>
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
