# Web App Improvement Plan — Sprint 21 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b245`  
**Baseline:** Sprint 20 — Jun-4 review map sync, Anta brand page, ingest path fix (PR #168).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 21 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Brand hub → filtered catalogue browse | ✅ `catalogHrefFromBrand` + CTA on every `/brands/*` landing |
| **Running Warehouse** | PWA shortcuts to high-traffic hubs | ✅ Manifest “Brands” shortcut |
| **RTINGS** | Review map hygiene — no false drift alarms | ✅ Explainer slug allowlist in audit script |
| **Wirecutter** | Commercial route perf in CI | ✅ Lighthouse CI includes `/brands/anta/` |
| **RacketGuide** | Offline brand research on repeat visits | ✅ PWA `ib-v11` precaches dedicated brand shells |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 21)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Brand landings dead-end at quiz CTA only** | Retailer pattern is hub → filtered catalog | ✅ `catalogHrefFromBrand` + dual CTA on `BrandPage` |
| 2 | **PWA precaches `/brands/` hub but not dedicated guides** | Installed users lose Anta/Yonex landings offline | ✅ `ib-v11` precache for yonex/victor/li-ning/anta |
| 3 | **Audit script flags 13 intentional explainer slugs** | Ingest QA noise; false regression signal | ✅ `explainer-review-slugs.json` + actionable-only strict mode |
| 4 | **New Anta commercial route absent from Lighthouse CI** | Perf regressions on tier-4 brand landing | ✅ `lighthouserc.json` adds `/brands/anta/` |
| 5 | **No PWA shortcut to brand discovery** | Weak return path for brand-comparison readers | ✅ Manifest “Brands” shortcut |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Brand → catalog deep-link helper | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Brand page dual CTA | `src/components/BrandPage.tsx` |
| Explainer allowlist | `src/data/explainer-review-slugs.json`, `scripts/audit-review-product-map.mjs` |
| PWA offline expansion | `public/sw.js` (`ib-v11`), `manifest.webmanifest`, `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/brands-shelf-smoke.spec.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 20 deferred list + competitive audit | ✅ |
| 2 | `catalogHrefFromBrand` reuses `catalogUrlFromState` / `?brand=` param | ✅ |
| 3 | Brand names match `products.json` casing (e.g. `Anta`, `Yonex`) | ✅ |
| 4 | Explainer allowlist matches audit output (13 slugs) | ✅ |
| 5 | PWA cache version bumped (`ib-v10` → `ib-v11`) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | `node scripts/audit-review-product-map.mjs` — 100% mappable coverage | ✅ |
| 8 | Unit tests: `catalog-url.test.ts`, `pwa-precache.test.ts` | ✅ |
| 9 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 10 | E2E: Anta catalog CTA + PWA ib-v11 precache smoke | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
npx playwright test e2e/brands-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Brand hub → catalog CTR | Measurable in GA4 `select_content` |
