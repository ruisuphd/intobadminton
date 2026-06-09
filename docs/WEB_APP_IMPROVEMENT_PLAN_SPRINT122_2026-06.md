# Web App Improvement Plan — Sprint 122 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-1d3c`  
**Baseline:** Sprint 121 — trust-path e2e expansion + consent/transparency CrUX expansion (PR #271).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 122 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Shoe-fit editorial clusters in CWV monitoring | ✅ `/guides/wide-feet-badminton-shoes/` in crux-template + offline recovery + lighthouse baseline |
| **Wirecutter** | Seasonal refresh / freshness editorial paths | ✅ `/guides/season-refresh/` in crux-template + offline recovery + lighthouse baseline |
| **RTINGS / Wirecutter** | Authenticity checker tools in performance set | ✅ `/tools/authenticity-checker/` in crux-template + offline recovery + lighthouse baseline |
| **Tennis Warehouse** | Flagship head-to-head duels in CWV set | ✅ `/compare-guides/astrox-99-pro-vs-astrox-100zz/` in crux-template + offline recovery + lighthouse baseline |
| **Wirecutter** | Homepage popular-search editorial paths browser-guarded | ✅ `/guides/badminton-shoes-vs-running-shoes/` in trust-path e2e (CrUX added Sprint 121) |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 14 trust-path e2e guards.

---

## 2. Top 5 gaps (Sprint 122)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Shoe-fit guide missing from trust-path e2e** | Sprint 121 added CrUX but left homepage popular-search editorial without trust-path CI guard | ✅ `/guides/badminton-shoes-vs-running-shoes/` in trust-path e2e (`minE2eGuards: 14`) |
| 2 | **Wide-feet guide missing from CrUX** | Shoe-fit cluster absent from CWV monitoring | ✅ `/guides/wide-feet-badminton-shoes/` in crux-template (+ offline recovery + lighthouse baseline) |
| 3 | **Season-refresh guide missing from CrUX** | Editorial freshness cluster absent from CWV monitoring | ✅ `/guides/season-refresh/` in crux-template (+ offline recovery + lighthouse baseline) |
| 4 | **Authenticity checker missing from CrUX** | Counterfeit-check tool absent from CWV monitoring | ✅ `/tools/authenticity-checker/` in crux-template (+ offline recovery + lighthouse baseline) |
| 5 | **Flagship duel missing from CrUX** | Astrox 99 Pro vs 100ZZ e2e-guarded but not in CWV set | ✅ `/compare-guides/astrox-99-pro-vs-astrox-100zz/` in crux-template (+ offline recovery + lighthouse baseline) |

**Deferred (Sprint 123+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust-path e2e expansion | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts`, `src/lib/trust-path-baseline.test.ts` |
| CrUX editorial cluster expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 121 deferred items + competitive audit | ✅ |
| 2 | All 14 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 14` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes wide-feet, season-refresh, authenticity-checker, flagship duel | ✅ |
| 5 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 6 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 7 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 8 | Site-search product-intent queries assessed — remain in discovery-parity layer | ✅ by design |
| 9 | Yonex string articles / tier-4 images assessed — content deferred | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` + trust-path e2e smokes pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:trust-path-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/trust-path-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Trust-path e2e golden profiles | 14 (was 13) |
| Trust-path `minE2eGuards` | 14 |
| CrUX-priority non-home paths | 66 (+4 wide-feet, season-refresh, authenticity-checker, flagship duel) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
