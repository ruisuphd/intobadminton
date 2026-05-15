import Link from "next/link";
import type { Metadata } from "next";
import { GuideStructuredData } from "@/components/GuideStructuredData";

const PATH = "/guides/season-refresh/";
const HEADLINE = "When to refresh your badminton gear";
const DESCRIPTION =
  "When to restring, regrip, replace shoes, and re-evaluate your racket — a practical seasonal checklist with the warning signs each item gives off.";

export const metadata: Metadata = {
  title: "Badminton gear refresh checklist",
  description: DESCRIPTION,
  alternates: { canonical: PATH },
};

export default function SeasonRefreshGuide() {
  return (
    <main className="flex-1 py-16">
      <GuideStructuredData
        path={PATH}
        headline={HEADLINE}
        description={DESCRIPTION}
        breadcrumbLabel="Gear refresh"
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
          When to refresh your badminton gear
        </h1>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Most amateur players refresh their gear later than they should
          and on the wrong cycle. Strings get replaced when they snap, not
          when they have lost tension. Shoes get worn until the upper
          tears, not while the midsole still works. Grips get tolerated
          long after they have gone slick. None of this is a tragedy by
          itself, but the cumulative effect is the slow disappearance of
          the kit you originally chose. This guide walks through the
          refresh schedule for every consumable on your bag.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Strings: every 30-50 sessions, regardless of breakage
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Strings lose 5-10% of their tension in the first 24 hours after
          stringing and continue to relax for weeks. By session 30-40 on a
          regularly-used bed, the actual tension is often 3-5 lb below
          the tag, which changes how the racket plays even though the
          string still looks pristine. Restring as a calendar habit
          (every 3-4 months) or by session count, whichever comes first.
          The early signs of a tired bed: clears coming up short on
          cleanly-struck overheads, drops sitting up, and net taps that
          feel mushy.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Overgrip: every 4-12 sessions
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          An overgrip is a consumable, not a permanent install. Replace
          when the surface goes slick, when the colour darkens noticeably
          from sweat, or when the grip starts to feel hard underneath
          your fingers. Players in tropical climates may need a fresh
          overgrip every 4-5 sessions; players in cold halls can stretch
          to a dozen. A fresh overgrip restores the racket to the size
          and feel you originally chose — many forearm and wrist niggles
          come from over-gripping a slick handle to compensate.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Underbase grip: every 6-12 months
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The underbase (the original grip the racket shipped with)
          degrades slowly and is easy to ignore because the overgrip on
          top hides it. After a year of regular play, the cushioning
          flattens, the texture wears smooth, and the grip diameter
          shrinks slightly. Replace once a year as a default, or
          immediately when you can feel ridges through the overgrip.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Shoes: every 9-15 months for club players
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Shoe midsole foam compresses from repeated landing impacts and
          loses cushioning long before the upper tears or the outsole
          looks bald. The first sign is usually subtle — knees feeling
          tired earlier in the session, or balance feeling slightly off
          on lateral lunges. Most club players need new shoes every 9-15
          months even when the shoe still looks fine. Tournament players
          who play more than three sessions a week should plan two
          replacements a year. Track by date, not appearance: write the
          purchase date inside the tongue with a marker.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Shuttles: by visible damage, not session count
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Feathered shuttles wear unevenly — one rally with a hard smash
          can ruin a tube, while a tube of soft drives can survive a
          full evening. Inspect feathers after every game: torn skirts,
          loose feathers, or visibly bent tips warrant retiring the bird.
          Plastic shuttles last much longer and only need replacing when
          the skirt visibly cracks or distorts. Tournament-tier birds
          (Yonex AS-50, AS-40) are not designed for casual play; using
          them in club drills is expensive and offers no benefit over
          AS-20 or AS-30.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Bag: when capacity stops matching your kit
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          A bag is not a wear item — it is a capacity decision. Two-racket
          commute bags are fine for casual hits, but most regular club
          players outgrow them within a year as the kit list expands
          (spare racket, dedicated court shoes, towel, water, grips,
          shuttles). The right time to upgrade is when you start leaving
          something at home because it does not fit, not when the
          current bag visibly fails.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          The racket itself: every 2-4 years for committed players
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Carbon-fiber rackets do not visibly degrade for years — but the
          frame fatigues invisibly from countless impacts and string
          tension cycles. Pro tour players retire frames after a few
          seasons; amateur players can keep one racket for many years
          but should expect performance to drop subtly after year four
          or five. The honest signal that your racket is past its prime
          is comparing it back-to-back with a fresh frame of the same
          model: if a new copy feels noticeably crisper, your old one
          has lost something. Frame integrity is also a safety issue
          after any visible crack or significant clash — replace,
          do not glue.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Triggers to revisit the finder
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Beyond consumable refresh, there are life events that warrant
          revisiting your equipment recommendation: a step up in league
          division, a coaching change, returning from injury, switching
          your primary discipline (singles to doubles or vice versa), or
          a meaningful change in body weight. Your optimal racket class
          is not a lifetime label — the right frame at recreational level
          is rarely the right frame at competitive level, and the right
          shoe before a knee injury is rarely the right shoe after.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          A season-end audit you can do in 10 minutes
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          At the end of each playing season, sit down with your bag
          and ask five questions. Have you restrung in the last four
          months? Is the overgrip still tacky? Are your shoes still
          comfortable on lateral lunges (not just standing)? Do your
          shuttles still fly true? Has anything about your role,
          weight, or league level changed? If any answer is no or
          changed, the next session is a good time to act on it.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link href="/guides/string-tension/" className="text-[var(--color-accent)] underline">
            string tension guide
          </Link>
          ,{" "}
          <Link href="/best/strings/" className="text-[var(--color-accent)] underline">
            best strings
          </Link>
          , and{" "}
          <Link href="/blog/badminton-bag-loadout/" className="text-[var(--color-accent)] underline">
            what your badminton bag should carry
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
