# Web App Improvement Plan — Sprint 7 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-2162`  
**Baseline:** Sprint 6 on `main` (PR #134 — fuzzy search, control rackets; PR #122 — catalog filters).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse** | Sharable filtered URLs, RSS | ✅ Results share link; RSS `rel=alternate` in layout |
| **Wirecutter / RTINGS** | Review full-text search, Product schema coverage | ✅ Review body tokens in search; map expansion |
| **RacketGuide roundups** | “All-round” / versatile landings | ✅ `/best/all-round-rackets/` |
| **YouTube reviewers** | Video + social proof counts | ⏳ VideoObject + HelpfulReaction KV |
| **Brand PDPs** | Original photography | ⏳ Editorial `public/products/` pipeline |

**Moat unchanged:** transparent fit score, claims CI, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 7)

| # | Gap | Impact | Sprint 7 |
|---|-----|--------|----------|
| 1 | **Review search misses body keywords** | Discovery on 146+ articles | ✅ `review-search-text.ts` + site-search keywords |
| 2 | **~38% reviews lack Product JSON-LD map** | Rich results coverage | ✅ +24 single-product map entries |
| 3 | **No sharable results URL affordance** | Coach/partner sharing | ✅ `ShareResultsLink` on `/results/` |
| 4 | **Missing all-round programmatic `/best/*`** | Long-tail SEO | ✅ `/best/all-round-rackets/` |
| 5 | **RSS not advertised to aggregators** | Return visits / syndication | ✅ `alternates.types` → `/feed.xml` |

**Deferred:** HelpfulReaction Workers/KV; original photos; GSC/CrUX CSV baselines; YouTube `sameAs` (channel claim).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Review search tokens | `src/lib/review-search-text.ts`, `site-search.ts` |
| Product map expansion | `src/data/blog-review-product-map.json` |
| Results share link | `ShareResultsLink.tsx`, `ResultsClient.tsx` |
| All-round best page | `src/app/best/all-round-rackets/page.tsx` |
| RSS discovery | `src/app/layout.tsx` |
| Registry + CI | `editorial-meta.ts`, `lighthouserc.json`, `best/page.tsx`, `LocalizedHome.tsx` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 6 deferred list + Q2 audit | ✅ |
| 2 | New map entries reference valid `products.json` ids | ✅ |
| 3 | All-round page ≥200 words + FAQs + verified `productId` rows | ✅ |
| 4 | Search body test (`BG80`) hits L69 review | ✅ |
| 5 | Share link uses `profileToResultsPath` (no PII) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | Lighthouse includes `/best/all-round-rackets/` | ✅ |
| 10 | Map coverage ≥75% single-product reviews | ✅ (~79% overall) |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Lighthouse performance (homepage) | ≥ 0.9 |
| Review→product map coverage | ≥ 75% |
