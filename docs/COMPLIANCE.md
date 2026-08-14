# Compliance notes

This is an engineering checklist, not legal advice.

## Consent baseline

- Strict global default: analytics and ads denied until user choice.
- Google Consent Mode v2 defaults: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` denied.
- Global Privacy Control: treat as Do Not Sell/Share and disable advertising/personalization.
- EEA/UK/Switzerland personalized AdSense requires a Google-certified CMP integrated with IAB TCF before production use.
- `NEXT_PUBLIC_ADSENSE_MODE=cmp_tcf` gates the site's **own** `<AdSlot/>` inventory; it stays `disabled` until a compliant CMP/IAB TCF setup is live. Consent alone is not enough.
- **`ADSENSE_MODE` is not a dashboard kill switch for Auto Ads.** The loader script (`adsbygoogle.js`) can inject Auto Ads by itself if it is mounted site-wide. This repo no longer mounts that loader in the root layout. It returns null while `NEXT_PUBLIC_ADSENSE_MODE` is `disabled`, and publication templates mount it only after mode is `cmp_tcf`. Spec PDPs, quiz/results/saved/compare, catalog, and noindexed court notes must not load it.
- **Operator action (AdSense dashboard):** Ads → per-site settings → Auto ads **off** for intobadminton.com until the site is approved. Keep ads.txt and the `google-adsense-account` meta tag so Google can still verify the site. Resubmit once, on the schedule in `docs/ADSENSE_RESUBMIT.md`.
- Consent Mode defaults plus Funding Choices still constrain inventory to non-personalised before opt-in. That is weaker than "no ads render", which is why the loader stays off during review.
- The first-layer banner must keep reject/customize/accept choices similarly visible. Do not use dark patterns or pre-ticked non-essential consent.

## Source/content guardrails

- Reddit, BadmintonCN, and forum data are permission-gated.
- Do not bulk copy, translate, republish, or train on third-party UGC without rights.
- First-party reviews require consent and moderation.
- Blog and guide pages must be original analysis. Use online reviews as high-level themes, metadata, and links unless explicit rights allow excerpts.

## Minors

- Site is not directed to children under 13.
- Users under 16 should not submit reviews/personal information without parent/guardian consent.

## Data-rights workflows

- Cookie settings can be reopened from the footer.
- Review drafts can be exported/deleted locally.
- Before backend launch, add request intake for access, deletion, correction, objection, withdrawal, and portability where applicable.

## Production launch blockers

- Company identity and contact are listed as Intonation Labs Pte. Ltd. / `info@intonationlabs.com`; add a public registration number and street/service address if counsel requires it.
- Replace `public/ads.txt` placeholder only after AdSense provides the exact publisher ID.
- Configure security headers at the CDN/host layer. GitHub Pages alone cannot enforce the full header set.
- If using Cloudflare/Netlify-style hosting, review `public/_headers`. If using Firebase Hosting, review `firebase.json`.
- Document any backend, newsletter, affiliate, or email collection before enabling it.
