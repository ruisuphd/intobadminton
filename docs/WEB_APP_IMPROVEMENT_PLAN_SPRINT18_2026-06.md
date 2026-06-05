# Web App Improvement Plan — Sprint 18 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-eb21`  
**Baseline:** Sprint 17 — site search → `/catalog/?q=` deep-link CTA on `/search/`.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 18 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Header search defaults to product catalogue | ✅ Catalog split button on header + static hero form |
| **Running Warehouse** | Typeahead on model lookup | ✅ Autocomplete on `/search/` + header combobox |
| **RTINGS** | Search exits to filtered browse without dead-ends | ✅ Catalog row leads autocomplete when SKUs match |
| **Wirecutter** | Editorial search with quick picks | ✅ Mixed suggestions: catalog CTA + reviews/guides/best-of |
| **RacketGuide** | Model name completion | ✅ Fuzzy token suggestions reuse `searchSite` index |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 18)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Header search lacks catalog-first affordance** | Product intent users must discover `/search/` CTA | ✅ Split **Catalog** button on `SiteSearchForm` + static hero form |
| 2 | **No search autocomplete / typeahead** | Retailer parity; slower model lookup | ✅ `searchSuggestions()` + `SearchAutocompleteList` combobox |
| 3 | **HelpfulReaction KV aggregates** | Social proof on guides/reviews | ⏳ Owner: deploy worker + `REACTIONS_API_URL` |
| 4 | **Original photography on commercial URLs** | AdSense + experience signal | ⏳ Editorial pipeline (`public/products/` drop) |
| 5 | **CrUX / GSC baselines not filled** | CWV regression detection | ⏳ Owner: PageSpeed export → `crux-template.csv` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Mixed autocomplete helper | `src/lib/search-suggestions.ts`, `search-suggestions.test.ts` |
| Shared suggestion list UI | `src/components/SearchAutocompleteList.tsx` |
| Header catalog split + combobox | `src/components/SiteSearchForm.tsx` |
| Static hero catalog button | `src/components/SiteSearchFormStatic.tsx` (`formAction="/catalog/"`) |
| Search page autocomplete | `src/components/SiteSearch.tsx` |
| E2E regression | `e2e/search-autocomplete-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 17 deferred list + competitive audit | ✅ |
| 2 | Autocomplete reuses `searchSite` + `countCatalogKeywordMatches` | ✅ |
| 3 | Catalog split uses `catalogHrefFromKeywordQuery` (same tokens as Sprint 17) | ✅ |
| 4 | Static hero form stays server-rendered (no client JS on `/`) | ✅ |
| 5 | Combobox: `role`, `aria-expanded`, keyboard arrows + Escape | ✅ |
| 6 | Suggestions only when query ≥2 chars | ✅ |
| 7 | Unit tests: `search-suggestions.test.ts` | ✅ |
| 8 | `npm test` green (328) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | E2E: header catalog split + autocomplete smoke | ⏳ CI |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/search-autocomplete-smoke.spec.ts e2e/search-catalog-deeplink-smoke.spec.ts
```

---

## 6. Deferred (Sprint 19+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Product-intent detection: auto-route header submit to catalog when only SKUs match
