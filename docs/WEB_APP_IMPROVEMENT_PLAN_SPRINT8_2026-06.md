# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-32b1`  
**Baseline:** Sprint 7 merged (`/updates/`, `/data/`, string feel guide on PR #140).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Wirecutter / RTINGS** | Methodology + cited specs | ✅ `/data/` claims registry |
| **Tennis Warehouse** | Stringing education cluster | ✅ Cluster hub; Sprint 8 completes cross-links |
| **Retailer blogs** | Freshness feeds | ✅ `/updates/` + homepage strip (this sprint) |
| **BadmintonCentral** | Community trust | ⏳ HelpfulReaction KV (deploy + env) |
| **Brand PDPs** | Product photography | ⏳ Editorial `public/products/` pipeline |

**Moat:** transparent fit scoring, postbuild SEO gate, dated editorial feed, static-export performance.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Impact | Sprint 8 |
|---|-----|--------|----------|
| 1 | **String cluster incomplete** | Topical authority | ✅ `string-feel-vs-durability` in `related-content` cluster |
| 2 | **Review pages lack decision-path shelf** | Post-article retention | ✅ `relatedReadingForReviewSlug` + shelf on reviews |
| 3 | **Homepage hides freshness lane** | Return visits | ✅ `HomeRecentUpdates` strip → `/updates/` |
| 4 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |
| 5 | HelpfulReaction aggregate counts | Social proof | ⏳ Workers/KV deploy + `NEXT_PUBLIC_REACTIONS_API_URL` |

---

## 3. Execution summary

1. Extend `strings` cluster with `/guides/string-feel-vs-durability/`; map `/data/`, `/updates/`.
2. `relatedReadingForReviewSlug()` — heuristic cluster from review slug (shoe/string/racket).
3. `RelatedReadingShelf` on `EditorialArticlePage` for guide/best/compare cross-links.
4. `HomeRecentUpdates` — three latest rows from `listEditorialUpdates(3)`.
5. Tests + full CI verification.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferrals + Q2 engagement | ✅ |
| 2 | String cluster distinct paths (feel vs tension vs calculator) | ✅ |
| 3 | Review shelf excludes current slug; only mapped clusters | ✅ |
| 4 | Homepage updates use editorial dates, not build time | ✅ |
| 5 | Static export safe (no new API routes) | ✅ |
| 6 | `/data/` and `/updates/` remain in sitemap/footer | ✅ |
| 7 | `related-content.test.ts` covers new paths | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URLs unchanged for Sprint 7 routes | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 6. Deferred (Sprint 9+)

- Deploy `workers/reactions/` and set `NEXT_PUBLIC_REACTIONS_API_URL` in production
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- `Person.sameAs` YouTube after channel claim
