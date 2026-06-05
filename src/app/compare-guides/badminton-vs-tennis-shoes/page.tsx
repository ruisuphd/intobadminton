import Link from "next/link";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { EditorialMeta } from "@/components/EditorialMeta";
import { EditorialNotice } from "@/components/EditorialNotice";
import { AdSlot } from "@/components/AdSlot";
import { CompareConceptChrome } from "@/components/CompareConceptChrome";
import { InArticleAffiliateDisclosure } from "@/components/InArticleAffiliateDisclosure";
import { JsonLd } from "@/components/JsonLd";
import { catalogHrefFromCompareSlug } from "@/lib/catalog-url";
import { companyInfo } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";
import { articleJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Badminton Shoes vs Tennis Shoes — Compared",
  description:
    "Honest comparison of badminton shoes vs tennis shoes — outsole, stability, cushioning, and why mixing them causes ankle injuries on a wood court.",
  alternates: pageAlternates("/compare-guides/badminton-vs-tennis-shoes/"),
  openGraph: {
    title: "Badminton Shoes vs Tennis Shoes — Compared",
    description:
      "Outsole, heel drop, lateral stability — why tennis shoes belong on a tennis court, not a wood badminton court.",
    url: "/compare-guides/badminton-vs-tennis-shoes/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
};

export default function BadmintonVsTennisShoesPage() {
  const path = "/compare-guides/badminton-vs-tennis-shoes/";
  const articleSchema = articleJsonLd({
    path,
    headline:
      "Badminton vs tennis shoes — can you wear tennis shoes on a badminton court?",
    description:
      "Honest comparison of badminton shoes and tennis shoes — outsole, stability, cushioning, and why mixing them causes ankle injuries. Picks for switching sports safely.",
    section: "Comparison",
  });
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Comparison guides", item: `${companyInfo.siteUrl}/compare-guides/` },
      { "@type": "ListItem", position: 3, name: "Badminton vs tennis shoes", item: `${companyInfo.siteUrl}/compare-guides/badminton-vs-tennis-shoes/` },
    ],
  };

  return (
    <CompareConceptChrome
      contentId="compare:badminton-vs-tennis-shoes"
      url={`${companyInfo.siteUrl}/compare-guides/badminton-vs-tennis-shoes/`}
      title="Badminton vs tennis shoes"
    >
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="layout-band max-w-3xl space-y-6">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/compare-guides/" className="hover:text-[var(--text)]">Comparison guides</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Badminton vs tennis shoes</span>
        </nav>

        <header className="space-y-3">
          <h1 className="text-display text-[var(--text)]">
            Badminton vs tennis shoes — can you wear tennis shoes on a badminton court?
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Short answer: badminton shoes belong on indoor wood courts, tennis shoes do not. Tennis shoes have raised heels designed for forward gait — the same feature that makes them comfortable on a tennis court is what causes ankle rolls during a badminton split step.
          </p>
          <EditorialMeta path="/compare-guides/badminton-vs-tennis-shoes/" />
        </header>

        <EditorialNotice />
        <InArticleAffiliateDisclosure />

        <h2 className="text-headline text-[var(--text)]">
          The four real differences
        </h2>

        <h3 className="text-xl font-semibold text-[var(--text)]">
          1. Outsole compound and pattern
        </h3>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Badminton shoes use a soft <strong>gum rubber</strong> outsole that grips wood and synthetic indoor courts. Tennis shoes use harder rubber compounds tuned for hard courts or clay — they slide on wood, which is exactly the opposite of what you want when changing direction. Wearing tennis shoes on a wood badminton court also leaves black scuff marks that some clubs prohibit.
        </p>

        <h3 className="text-xl font-semibold text-[var(--text)]">
          2. Heel-to-toe drop
        </h3>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Tennis shoes have a 6-10mm heel drop optimized for forward motion. Badminton shoes are flatter (2-4mm drop) to keep your foot close to the floor for split steps and lunges. The raised tennis-shoe heel sits you further from the floor, increases the lever arm during lateral movements, and makes ankle rolls more likely.
        </p>

        <h3 className="text-xl font-semibold text-[var(--text)]">
          3. Lateral stability
        </h3>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Both badminton and tennis shoes have lateral support — but the structures are tuned for different load patterns. Tennis shoes anticipate the side push when chasing a wide ball at full speed. Badminton shoes anticipate the recovery from a dead-stop split step into a lunge. The two are not interchangeable.
        </p>

        <h3 className="text-xl font-semibold text-[var(--text)]">
          4. Weight and ground feel
        </h3>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Tennis shoes typically weigh 350-450g per shoe with substantial cushioning. Badminton shoes weigh 270-350g with thinner midsoles to maximize ground feel during footwork. The lighter shoe lets you move faster and feel the floor better — both critical at the speeds badminton produces.
        </p>

        <AdSlot id="compare-badminton-tennis-shoes-mid" />

        <h2 className="text-headline text-[var(--text)]">
          What about court shoes generally?
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Squash, racquetball, and table tennis shoes share enough DNA with badminton shoes to be acceptable substitutes — gum rubber outsole, low heel drop, lateral stability. Volleyball and basketball shoes are not — they prioritize vertical impact and traction patterns that do not match badminton&rsquo;s lateral-heavy movement.
        </p>

        <h2 className="text-headline text-[var(--text)]">
          The first-purchase recommendation
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          A $90-120 entry-tier badminton shoe (Yonex Power Cushion 65 series, Victor A170, Li-Ning AYTQ) is meaningfully safer than any tennis shoe at any price point on a badminton court. If you only have running shoes, do not bring them — borrow from a clubmate, ask the venue for rentals, or wait a session and order proper shoes. The injury risk is not theoretical.
        </p>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            See our shoe picks
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Six badminton shoes ranked by fit width, stability, and cushioning — for narrow, medium, and wide feet.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/best/shoes/" className="btn-primary">
              Best badminton shoes
            </Link>
            <Link
              href={catalogHrefFromCompareSlug("badminton-vs-tennis-shoes")}
              className="btn-secondary"
            >
              Browse shoes in catalog
            </Link>
          </div>
        </div>

        <p className="text-sm text-[var(--color-muted)]">
          Related guides:{" "}
          <Link href="/guides/shoes-footwork/" className="text-[var(--color-accent)] underline">
            shoes and footwork
          </Link>{" "}
          ·{" "}
          <Link href="/guides/wide-feet-badminton-shoes/" className="text-[var(--color-accent)] underline">
            badminton shoes for wide feet
          </Link>
          .
        </p>
      </article>
    </CompareConceptChrome>
  );
}
