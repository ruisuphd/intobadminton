# Web App Improvement Plan — Sprint 3 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-22e9`  
**Baseline:** Sprint 2 in [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md).

---

## 1. Competitive audit (fresh pass)

| Competitor pattern | IntoBadminton (post–Sprint 2) | Remaining gap |
|--------------------|-------------------------------|---------------|
| Tennis Warehouse catalog search | Editorial search + finder | Catalog SKUs not in search index |
| Wirecutter commercial pages | Disclosure on `/review/*` only | `/best/*` and compare guides lack in-article FTC block |
| RTINGS article UX | Share + reactions on reviews + guides | Best-of and compare guides missing engagement footer |
| Retailer PDP filters | Profile-scored `/results/` | No brand filter on shortlist |
| YouTube / original photos | — | Still editorial pipeline (deferred) |

**Moat unchanged:** fit-score transparency, postbuild SEO gate, claims CI, static export.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 3 |
|---|-----|--------|----------|
| 1 | **Catalog products missing from site search** | Discovery, SearchAction depth | ✅ `product` kind + `products.json` rows |
| 2 | **No kind filter on search results** | Scan speed vs Tennis Warehouse facets | ✅ chip filters on `/search/` |
| 3 | **Affiliate disclosure absent on `/best/*` and compare** | AdSense / FTC on commercial URLs | ✅ `InArticleAffiliateDisclosure` |
| 4 | **Engagement chrome uneven on commercial long-form** | Pages per session | ✅ compare guides + `ArticleEngagementFooter` |
| 5 | **Results shortlist lacks brand filter** | Retention after quiz | ✅ brand chips on `/results/` |

### Deferred (Sprint 4+)

- Original `public/products/` photography
- HelpfulReaction Workers/KV aggregates
- Buttondown notify-me backend
- VideoObject + claimed YouTube `sameAs`
- Faceted search over spec fields (weight, balance, price band)

---

## 3. Execution summary

1. `src/lib/site-search.ts` — `productEntries()` from `reviewableProducts()`, kind `product`.
2. `src/components/SiteSearch.tsx` — optional kind filter chips.
3. `InArticleAffiliateDisclosure` on `BestPicksPage` and `CompareGuidePage` after `EditorialNotice`.
4. `ArticleEngagementFooter` on `CompareGuidePage` (best-of already had it on main).
5. `src/app/results/ResultsClient.tsx` — brand filter chips (client-side, static-export safe).

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in code audit vs Q2 + Sprint 1–2 | ✅ |
| 2 | Product search links resolve (`reviewPath` or product id path) | ✅ |
| 3 | Search index size grows without duplicate hrefs | ✅ |
| 4 | Kind filter does not break empty-query UX | ✅ |
| 5 | Affiliate marker present on best + compare HTML | ✅ |
| 6 | Engagement footer skips hub index pages only | ✅ |
| 7 | Results brand filter preserves profile scoring order | ✅ |
| 8 | `site-search.test.ts` covers catalog lookup | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| SearchAction utility | Catalog + editorial in one index |
