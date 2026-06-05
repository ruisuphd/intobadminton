# Web App Improvement Plan — Sprint 11 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-1801`  
**Baseline:** Sprint 10 on `main` (PWA `ib-v4`, review map 86%, HowTo on four guides, reactions deploy workflow).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 11 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Offline browsable review index + saved lists | ✅ PWA `ib-v5` precaches `/review/`; dedicated `/offline/` fallback |
| **Wirecutter / RTINGS** | Buying guides tied to flagship SKUs in schema | ✅ Editorial overrides → review map **~91%** (133/146) |
| **RacketGuide** | Clear offline UX when network drops | ✅ `/offline/` page + SW fallback (not bare homepage) |
| **BadmintonCentral** | Cross-user helpful counts | ⏳ `NEXT_PUBLIC_REACTIONS_API_URL` wired in Pages build (optional secret) |
| **Google Search Console** | Field CWV regression tracking | ⏳ Owner fills `crux-template.csv` (unchanged) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 11)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **PWA omits review hub + offline fallback** | Return visits; editorial discovery offline | ✅ `ib-v5` precaches `/review/` + `/offline/`; manifest Reviews shortcut |
| 2 | **Buying guides unmapped (20 slugs at 86%)** | Product JSON-LD + PDP editorial links | ✅ 7 editorial overrides for flagship buying guides → **~91%** |
| 3 | **Offline UX falls back to homepage** | Confusing when network drops mid-session | ✅ Dedicated `/offline/` page with recovery links |
| 4 | **Reactions API URL not in Pages build** | HelpfulReaction counts blocked at deploy | ✅ Optional `REACTIONS_API_URL` secret → build env |
| 5 | **No PWA/offline e2e coverage** | Regression risk on SW precache | ✅ `e2e/pwa-offline-smoke.spec.ts` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Offline fallback page | `src/app/offline/page.tsx` |
| PWA expansion | `public/sw.js` (`ib-v5`), `public/manifest.webmanifest` |
| Review map ~91% | `src/data/blog-review-product-map.json`, `scripts/suggest-review-product-map.mjs` |
| Pages reactions env | `.github/workflows/pages.yml` |
| Sitemap exemption | `src/lib/sitemap.ts`, `scripts/postbuild-seo-audit.mjs` |
| Regression tests | `src/lib/pwa-precache.test.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 10 deferred list + competitive audit | ✅ |
| 2 | PWA cache version bumped (`ib-v5`) when URLs change | ✅ |
| 3 | Review map additions are catalogue-backed product ids only | ✅ |
| 4 | `/offline/` is noindex and excluded from sitemap | ✅ |
| 5 | Static export — no new dynamic routes | ✅ |
| 6 | Reactions env uses optional secret; no keys in repo | ✅ |
| 7 | Unit tests: pwa-precache; e2e: pwa-offline-smoke | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set unchanged | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
npx playwright test e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Deferred (Sprint 12+)

- Production `NEXT_PUBLIC_REACTIONS_API_URL` value in GitHub repo secrets
- GSC/CrUX owner CSV exports (fill `crux-template.csv` from PageSpeed Insights)
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Remaining 13 explainer slugs (no single catalogue SKU — intentional)
