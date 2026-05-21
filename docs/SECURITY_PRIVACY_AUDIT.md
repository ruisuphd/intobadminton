# Security, Privacy, and Legal Risk Audit

Last reviewed: 2026-04-28.

This is an engineering audit, not legal advice.

## High-risk findings addressed

- **AdSense/CMP risk:** AdSense no longer loads from consent alone. It requires `NEXT_PUBLIC_ADSENSE_MODE=cmp_tcf`, a configured client, a slot, and user ad consent.
- **Cookie dark-pattern risk:** The banner now gives a prominent reject option and keeps non-essential storage off by default.
- **Storage transparency:** Cookie settings and the cookie policy now list necessary, analytics, advertising, and personalization storage categories.
- **Copyright/source risk:** Blog and guide content is original analysis. Third-party review evidence remains metadata-summary/link-only unless rights allow more.
- **Security reporting:** Added `/.well-known/security.txt` and a public security page.
- **Static-hosting headers:** Added Cloudflare/Netlify-style `_headers` and Firebase Hosting header configuration.

## Remaining production blockers

- Company identity and contact now use Intonation Labs Pte. Ltd. and `info@intonationlabs.com`; add a public registration number and street/service address if counsel requires it.
- Add a Google-certified CMP/IAB TCF integration before enabling AdSense for EEA/UK/Switzerland users.
- Validate the CSP in report-only mode before enforcing it with live AdSense/GA4.
- Decide whether GitHub Pages is enough. For meaningful security headers, put Cloudflare in front or use Firebase Hosting/another host that supports headers.
- Do not enable accounts, public reviews, email capture, affiliate redirects, or backend ingestion until privacy notices and moderation workflows cover them.

## Cybersecurity checklist

- Enforce HTTPS on the custom domain.
- Add HSTS only after the domain and subdomains are stable on HTTPS.
- Keep `NEXT_PUBLIC_ADSENSE_MODE=disabled` until CMP is ready.
- Keep `NEXT_PUBLIC_GA_MEASUREMENT_ID`, AdSense client, and slots out of non-production previews unless intended.
- Run `npm audit --json` before production dependency updates and review findings.
- Keep user-generated content local-only until moderation, abuse reporting, deletion, and export workflows exist.

## Dependency audit note

`npm audit --json` currently reports **2 moderate transitive advisories**:

1. **`postcss` < 8.5.10** — bundled via Next.js. The advisory is for a CSS
   stringification XSS path that affects build-time output when the build
   ingests untrusted CSS. `npm audit fix --force` suggests a breaking
   downgrade to Next 9, which is **not** a safe remediation path for this
   Next 16 app. Keep Next.js updated and monitor the advisory. The current
   static app does not accept user-submitted CSS or render arbitrary CSS
   strings at runtime, which reduces practical exposure to near zero.

2. **`brace-expansion`** — bundled via `@typescript-eslint`'s transitive
   tree, a devDependency only. The advisory is a regex DoS on extremely
   large numeric ranges; not exploitable in our use, which only runs
   ESLint at developer/CI time on a fixed code corpus.

**Accepted-risk rationale:** both advisories are transitive moderate-severity
issues in dependency chains we do not control directly. The available
`npm audit fix --force` actions would downgrade direct dependencies
(`next` to 9.x in the first case) past the project's framework version,
breaking the runtime build. No production exposure has been identified
for either advisory under the static-export / no-runtime-CSS shape of the
current site. Re-audit and re-evaluate on every Next.js minor version
bump and on every quarterly security review.

Last `npm audit` review: 2026-05-21 (Sprint 8).

## Retention strategy

Use ethical retention loops:

- updated blog/guides;
- saved local history;
- transparent methodology;
- compare workflows;
- first-party review drafts.

Avoid manipulative loops:

- fake urgency;
- forced consent;
- disguised sponsored placement;
- infinite-scroll dark patterns;
- emotionally coercive copy;
- copying community reviews to create artificial content volume.
