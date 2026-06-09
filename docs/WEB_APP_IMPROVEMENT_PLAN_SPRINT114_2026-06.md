# Web App Improvement Plan — Sprint 114 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-93f7`  
**Baseline:** Sprint 113 — catalog category e2e guards + keyword e2e completion + CrUX expansion (PR #262).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 114 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Site search → filtered browse on every commercial intent | ✅ 26/26 page-renderable golden queries with e2e |
| **RacketGuide-style finders** | Procedural guides → catalog exits regression-guarded | ✅ 12/12 guides golden profiles with e2e |
| **RTINGS** | Editorial e2e counts can shrink silently post-Sprint 113 | ✅ `minE2eGuards` on guides, tools, brands, site-search |
| **Wirecutter** | PDP + search + brand hubs in CWV priority set | ✅ `/search/`, sample PDP, `/guides/string-tension/`, `/brands/yonex/`, `/tools/` in CrUX template |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards.

---

## 2. Top 5 gaps (Sprint 114)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **22/26 site-search golden queries lack e2e** | Discovery regression on best-of + cluster pillars | ✅ e2e on 26 page-renderable queries (4→26; product-intent excluded) |
| 2 | **2/12 guides golden profiles lack e2e** | Shoe-fit + freshness cluster exits unguarded | ✅ wide-feet + season-refresh e2e (10→12) |
| 3 | **No CI guard on editorial/search e2e counts** | Guides/tools/brands/search e2e can shrink silently | ✅ `minE2eGuards` on 4 editorial baselines |
| 4 | **Search, PDP, flagship guide/brand/tool missing from CrUX** | CWV/offline recovery gap on discovery funnel | ✅ 5 new CrUX paths (+ offline recovery + lighthouse baseline) |
| 5 | **Sprint 113 deferred items assessed** | YouTube sameAs, HelpfulReaction, string hands-on, images | ✅ assessed — blocked on owner channel/secret/API key |

**Deferred (Sprint 115+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Site search e2e completion | `docs/baselines/site-search-queries.json`, `src/lib/search-baseline.ts` |
| Guides e2e completion | `docs/baselines/guides-queries.json`, `src/lib/guides-baseline.ts` |
| Editorial e2e guards | `docs/baselines/tools-queries.json`, `docs/baselines/brands-queries.json`, baseline libs + tests |
| CrUX expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 113 deferred items + competitive audit | ✅ |
| 2 | All 26 page-renderable site-search golden queries have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 26` enforced on site-search baseline | ✅ |
| 4 | All 12 guides golden profiles have `e2e: true` | ✅ |
| 5 | `minE2eGuards` on guides (12), tools (6), brands (8) | ✅ |
| 6 | CrUX template includes search, PDP, string-tension guide, Yonex hub, tools hub | ✅ |
| 7 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 8 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 9 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:search-baseline
npm run lint:guides-baseline
npm run lint:tools-baseline
npm run lint:brands-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/search-baseline-smoke.spec.ts e2e/guides-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Site-search e2e golden queries | 26 (was 4) |
| Guides e2e golden profiles | 12 (was 10) |
| Editorial `minE2eGuards` baselines | 4/4 (search, guides, tools, brands) |
| CrUX-priority non-home paths | 36 (+5 search, PDP, guide, brand, tools) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
