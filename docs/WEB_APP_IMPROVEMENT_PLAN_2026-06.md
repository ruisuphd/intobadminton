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
| **Tennis Warehouse** | Spec-backed PDP per SKU, cross-sells | PDP golden-profile CI guard ✅ (Sprint 48) |
| **Wirecutter** | Programmatic best-of + comparison tables + catalog exit | Best-of golden-profile CI guard ✅ (Sprint 49) |
| **Tennis Warehouse** | Head-to-head comparison → filtered browse | Compare-guides golden-profile CI guard ✅ (Sprint 50) |
| **Tennis Warehouse** | Procedural education → filtered browse | Guides golden-profile CI guard ✅ (Sprint 51) |
| **RacketGuide-style finders** | Calculator → filtered catalogue browse | Tools golden-profile CI guard ✅ (Sprint 52) |
| **Tennis Warehouse** | Brand hubs → filtered SKU browse | Brands golden-profile CI guard ✅ (Sprint 53) |
| **Wirecutter** | Large review archive with hub discovery | Reviews hub golden-profile CI guard ✅ (Sprint 54) |
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

### Sprint 19 — Shipped (PR #166)

- Product-intent **search submit** → `/catalog/?q=` when only catalogue SKUs match
- `/search/?q=` client redirect for static hero form submissions
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT19_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT19_2026-06.md)

### Sprint 20 — Shipped (PR #168)

- Sync Jun-4 **review→product map** (7 entries) to runtime `src/data/`
- Fix ingest scripts to write `src/data/blog-review-product-map.json` (remove stale `scripts/` copy)
- **`/brands/anta/`** landing + brands hub deep links for all dedicated guides
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT20_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT20_2026-06.md)

### Sprint 21 — Shipped (PR #169)

- Brand landings → **filtered catalog** CTA (`catalogHrefFromBrand`)
- PWA **`ib-v11`** precaches dedicated brand shells + manifest **Brands** shortcut
- **Explainer slug allowlist** in audit script (13 intentional no-map reviews)
- Lighthouse CI includes `/brands/anta/`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT21_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT21_2026-06.md)

### Sprint 22 — Shipped (PR #170)

- Best-of landings → **filtered catalog** CTA (`catalogHrefFromBestSlug`)
- `/best/` hub **Browse full catalog** secondary CTA
- PWA **`ib-v12`** precaches bonny/kawasaki/kumpoo brand shells
- Lighthouse CI includes `/brands/kawasaki/`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT22_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT22_2026-06.md)

### Sprint 23 — Shipped (PR #171)

- Compare-guide landings → **filtered catalog** CTA (`catalogHrefFromCompareSlug`)
- `/compare-guides/` hub **Browse full catalog** secondary CTA
- Concept compare pages (3) gain catalog CTAs
- PWA **`ib-v13`** precaches `yonex-astrox-vs-nanoflare` compare shell
- Lighthouse CI includes `/compare-guides/astrox-99-pro-vs-astrox-100zz/`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT23_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT23_2026-06.md)

### Sprint 24 — Shipped (PR #172)

- Discovery hubs (`/guides/`, `/tools/`, `/review/`, `/brands/`) → **Browse full catalog** CTAs
- Procedural guides → **filtered catalog** CTA (`catalogHrefFromGuideSlug`, `GuideCatalogCta`)
- PWA **`ib-v14`** precaches `/brands/yonex/` and `/guides/string-tension/`
- Lighthouse CI includes `/brands/yonex/`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT24_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT24_2026-06.md)

### Sprint 25 — Shipped (PR #173)

- Remaining procedural guides → **filtered catalog** CTA (`GuideCatalogCta` on 4 landings)
- Tool pages → **filtered catalog** CTA (`catalogHrefFromToolSlug`, `ToolCatalogCta`)
- PWA **`ib-v15`** precaches shoes guides + racket-balance guide shells
- Lighthouse CI includes `/brands/victor/`, `/brands/li-ning/`, shoes guides
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT25_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT25_2026-06.md)

### Sprint 26 — Shipped (PR #174)

- Review/PDP panels → **filtered catalog** CTA (`catalogHrefFromProduct` in `ReviewProductPanel`)
- Quiz results → **profile-filtered catalog** CTA (`catalogHrefFromProfile`)
- FAQ page → **Browse full catalog** secondary CTA
- PWA **`ib-v16`** precaches remaining guides + racket-balance tool
- Lighthouse CI includes `/guides/doubles-roles/`, `/tools/racket-balance-explainer/`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT26_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT26_2026-06.md)

### Sprint 27 — Shipped (PR #175)

- Trust/discovery pages → **Browse full catalog** CTAs (glossary, search, updates, data, methodology)
- Quiz results → **richer profile-filtered catalog** (`balance` + `sort=fit-desc`)
- Saved/compare trays → catalog browse exit
- PWA **`ib-v17`** precaches glossary, season-refresh, 4 remaining tools, yonex-victor-li-ning compare
- Lighthouse CI includes homepage + 7 commercial/trust routes
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT27_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT27_2026-06.md)

### Sprint 28 — Shipped (PR #176)

- Trust/editorial cluster → **Browse full catalog** CTAs (about, sources, source-policy, authors)
- Quiz funnel entry → catalog band; profile → catalog adds **weight class**
- PWA **`ib-v18`** precaches 10 compare articles + 4 tier-1 best-of landings
- Lighthouse CI adds authors, commercial long-tail, trust cluster (excludes noindex saved/compare)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT28_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT28_2026-06.md)

### Sprint 29 — Shipped (PR #177)

- Contact + research + homepage → **Browse full catalog** secondary CTAs
- PWA **`ib-v19`** precaches contact, research, price-band + shoes best-of shells
- Lighthouse CI adds `/contact/`, `/research/`, `/authors/rui-su/`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT29_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT29_2026-06.md)

### Sprint 30 — Shipped (PR #178)

- Legal cluster (privacy, terms, cookies, security, privacy-choices) → **Browse full catalog** CTAs
- PWA **`ib-v20`** precaches legal/policy shells
- Lighthouse CI adds `/privacy/`, `/terms/`, `/cookies/`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT30_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT30_2026-06.md)

### Sprint 31 — Shipped (PR #179)

- PWA **`ib-v21`** precaches trust cluster (about, sources, source-policy, authors)
- Offline recovery adds Best-of, Brands, and Privacy links
- Lighthouse CI adds `/security/`, `/source-policy/` (`/privacy-choices/` excluded — noindex)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT31_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT31_2026-06.md)

### Sprint 32 — Shipped (PR #180)

- PWA **`ib-v22`** precaches 6 long-tail best-of shells (control, singles, defensive, lightweight, shoulder-comfort, head-heavy-under-150)
- Offline recovery adds trust/editorial (about, sources, methodology, data), legal (terms, cookies, security), and support (contact, research) links
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT32_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT32_2026-06.md)

### Sprint 33 — Shipped (PR #181)

- PWA **`ib-v23`** precaches Lighthouse PDP + sample review shells (`/product/yy-grpht-thrttl/`, `/review/yonex-arcsaber-7-pro-review/`)
- Offline recovery adds source-policy, authors, and author profile links
- E2E saved shelf reload persistence assertion
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT33_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT33_2026-06.md)

### Sprint 34 — Shipped (PR #182)

- PWA **`ib-v24`** offline shell — discoverability for precached PDP, flagship review, and privacy-choices
- **`pwa-precache-paths.ts`** shared assert list; Lighthouse CI ↔ precache parity unit test
- E2E precache list synced; true offline navigation smoke for PDP + review
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT34_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT34_2026-06.md)

### Sprint 35 — Shipped (PR #183)

- PWA **`ib-v25`** offline shell — CrUX commercial deep-links (beginner-rackets, Astrox vs Nanoflare, string-tension)
- **`offline-recovery-paths.ts`** shared recovery module; CrUX ↔ offline parity unit test
- E2E offline navigation for best-of, compare-guide, and procedural guide shells
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT35_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT35_2026-06.md)

### Sprint 36 — Shipped (PR #184)

- PWA **`ib-v26`** offline shell — full `crux-template.csv` recovery deep-links (doubles, shoes, brand compare, glossary, authenticity, Bonny)
- **`crux-template.csv`** ↔ `CRUX_OFFLINE_RECOVERY_PATHS` parity unit test
- E2E offline navigation for remaining CrUX field-data URLs
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT36_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT36_2026-06.md)

### Sprint 37 — Shipped (PR #185)

- **Lighthouse baseline** — captured CrUX-priority scores in `docs/baselines/lighthouse-scores.json`
- **`lighthouserc-baseline.json`** — 11-url subset aligned with `crux-template.csv`
- CI **`lint:lighthouse:baseline`** regression guard after full LHCI
- Reactions worker scaffold tests; `founderPersonJsonLd` conditional `sameAs`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT37_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT37_2026-06.md)

### Sprint 38 — Shipped (PR #186)

- **CrUX field-data validator** — `src/lib/crux-baseline.ts` + `npm run lint:crux-baseline`
- **GSC template** — `docs/baselines/gsc-template.csv` for owner exports
- CI CrUX guard after Lighthouse baseline compare (structure always; CWV thresholds when filled)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT38_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT38_2026-06.md)

### Sprint 39 — Shipped (PR #187)

- **GSC performance validator** — `src/lib/gsc-baseline.ts` + `npm run lint:gsc-baseline`
- **GSC regression guard** — `lint:gsc-baseline:compare` + `gsc-performance-baseline.json`
- CI GSC guard after CrUX guard (structure always; sanity + regression when filled)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT39_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT39_2026-06.md)

### Sprint 40 — Shipped (PR #188)

- **On-site search golden queries** — `docs/baselines/site-search-queries.json` (25 expectations)
- **Search regression guard** — `src/lib/search-baseline.ts` + `npm run lint:search-baseline`
- CI search guard after unit tests in `lint-and-build`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT40_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT40_2026-06.md)

### Sprint 41 — Shipped (PR #189)

- **Search routing + autocomplete golden queries** — submit href and suggestion expectations in baseline JSON
- **Reactions worker contract tests** — KV handler GET/POST/OPTIONS without deploy
- **Playwright golden-query e2e** — `e2e/search-baseline-smoke.spec.ts` for `"e2e": true` rows
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT41_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT41_2026-06.md)

### Sprint 42 — Shipped (PR #190)

- **Catalog keyword golden queries** — `docs/baselines/catalog-keyword-queries.json` (9 expectations)
- **Catalog regression guard** — `src/lib/catalog-baseline.ts` + `npm run lint:catalog-baseline`
- **Reactions client↔worker contract** — `src/lib/reactions-contract.ts` shared parsing + parity tests
- **Playwright engagement smoke** — `e2e/catalog-baseline-smoke.spec.ts`, `e2e/helpful-reaction-smoke.spec.ts`
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT42_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT42_2026-06.md)

### Sprint 43 — Shipped (PR #191)

- **Discovery parity golden pairs** — `docs/baselines/discovery-parity-queries.json` (product-intent routing ↔ catalog rows)
- **Discovery regression guard** — `src/lib/discovery-parity.ts` + `npm run lint:discovery-baseline`
- **Playwright funnel smoke** — `e2e/discovery-parity-smoke.spec.ts` (header submit → catalog results)
- **Reactions deploy runbook** — `workers/reactions/README.md` checklist
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT43_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT43_2026-06.md)

### Sprint 44 — Shipped (PR #192)

- **Finder golden profiles** — `docs/baselines/finder-profile-queries.json` (6 scoring-engine expectations)
- **Finder regression guard** — `src/lib/finder-baseline.ts` + `npm run lint:finder-baseline`
- **Unified discovery command** — `npm run lint:discovery-baselines` (search + catalog + parity)
- **Playwright finder smoke** — `e2e/finder-baseline-smoke.spec.ts` (quiz → results shortlist)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT44_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT44_2026-06.md)

### Sprint 45 — Shipped (PR #193)

- **Results share URL golden profiles** — `docs/baselines/results-url-queries.json` (4 URL round-trip expectations)
- **Results URL regression guard** — `src/lib/results-url-baseline.ts` + `npm run lint:results-url-baseline`
- **Unified product funnel command** — `npm run lint:product-funnel-baselines` (discovery + finder + results URL)
- **Playwright share URL smoke** — `e2e/results-url-baseline-smoke.spec.ts` (direct `/results/?` navigation)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT45_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT45_2026-06.md)

### Sprint 46 — Shipped (PR #194)

- **Compare share URL golden profiles** — `docs/baselines/compare-share-queries.json` (4 compare round-trip expectations)
- **Compare share regression guard** — `src/lib/compare-baseline.ts` + `npm run lint:compare-baseline`
- **Unified product funnel command** — extended `npm run lint:product-funnel-baselines` (discovery + finder + results + compare)
- **Playwright compare share smoke** — `e2e/compare-baseline-smoke.spec.ts` (direct `/compare/?` navigation)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT46_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT46_2026-06.md)

### Sprint 47 — Shipped (PR #195)

- **Review→product map golden profiles** — `docs/baselines/review-product-map-queries.json` (6 map + coverage expectations)
- **Review map regression guard** — `src/lib/review-product-map-baseline.ts` + `npm run lint:review-product-map-baseline`
- **Unified editorial command** — `npm run lint:editorial-baselines`
- **Playwright review map smoke** — `e2e/review-product-map-baseline-smoke.spec.ts` (review finder panel + catalog CTA)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT47_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT47_2026-06.md)

### Sprint 48 — Shipped (PR #196)

- **PDP golden profiles** — `docs/baselines/pdp-queries.json` (6 product + spec + review reverse-map expectations)
- **PDP regression guard** — `src/lib/pdp-baseline.ts` + `npm run lint:pdp-baseline`
- **Unified all-baselines command** — `npm run lint:all-baselines` (product funnel + editorial)
- **Extended editorial command** — `lint:editorial-baselines` now includes PDP guard
- **Playwright PDP smoke** — `e2e/pdp-baseline-smoke.spec.ts` (specs, finder CTA, catalog exit, review link)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT48_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT48_2026-06.md)

### Sprint 49 — Shipped (PR #197)

- **Best-of golden profiles** — `docs/baselines/best-queries.json` (6 slug + catalog exit + related reading expectations)
- **Best-of regression guard** — `src/lib/best-baseline.ts` + `npm run lint:best-baseline`
- **Extended editorial command** — `lint:editorial-baselines` now includes best-of guard
- **Playwright best-of smoke** — `e2e/best-baseline-smoke.spec.ts` (comparison table, Keep reading, catalog CTA)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT49_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT49_2026-06.md)

### Sprint 50 — Shipped (PR #198)

- **Compare-guides golden profiles** — `docs/baselines/compare-guides-queries.json` (6 slug + catalog exit + manifest + duel pick expectations)
- **Compare-guides regression guard** — `src/lib/compare-guides-baseline.ts` + `npm run lint:compare-guides-baseline`
- **Extended editorial command** — `lint:editorial-baselines` now includes compare-guides guard
- **Playwright compare-guides smoke** — `e2e/compare-guides-baseline-smoke.spec.ts` (catalog CTA, duel table, Keep reading)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT50_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT50_2026-06.md)

### Sprint 51 — Shipped (PR #199)

- **Guides golden profiles** — `docs/baselines/guides-queries.json` (6 slug + catalog exit + related reading expectations)
- **Guides regression guard** — `src/lib/guides-baseline.ts` + `npm run lint:guides-baseline`
- **Extended editorial command** — `lint:editorial-baselines` now includes guides guard
- **Playwright guides smoke** — `e2e/guides-baseline-smoke.spec.ts` (catalog CTA, Keep reading shelf)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT51_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT51_2026-06.md)

### Sprint 52 — Shipped (PR #200)

- **Tools golden profiles** — `docs/baselines/tools-queries.json` (5 slug + catalog exit + finder CTA expectations)
- **Tools regression guard** — `src/lib/tools-baseline.ts` + `npm run lint:tools-baseline`
- **Extended editorial command** — `lint:editorial-baselines` now includes tools guard
- **Playwright tools smoke** — `e2e/tools-baseline-smoke.spec.ts` (catalog CTA, finder exit)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT52_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT52_2026-06.md)

### Sprint 53 — Shipped (PR #201)

- **Brands golden profiles** — `docs/baselines/brands-queries.json` (8 slug + catalog exit + finder CTA expectations)
- **Brands regression guard** — `src/lib/brands-baseline.ts` + `npm run lint:brands-baseline`
- **Extended editorial command** — `lint:editorial-baselines` now includes brands guard
- **Playwright brands smoke** — `e2e/brands-baseline-smoke.spec.ts` (catalog CTA, finder exit, Keep reading on hub)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT53_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT53_2026-06.md)

### Sprint 54 — Shipped (PR #202)

- **Guides golden profiles extended** — all 11 Lighthouse guide slugs in `docs/baselines/guides-queries.json`
- **Best-of golden profiles extended** — 13 Lighthouse best-of slugs in `docs/baselines/best-queries.json`
- **Reviews hub golden profiles** — `docs/baselines/reviews-queries.json` (hub + article corpus expectations)
- **Reviews hub regression guard** — `src/lib/reviews-baseline.ts` + `npm run lint:reviews-baseline`
- **Extended editorial command** — `lint:editorial-baselines` now includes reviews hub guard
- **Playwright reviews smoke** — `e2e/reviews-baseline-smoke.spec.ts` (catalog CTA, finder exit, Keep reading on hub)
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT54_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT54_2026-06.md)

### Sprint 55 — Shipped (PR #203)

- **Best-of golden profiles complete** — all 19 wired slugs + `/best/` hub index in `docs/baselines/best-queries.json`
- **Compare-guides golden profiles complete** — all 12 wired slugs + `/compare-guides/` hub index
- **Editorial hub golden profiles** — `/guides/` and `/tools/` hub index rows with finder + catalog CTA
- **Hub index evaluator support** — `index` slug in best/guides/compare/tools baseline modules
- **e2e backfill** — brands tier-2, guides glossary/authenticity/roles, tools court diagram, best long tail
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT55_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT55_2026-06.md)

### Sprint 56 — Shipped (PR #204)

- **Per-article review golden profiles** — 6 priority article slugs in `docs/baselines/reviews-queries.json`
- **Reviews baseline evaluator extended** — `catalogHrefFromReviewSlug`, mapped/unmapped guards, equipment finder panel
- **e2e backfill** — CrUX Arcsaber 7 Pro, Nanoflare 1000Z, unmapped explainer decision-path shelf
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT56_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT56_2026-06.md)

### Sprint 57 — Shipped (PR #205)

- **Homepage golden profile** — `docs/baselines/home-queries.json` (CrUX `/` catalog/finder exit + commercial deep-links)
- **Shared popular searches** — `src/lib/home-popular-searches.ts` wired into homepage + CI guard
- **Review map parity** — `coverage.requireReviewMapParity` links reviews baseline to review-product-map slugs
- **Reviews e2e backfill** — all 5 mapped article slugs + hub in Playwright smoke
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT57_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT57_2026-06.md)

### Sprint 58 — Shipped (PR #206)

- **Featured review golden profiles** — 6 `home-featured-reviews.json` slugs in `reviews-queries.json`
- **Featured parity** — `coverage.requireFeaturedParity` links reviews baseline to homepage featured slice
- **Popular-search review guards** — Tour guide, Kumpoo profile, stringing-hole explainer article rows
- **Homepage featured href guard** — `expectFeaturedReviewHrefs` on CrUX `/` row + e2e card assertions
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT58_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT58_2026-06.md)

### Sprint 59 — Shipped (PR #207)

- **Lighthouse review URL expansion** — 6 review article URLs in `lighthouserc.json` (flagship, featured, popular-search, explainer)
- **Lighthouse parity** — `coverage.requireLighthouseParity` links reviews baseline to Lighthouse review article slugs
- **Shared path parser** — `src/lib/lighthouse-paths.ts` deduplicates URL parsing for PWA + baseline guards
- **PWA ib-v27** — precaches 5 additional Lighthouse review article shells
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT59_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT59_2026-06.md)

### Sprint 60 — Shipped (PR #208)

- **Compare-guide editorial review golden profiles** — 7 shelf-linked review slugs in `reviews-queries.json`
- **Compare-guide parity** — `coverage.requireCompareGuideReviewParity` links reviews baseline to compare-guide shelves
- **Popular-search parity** — `coverage.requirePopularSearchParity` links reviews baseline to homepage search grid review hrefs
- **Shared compare-guide review manifest** — `src/lib/compare-guide-reviews.ts`
- **PWA ib-v28** — precaches 7 compare-guide editorial review article shells
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT60_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT60_2026-06.md)

### Sprint 61 — Shipped (PR #209)

- **Full mapped corpus golden profiles** — 140 mapped review slugs in `reviews-queries.json` (22 → 142 article rows)
- **Full-corpus parity** — `coverage.requireFullMappedParity` links reviews baseline to `blog-review-product-map.json`
- **Baseline sync tooling** — `scripts/sync-reviews-baseline.mjs` + `npm run reviews:sync-baseline`
- **Shared mapped slug manifest** — `src/lib/mapped-review-slugs.ts`
- **Category-aware guards** — string/grip rows get catalog exit without equipment finder panel
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT61_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT61_2026-06.md)

### Sprint 62 — Shipped (PR #210)

- **Brand shelf review golden profiles** — 19 brand `relatedLinks` review slugs guarded via `requireBrandReviewParity`
- **Shared brand review manifest** — `src/lib/brand-reviews.ts`
- **PWA ib-v29** — precaches 16 brand shelf review shells + stringing-hole explainer
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT62_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT62_2026-06.md)

### Sprint 63 — Shipped (PR #211)

- **Homepage featured review PWA precache** — all 6 featured review shells offline-precached
- **Shared featured precache manifest** — `homeFeaturedReviewPrecachePaths()` in `home-featured.ts`
- **PWA ib-v30** — precaches 4 new featured shells (nanospeed, voltric, fz-100xx, leisu-800-lt)
- **Offline recovery** — Gosen Ryoga Shiden featured review on `/offline/` sidebar
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT63_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT63_2026-06.md)

### Sprint 64 — Shipped (PR #212)

- **Featured review offline recovery parity** — all 6 featured reviews on `/offline/` recovery sidebar
- **Popular-search review offline recovery** — all 4 homepage grid review picks on recovery sidebar
- **Shared offline recovery manifests** — `homeFeaturedOfflineRecoveryLinks()` + `homePopularSearchReviewOfflineRecoveryLinks()`
- **Parity guards** — `offline-recovery.test.ts` asserts featured + popular-search href coverage
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT64_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT64_2026-06.md)

### Sprint 65 — This branch

- **Popular-search editorial offline recovery parity** — all 22 non-review grid picks on `/offline/` recovery sidebar
- **Shared editorial recovery manifest** — `homePopularSearchEditorialOfflineRecoveryLinks()` in `home-popular-searches.ts`
- **Full grid parity guard** — `offline-recovery.test.ts` asserts every `homePopularSearchHrefs()` entry
- **E2e proof** — `pwa-offline-smoke.spec.ts` asserts full popular-search grid on recovery sidebar
- See [`WEB_APP_IMPROVEMENT_PLAN_SPRINT65_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT65_2026-06.md)

### Next (Sprint 66+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL`; fill `crux-template.csv` and `gsc-template.csv` from live exports
- Original photos on top commercial URLs
- Uncomment YouTube `sameAs` after channel claim

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
