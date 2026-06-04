# Web App Improvement Plan — Sprint 3 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f8ee` → PR #105  
**Baseline:** Sprint 2 in [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | Sprint 3 response |
|------------|----------|-------------------|
| **Tennis Warehouse** | Saved lists, catalog search, brand filters | Product index + kind chips + results brand filter |
| **Wirecutter / RTINGS** | Return-visit + article ToC | `HomeRecentShortlists`; `GuideInPageToc` (PR #97) |
| **BadmintonCentral** | Dense internal linking | Glossary autolinks in reviews (PR #97) |
| **RacketGuide finders** | Visual quiz UX | Per-step hints + SVG glyphs (PR #97) |
| **YouTube reviewers** | Video evidence | Deferred (`VideoObject` gated) |

**Moat:** transparent fit scoring, postbuild SEO gate, static export, 146+ reviews.

---

## 2. Top 5 gaps (combined Sprint 3)

| # | Gap | Status |
|---|-----|--------|
| 1 | Catalog products missing from site search | ✅ `product` kind (`main` #95) |
| 2 | No search kind filters | ✅ chip filters (`main` #95) |
| 3 | Notify-me / return-visit hooks weak | ✅ `notify-me.ts`, `HomeRecentShortlists` (#94) |
| 4 | Glossary terms not linked in prose | ✅ `glossary-autolink` (#97) |
| 5 | Guides lack ToC; quiz lacks visual cues | ✅ `GuideInPageToc` + quiz glyphs (#97) |

Also on `main`: compare engagement, results brand filter, `/best/rackets-under-100/`.

### Deferred (Sprint 4+)

- HelpfulReaction Workers/KV aggregates
- First-party `public/products/` photography
- Faceted spec search — **addressed in PR #105 Sprint 4**

---

## 3. Execution summary

**On `main`:** notify-me, recent shortlists, toolkit strip, catalog search, kind filters, compare engagement, results brand filter, glossary autolinks, guide ToC, quiz UX.

**PR #105 adds:** spec facets on `/results/`, `/catalog/` browse, `/best/rackets-under-150/`, `catalogProductHref`.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 + competitive audit | ✅ |
| 2 | Product links via `catalogProductHref` | ✅ |
| 3 | Glossary autolinks unchanged | ✅ |
| 4 | Guide ToC + quiz glyphs intact | ✅ |
| 5 | Results spec filters preserve score order | ✅ |
| 6 | Static export safe | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + SEO audit | ✅ |
| 9 | `npm run lint` | ✅ |
| 10 | PR mergeable with `main` | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| SearchAction utility | Catalog + editorial in one index |
