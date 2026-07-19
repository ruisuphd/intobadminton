import Link from "next/link";
import { companyInfo } from "@/lib/company";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";

type SourceEntry = {
  name: string;
  url: string;
  region: string;
  use: string;
};

const officialSources: SourceEntry[] = [
  { name: "Yonex official", url: "https://www.yonex.com/badminton/", region: "Global", use: "Product-page specs, weight variants, grip sizes, and stringing advice" },
  { name: "Victor Sport", url: "https://www.victorsport.com/", region: "Global", use: "Product-page specs, material listings, and string tension limits" },
  { name: "Li-Ning official", url: "https://lining.com/", region: "Global", use: "Brand and authorised-channel checks; model specs remain unverified unless product-page evidence is attached" },
  { name: "Kawasaki", url: "https://kawasaki-sport.com/", region: "Asia", use: "Brand and product-line checks where an official page is available" },
  { name: "Mizuno badminton", url: "https://www.mizuno.com/", region: "Global", use: "Brand and product-line checks where an official page is available" },
];

const communitySources: SourceEntry[] = [
  { name: "BadmintonCentral forum", url: "https://www.badmintoncentral.com/forums/", region: "Global EN", use: "Long-term review threads, restring feedback, regional availability" },
  { name: "Reddit r/badminton", url: "https://www.reddit.com/r/badminton/", region: "Global EN", use: "Recent first-impression posts, community sentiment, beginner questions" },
  { name: "BadmintonCN (中羽在线)", url: "https://badmintoncn.com/", region: "China ZH", use: "Chinese-language reviews, racket-by-racket discussions, 中羽 ladder context" },
  { name: "Tieba 羽毛球吧", url: "https://tieba.baidu.com/", region: "China ZH", use: "Player-to-player discussions, equipment trades, regional preferences" },
  { name: "Badminton Bites (Reddit-adjacent)", url: "https://www.badmintonbites.com/", region: "EN reviews", use: "Long-form written reviews and comparisons" },
];

const videoSources: SourceEntry[] = [
  { name: "Badminton Insight", url: "https://www.youtube.com/@BadmintonInsight", region: "Global EN", use: "Detailed racket and shoe reviews with on-court testing" },
  { name: "Coaching Badminton", url: "https://www.youtube.com/@coachingbadminton", region: "Global EN", use: "Technique context that affects gear choice" },
  { name: "Badminton Famly", url: "https://www.youtube.com/@badmintonfamly", region: "Global EN", use: "Pro-level analysis, BWF event context" },
  { name: "Spinrider", url: "https://www.youtube.com/@spinrider", region: "Asia EN/ZH", use: "Racket testing in serious club play" },
];

const eventSources: SourceEntry[] = [
  { name: "BWF World Tour", url: "https://bwfworldtour.bwfbadminton.com/", region: "Global", use: "Event calendar, player results, equipment used in pro play" },
  { name: "Badminton World Federation", url: "https://corporate.bwfbadminton.com/", region: "Global", use: "Equipment regulations, shuttle and racket standards" },
];

type Copy = {
  hero: string;
  dek: string;
  philosophyHeading: string;
  philosophyBody: string[];
  triangulationHeading: string;
  triangulationBody: string;
  triangulationSteps: { title: string; body: string }[];
  rightsHeading: string;
  rightsBody: string[];
  sectionHeadings: {
    official: string;
    community: string;
    video: string;
    event: string;
  };
  columns: { source: string; region: string; use: string };
  reportHeading: string;
  reportBody: string;
  cta: string;
  ctaLink: string;
};

const copyEn: Copy = {
  hero: "Sources & editorial process",
  dek: "Where I get the data, how I label source authority, and how to report a correction.",
  philosophyHeading: "What I believe",
  philosophyBody: [
    "Equipment recommendations are only as good as the evidence behind them. A single review describes one body, one technique, one string tension, and one shuttle speed. A recommender should separate official product-page facts from player interpretation.",
    "That means my job is reading widely, not republishing. Below are the sources I read most, and the rules I follow when citing them.",
  ],
  triangulationHeading: "How I triangulate",
  triangulationBody:
    "For each product, I record the strongest source currently attached to that row and downgrade confidence when the source is not an official product page.",
  triangulationSteps: [
    {
      title: "1. Manufacturer official spec",
      body: "Weight variant, shaft flex, stringing advice, grip size, and material fields are treated as product-page facts only when a product-specific official page is linked.",
    },
    {
      title: "2. Independent video and written reviews",
      body: "BadmintonCentral, BadmintonCN, Reddit, and YouTube reviewers can inform editor notes and market signals. They do not replace manufacturer specs.",
    },
    {
      title: "3. Player-side context",
      body: "Where first-hand testing is available, it appears as an editor signal alongside source status, not as an official product fact.",
    },
  ],
  rightsHeading: "Rights, attribution, and copyright",
  rightsBody: [
    "My blog articles, product notes, and recommendation evidence may draw on independent reviewers, manufacturer official product pages, and on-court testing. Where community sources inform a finding, I paraphrase the substance, write in my own voice, and link out.",
    "Community and retailer sources are useful for discovery, but the app now labels them separately from official product-page evidence.",
    "If you are an author, forum user, or platform and want any citation, paraphrase, or link on this site removed or amended, email " +
      companyInfo.contactEmail +
      " with the page URL and the change requested. I respond within five business days. I will not contest a takedown request from a verifiable original author.",
  ],
  sectionHeadings: {
    official: "Manufacturer official sources",
    community: "Community / forum sources",
    video: "Video reviewers",
    event: "Events and governing body",
  },
  columns: { source: "Source", region: "Region", use: "What I use it for" },
  reportHeading: "Spot a bad citation?",
  reportBody:
    "Tell me. Include the page URL, the source link, and what's wrong (broken, mis-attributed, or out of date).",
  cta: "Send a correction",
  ctaLink: "/contact/",
};

function SourceTable({
  title,
  rows,
  columns,
}: {
  title: string;
  rows: SourceEntry[];
  columns: { source: string; region: string; use: string };
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[color:var(--line)] bg-[color:var(--surface-muted)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <th className="px-4 py-3">{columns.source}</th>
              <th className="px-4 py-3">{columns.region}</th>
              <th className="px-4 py-3">{columns.use}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.url}
                className="border-b border-[color:var(--line)] last:border-b-0"
              >
                <td className="px-4 py-3">
                  <a
                    href={row.url}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    {row.name}
                  </a>
                </td>
                <td className="px-4 py-3 text-[var(--color-muted)]">
                  {row.region}
                </td>
                <td className="px-4 py-3 text-[var(--color-muted)]">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SourcesPage({ locale }: { locale: SiteLocale }) {
  const c = copyEn;

  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-10">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)]">
            {c.hero}
          </h1>
          <p className="text-lg text-[var(--color-muted)]">{c.dek}</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.philosophyHeading}
          </h2>
          {c.philosophyBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.triangulationHeading}
          </h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            {c.triangulationBody}
          </p>
          <ul className="space-y-3">
            {c.triangulationSteps.map((s) => (
              <li
                key={s.title}
                className="card p-6"
              >
                <p className="font-semibold text-[var(--text)]">{s.title}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            {c.rightsHeading}
          </h2>
          {c.rightsBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted)]">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="space-y-8">
          <SourceTable
            title={c.sectionHeadings.official}
            rows={officialSources}
            columns={c.columns}
          />
          <SourceTable
            title={c.sectionHeadings.community}
            rows={communitySources}
            columns={c.columns}
          />
          <SourceTable
            title={c.sectionHeadings.video}
            rows={videoSources}
            columns={c.columns}
          />
          <SourceTable
            title={c.sectionHeadings.event}
            rows={eventSources}
            columns={c.columns}
          />
        </section>

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            {c.reportHeading}
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">{c.reportBody}</p>
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
