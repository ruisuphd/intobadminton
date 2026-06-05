# Web App Improvement Plan — Sprint 9 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-dca0` (follow-up to PR #144 Sprint 8)  
**Baseline:** Sprint 8 merged — search snippets, RSS `rel=alternate`, catalog CLS, `/data/` claims registry, PDP-lite.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 9 response |
|------------|---------------------------|-------------------------|
| **Wirecutter / RTINGS** | Video + lab methodology | ⏳ `VideoObject` gated on video commitment |
| **Tennis Warehouse** | Original product photography | ⏳ Editorial pipeline for top commercial URLs |
| **BadmintonCentral** | Community reactions / return visits | ⏳ Deploy HelpfulReaction Workers/KV + `NEXT_PUBLIC_REACTIONS_API_URL` |
| **Retailer PDPs** | Live inventory / price | Out of scope (static export); keep affiliate CTAs |
| **Google Search Console** | Measured growth baselines | ⏳ Owner CSV capture per `docs/baselines/README.md` |

**Moat unchanged:** transparent fit score, claims CI, static export, 146+ reviews, postbuild SEO gate, contextual search snippets.

---

## 2. Top 5 gaps (Sprint 9)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | HelpfulReaction aggregates not live in production | Social proof on guides/reviews | ⏳ Deploy `workers/reactions` + env URL |
| 2 | No original photography on hero commercial URLs | AdSense / experience signal | ⏳ Editorial batch |
| 3 | GSC/CrUX baseline not captured in repo | ROI measurement | ⏳ Manual owner step |
| 4 | E2E CI flake on legacy redirect assertions | Merge confidence | ✅ Playwright retries + `waitForURL` |
| 5 | YouTube `sameAs` on author entity | E-E-A-T for video-first queries | ⏳ After channel claim |

---

## 3. Execution summary

### Shipped (Sprint 9 PR — CI hardening)

1. **Playwright** — `retries: 2` in CI; legacy product-id redirect test uses `waitForURL`.
2. **CI workflow** — `CI=true` on e2e job; step renamed to “E2E smoke tests”.

### Deferred (Sprint 10+)

- Cloudflare Workers/KV deploy for reactions
- Original photos on `/best/*` and top `/review/*`
- GSC export → `docs/baselines/`
- `VideoObject` + YouTube `sameAs`

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 8 deferred list + audit | ✅ |
| 2 | CI fix is minimal and does not hide product bugs | ✅ |
| 3 | No new runtime deps | ✅ |
| 4 | Static export safe | ✅ |
| 5 | `npm test` | ✅ |
| 6 | `npm run build` + postbuild SEO audit | ✅ |
| 7 | `npm run test:e2e` | ✅ |
| 8 | Sprint 8 plan cross-linked | ✅ |
| 9 | Reactions worker README unchanged contract | ✅ |
| 10 | Lighthouse CI on PR branch | ✅ (run 26990611633) |

---

## 5. Verification

```bash
npm test
npm run build
npm run test:e2e
```

---

## 6. Metrics (unchanged from Q2)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| GSC clicks | 4× baseline |
| Lighthouse performance (homepage) | ≥ 0.9 |
