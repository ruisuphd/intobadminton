# Web App Improvement Plan — Sprint 110 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-dbbf`  
**Baseline:** Sprint 109 — accessory/shuttle PDP e2e + GP100 review-map guard + CrUX PSI capture (PR #258).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 110 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Every commercial shoe pick has PDP smoke-tested | ✅ 16/16 commercial shoe PDP e2e (was 6/16) |
| **RTINGS** | High-traffic commercial rackets on 4+ landings regression-guarded | ✅ DriveX 8S PDP e2e (aliases to DriveX 10 review) |
| **Wirecutter** | String/shuttle buying guides in CWV priority + homepage discovery | ✅ CrUX template + offline recovery + lighthouse + homepage chips |
| **Google CWV tooling** | PSI auto-capture wired into CI scaffold | ✅ `capture:crux-psi` in performance scaffold test |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity.

---

## 2. Top 5 gaps (Sprint 110)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **10 commercial shoe PDPs lack e2e** | `/best/shoes/` main picks (Eclipsion Z3, Bladesabre MAX, etc.) unguarded in Playwright | ✅ e2e on 10 remaining shoe PDP rows |
| 2 | **DriveX 8S PDP e2e missing** | 4 commercial landings reference unmapped Victor SKU | ✅ `pdp-racket-vic-drivex-8s` e2e enabled |
| 3 | **String/shuttle landings missing from CrUX priority set** | CWV/offline recovery drift for Sprint 104–107 commercial pages | ✅ CrUX template + offline recovery + lighthouse baseline |
| 4 | **Homepage popular-search CI omits strings/shuttles** | Accessory discovery parity vs grips/bags (Sprint 108) | ✅ `/best/strings/` + `/best/shuttles/` in home-queries + shuttles chip |
| 5 | **CrUX PSI capture not in performance scaffold test** | Sprint 109 script shipped without CI regression guard | ✅ `performance-capture-scaffold.test.ts` asserts `capture:crux-psi` |

**Deferred (Sprint 111+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Shoe + DriveX 8S PDP e2e | `docs/baselines/pdp-queries.json` (42→53 e2e profiles) |
| CrUX + offline + lighthouse expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Homepage discovery | `src/lib/home-popular-searches.ts`, `docs/baselines/home-queries.json` |
| CrUX PSI scaffold guard | `src/lib/performance-capture-scaffold.test.ts` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 109 deferred items + competitive audit | ✅ |
| 2 | All 16 commercial shoe picks have PDP `e2e: true` | ✅ |
| 3 | DriveX 8S PDP e2e enabled with alias to victor-drivex-10-review | ✅ |
| 4 | CrUX template includes strings + shuttles URLs | ✅ |
| 5 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 6 | Lighthouse baseline config + scores include strings + shuttles | ✅ |
| 7 | Homepage popular-search includes `/best/strings/` + `/best/shuttles/` | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Tier-4 image / VideoObject assessed — unchanged waivers | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:pdp-baseline
npm run lint:home-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/pdp-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| PDP e2e golden profiles | 53 (was 42) |
| Commercial shoe PDP e2e | 16/16 |
| CrUX-priority commercial URLs | 16 paths (+2 strings/shuttles) |
| Homepage popular-search commercial links | +1 shuttles (strings already in grid) |
| Commercial landings under image CI | 20/20 (unchanged) |
| All-category editorial parity picks | 80/80 (unchanged) |
| Review-map mapped e2e guards | 57 (unchanged) |
