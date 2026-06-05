# Web App Improvement Plan — Sprint 19 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-742e`  
**Baseline:** Sprint 18 — header catalog split button + search autocomplete (PR #165).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 19 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Model search lands in filtered catalogue | ✅ Submit auto-routes when only SKUs match |
| **Running Warehouse** | SKU lookup skips editorial dead-ends | ✅ `/search/?q=` → `/catalog/?q=` redirect |
| **RTINGS** | Spec browse for unknown model strings | ✅ Same fuzzy tokens as catalog keyword filter |
| **Wirecutter** | Editorial-first for topic queries | ✅ Mixed intent still opens `/search/` |
| **RacketGuide** | Filter-first for product codes | ✅ `searchSubmitHref` + `SearchPageClient` replace |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 19)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Header search submit ignores product-only intent** | Extra hop through empty editorial search | ✅ `searchSubmitHref` + `SiteSearchForm` |
| 2 | **Static hero form cannot client-route** | Homepage SKU lookups stall on `/search/` | ✅ `SearchPageClient` catalog redirect |
| 3 | **HelpfulReaction KV aggregates** | Social proof on guides/reviews | ⏳ Owner: deploy worker + `REACTIONS_API_URL` |
| 4 | **Original photography on commercial URLs** | AdSense + experience signal | ⏳ Editorial pipeline |
| 5 | **CrUX / GSC baselines not filled** | CWV regression detection | ⏳ Owner: PageSpeed export → `crux-template.csv` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Product-intent routing helper | `src/lib/search-submit-route.ts`, `search-submit-route.test.ts` |
| Header submit uses helper | `src/components/SiteSearchForm.tsx` |
| Static form redirect | `src/app/search/SearchPageClient.tsx` |
| E2E regression | `e2e/search-product-intent-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 18 deferred list + competitive audit | ✅ |
| 2 | Reuses `countCatalogKeywordMatches` + `searchSite` editorial kinds | ✅ |
| 3 | Mixed intent (catalog + editorial) still routes to `/search/` | ✅ |
| 4 | Static hero form unchanged (no client JS on `/`) | ✅ |
| 5 | Redirect uses `router.replace` once per mount | ✅ |
| 6 | Catalog href via `catalogHrefFromKeywordQuery` | ✅ |
| 7 | Unit tests: `search-submit-route.test.ts` | ✅ |
| 8 | `npm test` green (333) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | E2E: header + search page product-intent smoke | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/search-product-intent-smoke.spec.ts
```

---

## 6. Deferred (Sprint 20+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- PWA precache bump for any new high-traffic routes
