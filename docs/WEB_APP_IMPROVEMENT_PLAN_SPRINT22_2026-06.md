# Web App Improvement Plan — Sprint 22 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-2e46`  
**Baseline:** Sprint 21 — brand catalog CTA, PWA ib-v11, explainer audit allowlist (PR #169).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 22 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Buying guide → filtered catalogue browse | ✅ `catalogHrefFromBestSlug` + dual CTA on every `/best/*` landing |
| **Running Warehouse** | Hub pages link to full catalog index | ✅ `/best/` hub "Browse full catalog" CTA |
| **RTINGS** | Tier-4 brand landings offline-capable | ✅ PWA `ib-v12` precaches bonny/kawasaki/kumpoo |
| **Wirecutter** | Commercial route perf in CI | ✅ Lighthouse CI includes `/brands/kawasaki/` |
| **RacketGuide** | Consistent brand → catalog deep-links | ✅ E2E Kawasaki catalog CTA + best-of catalog CTA smoke |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 22)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Best-of landings dead-end at quiz CTA only** | Retailer pattern is guide → filtered catalog | ✅ `catalogHrefFromBestSlug` + dual CTA on `BestPicksPage` |
| 2 | **Best hub has no catalog browse path** | Weak discovery after reading shortlists | ✅ `/best/` "Browse full catalog" secondary CTA |
| 3 | **PWA missing tier-4 brand shells** (bonny, kawasaki, kumpoo) | Installed users lose secondary brand landings offline | ✅ `ib-v12` precache for bonny/kawasaki/kumpoo |
| 4 | **Kawasaki commercial route absent from Lighthouse CI** | Perf regressions on tier-4 brand landing | ✅ `lighthouserc.json` adds `/brands/kawasaki/` |
| 5 | **E2E only tests Anta brand catalog CTA** | Regression blind spot on other brand + best-of CTAs | ✅ Kawasaki + beginner-rackets + best hub e2e |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Best-of → catalog deep-link helper | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Best-of dual CTA | `src/components/BestPicksPage.tsx` |
| Best hub catalog CTA | `src/app/best/page.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v12`), `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/brands-shelf-smoke.spec.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 21 deferred list + competitive audit | ✅ |
| 2 | `catalogHrefFromBestSlug` reuses `catalogUrlFromState` / filter params | ✅ |
| 3 | Best-of slug map covers all 19 `/best/*` landings | ✅ |
| 4 | Unmapped slugs fall back to `/catalog/` | ✅ |
| 5 | PWA cache version bumped (`ib-v11` → `ib-v12`) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: `catalog-url.test.ts`, `pwa-precache.test.ts` | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: Kawasaki catalog CTA + best-of catalog CTA + PWA ib-v12 | ✅ |
| 10 | Lighthouse CI URL set includes new brand route | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/brands-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Best-of → catalog CTR | Measurable in GA4 `select_content` |
