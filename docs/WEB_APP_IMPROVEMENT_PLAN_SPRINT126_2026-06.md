# Web App Improvement Plan — Sprint 126 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-0423`  
**Baseline:** Sprint 125 — trust-path shoe/doubles parity + flagship compare-guide CrUX expansion (PR #275).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 126 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Even-balance and mid-tier racket duels in CWV monitoring | ✅ `/compare-guides/astrox-77-pro-vs-88s-pro/` in crux-template + offline recovery + lighthouse baseline |
| **Tennis Warehouse** | Shoe flagship duels (court vs stability) in performance set | ✅ `/compare-guides/yonex-65z4-vs-eclipsion-z3/` in CrUX |
| **Wirecutter** | Pro-tier speed-frame cross-brand comparisons monitored for CWV regressions | ✅ `/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/` in CrUX |
| **RacketGuide-style finders** | Long-tail duel pages precached for offline recovery | ✅ three duels in `CORE_OFFLINE_RECOVERY_LINKS` (already in PWA precache) |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 24 trust-path e2e guards, 13 compare-guides e2e guards.

---

## 2. Top 5 gaps (Sprint 126)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Even-balance Yonex duel missing from CrUX** | Astrox 77 Pro vs 88S Pro e2e-guarded but not in CWV monitoring | ✅ `/compare-guides/astrox-77-pro-vs-88s-pro/` in crux-template (+ offline recovery + lighthouse baseline) |
| 2 | **Shoe flagship duel missing from CrUX** | Yonex 65 Z4 vs Eclipsion Z3 e2e-guarded but not in CWV set | ✅ `/compare-guides/yonex-65z4-vs-eclipsion-z3/` in crux-template (+ offline recovery + lighthouse baseline) |
| 3 | **Pro speed duel missing from CrUX** | Nanoflare 800 Pro vs Auraspeed HS Plus e2e-guarded but not in CWV set | ✅ `/compare-guides/nanoflare-800-pro-vs-auraspeed-hs-plus/` in crux-template (+ offline recovery + lighthouse baseline) |
| 4 | **Long-tail duels missing from offline recovery sidebar** | CrUX paths must appear on `/offline/` recovery links | ✅ three duels in `CORE_OFFLINE_RECOVERY_LINKS` |
| 5 | **Compare-guide CrUX coverage incomplete vs e2e baseline** | 13/13 compare-guides e2e guards but only 10/13 in CrUX before Sprint 126 | ✅ 13/13 compare-guide duels now in CrUX (hub + concept pages + all 10 duels) |

**Deferred (Sprint 127+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi`); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Long-tail compare-guide CrUX expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 125 deferred items + competitive audit | ✅ |
| 2 | All 13 compare-guides golden profiles still have `e2e: true` | ✅ unchanged |
| 3 | `minE2eGuards: 13` enforced on compare-guides baseline | ✅ unchanged |
| 4 | CrUX template includes all three long-tail compare-guide duels | ✅ |
| 5 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 6 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 7 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 8 | Trust-path e2e assessed — complete at 24 guards; no new trust paths needed | ✅ unchanged |
| 9 | Yonex string articles / tier-4 images assessed — content deferred | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` + compare-guides e2e smokes pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/compare-guides-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Trust-path e2e golden profiles | 24 (unchanged) |
| Trust-path `minE2eGuards` | 24 (unchanged) |
| CrUX-priority non-home paths | 85 (+3 long-tail compare duels) |
| Compare-guides e2e golden profiles | 13 (unchanged) |
| Compare-guides in CrUX | 13/13 (complete) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
