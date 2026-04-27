# Compliance notes

This is an engineering checklist, not legal advice.

## Consent baseline

- Strict global default: analytics and ads denied until user choice.
- Google Consent Mode v2 defaults: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` denied.
- Global Privacy Control: treat as Do Not Sell/Share and disable advertising/personalization.
- EEA/UK/Switzerland personalized AdSense requires a Google-certified CMP integrated with IAB TCF before production use.

## Source/content guardrails

- Reddit, BadmintonCN, and forum data are permission-gated.
- Do not bulk copy, translate, republish, or train on third-party UGC without rights.
- First-party reviews require consent and moderation.

## Minors

- Site is not directed to children under 13.
- Users under 16 should not submit reviews/personal information without parent/guardian consent.

## Data-rights workflows

- Cookie settings can be reopened from the footer.
- Review drafts can be exported/deleted locally.
- Before backend launch, add request intake for access, deletion, correction, objection, withdrawal, and portability where applicable.
