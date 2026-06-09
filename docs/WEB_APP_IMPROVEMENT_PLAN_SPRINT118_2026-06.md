# Web App Improvement Plan — Sprint 118 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-c7fa`  
**Baseline:** Sprint 117 — discovery parity e2e completion + trust-path CrUX expansion (PR #266).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 118 response |
|------------|---------------------------|---------------------|
| **Wirecutter / RTINGS** | Author bylines + methodology transparency in CWV set | ✅ `/about/` + `/authors/rui-su/` in crux-template + offline recovery + lighthouse baseline |
| **Wirecutter** | Source policy / claims registry in performance monitoring | ✅ `/sources/` + `/data/` in crux-template + offline recovery + lighthouse baseline |
| **Tennis Warehouse** | Trust pages regression-guarded in browser | ✅ trust-path e2e baseline 0→4; `minE2eGuards: 4` |
| **RTINGS** | E-E-A-T trust e2e count can shrink silently | ✅ `minE2eGuards: 4` on trust-path baseline |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 6 finder e2e guards, 4 discovery-parity e2e guards, 4 results-url e2e guards, 4 compare-share e2e guards.

---

## 2. Top 5 gaps (Sprint 118)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Claims registry missing from CrUX** | `/data/` trust moat absent from CWV/offline recovery sync | ✅ `/data/` in crux-template (+ offline recovery + lighthouse baseline) |
| 2 | **About page missing from CrUX** | E-E-A-T founder story absent from CWV monitoring | ✅ `/about/` in crux-template (+ offline recovery + lighthouse baseline) |
| 3 | **Sources page missing from CrUX** | Source-authority policy absent from CWV monitoring | ✅ `/sources/` in crux-template (+ offline recovery + lighthouse baseline) |
| 4 | **No CI guard on trust-path e2e** | About/sources/data e2e in hub-shelf but no `minE2eGuards` | ✅ `trust-path-queries.json` + `minE2eGuards: 4` |
| 5 | **Author profile missing from CrUX** | Lead reviewer credibility page absent from CWV set | ✅ `/authors/rui-su/` in crux-template (+ offline recovery + lighthouse baseline) |

**Deferred (Sprint 119+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust-path e2e baseline + guards | `docs/baselines/trust-path-queries.json`, `src/lib/trust-path-baseline.ts`, `src/lib/trust-path-baseline.test.ts`, `e2e/trust-path-baseline-smoke.spec.ts`, `scripts/trust-path-baseline.mjs` |
| CrUX E-E-A-T expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| CI wiring | `package.json`, `scripts/discovery-baselines.mjs`, `.github/workflows/ci.yml` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 117 deferred items + competitive audit | ✅ |
| 2 | All 4 trust-path golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 4` enforced on trust-path baseline | ✅ |
| 4 | CrUX template includes `/about/`, `/sources/`, `/data/`, `/authors/rui-su/` | ✅ |
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
| Trust-path e2e golden profiles | 4 (was 0) |
| Trust-path `minE2eGuards` | 4 |
| CrUX-priority non-home paths | 45 (+4 about, sources, data, author) |
| Discovery-parity e2e golden pairs | 4 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
