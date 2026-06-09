# Web App Improvement Plan — Sprint 119 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3e44`  
**Baseline:** Sprint 118 — trust-path e2e baseline + E-E-A-T CrUX expansion (PR #267).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 119 response |
|------------|---------------------------|---------------------|
| **Wirecutter / RTINGS** | FAQ + source-policy pages in CWV monitoring | ✅ `/faq/` + `/source-policy/` in crux-template + offline recovery + lighthouse baseline |
| **Tennis Warehouse** | Price-band buying guides regression-guarded in CWV set | ✅ `/best/rackets-under-150/` + `/best/rackets-under-200/` in crux-template |
| **Tennis Warehouse** | Flagship brand hubs (Victor, Li-Ning) in performance monitoring | ✅ `/brands/victor/` + `/brands/li-ning/` in crux-template |
| **Tennis Warehouse** | Support/trust pages browser-guarded | ✅ trust-path e2e 4→6; `minE2eGuards: 6` |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 6 finder e2e guards, 4 discovery-parity e2e guards, 4 results-url e2e guards, 4 compare-share e2e guards.

---

## 2. Top 5 gaps (Sprint 119)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Source-policy missing from CrUX** | Copyright/evidence policy absent from CWV monitoring | ✅ `/source-policy/` in crux-template (+ offline recovery + lighthouse baseline) |
| 2 | **FAQ missing from CrUX** | High-intent support page absent from CWV monitoring | ✅ `/faq/` in crux-template (+ offline recovery + lighthouse baseline) |
| 3 | **Price-band best pages missing from CrUX** | `/best/rackets-under-150/` and `/best/rackets-under-200/` e2e-guarded but not in CWV set | ✅ both in crux-template (+ offline recovery + lighthouse baseline) |
| 4 | **Victor/Li-Ning brand hubs missing from CrUX** | Flagship brand discovery paths absent from CWV monitoring | ✅ `/brands/victor/` + `/brands/li-ning/` in crux-template |
| 5 | **No CI guard on expanded trust-path e2e** | FAQ/source-policy lack trust-path `minE2eGuards` | ✅ `trust-path-queries.json` + `minE2eGuards: 6` |

**Deferred (Sprint 120+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust-path e2e expansion | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts`, `src/lib/trust-path-baseline.test.ts` |
| CrUX commercial + trust expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 118 deferred items + competitive audit | ✅ |
| 2 | All 6 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 6` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes `/source-policy/`, `/faq/`, price-band best pages, Victor/Li-Ning hubs | ✅ |
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
| Trust-path e2e golden profiles | 6 (was 4) |
| Trust-path `minE2eGuards` | 6 |
| CrUX-priority non-home paths | 51 (+6 source-policy, faq, 2 price-band, 2 brand hubs) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
