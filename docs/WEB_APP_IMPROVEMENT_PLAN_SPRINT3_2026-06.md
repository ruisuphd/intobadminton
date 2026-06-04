# Web App Improvement Plan — Sprint 3 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-0fb2` (merged), `cursor/web-app-improvement-plan-22e9` (this PR)  
**Baseline:** Sprint 1–2 on `main` ([`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md)).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton gap addressed in Sprint 3 |
|------------|----------|------------------------------------------|
| **Tennis Warehouse** | Saved lists, catalog search, brand filters | Product index + kind chips + results brand filter |
| **Wirecutter / RTINGS** | Return-visit + article engagement | Notify-me persistence, recent shortlists, compare engagement |
| **BadmintonCentral** | Tool discovery | 5-tool homepage strip, `/saved/` in search |
| **YouTube reviewers** | Video evidence | Still deferred (`VideoObject` gated) |
| **Brand blogs** | Original photography | Still editorial pipeline |

**Moat unchanged:** transparent fit scoring, postbuild SEO gate, static export, 146+ reviews.

---

## 2. Top 5 gaps (combined Sprint 3)

| # | Gap | Sprint 3 delivery |
|---|-----|-------------------|
| 1 | **Catalog products missing from site search** | ✅ `product` kind + `reviewableProducts()` |
| 2 | **No search kind filters** | ✅ chip filters on `/search/` |
| 3 | **Notify-me / return-visit hooks weak** | ✅ `notify-me.ts`, `HomeRecentShortlists` (0fb2) |
| 4 | **Compare guides lack engagement chrome** | ✅ `ArticleEngagementFooter` on compare pages |
| 5 | **Results shortlist lacks brand filter** | ✅ brand chips on `/results/` |

### Follow-up (PR #98 / `cursor/web-app-improvement-plan-e4a1`)

| Item | Status |
|------|--------|
| Editorial `/best/rackets-under-100/` (Q2 §3.5 programmatic landing) | ✅ Shipped |
| Blog map links for AxForce 10 + Thruster SR/9900 reviews | ✅ |

### Deferred (Sprint 4+)

- Original `public/products/` photography
- HelpfulReaction Workers/KV aggregates
- Buttondown notify-me server sync
- VideoObject + claimed YouTube `sameAs`
- Faceted search over spec fields (weight, balance, price band)

---

## 3. Execution summary

**From 0fb2 (on main):** `notify-me.ts`, `HomeRecentShortlists`, expanded `HomeToolkitStrip`, `/saved/` in search + Lighthouse.

**From 22e9 (this PR):**

1. `src/lib/site-search.ts` — `productEntries()`, `searchSite(..., kind?)`
2. `src/components/SiteSearch.tsx` — kind filter chips
3. `CompareGuidePage` — `ReadingProgress` + `ArticleEngagementFooter`
4. `src/app/results/ResultsClient.tsx` — brand filter chips

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 + competitive audit | ✅ |
| 2 | Product search links via `reviewPath()` | ✅ |
| 3 | Kind filter preserves empty-query UX | ✅ |
| 4 | Notify-me local-only when Buttondown unset | ✅ |
| 5 | Compare engagement matches best-of pattern | ✅ |
| 6 | Results brand filter preserves score order | ✅ |
| 7 | `site-search.test.ts` covers products + saved | ✅ |
| 8 | Static export safe | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| SearchAction utility | Catalog + editorial in one index |
