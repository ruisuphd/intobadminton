import Link from "next/link";
import type { Metadata } from "next";
import { EditorialNotice } from "@/components/EditorialNotice";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Yonex Astrox vs Nanoflare — IntoBadminton",
  description:
    "Astrox and Nanoflare rackets compared by play style, speed, power, and player level.",
};

export default function AstroxVsNanoflarePage() {
  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5">
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
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-[var(--surface)] dark:border-zinc-700">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-zinc-200 text-[var(--text)] dark:border-zinc-700">
              <tr>
                <th className="p-4">Family</th>
                <th className="p-4">Best signal</th>
                <th className="p-4">Profile fit</th>
                <th className="p-4">Risk</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-muted)]">
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="p-4 font-medium text-[var(--text)]">Astrox</td>
                <td className="p-4">Head-heavy attack and rear-court load</td>
                <td className="p-4">Singles, smash-heavy, back-court doubles</td>
                <td className="p-4">Can feel slow if defense is your main weapon</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--text)]">Nanoflare</td>
                <td className="p-4">Head-light speed and fast recovery</td>
                <td className="p-4">Doubles defense, flat drives, front-court pressure</td>
                <td className="p-4">May need cleaner swing speed for rear-court power</td>
              </tr>
            </tbody>
          </table>
        </div>
        <AdSlot id="compare-astrox-nanoflare-mid" />
        <p className="text-[var(--color-muted)]">
          For AdSense and SEO, comparison pages should stay useful even if a
          visitor never starts the quiz. That means original tradeoff analysis,
          clear source policy links, and no copied community-review text.
        </p>
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          Compare them through my profile
        </Link>
      </article>
    </main>
  );
}
