# Web App Improvement Plan — Sprint 65 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-c215`  
**Baseline:** Sprint 64 — featured and popular-search review offline recovery parity (PR #212).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 65 response |
|------------|---------------------------|-------------------|
| **Wirecutter** | Homepage popular-search grid discoverable when offline | ✅ All 22 non-review popular-search picks on `/offline/` recovery sidebar |
| **Tennis Warehouse** | Best-of and brand deep-links surfaced in offline recovery | ✅ 12 best-of + 3 brand + 1 guide picks on recovery sidebar |
| **RTINGS** | Offline recovery parity regression-tested | ✅ Unit + e2e assert every `homePopularSearchHrefs()` entry |
| **BadmintonCentral** | Editorial grid reachable without prior visit memory | ✅ Shared `homePopularSearchEditorialOfflineRecoveryLinks()` manifest |
| **RacketGuide** | Shared manifest prevents offline/CI drift | ✅ Parity guard links popular-search grid ↔ recovery sidebar |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards, 142-article reviews golden corpus.

---

## 2. Top 5 gaps (Sprint 65)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Popular-search best-of offline recovery incomplete** | 12 `/best/*` grid picks missing from `/offline/` sidebar | ✅ `homePopularSearchEditorialOfflineRecoveryLinks()` |
| 2 | **Popular-search brand hub offline recovery missing** | Yonex, Victor, Li-Ning grid picks absent from recovery | ✅ Brand entries in editorial recovery manifest |
| 3 | **Popular-search guide offline recovery missing** | Shoes-vs-running guide absent from recovery | ✅ Guide entry in editorial recovery manifest |
| 4 | **No full popular-search↔offline-recovery parity guard** | Grid rotation can ship without recovery links | ✅ `offline-recovery.test.ts` asserts all `homePopularSearchHrefs()` |
| 5 | **Popular-search editorial offline e2e gap** | No Playwright proof recovery sidebar lists full grid | ✅ `pwa-offline-smoke.spec.ts` full-grid recovery test |

**Deferred (Sprint 66+):** owner deploy reactions worker + `REACTIONS_API_URL`; fill CrUX/GSC CSVs; original photography; YouTube `sameAs`; PWA precache for full 140+ review corpus (impractical).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Editorial offline recovery manifest | `src/lib/home-popular-searches.ts`, `src/lib/home-popular-searches.test.ts` |
| Offline recovery composition | `src/lib/offline-recovery-paths.ts` |
| Parity unit tests | `src/lib/offline-recovery.test.ts` |
| E2e recovery link smoke | `e2e/pwa-offline-smoke.spec.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 64 deferred items + competitive audit | ✅ |
| 2 | All 22 non-review popular-search hrefs already in PWA precache (ib-v30) | ✅ |
| 3 | `homePopularSearchEditorialOfflineRecoveryLinks()` covers every non-review grid pick | ✅ |
| 4 | Dedupe with `CORE_OFFLINE_RECOVERY_LINKS` — no duplicate sidebar rows | ✅ |
| 5 | Full `homePopularSearchHrefs()` parity — reviews + editorial | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: home-popular-searches + offline-recovery parity | ✅ |
| 8 | `npm run lint:editorial-baselines` pass | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | E2e asserts every popular-search href on `/offline/` | ✅ |

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
| Popular-search offline recovery | 100% (26/26 grid hrefs) |
| Featured review offline recovery | 100% (6/6 links) |
| Product funnel golden profiles | 100% pass in CI |
| Editorial hub golden profiles | 100% pass in CI |
