# Web App Improvement Plan — Sprint 16 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b1ad`  
**Baseline:** Sprint 15 on `main` (#161) — hub shelves, PWA `ib-v10`. Sprint 12 profile fit (#157).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 16 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Keyword search while filter-browsing catalog | ✅ `/catalog/?q=` shareable keyword filter |
| **RacketGuide** | Model lookup without full site search | ✅ Fuzzy token match on brand, model, specs |
| **Wirecutter** | Filter + search on commercial browse | ✅ `q` composes with cat/brand/price facets |
| **BadmintonCentral** | Archive search | ✅ Complements `/search/` for SKU lookup |
| **Retailer PDPs** | Original photography | ⏳ Editorial pipeline (deferred) |

---

## 2. Top 5 gaps (Sprint 16)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Catalog lacks keyword search** | Users leave browse for site search | ✅ `catalog-search.ts` + `q` URL param |
| 2 | **Deferred since Sprint 12 plan** | TW-style browse parity | ✅ Shareable `/catalog/?q=astrox` |
| 3 | **No e2e for catalog keyword** | Regressions undetected | ✅ `catalog-smoke` keyword case |
| 4 | **HelpfulReaction prod aggregates** | Social proof | ⏳ Owner: reactions worker URL |
| 5 | **CrUX baseline not recorded** | CWV regression gate | ⏳ Owner: `crux-template.csv` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Catalog keyword filter | `src/lib/catalog-search.ts`, `catalog-search.test.ts` |
| Shareable `q` URL param | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Catalog search UI | `src/app/catalog/CatalogClient.tsx` |
| E2E keyword smoke | `e2e/catalog-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gap grounded in deferred Sprint 12–15 list | ✅ |
| 2 | `q` composes with facet filters | ✅ |
| 3 | Empty `q` omitted from share URL | ✅ |
| 4 | Fuzzy match reuses `search-fuzzy.ts` | ✅ |
| 5 | Static export safe | ✅ |
| 6 | GA4 `catalog_filter` includes `q` | ✅ |
| 7 | Unit tests pass | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + SEO audit | ✅ |
| 10 | E2e catalog keyword smoke | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/catalog-smoke.spec.ts
```

---

## 6. Deferred (Sprint 17+)

- Reactions worker + `REACTIONS_API_URL` secret
- CrUX baseline CSV
- Original photography, VideoObject schema
- Site search → catalog `?q=` deep links
