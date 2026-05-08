import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title:
    "Badminton Equipment FAQ — Rackets, Strings, Shoes & Tension | IntoBadminton",
  description:
    "Honest answers from a competitive player. Choosing a badminton racket by level, weight class (3U/4U/5U), shaft flex, and balance; string tension; shoe-vs-running-shoe; restringing schedules; brand differences. No marketing language.",
  keywords: [
    "badminton FAQ",
    "how to choose badminton racket",
    "badminton string tension",
    "3U vs 4U badminton",
    "badminton shoes vs running shoes",
    "how often to restring badminton",
  ],
  alternates: { canonical: "/faq/" },
};

const FAQS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Choosing a racket",
    items: [
      {
        q: "How do I choose the right badminton racket?",
        a: "Match three things: skill level, playing role, and timing. Beginners and most club players do better with medium-flex 4U or 5U rackets that have even or slightly head-light balance. Smash-heavy singles and rear-court doubles players benefit from head-heavy frames once their technique is stable. The IntoBadminton finder asks for level, discipline, style, body, and budget, then ranks rackets transparently.",
      },
      {
        q: "Is a more expensive racket always better?",
        a: "No, especially not for beginners. Flagship rackets are tuned around extreme stiffness and unforgiving sweet spots. A beginner with a $90 Nanoray Light 70i will usually outperform the same beginner with a $300 Astrox 100ZZ — and avoid tennis elbow.",
      },
      {
        q: "Yonex, Victor, or Li-Ning — which brand is best?",
        a: "There is no single best badminton brand. Yonex has the deepest catalogue and the strongest North American distribution. Victor leads on speed-oriented frames and dominates Korean tour play. Li-Ning AxForce, BladeX, and Halbertec models lead on smash-power per dollar. Pick by which model fits your role, not by brand loyalty.",
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
        a: "Most club players are over-strung and under-restrung. Try Yonex BG65 or Li-Ning No.1 at 22-24 lb if you want durability and forgiveness. Move to BG80, BG80 Power, or Li-Ning No.5 for crisper feel. Aerobite-style hybrids reward players with cleaner contact.",
      },
      {
        q: "What tension should I string my badminton racket at?",
        a: "If your racket is 4U/5U and you are a club player: 22-24 lb is the safe range. 4U intermediate doubles: 24-26 lb. Pro-level singles attackers: 27-29 lb. Anything above 30 lb on amateur swing speed reduces real-game power because the sweet spot becomes too narrow.",
      },
      {
        q: "How often should I restring my racket?",
        a: "Restring at the earlier of: every 30-50 sessions of regular play, every 3-4 months even if the string has not broken, or immediately if you can press through the bed-plane more than 1 cm with your finger. Tension drops well before the string visibly fails.",
      },
    ],
  },
  {
    category: "Shoes and footwork",
    items: [
      {
        q: "Are badminton shoes really different from running shoes?",
        a: "Yes — and the difference matters more than the racket for most amateurs. Badminton shoes use gum rubber outsoles for grip on wood courts, low-profile midsoles to keep your foot close to the floor, and lateral reinforcement for split steps and side lunges. Running shoes have raised heels and softer foams that promote forward roll, which is the opposite of what badminton footwork needs.",
      },
      {
        q: "Can I use my running shoes for badminton at first?",
        a: "Strongly discouraged once you play more than once a week. Running shoes have raised heels that promote ankle rolling on lateral movement — it is the most common preventable ankle injury at club level. A $90 entry-tier badminton shoe is dramatically safer than a $200 running shoe on a wood court.",
      },
      {
        q: "How often should I replace my badminton shoes?",
        a: "Most club players need new shoes every 9-15 months even if the upper looks fine. The midsole compresses and the outsole gum rubber loses grip long before visible wear. Track replacement by date, not by appearance.",
      },
    ],
  },
  {
    category: "About IntoBadminton",
    items: [
      {
        q: "How does the IntoBadminton finder score recommendations?",
        a: "Every result breaks down into five named factors: style fit, discipline fit, level fit, budget fit, and body / comfort fit. Manufacturer specs are the strongest signal, editor interpretation translates specs into on-court feel, and community evidence (BadmintonCN, Reddit, BadmintonCentral, video reviewers) appears as cited metadata summaries with links — never copied text.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
