import Link from "next/link";
import type { Metadata } from "next";
import { EditorialNotice } from "@/components/EditorialNotice";

export const metadata: Metadata = {
  title: "Best badminton rackets for doubles players — IntoBadminton",
  description:
    "Choose doubles rackets by speed, defense, front-court control, and flat-drive performance.",
};

export default function DoublesRacketsPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-2xl space-y-5">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Best badminton rackets for doubles players
        </h1>
        <EditorialNotice />
        <p className="text-[var(--color-muted)]">
          Doubles rewards recovery speed: a 4U or 5U racket with head-light or
          even balance often helps in defense, blocks, and flat exchanges. If
          you usually play rear court, a mild head-heavy profile can still work,
          but avoid sacrificing every defensive touch for smash weight.
        </p>
        <p className="text-[var(--color-muted)]">
          Choose <strong>Doubles</strong> or <strong>Mixed</strong> in the
          finder so the ranking gives more credit to fast swing profiles.
        </p>
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          Find my doubles racket
        </Link>
      </article>
    </main>
  );
}
