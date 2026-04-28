import Link from "next/link";
import type { Metadata } from "next";
import { EditorialNotice } from "@/components/EditorialNotice";

export const metadata: Metadata = {
  title: "Best badminton rackets for beginners — IntoBadminton",
  description:
    "How beginners should choose a forgiving badminton racket by flex, weight, budget, and comfort.",
};

export default function BeginnerRacketsPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-2xl space-y-5">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Best badminton rackets for beginners
        </h1>
        <EditorialNotice />
        <p className="text-[var(--color-muted)]">
          Beginners usually benefit from a racket that is easier to time: 4U or
          5U, flexible to medium shaft, and even or slightly head-light balance.
          Avoid jumping straight into extra-stiff tour frames until your clears,
          recovery, and contact point are stable.
        </p>
        <p className="text-[var(--color-muted)]">
          Use the finder with <strong>Recreational</strong> or{" "}
          <strong>Club</strong>, then compare top results by weight, flex, and
          budget.
        </p>
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          Start the racket finder
        </Link>
      </article>
    </main>
  );
}
