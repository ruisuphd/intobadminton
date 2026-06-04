# Web App Improvement Plan — June 2026

**Branches:** `cursor/web-app-improvement-plan-3b6d` / `cursor/web-app-improvement-plan-d967` (merged via PR #80), `cursor/web-app-improvement-plan-03c3` (Phase B)  
**Baseline:** [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md), [`AUDIT_2026-05.md`](AUDIT_2026-05.md)

---

## 1. Competitive audit (June 2026)

| Site | Strength vs IntoBadminton | Gap / response |
|------|----------------------------|----------------|
| **BadmintonCentral** | Community archive, search | ✅ On-site search (`/search/`) |
| **Tennis Warehouse / retailer finders** | Imagery, comparison tables | Largely closed (Q2 sprints); original photos open |
| **RacketGuide-style finders** | Filter-first UX | Finder + toolkit strip strong; return hooks shipped |
| **YouTube-first reviewers** | Video evidence | Open — `VideoObject` gated on video commitment |
| **Brand / affiliate blogs** | Pro association | Author entity + methodology box; `sameAs` profiles pending claim |

**Moat:** transparent fit score, claims CI, static export, 146+ first-person reviews, postbuild SEO gate.

---

## 2. Top 5 gaps (prioritized)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | Functional site search | Discovery, SearchAction | ✅ Shipped (main) |
| 2 | Return-visit hooks on homepage | Retention | ✅ `ContinueReading` (main) |
| 3 | Visible review E-E-A-T + in-article affiliate disclosure | Product Reviews / FTC | ✅ Shipped (main) |
| 4 | **SEO topical clusters incomplete** — shoe-fit + doubles pillars missing from Q2 §3.3 | Long-tail rankings | ✅ Phase B (this branch) |
| 5 | Original photography / video on commercial URLs | AdSense + March 2026 experience signal | ⏳ Editorial pipeline |

**Deferred (Phase C):** HelpfulReaction Workers/KV; per-product notify-me (Buttondown); GSC/CrUX CSV fill in `docs/baselines/`; `Person.sameAs` after profile claims.

---

## 3. Execution phases

### Phase A — Shipped (main, PR #80)

- Site search index + `/search/` + header `SiteSearchForm`
- `ContinueReading` + `LastArticleTracker`
- `ReviewMethodologyBox` + `InArticleAffiliateDisclosure`
- `HomeToolkitStrip`; HowTo on procedural guides; Lighthouse `/review/` URLs

### Phase B — Shipped (this branch)

- `/guides/badminton-shoes-vs-running-shoes/` — shoe-fit cluster pillar (HowTo schema)
- `/guides/doubles-positioning-and-rackets/` — doubles cluster pillar with positioning → gear table
- Guides index, `site-search`, `editorial-meta`, cross-links from `shoes-footwork` and `doubles-roles`

### Phase C — Next

- GSC/CrUX baseline CSV capture (owner session)
- Original photos on top commercial URLs
- HelpfulReaction aggregate backend

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.3 cluster list + May audit | ✅ |
| 2 | New guides use `GuideStructuredData` + registry dates | ✅ |
| 3 | Shoe guide distinct from `/compare-guides/badminton-vs-tennis-shoes/` | ✅ (running vs tennis angle) |
| 4 | Doubles positioning complements `/guides/doubles-roles/` | ✅ cross-links |
| 5 | Hub pages link into new guides (`/guides/`, search index) | ✅ |
| 6 | Static export safe (no API) | ✅ |
| 7 | Internal links to `/best/shoes/`, `/best/doubles-rackets/`, `/quiz/` | ✅ |
| 8 | HowTo steps match visible shoe-guide content | ✅ |
| 9 | `npm test` (site-search + editorial-meta) | ✅ |
| 10 | `npm run build` + postbuild SEO audit | ✅ |

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
