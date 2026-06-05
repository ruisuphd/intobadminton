# Web App Improvement Plan — Sprint 37 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-258a`  
**Baseline:** Sprint 36 — PWA ib-v26 full CrUX offline recovery, crux-template parity guard (PR #184).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 37 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Performance regression guard on commercial URLs | ✅ Committed Lighthouse baseline for CrUX URLs + CI compare |
| **RTINGS** | Field-data tracking discipline | ✅ `lighthouserc-baseline.json` mirrors `crux-template.csv` |
| **Wirecutter** | Social proof on long-form guides | ✅ Reactions worker scaffold tests + deploy workflow guard |
| **Running Warehouse** | Lab scores tracked per priority URL | ✅ `lighthouse-scores.json` populated (11 CrUX URLs) |
| **BadmintonCentral** | Author entity proofs (`sameAs`) | ✅ `founderPersonJsonLd` emits `sameAs` when configured |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v26 offline recovery.

---

## 2. Top 5 gaps (Sprint 37)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Lighthouse baseline was a placeholder** | No regression guard on CrUX-priority URLs | ✅ Captured scores + `lighthouse-baseline.test.ts` |
| 2 | **CI did not compare against committed baseline** | Perf regressions could slip past threshold asserts | ✅ `lint:lighthouse:baseline` step after LHCI |
| 3 | **CrUX template ↔ Lighthouse config drift risk** | Field-data URLs could diverge from baseline set | ✅ `lighthouserc-baseline.json` parity unit test |
| 4 | **Reactions worker deploy readiness unverified** | HelpfulReaction KV blocked on owner deploy | ✅ `reactions-worker-scaffold.test.ts` + workflow asserts |
| 5 | **`founderPersonJsonLd` missing `sameAs`** | E-E-A-T author proofs only on `/authors/rui-su/` | ✅ Conditional `sameAs` from `founderSameAs` |

**Deferred (owner / editorial):** deploy reactions worker + set `REACTIONS_API_URL`; fill `crux-template.csv` LCP/INP/CLS from PageSpeed Insights; original `public/products/` photography; uncomment YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| CrUX Lighthouse config | `lighthouserc-baseline.json` |
| Baseline capture + compare reuse | `scripts/lighthouse-baseline.mjs` |
| Committed baseline scores | `docs/baselines/lighthouse-scores.json` |
| Baseline parity tests | `src/lib/lighthouse-baseline.test.ts` |
| Reactions scaffold tests | `src/lib/reactions-worker-scaffold.test.ts` |
| CI regression guard | `.github/workflows/ci.yml` |
| Author `sameAs` on shared Person JSON-LD | `src/lib/structured-data.ts` |
| Master plan | `docs/WEB_APP_IMPROVEMENT_PLAN_2026-06.md` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 36 deferred items + competitive audit | ✅ |
| 2 | Baseline URLs match `crux-template.csv` (+ homepage) | ✅ |
| 3 | Compare reuses LHCI manifest in CI — no duplicate full autorun | ✅ |
| 4 | Capture uses `lighthouserc-baseline.json` (11 URLs, not 78) | ✅ |
| 5 | Static export — no new API routes | ✅ |
| 6 | Unit tests: baseline scores + reactions scaffold + crux config parity | ✅ |
| 7 | `.gitignore` excludes ephemeral LHCI report artifacts | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | `npm run lint:lighthouse:baseline` passes with committed baseline | ✅ |
| 10 | Master plan doc updated with Sprint 37 entry | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint:lighthouse          # full CI URL set
npm run lint:lighthouse:baseline # CrUX regression guard (reuses manifest when present)
npm run capture:lighthouse:baseline  # owner refresh after perf work
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Lighthouse performance (CrUX URLs) | ≥ 0.9 |
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
