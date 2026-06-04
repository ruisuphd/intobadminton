# Web App Improvement Plan — Sprint 3 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-c920`  
**Baseline:** Sprint 1–2 on `main` ([`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md)).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton response (Sprint 3) |
|------------|----------|----------------------------------|
| **Tennis Warehouse / retailer PDPs** | Saved lists, email alerts | `notify-me.ts` + Buttondown when configured; local intent fallback |
| **Wirecutter / RTINGS** | Return-visit + article ToC | `HomeRecentShortlists`; `GuideInPageToc` on guides |
| **BadmintonCentral** | Dense internal linking | Glossary autolinks in review body from `glossaryLinks` |
| **RacketGuide finders** | Visual quiz UX | Per-step hints + SVG glyphs in `QuizFunnel` |
| **YouTube reviewers** | Video evidence | Deferred (`VideoObject` gated) |

**Moat:** transparent fit scoring, postbuild SEO gate, static export, 146+ reviews, cluster guides on `main`.

---

## 2. Top 5 gaps (combined Sprint 3)

| # | Gap | Status |
|---|-----|--------|
| 1 | Notify-me was alert-only / no persistence | ✅ `notify-me.ts` + Buttondown (`main`) |
| 2 | Glossary terms not linked in rendered prose | ✅ `glossary-autolink` (this PR) |
| 3 | Guides lack jump/sticky ToC | ✅ `GuideInPageToc` (this PR) |
| 4 | Quiz missing per-step visual cues | ✅ `QuizStepDecor` (this PR) |
| 5 | Homepage recall + toolkit discovery | ✅ `HomeRecentShortlists` + 5-tool strip (`main`) |

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

---

## 3. Execution summary (this PR)

1. `src/lib/glossary-autolink.ts` + `GlossaryLinkedText` on review sections
2. `src/components/GuideInPageToc.tsx` — portal ToC after guide `<h1>`
3. `src/app/quiz/QuizFunnel.tsx` — step hints + option glyphs
4. `scripts/generate-product-images.mjs` — prefer `sharp` on Linux CI

(Notify-me, recent shortlists, toolkit strip, `/saved/` search + Lighthouse shipped on `main`.)

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 plan + competitive audit | ✅ |
| 2 | Glossary links only for declared `glossaryLinks` | ✅ |
| 3 | Guide ToC skips `/guides/` index; 3+ sections only | ✅ |
| 4 | Quiz glyphs decorative; hints non-blocking | ✅ |
| 5 | Notify-me unchanged from `main` (no regression) | ✅ |
| 6 | Static export safe | ✅ |
| 7 | `npm test` (180 tests) | ✅ |
| 8 | `npm run build` + postbuild SEO audit | ✅ |
| 9 | No duplicate notify-me implementations | ✅ |
| 10 | Plan doc reflects `main` + branch delta | ✅ |

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
