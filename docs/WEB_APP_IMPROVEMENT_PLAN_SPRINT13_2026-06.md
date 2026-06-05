# Web App Improvement Plan — Sprint 13 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3ef7`  
**Baseline:** Sprint 12 — related shelves on `/best/*`, updates feed methodology, HelpfulReaction API-off UX, PWA `ib-v7`.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 13 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | PDP cross-sells and spec tables | ✅ Related reading shelf on `/product/[id]/` |
| **RacketGuide / retailer tools** | Calculators in install surface | ✅ PWA precaches `/tools/` + manifest shortcut |
| **Wirecutter** | FAQ trust on commercial journeys | ✅ `/faq/` in Lighthouse CI + PWA precache |
| **BadmintonCentral** | Buying guides keep threads alive | ✅ Explainer review slugs map to editorial clusters |
| **RTINGS methodology** | Internal links from spec pages | ✅ Extended `PATH_CLUSTER` on strings/doubles/under-200 |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 13)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Product PDP has no related reading shelf** | Weak cross-linking from high-intent spec pages | ✅ `relatedReadingForProductCategory` + `ProductDetailPage` shelf |
| 2 | **13 explainer reviews lack decision-path patterns** | Dead-end editorial URLs (~9% of archive) | ✅ `REVIEW_CLUSTER_PATTERNS` for how-to / glossary / depreciation slugs |
| 3 | **`/best/strings/`, `/best/doubles-rackets/`, `/best/rackets-under-200/` unmapped** | Best-of landings miss Keep reading | ✅ `PATH_CLUSTER` entries |
| 4 | **PWA omits tools + FAQ shells** | Offline users lose calculators and trust FAQ | ✅ `ib-v8` precaches `/tools/`, `/faq/` |
| 5 | **No e2e for PDP shelf + explainer shelves** | Regressions undetected | ✅ `pdp-shelf-smoke`, `review-shelf-smoke` explainer case |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PDP + explainer related reading | `src/lib/related-content.ts`, `related-content.test.ts`, `ProductDetailPage.tsx` |
| Best-of cluster coverage | `src/lib/related-content.ts` |
| PWA offline expansion | `public/sw.js` (`ib-v8`), `manifest.webmanifest`, `src/app/offline/page.tsx` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/pdp-smoke.spec.ts`, `e2e/review-shelf-smoke.spec.ts` |
| Sprint 12 doc conflict | `docs/WEB_APP_IMPROVEMENT_PLAN_SPRINT12_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 12 deferred list + competitive audit | ✅ |
| 2 | Related clusters only link to existing static routes | ✅ |
| 3 | PDP shelf excludes current product path | ✅ |
| 4 | Explainer slug patterns tested (no false empty shelves) | ✅ |
| 5 | Static export — no new dynamic routes | ✅ |
| 6 | PWA cache version bumped (`ib-v8`) when URLs change | ✅ |
| 7 | Unit tests: related-content, pwa-precache | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set includes `/faq/` | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/pdp-smoke.spec.ts e2e/review-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Deferred (Sprint 14+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Intentional explainer slugs without single catalogue SKU (no forced product map)
