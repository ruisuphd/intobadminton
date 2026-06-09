# Web App Improvement Plan — Sprint 115 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-8669`  
**Baseline:** Sprint 114 — site search e2e completion + editorial e2e guards + discovery CrUX expansion (PR #263).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 115 response |
|------------|---------------------------|---------------------|
| **Wirecutter** | Programmatic best-of hubs regression-guarded at CI | ✅ `minE2eGuards: 23` on best baseline |
| **Tennis Warehouse** | Head-to-head compare guides fully smoke-tested | ✅ compare-guides e2e 8→13; `minE2eGuards: 13` |
| **RTINGS** | Review archive hub + flagship articles in CWV set | ✅ `minE2eGuards: 15` on reviews baseline |
| **Wirecutter / TW** | Editorial hub URLs in CrUX + offline recovery | ✅ `/best/`, `/compare-guides/` in crux-template + lighthouse baseline |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 26 site-search e2e guards.

---

## 2. Top 5 gaps (Sprint 115)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No CI guard on best-of e2e count** | 23 golden profiles can shrink silently | ✅ `minE2eGuards: 23` on best baseline |
| 2 | **5/13 compare-guide golden profiles lack e2e** | Duel pages unguarded post-Sprint 114 | ✅ e2e on all 13 compare-guide profiles (8→13) |
| 3 | **No CI guard on compare-guides / reviews e2e** | Editorial funnel regression blind spot | ✅ `minE2eGuards` on compare-guides (13) + reviews (15) |
| 4 | **Best-of + compare-guides hubs missing from CrUX** | CWV/offline recovery gap on editorial hubs | ✅ `/best/`, `/compare-guides/` in crux-template + offline recovery + lighthouse baseline |
| 5 | **Sprint 114 deferred items assessed** | YouTube sameAs, HelpfulReaction, string hands-on, images | ✅ assessed — blocked on owner channel/secret/API key |

**Deferred (Sprint 116+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Best e2e guards | `docs/baselines/best-queries.json`, `src/lib/best-baseline.ts`, tests |
| Compare-guides e2e completion + guards | `docs/baselines/compare-guides-queries.json`, `src/lib/compare-guides-baseline.ts`, tests |
| Reviews e2e guards | `docs/baselines/reviews-queries.json`, `src/lib/reviews-baseline.ts`, tests |
| CrUX hub expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 114 deferred items + competitive audit | ✅ |
| 2 | All 23 best golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 23` enforced on best baseline | ✅ |
| 4 | All 13 compare-guides golden profiles have `e2e: true` | ✅ |
| 5 | `minE2eGuards: 13` on compare-guides; `minE2eGuards: 15` on reviews | ✅ |
| 6 | CrUX template includes `/best/` and `/compare-guides/` hubs | ✅ |
| 7 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 8 | Lighthouse baseline config + scores include new hub paths | ✅ |
| 9 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` + e2e smokes pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:best-baseline
npm run lint:compare-guides-baseline
npm run lint:reviews-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/best-baseline-smoke.spec.ts e2e/compare-guides-baseline-smoke.spec.ts e2e/reviews-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Best `minE2eGuards` | 23 |
| Compare-guides e2e golden profiles | 13 (was 8) |
| Compare-guides `minE2eGuards` | 13 |
| Reviews `minE2eGuards` | 15 |
| CrUX-priority non-home paths | 38 (+2 best hub, compare-guides hub) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
