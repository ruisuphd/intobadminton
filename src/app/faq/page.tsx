import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { defaultOgImages } from "@/lib/og";

export const metadata: Metadata = {
  title: "Badminton Equipment FAQ — Plain-English Answers",
  description:
    "Practical badminton FAQ — racket fit, 3U/4U/5U weight, shaft flex, balance, string tension, shoe fit width, restringing cadence — answered in plain English.",
  alternates: { canonical: "/faq/" },
  openGraph: {
    title: "Badminton Equipment FAQ — Plain-English Answers",
    description:
      "Plain-English answers to the questions players actually ask about rackets, strings, shoes, and tension.",
    url: "/faq/",
    type: "article",
    siteName: "IntoBadminton",
    images: [...defaultOgImages],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Equipment FAQ — Plain Answers",
    description:
      "Racket level fit, 3U vs 4U, shaft flex, string tension, shoe fit width — all answered.",
  },
};

const FAQS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Choosing a racket",
    items: [
      {
        q: "How do I choose the right badminton racket?",
        a: "Start with skill level, playing role, timing, and comfort. A racket that fits your contact quality is more useful than a flagship frame you cannot load consistently. The IntoBadminton finder asks for level, discipline, style, body, and budget, then ranks rackets transparently.",
      },
      {
        q: "Is a more expensive racket always better?",
        a: "No. Price does not prove fit. Some flagship rackets are stiff and demanding, while some lower-priced rackets are easier to time. Check the exact model, source status, weight class, shaft flex, and return policy before buying.",
      },
      {
        q: "Yonex, Victor, or Li-Ning — which brand is best?",
        a: "There is no single best badminton brand for every player. Compare the exact model, weight and grip variant, shaft flex, balance, warranty channel, and local availability. Pick by model fit, not by brand loyalty.",
      },
      {
        q: "What weight class — 3U, 4U, or 5U — should I buy?",
        a: "5U (around 75-79g) is the easiest to time and the lightest on the shoulder. 4U (around 80-84g) is the most common adult size and gives slightly more punch on smashes. 3U (~85-89g) is overkill for most amateurs — only choose 3U if you specifically want a head-heavy attack feel and you have a conditioned shoulder.",
      },
    ],
  },
  {
    category: "Strings and tension",
    items: [
      {
        q: "What badminton string should a club player use?",
        a: "Match string gauge and tension to contact quality, durability needs, and arm comfort. Treat any tension suggestion as a starting point, then ask a qualified stringer to account for your racket frame, string, shuttle speed, and injury history.",
      },
      {
        q: "What tension should I string my badminton racket at?",
        a: "Use the racket maker's listed stringing advice as the hard boundary, then choose a tension based on contact quality, string type, shuttle speed, and arm comfort. Higher tension can reduce the effective sweet spot, so it should be earned gradually.",
      },
      {
        q: "How often should I restring my racket?",
        a: "Restring when playability drops, when strings fray, after a break, or when your stringer recommends it for your usage pattern. Tension loss happens before visible failure, but the right interval depends on hours played, string gauge, and hitting style.",
      },
    ],
  },
  {
    category: "Shoes and footwork",
    items: [
      {
        q: "Are badminton shoes really different from running shoes?",
        a: "Badminton footwork includes split steps, lunges, braking, and side-to-side movement. Choose court shoes designed for lateral stability and indoor grip, and try them with badminton socks before relying on them in match play.",
      },
      {
        q: "Can I use my running shoes for badminton at first?",
        a: "Use court shoes as soon as possible. Running shoes are designed primarily for forward motion, while badminton requires lateral braking and lunging. If you are uncertain, ask a coach or shoe fitter before playing hard sessions.",
      },
      {
        q: "How often should I replace my badminton shoes?",
        a: "Replace shoes when grip, cushioning, stability, or fit is no longer reliable. The interval depends on court surface, player weight, training hours, and shoe construction.",
      },
    ],
  },
  {
    category: "About IntoBadminton",
    items: [
      {
        q: "How does the IntoBadminton finder score recommendations?",
        a: "Every result breaks down into five named factors: style fit, discipline fit, level fit, budget fit, and body / comfort fit. Source labels distinguish official product pages from third-party or still-unverified references.",
      },
      {
        q: "Do I need to pay or create an account to use IntoBadminton?",
        a: "No. There is no paywall, no subscription, no required signup, and no email gate to use the finder, comparisons, blog, or guides. The site is supported by display ads (clearly labelled and only after you opt in via the cookie banner) and may add affiliate retailer links in the future. Recommendations are editorially independent — ads and any future affiliate links never change the fit-score order.",
      },
      {
        q: "Are the recommendations sponsored?",
        a: "No. Display ads are clearly labelled and never change the fit-score order. The site may add affiliate retailer links in the future; those will be clearly labelled and will not change recommendation order. Editorial separation from monetization is part of how the site operates.",
      },
      {
        q: "Who runs IntoBadminton?",
        a: `IntoBadminton is operated by ${companyInfo.operatorLegalName}, a Singapore-registered company. The founder, ${companyInfo.founderName}, is a competitive player (Division 4 Ireland) who has trained under former Malaysian national-team and Chinese provincial-team players. Read the About page for the full story.`,
      },
    ],
  },
];

export default function FaqPage() {
  const flat = FAQS.flatMap((s) => s.items);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${companyInfo.siteUrl}/faq/#faq`,
    mainEntity: flat.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${companyInfo.siteUrl}/faq/` },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="layout-band max-w-3xl">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">FAQ</span>
        </nav>

        <header className="mt-6 space-y-3">
          <h1 className="text-display text-[var(--text)]">
            Badminton equipment FAQ
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Honest answers from a competitive player. For deeper context, jump into the finder or read a deep-dive blog post.
          </p>
        </header>

        {FAQS.map((section) => (
          <section key={section.category} className="mt-12">
            <h2 className="text-headline text-[var(--text)]">
              {section.category}
            </h2>
            <div className="mt-5 divide-y divide-[color:var(--line)] border-t border-[color:var(--line)]">
              {section.items.map((f) => (
                <details key={f.q} className="group py-5">
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
          </section>
        ))}

        <section className="mt-16 rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Question not answered here?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Email{" "}
            <a
              href={`mailto:${companyInfo.contactEmail}`}
              className="text-[var(--color-accent)] underline"
            >
              {companyInfo.contactEmail}
            </a>{" "}
            — or run the finder to get a personalised recommendation in 60 seconds.
          </p>
          <Link href="/quiz/" className="btn-primary mt-5">
            Start the finder
          </Link>
        </section>
      </article>
    </main>
  );
}
