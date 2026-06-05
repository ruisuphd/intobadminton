import Link from "next/link";
import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { GuideStructuredData } from "@/components/GuideStructuredData";
import { GuideTocSlot } from "@/components/GuideTocSlot";

const PATH = "/guides/doubles-positioning-and-rackets/";
const HEADLINE = "Doubles positioning and racket choice";
const DESCRIPTION =
  "Court zones, attack vs defence shape, and how front vs rear positioning should map to racket balance, shaft flex, and shoes in badminton doubles.";

export const metadata: Metadata = editorialPageMetadata({
  path: PATH,
  title: "Doubles positioning and racket choice",
  description: DESCRIPTION,
});

export default function DoublesPositioningGuide() {
  return (
    <main className="flex-1 py-16">
      <GuideStructuredData
        path={PATH}
        headline={HEADLINE}
        description={DESCRIPTION}
        breadcrumbLabel="Doubles positioning"
      />
      <article className="layout-band max-w-3xl space-y-6">
        <p>
          <Link
            href="/guides/"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Guides
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Doubles positioning and racket choice
        </h1>
        <GuideTocSlot />
        <p className="text-[var(--color-muted)] leading-relaxed">
          Equipment advice for doubles only works if you know where you stand
          when the shuttle is in play. This guide connects court positioning —
          front-back attack, side-by-side defence, and rotation — to the racket
          balance and shoe traits that actually match each zone. For role
          definitions and mixed-doubles nuance, read{" "}
          <Link href="/guides/doubles-roles/" className="text-[var(--color-accent)] underline">
            doubles court roles
          </Link>{" "}
          first; come back here for the positioning-to-gear map.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          The T and the two shapes
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Imagine a T on your half of the court: the stem runs through the
          centre service line, the bar runs along the short service line. In
          attacking shape, one player owns the front of the T (net and mid
          front) and one owns the rear (rear mid and back). In defensive shape,
          both players straddle the bar, each covering a side. Most amateur
          losses come from staying in attack shape when the shuttle is above
          the front player&apos;s shoulder, or from both players drifting to
          the same corner. Gear cannot fix that — but once rotation is
          honest, gear should match the zone you occupy most.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Front zone: racket and shoes
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Front-court positioning rewards fast racket turnaround and stable
          net hands. Spec-wise that means even or head-light balance (285–290
          mm balance point or lower), medium-stiff to stiff shaft, and 4U
          weight where possible so recovery between drives and kills stays
          quick. Examples in the current catalogue include Nanoflare 1000Z,
          Astrox 88S Pro, and Victor Auraspeed HS Plus — not because the brand
          matters, but because the mass distribution matches intercept timing.
          Shoes should be low-profile with strong lateral cage: you push off
          the inside edge constantly. Extra heel stack from running shoes works
          against you here; see{" "}
          <Link
            href="/guides/badminton-shoes-vs-running-shoes/"
            className="text-[var(--color-accent)] underline"
          >
            badminton vs running shoes
          </Link>
          .
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Rear zone: racket and shoes
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Rear-court positioning is smash-and-cover: you need head-heavy or
          strongly even frames with stiff shafts so repeated overheads stay
          predictable (Astrox 88D Pro, 99 Pro, Halbertec 9000 Power archetypes).
          The trade-off is slower flat-drive recovery — your front partner must
          finish quick exchanges. String tension can sit 1–2 lb higher than
          front-court frames if your contact is clean; use the{" "}
          <Link
            href="/tools/string-tension-calculator/"
            className="text-[var(--color-accent)] underline"
          >
            tension calculator
          </Link>{" "}
          with your frame max and arm comfort flag. Shoes want forefoot
          cushion and a stable heel cup because landing load repeats. If you
          only play rear in men&apos;s doubles, bias stability over feather
          weight.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Defensive side-by-side: when to soften the frame
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          When both players are in side-by-side defence, rallies flatten. Head-
          heavy frames become a liability in drive wars; head-light stiff
          frames (Nanoflare line, Auraspeed 90K II) let you block and punch
          without fighting swing weight. Positioning discipline matters more
          than brand: cover your tramline, trust your partner&apos;s reach, and
          lift deep only when you can regain attack shape on the next exchange.
          If your club never practises rotation, spend two sessions on
          clear-and-rotate before buying a second doubles racket.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Rotation triggers that should change your setup
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Rotate when your flat drive pulls the opponent wide and your partner
          is already moving through the T to cover the open corner — not when
          you are tired and drifting forward. Pairs that rotate well often
          share one even-balance &ldquo;bridge&rdquo; racket and one
          role-specific frame each, swapping by rally rather than carrying two
          attack frames. If you and your partner rotate fluidly, default the
          finder to balanced discipline + balanced style; if roles are fixed,
          mark offensive rear or front-court style so scoring weights the
          right factor.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Quick positioning → gear table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-[var(--color-muted)]">
            <thead>
              <tr className="border-b border-[color:var(--line)] text-left text-[var(--text)]">
                <th className="py-2 pr-4 font-semibold">Primary zone</th>
                <th className="py-2 pr-4 font-semibold">Balance</th>
                <th className="py-2 pr-4 font-semibold">Shaft</th>
                <th className="py-2 font-semibold">Shoe bias</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[color:var(--line)]">
                <td className="py-2 pr-4">Front attack</td>
                <td className="py-2 pr-4">Even / head-light</td>
                <td className="py-2 pr-4">Medium–stiff</td>
                <td className="py-2">Low profile, lateral cage</td>
              </tr>
              <tr className="border-b border-[color:var(--line)]">
                <td className="py-2 pr-4">Rear attack</td>
                <td className="py-2 pr-4">Head-heavy / strong even</td>
                <td className="py-2 pr-4">Stiff</td>
                <td className="py-2">Forefoot cushion</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Side-by-side defence</td>
                <td className="py-2 pr-4">Head-light</td>
                <td className="py-2 pr-4">Stiff</td>
                <td className="py-2">Stability, even wear</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link href="/best/doubles-rackets/" className="text-[var(--color-accent)] underline">
            best doubles rackets
          </Link>
          ,{" "}
          <Link href="/guides/doubles-roles/" className="text-[var(--color-accent)] underline">
            doubles court roles
          </Link>
          ,{" "}
          <Link href="/compare-guides/yonex-astrox-vs-nanoflare/" className="text-[var(--color-accent)] underline">
            Astrox vs Nanoflare
          </Link>
          , and the{" "}
          <Link href="/quiz/" className="text-[var(--color-accent)] underline">
            equipment finder
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
