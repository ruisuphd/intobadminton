# Web App Improvement Plan — Sprint 127 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-ae3b`  
**Baseline:** Sprint 126 — long-tail compare-guide CrUX completion (PR #276).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 127 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Post-quiz shortlist and compare tray monitored for CWV regressions | ✅ `/results/`, `/compare/`, `/saved/` in crux-template + lighthouse baseline |
| **RTINGS** | Saved gear lists and side-by-side compare are first-class retention paths | ✅ product-funnel CrUX coverage 0/3 → 3/3 |
| **Wirecutter** | Return-visit hooks on homepage for repeat buyers | ✅ `data-home-continue-reading` mount guard in home baseline e2e |
| **RacketGuide-style finders** | Finder results shell precached for club Wi‑Fi | ✅ `/results/` in PWA `PRECACHE_URLS` (`ib-v33`) |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v33, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 24 trust-path e2e guards, 13 compare-guides e2e guards.

---

## 2. Top 5 gaps (Sprint 127)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Finder results missing from CrUX** | `/results/` is the primary post-quiz retention path but not CWV-monitored | ✅ `/results/` in crux-template (+ offline recovery + lighthouse baseline + PWA precache) |
| 2 | **Compare tray missing from CrUX** | Side-by-side compare is precached but not in CWV set | ✅ `/compare/` in crux-template (+ offline recovery + lighthouse baseline) |
| 3 | **Saved shortlist missing from CrUX** | Saved gear list is precached but not in CWV set | ✅ `/saved/` in crux-template (+ offline recovery + lighthouse baseline) |
| 4 | **ContinueReading mount unguarded** | Return-visit UX shipped in Sprint Q2 but no CI guard | ✅ `expectContinueReadingSlot` in home baseline + Playwright e2e |
| 5 | **Product-funnel CrUX incomplete vs e2e baseline** | 6 finder + 4 results-url + 4 compare e2e guards but 0/3 funnel pages in CrUX | ✅ 3/3 product-funnel retention paths in CrUX |

**Deferred (Sprint 128+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX CSV cells (owner runs `capture:crux-psi`); HelpfulReaction production wiring.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Product-funnel CrUX expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| PWA results precache | `public/sw.js` (`ib-v33`), `src/lib/pwa-precache-paths.ts`, `e2e/pwa-offline-smoke.spec.ts` |
| ContinueReading home guard | `src/components/HomeContinueReading.tsx`, `docs/baselines/home-queries.json`, `src/lib/home-baseline.ts`, `e2e/home-baseline-smoke.spec.ts` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 126 deferred items + competitive audit | ✅ |
| 2 | All 6 finder golden profiles still have `e2e: true` | ✅ unchanged |
| 3 | All 4 results-url + 4 compare-share golden profiles unchanged | ✅ unchanged |
| 4 | CrUX template includes `/results/`, `/compare/`, `/saved/` | ✅ |
| 5 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 6 | Lighthouse baseline config + scores include new CrUX paths | ✅ |
| 7 | `/results/` in PWA precache (`ib-v33`) and `PRECACHE_ASSERT_PATHS` | ✅ |
| 8 | Home baseline `expectContinueReadingSlot` e2e guard passes | ✅ |
| 9 | HelpfulReaction / VideoObject / string articles assessed — deferred | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run lint:home-baseline
npm run build
npx playwright test e2e/home-baseline-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Trust-path e2e golden profiles | 24 (unchanged) |
| CrUX-priority non-home paths | 88 (+3 product-funnel pages) |
| Product-funnel pages in CrUX | 3/3 (complete) |
| Compare-guides in CrUX | 13/13 (unchanged) |
| Home `minE2eGuards` | 1 (unchanged) |
| Finder e2e golden profiles | 6 (unchanged) |
| PWA cache version | ib-v33 |
