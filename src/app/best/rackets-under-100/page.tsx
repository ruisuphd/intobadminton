import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Badminton Rackets Under $100 (2026)",
  description:
    "Six verified badminton rackets under $100 — budget Yonex Play tiers, Victor value frames, and Li-Ning entry speed lines with spec tables and trade-offs.",
  alternates: pageAlternates("/best/rackets-under-100/"),
};

const config: BestPicksConfig = {
  slug: "rackets-under-100",
  breadcrumbLabel: "Rackets under $100",
  title: "Best badminton rackets under $100 (2026)",
  dek: "Six frames that stay under a hundred dollars at typical US/UK retail — ranked by shaft forgiveness, balance, and whether the spec sheet matches how club players actually swing.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "How to shop under $100 without buying junk",
    body: "Price alone is not a quality signal in badminton — plenty of $35 frames are fine for hall hire, and plenty of $95 frames are stiff rebrands that punish beginners. Under this cap, prioritise <strong>forgiving shaft flex</strong> (medium or hi-flex, not extra-stiff), <strong>4U or 5U weight</strong> (easier timing than 3U), and <strong>a balance you can recover with</strong> (even or head-light for doubles defence; head-heavy only if you already smash cleanly). Avoid grey-market “Pro” paint jobs with no verifiable serial path — see our <a href=\"/guides/equipment-authenticity/\">authenticity guide</a>. If you can stretch past $100, the <a href=\"/best/beginner-rackets/\">beginner shortlist</a> adds Nanoflare 700 Play and Astrox 77 Play with stronger warranty channels.",
  },
  picks: [
    {
      rank: 1,
      name: "Bladex Arrow (锋影 利箭 / EX)",
      brand: "Li-Ning",
      priceUsd: 32,
      bestFor: "Ultra-budget doubles front court",
      specs: [
        { label: "Weight", value: "5U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff (speed-oriented)" },
      ],
      why: "The lightest pick on this list. A 5U head-light Bladex line frame aimed at fast flat drives and front-court interceptions — useful when you are still proving badminton is your sport and do not want to sink flagship money.",
      tradeoff: "Stiff shaft and narrow sweet spot vs Yonex Play tiers — better for quick hands than for learning rear-court power from scratch.",
    },
    {
      rank: 2,
      name: "Sonic Boom Pro (音爆 Pro)",
      brand: "Victor",
      priceUsd: 45,
      bestFor: "Cheapest credible Victor attack shape",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even / slight head-heavy" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Victor’s budget attack template — enough head weight to teach what a Thruster-style frame feels like without Thruster Pro money. Medium flex tolerates late contact better than entry stiff shafts.",
      tradeoff: "Regional stock and warranty vary outside Asia — confirm your retailer before ordering.",
    },
    {
      rank: 3,
      name: "Thruster SR Light (樱花刃)",
      brand: "Victor",
      priceUsd: 70,
      bestFor: "Light doubles all-court",
      specs: [
        { label: "Weight", value: "5U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Cherry Blossom Blade reskin on the TK7 platform — 5U weight keeps recovery quick in mixed doubles, and the medium shaft is club-forgiving. A common “second racket” price point in Southeast Asia.",
      tradeoff: "Less smash mass than head-heavy Astrox Play options — pick attack frames below if power is the goal.",
    },
    {
      rank: 4,
      name: "AxForce 10 (雷霆 10)",
      brand: "Li-Ning",
      priceUsd: 70,
      bestFor: "Budget Thunder-line smash practice",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Entry AxForce (Thunder) geometry with STD carbon — teaches head-heavy timing at a fraction of AxForce 90 money. Good if you already play rear court in social doubles and want more punch than a Nanoflare Play.",
      tradeoff: "Heavier swing than 5U picks above — shoulder-friendly only if your contact point is consistent.",
    },
    {
      rank: 5,
      name: "Arcsaber 7 Play",
      brand: "Yonex",
      priceUsd: 75,
      bestFor: "Best Yonex control path under $100",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "The most forgiving Yonex-branded path on this list. Arcsaber 7 Play sits on the control side of Yonex’s lineup — even balance, medium flex, global warranty channels — so you learn placement before chasing Astrox stiffness.",
      tradeoff: "Less rear-court smash than head-heavy budget frames — pair with a tension drop (22–24 lb) if you want more free power.",
    },
    {
      rank: 6,
      name: "Nanoflare 1000 Play",
      brand: "Yonex",
      priceUsd: 75,
      bestFor: "Speed-first Yonex under $100",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Nanoflare family shape without flagship price. Head-light bias helps defensive recovery and flat-drive exchanges — the frame many club players wish they had bought before their first stiff “Pro” paint job.",
      tradeoff: "Less smash mass than AxForce 10 or Sonic Boom Pro — choose this if defence and speed matter more than overhead attack.",
    },
  ],
  faqs: [
    {
      q: "Is a $30 racket good enough to start badminton?",
      a: "Yes for your first month in a leisure centre — if the shaft is not extra-stiff and the frame is not absurdly heavy. Past ~20 sessions, upgrading to a medium-flex 4U with a real warranty path (Yonex Play, Victor medium tier) usually improves timing faster than another ultra-cheap stiff frame.",
    },
    {
      q: "Should I buy under $100 online or from a pro shop?",
      a: "Pro shops let you feel grip size and sometimes demo weight. Online is fine if you know your grip (G5 vs G6) and the seller is an authorised channel — critical for Yonex serial checks. Either way, budget $15–25 for a restring; factory strings are rarely matched to your level.",
    },
    {
      q: "Why are Nanoflare 700 Play and Astrox 77 Play not on this list?",
      a: "They often sit just above $100 at US/UK retail in 2026. They remain our top beginner picks on the dedicated beginner guide — this page is for shoppers with a hard budget cap.",
    },
    {
      q: "Can I use the finder instead of this list?",
      a: "Yes — set your budget slider under $100 on the quiz and the scorer ranks the full catalogue with five named fit factors. This guide is for readers who want editor-curated shortlists before running the funnel.",
    },
  ],
  ctaHeading: "Want every under-$100 frame ranked for your body and style?",
  ctaBody: "The finder applies your level, discipline, and injury flags — then shows fit scores with source authority labels.",
};

export default function RacketsUnder100Page() {
  return <BestPicksPage config={config} />;
}
