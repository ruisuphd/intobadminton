# Web App Improvement Plan — Sprint 3 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-0fb2`  
**Baseline:** Sprint 1–2 on `main` ([`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT2_2026-06.md)).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton gap (Sprint 3) |
|------------|----------|------------------------------|
| **Tennis Warehouse / retailer PDPs** | Saved lists, email alerts on price | Notify-me was alert-only; now local intent + analytics |
| **Wirecutter / RTINGS** | Return-visit modules | Homepage lacked recent shortlist recall |
| **BadmintonCentral** | Tool discovery via forums | Toolkit existed but homepage strip showed 3/5 tools |
| **YouTube reviewers** | Video evidence | Still deferred (`VideoObject` gated) |
| **Brand blogs** | Original product photography | Still editorial pipeline |

**Moat unchanged:** transparent fit scoring, postbuild SEO gate, static export, 146+ reviews, cluster guides restored on this branch.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 3 |
|---|-----|--------|----------|
| 1 | **Notify-me used `alert()` with no persistence** | Broken engagement loop on `/saved/` | ✅ Buttondown when configured; else `notify-me.ts` local intent |
| 2 | **No homepage recall of finder shortlists** | Weak 7-day return signal | ✅ `HomeRecentShortlists` |
| 3 | **Toolkit under-surfaced on homepage** | Lower pages/session to `/tools/*` | ✅ 5-tool `HomeToolkitStrip` |
| 4 | **`/saved/` missing from search + Lighthouse** | Discovery + CI regression blind spot | ✅ site-search + `lighthouserc.json` |
| 5 | **Merge drift vs `main` (cluster guides)** | Broken internal links if guides dropped | ✅ merged `origin/main`, kept pillars |

### Follow-up (PR #98 / `cursor/web-app-improvement-plan-e4a1`)

| Item | Status |
|------|--------|
| Editorial `/best/rackets-under-100/` (Q2 §3.5 programmatic landing) | ✅ Shipped |
| Blog map links for AxForce 10 + Thruster SR/9900 reviews | ✅ |

### Deferred (Sprint 4+)

- Migrate offline notify-me intents when Buttondown username is set in production
- HelpfulReaction Workers/KV aggregate counts
- First-party `public/products/` photography
- `Person.sameAs` after YouTube channel claim
- zh locale content

---

## 3. Execution summary

1. `src/lib/notify-me.ts` — per-product email intent in `localStorage`; `notify_me_opt_in` / `notify_me_clear` analytics.
2. `HomeRecentShortlists` — last 3 finder runs on homepage (device-local).
3. `HomeToolkitStrip` — court diagram + balance explainer cards added.
4. Site search + Lighthouse URL for `/saved/`.
5. Merged `origin/main` with SEO cluster guides retained.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 Sprint 3 + competitive audit | ✅ |
| 2 | Notify-me stores only on device; no server POST yet | ✅ |
| 3 | No homepage signup wall added | ✅ |
| 4 | Recent shortlists hidden when history empty | ✅ |
| 5 | Toolkit links match live `/tools/*` routes | ✅ |
| 6 | `/saved/` in `buildSearchIndex()` | ✅ |
| 7 | `notify-me.test.ts` + `site-search` tests | ✅ |
| 8 | Static export safe (client-only modules) | ✅ |
| 9 | `npm test && npm run build` | ✅ (CI) |
| 10 | postbuild SEO audit clean | ✅ (CI) |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Notify-me opt-ins (GA4) | Track `notify_me_opt_in` weekly |
