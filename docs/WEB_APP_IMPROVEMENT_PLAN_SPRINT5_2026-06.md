# Web App Improvement Plan — Sprint 5 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-353e`  
**Baseline:** Sprint 4 on `main` ([`WEB_APP_IMPROVEMENT_PLAN_SPRINT4_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT4_2026-06.md), PR #97).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse / retailer finders** | Faceted spec browse (weight, flex, price) | ✅ `/browse/` client-side facets |
| **RacketGuide / affiliate roundups** | Long-tail landings (`5U`, shoulder comfort) | ✅ Two new `/best/*` pages |
| **BadmintonCentral / authority blogs** | Inline concept links to glossary | ✅ Auto + manual glossary linking |
| **Wirecutter / RTINGS** | Social proof vote counts | ⏳ HelpfulReaction Workers/KV |
| **Brand PDPs** | First-party product photography | ⏳ Editorial `public/products/` pipeline |

**Moat unchanged:** transparent fit score, postbuild SEO gate, 146+ reviews, static-export CWV, claims CI.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 5 |
|---|-----|--------|----------|
| 1 | **No faceted catalogue browse** | Discovery / commercial queries | ✅ `/browse/` |
| 2 | **Missing long-tail programmatic `/best/*` landings** | SEO topical coverage | ✅ 5U + shoulder comfort |
| 3 | **Glossary autolink only on declared terms** | Internal linking density | ✅ `segmentArticleGlossary` |
| 4 | Original product photography | AdSense / March 2026 experience | ⏳ Editorial pipeline |
| 5 | HelpfulReaction aggregate counts (Workers/KV) | Social proof | ⏳ Phase C backend |

---

## 3. Execution summary

1. **`/browse/`** — `product-facets.ts` + `CatalogBrowseClient` (weight, balance, flex, max price, brand, text query).
2. **`/best/lightweight-rackets-5u/`** and **`/best/rackets-for-shoulder-comfort/`** — six catalog-backed picks each.
3. **`segmentArticleGlossary`** — manual `glossaryLinks` first, then automatic first-mention fill-in from `glossary-terms.ts`.
4. Registry updates — `editorial-meta`, `site-search`, `/best/` hub, homepage popular searches, Lighthouse URLs.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.3 programmatic pages + competitive audit | ✅ |
| 2 | New best picks align with `products.json`; review links only when mapped | ✅ |
| 3 | Each new best page has ≥200 words original intro | ✅ |
| 4 | `editorial-meta` + sitemap `lastReviewedAt` registered | ✅ |
| 5 | Distinct lenses vs existing `/best/*` guides | ✅ |
| 6 | Static export safe (no API routes) | ✅ |
| 7 | Glossary manual links take precedence over autolink | ✅ |
| 8 | `npm test` (198 passed) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse config includes browse + new best URLs | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
```
