import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "When to refresh gear — IntoBadminton",
  description: "Strings, grips, and signs it’s time to re-evaluate your setup.",
};

export default function SeasonRefreshGuide() {
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
          When to refresh gear
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Strings change faster than you feel day-to-day. If your lifts start
          sail long or you suddenly compensate with extra wrist, consider a
          restring (or, at least, a tension check) before blaming form alone.
        </p>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Revisit the finder after meaningful changes—league move, injury
          break, or a coach adjusting your footwork. Your optimal racket class
          is not a lifetime label.
        </p>
      </article>
    </main>
  );
}
