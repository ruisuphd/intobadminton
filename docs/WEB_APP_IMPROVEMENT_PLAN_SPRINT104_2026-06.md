# Web App Improvement Plan — Sprint 104 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-ce25`  
**Baseline:** Sprint 103 — string editorial three-way parity + L69 PDP golden profile (PR #251).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 104 response |
|------------|---------------------------|---------------------|
| **Tennis Warehouse** | Category buying guides for every major equipment line | ✅ `/best/shuttles/` commercial landing (18th guarded `/best/*` page) |
| **Wirecutter** | PDP, catalog browse, and commercial picks agree on editorial exit per SKU | ✅ Shuttle three-way parity guard (PDP ↔ catalog ↔ commercial) |
| **BadmintonCentral** | Shuttle brand comparisons and durability threads | ✅ Six mapped shuttle reviews wired across all surfaces |
| **RTINGS** | Cross-surface regression guards on high-traffic categories | ✅ `lint:shuttle-editorial-baselines` aggregate + CI workflow |
| **YouTube-first reviewers** | Video evidence on product pages | ⏳ `VideoObject` schema still deferred |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v31, 56 review-map golden profiles, 18/18 commercial image CI, 16 PDP e2e profiles, 6+6 string + 6+6 shuttle golden profiles.

---

## 2. Top 5 gaps (Sprint 104)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No commercial `/best/shuttles/` landing** | Strings had Wirecutter-style guide; shuttles only had scattered reviews | ✅ Six-pick landing with comparison table + catalog CTA |
| 2 | **Shuttle PDP/catalog/commercial parity unasserted** | Sprint 103 pattern existed for strings only | ✅ `shuttle-editorial-parity.ts` three-way unit guard |
| 3 | **PDP golden profiles missing for six shuttle SKUs** | AS-50 and Carbonsonic had review-map CI but no PDP baseline rows | ✅ Six PDP rows in `pdp-queries.json` (2 with e2e) |
| 4 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |
| 5 | **RSL shuttle verified Western distributor images** | Four RSL picks lack verified product photography | ⏳ Documented 4/6 image waivers on `/best/shuttles/` |

**Deferred (Sprint 105+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs`; `VideoObject` schema; fill CrUX/GSC CSV metrics.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Commercial shuttle landing | `src/app/best/shuttles/page.tsx` |
| Catalog + commercial golden profiles | `docs/baselines/catalog-shuttle-queries.json`, `docs/baselines/commercial-shuttle-queries.json` |
| Three-way parity evaluator + tests | `src/lib/shuttle-editorial-parity.ts`, `src/lib/shuttle-editorial-parity.test.ts` |
| Catalog + commercial baseline libs | `src/lib/catalog-shuttle-baseline.ts`, `src/lib/commercial-shuttle-baseline.ts` |
| PDP golden profiles (6 shuttle SKUs) | `docs/baselines/pdp-queries.json` |
| CI lint scripts | `scripts/catalog-shuttle-baseline.mjs`, `scripts/commercial-shuttle-baseline.mjs`, `scripts/shuttle-editorial-parity.mjs`, `scripts/shuttle-editorial-baselines.mjs` |
| E2E smoke | `e2e/catalog-shuttle-baseline-smoke.spec.ts`, `e2e/commercial-shuttle-baseline-smoke.spec.ts` |
| Hub / search / PWA / Lighthouse | `src/app/best/page.tsx`, `src/lib/site-search.ts`, `public/sw.js`, `lighthouserc.json` |
| CI workflow | `.github/workflows/ci.yml` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 103 deferred items + competitive audit | ✅ |
| 2 | All six shuttle productIds in catalog + commercial baselines | ✅ |
| 3 | All six shuttle productIds have PDP `expectCategory: shuttle` rows | ✅ |
| 4 | AS-50 + Carbonsonic PDP rows use `expectKind: review` + correct slugs | ✅ |
| 5 | Four RSL PDP rows use dedicated review slugs | ✅ |
| 6 | Three-way parity agrees on slug/kind per productId | ✅ |
| 7 | `minCatalogFilterSlugs: 20` (was 19) | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | RSL image backfill assessed — no verified Western distributor URLs | ✅ 4 waivers documented |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:shuttle-editorial-baselines
npm run lint:pdp-baseline
npm run lint:best-baseline
npm run build
npx playwright test e2e/catalog-shuttle-baseline-smoke.spec.ts e2e/commercial-shuttle-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Commercial landings under image CI | 18/18 (was 17/17) |
| PDP golden profiles with e2e | 16 (was 10; +6 shuttle, 4 without e2e) |
| Catalog shuttle golden profiles | 6 |
| Commercial shuttle golden profiles | 6 |
| Shuttle editorial three-way parity | 6/6 SKUs |
| String editorial three-way parity | 6/6 SKUs (unchanged) |
