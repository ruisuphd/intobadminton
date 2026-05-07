import Link from "next/link";
import type { Metadata } from "next";
import {
  authenticityBrands,
  authenticityGuide,
} from "@/lib/authenticity";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title:
    "Badminton Racket Authenticity Check — Spot Fake Yonex, Victor & Li-Ning | IntoBadminton",
  description:
    "How to check whether a Yonex, Victor, or Li-Ning badminton racket is genuine before you buy. Per-brand official-source guidance, universal red flags, visual checks, and what to do if you suspect a counterfeit.",
  keywords: [
    "badminton racket authenticity",
    "fake Yonex racket",
    "fake Victor racket",
    "fake Li-Ning racket",
    "Yonex authenticity check",
    "Victor verify racket",
    "Li-Ning anti-counterfeit code",
    "spot counterfeit badminton racket",
    "real or fake Yonex Astrox",
  ],
  alternates: { canonical: "/guides/equipment-authenticity/" },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "How common are counterfeit badminton rackets?",
    a: "Common enough to be worth checking, especially for top-tier Yonex, Victor, and Li-Ning frames sold through unauthorised online channels. Astrox 88D Pro, 100ZZ, and Nanoflare 1000Z are among the most-impersonated models. Buying from an authorised retailer with a verifiable receipt is the simplest way to lower the risk.",
  },
  {
    q: "What is the easiest single check to do before buying?",
    a: "Price and seller. If a current-generation flagship is priced 30–50% below MSRP from a seller you do not recognise, treat it as suspect. Genuine pro-tier rackets rarely discount below 15–20% from authorised retailers, and even less for current-year models.",
  },
  {
    q: "Are counterfeit rackets dangerous?",
    a: "They can be. Counterfeit frames are made with non-spec carbon and resin, fail at high tension, and sometimes crack on the first or second hard smash. The shrapnel from a frame failure during a smash motion can injure the player or the partner. Beyond safety, the playing characteristics are unreliable, the warranty does not apply, and resale value is zero.",
  },
  {
    q: "I bought a racket second-hand and I am not sure if it is genuine. What now?",
    a: "Run the per-brand checks below and compare against the official source for each brand. If the result is unclear or inconsistent — code does not return, hologram looks off, paint does not match, weight is far from spec — contact the brand's customer service or an authorised distributor with photos before stringing or playing at high tension.",
  },
  {
    q: "Does IntoBadminton certify rackets as authentic?",
    a: "No. We do not authenticate products, certify sellers, or guarantee that any serial number, code, sticker, or packaging detail proves a product is genuine. This page is a risk-screening guide based on official brand sources. The final word always belongs to the brand, an authorised distributor, or the brand's customer support.",
  },
];

export default function EquipmentAuthenticityGuide() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${companyInfo.siteUrl}/guides/equipment-authenticity/#article`,
    headline:
      "Badminton Racket Authenticity Check — How to Spot Fake Yonex, Victor & Li-Ning",
    description:
      "Per-brand official-source guidance for checking Yonex, Victor, and Li-Ning badminton equipment authenticity, with universal red flags and what to do next.",
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: companyInfo.founderName,
      url: companyInfo.founderWebsite,
      description: companyInfo.founderDescription,
    },
    publisher: {
      "@type": "Organization",
      name: companyInfo.siteName,
      url: companyInfo.siteUrl,
    },
    datePublished: "2026-05-07",
    dateModified: "2026-05-07",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${companyInfo.siteUrl}/guides/equipment-authenticity/`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${companyInfo.siteUrl}/guides/equipment-authenticity/#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${companyInfo.siteUrl}/guides/` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Equipment Authenticity Check",
        item: `${companyInfo.siteUrl}/guides/equipment-authenticity/`,
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="layout-band max-w-3xl space-y-6 text-[var(--text)]">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides/" className="hover:text-[var(--text)]">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Authenticity check</span>
        </nav>

        <header className="space-y-3">
          <span className="chip">Buyer protection</span>
          <h1 className="text-3xl font-semibold tracking-tight">
            {authenticityGuide.title}
          </h1>
          <p className="text-[var(--color-muted)] leading-relaxed">
            {authenticityGuide.dek}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            By {companyInfo.authorBylineEn}.
          </p>
        </header>

        <section className="rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--surface-muted)] p-5">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            What this page can and cannot do
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {authenticityGuide.disclaimer}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {authenticityGuide.buyerRule}
          </p>
        </section>

        <h2 className="pt-2 text-xl font-semibold">Universal red flags</h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          These apply across every brand. If two or more apply to a racket
          you are looking at, treat it as suspect until you can verify it
          through the brand's official channels below.
        </p>
        <ul className="space-y-2 text-[var(--color-muted)]">
          <li>
            <strong className="text-[var(--text)]">Price too low.</strong>{" "}
            Current-generation flagships rarely discount below 15–20% off
            MSRP at authorised retailers. A "new" Astrox 88D Pro at half off
            from an unfamiliar marketplace seller does not add up
            distribution-wise.
          </li>
          <li>
            <strong className="text-[var(--text)]">No clear retailer
            chain.</strong>{" "}
            Marketplaces (eBay, Carousell, Taobao, AliExpress, random
            Instagram sellers) carry genuine and fake stock side by side.
            Authorised brand retailers are listed on the manufacturer's own
            site — if your seller is not on that list, do extra checks.
          </li>
          <li>
            <strong className="text-[var(--text)]">Packaging
            inconsistencies.</strong>{" "}
            Genuine flagships ship with a branded sleeve, warranty card, and
            a full plastic head cover with the model name printed correctly.
            Fakes often skip the warranty card or use a generic head cover.
          </li>
          <li>
            <strong className="text-[var(--text)]">Off-spec weight or
            balance.</strong>{" "}
            If the racket weighs several grams away from the spec stamp on
            the cone, or the balance point is meaningfully different from
            the published value, it is either a counterfeit or has been
            re-balanced.
          </li>
          <li>
            <strong className="text-[var(--text)]">Wrong sound on tap
            test.</strong>{" "}
            Tap a strung genuine flagship lightly with a knuckle near the
            12 o'clock position. The sound is bright and resonant.
            Counterfeits usually sound dull because the carbon-resin ratio
            is off.
          </li>
          <li>
            <strong className="text-[var(--text)]">Font and printing
            quality.</strong>{" "}
            Brand logos on counterfeits often use slightly wrong typefaces
            or kerning, paint runs visible at edges, or lettering that looks
            sharp at a glance but blurs on close inspection. Compare to a
            verified product photo from the brand's own site.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold">
          Per-brand official-source guidance
        </h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The cards below quote each brand's own published guidance,
          including the source title, URL, and the date we last checked it.
          Use the official source as the final word; the steps and
          limitations are our reading of how to apply it as a buyer.
        </p>

        <div className="space-y-5">
          {authenticityBrands.map((brand) => (
            <article
              key={brand.name}
              className="rounded-2xl border border-[color:var(--line)] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
                    {brand.checkLabel}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)]">
                    {brand.name}
                  </h3>
                </div>
                <a
                  href={brand.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  className="text-sm font-medium text-[var(--color-accent)] underline"
                >
                  Official source →
                </a>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[var(--color-muted)]">
                Source: {brand.officialSourceName},{" "}
                <cite>{brand.officialSourceTitle}</cite>, accessed{" "}
                {brand.accessedAt}. Official wording: &ldquo;
                {brand.officialQuote}&rdquo;.
              </p>

              <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {brand.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <p className="mt-5 rounded-xl bg-[color:var(--surface-muted)] p-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {brand.limitation}
              </p>
            </article>
          ))}
        </div>

        <h2 className="pt-2 text-xl font-semibold">Practical buyer checklist</h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          Before buying, ask the seller for clear photos of the shaft, cone,
          QR or anti-counterfeit label, receipt, store name, and original
          packaging. Compare the seller's claimed region with the code or
          warranty details where the brand publishes that guidance.
        </p>
        <p className="text-[var(--color-muted)] leading-relaxed">
          After buying, keep all the evidence until you have played and
          inspected the product. If the code result, shaft number, hologram,
          packaging, weight, or feel looks inconsistent, stop any resale
          plans and contact the seller, local distributor, or brand support
          directly with photos.
        </p>

        <h2 className="pt-2 text-xl font-semibold">If you bought a counterfeit</h2>
        <ul className="space-y-2 text-[var(--color-muted)]">
          <li>
            <strong className="text-[var(--text)]">Do not play with it at
            tournament tension.</strong>{" "}
            Counterfeit frames fail unpredictably. If you must use it for
            anything at all, string it at the bottom of the genuine model's
            recommended range, and never above 22 lb.
          </li>
          <li>
            <strong className="text-[var(--text)]">File a chargeback or
            dispute.</strong>{" "}
            If you bought through a marketplace using a credit card or
            PayPal, you typically have a 30–180 day dispute window. Document
            the indicators (photos comparing to genuine, hologram issues,
            failed verification screen) and open a dispute.
          </li>
          <li>
            <strong className="text-[var(--text)]">Report to the
            brand.</strong>{" "}
            Yonex, Victor, and Li-Ning all accept counterfeit reports
            through their regional customer service. They use these reports
            to track counterfeit operations and pursue legal action.
          </li>
          <li>
            <strong className="text-[var(--text)]">Do not resell.</strong>{" "}
            Even if you bought it in good faith, reselling a known
            counterfeit perpetuates the problem and exposes you to legal
            liability in some jurisdictions.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold">Where to buy authentic</h2>
        <p className="text-[var(--color-muted)] leading-relaxed">
          The reliable rule: buy from a retailer the manufacturer publishes
          on their own website as authorised. Across our region (Singapore,
          Malaysia, South Asia), this typically includes the brand's own
          retail network plus a small number of authorised importers. In
          Europe, BadmintonPlanet, Li-Ning Family, and a handful of
          national distributors are authorised. In North America, the
          brand's own US sites plus a few national chains are reliable.
          When in doubt, email the brand's regional customer service and
          ask whether the retailer you are considering is authorised — they
          will confirm or deny within a day or two.
        </p>

        <h2 className="pt-2 text-xl font-semibold">Frequently asked</h2>
        <div className="divide-y divide-[color:var(--line)]">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none text-base font-semibold text-[var(--text)]">
                <span className="inline-flex w-full items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[var(--color-accent)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <p className="text-[var(--color-muted)] leading-relaxed">
          Related reading:{" "}
          <Link href="/brands/yonex/" className="text-[var(--color-accent)] underline">
            Yonex line guide
          </Link>
          ,{" "}
          <Link href="/brands/victor/" className="text-[var(--color-accent)] underline">
            Victor line guide
          </Link>
          ,{" "}
          <Link href="/brands/li-ning/" className="text-[var(--color-accent)] underline">
            Li-Ning line guide
          </Link>
          , and{" "}
          <Link href="/best/beginner-rackets/" className="text-[var(--color-accent)] underline">
            best beginner rackets
          </Link>
          .
        </p>

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Find a racket that fits, then verify it&rsquo;s real
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Run our finder to land on the right model for your game, then
            use this guide to make sure the unit you buy is authentic.
          </p>
          <Link href="/quiz/" className="btn-primary mt-5">
            Start the finder
          </Link>
        </section>
      </article>
    </main>
  );
}
