import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doubles court roles (basics) — IntoBadminton",
  description: "How front and back work shapes what you may optimize in doubles.",
};

export default function DoublesRolesGuide() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-2xl space-y-4">
        <p>
          <Link
            href="/guides/"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Guides
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Doubles court roles (basics)
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Front players value touch and the fastest read; back players need
          coverage and a smash threat. In club doubles you might swap roles
          more often than pros—still, if you are usually front, you may prefer
          lighter, quicker heads for net battles.
        </p>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The finder nudges suggestions when you mark doubles or mixed, but
          your club rotation might differ—treat the output as a starting point.
        </p>
      </article>
    </main>
  );
}
