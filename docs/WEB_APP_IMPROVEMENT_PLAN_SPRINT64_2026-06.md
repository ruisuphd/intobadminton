# Web App Improvement Plan — Sprint 64 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3714`  
**Baseline:** Sprint 63 — homepage featured review PWA precache, ib-v30 (PR #211).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 64 response |
|------------|---------------------------|-------------------|
| **Wirecutter** | Homepage featured picks discoverable when offline | ✅ All 6 featured reviews on `/offline/` recovery sidebar |
| **Tennis Warehouse** | Popular-search deep-links surfaced in offline recovery | ✅ All 4 popular-search review picks on recovery sidebar |
| **RTINGS** | Offline recovery parity regression-tested | ✅ Unit tests assert featured + popular-search href parity |
| **BadmintonCentral** | Editorial picks reachable without prior visit memory | ✅ Shared manifests in `home-featured.ts` + `home-popular-searches.ts` |
| **RacketGuide** | Shared manifest prevents offline/CI drift | ✅ `homeFeaturedOfflineRecoveryLinks()` + `homePopularSearchReviewOfflineRecoveryLinks()` |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards, 142-article reviews golden corpus.

---

## 2. Top 5 gaps (Sprint 64)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Featured review offline recovery incomplete** | 5/6 featured picks missing from `/offline/` sidebar | ✅ Shared `homeFeaturedOfflineRecoveryLinks()` |
| 2 | **Popular-search review offline recovery missing** | 4 homepage grid review deep-links absent from recovery | ✅ `homePopularSearchReviewOfflineRecoveryLinks()` |
| 3 | **No shared featured↔offline-recovery manifest** | Recovery sidebar can drift from `home-featured-reviews.json` | ✅ `homeFeaturedOfflineRecoveryLinks()` in `home-featured.ts` |
| 4 | **No offline recovery parity guard for homepage editorial picks** | Featured/popular-search rotation ships without recovery links | ✅ `offline-recovery.test.ts` parity assertions |
| 5 | **Featured/popular-search offline e2e gap** | No Playwright proof recovery sidebar lists editorial picks | ✅ `pwa-offline-smoke.spec.ts` recovery link test |

**Deferred (Sprint 65+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; PWA precache for full 140+ review corpus (impractical).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Featured offline recovery manifest | `src/lib/home-featured.ts`, `src/lib/home-featured.test.ts` |
| Popular-search offline recovery manifest | `src/lib/home-popular-searches.ts`, `src/lib/home-popular-searches.test.ts` |
| Offline recovery composition | `src/lib/offline-recovery-paths.ts` |
| Parity unit tests | `src/lib/offline-recovery.test.ts` |
| E2e recovery link smoke | `e2e/pwa-offline-smoke.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 63 deferred items + competitive audit | ✅ |
| 2 | All 6 featured hrefs already in PWA precache (Sprint 63) | ✅ |
| 3 | All 4 popular-search review hrefs already in PWA precache | ✅ |
| 4 | `homeFeaturedOfflineRecoveryLinks()` covers every featured slug | ✅ |
| 5 | `homePopularSearchReviewOfflineRecoveryLinks()` covers every popular-search review | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: home-featured + home-popular-searches + offline-recovery parity | ✅ |
| 8 | `npm run lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | E2e asserts featured + popular-search recovery links on `/offline/` | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:reviews-baseline
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Reviews golden profiles | Hub + full mapped corpus (140) + brand shelves + featured in CI |
| Featured review offline recovery | 100% (6/6 links) |
| Popular-search review offline recovery | 100% (4/4 links) |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
