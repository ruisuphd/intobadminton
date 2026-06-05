# Web App Improvement Plan — June 2026

**Branches:** PRs [#80](https://github.com/ruisuphd/intobadminton/pull/80), [#84](https://github.com/ruisuphd/intobadminton/pull/84), [#94](https://github.com/ruisuphd/intobadminton/pull/94), [#97](https://github.com/ruisuphd/intobadminton/pull/97), [#105](https://github.com/ruisuphd/intobadminton/pull/105), [#114](https://github.com/ruisuphd/intobadminton/pull/114) merged to `main`; homepage perf PR [#92](https://github.com/ruisuphd/intobadminton/pull/92)  
**Baseline:** [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md), [`AUDIT_2026-05.md`](AUDIT_2026-05.md)

---

## 1. Competitive audit (June 2026)

| Site | Strength vs IntoBadminton | Gap / response |
|------|----------------------------|----------------|
| **BadmintonCentral** | Community archive, search | ✅ On-site search (`/search/`) + catalog browse |
| **Tennis Warehouse / retailer finders** | Imagery, comparison tables, filter browse | Tables ✅; `/catalog/` ✅; original photos open |
| **RacketGuide-style finders** | Filter-first UX, calculators | Finder + 5 `/tools/*` + toolkit strip |
| **Wirecutter / RTINGS** | Product schema, methodology | Product JSON-LD + methodology box ✅ |
| **YouTube-first reviewers** | Video evidence | Open — `VideoObject` gated on video commitment |

**Moat:** transparent fit score, claims CI, static export, 146+ first-person reviews, postbuild SEO gate.

---

## 2. Top 5 gaps (prioritized — post Sprint 5)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | Homepage Lighthouse / critical-path JS | CI + CWV | ✅ PR #92 (prebuild slices + deferred engagement) |
| 2 | Filter-first product catalog | Discovery vs retailers | ✅ Sprint 4 (`/catalog/`) |
| 3 | Results spec facets + price-band SEO | Post-quiz retention | ✅ Sprint 4–5 |
| 4 | Original photography / video | AdSense + experience signal | ⏳ Editorial pipeline |
| 5 | HelpfulReaction KV aggregates | Social proof | ⏳ GA4 interim only |

**Shipped on `main`:** site search, `SearchAction`, return-visit hooks, Buttondown notify-me, Product JSON-LD enrichment, engagement on commercial routes, comparison tables, glossary autolinks, guide ToC.

---

## 3. Execution phases

### Phase A — Shipped (main)

- Site search, return-visit hooks, methodology box, affiliate disclosure, toolkit strip

### Phase B — Shipped (main)

- SEO cluster guides; Product JSON-LD enrichment; Buttondown notify-me; compare-guide search index + e2e

### Phase C — Shipped (PR #101)

- Compare-guides layout chrome, `compare-guides.ts` search manifest, guide engagement deduplication, `ProductCardImage` on results, `audit-review-product-map.mjs`

See [`WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-C.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-C.md).

### Sprint 3–5 — Shipped (main)

- Notify-me intent, homepage recall, catalog search, `/catalog/`, results facets, price-band pages
- Glossary autolinks, `GuideInPageToc` + `GuideTocAnchor`, quiz step hints, Sharp-preferred product images
- Homepage bundle slimming (`home-featured-reviews.json`, dynamic `HomeContinueReading`)
- `/best/rackets-under-200/`; catalog URL filters + sort — see [`WEB_APP_IMPROVEMENT_PLAN_SPRINT5_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT5_2026-06.md)

### Phase D — Shipped (PR #114)

- Review→product map **80%** (117/146); `scripts/suggest-review-product-map.mjs`
- `docs/baselines/README.md` GSC/CrUX runbook
- `GuideTocAnchor` on SEO cluster pillar guides; Lighthouse uses `season-refresh` not `glossary`

See [`WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-D.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-D.md).

### Sprint 7 — Shipped (PR #138, #135)

- PDP-lite `/product/[id]/`, programmatic budget shoes + head-heavy best pages
- Review body search excerpts + fuzzy e2e

See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md).

### Sprint 8 — In progress (`cursor/web-app-improvement-plan-766f`)

- PDP + catalog→PDP Playwright smoke; mobile nav static search form
- Review→product map +2 (Nanoflare Play, Thruster Falcon)

See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT8_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT8_2026-06.md).

### Sprint 9+ (deferred)

- Deploy HelpfulReaction Workers/KV + `NEXT_PUBLIC_REACTIONS_API_URL`
- Original photos on top commercial URLs
- YouTube `sameAs` on author entity (after channel claim)
- E2E for `/saved/`, `/compare/`

**Sprint 6 shipped:** fuzzy search + `/best/control-rackets/` (PR #134); singles/head-light/all-round landings (PR #127).

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 plan + audit | ✅ |
| 2 | Search covers reviews + compare guides + catalog | ✅ |
| 3 | Homepage avoids full JSON corpora on `/` | ✅ (Sprint 5) |
| 4 | Notify-me + engagement without signup wall | ✅ |
| 5 | Static export safe | ✅ |
| 6 | Product JSON-LD via enrichment helper | ✅ |
| 7 | `site-search.test.ts` + search e2e | ✅ |
| 8 | `/search/` + `/catalog/` in sitemap | ✅ |
| 9 | `npm test` | ✅ |
| 10 | `npm run build` + Lighthouse homepage ≥ 0.9 | ✅ CI (Sprint 5) |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint:lighthouse
```

---

## 6. Metrics (Q2 plan)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Lighthouse performance (homepage) | ≥ 0.9 |
| SearchAction | Functional + declared |
