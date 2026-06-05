# Web App Improvement Plan — Sprint 7 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-32b1` (PR #145)  
**Baseline:** Sprint 6 on `main` (fuzzy search, programmatic best pages, catalog funnel).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Wirecutter / RTINGS** | Public methodology + cited specs | ✅ `/data/` claims registry |
| **Tennis Warehouse** | Stringing education cluster | ✅ String feel guide completes cluster |
| **Retailer blogs** | Freshness / “what’s new” feeds | ✅ `/updates/` editorial lane |
| **Tennis Warehouse / retailer finders** | Full-text product search | ✅ Review body excerpts on `main` |
| **BadmintonCentral** | Community trust signals | ⏳ HelpfulReaction Workers/KV |
| **Brand PDPs** | First-party photography | ⏳ Editorial `public/products/` pipeline |

**Moat:** dated editorial feed + stringing cluster hub→spoke links + claims CI gate + transparent fit scoring.

---

## 2. Top 5 gaps (Sprint 7)

| # | Gap | Impact | Sprint 7 |
|---|-----|--------|----------|
| 1 | **Incomplete stringing SEO cluster** | Topical authority | ✅ `/guides/string-feel-vs-durability/` |
| 2 | **No domain freshness lane** | Crawler + return-visit signal | ✅ `/updates/` |
| 3 | **Claims registry not on main** | E-E-A-T cite-back | ✅ `/data/` |
| 4 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |
| 5 | HelpfulReaction aggregate counts | Social proof | ⏳ Workers/KV backend |

*(Review body search excerpts shipped on `main` via parallel Sprint 7 branch `9527`.)*

---

## 3. Execution summary

1. **`/guides/string-feel-vs-durability/`** — ≥800 words, HowTo schema, cross-links to tension guide, best strings, calculator.
2. **`/updates/`** — `listEditorialUpdates()` merges `editorialMetaByPath` + review articles; CollectionPage JSON-LD.
3. **`/data/`** — verified claims registry with source URLs.
4. **Registry** — `editorial-meta`, `site-search`, guides index, footer, Lighthouse URLs.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.3 stringing cluster + `/updates/` lane | ✅ |
| 2 | String guide distinct from tension guide (gauge/durability vs lb ranges) | ✅ |
| 3 | String guide has HowTo + cross-links to cluster spokes | ✅ |
| 4 | `/updates/` uses editorial dates, not build time | ✅ |
| 5 | `editorial-meta` + sitemap `lastReviewedAt` for new routes | ✅ |
| 6 | Static export safe (no API routes) | ✅ |
| 7 | `/data/` retained after main merge | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse includes `/updates/`, `/data/`, string guide | ✅ |

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
