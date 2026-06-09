# Web App Improvement Plan — Sprint 111 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-0362`  
**Baseline:** Sprint 110 — commercial shoe PDP e2e + strings/shuttles CrUX expansion (PR #259).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 111 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Every commercial racket pick has PDP smoke-tested | ✅ 44/44 commercial racket PDP e2e (was 15/44) |
| **RTINGS** | PDP e2e count can shrink silently in CI | ✅ `minPdpE2eGuards: 82` prevents regression |
| **Tennis Warehouse** | Filter-first catalog is core discovery UX | ✅ `/catalog/` in CrUX priority + offline recovery + lighthouse |
| **Wirecutter** | Commercial landings regression-guarded end-to-end | ✅ 44/44 commercial-racket golden profiles with e2e |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity.

---

## 2. Top 5 gaps (Sprint 111)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **29 commercial racket PDPs lack e2e** | Tier-4 and flagship racket picks on `/best/*` unguarded in Playwright | ✅ e2e on all 29 remaining PDP rows (53→82) |
| 2 | **29 commercial-racket golden profiles lack e2e** | `/best/*` editorial exits for rackets unguarded | ✅ e2e on all 29 remaining commercial-racket rows (15→44) |
| 3 | **No CI guard on PDP e2e count** | PDP e2e profiles can shrink silently | ✅ `minPdpE2eGuards: 82` in pdp-queries baseline |
| 4 | **`/catalog/` missing from CrUX priority set** | Filter-first browse not in CWV/offline recovery parity | ✅ CrUX template + offline recovery + lighthouse baseline |
| 5 | **Sprint 110 deferred items assessed** | YouTube sameAs, HelpfulReaction, CrUX PSI fill | ✅ assessed — blocked on owner channel/secret/API key |

**Deferred (Sprint 112+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Commercial racket PDP e2e completion | `docs/baselines/pdp-queries.json` (53→82 e2e profiles) |
| Commercial-racket e2e completion | `docs/baselines/commercial-racket-queries.json` (15→44 e2e) |
| PDP e2e coverage counter | `src/lib/pdp-baseline.ts`, `pdp-baseline.test.ts` |
| Catalog CrUX expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 110 deferred items + competitive audit | ✅ |
| 2 | All 82 PDP golden profiles have `e2e: true` | ✅ |
| 3 | All 44 commercial-racket golden profiles have `e2e: true` | ✅ |
| 4 | `minPdpE2eGuards: 82` enforced in evaluator | ✅ |
| 5 | CrUX template includes `/catalog/` | ✅ |
| 6 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 7 | Lighthouse baseline config + scores include `/catalog/` | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Tier-4 image / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:pdp-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/pdp-baseline-smoke.spec.ts
npx playwright test e2e/commercial-racket-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| PDP e2e golden profiles | 82 (was 53) |
| Commercial racket PDP e2e | 44/44 |
| Commercial-racket golden e2e | 44/44 |
| CrUX-priority commercial URLs | 17 paths (+1 catalog) |
| Commercial landings under image CI | 20/20 (unchanged) |
| All-category editorial parity picks | 80/80 (unchanged) |
| Review-map mapped e2e guards | 57 (unchanged) |
