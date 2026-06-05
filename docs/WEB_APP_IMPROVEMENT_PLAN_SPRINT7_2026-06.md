# Web App Improvement Plan — Sprint 7 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-00c0`  
**Baseline:** Sprint 6 on `main` (PR #129 — reactions API, singles/head-light landings, image placeholders, fuzzy search via PR #134).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 7 response |
|------------|---------------------------|------------------------|
| **Wirecutter / RTINGS** | Product + Review schema on every product URL | ✅ Expand `blog-review-product-map.json` 62% → 79% |
| **RacketGuide / affiliate roundups** | Role matrix (balanced, all-round) | ✅ `/best/balanced-rackets/` programmatic page |
| **Retailer finders** | CI gates on performance regressions | ✅ Fix HelpfulReaction lint; wire `lint:lighthouse:baseline` npm script |
| **Mature review sites** | Helpful-vote social proof on commercial pages | ✅ (Sprint 6) + hydration-safe HelpfulReaction fix |
| **Editorial ops** | Lighthouse score snapshots in repo | ✅ Baseline compare script + npm aliases (capture deferred to post-build) |

**Moat (unchanged):** transparent fit score, postbuild SEO gate, static export, 146+ signed reviews, claims CI.

**Deferred to Sprint 8+:** first-party `public/products/` photography, GSC/CrUX CSV capture (owner manual), claimed YouTube `Person.sameAs`, `VideoObject`, web push, comments.

---

## 2. Top 5 gaps (closed Sprint 7)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | **CI lint failure** on HelpfulReaction (`set-state-in-effect`) | Blocks green builds on `main` | ✅ Hydration-safe read after mount |
| 2 | **Review product map at 62%** — Product JSON-LD missing on ~55 URLs | Rich results + E-E-A-T | ✅ +24 mappings → 79% (115/146) |
| 3 | **Role matrix gap: balanced / all-round** | Long-tail SEO vs RacketGuide | ✅ `/best/balanced-rackets/` |
| 4 | **Lighthouse baseline not wired to npm** | CWV guardrail friction | ✅ `lint:lighthouse:baseline` + `capture:lighthouse:baseline` |
| 5 | **HelpfulReaction remount on route change** | Stale vote state on client nav | ✅ `key={contentId}` on footer |

---

## 3. Execution summary

| Item | Files |
|------|-------|
| HelpfulReaction lint fix | `src/components/HelpfulReaction.tsx`, `ArticleEngagementFooter.tsx` |
| Product map expansion | `src/data/blog-review-product-map.json` (+24 slugs) |
| Balanced rackets landing | `src/app/best/balanced-rackets/page.tsx` |
| Discovery wiring | `best/page.tsx`, `site-search.ts`, `editorial-meta.ts`, `LocalizedHome.tsx`, `lighthouserc.json` |
| npm scripts | `package.json` |
| Tests | `review-article-enrichment.test.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 6 deferrals + PR #129 CI failure | ✅ |
| 2 | Product map entries reference existing catalogue IDs only | ✅ (verified via script) |
| 3 | Editorial / concept articles remain unmapped (no forced Product schema) | ✅ |
| 4 | Balanced page picks use distinct lens vs control / head-light / singles | ✅ |
| 5 | Balanced page has ≥200 words intro + 4 FAQs | ✅ |
| 6 | `editorial-meta`, site search, `/best/` hub, Lighthouse URLs updated | ✅ |
| 7 | HelpfulReaction avoids synchronous setState on localStorage read | ✅ |
| 8 | Unit tests pass including new enrichment case | ✅ |
| 9 | `npm test` + `npm run lint` + `npm run build` | ✅ |
| 10 | Static export safe — no new API routes | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
node scripts/audit-review-product-map.mjs
node scripts/lighthouse-baseline.mjs --help
```

Optional baseline capture (after build + serve on :4173):

```bash
npm run build && npm start &
npm run capture:lighthouse:baseline
```

---

## 6. Metrics (Q2)

| Goal | Target |
|------|--------|
| Review product map coverage | ≥75% (achieved 79%) |
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| CWV p75 LCP | <2.5s |
