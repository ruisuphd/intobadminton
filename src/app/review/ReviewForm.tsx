"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/components/Analytics";
import { getAllRackets } from "@/lib/scoring";
import {
  addLocalReview,
  deleteLocalReviews,
  exportReviewsJson,
  loadLocalReviews,
} from "@/lib/reviews";
import type { FirstPartyReview } from "@/lib/types/evidence";

const ratings = [1, 2, 3, 4, 5] as const;

export function ReviewForm() {
  const products = useMemo(() => getAllRackets(), []);
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [ownedMonths, setOwnedMonths] = useState(3);
  const [summary, setSummary] = useState("");
  const [consent, setConsent] = useState(false);
  const [saved, setSaved] = useState(false);
  const [draftCount, setDraftCount] = useState(0);
  const [scores, setScores] = useState({
    fit: 3,
    comfort: 3,
    power: 3,
    control: 3,
    durability: 3,
  });

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time localStorage count hydrate */
    setDraftCount(loadLocalReviews().length);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const setScore = (k: keyof typeof scores, value: number) => {
    setScores((s) => ({ ...s, [k]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !summary.trim()) return;

    const review: FirstPartyReview = {
      id: crypto.randomUUID(),
      productId,
      submittedAt: new Date().toISOString(),
      consent: true,
      status: "local_draft",
      level: "unspecified",
      discipline: "unspecified",
      ownedMonths,
      fit: scores.fit as FirstPartyReview["fit"],
      comfort: scores.comfort as FirstPartyReview["comfort"],
      power: scores.power as FirstPartyReview["power"],
      control: scores.control as FirstPartyReview["control"],
      durability: scores.durability as FirstPartyReview["durability"],
      summary: summary.trim(),
    };

    addLocalReview(review);
    setDraftCount(loadLocalReviews().length);
    trackEvent("first_party_review_saved", {
      product_id: productId,
      status: review.status,
    });
    setSaved(true);
    setSummary("");
  };

  const exportDrafts = () => {
    const blob = new Blob([exportReviewsJson(loadLocalReviews())], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "intobadminton-review-drafts.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteDrafts = () => {
    deleteLocalReviews();
    setDraftCount(0);
    setSaved(false);
  };

  return (
    <form
      onSubmit={submit}
      className="mt-8 max-w-2xl space-y-6 card p-6"
    >
      <label className="block text-sm">
        <span className="text-[var(--color-muted)]">Equipment</span>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-transparent px-3 py-2"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.brand} {p.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-[var(--color-muted)]">Owned / tested months</span>
        <input
          type="number"
          min={0}
          max={120}
          value={ownedMonths}
          onChange={(e) => setOwnedMonths(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-transparent px-3 py-2"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(scores) as (keyof typeof scores)[]).map((k) => (
          <div key={k}>
            <p className="text-sm capitalize text-[var(--color-muted)]">{k}</p>
            <div className="mt-2 flex gap-2">
              {ratings.map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setScore(k, n)}
                  className={`h-9 w-9 rounded-full text-sm ${
                    scores[k] === n
                      ? "bg-[var(--color-accent)] text-white"
                      : "border border-[color:var(--line-strong)]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <label className="block text-sm">
        <span className="text-[var(--color-muted)]">Short review</span>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
          minLength={20}
          placeholder="What did it feel like in real games? Mention level, style, strengths, weaknesses."
          className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-transparent px-3 py-2"
        />
      </label>

      <div className="rounded-2xl border border-[color:var(--line)] p-4 text-sm text-[var(--color-muted)]">
        <p className="font-medium text-[var(--text)]">Moderation status</p>
        <p className="mt-1">
          This static MVP saves review drafts locally only. They are not public,
          not submitted to a server, and not used in recommendations until a
          backend moderation queue is enabled.
        </p>
      </div>

      <label className="flex gap-3 text-sm text-[var(--color-muted)]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          I consent to IntoBadminton storing this review draft locally and,
          after a future backend submission step, using approved review signals
          to improve recommendations. I understand I can export or delete local
          drafts below.
        </span>
      </label>

      <button
        type="submit"
        disabled={!consent || summary.trim().length < 20}
        className="rounded-2xl bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-40"
      >
        Save review draft
      </button>

      {saved && (
        <p className="text-sm text-[var(--color-accent)]">
          Saved locally as a moderation draft.
        </p>
      )}

      <div className="flex flex-wrap gap-3 border-t border-[color:var(--line)] pt-5">
        <button
          type="button"
          onClick={exportDrafts}
          className="rounded-2xl border border-[color:var(--line-strong)] px-4 py-2 text-sm"
        >
          Export local drafts{draftCount ? ` (${draftCount})` : ""}
        </button>
        <button
          type="button"
          onClick={deleteDrafts}
          className="rounded-2xl border border-[color:var(--line-strong)] px-4 py-2 text-sm"
        >
          Delete local drafts
        </button>
      </div>
    </form>
  );
}
