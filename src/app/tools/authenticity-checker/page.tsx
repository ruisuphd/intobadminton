import type { Metadata } from "next";
import Link from "next/link";
import { AuthenticityChecker } from "@/components/AuthenticityChecker";
import { JsonLd } from "@/components/JsonLd";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title:
    "Badminton racket authenticity checker — 5-step counterfeit triage tool",
  description:
    "Free interactive 5-step authenticity check for Yonex, Victor, Li-Ning and other premium badminton rackets. Score the seller, the barcode, the cone cap, the grommets, and the warranty path to spot a counterfeit before you buy.",
  alternates: { canonical: "/tools/authenticity-checker/" },
};

export default function AuthenticityCheckerToolPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${companyInfo.siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${companyInfo.siteUrl}/tools/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Authenticity checker",
        item: `${companyInfo.siteUrl}/tools/authenticity-checker/`,
      },
    ],
  };

  // HowTo schema — the 5-step checker is a literal how-to. Surfaces in
  // Google's HowTo rich result on supported queries (counterfeit-detection
  // queries are high-intent and the rich result is rarely contested).
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to spot a counterfeit badminton racket in 5 steps",
    description:
      "Score five buyer-decision signals to triage whether a Yonex, Victor, Li-Ning or other premium racket is likely genuine before you pay.",
    totalTime: "PT5M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Verify the seller",
        text: "Confirm the seller is a manufacturer-authorized retailer or a long-standing pro shop — not a marketplace listing or social-media seller with no shop name.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Inspect the barcode / region label",
        text: "Yonex and Victor frames ship with a region-specific barcode label on the cone. Missing, peeling, or duplicated barcodes are a strong red flag.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Check the cone cap and graphics",
        text: "Compare the cone cap font, badge alignment, and graphic placement against the official product page. Counterfeits frequently miss this detail by 1-2mm.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Inspect the grommets and T-joint",
        text: "Genuine rackets use precision grommets that sit flush. Loose, misaligned, or asymmetric grommets indicate a refurbished or counterfeit frame.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Confirm warranty + region match",
        text: "Cross-reference the claimed region with the brand's official warranty portal. A China-spec frame sold as a Japan-spec frame is a common counterfeit pattern.",
      },
    ],
  };

  return (
    <main className="flex-1 py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={howToJsonLd} />
      <div className="layout-band max-w-4xl">
        <nav
          className="text-xs text-[var(--color-subtle)]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--text)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tools/" className="hover:text-[var(--text)]">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">Authenticity checker</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-display text-[var(--text)]">
            Badminton racket authenticity checker
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Counterfeit risk for high-end Yonex, Victor and Li-Ning rackets is
            real — and the cheaper the listing, the higher the risk. This
            five-step triage scores the signals that matter most:{" "}
            <strong className="text-[var(--text)]">seller channel</strong>,{" "}
            <strong className="text-[var(--text)]">barcode label</strong>,{" "}
            <strong className="text-[var(--text)]">cone cap</strong>,{" "}
            <strong className="text-[var(--text)]">grommets</strong>, and{" "}
            <strong className="text-[var(--text)]">warranty path</strong>.
            Answer yes / no / unsure to each and the verdict band tells you
            whether the racket is likely genuine, borderline, or worth
            walking away from.
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Want the full reasoning behind each step? Read the{" "}
            <Link
              href="/guides/equipment-authenticity/"
              className="text-[var(--color-accent)] underline"
            >
              detailed equipment authenticity guide
            </Link>
            .
          </p>
        </header>

        <section className="mt-10">
          <AuthenticityChecker />
        </section>

        <section className="mt-12 card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            When to skip this tool
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-muted)]">
            <li>
              You bought from the brand&apos;s own online store — the seller
              question already passes. Use the detailed guide if you want
              line-by-line verification anyway.
            </li>
            <li>
              The frame is &lt; 30% of its expected retail price. That price
              gap alone is a sufficient red flag; this triage is for borderline
              listings where the price looks plausible.
            </li>
            <li>
              You already have community-verified authentication (BadmintonCN
              auth thread, a known stringer&apos;s sign-off). The triage adds
              little signal over an explicit human check.
            </li>
          </ul>
        </section>

        <section className="mt-8 card p-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            Related tools and guides
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-muted)]">
            <li>
              <Link
                href="/guides/equipment-authenticity/"
                className="text-[var(--color-accent)] underline"
              >
                Equipment authenticity guide
              </Link>{" "}
              — the full checklist behind every step.
            </li>
            <li>
              <Link
                href="/tools/string-tension-calculator/"
                className="text-[var(--color-accent)] underline"
              >
                String tension calculator
              </Link>{" "}
              — recommended starting tension for your level.
            </li>
            <li>
              <Link
                href="/tools/racket-balance-explainer/"
                className="text-[var(--color-accent)] underline"
              >
                Racket balance explainer
              </Link>{" "}
              — head-heavy vs head-light spectrum visualised.
            </li>
            <li>
              <Link
                href="/tools/"
                className="text-[var(--color-accent)] underline"
              >
                Back to all tools
              </Link>
              .
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
