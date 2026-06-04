# Web App Improvement Plan — June 2026

**Branches:** `cursor/web-app-improvement-plan-3b6d` / `cursor/web-app-improvement-plan-d967` (merged via PR #80), `cursor/web-app-improvement-plan-03c3` (SEO clusters), `cursor/web-app-improvement-plan-bab1` (engagement + notify-me)  
**Baseline:** [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md), [`AUDIT_2026-05.md`](AUDIT_2026-05.md)

---

## 1. Competitive audit (June 2026)

| Site | Strength vs IntoBadminton | Gap / response |
|------|----------------------------|----------------|
| **BadmintonCentral** | Community archive, search | ✅ On-site search (`/search/`) |
| **Tennis Warehouse / retailer finders** | Imagery, comparison tables, notify-me | Tables ✅; notify-me ✅ (Phase B bab1); original photos open |
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
| 4 | **SEO topical clusters incomplete** — shoe-fit + doubles pillars | Long-tail rankings | ✅ PR #03c3 (main) |
| 5 | **Per-product notify-me + commercial-page engagement** | Retention + AdSense readiness | ✅ Phase B bab1 |

**Deferred (Phase C):** HelpfulReaction Workers/KV; original photography; GSC/CrUX CSV in `docs/baselines/`; `Person.sameAs` after profile claims.

---

## 3. Execution phases

### Phase A — Shipped (main, PR #80)

- Site search index + `/search/` + header `SiteSearchForm`
- `ContinueReading` + `LastArticleTracker`
- `ReviewMethodologyBox` + `InArticleAffiliateDisclosure`
- `HomeToolkitStrip`; HowTo on procedural guides; Lighthouse `/review/` URLs

### Phase B — Shipped (main + PR #03c3 + bab1 + a493)

- `/guides/badminton-shoes-vs-running-shoes/` — shoe-fit cluster pillar
- `/guides/doubles-positioning-and-rackets/` — doubles cluster pillar
- `enrichmentForReviewArticle()` — Product JSON-LD with section-derived reviewBody
- Buttondown per-product notify-me on `/saved/` — see [`WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-B.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-B.md)
- Engagement UX on `/best/*` and all `/guides/*` routes
- All 11 `/compare-guides/*` URLs in site search + Playwright smoke (`e2e/search-smoke.spec.ts`)

### Phase C — Shipped (`cursor/web-app-improvement-plan-f404`)

- Compare-guides layout: reading progress, affiliate disclosure, engagement footer
- All 12 compare guides in site search (`src/lib/compare-guides.ts`)
- Guide engagement deduplication (layout-only chrome)
- Larger `ProductCardImage` on result cards
- `scripts/audit-review-product-map.mjs` for map coverage reporting

See [`WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-C.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-C.md).

### Phase D — Next

- GSC/CrUX baseline CSV capture (owner session)
- Original photos on top commercial URLs
- HelpfulReaction aggregate backend (Workers/KV)
- Expand `blog-review-product-map.json` toward full review coverage

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 plan + competitive audit | ✅ |
| 2 | Product JSON-LD uses enrichment helper (no duplicate inline logic) | ✅ |
| 3 | Buttondown: no local email storage; double opt-in copy | ✅ |
| 4 | Engagement on commercial routes without signup wall | ✅ |
| 5 | Static export safe (no API routes) | ✅ |
| 6 | Merged cleanly with main cluster guides + ReviewProductPanel | ✅ |
| 7 | Unit tests for enrichment + Buttondown | ✅ |
| 8 | `.env.example` documents Buttondown username | ✅ |
| 9 | `npm test` (incl. compare-guide site search) | ✅ |
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
