# Web App Improvement Plan — Sprint 5 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-dfd2` → PR #92  
**Baseline:** Sprint 4 on `main` (PR #105); Phase B homepage perf follow-up.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 5 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse / retailer PDPs** | Fast LCP, hero imagery, filter browse | Homepage bundle slim + `/catalog/` (Sprint 4) |
| **Wirecutter / RTINGS** | Product rich results, methodology trust | Product JSON-LD on mapped reviews (Phase B) |
| **BadmintonCentral** | 20+ year archive, community search | Site search + compare guides indexed |
| **YouTube-first reviewers** | Video evidence, personality | Deferred — `VideoObject` gated on editorial |
| **Brand blogs (Yonex/Victor)** | Original photography, pro association | Deferred — editorial pipeline |

**Moat:** transparent fit score, claims CI, postbuild SEO gate, static export, 146+ first-person reviews.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 5 |
|---|-----|--------|----------|
| 1 | **Homepage imports full `blog-articles.json` + `products.json`** | Lighthouse CI failure; poor LCP on `/` | ✅ Prebuild slices + dynamic engagement |
| 2 | **Merge drift vs Sprint 3–4 `main`** | Lost catalog, spec filters, price-band pages | ✅ Rebased on `origin/main` |
| 3 | **Lighthouse URL set stale after Sprint 4** | CI blind spot on new tools | ✅ string-tension calculator URL |
| 4 | **GSC/CrUX baseline not captured post-Sprint 4** | Cannot measure ROI | ⏳ Owner manual capture per `docs/baselines/README.md` |
| 5 | **HelpfulReaction cross-user counts** | Social proof on articles | ⏳ GA4 interim; Workers/KV deferred |

### Deferred (Sprint 6+)

- First-party `public/products/` hero photography
- HelpfulReaction Cloudflare Workers/KV endpoint
- `Person.sameAs` YouTube (after channel claim)
- `VideoObject` on review pages
- zh locale content expansion

---

## 3. Execution summary

1. `scripts/generate-home-featured.mjs` — six latest reviews without importing full blog corpus on `/`
2. `scripts/generate-catalog-stats.mjs` — category counts without `products.json` on homepage
3. `scripts/generate-product-display-names.mjs` — id→name map for shortlist rows
4. `HomeContinueReading` — dynamic import of `ContinueReading` (client-only)
5. `LocalizedHome` — uses `home-featured.ts` + `catalog-stats.json` instead of full JSON imports
6. Merge `origin/main` (catalog, results facets, `/best/rackets-under-150/`)

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in June plan Phase C + Lighthouse CI failure mode | ✅ |
| 2 | Homepage does not import `blog-articles.json` or `products.json` | ✅ |
| 3 | `home-featured-reviews.json` regenerated in `prebuild` | ✅ |
| 4 | Dynamic import keeps engagement without blocking LCP | ✅ |
| 5 | Sprint 4 routes (`/catalog/`, facets) intact after merge | ✅ |
| 6 | `/saved/` excluded from Lighthouse (noindex by design) | ✅ |
| 7 | `site-search.test.ts` + full vitest suite | ✅ 198 passed |
| 8 | Static export + postbuild SEO audit | ✅ 649 HTML, 210 sitemap URLs |
| 9 | ESLint clean | ✅ |
| 10 | Lighthouse homepage performance ≥ 0.9 | ✅ CI gate (local Chrome unstable) |

---

## 5. Verification commands

```bash
npm test
npm run lint
npm run build
npm run lint:lighthouse
npm run test:e2e
```

---

## 6. Metrics (unchanged from Q2 plan)

| Goal | Target |
|------|--------|
| Lighthouse performance (homepage) | ≥ 0.9 |
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline (measure after baseline CSV) |
