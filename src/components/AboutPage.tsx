import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

type Copy = {
  hero: string;
  dek: string;
  founderHeading: string;
  founderBody: string[];
  editorialHeading: string;
  editorialBody: string[];
  editorialPrinciples: { title: string; body: string }[];
  monetizationHeading: string;
  monetizationBody: string[];
  contactHeading: string;
  contactBody: string;
  cta: string;
  ctaLink: string;
};

const copyEn: Copy = {
  hero: "About IntoBadminton",
  dek: "An equipment recommender written by a competitive player who got tired of guessing which racket would actually fit.",
  founderHeading: "Who's behind this",
  founderBody: [
    "I'm Rui Su. I started badminton as a kid in China, then continued through the Maynooth University team and across multiple Dublin clubs after I moved to Ireland. I've trained under a former Malaysian national-team player and a former Chinese provincial-team player, and currently compete in Division 4 of the Irish Badminton league.",
    "Outside the courts I run Intonation Labs (Singapore), where my day job is building production machine-learning systems. IntoBadminton is the equipment-recommender I always wanted as a player: structured data, transparent reasons, and citations to the people who actually tested the gear.",
  ],
  editorialHeading: "How recommendations are made",
  editorialBody: [
    "Every score the finder produces breaks down into five named factors: style fit, discipline fit, level fit, budget fit, and body / comfort fit. You can read the exact weighting on the methodology page.",
    "We treat source authority explicitly. A product-specific official page is the strongest source for specs. Editor interpretation translates those specs into possible on-court feel. Community evidence — BadmintonCentral threads, Reddit, BadmintonCN, YouTube reviews — appears as cited metadata summaries with links, never as copied text.",
  ],
  editorialPrinciples: [
    {
      title: "We do not scrape.",
      body: "Third-party reviews are linked and paraphrased with attribution. Copying review text — even with translation — is a copyright issue and an AdSense policy violation, and it is also how recommender sites become noise.",
    },
    {
      title: "Confidence is visible.",
      body: "Every product card shows whether the source is an official product page, a third-party page, or a row that still needs review. Low-confidence items can still appear, but they are labelled.",
    },
    {
      title: "Editorial separation from monetization.",
      body: "Display ads and any future affiliate links must be labelled and cannot silently override the fit score. The score is the score; sponsorship is sponsorship.",
    },
  ],
  monetizationHeading: "How this site is funded",
  monetizationBody: [
    "IntoBadminton runs Google AdSense ads after you grant consent. Ads are off by default and only load when you allow non-essential cookies. We may add affiliate retailer links in the future; those will be clearly labelled and will not change the recommendation order.",
    "If you want to support the project without ads, the best thing you can do is share the finder with a teammate, send corrections to product data, or contribute a review with explicit usage rights.",
  ],
  contactHeading: "Contact",
  contactBody: `Email ${companyInfo.contactEmail} for product data corrections, rights or copyright concerns, privacy questions, or recommendation issues. Include the product brand, model, region, and source link when you can — it speeds up the fix.`,
  cta: "Try the finder",
  ctaLink: "/quiz/",
};

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = copyEn;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${companyInfo.siteUrl}/about/#person-rui-su`,
    name: companyInfo.founderName,
    url: companyInfo.founderWebsite,
    jobTitle: "Founder",
    description: companyInfo.founderDescription,
    knowsAbout: [
      "Badminton equipment",
      "Badminton rackets",
      "Badminton strings and stringing tension",
      "Badminton shoes and footwork",
      "Yonex Astrox, Nanoflare, Arcsaber",
      "Victor Auraspeed, Thruster, Brave Sword, DriveX",
      "Li-Ning AxForce, BladeX, Halbertec",
      "Machine learning systems",
    ],
    award: "Division 4, Irish Badminton League",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Maynooth University",
    },
    worksFor: {
      "@type": "Organization",
      name: companyInfo.operatorLegalName,
      url: companyInfo.operatorWebsite,
    },
  };

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${companyInfo.siteUrl}/about/#about`,
    name: c.hero,
    inLanguage: "en",
    mainEntity: { "@id": `${companyInfo.siteUrl}/about/#person-rui-su` },
    primaryImageOfPage: undefined,
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={personJsonLd} />
      <JsonLd data={aboutJsonLd} />
      <article className="layout-band max-w-3xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)]">
            {c.hero}
          </h1>
          <p className="text-lg text-[var(--color-muted)]">{c.dek}</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.founderHeading}
          </h2>
          {c.founderBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.editorialHeading}
          </h2>
          {c.editorialBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
          <ul className="space-y-3">
            {c.editorialPrinciples.map((p) => (
              <li
                key={p.title}
                className="card p-6"
              >
                <p className="font-semibold text-[var(--text)]">{p.title}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.monetizationHeading}
          </h2>
          {c.monetizationBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.contactHeading}
          </h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            {c.contactBody}
          </p>
        </section>

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Ready to find your fit?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Run the five-minute finder or browse the full equipment catalog with
            filters for brand, weight, balance, and price.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={buildLocalizedPath(locale, c.ctaLink)}
              className="btn-primary"
            >
              {c.cta}
            </Link>
            <Link
              href={buildLocalizedPath(locale, "/catalog/")}
              className="btn-secondary"
            >
              Browse full catalog
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
