# Web App Improvement Plan — Sprint 7 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-9527` (merged #135), `cursor/web-app-improvement-plan-c7f0` (PR #138)  
**Baseline:** Sprint 6 on `main` (PR #127 programmatic landings, PR #129 reactions API, PR #134 fuzzy search).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse** | PDP per SKU + full-text search | ✅ PDP-lite `/product/[id]/` (#138); ✅ review body excerpts (#135) |
| **Wirecutter / RTINGS** | Social proof vote counts | ⏳ HelpfulReaction Workers/KV (Phase C) |
| **RacketGuide / affiliate roundups** | Long-tail budget landings | ✅ Budget shoes + head-heavy under $150 (#138); all-round on main (#127) |
| **Brand PDPs** | First-party product photography | ⏳ Editorial `public/products/` pipeline |
| **YouTube reviewers** | Video evidence | ⏳ `VideoObject` gated on video commitment |

**Moat unchanged:** transparent fit score, claims CI, static export, 146+ reviews, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 7)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **No PDP for unmapped catalogue SKUs** | Catalog dead-end | ✅ PR #138 `/product/[id]/` |
| 2 | **Search index misses review body terms** | Discovery friction | ✅ PR #135 excerpt enrichment |
| 3 | **Missing budget shoe + value attack long-tail** | SEO topical coverage | ✅ PR #138 two `/best/*` pages |
| 4 | HelpfulReaction aggregate counts | Social proof | ⏳ Workers/KV backend |
| 5 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |

---

## 3. Execution summary

**PR #135 (on main):**
1. `reviewSearchExcerpt()` in `site-search.ts` — body tokens in review index.
2. Playwright typo smoke in `e2e/search-smoke.spec.ts`.

**PR #138:**
1. `/product/[id]/` — static PDP-lite with Product JSON-LD, save/compare/buy.
2. `catalogProductHref` → PDP when no review article.
3. CompareTable “View details” links.
4. `/best/budget-badminton-shoes/` and `/best/head-heavy-rackets-under-150/`.
5. Sitemap product expansion + Lighthouse PDP URL.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 6 deferred list + competitive audit | ✅ |
| 2 | PDP static export safe | ✅ |
| 3 | Excerpt cap prevents bundle blow-up | ✅ |
| 4 | catalogProductHref never 404s for catalogue ids | ✅ |
| 5 | New best picks use real `productId` values | ✅ |
| 6 | Fuzzy e2e + unit search tests | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | Sitemap includes `/product/[id]/` | ✅ |
| 10 | Lighthouse includes PDP + new best URLs | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 6. Deferred (Sprint 8+)

- HelpfulReaction Workers/KV aggregate counts
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- YouTube `sameAs` on author entity (after channel claim)
