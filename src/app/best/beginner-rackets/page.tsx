import type { Metadata } from "next";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Beginner Badminton Rackets 2026",
  description:
    "Six forgiving badminton rackets for beginners — Nanoflare 700 Play, Astrox 77 Play, Arcsaber 7 Pro, DriveX 8S, Astrox 77 Pro, Mizuno Altius N-Feel.",
  alternates: { canonical: "/best/beginner-rackets/" },
};

const config: BestPicksConfig = {
  slug: "beginner-rackets",
  breadcrumbLabel: "Beginner rackets",
  title: "Best badminton rackets for beginners (2026)",
  dek: "Six rackets that actually help a new player improve. Picked by shaft flex, weight, balance, and budget — not by marketing language.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "How beginners should think about a first racket",
    body: "Three things matter more than brand or marketing tier: <strong>shaft flex</strong> (medium or flexible — extra-stiff frames punish late contact), <strong>weight class</strong> (4U or 5U keeps the frame easy to time), and <strong>balance</strong> (even or slightly head-light protects your shoulder while you build technique). Get those three right and you will improve faster than someone with a $300 pro frame.",
  },
  picks: [
    {
      rank: 1,
      name: "Nanoflare 700 Play",
      brand: "Yonex",
      priceUsd: 80,
      bestFor: "First serious club racket — speed leaning",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Hi-Flex" },
      ],
      why: "The beginner-tier sibling of the Nanoflare 700 Pro that singles and doubles players use on the BWF tour. Hi-Flex shaft loads forgiving, the head-light bias makes the frame easy to recover with on flat-drive exchanges, and the 4U weight keeps it light on the shoulder. Standard 20-28 lb stringing window covers everything a beginner needs.",
      tradeoff: "Less rear-court smash mass than the Astrox 77 Play below — pick this if speed and defense matter more than overhead attack.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/int_nf-700pl_529-1_2.png?v=1738288292&width=1445",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Nanoflare 700 Play badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 2,
      name: "Astrox 77 Play",
      brand: "Yonex",
      priceUsd: 100,
      bestFor: "Beginner who wants Astrox attack feel",
      specs: [
        { label: "Weight", value: "4U (~83g)" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Hi-Flex" },
      ],
      why: "The friendliest path into Yonex's head-heavy Astrox line. Hi-Flex shaft tolerates imperfect timing, but the head-heavy bias still teaches you what an Astrox feels like before you commit to the 77 Pro further down this list. Same Rotational Generator System geometry as the Pro, just dialled for first-year players.",
      tradeoff: "Less defensive recovery than the Nanoflare 700 Play above — head-heavy frames slow your reset on fast-flat exchanges.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/INT_AX77-PL_343-1.jpg?v=1774596539&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Astrox 77 Play badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 3,
      name: "Arcsaber 7 Pro",
      brand: "Yonex",
      priceUsd: 220,
      bestFor: "Beginner planning to stay 2-3 years",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "An honest all-court frame with a forgiving shaft. The Arcsaber line is engineered around control, so beginners learn placement before they chase smash speed. Worth the spend if you are committed.",
      tradeoff: "Premium tier — overkill if you are still deciding whether badminton is your sport.",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/arc7-p.png?v=1738288168&width=1946",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Arcsaber 7 Pro badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 4,
      name: "DriveX 8S",
      brand: "Victor",
      priceUsd: 189,
      bestFor: "Beginner who likes flat doubles drives",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Victor's DriveX series is tuned around flat-drive doubles play. The 8S is light enough to defend with and stiff enough to teach proper contact, without the price tag of an Auraspeed Pro.",
      tradeoff: "Less brand awareness in North America — string and grip swap on local stringer is fine.",
      // TODO image: Victor DriveX 8S J — source from victorsport.com/product/drivex-8-s
      // (page is JS-rendered, copy hero image URL from browser inspector).
    },
    {
      rank: 5,
      name: "Astrox 77 Pro",
      brand: "Yonex",
      priceUsd: 219,
      bestFor: "Ambitious club player",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Often called the friendliest 'Pro' frame Yonex makes. Forgives mishits a 88D Pro punishes, with enough head weight to start training rear-court attack. Founder's previous main racket — confirmed transition-friendly.",
      tradeoff: "If your level is still strictly recreational, the 77 Pro under-performs vs the cheaper 77 Play above.",
      evidenceLevel: "tested",
      image: {
        url: "https://us.yonex.com/cdn/shop/files/ax77-p.png",
        source: "yonex",
        credit: "Image: Yonex (us.yonex.com)",
        alt: "Yonex Astrox 77 Pro badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    // Note: model name updated from "Altius 01 Feel" to "Altius N-Feel" to
    // match Mizuno's current Japan catalog (mizuno.jp/badminton). Image is
    // sourced from the official Mizuno JP product page.
    {
      rank: 6,
      name: "Altius N-Feel",
      brand: "Mizuno",
      priceUsd: 169,
      bestFor: "Beginner who wants something different",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even / head-light" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Mizuno's badminton line stays under the radar outside Japan, which is a shame. The N-Feel swings smooth, sits gentle on the arm, and the build quality matches anything in the Yonex mid-range. A good pick if you want to step off the Yonex-Victor-Li-Ning treadmill without taking a quality risk.",
      tradeoff: "Limited availability outside Asia. Check regional stock before ordering — most stockists are in Japan, mainland China, and a handful of Singapore/Malaysia shops.",
      image: {
        url: "https://jpn.mizuno.com/sites/default/files/2025-10/cs_ba_top_251010_altiusnfeel_1500_480_0.jpg",
        source: "mizuno",
        credit: "Image: Mizuno Japan",
        alt: "Mizuno Altius N-Feel badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
  ],
  faqs: [
    {
      q: "What weight class should a beginner choose, 3U, 4U, or 5U?",
      a: "5U (around 75-79g) is the easiest to time and the lightest on the shoulder. 4U (around 80-84g) gives slightly more punch on smashes once your contact point is consistent. 3U is overkill for most beginners — only choose 3U if you already lift weights, have wrist issues with light frames, or specifically want a head-heavy attack feel.",
    },
    {
      q: "Should I buy the same racket as my favourite pro?",
      a: "Almost never. Pro rackets are tuned around extreme stiffness, demanding swing weights, and unforgiving sweet spots. A beginner copying Viktor Axelsen's Astrox 100ZZ will get worse smash distance than the same beginner with a Nanoray 70i — and tennis elbow within a month.",
    },
    {
      q: "Do I need a separate racket for singles and doubles?",
      a: "No, not as a beginner. One forgiving all-court frame covers both. The split between attack and speed rackets matters once you have a clear primary discipline and your technique reliably produces clean contact.",
    },
    {
      q: "How much should a first racket cost?",
      a: "$80-150 USD covers excellent options. Spending more than $200 on a first racket is usually wasted — you do not yet know whether you prefer head-heavy attack or head-light speed, and you may swap before you have logged 50 sessions. Spend the saving on shoes — they matter more.",
    },
  ],
  ctaHeading: "Want a personalised pick instead of a list?",
  ctaBody: "Our finder asks five quick questions — level, discipline, style, body, budget — then ranks the catalogue for you with reasons.",
};

export default function BeginnerRacketsPage() {
  return <BestPicksPage config={config} />;
}
