import Link from "next/link";
import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { GuideCatalogCta } from "@/components/GuideCatalogCta";
import { GuideStructuredData } from "@/components/GuideStructuredData";
import { GuideTocAnchor } from "@/components/GuideTocAnchor";

const PATH = "/guides/doubles-roles/";
const HEADLINE = "Doubles court roles";
const DESCRIPTION =
  "Front, back, and rotational roles in badminton doubles — what each role does and how role choice affects which racket and shoes you should buy.";

export const metadata: Metadata = editorialPageMetadata({
  path: PATH,
  title: "Doubles court roles in badminton",
  description: DESCRIPTION,
});

export default function DoublesRolesGuide() {
  return (
    <main className="flex-1 py-16">
      <GuideStructuredData
        path={PATH}
        headline={HEADLINE}
        description={DESCRIPTION}
        breadcrumbLabel="Doubles roles"
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
          Doubles court roles
        </h1>
        <GuideTocAnchor />
        <p className="text-[var(--color-muted)] leading-relaxed">
          Doubles badminton runs on two formations and the rotation
          between them. Knowing which role you are playing in any given
          rally is the difference between a confident split step and a
          confused one — and it shapes the kind of racket, shoes, and
          string tension that will actually help you win points.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          The two formations
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Doubles uses an attacking front-and-back formation when your
          side has won the centre and is creating downward pressure, and
          a defensive side-by-side formation when the opponent has lifted
          the shuttle and is forcing you to absorb attack. The transition
          between the two — rotation — is usually the part club players
          rehearse least and pros rehearse most. The same partner pair
          will rotate dozens of times in a single rally at tour level.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          The front-court role
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The front player&rsquo;s job is to pressure the opponents&rsquo;
          midcourt and net response, intercept any rising shuttle, and
          finish loose returns at the net. The skills that matter most are
          early reads, soft hands at the tape, sharp interceptions of
          flat drives, and the discipline to stay forward when your back
          partner is attacking. Front-court players win on touch and
          anticipation — not on smash power. The right racket is usually
          even or head-light balance with a medium-stiff shaft (Astrox
          88S Pro 2024, Auraspeed HS Plus, Nanoflare 1000Z), because
          recovery between contacts matters more than load behind the
          shot.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          The rear-court role
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The rear player&rsquo;s job is to keep pressure on the opponents
          with smashes, drops, and clears that force a weak return your
          front partner can finish. Skills that matter most are clean
          overhead contact, the smash that can be repeated three or four
          times in a rally, and the read on which corner the lift will
          come back to. Rear-court specialists benefit most from
          head-heavy and stiff frames — Astrox 88D Pro 2024, 99 Pro,
          100ZZ, Halbertec 9000 Power — because their match-winners need
          smash mass behind them. The cost is slower recovery between
          shots, which they offset by relying on their front partner to
          finish quick exchanges.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          The defensive (side-by-side) role
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          When the opponents are attacking, both players cover their half
          of the court and try to absorb pressure into a winnable
          situation. Defensive doubles is won between blocks (short, soft
          returns that land in the front court), drives (flat returns
          that level the rally), and strategic lifts that send the shuttle
          deep enough to force a less-aggressive next attack. Frame
          choice for defensive specialists leans head-light and stiff —
          fast hands beat heavy heads in flat exchanges. The Nanoflare
          line and Victor Auraspeed 90K II are the archetypes.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Rotation: the part most clubs skip
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Pro doubles pairs rotate constantly: when the rear-court player
          drives a flat shot to the side line, the front partner is
          already moving deep to cover the corner, and the original rear
          player rotates forward into the new front-court role. The skill
          is reading the shuttle and your partner&rsquo;s position
          simultaneously. Most amateur clubs play static front-and-back
          and lose ten points per match to bad rotation. The fix is
          drill-level: practice clear-and-rotate, smash-and-cover, and
          drive-and-swap until they are reflexive. No racket upgrade
          will compensate for a partnership that does not rotate.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Mixed doubles is its own thing
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          In mixed doubles, the woman traditionally plays front and the
          man rear when attacking, with strict role discipline at most
          competitive levels. Defensively, both players rotate and the
          formation is far less gendered. Mixed doubles rewards control
          and net touch over raw power more than men&rsquo;s doubles
          does — which is why the Astrox 88S Pro 2024 (control-balance,
          stiff shaft) is the dominant tour-level choice for mixed
          front-court players right now.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          What this means for your gear
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          If you have a fixed primary role, optimise for it: head-heavy
          for rear, head-light for front, with shoes tuned to your
          movement priority (more cushion for rear-court repeated
          landings, lower profile for front-court speed). If you rotate
          freely or your club partner changes weekly, default to
          even-balance medium-stiff frames and stability-leaning shoes —
          they cover the most ground at the cost of being slightly
          sub-optimal in any one situation. The IntoBadminton finder asks
          you to mark your discipline (singles, doubles, mixed) and your
          play style (offensive, balanced, defensive, front-court,
          smash-heavy) so the recommendation can match these tradeoffs
          without forcing one frame to do everything.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link
            href="/guides/doubles-positioning-and-rackets/"
            className="text-[var(--color-accent)] underline"
          >
            doubles positioning and rackets
          </Link>
          ,{" "}
          <Link href="/best/doubles-rackets/" className="text-[var(--color-accent)] underline">
            best doubles rackets
          </Link>
          ,{" "}
          <Link href="/guides/racket-balance/" className="text-[var(--color-accent)] underline">
            racket balance and flex
          </Link>
          , and{" "}
          <Link href="/compare-guides/yonex-astrox-vs-nanoflare/" className="text-[var(--color-accent)] underline">
            Astrox vs Nanoflare for doubles
          </Link>
          .
        </p>

        <GuideCatalogCta slug="doubles-roles" />
      </article>
    </main>
  );
}
