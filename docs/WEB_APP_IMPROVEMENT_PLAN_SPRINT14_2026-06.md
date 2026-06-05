# Web App Improvement Plan — Sprint 14 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-154b`  
**Baseline:** Sprint 13 — PDP related shelf, explainer review clusters, PWA `ib-v8`, Lighthouse `/faq/`.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 14 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Brand hubs → curated picks → compare articles | ✅ Keep reading on `/brands/` and brand profiles |
| **RacketGuide** | Post-quiz “what next” links to guides | ✅ Results page decision-path shelf by category |
| **Wirecutter** | Hub pages cross-link methodology + picks | ✅ `/best/` hub shelf + freshness cluster |
| **RTINGS** | Catalog browse ↔ buying guides | ✅ `/catalog/` maps to compare cluster |
| **BadmintonCentral** | Thread continuation after gear questions | ✅ Results + catalog exit paths |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 14)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Post-quiz `/results/` has no Keep reading shelf** | High-intent users dead-end after shortlist | ✅ `relatedReadingForQuizCategory` + shelf on results |
| 2 | **`/best/` hub lacks editorial exit paths** | Hub is a grid only — weak cross-link to methodology | ✅ `PATH_CLUSTER` + `RelatedReadingShelf` |
| 3 | **`/brands/` index lacks decision-path shelf** | Brand discovery does not route to compare/best-of | ✅ `brands` cluster + shelf on `BrandsPage` |
| 4 | **`/catalog/` unmapped in related-content** | Filter browse misses guide/compare exits | ✅ `/catalog/` → compare cluster |
| 5 | **PWA omits `/best/` + `/brands/` shells** | Installed users lose hub pages offline | ✅ `ib-v9` precache + manifest “Best of” shortcut |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Quiz-category + hub clusters | `src/lib/related-content.ts`, `related-content.test.ts` |
| Results shelf | `src/app/results/ResultsClient.tsx` |
| Best hub shelf | `src/app/best/page.tsx` |
| Brands shelf | `src/components/BrandsPage.tsx` |
| Catalog shelf | `src/app/catalog/page.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v9`), `manifest.webmanifest`, `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/results-shelf-smoke.spec.ts`, `e2e/brands-shelf-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 13 deferred list + competitive audit | ✅ |
| 2 | Related clusters only link to existing static routes | ✅ |
| 3 | Shelves exclude current path | ✅ |
| 4 | Results shelf respects quiz `category` param | ✅ |
| 5 | Static export — no new dynamic routes | ✅ |
| 6 | PWA cache version bumped (`ib-v9`) when URLs change | ✅ |
| 7 | Unit tests: related-content, pwa-precache | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set includes `/best/` and `/brands/` | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/results-shelf-smoke.spec.ts e2e/brands-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Deferred (Sprint 15+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Intentional explainer slugs without single catalogue SKU (no forced product map)
