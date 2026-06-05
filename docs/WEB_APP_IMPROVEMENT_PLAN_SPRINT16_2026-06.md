# Web App Improvement Plan — Sprint 16 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-01ae`  
**Baseline:** Sprint 15 — hub shelves on compare-guides, guides, search, saved; PWA `ib-v10`.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 16 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Filter + keyword search on catalogue | ✅ `/catalog/?q=` shareable keyword filter |
| **RTINGS** | Review hub → buying guides + methodology | ✅ `/review/` Keep reading shelf |
| **Wirecutter** | Editorial index routes to curated shortlists | ✅ `reviews-hub` cluster on review index |
| **RacketGuide** | Spec search within product browse | ✅ Fuzzy token match on brand, model, specs |
| **BadmintonCentral** | Forum readers need next-step commerce paths | ✅ Review index → best-of, compare, finder |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 16)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Catalog lacks keyword search** | Retailer parity; spec browse dead-ends without model lookup | ✅ `q` URL param + search input on `/catalog/` |
| 2 | **`/review/` index lacks decision-path shelf** | 146-article grid has no editorial exit | ✅ `reviews-hub` cluster + Keep reading shelf |
| 3 | **HelpfulReaction KV aggregates** | Social proof on guides/reviews | ⏳ Owner: deploy worker + `REACTIONS_API_URL` |
| 4 | **Original photography on commercial URLs** | AdSense + experience signal | ⏳ Editorial pipeline |
| 5 | **YouTube `sameAs` on author entity** | Video-rich results | ⏳ Channel claim pending |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog keyword filter | `src/lib/catalog-keyword.ts`, `catalog-keyword.test.ts` |
| Shareable `q` param | `src/lib/catalog-url.ts`, `catalog-url.test.ts`, `CatalogClient.tsx` |
| Reviews-hub cluster | `src/lib/related-content.ts`, `related-content.test.ts` |
| Review index shelf | `src/components/ReviewsIndex.tsx` |
| E2E regression | `e2e/catalog-keyword-smoke.spec.ts`, `e2e/hub-shelf-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 15 deferred list + competitive audit | ✅ |
| 2 | Keyword filter reuses existing fuzzy token helper | ✅ |
| 3 | `q` round-trips in shareable catalog URLs | ✅ |
| 4 | Reviews-hub links only to existing static routes | ✅ |
| 5 | Shelf excludes current path (`/review/`) | ✅ |
| 6 | Static export — no new dynamic routes | ✅ |
| 7 | Unit tests: catalog-keyword, catalog-url, related-content | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | E2E: catalog keyword + review shelf smoke | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/catalog-keyword-smoke.spec.ts e2e/hub-shelf-smoke.spec.ts
```

---

## 6. Deferred (Sprint 17+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Site search → catalog deep-link with `q` prefill
