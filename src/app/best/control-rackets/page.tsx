import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Control Badminton Rackets (2026)",
  description:
    "Six even-balance and placement-first badminton rackets — Arcsaber 11 Pro, Arcsaber 7 Pro, Halbertec 8000, DriveX 8S, and budget control options.",
  alternates: pageAlternates("/best/control-rackets/"),
};

const config: BestPicksConfig = {
  slug: "control-rackets",
  breadcrumbLabel: "Control rackets",
  title: "Best control & placement badminton rackets (2026)",
  dek: "When you win points by steering the shuttle, not by raw smash mass — six even-balance frames that reward timing and line accuracy.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What “control racket” actually means",
    body: "Control frames are not soft toys — they are usually <strong>even balance</strong> or only slightly head-heavy, with <strong>medium to stiff shafts</strong> that return energy predictably on drives and net kills. The Arcsaber and Halbertec lines exist for players who place the shuttle before they chase smash speed. If your shoulder already complains on flat exchanges, pair control geometry with <a href=\"/best/rackets-for-shoulder-comfort/\">head-light comfort picks</a> instead of forcing a stiff attack frame.",
  },
  picks: [
    {
      rank: 1,
      name: "Arcsaber 11 Pro",
      brand: "Yonex",
      priceUsd: 285,
      productId: "yy-arcsaber-11-pro",
      bestFor: "Flagship placement singles and doubles",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Yonex's current control flagship — even balance with a stiff shaft that rewards clean drives and tight net spin. The frame teaches placement before power; competitive club players who already time contact well get the most from it.",
      tradeoff: "Less rear-court smash mass than Astrox head-heavy frames — not the frame for pure power merchants.",
      evidenceLevel: "specs",
    },
    {
      rank: 2,
      name: "Arcsaber 7 Pro",
      brand: "Yonex",
      priceUsd: 220,
      productId: "yy-arcsaber-7-pro",
      bestFor: "All-court control without flagship pricing",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "The reference control frame for intermediate-to-advanced club play. Medium shaft loads forgivingly while the even balance keeps flat drives honest — a common upgrade path from beginner even-balance frames.",
      tradeoff: "Superseded in marketing by the 11 Pro — still excellent, but resale favours the newer line badge.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Halbertec 8000",
      brand: "Li-Ning",
      priceUsd: 165,
      productId: "ln-halbertec-8000",
      bestFor: "Li-Ning control with smash insurance",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium-stiff" },
      ],
      why: "Even-balance Halbertec tuning with enough smash capability for club doubles — popular in China and Southeast Asia as a value control flagship.",
      tradeoff: "Warranty and demo availability thinner than Yonex in Western Europe — confirm local support before buying.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "DriveX 8S",
      brand: "Victor",
      priceUsd: 189,
      productId: "vic-drivex-8s",
      bestFor: "Victor all-court club control",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "DriveX platform even balance for players who want Victor handling without head-heavy Thruster smash bias. Strong doubles all-court option when you defend more than you finish.",
      tradeoff: "Less iconic than Jetspeed or Thruster marketing — fewer demo units in retail chains.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Brave Sword 12",
      brand: "Victor",
      priceUsd: 165,
      bestFor: "Classic even-balance value control",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Older Victor all-court geometry that still shows up in club bags because the even balance is predictable. Good second racket when your primary frame is head-heavy attack.",
      tradeoff: "Not a current tour billboard model — buy for feel, not resale hype.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Arcsaber 7 Tour",
      brand: "Yonex",
      priceUsd: 130,
      bestFor: "Budget control template",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Sub-flagship Arcsaber DNA at Play-tier pricing — teaches even-balance placement before you spend on the 7 Pro or 11 Pro.",
      tradeoff: "Materials and stability below Pro tiers — upgrade once you play competitive club twice a week.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Is a control racket the same as a defensive racket?",
      a: "Overlap, but not identical. Defensive speed frames (Nanoflare-class) prioritise recovery and flat drives; control frames (Arcsaber-class) prioritise shot placement and predictable face angle. Many doubles players use head-light speed frames for defense and a separate even-balance frame for mixed discipline.",
    },
    {
      q: "Should beginners buy a control racket?",
      a: "Beginners benefit from forgiving flex and even balance — see our beginner guide. Arcsaber Tour/Play tiers are fine; stiff Pro-tier control frames punish late contact until timing is stable.",
    },
    {
      q: "How does control relate to string tension?",
      a: "Higher tension tightens the sweet spot and can feel more precise but harsher on the arm. Use our string tension guide and calculator after you pick a frame — control geometry plus sensible tension beats maxing both.",
    },
  ],
  ctaHeading: "See which control frame fits your level",
  ctaBody:
    "The finder scores placement, discipline, and comfort flags — so an even-balance frame that looks right on paper still has to match your shoulder and budget.",
};

export default function ControlRacketsPage() {
  return <BestPicksPage config={config} />;
}
