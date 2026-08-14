import type { Metadata } from "next";
import { pageAlternates } from "@/lib/metadata";
import { BestPicksPage, type BestPicksConfig } from "@/components/BestPicksPage";

export const metadata: Metadata = {
  title: "Best Badminton Rackets Under $200 (2026)",
  description:
    "Six upper-club badminton rackets under $200 — Astrox 88D Tour, DriveX 8S, Halbertec 8000, and Brave Sword 12. Hand-written picks with court trade-offs.",
  alternates: pageAlternates("/best/rackets-under-200/"),
};

export const config: BestPicksConfig = {
  slug: "rackets-under-200",
  breadcrumbLabel: "Rackets under $200",
  title: "Best badminton rackets under $200 (2026)",
  dek: "This is the last band before Pro money. The useful question is not 'what is cheapest at $199' — it is which geometry you will still want after a month of club nights. Six hand-picked frames, including one I play.",
  productSchemaCategory: "BadmintonRacket",
  intro: {
    heading: "What $200 actually buys in 2026",
    body: "At $200 you can reach <strong>Tour-tier Yonex</strong>, <strong>DriveX even-balance</strong>, and <strong>Li-Ning Halbertec control</strong> without paying Pro MAP. You still do not get 100ZZ VA or 88S Pro 2024. Buy here when you know your role (rear-court smash, even-balance doubles, or pocketing control) and you refuse to guess with a $280 extra-stiff shaft.",
  },
  picks: [
    {
      rank: 1,
      name: "Astrox 88D Tour (2024)",
      brand: "Yonex",
      priceUsd: 195,
      productId: "yy-astrox-88d-tour-2024",
      bestFor: "Heavier doubles smash than 88D Pro — only if you want that extra swing weight",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-heavy" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "I have hit the 88D Tour. It feels heavier than the 88D Pro. For most players I would send them to the Pro instead — the Tour's extra swing weight is not an upgrade unless you specifically want that loaded rear-court feel and you already clear length on a stiff Astrox.",
      tradeoff: "At $195 you are one sale away from a used 88D Pro. Only buy new Tour if you want the heavier frame on purpose, not because it is the leftover SKU on a shelf.",
      evidenceLevel: "tested",
    },
    {
      rank: 2,
      name: "DriveX 8S",
      brand: "Victor",
      priceUsd: 189,
      productId: "vic-drivex-8s",
      bestFor: "Even-balance doubles without Yonex Tour branding",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "DriveX 8S is the Victor answer when you want even-balance drive speed and your shop is Victor-heavy. It is not a 12-series clone; treat it as a club doubles frame that stays recoverable on defence, not as a smash stick.",
      tradeoff: "Fewer demo units than Yonex Tour in Ireland. Confirm the exact 4U/G5 SKU — Victor regional codes wander.",
      evidenceLevel: "specs",
    },
    {
      rank: 3,
      name: "Halbertec 8000 (战戟 8000)",
      brand: "Li-Ning",
      priceUsd: 165,
      productId: "ln-halbertec-8000",
      bestFor: "Pocketing control instead of Astrox smash mass",
      specs: [
        { label: "Weight", value: "3U / 4U" },
        { label: "Balance", value: "Even" },
        { label: "Shaft flex", value: "Medium" },
      ],
      why: "Halbertec 8000 is the control cousin in Li-Ning's Tectonic line — longer contact, less 'hit and hope' than AxForce. If your game is placement and mid-court blocks, this $165 frame is a more honest buy than a $195 head-heavy Tour you cannot time.",
      tradeoff: "Not a smash racket. Players who live at the rear court will call it dead. That is the point of the line, not a QC failure.",
      evidenceLevel: "specs",
    },
    {
      rank: 4,
      name: "Brave Sword 12",
      brand: "Victor",
      priceUsd: 165,
      productId: "vic-brave-sword-12",
      bestFor: "Thin-beam speed on a mid-club budget",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light to even" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "BS12 is still the reference thin-beam Victor for players who want aero speed without Nanoflare 1000 Z money. Useful as a second frame in a doubles bag when the first is head-heavy.",
      tradeoff: "Sweet spot is less generous than a boxy Astrox. Late contact on clears will expose you. Demo before you retire a forgiving Tour frame.",
      evidenceLevel: "specs",
    },
    {
      rank: 5,
      name: "Nanoflare 800 Pro Tour",
      brand: "Yonex",
      priceUsd: 165,
      productId: "yy-nanoflare-800-pro-tour",
      bestFor: "Head-light speed below 1000 Z pricing",
      specs: [
        { label: "Weight", value: "4U" },
        { label: "Balance", value: "Head-light" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "If you already know you want Nanoflare speed but 1000 Z is the next tax bracket, 800 Pro Tour is the in-family step. It will not feel like my current doubles 1000 Z — Z-axis repulsion is the gap — but it is a real speed frame, not a Play-tier colourway.",
      tradeoff: "Stiff enough to punish a late drive. If 700 Play still feels like the right effort, stay there; this Tour is for players who already whip a head-light frame.",
      evidenceLevel: "specs",
    },
    {
      rank: 6,
      name: "Bladex 900 New (锋影 900 New)",
      brand: "Li-Ning",
      priceUsd: 170,
      productId: "ln-bladex-900-new",
      bestFor: "Speed-control Li-Ning alternative to Nanoflare Tour",
      specs: [
        { label: "Weight", value: "4U / 5U" },
        { label: "Balance", value: "Even to head-light" },
        { label: "Shaft flex", value: "Stiff" },
      ],
      why: "Bladex 900 New is the Li-Ning speed-control pick in this band when Yonex Tour is out of stock. Compare it to Nanoflare 800 Pro Tour on swing speed, not to AxForce smash mass.",
      tradeoff: "Regional naming (New vs older 900) is messy. Confirm the factory code with the retailer so you do not pay 900 New money for an older batch.",
      evidenceLevel: "specs",
    },
  ],
  faqs: [
    {
      q: "Is a $200 cap a real Pro substitute?",
      a: "No. 88S Pro 2024, 77 Pro, and Nanoflare 1000 Z still sit above this list. Under $200 you are choosing Tour/Halbertec/DriveX geometry, not flagship extra-stiff shafts.",
    },
    {
      q: "Why is 88D Tour on a 'best of' if you prefer the Pro?",
      a: "Because shoppers land on this URL looking for 88D at Tour money. The honest review is: I have hit it, it is heavier than Pro, and most players should wait for a Pro sale. Leaving it off the page would hide that warning.",
    },
    {
      q: "Should I use the finder or this list?",
      a: "This list is a buying essay for a budget cap. The finder still wins if your shoulder, discipline, or grip size is the actual constraint — budget is only one of five score factors.",
    },
  ],
  essays: [
    {
      heading: "Why this is not a catalogue dump",
      body: "The previous version of this URL sliced every racket under $200 from the database and filled why/tradeoff from a template. That is automatically generated content without curation — exactly the inventory-value pattern we removed.\n\nThese six are chosen because they answer different roles: heavier Astrox smash (88D Tour, with a skip warning), even-balance Victor (DriveX 8S), pocketing Li-Ning (Halbertec 8000), thin-beam speed (Brave Sword 12), Nanoflare-family speed (800 Pro Tour), and a Li-Ning speed-control alternative (Bladex 900 New). If your role is none of those, run the finder instead of forcing a $199 SKU.",
    },
  ],
  ctaHeading: "Cap the finder at $200 and compare roles",
  ctaBody:
    "A $195 Tour frame against a $160 budget still appears with a stretch warning. That is more honest than a 12-row price table.",
};

export default function RacketsUnder200Page() {
  return <BestPicksPage config={config} />;
}
