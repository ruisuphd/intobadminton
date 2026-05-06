import Link from "next/link";
import type { Metadata } from "next";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Badminton equipment guides — IntoBadminton",
  description:
    "Practical badminton equipment guides on string tension, racket balance, shoes and footwork, doubles court roles, season refresh, and badminton shoes for wide feet.",
  alternates: { canonical: "/guides/" },
};

const guides = [
  {
    href: "/guides/string-tension/",
    title: "String tension basics",
    desc: "How tension affects feel and flight — without the mysticism.",
    long:
      "A practical primer on choosing badminton string tension by skill level, climate, and gauge. Covers when 22 lb feels powerful and when 26 lb starts to feel dead, how strings lose tension over weeks even without breaking, and how to read your own contact quality before chasing higher numbers.",
  },
  {
    href: "/guides/shoes-footwork/",
    title: "Shoes and footwork",
    desc: "Cushioning, fit width, and what matters on court.",
    long:
      "Why badminton shoes use gum rubber outsoles and low-profile midsoles, how lateral reinforcement protects your ankles on split steps, and how to test fit width and stability in store before committing.",
  },
  {
    href: "/guides/racket-balance/",
    title: "Racket balance and flex",
    desc: "Head weight, shaft stiffness, and how they show up in play.",
    long:
      "Balance points in millimetres, four shaft-flex tiers with worked examples from Yonex, Victor, and Li-Ning, and how the timing window changes when you move from a 4U head-light frame to a 3U head-heavy frame.",
  },
  {
    href: "/guides/season-refresh/",
    title: "When to refresh gear",
    desc: "Strings, grips, and honest signs it’s time to recheck your setup.",
    long:
      "A full refresh schedule for strings, grips, shoes, shuttles, bag, and racket, plus the triggers that should send you back to the finder for a fresh recommendation pass.",
  },
  {
    href: "/guides/doubles-roles/",
    title: "Doubles court roles (basics)",
    desc: "How front vs back can influence what you optimize for in doubles.",
    long:
      "What front-court, rear-court, and defensive roles actually demand from your gear — including the differences in mixed doubles and how rotation changes what you optimise for in each rally.",
  },
  {
    href: "/guides/wide-feet-badminton-shoes/",
    title: "Badminton shoes for wide feet",
    desc: "How to think about fit, stability, and future shoe recommendations.",
    long:
      "What wide really means in badminton-shoe sizing, the heel-slip mistake most wide-footed players make, model recommendations to test, and how the finder filters for wider lasts.",
  },
] as const;

export function GuidesShell({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = t(locale).guides;
  const localized = (path: string) => buildLocalizedPath(locale, path);

  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-6xl">
        <header className="max-w-3xl">
          <span className="chip">Equipment guides · 6 deep dives</span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            {copy.subtitle}
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
            These badminton equipment guides go deeper than a typical product
            page. Each one is built around a single decision — string tension,
            shaft flex, shoe fit, doubles role, refresh cadence, or width-aware
            sizing — and walks through the trade-offs with examples from real
            Yonex, Victor, and Li-Ning models. Skim the summary, then click
            into a guide for the full breakdown with manufacturer-spec links
            and cited community evidence.
          </p>
        </header>

        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            {
              num: "6",
              label: "in-depth equipment guides",
            },
            {
              num: "1,400+",
              label: "average words per guide",
            },
            {
              num: "100%",
              label: "original analysis, no copied review text",
            },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <p className="text-3xl font-semibold tracking-tight text-[var(--color-accent)]">
                {s.num}
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{s.label}</p>
            </div>
          ))}
        </section>

        <div className="mt-8 card p-5 text-sm leading-relaxed text-[var(--color-muted)]">
          Guides prioritise original analysis and official spec links.
          Third-party community sources from BadmintonCN, Reddit, and
          BadmintonCentral are used only as theme summaries and outbound
          references, never copied review text. Confidence labels show what
          we have personally tested versus what is interpreted from
          manufacturer data.
        </div>

        <ul className="mt-10 space-y-4">
          {guides.map((g) => (
            <li key={g.href}>
              <Link
                href={localized(g.href)}
                className="block card card-interactive p-6"
              >
                <h2 className="text-lg font-semibold text-[var(--text)]">
                  {g.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">
                  {g.desc}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {g.long}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[var(--color-accent)]">
                  Read the guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-16 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--color-muted)]">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Who these badminton guides are for
          </h2>
          <p>
            The guides are written for club-level and competitive amateur
            players who want to make smarter equipment decisions without
            wading through marketing copy or unverified forum claims. If you
            already know your role and your stroke, the guides give you a
            cleaner mental model of how spec choices actually feel on court.
            If you are still figuring out where you fit, start with the{" "}
            <Link
              href={localized("/quiz/")}
              className="text-[var(--color-accent)] underline"
            >
              equipment finder
            </Link>{" "}
            and let it surface the most relevant guide for your profile.
          </p>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            How guides are updated
          </h2>
          <p>
            We revisit each guide at least once per badminton season as new
            racket lines, shoe revisions, and string variants land. Updates
            are dated, and the most-changed guides surface first on the
            home page&apos;s &quot;Latest deep-dives&quot; strip.
          </p>
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Want a guide we have not written?
          </h2>
          <p>
            Suggest a topic via the{" "}
            <Link
              href={localized("/contact/")}
              className="text-[var(--color-accent)] underline"
            >
              Contact Us
            </Link>{" "}
            page. The most-requested gear questions move to the top of the
            roadmap.
          </p>
        </section>
      </div>
    </main>
  );
}

export default function GuidesIndex() {
  return <GuidesShell locale="en" />;
}
