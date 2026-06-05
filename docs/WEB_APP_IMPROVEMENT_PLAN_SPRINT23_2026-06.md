# Web App Improvement Plan — Sprint 23 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b5f4`  
**Baseline:** Sprint 22 — best-of catalog CTA, PWA ib-v12, tier-4 brand offline (PR #170).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 23 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Comparison article → filtered catalogue browse | ✅ `catalogHrefFromCompareSlug` + dual CTA on every `/compare-guides/*` landing |
| **Running Warehouse** | Hub pages link to full catalog index | ✅ `/compare-guides/` hub "Browse full catalog" CTA |
| **RTINGS** | Head-to-head pages offline-capable | ✅ PWA `ib-v13` precaches `yonex-astrox-vs-nanoflare` |
| **Wirecutter** | Product compare routes in perf CI | ✅ Lighthouse CI includes `astrox-99-pro-vs-astrox-100zz` |
| **RacketGuide** | Consistent comparison → catalog deep-links | ✅ E2E product + concept compare catalog CTA smoke |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 23)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Compare-guide landings dead-end at quiz CTA only** | Retailer pattern is comparison → filtered catalog | ✅ `catalogHrefFromCompareSlug` + dual CTA on `CompareGuidePage` |
| 2 | **Compare-guides hub has no catalog browse path** | Weak discovery after reading comparisons | ✅ `/compare-guides/` "Browse full catalog" secondary CTA |
| 3 | **Concept compare pages lack catalog CTAs** (3 legacy layouts) | Inconsistent with brand/best-of pattern | ✅ Astrox vs Nanoflare, three-brand, shoes crossover |
| 4 | **PWA missing representative compare-guide landing** | Installed users lose flagship comparison offline | ✅ `ib-v13` precache for `yonex-astrox-vs-nanoflare` |
| 5 | **Product compare route absent from Lighthouse CI** | Perf regressions on head-to-head PDP-style pages | ✅ `lighthouserc.json` adds `astrox-99-pro-vs-astrox-100zz` |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Compare-guide → catalog deep-link helper | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Compare-guide dual CTA | `src/components/CompareGuidePage.tsx` |
| Compare hub catalog CTA | `src/app/compare-guides/page.tsx` |
| Concept compare catalog CTAs | `yonex-astrox-vs-nanoflare`, `yonex-victor-li-ning`, `badminton-vs-tennis-shoes` pages |
| PWA offline expansion | `public/sw.js` (`ib-v13`), `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/hub-shelf-smoke.spec.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 22 deferred list + competitive audit | ✅ |
| 2 | `catalogHrefFromCompareSlug` reuses `catalogUrlFromState` / filter params | ✅ |
| 3 | Compare slug map covers all 12 `/compare-guides/*` landings | ✅ |
| 4 | Unmapped slugs fall back to `/catalog/` | ✅ |
| 5 | PWA cache version bumped (`ib-v12` → `ib-v13`) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: `catalog-url.test.ts`, `pwa-precache.test.ts` | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: compare hub + product + concept catalog CTA + PWA ib-v13 | ✅ |
| 10 | Lighthouse CI URL set includes new compare route | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/hub-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Compare-guide → catalog CTR | Measurable in GA4 `select_content` |
