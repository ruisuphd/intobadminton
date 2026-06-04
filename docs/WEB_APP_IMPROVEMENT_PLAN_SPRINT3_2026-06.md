# Web App Improvement Plan — Sprint 3 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-0fb2` + `22e9` + `e4a1` (merged to `main`), `cursor/web-app-improvement-plan-c920` (PR #97 — glossary autolinks, guide ToC, quiz UX)  
**Baseline:** Sprint 1–2 on `main` ([`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md)).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton response (Sprint 3) |
|------------|----------|----------------------------------|
| **Tennis Warehouse / retailer PDPs** | Saved lists, catalog search, email alerts | Product index + kind chips; `notify-me.ts` + Buttondown when configured |
| **Wirecutter / RTINGS** | Return-visit + article ToC | `HomeRecentShortlists`; `GuideInPageToc` on guides (PR #97) |
| **BadmintonCentral** | Dense internal linking | Glossary autolinks in review body from `glossaryLinks` (PR #97) |
| **RacketGuide finders** | Visual quiz UX | Per-step hints + SVG glyphs in `QuizFunnel` (PR #97) |
| **YouTube reviewers** | Video evidence | Deferred (`VideoObject` gated) |

**Moat:** transparent fit scoring, postbuild SEO gate, static export, 146+ reviews, cluster guides on `main`.

---

## 2. Top 5 gaps (combined Sprint 3)

| # | Gap | Status |
|---|-----|--------|
| 1 | Catalog products missing from site search | ✅ `product` kind + `reviewableProducts()` (`main` #95) |
| 2 | No search kind filters | ✅ chip filters on `/search/` (`main` #95) |
| 3 | Notify-me / return-visit hooks weak | ✅ `notify-me.ts`, `HomeRecentShortlists` (`main` #94) |
| 4 | Glossary terms not linked in rendered prose | ✅ `glossary-autolink` (PR #97) |
| 5 | Guides lack jump/sticky ToC; quiz lacks visual cues | ✅ `GuideInPageToc` + `QuizStepDecor` (PR #97) |

Also shipped on `main` (#95): compare `ArticleEngagementFooter`, results brand filter chips.

### Follow-up (PR #98 / `cursor/web-app-improvement-plan-e4a1`)

| Item | Status |
|------|--------|
| Editorial `/best/rackets-under-100/` (Q2 §3.5 programmatic landing) | ✅ Shipped |
| Blog map links for AxForce 10 + Thruster SR/9900 reviews | ✅ |

### Deferred (Sprint 4+)

- HelpfulReaction Workers/KV aggregates
- First-party `public/products/` photography
- `Person.sameAs` after social profile claims
- PWA web push
- Faceted search over spec fields (weight, balance, price band)

---

## 3. Execution summary

**On `main` (PRs #94–#95, #98):** notify-me, recent shortlists, toolkit strip, `/saved/` in search, catalog search + kind filters, compare engagement, results brand filter, `/best/rackets-under-100/`.

**PR #97 (`cursor/web-app-improvement-plan-c920`):**

1. `src/lib/glossary-autolink.ts` + `GlossaryLinkedText` on review sections
2. `src/components/GuideInPageToc.tsx` — portal ToC after guide `<h1>`
3. `src/app/quiz/QuizFunnel.tsx` — step hints + option glyphs
4. `scripts/generate-product-images.mjs` — prefer `sharp` on Linux CI

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 plan + competitive audit | ✅ |
| 2 | Glossary links only for declared `glossaryLinks` | ✅ |
| 3 | Guide ToC skips `/guides/` index; 3+ sections only | ✅ |
| 4 | Quiz glyphs decorative; hints non-blocking | ✅ |
| 5 | Product search + notify-me unchanged from `main` | ✅ |
| 6 | Static export safe | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | No duplicate notify-me implementations | ✅ |
| 10 | Plan doc reflects `main` + PR #97 delta | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Notify-me opt-ins | Track `notify_me_opt_in` / `notify_me_submit` in GA4 |
| SearchAction utility | Catalog + editorial in one index |
