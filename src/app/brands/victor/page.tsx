import type { Metadata } from "next";
import { BrandPage, type BrandPageConfig } from "@/components/BrandPage";

export const metadata: Metadata = {
  title:
    "Victor Badminton Rackets, Shoes & Strings — Auraspeed, Thruster, Brave Sword & DriveX | IntoBadminton",
  description:
    "The complete IntoBadminton guide to Victor badminton: Auraspeed for speed, Thruster for power, Brave Sword for control, plus DriveX for doubles. Korean-tour proven, Taiwanese engineering. Decoded by playing role.",
  keywords: [
    "Victor",
    "Victor badminton",
    "Victor Auraspeed",
    "Victor Thruster",
    "Victor Brave Sword",
    "Victor Jetspeed",
    "Victor DriveX",
    "Victor badminton shoes",
    "best Victor racket",
    "Auraspeed Pro",
    "Thruster K Falcon",
  ],
  alternates: { canonical: "/brands/victor/" },
};

const config: BrandPageConfig = {
  slug: "victor",
  brandName: "Victor",
  brandNameZh: "胜利",
  founded: 1968,
  hqCountry: "Taiwan",
  officialUrl: "https://www.victorsport.com/",
  title: "Victor badminton: Auraspeed, Thruster, Brave Sword & DriveX decoded",
  dek: "Taiwan's flagship badminton brand and the dominant frame on the Korean tour. Auraspeed for speed, Thruster for power, Brave Sword for control, DriveX for doubles. Often beats Yonex on raw smash power per dollar.",
  intro:
    "Victor is the second-largest badminton brand globally and the racket of choice across much of East Asia, particularly Korea and Taiwan. Founded in 1968 in Taiwan, it sponsors the Korean and Chinese-Taipei national teams plus stars like An Se Young (until 2025), Tai Tzu-ying, and Anders Antonsen. Engineering reputation is excellent and pricing tends to undercut Yonex by 10-20% on equivalent tier.",
  positioning:
    "Victor's racket lines work the same way Yonex's do — by what the racket does, not what tier it sits in. Auraspeed is the modern speed-attack flagship (think 'better Nanoflare'). Thruster is heavy-hitting power. Brave Sword is the long-running aerodynamic control line. Jetspeed S sits between speed and attack. DriveX is the doubles-tuned line. The ARS-Light and ARS-90F variants matter — letter suffixes tell you stiffness and balance shifts within a model.",
  lines: [
    {
      name: "Auraspeed — speed-attack flagship",
      bestFor: "Fast doubles, aggressive front-court attack",
      description:
        "Victor's modern flagship line, replacing the older Jetspeed in the speed-power role. The 90F Pro is the technical pick for clean-contact attackers; the 90K Pro adds a stiffer shaft. The ARS-Light versions are excellent for 5U-leaning players who want speed without losing penetration. This is where Victor genuinely matches or beats Yonex Nanoflare on swing-speed-per-power.",
      signatureModels: [
        "Auraspeed 90F Pro",
        "Auraspeed 90K Pro",
        "Auraspeed Light Fighter 80F",
        "Auraspeed 100X",
      ],
    },
    {
      name: "Thruster — heavy-power smash",
      bestFor: "Singles smashers, rear-court doubles attackers",
      description:
        "Victor's pure-power line. Thruster K Falcon and TK-Ryuga are the modern smash specialists. Heavier head, stiffer shaft, longer string-bed contact dwell — designed for players who already have technique and want maximum smash payoff. Not beginner-friendly; expect to size down weight class (4U) to keep swing speed playable.",
      signatureModels: [
        "Thruster K Falcon",
        "Thruster K Ryuga II",
        "Thruster F",
        "Thruster Ryuga Metallic",
      ],
    },
    {
      name: "Brave Sword — aerodynamic control",
      bestFor: "All-court technicians, defenders",
      description:
        "Victor's longest-running line. Aerodynamic frame profile keeps swing speed up while balance stays even. The Brave Sword 12 is a cult classic — popular with pro doubles defenders for years. Modern versions like the BRS-1900 keep the formula but add modern materials. A great choice if you want Yonex Arcsaber-style control without the price.",
      signatureModels: [
        "Brave Sword 12",
        "Brave Sword 1900",
        "Brave Sword Lyra",
      ],
    },
    {
      name: "DriveX — doubles-tuned",
      bestFor: "Mixed and men's doubles, flat-drive specialists",
      description:
        "Built explicitly around doubles. Even balance, generous frame, tuned for fast-flat exchanges and quick blocks. The DriveX 9X is the doubles pro pick; the DriveX 8S is a sleeper-tier intermediate frame and one of the best 'second racket for a club doubles player' options at its price.",
      signatureModels: ["DriveX 9X", "DriveX 8S", "DriveX Air-77"],
    },
    {
      name: "Jetspeed S — fast-attack legacy",
      bestFor: "Fast singles and attacking doubles",
      description:
        "The line Auraspeed largely replaced, still alive and still beloved by players who tried both. Jetspeed S 12 II remains a high-pick for many tour doubles players. Worth considering if Auraspeed feels too head-light for your taste.",
      signatureModels: ["Jetspeed S 12 II", "Jetspeed S 12F"],
    },
    {
      name: "Shoes — A970, Premium, P9200 III",
      bestFor: "Court footwork from beginner to elite",
      description:
        "Victor's badminton shoes are excellent and often overlooked. The P9200 III is a benchmark stability shoe (used here in our shoes best-of). The A series covers entry to mid-range. Fit tends to run slightly wider than Yonex, which is helpful for European and South Asian foot shapes.",
      signatureModels: ["P9200 III", "A970", "A930", "Premium-S"],
    },
  ],
  topPicks: [
    {
      name: "Victor DriveX 8S",
      line: "DriveX",
      bestFor: "Beginner who likes flat doubles drives",
      priceUsd: 110,
      href: "/best/beginner-rackets/",
    },
    {
      name: "Victor Auraspeed 90F Pro",
      line: "Auraspeed",
      bestFor: "Speed-attack doubles flagship",
      priceUsd: 240,
      href: "/best/doubles-rackets/",
    },
    {
      name: "Victor Thruster K Falcon",
      line: "Thruster",
      bestFor: "Heavy-smash singles",
      priceUsd: 230,
      href: "/best/smash-heavy-rackets/",
    },
    {
      name: "Victor P9200 III",
      line: "Shoes",
      bestFor: "Premium stability shoe",
      priceUsd: 160,
      href: "/best/shoes/",
    },
  ],
  faqs: [
    {
      q: "Is Victor better than Yonex?",
      a: "On raw spec-per-dollar, often yes — Auraspeed 90F Pro and Thruster K Falcon match or beat Yonex equivalents on swing speed and smash payload. What Yonex still leads on is global distribution, resale liquidity, and stringer familiarity. If you live where Victor is well-stocked (East Asia, much of Europe, and increasingly North America), Victor is a smart choice. If you live somewhere with thin Victor inventory, Yonex is safer.",
    },
    {
      q: "Auraspeed vs Thruster — which Victor line should I pick?",
      a: "Auraspeed is fast-swing speed-attack; Thruster is heavy-head pure power. If your style is doubles drives, defense, and net play, Auraspeed. If your style is rear-court smashing in singles or doubles and you have stable technique, Thruster. Auraspeed is much easier to learn on; Thruster rewards already-good contact.",
    },
    {
      q: "What's the difference between Auraspeed F, K, and X variants?",
      a: "Letter suffixes encode shaft stiffness and balance bias within a model. F is the most balanced (often the technical-attacker pick). K adds extra shaft stiffness. X tilts more aggressively head-heavy. Read the spec sheet rather than relying on the suffix alone — Victor occasionally uses suffixes inconsistently across model years.",
    },
    {
      q: "Is Victor good for beginners?",
      a: "Yes. The DriveX 8S, Auraspeed Light Fighter 80F, and several Brave Sword Lyra variants are excellent beginner picks at $80-130. Skip the Pro-tier Thruster and high-stiffness Auraspeed for at least the first six months — Victor's flagship line is closer to Yonex Astrox in unforgiving stiffness than the marketing tier number suggests.",
    },
  ],
  relatedLinks: [
    {
      label: "Spot fake Victor rackets — authenticity check",
      href: "/guides/equipment-authenticity/",
    },
    {
      label: "Yonex vs Victor vs Li-Ning — brand showdown",
      href: "/compare-guides/yonex-victor-li-ning/",
    },
    {
      label: "Best doubles badminton rackets",
      href: "/best/doubles-rackets/",
    },
    {
      label: "Best smash-heavy badminton rackets",
      href: "/best/smash-heavy-rackets/",
    },
    {
      label: "Best badminton shoes",
      href: "/best/shoes/",
    },
  ],
};

export default function VictorBrandPage() {
  return <BrandPage config={config} />;
}
