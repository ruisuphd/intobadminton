# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-b4ca` / PR #142  
**Baseline:** Sprint 7 on `main`; PR #142 stack (PDP-lite, budget shoes, claims `/data/`, map ~86%).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / response |
|------------|---------------------------|----------------|
| **Tennis Warehouse / retailer finders** | Role-based landing URLs | ✅ 17+ `/best/*`; **defensive doubles landing** |
| **Wirecutter / RTINGS** | Product + Review schema, social proof | ✅ Map ≥85%; HelpfulReaction KV ⏳ deploy |
| **RacketGuide / affiliate roundups** | Long-tail clusters (balanced, defensive) | ✅ All-round hub + defensive page |
| **Brand PDPs** | Product detail pages | ✅ PDP-lite `/product/[id]/` |
| **YouTube-first reviewers** | Video evidence | ⏳ `VideoObject` gated |

**Moat:** transparent fit score, claims CI, static export, postbuild SEO gate, fuzzy search with review body excerpts.

---

## 2. Top 5 gaps (Sprint 8)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | **No `/best/defensive-rackets/` landing** | Defensive doubles long-tail SEO | ✅ |
| 2 | **Product map below 85%** | Rich results / canonical `/review/` URLs | ✅ 86%+; canonical slug ranking in `review-pages.ts` |
| 3 | **1000Z Play mapped to wrong catalogue id** | Broken legacy `/review/yy-nanoflare-1000z/` redirect | ✅ `yy-nanoflare-1000-play` |
| 4 | HelpfulReaction aggregate counts live | Social proof | ⏳ Worker deploy + env |
| 5 | Original product photography | AdSense / visual maturity | ⏳ Editorial pipeline |

---

## 3. Execution summary

| Item | Files |
|------|-------|
| Defensive best-of page | `src/app/best/defensive-rackets/` |
| Discovery wiring | `site-search.ts`, `related-content.ts`, `best/page.tsx` |
| Map + canonical fixes | `blog-review-product-map.json`, `review-pages.ts` |
| Audit hardening | `audit-review-product-map.mjs` (`--min-coverage=85`) |
| E2E smoke | `e2e/best-smoke.spec.ts` |
| Lighthouse | `lighthouserc.json` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in audit + Sprint 7 deferrals | ✅ |
| 2 | Defensive page distinct from head-light (role vs geometry) | ✅ |
| 3 | Map entries reference valid catalogue IDs | ✅ |
| 4 | `reviewPath('yy-nanoflare-1000z')` → flagship review slug | ✅ |
| 5 | Static export safe | ✅ |
| 6 | Related reading + search index wired | ✅ |
| 7 | `npm test` (253+) | ✅ |
| 8 | `npm run build` + SEO audit | ✅ |
| 9 | `audit-review-product-map.mjs --min-coverage=85` | ✅ |
| 10 | Lighthouse includes defensive URL | ✅ |

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

- Deploy HelpfulReaction Workers/KV + `NEXT_PUBLIC_REACTIONS_API_URL`
- GSC/CrUX baseline CSV in `docs/baselines/`
- Original photos on top commercial URLs
- Map toward 90%+ (comparison slugs need editorial judgment)
- YouTube `sameAs` on author entity (after channel claim)
