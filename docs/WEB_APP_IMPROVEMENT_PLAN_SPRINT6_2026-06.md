# Web App Improvement Plan — Sprint 6 (June 2026)

**Branches:** `#134` (fuzzy search), `#129` (reactions worker), `#127` (catalog compare + related reading), **`dcf9` / `5564` (fit scores, PWA catalog precache)**  
**Baseline:** Sprint 5 on `main` (PRs #116–#122).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 6 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Faceted browse, comparison tables | ✅ Catalog filters (#122); ✅ fuzzy search (#134); ✅ fit-score column (fit PR) |
| **Wirecutter / RTINGS** | Related reading, methodology, social proof | ✅ `RelatedReadingShelf` (#127); ✅ reactions API (#129); ✅ `/data/` registry (#130) |
| **RacketGuide** | Long-tail `/best/*` landings | ✅ control, singles, head-light, all-round, wide-feet (#127, #129, #134) |
| **PWA-first apps** | Offline catalog | ✅ Install prompt; ✅ `/catalog/` precache (fit PR) |

**Moat:** transparent fit score, postbuild SEO gate, static export, 146+ signed reviews, claims CI.

---

## 2. Top 5 gaps (Sprint 6 — combined)

| # | Gap | Status |
|---|-----|--------|
| 1 | Catalog save/compare funnel | ✅ #127 |
| 2 | Site search typo tolerance | ✅ #134 |
| 3 | Related reading on commercial pages | ✅ #127 |
| 4 | `/best/*` illustrative fit-score + public claims registry | ✅ fit PR + #130 `/data/` |
| 5 | HelpfulReaction aggregates | ✅ Scaffold #129; deploy optional |

**Also fit PR:** PWA `/catalog/` precache (`ib-v3`); `productId` backfill on best picks; review-link guard.

---

## 3. Execution summary

| PR | Deliverables |
|----|--------------|
| **#134** | `search-fuzzy.ts`, `/best/control-rackets/`, `/best/rackets-under-200/` |
| **#129** | `workers/reactions/`, singles/head-light best pages, `ProductImagePlaceholder`, Lighthouse baseline script |
| **#127** | `CatalogProductActions`, `RelatedReadingShelf`, `/best/wide-feet-badminton-shoes/`, `/best/all-round-rackets/` |
| **#130** | `/data/` claims registry (Dataset JSON-LD, site search) |
| **Fit PR** | `best-picks-scoring.ts`, PWA `ib-v3`, productId backfill, `editorialReviewHref` guard |

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 audit + Sprint 5 deferrals | ✅ |
| 2 | Fit-score uses reference club doubles profile | ✅ |
| 3 | `/data/` lists all `content/claims.json` entries (#130) | ✅ |
| 4 | Catalog compare + related reading unchanged | ✅ |
| 5 | Static export safe | ✅ |
| 6 | Sitemap includes `/data/` | ✅ |
| 7 | Unit tests (fuzzy, reactions, best-picks-scoring) | ✅ |
| 8 | PWA cache version bumped | ✅ |
| 9 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse CI + baseline script | ✅ |

---

## 5. PR #137 follow-up (`cursor/web-app-improvement-plan-5049`)

Additional maturity items merged after parallel Sprint 6 PRs (#127, #129, #134):

| Deliverable | Files |
|-------------|-------|
| Compare share-link hydration fix | `ProfileContext.tsx` (`storageReady`), `compare/page.tsx` |
| Compare row winner highlight | `CompareTable.tsx` |
| PWA manifest shortcuts | `public/manifest.webmanifest` |
| Retention-flow e2e | `e2e/catalog-compare-saved-smoke.spec.ts` |
| Review map suggestion script | `scripts/suggest-review-product-map.mjs` |

Review-product map coverage on `main`: **116/146 (79%)** after prior editorial expansion.

---

## 6. Verification

```bash
npm test
npm run lint
npm run build
node scripts/lighthouse-baseline.mjs --help
```

---

## 7. Deferred (Sprint 7+)

- GSC/CrUX baseline CSV in `docs/baselines/`
- Original `public/products/` photography
- Product PDP-lite pages — ✅ Sprint 7 #138
- `VideoObject` / web push / comments
