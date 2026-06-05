# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f1fa`  
**Baseline:** Sprint 7 rebased on `main` (review body search, share results, RSS; Sprint 6 reactions API + programmatic pages on main).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Wirecutter / RTINGS** | Product schema on ~90%+ review URLs; aggregate helpful votes | ✅ Reactions Workers/KV shipped on main; map push to **≥85%** this sprint |
| **Tennis Warehouse** | Sharable filtered URLs + spec compare | ✅ Results share link (Sprint 7); catalog compare funnel (Sprint 6) |
| **RacketGuide / affiliate roundups** | Long-tail “strings by feel”, shoe width landings | ✅ `/best/strings/`, `/best/wide-feet-badminton-shoes/` on main |
| **BadmintonCentral** | Forum search depth on legacy threads | ✅ Review body tokens + fuzzy search; evergreen guides correctly unmapped |
| **Brand PDPs / YouTube** | Original photography, video evidence | ⏳ Editorial `public/products/` + `VideoObject` gated |

**Moat:** transparent fit score, claims CI, static export, postbuild SEO gate, 146 first-person reviews.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Impact | Sprint 8 |
|---|-----|--------|----------|
| 1 | **Product map below 85%** | Rich-result coverage on comparison reviews | ✅ +10 primary-product mappings |
| 2 | **Review body search not e2e-verified** | Regression risk on 146-article index | ✅ Playwright `BG80` smoke |
| 3 | **Results share link not e2e-verified** | Coach/partner sharing UX | ✅ `results-share-smoke.spec.ts` |
| 4 | **HelpfulReaction counts need deploy** | Social proof (Wirecutter parity) | ⏳ Worker in repo; set `NEXT_PUBLIC_REACTIONS_API_URL` in prod |
| 5 | **Original photos / video schema** | AdSense experience signal | ⏳ Editorial pipeline |

**Deferred:** GSC/CrUX baseline CSV (`docs/baselines/`); YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Product map → ≥85% | `src/data/blog-review-product-map.json` (+10 entries) |
| Review body search unit test | `src/lib/site-search.test.ts` (`BG80` → L69) |
| Search e2e | `e2e/search-smoke.spec.ts` |
| Results share e2e | `e2e/results-share-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferred list + Q2 audit | ✅ |
| 2 | New map entries reference valid `products.json` ids | ✅ |
| 3 | Comparison articles map to editorial primary product only | ✅ |
| 4 | Evergreen guides (glossary, how-to) remain unmapped | ✅ |
| 5 | `BG80` search hits L69 string review in unit + e2e | ✅ |
| 6 | Share link uses `profileToResultsPath` (no PII) | ✅ (Sprint 7) |
| 7 | Static export — no new API routes | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Map coverage ≥85% | ✅ (~86%) |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
npm run test:e2e   # after build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Lighthouse performance (homepage) | ≥ 0.9 |
| Review→product map coverage | ≥ 85% |
