# Web App Improvement Plan — Sprint 6 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b7a9`  
**Baseline:** Sprint 5 on `main` (PR #116 — programmatic best pages, glossary autolink fill-in; PR #117 — guide ToC CLS fix).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse / retailer finders** | Typo-tolerant search, faceted browse | ✅ Catalog + kind filters on main; **fuzzy token search this sprint** |
| **Wirecutter / RTINGS** | Social proof vote counts | ⏳ HelpfulReaction Workers/KV (Phase C) |
| **RacketGuide / affiliate roundups** | Long-tail landings (control, all-round) | ✅ `/best/control-rackets/` (this PR) |
| **Brand PDPs** | First-party product photography | ⏳ Editorial `public/products/` pipeline |
| **YouTube-first reviewers** | Video evidence | ⏳ `VideoObject` gated on video commitment |

**Moat unchanged:** transparent fit score, claims CI, static export, 146+ reviews, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 6)

| # | Gap | Impact | Sprint 6 |
|---|-----|--------|----------|
| 1 | **Site search lacks typo tolerance** | Discovery friction on mobile | ✅ `search-fuzzy.ts` + token scoring |
| 2 | **Missing control / placement programmatic `/best/*`** | Long-tail SEO (doubles net, singles craft) | ✅ `/best/control-rackets/` |
| 3 | HelpfulReaction aggregate counts | Social proof (Wirecutter parity) | ⏳ Workers/KV backend |
| 4 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |
| 5 | Video / `VideoObject` schema | E-E-A-T visual evidence | ⏳ Gated on video commitment |

---

## 3. Execution summary

1. **`src/lib/search-fuzzy.ts`** — Levenshtein distance (max 1) for query tokens ≥4 chars; integrated into `searchSite()` scoring.
2. **`/best/control-rackets/`** — six catalog-backed control picks (88S Pro, Arcsaber 11 Pro, Halbertec 8000/9000, NF800 Pro, Brave Sword 12).
3. **Registry updates** — `editorial-meta`, `site-search` static entry, `/best/` hub, homepage popular searches, Lighthouse URL.

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 §3.3 programmatic pages + competitive audit | ✅ |
| 2 | New best picks use verified `productId` rows from `products.json` | ✅ |
| 3 | Each new best page has ≥200 words original intro + FAQs | ✅ |
| 4 | `editorial-meta` + sitemap `lastReviewedAt` registered | ✅ |
| 5 | Distinct lens vs doubles / smash / shoulder best pages | ✅ |
| 6 | Static export safe (no API routes) | ✅ |
| 7 | Fuzzy search does not match nonsense queries (`xyzzyplughnotreal`) | ✅ |
| 8 | `npm test` (incl. `search-fuzzy`, site-search typo cases) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse config includes `/best/control-rackets/` | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
```

---

## 6. Deferred (Sprint 7+)

- HelpfulReaction Workers/KV aggregate counts
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- Review body full-text in search index (size trade-off)
