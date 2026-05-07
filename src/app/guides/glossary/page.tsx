import Link from "next/link";
import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title:
    "Badminton Equipment Glossary — 40+ Terms Explained | IntoBadminton",
  description:
    "A plain-English glossary of badminton equipment terms — 3U/4U/5U weight class, shaft flex, balance point, head-heavy vs head-light, sweet spot, repulsion, control, gauge, torsional plate, gum rubber, T-throat, and more. Defined by a competitive player.",
  keywords: [
    "badminton glossary",
    "badminton terms explained",
    "what is 4U badminton",
    "what does head-heavy mean",
    "shaft flex badminton",
    "badminton balance point",
    "string gauge badminton",
    "torsional stability badminton shoe",
    "T-throat badminton",
    "BG65 BG80 explained",
  ],
  alternates: { canonical: "/guides/glossary/" },
};

type Term = {
  id: string;
  term: string;
  category: string;
  definition: string;
  example?: string;
  relatedHref?: { label: string; href: string };
};

const TERMS: Term[] = [
  // Racket — weight & balance
  {
    id: "weight-class",
    term: "Weight class (U)",
    category: "Racket",
    definition:
      "How heavy the racket is, on Yonex's lettered scale. 3U is roughly 85–89g, 4U is 80–84g, 5U is 75–79g, 6U is 70–74g. The U number goes up as the racket gets lighter — easy to confuse the first time. Most adult players land in 4U; players who want maximum smash mass with conditioned shoulders move to 3U; smaller players or anyone with shoulder caution move to 5U.",
    example: "A Yonex Astrox 88S Pro 4U weighs about 84g unstrung.",
    relatedHref: { label: "Best beginner rackets", href: "/best/beginner-rackets/" },
  },
  {
    id: "balance-point",
    term: "Balance point",
    category: "Racket",
    definition:
      "Where the racket balances on a finger, measured in millimetres from the butt cap. Below ~290mm is head-light, around 295mm is even, above 300mm is head-heavy. A few millimetres changes the swing feel a lot.",
    relatedHref: {
      label: "Racket balance guide",
      href: "/guides/racket-balance/",
    },
  },
  {
    id: "head-heavy",
    term: "Head-heavy",
    category: "Racket",
    definition:
      "Mass concentrated toward the head of the racket. Adds smash power but slows recovery between shots. Common in attack lines like Yonex Astrox and Li-Ning AxForce.",
  },
  {
    id: "head-light",
    term: "Head-light",
    category: "Racket",
    definition:
      "Mass concentrated toward the handle. Easier to swing fast, quicker to recover, better for defense and front-court play. Common in Yonex Nanoflare and Victor Auraspeed.",
  },
  {
    id: "even-balance",
    term: "Even balance",
    category: "Racket",
    definition:
      "Mass roughly centred. Tries to give you both attack and recovery. The Yonex Arcsaber 11 Pro and Victor DriveX 12 are typical examples.",
  },
  {
    id: "shaft-flex",
    term: "Shaft flex",
    category: "Racket",
    definition:
      "How much the shaft bends under load. Flexible shafts store and release energy at slower swing speeds — friendlier for beginners. Stiff and extra-stiff shafts only return energy if your swing is fast and clean. Most amateurs over-buy stiffness and underperform because of it.",
    example:
      "A medium-flex Arcsaber 7 Pro forgives mishits a stiff Astrox 99 Pro punishes.",
  },
  {
    id: "swing-weight",
    term: "Swing weight",
    category: "Racket",
    definition:
      "How heavy the racket feels when you actually swing it, not what the scale says. A 4U head-heavy frame can feel heavier in motion than a 3U even-balance frame because the mass is further from your hand.",
  },
  {
    id: "grip-size",
    term: "Grip size (G)",
    category: "Racket",
    definition:
      "Yonex sizes G2 (largest) through G6 (smallest); Victor and Li-Ning use overlapping conventions. Most amateurs play G5 — anything larger restricts wrist movement, anything smaller can encourage over-gripping.",
  },
  {
    id: "t-throat",
    term: "T-throat",
    category: "Racket",
    definition:
      "Where the shaft meets the frame, shaped like a sideways T. Holds the highest stress in a smash motion, so manufacturers use the T-throat to advertise their newest reinforcement tech (Yonex Hyper-Slim, Victor Hard-Cored, etc.).",
  },
  {
    id: "rotational-generator",
    term: "Rotational Generator System",
    category: "Racket",
    definition:
      "Yonex's term for concentrating mass at both the head and the butt cap to spin the racket faster around its centre. Marketing language for what most other brands just call head weight; the on-court effect is that recovery is slightly faster than the static balance number suggests.",
  },
  {
    id: "sweet-spot",
    term: "Sweet spot",
    category: "Racket",
    definition:
      "The area on the stringbed where contact transfers cleanly into power. A wider sweet spot forgives off-centre contact (good for beginners). Higher tension narrows the sweet spot (better for clean strikers, worse for everyone else).",
  },

  // Strings
  {
    id: "string-gauge",
    term: "Gauge",
    category: "Strings",
    definition:
      "String thickness in millimetres. Thinner gauges (0.61–0.66mm — EXBOLT 63, Aerobite Boost) generate more repulsion at the same tension but break faster. Thicker gauges (0.70mm — BG65) last longer but feel softer.",
    relatedHref: {
      label: "String tension guide",
      href: "/guides/string-tension/",
    },
  },
  {
    id: "tension",
    term: "Tension (lb / kg)",
    category: "Strings",
    definition:
      "How tight the strings are pulled when strung. Most amateurs play 22–26 lb. Higher tension narrows the sweet spot and sharpens feedback; lower tension widens the sweet spot and adds power if your swing is on the slower side. Most players are over-strung — try dropping 2 lb at the next restring.",
  },
  {
    id: "repulsion",
    term: "Repulsion",
    category: "Strings",
    definition:
      "How fast the string bed pushes the shuttle back after contact. High-repulsion strings feel poppy and fast; low-repulsion strings feel softer and dwell longer. EXBOLT 63 and BG80 lean repulsion; BG65 leans control.",
  },
  {
    id: "control-string",
    term: "Control (in strings)",
    category: "Strings",
    definition:
      "How predictably the string bed places the shuttle on drops, slices, and net taps. A control-leaning string lets you direct the shuttle precisely; a power-leaning string makes drops sit up and net play less crisp.",
  },
  {
    id: "tension-loss",
    term: "Tension loss",
    category: "Strings",
    definition:
      "Strings lose 5–10% tension in the first 24 hours and another 10–20% over the next several weeks. Restring before the bed loses 30% — well before the string visibly breaks.",
  },
  {
    id: "hybrid-string",
    term: "Hybrid string",
    category: "Strings",
    definition:
      "Different strings for the mains (vertical) and crosses (horizontal) — typically a thin power string in the mains and a textured control string in the crosses. Yonex Aerobite is the canonical example.",
  },

  // Shoes
  {
    id: "gum-rubber",
    term: "Gum rubber outsole",
    category: "Shoes",
    definition:
      "Soft, sticky rubber that grips wood and synthetic courts. Distinct from running-shoe outsoles, which are made for forward gait. Gum rubber loses grip with age — replace shoes every 9–15 months even if the upper looks fine.",
  },
  {
    id: "power-cushion",
    term: "Power Cushion / Power Cushion+",
    category: "Shoes",
    definition:
      "Yonex's branded heel-cushioning material. The + variant absorbs more impact and is found in current pro-tier shoes (Eclipsion Z3, Comfort Z3, 65 Z Wide).",
  },
  {
    id: "torsional-plate",
    term: "Torsional plate",
    category: "Shoes",
    definition:
      "A reinforced plate in the midfoot that resists twisting on lateral movement. The single most-protective feature on a badminton shoe. Stronger torsional plates (Yonex Eclipsion Z3, Victor P9200III) cost more and weigh more, but reduce the risk of ankle rolls.",
  },
  {
    id: "fit-width",
    term: "Fit width (regular vs wide)",
    category: "Shoes",
    definition:
      "How wide the shoe last is across the forefoot. Yonex Power Cushion 65 Z Wide adds 5–8mm of forefoot width over the regular last — a meaningful difference for South Asian, European, and many male feet.",
    relatedHref: {
      label: "Shoes for wide feet",
      href: "/guides/wide-feet-badminton-shoes/",
    },
  },

  // Game
  {
    id: "front-court",
    term: "Front court",
    category: "Game",
    definition:
      "The role in doubles played near the net. Wins on early interception, taps, and net-roll spin. Favours head-light or even-balance rackets with fast recovery.",
    relatedHref: {
      label: "Doubles roles guide",
      href: "/guides/doubles-roles/",
    },
  },
  {
    id: "rear-court",
    term: "Rear court",
    category: "Game",
    definition:
      "The role in doubles played near the back tramlines. Wins on first attack and continuity through clears, drops, and smashes. Favours head-heavy frames with stiffer shafts.",
  },
  {
    id: "split-step",
    term: "Split step",
    category: "Game",
    definition:
      "The small hop at the moment your opponent makes contact, used to load the legs for a fast first move in any direction. Separates club players from beginners more than any racket choice.",
  },
  {
    id: "clear",
    term: "Clear",
    category: "Game",
    definition:
      "An overhead shot hit deep to the back of the opponent's court. The most fundamental shot in singles; if you can clear from baseline to baseline reliably, intermediate rackets become viable.",
  },
  {
    id: "drop",
    term: "Drop",
    category: "Game",
    definition:
      "A soft overhead that lands just past the net on the opponent's side. A control-leaning string and a forgiving shaft make drops more reliable.",
  },
  {
    id: "smash",
    term: "Smash",
    category: "Game",
    definition:
      "A steep, fast overhead aimed at the floor. Smash power comes from technique first and head weight second. A 100ZZ in untrained hands smashes worse than a Nanoray Light 70i in a trained player's.",
  },
  {
    id: "drive",
    term: "Drive",
    category: "Game",
    definition:
      "A flat, fast shot at shoulder height. Doubles is mostly drives. Even-balance and head-light frames handle drive exchanges better than head-heavy attack rackets.",
  },

  // Brand-specific
  {
    id: "astrox",
    term: "Yonex Astrox line",
    category: "Brand lines",
    definition:
      "Yonex's head-heavy attack line. Astrox 100ZZ, 99 Pro, 88D Pro, 88S Pro, 77 Pro. Stiffness escalates as model number rises; 77 Pro is the friendliest entry, 100ZZ is reserved for elite contact.",
    relatedHref: { label: "Yonex line guide", href: "/brands/yonex/" },
  },
  {
    id: "nanoflare",
    term: "Yonex Nanoflare line",
    category: "Brand lines",
    definition:
      "Yonex's head-light speed line. Nanoflare 1000Z, 800 Pro, 700 Pro, 555, 380. Built for fast doubles and defense.",
  },
  {
    id: "arcsaber",
    term: "Yonex Arcsaber line",
    category: "Brand lines",
    definition:
      "Yonex's even-balance control line. Arcsaber 11 Pro, 7 Pro, 11 Play. Tuned for placement over power.",
  },
  {
    id: "auraspeed",
    term: "Victor Auraspeed line",
    category: "Brand lines",
    definition:
      "Victor's modern speed-attack flagship line. Auraspeed 90F Pro, 90K II, 100X SE, HS Plus. Often matches or beats Yonex Nanoflare on swing-speed-per-power at lower price.",
    relatedHref: { label: "Victor line guide", href: "/brands/victor/" },
  },
  {
    id: "thruster",
    term: "Victor Thruster line",
    category: "Brand lines",
    definition:
      "Victor's pure-power line. Thruster K Falcon, K Ryuga II, F. Heavy-head, stiff-shaft attack frames for trained smashers.",
  },
  {
    id: "axforce",
    term: "Li-Ning AxForce line",
    category: "Brand lines",
    definition:
      "Li-Ning's modern attack flagship line. AxForce 100, 90 Tiger, 80, 70. Comparable to Yonex Astrox 99 Pro tier but typically $30–50 cheaper.",
    relatedHref: { label: "Li-Ning line guide", href: "/brands/li-ning/" },
  },
  {
    id: "bladex",
    term: "Li-Ning BladeX line",
    category: "Brand lines",
    definition:
      "Li-Ning's even-balance speed line. BladeX 900 Sun, 900 Moon, 800. Wang Zhiyi's BladeX 900 Sun is a popular doubles flagship.",
  },
  {
    id: "halbertec",
    term: "Li-Ning Halbertec line",
    category: "Brand lines",
    definition:
      "Li-Ning's technical-attack line. Halbertec 9000 (Power), 8000, 7000. Stiff shafts with even balance for repeatable clears and drops alongside attack.",
  },

  // Misc tech
  {
    id: "graphite",
    term: "Graphite (HM, T1100, 46T)",
    category: "Construction",
    definition:
      "The carbon fibre family used in racket frames. Higher-modulus graphite (HM) is stiffer and lighter. T1100 (used in Li-Ning AxForce) and 46T high-strength carbon (used in Victor Auraspeed) are the marketing names for premium grades. Most flagship frames use a mix; the marketing names matter less than the resulting balance and shaft flex.",
  },
  {
    id: "frame-thickness",
    term: "Frame thickness",
    category: "Construction",
    definition:
      "The width of the racket frame in cross-section. Thinner frames (5.6–5.8mm) cut air faster and improve swing speed; thicker frames are more stable on contact. Modern flagships use box-shaped or hexagonal cross-sections to balance the trade.",
  },
  {
    id: "shuttle-speed",
    term: "Shuttle speed (76, 77, 78)",
    category: "Shuttles",
    definition:
      "The grade of feathered shuttles, marked on the tube. Higher numbers fly farther in cool, low-altitude halls; lower numbers fly farther in hot, high-altitude halls. Most clubs play 76 or 77; tournaments default to whatever the venue specifies.",
  },
  {
    id: "shuttle-feathers",
    term: "Goose vs duck feathers",
    category: "Shuttles",
    definition:
      "Premium tournament shuttles use goose feathers from the left wing for better consistency. Training shuttles use duck feathers (cheaper, slightly less stable). Plastic shuttles are durable but fly differently and are not used at tournament level.",
  },
];

const CATEGORIES = [
  "Racket",
  "Strings",
  "Shoes",
  "Game",
  "Brand lines",
  "Construction",
  "Shuttles",
] as const;

export default function GlossaryPage() {
  const definedTermJsonLd = TERMS.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${companyInfo.siteUrl}/guides/glossary/#${t.id}`,
    name: t.term,
    description: t.definition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${companyInfo.siteUrl}/guides/glossary/#term-set`,
      name: "IntoBadminton equipment glossary",
    },
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${companyInfo.siteUrl}/guides/` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Glossary",
        item: `${companyInfo.siteUrl}/guides/glossary/`,
      },
    ],
  };

  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${companyInfo.siteUrl}/guides/glossary/#term-set`,
    name: "IntoBadminton badminton equipment glossary",
    description:
      "Plain-English definitions of badminton equipment, technique, and brand-line terms used across IntoBadminton.",
    hasDefinedTerm: definedTermJsonLd,
  };

  return (
    <main className="flex-1 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
      />

      <article className="layout-band max-w-3xl space-y-6 text-[var(--text)]">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides/" className="hover:text-[var(--text)]">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Glossary</span>
        </nav>

        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Badminton equipment glossary
          </h1>
          <p className="text-[var(--color-muted)] leading-relaxed">
            Plain-English definitions for the terms we use across the site —
            weight class, shaft flex, balance, sweet spot, gauge, torsional
            plate, T-throat, and the brand line names you'll see on every
            product page. Skim by category, or use Find (Cmd/Ctrl+F) for a
            specific term.
          </p>
        </header>

        <nav aria-label="Glossary categories" className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`#cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="chip chip-secondary"
            >
              {cat}
            </a>
          ))}
        </nav>

        {CATEGORIES.map((cat) => {
          const items = TERMS.filter((t) => t.category === cat);
          if (items.length === 0) return null;
          return (
            <section
              key={cat}
              id={`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="space-y-4"
            >
              <h2 className="pt-4 text-xl font-semibold border-t border-[color:var(--line)]">
                {cat}
              </h2>
              <dl className="space-y-5">
                {items.map((t) => (
                  <div key={t.id} id={t.id} className="card p-5">
                    <dt className="font-semibold text-[var(--text)]">
                      {t.term}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                      {t.definition}
                    </dd>
                    {t.example && (
                      <dd className="mt-2 text-xs italic text-[var(--color-subtle)]">
                        Example: {t.example}
                      </dd>
                    )}
                    {t.relatedHref && (
                      <dd className="mt-3 text-sm">
                        <Link
                          href={t.relatedHref.href}
                          className="text-[var(--color-accent)] hover:underline"
                        >
                          {t.relatedHref.label} →
                        </Link>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </section>
          );
        })}

        <section className="rounded-2xl bg-[color:var(--color-accent-soft)] p-7 text-center">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Got the lingo? Run the finder.
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Five questions, ranked picks with the reasoning right there on the
            card. No signup. No email gate.
          </p>
          <Link href="/quiz/" className="btn-primary mt-5">
            Start the finder
          </Link>
        </section>

        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
          Missing a term?{" "}
          <Link href="/contact/" className="text-[var(--color-accent)] underline">
            Tell us
          </Link>{" "}
          and we'll add it.
        </p>
      </article>
    </main>
  );
}
