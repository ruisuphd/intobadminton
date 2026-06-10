# Web App Improvement Plan — Sprint 123 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-39e3`  
**Baseline:** Sprint 122 — trust-path e2e completion + editorial-cluster CrUX expansion (PR #272).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 123 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Procedural racket education (balance, doubles fit) in CWV monitoring | ✅ `/guides/racket-balance/` + `/guides/doubles-positioning-and-rackets/` in crux-template + offline recovery + lighthouse baseline |
| **RacketGuide-style finders** | String feel vs durability education in performance set | ✅ `/guides/string-feel-vs-durability/` in crux-template + offline recovery + lighthouse baseline |
| **Tennis Warehouse** | Shoe crossover compare guides in CWV monitoring | ✅ `/compare-guides/badminton-vs-tennis-shoes/` in crux-template + offline recovery + lighthouse baseline |
| **Wirecutter** | Homepage popular-search editorial paths browser-guarded | ✅ wide-feet, equipment-authenticity, season-refresh guides in trust-path e2e (CrUX added Sprint 122) |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 17 trust-path e2e guards.

---

## 2. Top 5 gaps (Sprint 123)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Wide-feet guide missing from trust-path e2e** | Sprint 122 added CrUX but left homepage popular-search editorial without trust-path CI guard | ✅ `/guides/wide-feet-badminton-shoes/` in trust-path e2e (`minE2eGuards: 17`) |
| 2 | **Equipment-authenticity guide missing from trust-path e2e** | Homepage popular-search counterfeit path absent from trust-path CI | ✅ `/guides/equipment-authenticity/` in trust-path e2e |
| 3 | **Season-refresh guide missing from trust-path e2e** | Editorial freshness cluster absent from trust-path CI | ✅ `/guides/season-refresh/` in trust-path e2e |
| 4 | **Procedural guides missing from CrUX** | Racket balance, doubles positioning, string feel e2e-guarded but not in CWV monitoring | ✅ three `/guides/*` paths in crux-template (+ offline recovery + lighthouse baseline) |
| 5 | **Shoe crossover compare missing from CrUX** | Badminton vs tennis shoes e2e-guarded but not in CWV set | ✅ `/compare-guides/badminton-vs-tennis-shoes/` in crux-template (+ offline recovery + lighthouse baseline) |

**Deferred (Sprint 124+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust-path e2e expansion | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts`, `src/lib/trust-path-baseline.test.ts` |
| CrUX procedural + shoe crossover expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 122 deferred items + competitive audit | ✅ |
| 2 | All 17 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 17` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes racket-balance, doubles-positioning, string-feel, shoe crossover | ✅ |
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
| Trust-path e2e golden profiles | 17 (was 14) |
| Trust-path `minE2eGuards` | 17 |
| CrUX-priority non-home paths | 72 (+4 procedural guides + shoe crossover) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
