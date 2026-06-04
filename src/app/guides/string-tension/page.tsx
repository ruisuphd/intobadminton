import Link from "next/link";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { GuideStructuredData } from "@/components/GuideStructuredData";

const PATH = "/guides/string-tension/";
const HEADLINE = "Badminton string tension: a practical guide";
const DESCRIPTION =
  "How badminton string tension changes feel, power, and control — recommended pound ranges by skill, restring frequency, and climate effects most players miss.";

export const metadata: Metadata = {
  title: "Badminton string tension guide",
  description: DESCRIPTION,
  alternates: pageAlternates(PATH),
};

export default function StringTensionGuide() {
  return (
    <main className="flex-1 py-16">
      <GuideStructuredData
        path={PATH}
        headline={HEADLINE}
        description={DESCRIPTION}
        breadcrumbLabel="String tension"
        howToSteps={[
          {
            name: "Check your frame's tension range",
            text: "Read the manufacturer's recommended lb window on the frame or cone cap. Never exceed the printed maximum.",
          },
          {
            name: "Pick a starting tension for your level",
            text: "Beginners: 18–22 lb. Club players: 22–26 lb. Competitive: 24–28 lb. Adjust down if you have arm discomfort.",
          },
          {
            name: "Choose a string type",
            text: "Thinner gauges (0.65–0.69 mm) add repulsion but wear faster. Thicker gauges (0.70+ mm) last longer with a firmer feel.",
          },
          {
            name: "Restring on a schedule",
            text: "Restring at least as often as you play hours per week. A dead stringbed hides tension mistakes until your clears start dying.",
          },
        ]}
      />
      <article className="layout-band max-w-3xl space-y-6 text-[var(--text)]">
        <p>
          <Link
            href="/guides/"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            ← Guides
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Badminton string tension: a practical guide
        </h1>
        <div id="guide-toc-anchor" className="mb-8 min-h-48" />
        <p className="text-[var(--color-muted)] leading-relaxed">
          Tension is the single setting that changes how a racket feels more
          than any spec on the box. The same frame at 22 lb and at 28 lb plays
          like two different rackets — different sweet spot size, different
          dwell time, different repulsion, different sound on contact. Yet
          most amateurs choose tension by copying a friend or trusting a pro
          shop default. This guide is the version we wish we had ten years
          ago: when to go up, when to go down, and what changes between
          week one and week six on the same stringbed.
        </p>

        <h2 className="pt-2 text-xl font-semibold">
          The trade-off in one paragraph
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Higher tension narrows the sweet spot, sharpens feedback on contact,
          and shortens dwell time — the shuttle leaves the strings faster
          with less &ldquo;trampoline&rdquo; rebound. Lower tension widens the
          sweet spot, lengthens dwell time, and lets the stringbed do more of
          the work for you. If your swing speed cannot generate the energy a
          high-tension bed needs, the bed cannot give it back to the shuttle
          and your clears die short. Most amateurs are over-strung for this
          reason. The fix is almost always to drop two pounds, not add two.
        </p>

        <h2 className="pt-2 text-xl font-semibold">
          Recommended ranges by skill level
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["18-22 lb", "Beginner / comfort", "Easy length, large sweet spot, gentle on the arm. The right place to start when you cannot yet clear from baseline to baseline."],
            ["22-24 lb", "Recreational club", "Small step up from beginner — sharper feel without losing the safety margin on imperfect contact."],
            ["24-26 lb", "Intermediate club", "The most common adult range. Sharp enough to reward clean technique, forgiving enough to survive off-centre hits."],
            ["26-28 lb", "Competitive club / league", "Tight feedback, smaller sweet spot. Your clears should reliably reach the back tramline at this tension."],
            ["28-30 lb", "Advanced / tournament", "Tour-tier tension. Without a fast, consistent swing the bed costs you more in mishit power than it gives you in control."],
            ["30+ lb", "Pro-tier only", "Frame and stringer-machine dependent. Most amateur frames are not warrantied at this tension. Skip unless your stringer specifically signs off."],
          ].map(([range, fit, note]) => (
            <div key={range} className="card p-4">
              <p className="font-semibold text-[var(--text)]">{range}</p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{fit}</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{note}</p>
            </div>
          ))}
        </div>

        <h2 className="pt-2 text-xl font-semibold">
          How to tell you are over-strung
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Three repeatable signs: clears come up short on cleanly-hit
          overheads, smashes feel &ldquo;dead&rdquo; on the contact you used
          to crush at lower tension, and the racket feels harsh — almost
          metallic — on net touches. None of these symptoms mean the racket
          is wrong. They usually mean the bed is too tight for your current
          swing speed. The reliable test is to drop 2 lb at the next
          restring; if length and power improve, drop another 1 lb at the
          string after.
        </p>

        <h2 className="pt-2 text-xl font-semibold">
          Why tension changes during the life of the stringbed
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Strings lose tension fast in the first 24 hours after stringing —
          typically 5-10% — and continue to relax for the next several
          weeks. By the end of week six on a regularly-used stringbed, the
          actual playing tension is often 3-5 lb below the tag. This is
          why you should always log how your stringbed feels at week one
          versus week three: if the bed feels &ldquo;just right&rdquo; at
          week three, you are probably playing too low at week six. Restring
          before the bed loses 30% of its tension, not after the string
          breaks.
        </p>

        <h2 className="pt-2 text-xl font-semibold">
          Climate and altitude
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Hot, humid courts (Singapore, Bangkok, Manila) make shuttles fly
          longer and stringbeds feel softer; cold halls (Northern Europe in
          winter) do the opposite. Many tour players string slightly higher
          for tropical play and slightly lower for cold venues to keep the
          effective bed feel consistent. As an amateur, you do not need to
          retune for every match, but if you travel for tournaments,
          expect the same racket and tension to feel half a pound off
          when the climate changes.
        </p>

        <h2 className="pt-2 text-xl font-semibold">
          String gauge interacts with tension
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Thinner strings (0.61-0.66 mm — Yonex EXBOLT 63, Aerobite Boost)
          generate more repulsion at the same tension as thicker strings
          (0.70 mm — BG65). This means a player switching from BG65 at 24 lb
          to EXBOLT 63 at the same 24 lb will feel a livelier bed and likely
          want to add 1-2 lb to recover the same control feel. Conversely,
          a player going from a thin tour string back to BG65 will want to
          drop tension to keep the bed feeling crisp.
        </p>

        <h2 className="pt-2 text-xl font-semibold">
          Restring frequency
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Whichever comes first: every 30-50 sessions of regular play, every
          3-4 months on the calendar, or immediately when you can press
          through the bed-plane more than 1 cm with your finger. The popular
          guideline &ldquo;restring as many times per year as you play per
          week&rdquo; works for most club players but undercounts heavy
          smashers and tournament players, who should restring more
          frequently. Pro tour players often restring every match.
        </p>

        <h2 className="pt-2 text-xl font-semibold">
          Stringer choice matters more than the number
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          A 26 lb stringbed from a careful certified stringer will feel
          tighter, more even, and last longer than a 28 lb job from a rushed
          machine. Constant-pull electronic machines hold tension more
          accurately than crank machines, but the stringer&rsquo;s technique
          matters most: weave order, clamping discipline, knot placement,
          and how cleanly the mains and crosses are pulled all change
          playing tension by 1-2 lb. If you can, stick to one stringer once
          you find a good one — that is the single biggest improvement
          available to most amateur players.
        </p>

        <h2 className="pt-2 text-xl font-semibold">
          Test small, log everything
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          When you change tension, change by 1 lb at a time, never more.
          Bigger jumps make it impossible to tell whether the new feel came
          from tension, the new string, the stringer, or your own technique
          on a given night. Keep a one-line note in your phone after each
          session: tension, string, sessions on the bed, and how clears,
          drops, and smashes felt. Three or four restrings of data is
          enough to lock in your personal sweet-spot tension.
        </p>

        <h2 className="pt-2 text-xl font-semibold">Disclaimer</h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          This is general education, not stringing advice for your specific
          frame or warranty. Some manufacturers void warranty above stated
          maximums; some grommet sets are not safe at high tension on older
          rackets. A certified stringer who inspects your grommets, frame
          condition, and the manufacturer&rsquo;s recommended range should
          have the last word. The IntoBadminton finder uses preferred
          tension as a soft signal in scoring, not a hard filter — gauge,
          shuttle speed, machine type, and climate all change feel enough
          that a one-number rule cannot hold across players.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link
            href="/tools/string-tension-calculator/"
            className="text-[var(--color-accent)] underline"
          >
            string tension calculator
          </Link>
          ,{" "}
          <Link href="/best/strings/" className="text-[var(--color-accent)] underline">
            best badminton strings
          </Link>
          ,{" "}
          <Link href="/guides/racket-balance/" className="text-[var(--color-accent)] underline">
            racket balance and flex
          </Link>
          , and{" "}
          <Link href="/review/badminton-string-selector/" className="text-[var(--color-accent)] underline">
            choosing strings by outcome
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
