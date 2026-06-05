# Web App Improvement Plan — Sprint 11 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-a612`  
**Baseline:** Sprint 10 on `main` (#153 — PWA `ib-v4`, HowTo guides, map 86%, reactions deploy workflow).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 11 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Shareable compare URLs load instantly | ✅ `parseCompareShareIds` + ProfileContext init before hydration |
| **RacketGuide** | Offline compare + changelog | ✅ PWA `ib-v5` precaches `/compare/`, `/updates/` |
| **Wirecutter / RTINGS** | Review→PDP linkage on every SKU note | ✅ Map **87%** (127/146); 19 editorial explainers intentionally unmapped |
| **BadmintonCentral** | Cross-user helpful counts | ⏳ `REACTIONS_API_URL` secret wired into Pages build |
| **Google PageSpeed / CrUX** | Field-data regression baselines | ⏳ Owner fills `crux-template.csv` (Sprint 10 artifact) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 11)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Compare share links flash empty tray** | Broken viral compare loop | ✅ URL ids parsed on first client render |
| 2 | **PWA omits compare + updates shells** | Offline return visits miss key flows | ✅ `ib-v5` + `/compare/`, `/updates/` |
| 3 | **Reactions API URL not in Pages build** | Helpful counts never ship in prod | ✅ `secrets.REACTIONS_API_URL` in `pages.yml` |
| 4 | **Share URL parsing untested** | Regressions on PR #152 fix | ✅ `compare-share-url.test.ts` |
| 5 | **Review map explainers vs SKUs** | False PDP links on guides | ✅ Document 87% ceiling; heuristics skip non-SKU slugs |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Compare share init | `src/lib/compare-share-url.ts`, `ProfileContext.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v5`), `pwa-precache.test.ts` |
| Reactions prod wiring | `.github/workflows/pages.yml`, `workers/reactions/README.md` |
| Sprint 9 carry-over | `e2e/catalog-compare-saved-smoke.spec.ts` (on branch via #152) |
| CI blog validate | `scripts/blog-validate-20pass.mjs` (skip redundant test in GHA) |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 10 deferred list + competitive audit | ✅ |
| 2 | Compare init does not overwrite non-empty tray after hydration | ✅ |
| 3 | PWA cache version bumped (`ib-v5`) when URLs change | ✅ |
| 4 | Map additions only catalogue-backed ids (no new false links) | ✅ |
| 5 | Static export — no new dynamic routes | ✅ |
| 6 | Reactions secret optional — build succeeds when unset | ✅ |
| 7 | Unit tests: compare-share-url, pwa-precache | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set unchanged | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
npx playwright test e2e/catalog-compare-saved-smoke.spec.ts
```

---

## 6. Deferred (Sprint 12+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Pair remaining 19 explainer slugs only where a single catalogue SKU exists
