# Web App Improvement Plan — Sprint 3 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f8ee` (supersedes `22e9`, `0fb2`)  
**Baseline:** Sprint 2 in [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md).

---

## 1. Competitive audit (June 2026)

| Competitor pattern | IntoBadminton (post–Sprint 2) | Sprint 3 response |
|--------------------|-------------------------------|-------------------|
| **Tennis Warehouse catalog search** | Editorial search + finder | Catalog SKUs in search index + kind filters |
| **Wirecutter commercial pages** | Disclosure on `/review/*` only | Affiliate disclosure on `/best/*` + compare guides |
| **RTINGS article UX** | Share + reactions on reviews + guides | Engagement footer on commercial long-form |
| **Retailer PDP filters** | Profile-scored `/results/` | Brand filter on shortlist |
| **Tennis Warehouse saved lists** | Saved shelf + Buttondown | Notify-me local intent + analytics |
| **Wirecutter return modules** | Continue reading on articles | Homepage recent shortlist recall |
| **YouTube / original photos** | — | Still editorial pipeline (deferred) |

**Moat unchanged:** fit-score transparency, postbuild SEO gate, claims CI, static export.

---

## 2. Top 5 gaps (catalog/commercial track)

| # | Gap | Impact | Sprint 3 |
|---|-----|--------|----------|
| 1 | **Catalog products missing from site search** | Discovery, SearchAction depth | ✅ `product` kind + `products.json` rows |
| 2 | **No kind filter on search results** | Scan speed vs Tennis Warehouse facets | ✅ chip filters on `/search/` |
| 3 | **Affiliate disclosure absent on `/best/*` and compare** | AdSense / FTC on commercial URLs | ✅ `InArticleAffiliateDisclosure` |
| 4 | **Engagement chrome uneven on commercial long-form** | Pages per session | ✅ compare guides + `ArticleEngagementFooter` |
| 5 | **Results shortlist lacks brand filter** | Retention after quiz | ✅ brand chips on `/results/` |

### Engagement track (merged from main)

| # | Gap | Sprint 3 |
|---|-----|----------|
| 1 | Notify-me used `alert()` with no persistence | ✅ Buttondown when configured; else `notify-me.ts` |
| 2 | No homepage recall of finder shortlists | ✅ `HomeRecentShortlists` |
| 3 | Toolkit under-surfaced on homepage | ✅ 5-tool `HomeToolkitStrip` |
| 4 | `/saved/` missing from search + Lighthouse | ✅ site-search + `lighthouserc.json` |

### Deferred (Sprint 4+)

- Original `public/products/` photography
- HelpfulReaction Workers/KV aggregates
- VideoObject + claimed YouTube `sameAs`
- Faceted search over spec fields (weight, balance, price band) — **addressed in Sprint 4**

---

## 3. Execution summary

**Catalog/commercial:**
1. `src/lib/site-search.ts` — `productEntries()` from `reviewableProducts()`, kind `product`.
2. `src/components/SiteSearch.tsx` — optional kind filter chips.
3. `InArticleAffiliateDisclosure` on `BestPicksPage` and `CompareGuidePage`.
4. `ArticleEngagementFooter` on `CompareGuidePage`.
5. `src/app/results/ResultsClient.tsx` — brand filter chips.

**Engagement (main):**
1. `src/lib/notify-me.ts` — per-product email intent in `localStorage`.
2. `HomeRecentShortlists` — last 3 finder runs on homepage.
3. `HomeToolkitStrip` — full 5-tool strip.
4. Site search + Lighthouse URL for `/saved/`.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in code audit vs Q2 + Sprint 1–2 | ✅ |
| 2 | Product search links resolve via `catalogProductHref` | ✅ |
| 3 | Search index size grows without duplicate hrefs | ✅ |
| 4 | Kind filter does not break empty-query UX | ✅ |
| 5 | Affiliate marker present on best + compare HTML | ✅ |
| 6 | Engagement footer on commercial routes | ✅ |
| 7 | Results brand filter preserves profile scoring order | ✅ |
| 8 | `site-search.test.ts` covers catalog + saved shelf | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| SearchAction utility | Catalog + editorial in one index |
