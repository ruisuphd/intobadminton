# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f5af`  
**Baseline:** Sprints 1–3 on `main` ([`WEB_APP_IMPROVEMENT_PLAN_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_2026-06.md), [`WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md)).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton gap (Sprint 4) |
|------------|----------|------------------------------|
| **Tennis Warehouse** | Saved lists reopen to filtered PDP grids | Shortlist recall showed names only — no deep link |
| **Wirecutter / RTINGS** | Return modules with one-click resume | Homepage shortlists lacked `/results/` reopen |
| **RacketGuide / retailer finders** | Tool pages in performance CI | Lighthouse omitted cluster guides + flagship tools |
| **BadmintonCentral** | Forum search + threads | Community still out of scope |
| **YouTube reviewers** | Video evidence | `VideoObject` still gated on video commitment |

**Moat unchanged:** transparent fit scoring, postbuild SEO gate, static export, 146+ reviews, five interactive tools, Buttondown-ready notify-me.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 4 |
|---|-----|--------|----------|
| 1 | **Recent shortlists not reopenable** | Weak 7-day return / pages per session | ✅ `profileToResultsPath` + linked cards |
| 2 | **Offline notify-me intents stranded when Buttondown goes live** | Lost opt-ins at deploy | ✅ One-tap migrate on `/saved/` |
| 3 | **Lighthouse blind to SEO cluster guides + tools** | CI regression signal | ✅ URLs added to `lighthouserc.json` |
| 4 | **HelpfulReaction aggregate counts** | Social proof | ⏳ GA4-only until Workers/KV |
| 5 | **First-party product photography** | Product Reviews / AdSense | ⏳ Editorial pipeline |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV backend
- `public/products/` hero photography wave
- `Person.sameAs` after YouTube channel claim
- zh locale content
- GSC/CrUX CSV refresh in `docs/baselines/`

---

## 3. Execution summary

1. `profileToResultsPath()` in `src/lib/profile-url.ts` — serialise stored profiles to `/results/?…`.
2. `HomeRecentShortlists` + `RecentHistory` — interactive cards linking to reopened rankings.
3. `SavedListClient` — when Buttondown is configured, surface migrate CTA for device-only intents.
4. Lighthouse: cluster guide pillars + string-tension calculator + authenticity checker.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 Sprint 4 + competitive audit | ✅ |
| 2 | Results deep links use same param shape as quiz → results | ✅ |
| 3 | No PII leaves device except explicit Buttondown POST | ✅ |
| 4 | Migrate flow clears local intent only after successful subscribe | ✅ |
| 5 | Homepage still has no signup wall | ✅ |
| 6 | Lighthouse URLs exist in static `out/` after build | ✅ |
| 7 | `profile-url.test.ts` covers `profileToResultsPath` | ✅ |
| 8 | Static export safe (no new API routes) | ✅ |
| 9 | `npm test && npm run build` | ✅ (CI) |
| 10 | postbuild SEO audit clean | ✅ (CI) |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Shortlist reopen clicks (GA4) | Track `results_reopen` via existing navigation |
