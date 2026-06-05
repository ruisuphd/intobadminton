# Web App Improvement Plan — Sprint 15 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-8547`  
**Baseline:** Sprint 14 — results/brands/best/catalog shelves, PWA `ib-v9`, Lighthouse `/best/` + `/brands/`.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 15 response |
|------------|---------------------------|-------------------|
| **RTINGS** | Compare hub → methodology → catalog browse | ✅ `/compare-guides/` hub shelf routes to best-of + catalog |
| **Wirecutter** | Search → curated buying guides | ✅ `/search/` discovery shelf |
| **Tennis Warehouse** | Saved/wishlist → compare + shop paths | ✅ `/saved/` discovery shelf (empty + populated) |
| **RacketGuide** | Guide index → deep dives + tools | ✅ `/guides/` hub shelf with tension + authenticity |
| **BadmintonCentral** | Thread readers need next-step links | ✅ Discovery cluster on search + saved |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 15)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **`/compare-guides/` hub lacks Keep reading shelf** | Head-to-head readers dead-end on index | ✅ `PATH_CLUSTER` + shelf on compare-guides index |
| 2 | **`/guides/` hub lacks decision-path shelf** | Guide discovery does not route to finder/tools | ✅ `guides-hub` cluster + shelf on `GuidesShell` |
| 3 | **`/search/` lacks editorial exit paths** | Search is a terminal page for browsers | ✅ `discovery` cluster + shelf on search page |
| 4 | **`/saved/` lacks compare/catalog exits** | Return visitors with shortlists stall | ✅ `discovery` cluster on empty + populated saved shelf |
| 5 | **PWA omits `/compare-guides/` shell** | Installed users lose comparison hub offline | ✅ `ib-v10` precache + manifest shortcut + offline link |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Guides-hub + discovery clusters | `src/lib/related-content.ts`, `related-content.test.ts` |
| Compare-guides hub shelf | `src/app/compare-guides/page.tsx` |
| Guides hub shelf | `src/app/guides/page.tsx` |
| Search shelf | `src/app/search/page.tsx` |
| Saved shelf | `src/app/saved/SavedListClient.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v10`), `manifest.webmanifest`, `src/app/offline/page.tsx`, `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` — `/compare-guides/` index |
| E2E regression | `e2e/hub-shelf-smoke.spec.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 14 deferred list + competitive audit | ✅ |
| 2 | Related clusters only link to existing static routes | ✅ |
| 3 | Shelves exclude current path | ✅ |
| 4 | Discovery cluster covers finder, catalog, compare, best-of | ✅ |
| 5 | Static export — no new dynamic routes | ✅ |
| 6 | PWA cache version bumped (`ib-v10`) when URLs change | ✅ |
| 7 | Unit tests: related-content, pwa-precache | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set includes `/compare-guides/` index | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/hub-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Deferred (Sprint 16+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- `/review/` index shelf (lower priority — 146-article grid already dense)
