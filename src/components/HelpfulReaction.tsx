"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/components/Analytics";

const STORAGE_PREFIX = "intobadminton.reaction.v1.";

/**
 * "Was this helpful?" reaction stripe.
 *
 * Initially ships with a local-only persistence model: the user's
 * up / down / "needs more detail" vote is stored in localStorage per article
 * id so the same user does not re-vote on a return visit. An Analytics event
 * is fired on each vote so we can aggregate at the GA4 level until the
 * Workers/KV backend lands (then this component flips to that endpoint
 * without changing its public surface).
 *
 * The displayed counts are intentionally NOT shown until the backend lands —
 * faking counts (or anchoring on a small local-only sample) is worse than
 * showing none.
 */

type Reaction = "up" | "down" | "more";

export function HelpfulReaction({
  /** Unique article id, e.g. `blog:racket-balance-vs-swing-speed`. */
  contentId,
}: {
  contentId: string;
}) {
  const [vote, setVote] = useState<Reaction | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- single-shot hydration */
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + contentId);
      if (raw === "up" || raw === "down" || raw === "more") setVote(raw);
    } catch {
      // Treat any storage error as "no vote yet".
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [contentId]);

  const submit = (next: Reaction) => {
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
  };

  if (!hydrated) {
    // Avoid hydration mismatch: render the placeholder structure with no
    // active state until we have read localStorage.
    return (
      <section
        aria-label="Was this helpful?"
        className="mt-12 rounded-2xl border border-[color:var(--line)] bg-white p-5"
      >
        <p className="text-sm font-medium text-[var(--text)]">
          Was this helpful?
        </p>
        <p className="mt-2 text-xs text-[var(--color-subtle)]">Loading…</p>
      </section>
    );
  }

  if (vote != null) {
    return (
      <section
        aria-label="Was this helpful?"
        className="mt-12 rounded-2xl border border-[color:var(--line)] bg-white p-5"
      >
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
      </section>
    );
  }

  return (
    <section
      aria-label="Was this helpful?"
      className="mt-12 rounded-2xl border border-[color:var(--line)] bg-white p-5"
    >
      <p className="text-sm font-medium text-[var(--text)]">
        Was this article helpful?
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
