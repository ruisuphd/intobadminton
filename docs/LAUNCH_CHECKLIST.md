# Launch checklist

## Legal and company

- Replace `YOUR_DOMAIN`, `support@YOUR_DOMAIN`, and `privacy@YOUR_DOMAIN`.
- Add company legal name, registration number if applicable, and privacy/DPO contact.
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

- Replace sitemap host and submit Search Console.
- Add GA4 property and AdSense channels by page type.
- Avoid purchased/low-quality/incentivized traffic.
- Monitor Core Web Vitals and invalid traffic warnings.

## Security

- Add Firebase/hosting headers where supported.
- Keep dependencies updated; do not apply destructive `npm audit fix --force` downgrades.
- Do not commit secrets.
