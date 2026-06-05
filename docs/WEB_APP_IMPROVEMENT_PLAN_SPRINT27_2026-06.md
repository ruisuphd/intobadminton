# Web App Improvement Plan — Sprint 27 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-99da`  
**Baseline:** Sprint 26 — review/PDP/results/FAQ catalog CTAs, PWA ib-v16 (PR #174, merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 27 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Glossary terms and search pages exit to filtered shop browse | ✅ Catalog CTAs on `/guides/glossary/` and `/search/` |
| **Running Warehouse** | Post-quiz browse opens with category + price + style filters | ✅ `catalogHrefFromProfile` adds balance + `fit-desc` sort |
| **RTINGS** | Methodology and data registry pages link to tested product index | ✅ Catalog CTAs on `/methodology/` and `/data/` |
| **Wirecutter** | Editorial updates feed links back to product browse | ✅ Catalog CTA on `/updates/` |
| **RacketGuide** | Installed users get calculators and reference pages offline | ✅ PWA `ib-v17` precaches glossary, season-refresh, 4 remaining tools |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 27)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Trust/discovery pages lack catalog exit** | Glossary, search, updates, data, methodology are dead-ends after Sprint 26 hub coverage | ✅ Secondary `Browse full catalog` bands on 5 pages |
| 2 | **Quiz results catalog link too shallow** | Post-quiz browse ignores offensive/defensive style balance preference | ✅ `catalogHrefFromProfile` adds `balance` + `sort=fit-desc` |
| 3 | **PWA missing glossary, season-refresh, remaining tools** | Installed users lose reference pages and 4 calculators offline | ✅ `ib-v17` precache expansion (8 routes) |
| 4 | **Homepage and commercial URLs absent from Lighthouse CI** | Perf regressions on highest-traffic and tier-1 commercial routes | ✅ CI adds `/`, glossary, equipment-authenticity, court-diagram, doubles-rackets, shoes, bonny, yonex-victor-li-ning |
| 5 | **Saved/compare trays lack catalog browse exit** | Shortlist users cannot continue shopping without manual navigation | ✅ Catalog CTAs on `/saved/` and `/compare/` |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Trust/discovery catalog CTAs | `glossary/page.tsx`, `search/page.tsx`, `updates/page.tsx`, `data/page.tsx`, `methodology/page.tsx` |
| Richer profile → catalog | `src/lib/catalog-url.ts`, `src/lib/scoring.ts`, `catalog-url.test.ts` |
| Saved/compare catalog CTAs | `SavedListClient.tsx`, `compare/page.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v17`), `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/hub-shelf-smoke.spec.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 26 deferred list + competitive audit | ✅ |
| 2 | `catalogHrefFromProfile` reuses exported `styleHeadPreference` from scoring | ✅ |
| 3 | Balance filter only applied when `category === "racket"` and styles present | ✅ |
| 4 | `fit-desc` sort only when level + discipline + category complete | ✅ |
| 5 | PWA cache version bumped (`ib-v16` → `ib-v17`) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: `catalog-url.test.ts`, `pwa-precache.test.ts` | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: search/glossary/methodology/data/updates catalog CTA + PWA ib-v17 | ✅ |
| 10 | Lighthouse CI URL set includes homepage + 7 commercial/trust routes | ✅ |

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
| Trust/discovery → catalog CTR | Measurable in GA4 `select_content` |
