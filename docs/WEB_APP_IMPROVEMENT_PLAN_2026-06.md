# Web App Improvement Plan — June 2026

**Branches:** `cursor/web-app-improvement-plan-3b6d` (merged to main), `cursor/web-app-improvement-plan-d967` (incremental)  
**Baseline:** [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md), [`AUDIT_2026-05.md`](AUDIT_2026-05.md)

---

## 1. Competitive audit

| Site | Strength vs IntoBadminton | Gap addressed |
|------|----------------------------|---------------|
| **BadmintonCentral** | Deep community archive | On-site search across reviews/guides |
| **Retailer finders** (Tennis Warehouse pattern) | Imagery, comparison tables | Largely closed in Q2 sprints |
| **YouTube-first reviewers** | Video evidence | Still open (VideoObject gated) |
| **Brand / affiliate blogs** | Pro association, tables | Author entity strong; original photos open |

**Moat:** transparent fit score, claims CI, static export, 146+ first-person reviews.

---

## 2. Top 5 gaps (prioritized)

| # | Gap | Status |
|---|-----|--------|
| 1 | Functional site search | ✅ `/search/` + `buildSearchIndex()` + `SearchAction` |
| 2 | Return-visit hooks on homepage | ✅ `ContinueReading` |
| 3 | Visible “What we tested” on reviews | ✅ `ReviewMethodologyBox` |
| 4 | In-article affiliate disclosure (AdSense/FTC) | ✅ `InArticleAffiliateDisclosure` (this branch) |
| 5 | Original photography / video on commercial URLs | ⏳ Editorial pipeline |

**Also shipped on main:** HowTo schema on procedural guides; Lighthouse `/review/` URLs; homepage toolkit strip (`HomeToolkitStrip`).

---

## 3. Execution phases

### Phase A — Shipped (main + PR #80)

- `src/lib/site-search.ts` — client index (~170+ entries)
- `/search/` with `?q=` deep links
- `ContinueReading` + `LastArticleTracker`
- `ReviewMethodologyBox` on review articles
- `InArticleAffiliateDisclosure` on review articles
- `HomeToolkitStrip` on homepage
- Header `SiteSearchForm` (compact) + Search nav link

### Phase B — Next

- HelpfulReaction Workers/KV
- Per-product notify-me (Buttondown)
- GSC/CrUX baselines in `docs/baselines/`

### Phase C — Content moat

- Original photos on top commercial URLs
- First-person evidence sweep on top-10 traffic pages

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in audit + Q2 plan | ✅ |
| 2 | Search covers reviews + hubs | ✅ |
| 3 | SearchAction matches `/search/?q=` | ✅ |
| 4 | Static export safe (no server) | ✅ |
| 5 | No signup wall on search/home hooks | ✅ |
| 6 | Affiliate disclosure on review pages | ✅ |
| 7 | Methodology box links `/methodology/` | ✅ |
| 8 | `/search/` in sitemap | ✅ |
| 9 | `site-search.test.ts` | ✅ |
| 10 | `npm test && npm run build` | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
```

---

## 6. Metrics (Q2 plan)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| SearchAction | Functional + declared |
