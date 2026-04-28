import Link from "next/link";
import type { Metadata } from "next";
import { EditorialNotice } from "@/components/EditorialNotice";

export const metadata: Metadata = {
  title: "Yonex Astrox vs Nanoflare — IntoBadminton",
  description:
    "Astrox and Nanoflare rackets compared by play style, speed, power, and player level.",
};

export default function AstroxVsNanoflarePage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-2xl space-y-5">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Yonex Astrox vs Nanoflare: which style fits?
        </h1>
        <EditorialNotice />
        <p className="text-[var(--color-muted)]">
          Astrox is generally the power-oriented family: more head weight,
          heavier smash feel, and more demand on timing. Nanoflare is generally
          the speed-oriented family: faster defense, flat drives, and quick
          recovery in doubles.
        </p>
        <p className="text-[var(--color-muted)]">
          The right answer is not brand hierarchy; it is whether your games are
          won by first attack from the rear court or by speed through defense
          and mid-court exchanges.
        </p>
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          Compare them through my profile
        </Link>
      </article>
    </main>
  );
}
