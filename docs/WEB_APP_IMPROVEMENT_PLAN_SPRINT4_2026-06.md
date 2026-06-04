# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-353e`  
**Baseline:** Sprint 1–3 shipped on `main` ([`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md)).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse / retailer finders** | Faceted spec browse (weight, flex, price) | ✅ `/browse/` client-side facets over `products.json` |
| **RacketGuide / affiliate roundups** | Long-tail landings (`5U`, shoulder comfort) | ✅ Two new `/best/*` programmatic pages |
| **BadmintonCentral / authority blogs** | Inline concept links to glossary | ✅ Render-time glossary autolink on review bodies |
| **Wirecutter / RTINGS** | Social proof vote counts | ⏳ HelpfulReaction Workers/KV still deferred |
| **Brand PDPs** | First-party product photography | ⏳ Editorial `public/products/` pipeline |

**Moat unchanged:** transparent fit score, postbuild SEO gate, 146+ reviews, static-export CWV, claims CI.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 4 |
|---|-----|--------|----------|
| 1 | **No faceted catalogue browse** (retailer-style filters) | Discovery / commercial queries | ✅ `/browse/` |
| 2 | **Missing long-tail programmatic `/best/*` landings** (5U, shoulder) | SEO topical coverage | ✅ |
| 3 | **Glossary terms not autolinked in article bodies** | Internal linking + E-E-A-T | ✅ `AutolinkedText` |
| 4 | Original product photography on commercial URLs | AdSense / March 2026 experience | ⏳ Editorial pipeline |
| 5 | HelpfulReaction aggregate counts (Workers/KV) | Social proof on articles | ⏳ Phase C backend |

**Deferred:** Buttondown price-drop fanout; `Person.sameAs`; zh locale; community comments.

---

## 3. Execution summary

1. **`/browse/`** — `product-facets.ts` + `CatalogBrowseClient` with shareable URL params (weight, balance, flex, max price, brand, text query).
2. **`/best/lightweight-rackets-5u/`** and **`/best/rackets-for-shoulder-comfort/`** — six catalog-backed picks each, comparison tables, FAQs.
3. **`AutolinkedText`** — first-mention glossary links in `EditorialArticlePage` section bodies; respects manual `glossaryLinks`.
4. Registry updates — `editorial-meta`, `site-search`, `/best/` hub, homepage popular searches, Lighthouse URLs.
5. Merge conflict cleanup — reconcile Sprint 3 budget page + Lighthouse config with `main`.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.3 programmatic pages + competitive audit | ✅ |
| 2 | New best picks align with `products.json` rows / productIds | ✅ |
| 3 | Each new best page has ≥200 words original intro | ✅ |
| 4 | `editorial-meta` + sitemap `lastReviewedAt` registered | ✅ |
| 5 | Distinct lenses vs existing `/best/*` guides | ✅ |
| 6 | Static export safe (no API routes) | ✅ |
| 7 | Glossary autolink skips manual `glossaryLinks` ids | ✅ |
| 8 | `npm test` (facets, autolink, site-search, editorial-meta) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse config includes browse + new best URLs | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
```

---

## 6. Metrics (unchanged from Q2)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
