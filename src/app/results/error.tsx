"use client";

import Link from "next/link";
import { useEffect } from "react";
import { reportError } from "@/lib/report-error";

export default function ResultsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError({
      error,
      scope: "results-segment",
      pathname:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, [error]);

  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-3xl">
        <div className="card p-7">
          <span className="chip chip-secondary">Finder error</span>
          <h1 className="text-headline mt-5 text-[var(--text)]">
            We couldn&rsquo;t build your shortlist
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
            Something went wrong while scoring products against your profile.
            Your answers are still saved &mdash; try rerunning the match, or
            start the finder again from the beginning.
          </p>
          {error.digest ? (
            <p className="mt-3 font-mono text-xs text-[var(--color-subtle)]">
              Reference: {error.digest}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="btn-primary"
            >
              Try again
            </button>
            <Link href="/quiz/" className="btn-secondary">
              Restart the finder
            </Link>
            <Link href="/best/" className="btn-secondary">
              Browse best picks instead
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
