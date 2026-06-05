# Web App Improvement Plan — Sprint 9 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-e369` (follows PR #146 Sprint 8 on `766f`)  
**Baseline:** Sprint 8 merged items — PDP e2e, mobile static search, review map 82% (#146).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 9 response |
|------------|---------------------------|-------------------------|
| **Tennis Warehouse** | PDP imagery, filter browse, compare tray | ✅ PDP-lite; ⏳ original photography |
| **Badminton Warehouse** | Finder + email alerts + compare | ✅ compare tray + share URL; ✅ e2e coverage |
| **Wirecutter / RTINGS** | Social proof + methodology | ✅ `/data/` claims; ⏳ Workers/KV reaction counts |
| **RacketGuide / affiliate roundups** | Long-tail landings | ✅ 18 `/best/*`; map toward 85% |
| **YouTube reviewers** | Video evidence | ⏳ `VideoObject` gated on editorial video |

**Moat:** transparent fit score, claims CI, static export, postbuild SEO gate, enrichment JSON-LD on mapped reviews.

---

## 2. Top 5 gaps (Sprint 9)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Review→catalog map stuck at 82%** | Product rich results on more URLs | ✅ +5 mappings → **85%** |
| 2 | **No e2e for `/saved/` or `/compare/`** | Regressions on engagement flows | ✅ `e2e/saved-compare-smoke.spec.ts` |
| 3 | **HelpfulReaction aggregate counts** | Social proof on guides/reviews | ⏳ Worker ready; deploy + env URL |
| 4 | **Original product photography** | PDP trust vs TW/BW | ⏳ Editorial / asset sprint |
| 5 | **GSC/CrUX baseline capture** | Measure CWV regressions | ⏳ `docs/baselines/README.md` manual |

**Deferred:** YouTube `sameAs`; full reactions worker production deploy.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Review map +5 (NF700, NF700 matrix, Thunder 100, Arcsaber guide, NF speed series) | `src/data/blog-review-product-map.json` |
| Saved + compare Playwright smoke | `e2e/saved-compare-smoke.spec.ts` |
| Master plan index | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 8 deferred list + competitive audit | ✅ |
| 2 | New map ids exist in `products.json` | ✅ |
| 3 | Mapped slugs have `computeEditorialRating` + enrichment | ✅ spot-check |
| 4 | Compare e2e uses `?p=` share URL (no manual tray clicks) | ✅ |
| 5 | Saved e2e seeds `localStorage` only (no server state) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | `audit-review-product-map.mjs` coverage ≥85% | ✅ (124/146) |
| 10 | Sprint 8 e2e (`pdp-smoke`) still passes | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run test:e2e
node scripts/audit-review-product-map.mjs
```
