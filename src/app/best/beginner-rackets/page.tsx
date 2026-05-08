import type { Metadata } from "next";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title:
    "Best Badminton Rackets for Beginners 2026 — 6 Forgiving Picks Under $250 | IntoBadminton",
  description:
    "Six forgiving, well-priced badminton rackets for beginners and recreational club players. Ranked by shaft flex, weight class (3U/4U/5U), balance, and budget — picked by a competitive Div 4 player who has played them.",
  keywords: [
    "best beginner badminton racket",
    "beginner badminton racket",
    "first badminton racket",
    "Yonex Nanoray Light 70i",
    "Yonex Astrox 77 Pro",
    "Yonex Arcsaber 7 Pro",
    "Victor DriveX 8S",
    "4U badminton racket",
    "5U badminton racket beginner",
    "forgiving badminton racket",
    "badminton racket under $200",
  ],
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
    // TODO: image — Nanoray Light 70i is discontinued from current Yonex
    // catalog (badmintonplanet.eu does not list it either). Try yonex.com
    // /badminton archive pages, or source from a retailer like BadmintonAvenue
    // or BadmintonBay. Consider replacing this pick with a current model.
    {
      rank: 1,
      name: "Nanoray Light 70i",
      brand: "Yonex",
      priceUsd: 95,
      bestFor: "First serious club racket",
      specs: [
        { label: "Weight", value: "5U (~78g)" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Flexible" },
      ],
      why: "Light, easy to swing, and tolerant of late contact. The sweet spot is generous, the shaft loads quickly, and it forgives the mishits beginners actually make. Yonex resale liquidity is high if you outgrow it.",
      tradeoff: "Will feel underpowered once your smash technique stabilises and you start playing more aggressive doubles.",
    },
    {
      rank: 2,
      name: "Voltric 8DG",
      brand: "Yonex",
      priceUsd: 105,
      bestFor: "Heavier hitter who breaks strings",
      specs: [
        { label: "Weight", value: "3U (~88g)" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Built for higher tension (up to 30 lb) with a durable frame. A good choice if you snap strings on lighter rackets or want a frame that survives wall-clashes during footwork drills.",
      tradeoff: "The heavier head asks more from the shoulder. Skip if you have any rotator-cuff caution.",
      image: {
        url: "https://www.badmintonplanet.eu/media/mf_webp/jpg/media/catalog/product/cache/823e6533370b49d0344e6a0285824513/v/o/voltric_8_dg.webp",
        source: "yonex",
        credit: "Image: Yonex / via BadmintonPlanet",
        alt: "Yonex Voltric 8 DG badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 3,
      name: "Arcsaber 7 Pro",
      brand: "Yonex",
      priceUsd: 195,
      bestFor: "Beginner planning to stay 2-3 years",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "An honest all-court frame with a forgiving shaft. The Arcsaber line is engineered around control, so beginners learn placement before they chase smash speed. Worth the spend if you are committed.",
      tradeoff: "Premium tier — overkill if you are still deciding whether badminton is your sport.",
      image: {
        url: "https://www.badmintonplanet.eu/media/mf_webp/jpg/media/catalog/product/cache/823e6533370b49d0344e6a0285824513/y/o/yonex_arcsaber_7_pro.webp",
        source: "yonex",
        credit: "Image: Yonex / via BadmintonPlanet",
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
      priceUsd: 110,
      bestFor: "Beginner who likes flat doubles drives",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Victor's DriveX series is tuned around flat-drive doubles play. The 8S is light enough to defend with and stiff enough to teach proper contact, without the price tag of an Auraspeed Pro.",
      tradeoff: "Less brand awareness in North America — string and grip swap on local stringer is fine.",
      image: {
        url: "https://www.badmintonplanet.eu/media/mf_webp/jpg/media/catalog/product/cache/823e6533370b49d0344e6a0285824513/v/i/victor_drivex_8s_j.webp",
        source: "victor",
        credit: "Image: Victor / via BadmintonPlanet",
        alt: "Victor DriveX 8S J badminton racket",
        width: 480,
        height: 480,
        verified: true,
      },
    },
    {
      rank: 5,
      name: "Astrox 77 Pro",
      brand: "Yonex",
      priceUsd: 220,
      bestFor: "Ambitious club player",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Slightly head-heavy" },
        { label: "Shaft flex", value: "Medium / Medium-stiff" },
      ],
      why: "Often called the friendliest 'Pro' frame Yonex makes. Forgives mishits a 88D Pro punishes, with enough head weight to start training rear-court attack. Founder's previous main racket — confirmed transition-friendly.",
      tradeoff: "If your level is still strictly recreational, the 77 Pro under-performs vs cheaper Nanoray 70i.",
      image: {
        url: "https://www.badmintonplanet.eu/media/mf_webp/jpg/media/catalog/product/cache/823e6533370b49d0344e6a0285824513/a/s/astrox_77_pro.webp",
        source: "yonex",
        credit: "Image: Yonex / via BadmintonPlanet",
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
      priceUsd: 145,
      bestFor: "Beginner who wants something different",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even / head-light" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Mizuno's badminton line stays under the radar outside Japan, which is a shame. The N-Feel swings smooth, sits gentle on the arm, and the build quality matches anything in the Yonex mid-range. A good pick if you want to step off the Yonex-Victor-Li-Ning treadmill without taking a quality risk.",
      tradeoff: "Limited availability outside Asia. Check regional stock before ordering — most stockists are in Japan, mainland China, and a handful of Singapore/Malaysia shops.",
      image: {
        url: "https://www.mizuno.jp/sites/default/files/2025-10/cs_ba_top_251010_altiusnfeel_1500_480_0.jpg",
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
