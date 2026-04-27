import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badminton shoes for wide feet — IntoBadminton",
  description:
    "What wide-footed badminton players should check before choosing shoes.",
};

export default function WideFeetShoesGuide() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-2xl space-y-5">
        <p>
          <Link
            href="/guides/"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Guides
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Badminton shoes for wide feet
        </h1>
        <p className="text-[var(--color-muted)]">
          Wide-footed players should prioritize toe-box comfort, lateral
          stability, and heel lock. Do not solve a narrow shoe by oversizing too
          much; heel slip can make lunges and push-offs less stable.
        </p>
        <p className="text-[var(--color-muted)]">
          The equipment finder collects foot width now so future shoe
          recommendations can filter by last shape and comfort signals from
          first-party reviews.
        </p>
      </article>
    </main>
  );
}
