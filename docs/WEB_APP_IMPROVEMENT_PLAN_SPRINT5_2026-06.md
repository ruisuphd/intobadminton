# Web App Improvement Plan — Sprint 5 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-dfd2` → PR #92  
**Baseline:** Sprint 3–4 on `main` (PR #97, #105, #110, #117).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 5 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse / retailer PDPs** | Fast LCP, hero search, filter browse | Homepage bundle slim + `/catalog/` + hero `SiteSearchForm` |
| **Wirecutter / RTINGS** | Product rich results, long-tail landings | Product JSON-LD (Phase B) + programmatic `/best/*` on main |
| **BadmintonCentral** | 20+ year archive, community search | Site search + compare guides indexed |
| **YouTube-first reviewers** | Video evidence | Deferred — `VideoObject` gated on editorial |
| **Brand blogs** | Original photography | Deferred — editorial pipeline |

**Moat:** transparent fit score, claims CI, postbuild SEO gate, static export, 146+ reviews.

---

## 2. Top 5 gaps (this sprint — PR #92)

| # | Gap | Impact | Sprint 5 |
|---|-----|--------|----------|
| 1 | **Homepage imports full `blog-articles.json` + `products.json`** | Lighthouse CI failure; poor LCP on `/` | ✅ Prebuild slices + dynamic engagement |
| 2 | **Merge drift vs latest `main`** | Lost catalog, hero search, budget funnel | ✅ Rebased on `origin/main` |
| 3 | **Guide ToC CLS in Lighthouse** | CI flake on long guides | ✅ CLS warn threshold (main #110) + ToC fix (#117) |
| 4 | **GSC/CrUX baseline not captured** | Cannot measure ROI | ⏳ Owner manual capture per `docs/baselines/README.md` |
| 5 | **HelpfulReaction cross-user counts** | Social proof | ⏳ GA4 interim; Workers/KV deferred |

### Deferred (Sprint 6+)

- First-party `public/products/` hero photography
- HelpfulReaction Cloudflare Workers/KV endpoint
- `Person.sameAs` YouTube (after channel claim)
- `VideoObject` on review pages

---

## 3. Execution summary (PR #92)

1. `scripts/generate-home-featured.mjs` — six latest reviews without full blog corpus on `/`
2. `scripts/generate-catalog-stats.mjs` — category counts without `products.json` on homepage
3. `scripts/generate-product-display-names.mjs` — id→name map for shortlist rows
4. `HomeContinueReading` — dynamic import of `ContinueReading`
5. `LocalizedHome` — `home-featured.ts` + `catalog-stats.json`; retains hero `SiteSearchForm` from main

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in June plan Phase C + Lighthouse failure mode | ✅ |
| 2 | Homepage does not import `blog-articles.json` or `products.json` | ✅ |
| 3 | `home-featured-reviews.json` regenerated in `prebuild` | ✅ |
| 4 | Dynamic import keeps engagement off critical path | ✅ |
| 5 | Sprint 4 routes (`/catalog/`, facets) intact after merge | ✅ |
| 6 | Hero search + notify-me migrate from main retained | ✅ |
| 7 | `npm test` | ✅ 199+ passed |
| 8 | Static export + postbuild SEO audit | ✅ |
| 9 | ESLint clean | ✅ |
| 10 | Lighthouse homepage performance ≥ 0.9 | ✅ CI |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
npm run lint:lighthouse
```
