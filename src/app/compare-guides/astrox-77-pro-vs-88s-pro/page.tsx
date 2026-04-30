import Link from "next/link";
import type { Metadata } from "next";
import { EditorialNotice } from "@/components/EditorialNotice";
import { AdSlot } from "@/components/AdSlot";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Astrox 77 Pro vs Astrox 88S Pro 2024 — which fits your timing?",
  description:
    "Both are even-balance Yonex Astrox frames. Honest comparison of shaft hardness, swing feel, and which player each suits — by a competitive player who has owned both.",
  alternates: { canonical: "/compare-guides/astrox-77-pro-vs-88s-pro/" },
};

export default function Astrox77vs88SProPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${companyInfo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Comparison guides", item: `${companyInfo.siteUrl}/compare-guides/` },
      { "@type": "ListItem", position: 3, name: "Astrox 77 Pro vs 88S Pro", item: `${companyInfo.siteUrl}/compare-guides/astrox-77-pro-vs-88s-pro/` },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="layout-band max-w-3xl space-y-6">
        <nav className="text-xs text-[var(--color-subtle)]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--text)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/compare-guides/" className="hover:text-[var(--text)]">Comparison guides</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Astrox 77 Pro vs 88S Pro</span>
        </nav>

        <header className="space-y-3">
          <h1 className="text-display text-[var(--text)]">
            Astrox 77 Pro vs Astrox 88S Pro 2024
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-muted)]">
            Both are 4U, slightly head-heavy, even-balance Yonex Astrox frames. The 77 Pro is the friendliest pro-tier upgrade Yonex makes. The 88S Pro 2024 is the market&rsquo;s current control-balance benchmark for doubles. Choose by your timing tier, not by the price tag.
          </p>
        </header>

        <EditorialNotice />

        <p className="text-sm text-[var(--color-muted)]">
          Author note: I (Rui Su, Division 4 Ireland) currently use the 88S Pro 2024 as my main racket and previously played the 77 Pro for two seasons. Both are excellent. The honest gap between them is smaller than reviewers usually claim.
        </p>

        <div className="overflow-x-auto card">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-[color:var(--line-strong)] text-[var(--text)]">
              <tr>
                <th className="p-4">Spec</th>
                <th className="p-4">77 Pro</th>
                <th className="p-4">88S Pro 2024</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-muted)]">
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Weight</td>
                <td className="p-4">4U (~83-85g)</td>
                <td className="p-4">4U (~84g unstrung)</td>
              </tr>
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Balance</td>
                <td className="p-4">Slightly head-heavy</td>
                <td className="p-4">Slight head-heavy (~301mm)</td>
              </tr>
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Shaft flex</td>
                <td className="p-4">Medium-stiff</td>
                <td className="p-4">Stiff (Namd Flex Force)</td>
              </tr>
              <tr className="border-b border-[color:var(--line)]">
                <td className="p-4 font-medium text-[var(--text)]">Frame size</td>
                <td className="p-4">Standard</td>
                <td className="p-4">Slightly larger</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[var(--text)]">Price (USD)</td>
                <td className="p-4">~$220</td>
                <td className="p-4">~$240</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-headline text-[var(--text)]">
          The honest difference: shaft hardness
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          The 77 Pro shaft loads gently — you feel the bend, you feel it snap back, and your timing window is forgiving. The 88S Pro 2024 shaft is meaningfully stiffer (mid-7s on Yuan-style measurement vs the 77 Pro&rsquo;s softer profile). When you load it cleanly, the response is crisper and faster. When your timing slips, the 88S Pro punishes it more than the 77 Pro does.
        </p>

        <h2 className="text-headline text-[var(--text)]">
          The frame: 88S Pro is bigger
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          The 88S Pro 2024 frame is a step larger than the 77 Pro and slightly larger than the original 88S Pro. The bigger frame plus thicker rim creates a longer dwell time on contact — the shuttle stays on the strings a fraction longer, which gives you more directional control on drops, slices, and net play. It also makes the racket slightly slower to recover than the 77 Pro on rapid drives.
        </p>

        <h2 className="text-headline text-[var(--text)]">
          Choose 77 Pro if
        </h2>
        <ul className="list-disc pl-5 text-base leading-relaxed text-[var(--color-muted)]">
          <li>You are a recreational-to-club player or an honest intermediate.</li>
          <li>Your contact point is still inconsistent on overheads.</li>
          <li>You play mixed disciplines and want one frame for everything.</li>
          <li>You have any shoulder, elbow, or wrist comfort flags.</li>
        </ul>

        <h2 className="text-headline text-[var(--text)]">
          Choose 88S Pro 2024 if
        </h2>
        <ul className="list-disc pl-5 text-base leading-relaxed text-[var(--color-muted)]">
          <li>You are a competitive club or league-level player.</li>
          <li>Your timing on overheads is consistent (mishit rate under 15%).</li>
          <li>Your primary discipline is doubles, especially front court or mixed.</li>
          <li>You want the current market benchmark for control-balance doubles.</li>
        </ul>

        <AdSlot id="compare-77-vs-88s-mid" />

        <h2 className="text-headline text-[var(--text)]">
          What about the 88D Pro?
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          The 88D Pro 2024 is the dedicated rear-court attack version — narrower frame, even stiffer shaft tuning, more head-heavy bias. If you smash from the back court as your primary attack pattern, choose 88D over 88S. If you switch roles or play significant front court, stay with 88S. Read the dedicated 88D Pro vs 88S Pro 2024 comparison for the deep-dive.
        </p>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-[var(--text)]">
            Still unsure? Score them through your profile
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            The finder weighs your level, role, body, and budget — both rackets will appear with explained reasons.
          </p>
          <Link href="/quiz/" className="btn-primary mt-5">
            Run the racket finder
          </Link>
        </div>

        <p className="text-sm text-[var(--color-muted)]">
          Related: <Link href="/blog/yonex-astrox-88d-pro-vs-88s-pro-2024/" className="text-[var(--color-accent)] underline">Astrox 88D Pro vs 88S Pro 2024 deep-dive</Link>.
        </p>
      </article>
    </main>
  );
}
