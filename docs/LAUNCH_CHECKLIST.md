# Launch checklist

## Legal and company

- Domain is `https://intobadminton.com`.
- Operator is listed as Intonation Labs Pte. Ltd. with `info@intonationlabs.com` for support, privacy, source-rights, and security intake.
- Add a registration number and registered street/service address if your legal counsel wants them public.
- Counsel/accountant review of privacy, cookies, terms, affiliate, and AdSense disclosures.
- Confirm minors/parental-consent stance.

## Consent and ads

- Choose Google-certified CMP before EEA/UK/Switzerland personalized AdSense.
- Verify Consent Mode v2 order in Google Tag Assistant.
- Confirm Reject non-essential prevents GA4/AdSense script requests.
- Confirm Accept analytics loads GA4 only.
- Confirm Accept ads loads AdSense only when `NEXT_PUBLIC_ADSENSE_CLIENT` is configured.
- Run a cookie scan after production deploy.

## SEO and traffic quality

- Submit `https://intobadminton.com/sitemap.xml` in Search Console.
- Add GA4 property and AdSense channels by page type.
- Avoid purchased/low-quality/incentivized traffic.
- Monitor Core Web Vitals and invalid traffic warnings.

## Security

- Add Firebase/hosting headers where supported.
- Keep dependencies updated; do not apply destructive `npm audit fix --force` downgrades.
- Do not commit secrets.
