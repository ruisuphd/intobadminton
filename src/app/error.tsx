"use client";

import Link from "next/link";
import { useEffect } from "react";
import { reportError } from "@/lib/report-error";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError({
      error,
      scope: "root-segment",
      pathname:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, [error]);

  return (
    <main className="flex-1 py-16 sm:py-20">
      <div className="layout-band max-w-3xl">
        <span className="chip chip-secondary">Error</span>
        <h1 className="text-headline mt-5 text-[var(--text)]">
          Something went wrong on this page
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
          A client-side error interrupted the page. Try again, or pick another
          path below. If the problem persists, please report it from the
          contact page.
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-[var(--color-subtle)]">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => reset()} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Go home
          </Link>
          <Link href="/contact/" className="btn-secondary">
            Report this
          </Link>
        </div>
      </div>
    </main>
  );
}
