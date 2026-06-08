# Web App Improvement Plan — Sprint 108 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-e09f`  
**Baseline:** Sprint 107 — grip/bag commercial landings + three-way editorial parity CI (PR #256).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 108 response |
|------------|---------------------------|---------------------|
| **RTINGS** | Single regression command across all product categories | ✅ `lint:all-category-editorial-parity` aggregate (80 commercial picks) |
| **Tennis Warehouse** | Accessory buying guides in CrUX/offline recovery set | ✅ `/best/grips/` + `/best/bags/` added to `crux-template.csv` + offline recovery |
| **Wirecutter** | Homepage discovery for accessory commercial landings | ✅ Grips + bags in homepage popular-search grid with CI guard |
| **Running Warehouse** | Lab baseline parity for new commercial URLs | ✅ `lighthouserc-baseline.json` + `lighthouse-scores.json` expanded |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v32, 20/20 commercial image CI, six-category three-way parity.

---

## 2. Top 5 gaps (Sprint 108)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No unified six-category editorial parity command** | Operators run six separate parity guards per release | ✅ `all-category-editorial-parity.ts` + `lint:all-category-editorial-parity` |
| 2 | **Accessory landings missing from CrUX priority set** | CWV/offline recovery drift for new commercial pages | ✅ CrUX template + offline recovery + lighthouse baseline |
| 3 | **Homepage popular-search grid omits grips/bags** | Accessory discovery vs Tennis Warehouse | ✅ Two new popular-search chips + `home-queries.json` guard |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **Tier-4 / CN-market accessory images + VideoObject** | Visual maturity vs YouTube reviewers | ⏳ Documented waivers; video schema gated on editorial commitment |

**Deferred (Sprint 109+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metric cells from PageSpeed Insights.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| All-category parity aggregate | `src/lib/all-category-editorial-parity.ts`, `src/lib/all-category-editorial-parity.test.ts` |
| CI lint script | `scripts/all-category-editorial-parity.mjs` |
| CrUX + offline + lighthouse expansion | `docs/baselines/crux-template.csv`, `src/lib/offline-recovery-paths.ts`, `lighthouserc-baseline.json`, `docs/baselines/lighthouse-scores.json` |
| Homepage discovery | `src/lib/home-popular-searches.ts`, `docs/baselines/home-queries.json` |
| CI workflow + editorial aggregate | `.github/workflows/ci.yml`, `scripts/editorial-baselines.mjs`, `package.json` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 107 deferred items + competitive audit | ✅ |
| 2 | All six category parity evaluators wired into aggregate | ✅ |
| 3 | Minimum SKU counts: racket 44, shoe 16, string/shuttle/grip 6, bag 2 | ✅ |
| 4 | CrUX template includes grips + bags URLs | ✅ |
| 5 | `CRUX_OFFLINE_RECOVERY_PATHS` matches crux-template (excl. homepage) | ✅ |
| 6 | Lighthouse baseline config + scores include grips + bags | ✅ |
| 7 | Homepage popular-search includes `/best/grips/` + `/best/bags/` | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | Accessory image backfill assessed — waivers unchanged from Sprint 107 | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:all-category-editorial-parity
npm run lint:home-baseline
npm run lint:crux-baseline
npm run lint:lighthouse:baseline
npm run build
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Commercial picks under three-way parity | 80/80 (44 racket + 16 shoe + 6 string + 6 shuttle + 6 grip + 2 bag) |
| CrUX-priority commercial URLs | 14 paths (+2 grips/bags) |
| Homepage popular-search commercial links | +2 grips/bags |
| Commercial landings under image CI | 20/20 (unchanged) |
| PDP golden profiles with e2e | 41 (unchanged) |
