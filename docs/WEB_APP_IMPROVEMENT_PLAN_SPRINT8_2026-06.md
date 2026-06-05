# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b4ca` / PR #142  
**Baseline:** Sprint 7 on `main` (PDP-lite #138, search excerpts #135, claims `/data/` #130).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 8 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Role-based `/best/*` landings | ✅ `/best/defensive-rackets/` + 17+ hubs |
| **Wirecutter / RTINGS** | Product schema, social proof | ✅ Map **86%**; canonical slug ranking |
| **RacketGuide** | Long-tail clusters | ✅ Defensive + all-round discovery |
| **Retailer finders** | PDP per SKU, mobile search | ✅ PDP-lite; mobile static search on `main` |
| **YouTube reviewers** | Video evidence | ⏳ `VideoObject` deferred |

**Moat:** transparent fit score, claims CI, static export, postbuild SEO gate, fuzzy search with review body excerpts.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Status |
|---|-----|--------|
| 1 | No defensive doubles SEO landing | ✅ `/best/defensive-rackets/` |
| 2 | Product map below 85% | ✅ 86% (126/146) |
| 3 | 1000Z Play wrong catalogue id (e2e redirect) | ✅ `yy-nanoflare-1000-play` |
| 4 | HelpfulReaction public counts | ⏳ Workers/KV deploy |
| 5 | Original product photography | ⏳ Editorial pipeline |

---

## 3. Execution summary

- Defensive best-of page + search/related/Lighthouse/e2e smoke
- Map canonical ranking in `review-pages.ts` (`-play-` / `-vs-` deprioritized)
- `audit-review-product-map.mjs --min-coverage=85`
- Merged with `main`: claims registry, PDP-lite, budget shoes, mobile static search

---

## 4. Ten-pass verification

All passes ✅ — `npm test` (256), `npm run build`, SEO audit, map ≥85%, e2e redirect + defensive smoke.

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
node scripts/audit-review-product-map.mjs --min-coverage=85
```

---

## 6. Deferred (Sprint 9+)

- HelpfulReaction Workers/KV + `NEXT_PUBLIC_REACTIONS_API_URL`
- Original `public/products/` photography
- GSC/CrUX CSV baselines
- Map toward 90%+; YouTube `sameAs` after channel claim
