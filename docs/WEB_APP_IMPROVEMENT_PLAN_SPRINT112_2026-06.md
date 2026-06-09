# Web App Improvement Plan — Sprint 112 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-27e7`  
**Baseline:** Sprint 111 — commercial racket PDP e2e completion + catalog CrUX expansion (PR #260).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 112 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Filter-first catalog exits regression-guarded end-to-end | ✅ 44/44 catalog-racket golden profiles with e2e |
| **RTINGS** | Commercial e2e counts can shrink silently in CI | ✅ `minE2eGuards` on all 6 commercial + catalog-racket baselines |
| **Wirecutter** | Homepage discovery chips match full editorial surface | ✅ 33/33 popular-search chips in home-queries CI |
| **Tennis Warehouse** | All commercial landings in CWV priority set | ✅ 20/20 image-CI landings in CrUX template (+13 paths) |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards.

---

## 2. Top 5 gaps (Sprint 112)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **29 catalog-racket golden profiles lack e2e** | Filter-first browse editorial exits unguarded in Playwright | ✅ e2e on all 29 remaining catalog-racket rows (15→44) |
| 2 | **No CI guard on commercial/catalog e2e counts** | Golden profiles can shrink silently post-Sprint 111 | ✅ `minE2eGuards` on catalog-racket + 6 commercial baselines |
| 3 | **17 homepage popular-search chips unguarded** | Discovery regression on 33-chip grid | ✅ `expectPopularSearchHrefs` 16→33 + `minPopularSearchHrefs: 33` |
| 4 | **13 commercial landings missing from CrUX priority** | CWV/offline recovery gap on racket/shoe landings | ✅ CrUX template + offline recovery + lighthouse baseline |
| 5 | **Sprint 111 deferred items assessed** | YouTube sameAs, HelpfulReaction, string hands-on, images | ✅ assessed — blocked on owner channel/secret/API key |

**Deferred (Sprint 113+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog-racket e2e completion | `docs/baselines/catalog-racket-queries.json` (15→44 e2e) |
| E2e coverage counters | `src/lib/baseline-coverage.ts`, commercial-* + catalog-racket baselines |
| Homepage discovery CI parity | `docs/baselines/home-queries.json`, `src/lib/home-baseline.ts` |
| Commercial CrUX expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 111 deferred items + competitive audit | ✅ |
| 2 | All 44 catalog-racket golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 44` on catalog-racket baseline | ✅ |
| 4 | `minE2eGuards` on all 6 commercial baselines (80 total) | ✅ |
| 5 | `minPopularSearchHrefs: 33` enforced in home baseline | ✅ |
| 6 | CrUX template includes all 20 image-CI commercial landings | ✅ |
| 7 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 8 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 9 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:catalog-racket-baseline
npm run lint:commercial-racket-baseline
npm run lint:home-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/catalog-racket-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Catalog-racket e2e golden profiles | 44 (was 15) |
| Commercial e2e golden profiles | 80/80 (unchanged, now guarded) |
| PDP e2e golden profiles | 82 (unchanged) |
| Homepage popular-search CI hrefs | 33 (was 16) |
| CrUX-priority commercial URLs | 30 paths (+13 commercial landings) |
| Commercial landings under image CI | 20/20 (unchanged) |
| All-category editorial parity picks | 80/80 (unchanged) |
