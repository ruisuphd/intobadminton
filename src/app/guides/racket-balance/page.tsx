import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badminton racket balance and shaft flex — IntoBadminton",
  description:
    "How head weight and shaft stiffness interact on court. Reading balance points in millimetres, choosing flex by skill level, and the four-tier shaft hardness scale used in deep reviews.",
  alternates: { canonical: "/guides/racket-balance/" },
};

export default function RacketBalanceGuide() {
  return (
    <main className="flex-1 py-16">
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
          Racket balance and shaft flex
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Two specs do most of the work in determining how a badminton racket
          feels: where its mass sits along the shaft (the balance point) and
          how much the shaft bends under load (the flex). Weight class and
          frame shape matter, but balance and flex are what separate a
          forgiving doubles racket from an unforgiving smash weapon — even
          when they are both labelled &ldquo;4U.&rdquo; This guide explains
          how to read those numbers and pick the combination that fits you.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          What balance actually means
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Balance is measured in millimetres from the butt cap to the
          balance point of the strung racket. The numbers cluster into
          three usable bands: head-light (about 285-292 mm), even
          (293-298 mm), and head-heavy (299 mm and up). A 5 mm shift sounds
          small but it changes swing weight noticeably — a 305 mm Astrox
          88D Pro feels meaningfully heavier through the air than a 297 mm
          Arcsaber 11 Pro at the same listed unstrung weight.
        </p>

        <div className="overflow-x-auto card">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="border-b border-[color:var(--line-strong)] text-[var(--text)]">
              <tr>
                <th className="p-4">Spec signal</th>
                <th className="p-4">Usually helps</th>
                <th className="p-4">Watch out for</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-muted)]">
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Head-heavy</td>
                <td className="p-4">Rear-court pressure, steep smashes, singles attack</td>
                <td className="p-4">Late defense, fast doubles blocks, shoulder fatigue</td>
              </tr>
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Head-light</td>
                <td className="p-4">Drive exchanges, front-court interception, defense</td>
                <td className="p-4">Players who need the racket to help load power</td>
              </tr>
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Even</td>
                <td className="p-4">All-court doubles, mixed roles, players who switch front and back</td>
                <td className="p-4">Specialists who need a clear bias for their primary role</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--text)]">Extra-stiff shaft</td>
                <td className="p-4">Clean, repeatable timing and direct feedback</td>
                <td className="p-4">Developing technique or joint-comfort flags</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          The four flex tiers
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Manufacturers label shaft flex with words rather than numbers, and
          the words are not standardised between brands. Reading across the
          three flagships, the four practical tiers are: flexible (Yonex
          Voltric Lite, Nanoflare Junior); medium (Astrox 7, Arcsaber 7
          Pro, Halbertec 6000); stiff (Astrox 77 Pro, Auraspeed 90K II);
          and extra-stiff (Astrox 88D Pro 2024, 100ZZ, AxForce 90 New).
          Yuan-style hardness measurements — popular on BadmintonCN — give
          a more granular number where lower means stiffer; Astrox 88D Pro
          2024 sits around 7.59 on that scale, near the stiffest production
          shafts on the market.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Why stiff shafts can lose you smash power
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          A stiffer shaft transmits more energy to the shuttle when the
          stroke is clean — that is what tour players use it for. But the
          stiffer shaft also bends less, so it stores less energy on
          contact. To benefit from extra stiffness you need to bring more
          swing speed to the contact yourself. Most amateurs do not, which
          is why the same player&rsquo;s smash often gets shorter, not
          longer, after upgrading from a medium-flex 77 Pro to an
          extra-stiff 100ZZ. The right shaft tier is the one your current
          swing speed can actually load. Build the technique first, then
          upgrade the shaft.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Stacked specs: when small things become unforgiving
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Each of these specs has a small individual cost on forgiveness:
          extra-stiff shaft, head-heavy balance, 3U weight, high tension,
          and a thicker grip than your hand prefers. Any one of them is
          fine on its own. Stacking three or four of them creates a timing
          window so narrow that even a Division-1 player will mishit
          regularly. The classic mistake is buying an extra-stiff,
          head-heavy 3U racket and stringing it at 30 lb because that is
          what your favourite pro plays. The real lesson from watching
          pros is the opposite: many of them tune one or two specs softer
          than the headline number to keep their timing window intact
          across long matches.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Match balance and flex to your role
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Singles attackers and rear-court doubles players gain more from
          head-heavy and stiff than other players because their
          match-winning shot is the smash. Front-court doubles, mixed
          doubles, and women&rsquo;s doubles are usually better served by
          even or head-light balance with a medium-stiff shaft, because
          the rally is won between blocks, drives, and net interception
          rather than first-attack power. If you switch roles within a
          season, an even-balance medium-stiff frame like the Astrox 88S
          Pro 2024 or Astrox 77 Pro covers more ground than a specialist
          attack frame.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          How weight class fits in
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          U-class is the unstrung weight band: 3U is 85-89 g, 4U is
          80-84 g, 5U is 75-79 g. A heavier head bias has more effect on
          a 3U racket than a 4U because there is more total mass to
          concentrate. Most adult amateurs do better with 4U as a default;
          5U is the right choice for new players, players coming back
          from injury, and many women&rsquo;s doubles players who win on
          rally speed rather than smash mass. Choose 3U only if your
          shoulder is conditioned for it and you specifically want the
          extra mass behind your overheads.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Reading specs across brands
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Yonex, Victor, and Li-Ning all publish balance and flex on their
          official pages. Treat those numbers as the source of truth.
          Retail listings and forum specs are often re-worded
          approximations and may quietly compress &ldquo;medium&rdquo; and
          &ldquo;medium-stiff&rdquo; into one tier. When a community
          source like BadmintonCN gives a measured Yuan-style hardness, that
          is more reliable than the manufacturer&rsquo;s adjective because
          the numbers are calibrated to the same scale across rackets.
          IntoBadminton&rsquo;s finder treats official balance and shaft
          listings as primary, then uses editor notes and rights-safe
          review summaries to explain how those specs tend to feel on
          court. When a product still needs verification, the result can
          appear in your shortlist but its confidence is lowered until
          the official page-level source is checked.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link href="/guides/string-tension/" className="text-[var(--color-accent)] underline">
            string tension guide
          </Link>
          ,{" "}
          <Link href="/best/intermediate-rackets/" className="text-[var(--color-accent)] underline">
            best intermediate rackets
          </Link>
          , and{" "}
          <Link href="/blog/yuan-style-shaft-hardness-explained/" className="text-[var(--color-accent)] underline">
            Yuan-style shaft hardness explained
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
