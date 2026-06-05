# Web App Improvement Plan — Sprint 7 (June 2026)

**Branches:** `9527` (#135 search excerpts), `c7f0` (#138 PDP-lite), `32b1` (#145 claims + string cluster + `/updates/`)  
**Baseline:** Sprint 6 on `main` (fuzzy search, programmatic best pages, catalog funnel).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse** | PDP per SKU + stringing education | ✅ PDP-lite (#138); ✅ string feel guide (#145) |
| **Wirecutter / RTINGS** | Methodology + cited specs | ✅ `/data/` claims registry (#145) |
| **Retailer blogs** | Freshness feeds | ✅ `/updates/` (#145) |
| **Tennis Warehouse / retailer finders** | Full-text search | ✅ Review body excerpts (#135) |
| **BadmintonCentral** | Community trust | ⏳ HelpfulReaction Workers/KV |
| **Brand PDPs** | First-party photography | ⏳ Editorial `public/products/` pipeline |

**Moat:** transparent fit scoring, claims CI, static export, dated editorial feed, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 7 — parallel delivery)

| # | Gap | Delivery |
|---|-----|----------|
| 1 | No PDP for catalogue SKUs | ✅ PR #138 `/product/[id]/` |
| 2 | Search index misses review body | ✅ PR #135 excerpt enrichment |
| 3 | Incomplete stringing cluster + no freshness lane | ✅ PR #145 string guide + `/updates/` |
| 4 | Claims registry not public | ✅ PR #145 `/data/` |
| 5 | HelpfulReaction aggregates | ⏳ Workers/KV backend |

---

## 3. Execution summary (PR #145)

1. **`/guides/string-feel-vs-durability/`** — HowTo schema, cluster cross-links.
2. **`/updates/`** — `listEditorialUpdates()` freshness feed.
3. **`/data/`** — verified claims registry.
4. Registry: `editorial-meta`, `site-search`, footer, Lighthouse URLs.

*(PR #135 search excerpts and PR #138 PDP-lite already on `main`.)*

---

## 4. Ten-pass plan verification (PR #145)

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 stringing cluster + freshness lane | ✅ |
| 2 | String guide distinct from tension guide | ✅ |
| 3 | `/updates/` uses editorial dates | ✅ |
| 4 | Static export safe | ✅ |
| 5 | Compatible with PDP + search on `main` | ✅ |
| 6 | `editorial-meta` for new routes | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + SEO audit | ✅ |
| 9 | Lighthouse includes `/data/`, `/updates/`, string guide | ✅ |
| 10 | Sprint 8 retention shelves documented separately | ✅ |

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
