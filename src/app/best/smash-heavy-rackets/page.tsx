import Link from "next/link";
import type { Metadata } from "next";
import { EditorialNotice } from "@/components/EditorialNotice";

export const metadata: Metadata = {
  title: "Best rackets for smash-heavy badminton players — IntoBadminton",
  description:
    "How smash-heavy singles and rear-court players should evaluate head-heavy rackets.",
};

export default function SmashHeavyRacketsPage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-2xl space-y-5">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Best rackets for smash-heavy players
        </h1>
        <EditorialNotice />
        <p className="text-[var(--color-muted)]">
          Head-heavy rackets can add shuttle weight from the back court, but
          they also slow recovery. Extra-stiff shafts reward precise timing; if
          you are still building technique, medium-stiff may produce better real
          game power than a more demanding pro frame.
        </p>
        <p className="text-[var(--color-muted)]">
          Select <strong>Offensive</strong> and <strong>Smash-heavy</strong> in
          the finder, then check whether your body and injury flags push you
          away from ultra-stiff setups.
        </p>
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          Find my smash racket
        </Link>
      </article>
    </main>
  );
}
