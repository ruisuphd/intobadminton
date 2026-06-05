import Link from "next/link";
import type { Metadata } from "next";
import { editorialPageMetadata } from "@/lib/metadata";
import { GuideCatalogCta } from "@/components/GuideCatalogCta";
import { GuideStructuredData } from "@/components/GuideStructuredData";
import { GuideTocAnchor } from "@/components/GuideTocAnchor";

const PATH = "/guides/wide-feet-badminton-shoes/";
const HEADLINE = "Badminton shoes for wide feet";
const DESCRIPTION =
  "How wide-footed badminton players should choose court shoes — wide-fit options from Yonex, Victor, Mizuno, plus how to test fit and avoid heel slip.";

export const metadata: Metadata = editorialPageMetadata({
  path: PATH,
  title: HEADLINE,
  description: DESCRIPTION,
});

export default function WideFeetShoesGuide() {
  return (
    <main className="flex-1 py-16">
      <GuideStructuredData
        path={PATH}
        headline={HEADLINE}
        description={DESCRIPTION}
        breadcrumbLabel="Wide-feet shoes"
        howToSteps={[
          {
            name: "Confirm you need a wide last",
            text: "If the forefoot pinches but the heel is loose, try wide-fit models before sizing up — extra length often worsens heel slip.",
          },
          {
            name: "Compare wide SKUs across brands",
            text: "Yonex wide (e.g. 65Z Wide), Victor wide lasts, and ASICS wide options use different lasts — try more than one brand.",
          },
          {
            name: "Lace for forefoot room",
            text: "Skip the bottom eyelet or use a window lacing pattern to relieve pressure on the ball of the foot without losing heel lock.",
          },
          {
            name: "Shortlist from the wide-feet best list",
            text: "Use the wide-feet badminton shoes best-of page for models with verified wide-fit notes before ordering online.",
          },
        ]}
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
          Badminton shoes for wide feet
        </h1>
        <GuideTocAnchor />
        <p className="text-[var(--color-muted)] leading-relaxed">
          Wide-footed players have one of the hardest fit problems in
          badminton: the standard last on most performance shoes is
          built around a relatively narrow Asian foot, and the half-size
          up that solves the forefoot pinch creates a heel-slip problem
          during lateral lunges. The right answer is almost never to
          size up — it is to find a shoe whose last is genuinely wider in
          the forefoot while keeping the heel cup snug.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          What &ldquo;wide&rdquo; means and what it does not
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          &ldquo;Wide&rdquo; in badminton shoes is measured against the
          brand&rsquo;s own regular last, not against an absolute
          standard. A Yonex Power Cushion 65 Z Wide adds about 5-8 mm of
          forefoot circumference compared with the regular 65 Z. A Mizuno
          Wave Claw wide-fit version adds a similar amount. American
          shoe brands often run wider as default, while Victor and
          Mizuno regular fits run snug. If your foot has measured wider
          than EE or 4E in shoe-store sizing, you should always look for
          an explicit wide variant rather than rely on an unfamiliar
          brand running roomy.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          The heel-slip mistake
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The most common wrong fix for a tight forefoot is to buy a
          half size up. The shoe is now long enough that the toes do not
          press the front, but the heel sits forward in the shoe and
          slips upward on every recovery step. Heel slip during a
          rear-court overhead is dangerous: the shoe lifts during the
          weight shift, the heel hits the floor a fraction late, and
          ankle stability suffers. If you must choose between a
          slightly-tight forefoot and heel slip, the snug forefoot is
          much safer — but the right answer is to find a wide-fit shoe
          in your true length.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          Solid wide-fit options
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-[var(--color-muted)] leading-relaxed">
          <li>
            <strong>Yonex Power Cushion 65 Z Wide</strong> — the most
            universal wide-fit recommendation in the sport. Z-tier
            stability, generous forefoot, well-built. Available in EU,
            UK, US, JP, SG markets.
          </li>
          <li>
            <strong>Yonex Power Cushion Comfort Z3</strong> — a slightly
            more relaxed last than the 65 Z and very forgiving of wider
            feet. Higher cushioning trade-off costs some court speed.
          </li>
          <li>
            <strong>Mizuno Wave Claw 2 (wide)</strong> — an alternative
            for players who want a roomier last with a more
            running-shoe-like upper. Less aggressively built for lateral
            stability than the Yonex 65 Z line.
          </li>
          <li>
            <strong>FZ Forza wide-fit lines</strong> — particularly
            popular in Northern Europe and worth checking if Yonex
            availability is a problem.
          </li>
          <li>
            <strong>Victor A170</strong> — at the budget end, runs
            slightly roomier than the P9200 series.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          What to skip
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The Yonex Aerus Z series is the lightest, fastest court shoe
          Yonex makes — but the last is narrow even by Asian standards
          and is the wrong starting point for anyone with a wide foot.
          Most Victor speed shoes run similarly snug. As a rule, if a
          shoe is marketed primarily on weight (Aerus Z, Aerus Light,
          ultralights) it is almost certainly the wrong fit for wide
          feet; if it is marketed on stability or comfort (Power
          Cushion 65 Z, Eclipsion Z, Comfort Z), it is far more likely
          to have a wide-fit option.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          How to test fit before committing
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          A standing fit test is not enough — feet swell during play
          and the load patterns of lateral movement do not show up when
          you stand still. Try shoes on after a session if possible,
          when feet are at their largest. Walk briskly, then perform a
          slow side lunge and a slow forward lunge in the store — if
          the heel lifts during the lunge, the shoe is too long; if
          the forefoot pinches, it is too narrow. Most reputable
          badminton specialists will let you do this. Avoid ordering
          new last designs online without trying them physically first.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          When to consider custom orthotics
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          If you have a high-arch wide foot or a history of plantar
          fasciitis, an off-the-shelf insole upgrade (Superfeet,
          Sidas, Currex) inside a wide-fit shoe often outperforms a
          standard insole. Custom orthotics from a podiatrist can be
          worth the cost for serious tournament players or anyone with
          a chronic injury history. None of this is medical advice —
          persistent pain warrants a clinician.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-[var(--text)]">
          What the IntoBadminton finder asks for
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The shoe finder asks for foot width (narrow, regular, wide) and
          comfort flags (knee, ankle, heel, plantar) so the
          recommendation engine can prioritise wide-fit options when
          appropriate. Width is treated as a hard filter: a regular-fit
          shoe will not be recommended if you indicate a wide foot. The
          comfort flags act as soft signals that nudge stability and
          cushioning higher in the score.
        </p>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link href="/best/shoes/" className="text-[var(--color-accent)] underline">
            best badminton shoes
          </Link>
          ,{" "}
          <Link href="/guides/shoes-footwork/" className="text-[var(--color-accent)] underline">
            shoes and footwork
          </Link>
          , and{" "}
          <Link href="/review/badminton-shoe-fit-stability/" className="text-[var(--color-accent)] underline">
            badminton shoe fit explained
          </Link>
          .
        </p>

        <GuideCatalogCta slug="wide-feet-badminton-shoes" />
      </article>
    </main>
  );
}
