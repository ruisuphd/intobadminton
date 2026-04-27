# Backend decision

## Decision

Use **Firebase / Google Cloud** for the next production backend phase:

- Firebase Hosting or Firebase App Hosting for the web app.
- Firebase Auth for optional accounts / magic-link style sign-in.
- Firestore for early product, source, evidence, first-party review, and user profile data.
- Cloud Functions or Cloud Run Jobs for ingestion and scheduled aggregation.
- Google Analytics 4 and Search Console for funnel and SEO measurement.

## Why this over GitHub Pages alone

GitHub Pages is still useful for a static prototype, but the long-term product needs:

- first-party reviews and moderation;
- user accounts and saved equipment;
- a source-rights registry;
- ingestion jobs;
- analytics and ad-channel measurement;
- editorial review queues.

Those are backend responsibilities. Firebase keeps early operational complexity low and matches the company-owned Google/AdSense billing path.

## Firestore collections

| Collection | Purpose |
|------------|---------|
| `products` | Canonical product records migrated from `src/data/products.json`. |
| `sources` | Source-rights registry, terms status, crawl method, last checked. |
| `rawEvidence` | Source URL + metadata; no full copied third-party UGC unless permitted. |
| `reviewSignals` | Normalized themes/sentiment/confidence from permitted evidence. |
| `productAggregates` | Computed confidence, durability, stiffness, comfort, speed scores. |
| `productAliases` | English/Chinese/Japanese/Korean brand/model aliases. |
| `firstPartyReviews` | Moderated user-submitted reviews with consent. |
| `profiles` | Optional signed-in user player profiles and owned equipment. |
| `events` | Server-side event mirror when needed; GA4 remains primary for analytics. |

## Cost posture

- Start on free/low tiers where possible.
- Use a company-owned Firebase/GCP project with billing alerts.
- Keep ingestion scheduled and rate-limited.
- Store summaries, hashes, and metadata rather than expensive/raw full-text blobs by default.

## Migration path

1. Keep current static catalog as the read-only fallback.
2. Add Firebase SDK behind feature flags.
3. Mirror product JSON into Firestore.
4. Add first-party review writes with moderation status.
5. Add source/evidence/admin collections.
6. Move scoring to a shared server/client module once backend signals are live.
