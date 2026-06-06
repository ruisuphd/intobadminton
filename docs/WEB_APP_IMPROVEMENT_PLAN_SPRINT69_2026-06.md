# Web App Improvement Plan — Sprint 69 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-49c6`  
**Baseline:** Sprint 68 — wire reactions to Pages, capture hints, DriveX imagery (PR #216).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 69 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Manufacturer photography on every buying-guide row | ✅ Li-Ning Blade Max image on `/best/shoes/`; image-coverage CI guard |
| **Wirecutter** | Catalogue-linked picks with persistent product context | ✅ `productId` on L69 + Bladesabre MAX; catalog image fallback |
| **RTINGS** | Regression guards on commercial page completeness | ✅ `lint:best-image-coverage` in CI + editorial baselines |
| **Running Warehouse** | One-command operator runbooks | ✅ Image coverage folded into `lint:editorial-baselines` |
| **BadmintonCentral** | Community-trusted Li-Ning gear coverage | ⏳ L69 string image waiver until UK/EU distributor listing |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v30, lab + CrUX + GSC + full product-funnel + editorial CI guards.

---

## 2. Top 5 gaps (Sprint 69)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Li-Ning Bladesabre MAX missing shoe imagery** | Visual gap vs retailer guides | ✅ Verified Blade Max (AYAU003) on li-ningsports.co.uk |
| 2 | **Best-of picks not linked to catalogue SKUs** | Finder/PDP exit friction | ✅ `productId` on L69 + Bladesabre MAX rows |
| 3 | **No CI guard for verified buying-guide photography** | Imagery regressions slip through | ✅ `best-image-coverage` + CI step |
| 4 | **Catalogue images not reused on /best/*** | Duplicate image maintenance | ✅ `resolveBestPickImage` catalog fallback |
| 5 | **L69 string still lacks verified product photo** | AdSense + experience signal | ⏳ Waiver documented; awaits distributor listing |

**Deferred (Sprint 70+):** owner set `REACTIONS_API_URL` + run wire workflow; fill CrUX/GSC CSV metrics; L69 verified string image; YouTube `sameAs`; PWA precache for full 140+ review corpus (impractical).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog image fallback | `src/lib/best-pick-image.ts`, `src/components/BestPicksPage.tsx` |
| Image coverage guard | `src/lib/best-image-coverage.ts`, `scripts/best-image-coverage.mjs` |
| Li-Ning shoe imagery | `src/app/best/shoes/page.tsx`, `src/data/products.json` |
| Catalogue linkage | `src/app/best/strings/page.tsx`, `src/app/best/shoes/page.tsx` |
| CI + editorial baselines | `.github/workflows/ci.yml`, `scripts/editorial-baselines.mjs`, `package.json` |
| Tests | `src/lib/best-pick-image.test.ts`, `src/lib/best-image-coverage.test.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 68 deferred items + competitive audit | ✅ |
| 2 | Blade Max image HEAD-verified on li-ningsports.co.uk CDN | ✅ |
| 3 | `resolveBestPickImage` prefers inline, falls back to catalogue | ✅ |
| 4 | L69 waiver documented; strings page passes 5/6 + 1 waiver | ✅ |
| 5 | Shoes page has 6/6 verified images | ✅ |
| 6 | Static export — no new API routes on site | ✅ |
| 7 | `lint:best-image-coverage` wired in CI | ✅ |
| 8 | `productId` links to `ln-l69-string` / `ln-bladesabre-max` | ✅ |
| 9 | `npm test` + `npm run build` | ✅ |
| 10 | `npm run lint:best-image-coverage` + `npm run lint:editorial-baselines` | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:best-image-coverage
npm run lint:editorial-baselines
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Best-of commercial imagery | 6/6 verified on shoes; strings 5/6 + documented L69 waiver |
| Catalogue pick linkage | L69 + Bladesabre MAX `productId` on `/best/*` |
| Image regression guard | CI fails if verified count drops below waiver-adjusted threshold |
