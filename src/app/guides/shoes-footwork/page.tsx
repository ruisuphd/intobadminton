import Link from "next/link";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { GuideEngagement } from "@/components/GuideEngagement";
import { GuideStructuredData } from "@/components/GuideStructuredData";

const PATH = "/guides/shoes-footwork/";
const HEADLINE = "Badminton shoes and footwork";
const DESCRIPTION =
  "Why badminton shoes matter more than the racket for most amateurs — choose by fit width, stability, cushioning, and outsole to support footwork patterns.";

export const metadata: Metadata = {
  title: "Badminton shoes and footwork guide",
  description: DESCRIPTION,
  alternates: pageAlternates(PATH),
};

export default function ShoesGuide() {
  return (
    <main className="flex-1 py-16">
      <GuideStructuredData
        path={PATH}
        headline={HEADLINE}
        description={DESCRIPTION}
        breadcrumbLabel="Shoes & footwork"
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
          Badminton shoes and footwork
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Badminton happens in sharp lateral bursts. The split step
          followed by a side lunge, the toe drag during a clear, and the
          braking-turn before the next shot all put loads on the foot and
          ankle that a generic running shoe cannot safely support. For
          most amateurs, picking the right court shoe is a bigger upgrade
          than picking the right racket — and a meaningful injury reducer.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Why badminton-specific shoes matter
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Four design decisions separate badminton shoes from running
          shoes. The outsole uses a soft gum-rubber compound for grip on
          indoor wood and mat surfaces — running outsoles are tuned for
          rolling traction on hard pavement and slip dangerously on
          court. The midsole has a low heel-to-toe drop (2-4 mm vs 6-10 mm
          on running shoes), so your foot sits closer to the floor for
          split steps. The upper has lateral reinforcement to resist
          rolling during side lunges. And the toe is reinforced for the
          foot-drag many players develop on rear-court overheads.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Fit width is more important than length
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          A shoe that is too narrow shows up first as forefoot pinch
          during lateral lunges, then as compensatory pressure in the
          knees and ankles, and finally as plantar or patellar pain. The
          common mistake is to size up half a size to relieve the pinch,
          which solves the forefoot but creates heel slip during recovery.
          The right answer is a wide-fit option in the same length:
          Yonex Power Cushion 65 Z Wide, Mizuno Wave Claw 2 wide, or any
          shoe whose last is naturally roomier in the forefoot. Asian
          lasts (Victor, Mizuno) tend to run snugger; European and
          American lasts run wider as default. Try both before locking in
          a brand habit.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Stability vs speed: the protection trade-off
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Court shoes split into two design philosophies: stability-first
          (more rigid midsole, taller torsion plate, more cushion) and
          speed-first (lighter weight, lower profile, less cushion).
          Stability shoes — Yonex Eclipsion Z, Power Cushion 65 Z — are
          right for heavier players, players with ankle history, and
          singles tournament play where matches stack up over a weekend.
          Speed shoes — Yonex Aerus Z, Asics Gel-Rocket — favour faster
          players whose match-winners are interception and recovery, not
          long rallies. Most club players are better served by stability;
          top-end speed shoes reward technique that most amateurs do not
          yet have.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Cushioning and joint comfort
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Cushioning protects against repeat landing impacts during
          smashes, lunges, and split steps. Players with knee, heel, or
          plantar concerns benefit from higher-cushion options like the
          Yonex Power Cushion Comfort Z3 or Eclipsion Z3, even at the
          cost of slightly slower recovery between shots. Lighter
          players in their 20s can usually run lower-cushion shoes
          safely; players over 35 or above 80 kg should default to more
          cushion and accept the small weight cost. None of this is
          medical advice — persistent pain warrants a clinician, not a
          shoe upgrade.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Outsole and venue surface
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Indoor wood is the most common badminton surface and is what
          gum rubber is tuned for. Synthetic mats (Yonex BWF mat, Taraflex,
          Gerflor) require slightly more grip and can wear gum rubber
          faster. Concrete sports halls — common in older European and
          Asian venues — chew through outsoles in months and may require
          a slightly harder rubber compound. If you play frequently on
          one surface type, ask the venue what tournament players use
          there.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Footwork patterns the shoe needs to handle
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Three patterns dominate badminton footwork: the split step
          (a small jump that resets your weight before the opponent&rsquo;s
          contact), the side lunge (an explosive lateral step into the
          shot, with the trailing leg sliding), and the recovery step
          (returning to the central T after every shot). The shoe must
          absorb the split-step landing, hold the foot during the side
          lunge, and be light enough not to slow recovery. Players who
          develop strong footwork find that a stability-leaning shoe
          actually feels faster than a speed-shoe under match pressure,
          because confident landings produce confident next steps.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Replacement schedule
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Most club players need new badminton shoes every 9-15 months
          even when the upper still looks fine. The midsole foam
          compresses and the gum rubber outsole slowly hardens — both
          changes happen long before a hole appears. A reliable habit:
          write the purchase date inside the tongue with a marker.
          Tournament players often replace twice a year. Recreational
          players who play once a week can stretch to 18 months but
          should expect ankle support to degrade noticeably toward the
          end of that window.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          What to skip
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Volleyball shoes share court compounds but use different
          torsion patterns and run heavier — they will work in a pinch
          but are not the right tool. Tennis shoes are the wrong tool
          (raised heels, pavement-tuned outsole). General &ldquo;sports
          trainers&rdquo; are almost always running-shoe variants in
          disguise. If a shoe does not specifically say
          &ldquo;badminton&rdquo; or &ldquo;indoor court&rdquo; in the
          product copy, treat it with suspicion.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link href="/best/shoes/" className="text-[var(--color-accent)] underline">
            best badminton shoes
          </Link>
          ,{" "}
          <Link href="/guides/wide-feet-badminton-shoes/" className="text-[var(--color-accent)] underline">
            shoes for wide feet
          </Link>
          ,{" "}
          <Link
            href="/guides/badminton-shoes-vs-running-shoes/"
            className="text-[var(--color-accent)] underline"
          >
            badminton vs running shoes
          </Link>
          , and{" "}
          <Link href="/compare-guides/badminton-vs-tennis-shoes/" className="text-[var(--color-accent)] underline">
            badminton vs tennis shoes
          </Link>
          .
        </p>
        <GuideEngagement path={PATH} title={HEADLINE} />
      </article>
    </main>
  );
}
