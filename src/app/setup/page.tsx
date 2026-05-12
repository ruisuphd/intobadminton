import type { Metadata } from "next";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Commercial launch setup",
  description:
    "Operator checklist for AdSense, analytics, privacy, security, and launch readiness.",
  alternates: { canonical: "/setup/" },
  robots: { index: false, follow: true },
};

const setupItems = [
  {
    area: "Identity",
    action:
      `Listed operator as ${companyInfo.operatorLegalName} with ${companyInfo.contactEmail}. Add a registered street/service address only if legal counsel requires it.`,
    owner: "You",
  },
  {
    area: "Google AdSense",
    action:
      "Create/approve an AdSense account, add the site, verify ownership, then replace ads.txt with the exact publisher line.",
    owner: "You",
  },
  {
    area: "Consent",
    action:
      "Choose and configure a Google-certified CMP/IAB TCF flow before setting NEXT_PUBLIC_ADSENSE_MODE=cmp_tcf.",
    owner: "You + developer",
  },
  {
    area: "Analytics",
    action:
      "Create a GA4 property, set NEXT_PUBLIC_GA_MEASUREMENT_ID, and define conversions for quiz completion and compare-add.",
    owner: "You",
  },
  {
    area: "Search",
    action:
      "Verify the custom domain in Google Search Console and submit sitemap.xml.",
    owner: "You",
  },
  {
    area: "Security",
    action:
      "Use Cloudflare/Firebase or another host that can enforce security headers; test CSP before enforcement.",
    owner: "You + developer",
  },
] as const;

export default function SetupPage() {
  return (
    <main className="flex-1 py-16">
      <div className="layout-band max-w-5xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Commercial launch setup
        </h1>
        <p className="mt-3 max-w-3xl text-[var(--color-muted)]">
          This app can run as a static commercial site, but revenue and legal
          readiness depend on external setup you control. Keep AdSense disabled
          until the consent and policy requirements are actually satisfied.
        </p>
        <div className="mt-8 overflow-x-auto card">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead className="border-b border-[color:var(--line-strong)] text-[var(--text)]">
              <tr>
                <th className="p-4">Area</th>
                <th className="p-4">Action</th>
                <th className="p-4">Owner</th>
              </tr>
            </thead>
            <tbody className="text-[var(--color-muted)]">
              {setupItems.map((item) => (
                <tr
                  key={item.area}
                  className="border-b border-[color:var(--line)] last:border-0"
                >
                  <td className="p-4 font-medium text-[var(--text)]">
                    {item.area}
                  </td>
                  <td className="p-4">{item.action}</td>
                  <td className="p-4">{item.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
