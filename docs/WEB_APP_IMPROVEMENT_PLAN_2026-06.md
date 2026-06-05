# Web App Improvement Plan — June 2026

**Branches:** PRs [#80](https://github.com/ruisuphd/intobadminton/pull/80), [#84](https://github.com/ruisuphd/intobadminton/pull/84), [#94](https://github.com/ruisuphd/intobadminton/pull/94), [#97](https://github.com/ruisuphd/intobadminton/pull/97), [#105](https://github.com/ruisuphd/intobadminton/pull/105) merged to `main`; homepage perf follow-up PR [#92](https://github.com/ruisuphd/intobadminton/pull/92)  
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
| 3 | Results spec facets + price-band SEO | Post-quiz retention | ✅ Sprint 4 |
| 4 | Original photography / video | AdSense + experience signal | ⏳ Editorial pipeline |
| 5 | HelpfulReaction KV aggregates | Social proof | ⏳ Worker ready; prod URL pending |

**Shipped on `main`:** site search + body excerpts, `SearchAction`, return-visit hooks, `ContinueReading`, reactions API client, Buttondown notify-me, Product JSON-LD enrichment, engagement on commercial routes, comparison tables, glossary autolinks, guide ToC.

---

## 3. Execution phases

### Phase A — Shipped (main)

- Site search, return-visit hooks, methodology box, affiliate disclosure, toolkit strip

### Phase B — Shipped (main)

- SEO cluster guides; Product JSON-LD enrichment; Buttondown notify-me; compare-guide search index + e2e

### Sprint 3–4 — Shipped (main)

- Notify-me intent, homepage recall, catalog search, `/catalog/`, results facets, price-band pages
- Glossary autolinks, `GuideInPageToc`, quiz step hints, Sharp-preferred product images

### Phase C — Shipped (PR #101)

- Compare-guides layout chrome, `compare-guides.ts` search manifest, guide engagement deduplication, `ProductCardImage` on results, `audit-review-product-map.mjs`

See [`WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-C.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-C.md).

### Sprint 5 — PR #92 + PR #122

- `/best/rackets-under-200/` programmatic price-band page
- Catalog shareable URL filters + sort + GA4 funnel events
- Lighthouse CI coverage for catalog and price-band routes
- Homepage bundle slimming: `home-featured-reviews.json`, `catalog-stats.json`, `product-display-names.json`
- `HomeContinueReading` dynamic import
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT5_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT5_2026-06.md)

### Sprint 6 — Shipped (PR #134, #122)

- Fuzzy site search; `/best/control-rackets/`; catalog URL filters + `/best/rackets-under-200/`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT6_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT6_2026-06.md)

### Sprint 6–8 — Shipped on `main`

- Public **`/data/`** claims registry (#130); PDP-lite `/product/[id]/` (#138)
- Fuzzy search, reactions worker scaffold, catalog compare funnel (#127, #129, #134)
- PR #137: compare share-link fix, PWA shortcuts, retention e2e
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT6_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT6_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md)

### Sprint 9 — Shipped

- `/best/*` illustrative **Finder fit** column + `productId` backfill
- PWA **`ib-v3`** precaches `/catalog/`
- **`editorialReviewHref`** — no “Read full review” without a mapped blog slug
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT9_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT9_2026-06.md)

### Sprint 10 — Shipped (PR #153)

- PWA **`ib-v4`** precaches `/search/` and `/saved/`; Saved manifest shortcut
- Review→product map **86%** (126/146); improved `suggest-review-product-map.mjs`
- **HowTo** JSON-LD on four procedural guides in the Lighthouse URL set
- Reactions worker **workflow_dispatch** deploy + `crux-template.csv`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT10_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT10_2026-06.md)

### Sprint 11 — Shipped (#155, #154)

- Compare share URL init (`parseCompareShareIds`) + ProfileContext hydration fix
- PWA **`ib-v5`** precaches `/compare/` and `/updates/`
- Review→product map **~91%** (133/146); buying-guide editorial overrides
- **`NEXT_PUBLIC_REACTIONS_API_URL`** optional secret in Pages build
- PWA offline e2e smoke (`pwa-offline-smoke.spec.ts`)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT11_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT11_2026-06.md)

### Sprint 12 — Shipped (PR #158)

- Extended **Keep reading** clusters on commercial `/best/*` landings
- **`/methodology/`** in editorial freshness feed + human labels on updates
- HelpfulReaction **API-off prompt** (no empty count shell)
- PWA **`ib-v7`** precaches `/data/` and `/methodology/` (plus guides/offline/review from #154)
- E2e smoke for `/data/`, `/updates/`, review decision shelf

### Sprint 12b — This PR (`cursor/web-app-improvement-plan-bfaf`, #157)

- Profile-aware fit on PDP + review panels; catalog **Best fit for you** sort
- Reviews hub search + filters; share URL round-trip e2e
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT12_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT12_2026-06.md)

### Sprint 13 — Shipped (PR #159)

- **PDP related reading** shelf on `/product/[id]/`
- Explainer review slugs (13) map to editorial clusters via pattern expansion
- `PATH_CLUSTER` for `/best/rackets-under-200/` (strings/doubles already mapped)
- PWA **`ib-v8`** precaches `/tools/` and `/faq/`; Tools manifest shortcut
- Lighthouse CI includes `/faq/`; e2e PDP + explainer shelf smoke
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT13_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT13_2026-06.md)

### Sprint 14 — Shipped (PR #160)

- **Results Keep reading** shelf via `relatedReadingForQuizCategory`
- `/best/` hub, `/brands/`, and `/catalog/` decision-path shelves
- PWA **`ib-v9`** precaches `/best/` and `/brands/`; Best-of manifest shortcut
- Lighthouse CI includes `/best/` and `/brands/`; e2e results + brands shelf smoke
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT14_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT14_2026-06.md)

### Sprint 15 — Shipped (PR #161)

- **Compare-guides**, **guides**, **search**, and **saved** hub decision-path shelves
- `guides-hub` and `discovery` editorial clusters in `related-content.ts`
- PWA **`ib-v10`** precaches `/compare-guides/`; Compare guides manifest shortcut
- Lighthouse CI includes `/compare-guides/` index; e2e hub-shelf + PWA smoke
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT15_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT15_2026-06.md)

### Sprint 16 — Shipped (PR #163)

- **Catalog keyword search** via shareable `?q=` on `/catalog/`
- **`/review/` index** Keep reading shelf via `reviews-hub` cluster
- Fuzzy token match on brand, model, and spec fields
- E2e catalog-keyword + review shelf smoke
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT16_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT16_2026-06.md)

### Sprint 17 — Shipped (PR #164)

- **Site search → catalog deep-link** with `?q=` prefill and match count CTA
- Empty editorial results surface catalog when catalogue rows match
- E2e search-catalog-deeplink smoke
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT17_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT17_2026-06.md)

### Phase D — Shipped (PR #114)

- Review→product map **80%** (117/146); `scripts/suggest-review-product-map.mjs`
- `docs/baselines/README.md` GSC/CrUX runbook
- `GuideTocAnchor` on SEO cluster pillar guides

See [`WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-D.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06-PHASE-D.md).

### Sprint 6–7 — Shipped (main)

- Fuzzy search, control rackets, catalog URL filters (#134, #122)
- Singles/head-light/all-round `/best/*`, review body search (#127, #135)
- PDP-lite `/product/[id]/`, budget shoes pages (#138)
- PR #139: results share link, RSS `rel=alternate` in layout
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT6_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT6_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md)

### Sprint 8 — This branch (PR #143)

- Product map ≥86%; review body search e2e; results share link verification
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT8_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT8_2026-06.md)

### Sprint 18 — Shipped (PR #165)

- Header search **Catalog** split button + static hero `formAction`
- Search autocomplete (`searchSuggestions` + combobox on `/search/` and header)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT18_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT18_2026-06.md)

### Sprint 19 — This branch

- Product-intent **search submit** → `/catalog/?q=` when only catalogue SKUs match
- `/search/?q=` client redirect for static hero form submissions
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT19_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT19_2026-06.md)

### Next (Sprint 20+)

- Owner: set `REACTIONS_API_URL` after worker deploy; fill `crux-template.csv`
- Original photos on top commercial URLs
- YouTube `sameAs` on author entity (after channel claim)
- Intentional explainer slugs without single catalogue SKU (no forced product map)

**Sprint 6 shipped:** fuzzy search + programmatic `/best/*` landings (PRs #127, #134).  
**Sprint 7 (PR #135):** review body search excerpts + fuzzy e2e. See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT7_2026-06.md).  
**Sprint 8:** claims registry, PDP-lite, product-map 86%, search snippets, RSS alternate. See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT8_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT8_2026-06.md).  
**Sprint 9:** CI e2e hardening; canonical review slug tie-break; reactions deploy deferred. See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT9_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT9_2026-06.md).

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
| 9 | `npm test` (198) | ✅ |
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
