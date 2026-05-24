# AdSense Readiness Review — May 2026

**Site:** intobadminton.com (IntoBadminton / Intonation Labs Pte. Ltd.)  
**Review date:** 2026-05-24  
**Verdict:** Scaffolding ready; **do not apply** until visual maturity + CMP blockers close.

---

## Executive summary

IntoBadminton exceeds hard AdSense thresholds: HTTPS, mobile layout, trust pages (privacy, terms, about, methodology), 134 original English articles, and a visible AdSense loader for verification crawlers. Consent Mode v2 defaults deny ad storage until opt-in. The primary rejection risk is **Low Value Content** — thin visual proof of first-hand experience — not page count or technical setup.

---

## Consent Mode v2 status

| Item | Status | Notes |
|------|--------|-------|
| Default denied: `ad_storage`, `ad_user_data`, `ad_personalization` | ✅ Done | `src/lib/consent.ts` |
| Default denied: `analytics_storage` | ✅ Done | GA4 loads only after consent |
| Consent update on user choice | ✅ Done | `ConsentContext.tsx` → `gtag('consent','update',…)` |
| Reject / accept equally prominent | ✅ Done | No pre-ticked non-essential |
| Global Privacy Control → Do Not Sell | ✅ Done | Documented in compliance |
| `<AdSlot/>` gated on `canRenderAdSlot()` | ✅ Done | Client + slot + consent + mode |
| AdSense loader visible to crawler | ✅ Done | Literal `<script>` in `AdSenseScript.tsx` |
| `NEXT_PUBLIC_ADSENSE_MODE=cmp_tcf` in production | ⚠️ Open | Required for EEA/UK/CH personalized ads |
| Google-certified CMP / IAB TCF live | ❌ Blocker | Funding Choices wired; certification not complete |
| CSP validated with live AdSense/GA4 | ⚠️ Open | Report-only first per [`SECURITY_PRIVACY_AUDIT.md`](SECURITY_PRIVACY_AUDIT.md) |

**Operational default:** Keep `NEXT_PUBLIC_ADSENSE_MODE=disabled` until CMP is certified. Loader presence satisfies verification crawl; live ad units should not render during first application review.

---

## Content depth signals

| Signal | Status | Risk |
|--------|--------|------|
| Article count (134 blog URLs) | ✅ Strong | Well above 15–20 minimum |
| Average section depth (Option B JSON) | ✅ Adequate | Import gate requires title, dek ≥50, verdict, sections |
| First-person voice (post-migration) | ✅ Improved | 20-pass voice audit; top-10 traffic sweep still open |
| Original photography on commercial pages | ❌ Weak | Brand thumbnails only; no on-court product shots |
| Methodology / "what we tested" boxes | ⚠️ Partial | Legacy articles covered; not universal on JSON pipeline |
| Video / VideoObject schema | ❌ Not started | Deferred per Q2 plan |
| Duplicate / thin programmatic pages | ✅ Low risk | No templated affiliate roundups shipped |
| Forum copy in live HTML | ✅ Clean | URLs, CJK, channel names stripped at import |
| Word-count ad gate (<600 words) | ✅ Done | No in-article ad on thin posts |

---

## Thin-page risks

| URL pattern | Risk | Mitigation |
|-------------|------|------------|
| `/quiz/`, `/results/`, `/compare/` | Utility / noindex | Already noindex; zero ad slots on quiz steps |
| `/review/submit/` | Form only | noindex |
| Short string/shuttle reviews | Medium | Ensure ≥600 words before ad slots; expand deferred sources |
| Brand hub pages | Low | Substantive copy + internal links |
| Duplicate blog pairs (same product) | Low | Disambiguation intros + cross-links; both indexed by design |

Run before apply: `npm run build` → confirm postbuild SEO audit passes; spot-check 10 random `/blog/` pages for word count and first-person moments.

---

## Visual maturity checklist

Required before application (from [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md) §4.1, §2.1):

- [ ] At least one original product photo per top-10 commercial URL (`/best/*`, `/review/*`, key `/blog/*`)
- [ ] Logo + OG image compressed (<100 KB targets)
- [ ] Comparison tables on `/best/*` (reduces "text-only affiliate" perception)
- [ ] Fit-score badge visible on result surfaces
- [ ] No interstitial modals, auto-play audio, or above-fold ad placeholders during review
- [ ] In-article affiliate disclosure on pages with outbound commercial links (footer alone insufficient)
- [ ] First-person evidence moments on top-10 traffic articles (3–5 per article)

---

## Technical checklist

| Item | Status |
|------|--------|
| `public/ads.txt` with publisher line | ✅ `google.com, pub-9641207581771694, DIRECT, f08c47fec0942fa0` |
| Privacy policy mentions AdSense + GA4 | ✅ `/privacy/` |
| Single ad network (AdSense + GA4 + Funding Choices only) | ✅ |
| No other networks (Mediavine, Ezoic, etc.) | ✅ |
| WHOIS / publisher identity visible | ⚠️ Confirm with counsel |
| Company registration on About/Contact | ⚠️ Add UEN/address if counsel requires |

---

## Recommended re-application steps

Apply **once** after blockers close. A rejection raises the bar for re-review.

### Phase A — Pre-application (content + compliance)

1. Complete visual maturity checklist above.
2. Finish Google-certified CMP + set `NEXT_PUBLIC_ADSENSE_MODE=cmp_tcf` for EEA/UK/CH traffic.
3. Run first-person sweep on top 10 GSC pages (after baseline captured).
4. Add in-article affiliate disclosure component where commercial links exist.
5. Capture GSC baseline → [`baselines/GSC_BASELINE_2026-05.md`](baselines/GSC_BASELINE_2026-05.md).

### Phase B — Application (single submission)

1. Deploy with AdSense mode **disabled** (loader only, no visible ad units).
2. Submit site in AdSense UI; use `intobadminton.com` as primary domain.
3. Verify Search Console property linked to same Google account.
4. Do **not** enable Auto ads; plan manual slot placement post-approval.

### Phase C — Post-approval

1. Enable manual slots per page type (guide, blog, best — not quiz steps).
2. Segment channels: `blog-article`, `guide`, `best`, `compare`, `home`.
3. Monitor Core Web Vitals after first slot ship; lazy-load below-fold only.
4. Re-run privacy cookie scan after production ad render.

---

## References

- [`COMPLIANCE.md`](COMPLIANCE.md) — consent baseline and launch blockers
- [`SECURITY_PRIVACY_AUDIT.md`](SECURITY_PRIVACY_AUDIT.md) — CMP and CSP notes
- [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md) §4 — full AdSense roadmap
- [`SEO_ROI_REVIEW_STRATEGY.md`](SEO_ROI_REVIEW_STRATEGY.md) — slot placement by intent
