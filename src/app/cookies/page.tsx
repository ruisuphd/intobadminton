import type { Metadata } from "next";
import { consentAuditSummary } from "@/lib/consent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "IntoBadminton Cookie Policy — cookie and local storage categories, default consent state, third parties, and how to change your choices.",
  alternates: { canonical: "/cookies/" },
};

export default function CookiesPage() {
  const rows = consentAuditSummary();

  return (
    <main className="flex-1 py-16">
      <article className="layout-band max-w-3xl space-y-5 text-[var(--color-muted)]">
        <h1 className="text-3xl font-semibold text-[var(--text)]">
          Cookie Policy
        </h1>
        <p className="text-sm uppercase tracking-wide text-[var(--color-subtle)]">
          Last updated 6 May 2026
        </p>
        <p>
          This Cookie Policy explains how IntoBadminton (&quot;we&quot;,
          &quot;us&quot;) uses cookies and similar local-storage technologies
          when you visit intobadminton.com. It should be read alongside our{" "}
          <a href="/privacy/" className="text-[var(--color-accent)] underline">
            Privacy Policy
          </a>{" "}
          and our{" "}
          <a href="/terms/" className="text-[var(--color-accent)] underline">
            Terms of Service
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          What cookies and local storage are
        </h2>
        <p>
          Cookies are small text files stored in your browser when you visit a
          website. Local storage is a related browser feature that lets a
          site keep small pieces of data — like your finder profile or your
          compare list — on your device without sending it to a server. Both
          help websites remember preferences, personalise experiences, and
          measure performance. Cookies and local storage entries can be set
          by IntoBadminton itself (first-party) or by services we embed
          (third-party).
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Our consent baseline
        </h2>
        <p>
          We operate a strict global consent baseline: non-essential
          analytics and advertising storage are off by default until you
          explicitly choose otherwise from the cookie banner or the Cookie
          settings link in the footer. This applies to all visitors, not
          just those in the EEA, UK, or Switzerland. Necessary storage
          required to operate the site, like remembering your finder
          profile or your consent choice itself, is always on.
        </p>

        <div className="overflow-x-auto card">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="border-b border-[color:var(--line-strong)] text-[var(--text)]">
              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Default</th>
                <th className="p-4">Storage/access</th>
                <th className="p-4">Third parties</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.category}
                  className="border-b border-[color:var(--line)] last:border-0"
                >
                  <td className="p-4 font-medium text-[var(--text)]">
                    {row.category}
                  </td>
                  <td className="p-4">{row.defaultState}</td>
                  <td className="p-4">{row.storage}</td>
                  <td className="p-4">{row.thirdParties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Necessary local storage
        </h2>
        <p>
          Necessary storage powers core finder behaviour. We keep your quiz
          profile so you can rerun results without re-answering, your
          compare list so it survives a page reload, your recent shortlists
          for quick reference, your theme preference, your consent choice,
          and any local review drafts you create. None of this is sent to
          a server, and none of it requires third-party scripts. Disabling
          necessary storage in your browser will break basic site functions.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Analytics cookies
        </h2>
        <p>
          If you opt in to analytics, we load Google Analytics 4 to measure
          which pages, finder questions, and recommendation cards visitors
          actually use, plus Web Vitals to monitor loading speed and layout
          stability. We use this data in aggregate to improve the site. You
          can disable analytics at any time from the Cookie settings link
          in the footer; doing so prevents new analytics events from being
          collected from your browser going forward.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Advertising cookies
        </h2>
        <p>
          If advertising is enabled and configured for your region, we may
          load Google AdSense and its associated ad-measurement cookies.
          Google and its partners may use cookies to serve personalised or
          non-personalised advertising based on your visits to this and
          other sites. In the EEA, UK, and Switzerland, personalised ads
          require a Google-certified Consent Management Platform (CMP)
          integrated with the IAB Transparency &amp; Consent Framework
          (TCF); until that is operational, advertising remains
          non-personalised or disabled in those regions.
        </p>
        <p>
          You can manage Google ad personalisation directly at{" "}
          <a
            href="https://adssettings.google.com/"
            className="text-[var(--color-accent)] underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            adssettings.google.com
          </a>
          , and you can opt out of third-party advertising cookies through
          industry tools such as the{" "}
          <a
            href="https://optout.aboutads.info/"
            className="text-[var(--color-accent)] underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            DAA opt-out page
          </a>{" "}
          and the{" "}
          <a
            href="https://www.youronlinechoices.eu/"
            className="text-[var(--color-accent)] underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            EDAA Your Online Choices
          </a>{" "}
          page.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Changing or withdrawing your choices
        </h2>
        <p>
          You can reopen the Cookie settings dialog from the link at the
          bottom of every page on IntoBadminton and accept or reject any
          non-essential category at any time. Rejecting non-essential
          storage does not delete the local finder data you have already
          saved. To clear that data, use your browser&apos;s site-data
          controls or the review export/delete tools that ship with the
          finder. You can also block or delete cookies entirely through
          your browser&apos;s settings; instructions are available in the
          help pages of Chrome, Safari, Firefox, Edge, and other major
          browsers.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Updates to this Cookie Policy
        </h2>
        <p>
          We may update this Cookie Policy when we add or change a
          third-party service, when consent rules in your region change,
          or when we adjust our default consent baseline. The &quot;Last
          updated&quot; date at the top of the page reflects the most
          recent revision. Material changes are summarised in our release
          notes when applicable.
        </p>

        <h2 className="text-xl font-semibold text-[var(--text)]">
          Contact about cookies
        </h2>
        <p>
          For questions about this Cookie Policy, the categories above, or
          how to exercise your data subject rights, please email us via
          the{" "}
          <a href="/contact/" className="text-[var(--color-accent)] underline">
            Contact Us
          </a>{" "}
          page or read our full{" "}
          <a href="/privacy/" className="text-[var(--color-accent)] underline">
            Privacy Policy
          </a>
          .
        </p>
      </article>
    </main>
  );
}
