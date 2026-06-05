# Web App Improvement Plan — Sprint 12 (June 2026)

**Branches:** PR #158 (merged to `main`) + PR #157 (profile fit, catalog sort, review filters)  
**Baseline:** Sprint 11 — PWA `ib-v5`, review map ~91%, compare share init, reactions Pages secret.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 12 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Related picks + personalized browse sort | ✅ `PATH_CLUSTER` on `/best/*`; catalog **Best fit for you** sort |
| **RacketGuide** | Fit preview on product pages + offline recovery | ✅ PDP/review panels use saved profile; `/offline/` + `/guides/` shortcut |
| **Wirecutter / RTINGS** | Filterable review archive + methodology trust | ✅ Reviews hub search + chips; `/methodology/` in updates feed |
| **Retailer finders** | Offline guides + shareable shortlists | ✅ PWA `ib-v7` precaches editorial + commercial shells; share URL e2e |
| **BadmintonCentral** | Helpful counts on threads | ✅ API-off editorial prompt (no empty shell); reactions URL still owner secret |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 12 — combined)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **PDP/review fit uses reference profile only** | Weak personalization on highest-intent pages | ✅ `ReviewProductPanel` + `profile-ready.ts` (PR #157) |
| 2 | **Catalog lacks personalized sort** | Browse UX lags TW/RacketGuide | ✅ `fit-desc` sort when profile ready (PR #157) |
| 3 | **Reviews hub is flat chronological** | Poor discovery vs Wirecutter browse | ✅ `ReviewsIndexClient` filters (PR #157) |
| 4 | **Best-of pages lack “Keep reading” shelf** | Internal linking on high-intent landings | ✅ Extended `PATH_CLUSTER` (PR #158) |
| 5 | **PWA omits guides + claims shells** | Offline users miss key flows | ✅ `ib-v7` precaches `/guides/`, `/data/`, `/methodology/`, `/review/`, `/offline/` |

Additional shipped: HelpfulReaction API-off UX, `/methodology/` in updates feed, share URL round-trip e2e, moat-page e2e smoke.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Profile-aware fit panels | `src/lib/profile-ready.ts`, `ReviewProductPanel.tsx`, `ProductDetailPage.tsx` |
| Catalog best-fit sort | `catalog-url.ts`, `CatalogClient.tsx` |
| Reviews hub filters | `review-hub-filters.ts`, `ReviewsIndexClient.tsx` |
| Related reading clusters | `src/lib/related-content.ts`, `related-content.test.ts` |
| Updates feed completeness | `src/lib/editorial-meta.ts`, `editorial-updates.ts` |
| HelpfulReaction API-off UX | `src/lib/helpful-reaction-ui.ts`, `HelpfulReaction.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v7`), `manifest.webmanifest`, `src/app/offline/` |
| E2E regression | `results-share-smoke`, `reviews-hub-smoke`, `data-updates-smoke`, `review-shelf-smoke`, `pwa-offline-smoke` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 11 deferred list + competitive audit | ✅ |
| 2 | Personalized fit falls back to reference when profile incomplete | ✅ |
| 3 | `fit-desc` invalid without profile → price-asc fallback | ✅ |
| 4 | Review filters do not hide mapped SKUs incorrectly | ✅ unit tests |
| 5 | Static export — no new dynamic routes beyond `/offline/` | ✅ |
| 6 | PWA cache version bumped (`ib-v7`) when URLs change | ✅ |
| 7 | Unit tests: profile-ready, review-hub-filters, related-content, pwa-precache | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set excludes noindex routes; includes methodology + guides | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/results-share-smoke.spec.ts e2e/reviews-hub-smoke.spec.ts e2e/data-updates-smoke.spec.ts e2e/review-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Deferred (Sprint 13+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Catalog keyword search (`q` param on `/catalog/`)
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Remaining explainer slugs without single catalogue SKU (intentional ~9%)
