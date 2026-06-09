# Web App Improvement Plan — Sprint 117 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b661`  
**Baseline:** Sprint 116 — product-funnel e2e completion + guides hub CrUX expansion (PR #265).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 117 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Product-id search → catalog rows smoke-tested | ✅ discovery parity e2e 2→4; `minE2eGuards: 4` |
| **Wirecutter / RTINGS** | Methodology / scoring transparency in CWV set | ✅ `/methodology/` in crux-template + offline recovery + lighthouse baseline |
| **Tennis Warehouse** | Brand hub discovery in performance monitoring | ✅ `/brands/` hub in crux-template + offline recovery + lighthouse baseline |
| **RTINGS** | Homepage e2e count can shrink silently | ✅ `minE2eGuards: 1` on home baseline |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 6 finder e2e guards, 4 results-url e2e guards, 4 compare-share e2e guards.

---

## 2. Top 5 gaps (Sprint 117)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **2/4 discovery-parity golden pairs lack e2e** | Product-id alias + string SKU routing unguarded in browser | ✅ e2e on yy-ac102c + yy-bg65 (2→4) |
| 2 | **No CI guard on discovery-parity e2e count** | Product-intent routing e2e can shrink silently | ✅ `minE2eGuards: 4` on discovery-parity baseline |
| 3 | **No CI guard on homepage e2e count** | CrUX landing smoke can regress without CI failure | ✅ `minE2eGuards: 1` on home baseline |
| 4 | **Brand hub missing from CrUX** | Brand discovery funnel absent from CWV/offline recovery | ✅ `/brands/` in crux-template (+ offline recovery + lighthouse baseline) |
| 5 | **Methodology page missing from CrUX** | E-E-A-T trust page absent from CWV/offline recovery | ✅ `/methodology/` in crux-template (+ offline recovery + lighthouse baseline) |

**Deferred (Sprint 118+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring; site-search product-intent queries (ac102c, yy-ac102c) remain in discovery-parity layer — excluded from site-search e2e by design (redirect to catalog).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Discovery parity e2e completion + guards | `docs/baselines/discovery-parity-queries.json`, `src/lib/discovery-parity.ts`, `src/lib/discovery-parity.test.ts`, `e2e/discovery-parity-smoke.spec.ts` |
| Home baseline e2e guard | `docs/baselines/home-queries.json`, `src/lib/home-baseline.ts`, `src/lib/home-baseline.test.ts` |
| CrUX trust/discovery expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 116 deferred items + competitive audit | ✅ |
| 2 | All 4 discovery-parity golden pairs have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 4` enforced on discovery-parity baseline | ✅ |
| 4 | `minE2eGuards: 1` enforced on home baseline | ✅ |
| 5 | CrUX template includes `/brands/` hub + `/methodology/` | ✅ |
| 6 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 7 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 8 | HelpfulReaction / VideoObject / YouTube sameAs assessed — unchanged waivers | ✅ deferred |
| 9 | Site-search product-intent queries assessed — remain in discovery-parity layer | ✅ by design |
| 10 | `npm test` + baselines + `npm run build` + discovery/home e2e smokes pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:discovery-baseline
npm run lint:home-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/discovery-parity-smoke.spec.ts e2e/home-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Discovery-parity e2e golden pairs | 4 (was 2) |
| Discovery-parity `minE2eGuards` | 4 |
| Home `minE2eGuards` | 1 |
| CrUX-priority non-home paths | 41 (+2 brands hub, methodology) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
