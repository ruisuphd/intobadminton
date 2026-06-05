# Performance and search baselines

Owner-run capture for Core Web Vitals and Google Search Console trends. Agents cannot access GSC; store exports here for regression comparison.

## CrUX (field data)

1. Open [PageSpeed Insights](https://pagespeed.web.dev/) for each URL below.
2. Export or copy LCP, INP, CLS for mobile and desktop.
3. Save as `docs/baselines/crux-YYYY-MM-DD.csv` with columns:
   `url,device,lcp_ms,inp_ms,cls,note`

Priority URLs:

- `https://intobadminton.com/`
- `https://intobadminton.com/quiz/`
- `https://intobadminton.com/best/beginner-rackets/`
- `https://intobadminton.com/review/yonex-arcsaber-7-pro-review/`
- `https://intobadminton.com/compare-guides/yonex-astrox-vs-nanoflare/`

## Google Search Console

1. Search Console → Performance → Export last 28 days.
2. Save as `docs/baselines/gsc-performance-YYYY-MM-DD.csv`.
3. Note total clicks, impressions, and average position in the commit message or `AUTOMATION_RUNLOG.md`.

## CI Lighthouse

Local parity with GitHub Actions:

```bash
npm run build
npx @lhci/cli autorun
```

Config: [`lighthouserc.json`](../../lighthouserc.json).
