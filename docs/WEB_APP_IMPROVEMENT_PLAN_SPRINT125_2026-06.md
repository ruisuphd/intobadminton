# Web App Improvement Plan — Sprint 125 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-23d9`  
**Baseline:** Sprint 124 — trust-path procedural parity + toolkit CrUX expansion (PR #274).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 125 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Flagship head-to-head duels in CWV monitoring with trust-path CI | ✅ five `/compare-guides/*` flagship duels in crux-template + offline recovery + lighthouse baseline |
| **Wirecutter** | Procedural shoe/doubles education browser-guarded on trust paths | ✅ `/guides/shoes-footwork/` + `/guides/doubles-roles/` in trust-path e2e |
| **Tennis Warehouse** | Cross-brand power comparisons (Yonex vs Li-Ning) in performance set | ✅ `/compare-guides/astrox-99-pro-vs-halbertec-9000-power/` in CrUX |
| **RacketGuide-style finders** | Speed-frame flagship duels monitored for CWV regressions | ✅ Bladex vs Nanoflare 1000Z + Nanoflare vs Auraspeed 99 in CrUX |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 24 trust-path e2e guards.

---

## 2. Top 5 gaps (Sprint 125)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Shoes-footwork procedural guide missing from trust-path e2e** | Sprint 124 added CrUX but left shoe procedural education without trust-path CI guard | ✅ `/guides/shoes-footwork/` in trust-path e2e (`minE2eGuards: 24`) |
| 2 | **Doubles-roles procedural guide missing from trust-path e2e** | Doubles role education e2e-guarded in guides baseline but absent from trust-path CI | ✅ `/guides/doubles-roles/` in trust-path e2e |
| 3 | **Cross-brand power duel missing from CrUX** | Astrox 99 Pro vs Halbertec 9000 Power e2e-guarded but not in CWV monitoring | ✅ `/compare-guides/astrox-99-pro-vs-halbertec-9000-power/` in crux-template (+ offline recovery + lighthouse baseline) |
| 4 | **Li-Ning power duel missing from CrUX** | Halbertec vs AxForce 100 Gen 2 e2e-guarded but not in CWV set | ✅ `/compare-guides/halbertec-9000-power-vs-axforce-100-gen-2/` in crux-template (+ offline recovery + lighthouse baseline) |
| 5 | **Speed flagship duels missing from CrUX** | Bladex vs Nanoflare 1000Z, Nanoflare vs Auraspeed 99, and doubles 88D duel e2e-guarded but not in CWV set | ✅ three `/compare-guides/*` paths in crux-template (+ offline recovery + lighthouse baseline) |

**Deferred (Sprint 126+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi`); HelpfulReaction production wiring; remaining long-tail compare duels (77 Pro vs 88S Pro, 65Z4 vs Eclipsion Z3, Nanoflare 800 Pro vs Auraspeed HS Plus).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust-path e2e expansion | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts`, `src/lib/trust-path-baseline.test.ts` |
| Compare-guide duel CrUX expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 124 deferred items + competitive audit | ✅ |
| 2 | All 24 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 24` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes five flagship compare-guide duels | ✅ |
| 5 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 6 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 7 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 8 | Remaining long-tail compare duels assessed — deferred to Sprint 126 | ✅ deferred |
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
| Trust-path e2e golden profiles | 24 (was 22) |
| Trust-path `minE2eGuards` | 24 |
| CrUX-priority non-home paths | 82 (+5 flagship compare duels) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
