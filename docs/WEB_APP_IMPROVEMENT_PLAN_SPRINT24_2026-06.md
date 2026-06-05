# Web App Improvement Plan — Sprint 24 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-cccc`  
**Baseline:** Sprint 23 — compare-guide catalog CTA, PWA ib-v13, compare CI (PR #171).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 24 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Educational hub → filtered catalogue browse | ✅ `catalogHrefFromGuideSlug` + dual CTA on procedural `/guides/*` landings |
| **Running Warehouse** | Discovery hubs link to full catalog index | ✅ `/guides/`, `/tools/`, `/review/`, `/brands/` hub "Browse full catalog" CTAs |
| **RTINGS** | Flagship brand landings offline-capable | ✅ PWA `ib-v14` precaches `/brands/yonex/` |
| **Wirecutter** | Tier-1 brand route in perf CI | ✅ Lighthouse CI includes `/brands/yonex/` |
| **RacketGuide** | Guide → category-filtered catalog deep-links | ✅ E2E string-tension + guides hub catalog CTA smoke |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 24)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Guides hub dead-ends at article list** | Retailer pattern is education → filtered catalog | ✅ `/guides/` "Browse full catalog" secondary CTA |
| 2 | **Procedural guides lack catalog browse path** | Readers finish a guide with no SKU exit | ✅ `catalogHrefFromGuideSlug` + `GuideCatalogCta` on Lighthouse guides |
| 3 | **Tools, review, brands hubs lack catalog browse** | Inconsistent with best/compare hub pattern | ✅ Hub CTAs on `/tools/`, `/review/`, `/brands/` |
| 4 | **PWA missing flagship Yonex brand shell** | Installed users lose tier-1 brand landing offline | ✅ `ib-v14` precache for `/brands/yonex/` |
| 5 | **Yonex commercial route absent from Lighthouse CI** | Perf regressions on flagship brand landing | ✅ `lighthouserc.json` adds `/brands/yonex/` |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Guide → catalog deep-link helper | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Guide dual CTA component | `src/components/GuideCatalogCta.tsx` |
| Procedural guide catalog CTAs | 6 Lighthouse `/guides/*` pages |
| Discovery hub catalog CTAs | `guides/page.tsx`, `tools/page.tsx`, `ReviewsIndex.tsx`, `BrandsPage.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v14`), `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/hub-shelf-smoke.spec.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 23 deferred list + competitive audit | ✅ |
| 2 | `catalogHrefFromGuideSlug` reuses `catalogUrlFromState` / filter params | ✅ |
| 3 | Guide slug map covers all 6 Lighthouse procedural guides | ✅ |
| 4 | Unmapped guide slugs fall back to `/catalog/` | ✅ |
| 5 | PWA cache version bumped (`ib-v13` → `ib-v14`) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: `catalog-url.test.ts`, `pwa-precache.test.ts` | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: guides hub + string-tension catalog CTA + PWA ib-v14 | ✅ |
| 10 | Lighthouse CI URL set includes `/brands/yonex/` | ✅ |

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
| Guide → catalog CTR | Measurable in GA4 `select_content` |
