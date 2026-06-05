import Link from "next/link";
import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { GuideStructuredData } from "@/components/GuideStructuredData";

const PATH = "/guides/badminton-shoes-vs-running-shoes/";
const HEADLINE = "Badminton shoes vs running shoes";
const DESCRIPTION =
  "Why running shoes are a poor substitute on a badminton court — heel drop, lateral stability, gum-rubber grip, and what to wear instead.";

export const metadata: Metadata = editorialPageMetadata({
  path: PATH,
  title: "Badminton shoes vs running shoes",
  description: DESCRIPTION,
});

const HOW_TO_STEPS = [
  {
    name: "Check the outsole",
    text: "Badminton shoes use non-marking gum rubber tuned for wood and PVC mats. Running soles are built for forward roll on pavement and slip on indoor courts.",
  },
  {
    name: "Measure heel-to-toe drop",
    text: "Running shoes often sit at 8–12 mm drop; badminton shoes are closer to 2–4 mm so split steps stay stable.",
  },
  {
    name: "Test lateral support",
    text: "Try a side lunge in store. If the upper folds over the foot or the heel slides, the shoe is wrong for badminton regardless of brand.",
  },
  {
    name: "Match cushion to your role",
    text: "Rear-court doubles players can use more forefoot cushion; front-court specialists want a lower, firmer platform.",
  },
];

export default function BadmintonVsRunningShoesGuide() {
  return (
    <main className="flex-1 py-16">
      <GuideStructuredData
        path={PATH}
        headline={HEADLINE}
        description={DESCRIPTION}
        breadcrumbLabel="Shoes vs running"
        howToSteps={HOW_TO_STEPS}
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
          Badminton shoes vs running shoes
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Most club players who show up in running trainers are not being
          cheap — they are using shoes engineered for a completely different
          movement pattern. Running is forward-dominant with heel strike and
          roll-off; badminton is lateral-dominant with split steps, lunges,
          and abrupt braking. The mismatch shows up as rolled ankles, knee
          pain after two games, and slips on wood that feel like
          &ldquo;the court is dusty&rdquo; when the real problem is the sole
          compound.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Grip: why pavement rubber fails indoors
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Running outsoles use carbon rubber or blown rubber blends optimised
          for abrasion on asphalt and durability over hundreds of kilometres.
          Badminton outsoles use soft gum rubber that grips polished wood and
          PVC sport mats at the cost of faster wear. On a badminton court,
          a running shoe often feels fine for the first rally and then
          skids on the third lateral push — the classic club injury setup. If
          you must borrow shoes once, volleyball indoor shoes are closer than
          road trainers; dedicated badminton shoes are still the right answer.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Heel drop and why it changes your split step
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Heel-to-toe drop is the height difference between heel and forefoot
          cushioning. Daily trainers commonly sit at 8–12 mm to encourage a
          heel-strike gait. Badminton shoes target roughly 2–4 mm so your
          centre of mass stays lower during split steps and net interceptions.
          Wearing a high-drop running shoe in badminton pitches your weight
          backward on lunges and makes it harder to recover forward after a
          rear-court clear. You do not need zero drop — you need a court shoe
          profile, not a marathon profile.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Lateral stability: the injury vector running shoes ignore
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Running uppers are light and flexible because the foot moves mostly
          in the sagittal plane. Badminton uppers add medial and lateral
          overlays so the foot does not roll when you push off the outside
          edge during a forehand-side lunge. Running shoes also lack the
          reinforced toe drag zone many rear-court players need. The failure
          mode is subtle: you feel fast for one session, then notice outer
          ankle soreness or IT-band irritation over the next week. That is
          not &ldquo;getting old&rdquo; — it is equipment mismatch.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Cushioning direction: forward vs multi-directional
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Max-cushion running shoes stack foam in the heel for impact
          attenuation on long straight lines. Badminton distributes cushion
          under the forefoot and ball of the foot because jumps and lunges
          load the front of the shoe. A plush heel in a running shoe can
          feel comfortable walking to the hall and wrong the moment you
          brake hard at the service line. Rear-court doubles specialists still
          want cushion — but in a badminton last (Yonex Power Cushion, Victor
          A970, Mizuno Wave Claw), not a Nike Pegasus stack.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          When running shoes are acceptable (short list)
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-[var(--color-muted)] leading-relaxed">
          <li>
            A one-off casual hit with no lateral drills — still risky, but
            lower stakes than league night.
          </li>
          <li>
            Off-court warm-up jog around the sports hall — fine in runners;
            change before you step on court.
          </li>
          <li>
            Budget emergency where the alternative is barefoot — choose the
            lowest-drop court shoe you can borrow instead.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          What to buy instead
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Start from fit width, then stability tier, then brand habit. Wide
          forefeet should look at explicit wide lasts before sizing up. If you
          play doubles rear court three nights a week, bias toward stability
          and forefoot cushion; front-court specialists can accept a lower,
          firmer platform. Our{" "}
          <Link href="/best/shoes/" className="text-[var(--color-accent)] underline">
            best badminton shoes
          </Link>{" "}
          list ranks options with transparent fit scoring; the finder can
          narrow by discipline and foot comfort flags.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link href="/guides/shoes-footwork/" className="text-[var(--color-accent)] underline">
            shoes and footwork
          </Link>
          ,{" "}
          <Link href="/guides/wide-feet-badminton-shoes/" className="text-[var(--color-accent)] underline">
            shoes for wide feet
          </Link>
          ,{" "}
          <Link
            href="/compare-guides/badminton-vs-tennis-shoes/"
            className="text-[var(--color-accent)] underline"
          >
            badminton vs tennis shoes
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
