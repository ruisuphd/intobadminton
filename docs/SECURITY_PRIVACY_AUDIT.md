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

`npm audit --json` currently reports a moderate PostCSS advisory through Next's
bundled dependency tree. `npm audit` suggests a breaking downgrade to Next 9,
which is not a safe remediation path for this Next 16 app. Keep Next updated and
monitor the advisory; the current static app does not accept user-submitted CSS
or render arbitrary CSS strings, which reduces practical exposure.

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
