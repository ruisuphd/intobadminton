# Web App Improvement Plan — Sprint 116 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-ff35`  
**Baseline:** Sprint 115 — commercial editorial e2e guards + compare-guides e2e completion + hub CrUX expansion (PR #264).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 116 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse / RacketGuide** | Full quiz funnel smoke-tested end-to-end | ✅ finder e2e 2→6; `minE2eGuards: 6` |
| **Tennis Warehouse** | Shareable results URLs regression-guarded | ✅ results-url e2e 2→4; `minE2eGuards: 4` |
| **Tennis Warehouse** | Compare tray share URLs smoke-tested | ✅ compare-share e2e 2→4; `minE2eGuards: 4` |
| **Wirecutter / TW** | Guides hub in CWV set | ✅ `/guides/` in crux-template + offline recovery + lighthouse baseline |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 26 site-search e2e guards, 23 best e2e guards, 13 compare-guides e2e guards, 15 reviews e2e guards.

---

## 2. Top 5 gaps (Sprint 116)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **4/6 finder golden profiles lack e2e** | Shoes, string, pro, injury quiz paths unguarded | ✅ e2e on all 6 finder profiles (2→6) |
| 2 | **2/4 results-url golden profiles lack e2e** | Wide-foot + injury share URLs unguarded | ✅ e2e on all 4 results-url profiles (2→4) |
| 3 | **2/4 compare-share golden profiles lack e2e** | Budget + shoe compare share URLs unguarded | ✅ e2e on all 4 compare-share profiles (2→4) |
| 4 | **No CI guard on product-funnel e2e counts** | Finder/results/compare e2e can shrink silently | ✅ `minE2eGuards` on finder (6), results-url (4), compare-share (4) |
| 5 | **Guides hub missing from CrUX** | Procedural education hub absent from CWV/offline recovery | ✅ `/guides/` in crux-template (+ offline recovery + lighthouse baseline); `/saved/` + `/compare/` deferred (noindex — excluded from Lighthouse SEO baseline per Sprint 5) |

**Deferred (Sprint 117+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi` with API key); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Finder e2e completion + guards | `docs/baselines/finder-profile-queries.json`, `src/lib/finder-baseline.ts`, `e2e/finder-baseline-smoke.spec.ts`, tests |
| Results-url e2e completion + guards | `docs/baselines/results-url-queries.json`, `src/lib/results-url-baseline.ts`, tests |
| Compare-share e2e completion + guards | `docs/baselines/compare-share-queries.json`, `src/lib/compare-baseline.ts`, tests |
| CrUX retention expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 115 deferred items + competitive audit | ✅ |
| 2 | All 6 finder golden profiles have `e2e: true` | ✅ |
| 3 | `minE2eGuards: 6` enforced on finder baseline | ✅ |
| 4 | All 4 results-url golden profiles have `e2e: true` | ✅ |
| 5 | All 4 compare-share golden profiles have `e2e: true` | ✅ |
| 6 | `minE2eGuards` on results-url (4) + compare-share (4) | ✅ |
| 7 | CrUX template includes `/guides/` hub | ✅ |
| 8 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 9 | Lighthouse baseline config + scores include new retention paths | ✅ |
| 10 | `npm test` + baselines + `npm run build` + funnel e2e smokes pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:finder-baseline
npm run lint:results-url-baseline
npm run lint:compare-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
npx playwright test e2e/finder-baseline-smoke.spec.ts e2e/results-url-baseline-smoke.spec.ts e2e/compare-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Finder e2e golden profiles | 6 (was 2) |
| Finder `minE2eGuards` | 6 |
| Results-url e2e golden profiles | 4 (was 2) |
| Results-url `minE2eGuards` | 4 |
| Compare-share e2e golden profiles | 4 (was 2) |
| Compare-share `minE2eGuards` | 4 |
| CrUX-priority non-home paths | 39 (+1 guides hub) |
| Catalog e2e golden profiles | 124 (unchanged) |
| PDP e2e golden profiles | 82 (unchanged) |
