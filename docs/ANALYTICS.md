# Analytics and quality loop

The app uses optional environment variables:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` for Google Analytics 4.
- `NEXT_PUBLIC_ADSENSE_CLIENT` for AdSense.
- `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT` for the v1 responsive display ad unit.
- `NEXT_PUBLIC_ADSENSE_MODE`; keep `disabled` until a compliant CMP/TCF deployment is live, then set `cmp_tcf`.

## Events

| Event | When |
|-------|------|
| `quiz_start` | Finder loads. |
| `quiz_step_complete` | Each funnel step advances. |
| `quiz_complete` | User reaches recommendations. |
| `recommendations_viewed` | Result list renders. |
| `compare_add` / `compare_remove` | User changes compare list. |
| `open_compare` | User opens compare from a card. |
| `first_party_review_saved` | User saves a consented local review draft. |
| Web Vitals | CLS, LCP, INP, etc. via `useReportWebVitals`. |

## Success metrics

- Quiz completion rate.
- Recommendation result click / compare-add rate.
- Return visits with saved history.
- First-party review submissions by product.
- Core Web Vitals: keep CLS low around ad slots.
- AdSense channel performance by page type once slots are configured.

## Traffic quality

Do not buy low-quality traffic or incentivize ad clicks. Monitor acquisition sources in GA4 and AdSense reports and stop suspicious campaigns immediately.

## Retention metrics

Track healthy return loops, not compulsive-use patterns:

- return visits to blog/guides;
- quiz completion rate;
- compare-add rate;
- guide-to-finder click-through;
- first-party review drafts saved locally;
- evidence/methodology page visits.
