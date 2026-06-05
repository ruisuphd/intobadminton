# Performance and search baselines

Owner-run capture for Core Web Vitals and Google Search Console trends. Agents cannot access GSC; store exports here for regression comparison.

## CrUX (field data)

1. Open [PageSpeed Insights](https://pagespeed.web.dev/) for each URL below.
2. Export or copy LCP, INP, CLS for mobile and desktop.
3. Save as `docs/baselines/crux-YYYY-MM-DD.csv` with columns:
   `url,device,lcp_ms,inp_ms,cls,note`

   Copy [`crux-template.csv`](crux-template.csv) as a starting point — it lists the
   priority URLs with empty metric cells ready to fill from PageSpeed Insights.

Priority URLs:

- `https://intobadminton.com/`
- `https://intobadminton.com/quiz/`
- `https://intobadminton.com/best/beginner-rackets/`
- `https://intobadminton.com/review/yonex-arcsaber-7-pro-review/`
- `https://intobadminton.com/compare-guides/yonex-astrox-vs-nanoflare/`

## Google Search Console

1. Search Console → Performance → Export last 28 days.
2. Save as `docs/baselines/gsc-performance-YYYY-MM-DD.csv` (or copy [`gsc-template.csv`](gsc-template.csv) for column layout).
3. Note total clicks, impressions, and average position in the commit message or `AUTOMATION_RUNLOG.md`.

Validate CrUX CSV structure and thresholds (when metrics are filled):

```bash
npm run lint:crux-baseline
```

## CI Lighthouse

Local parity with GitHub Actions:

```bash
npm run build
npx -y serve@latest out -l 4173 &
sleep 2
npm run lint:lighthouse
npm run lint:lighthouse:baseline
```

Configs:

- Full CI URL set (78 routes): [`lighthouserc.json`](../../lighthouserc.json)
- CrUX-priority baseline subset (11 routes): [`lighthouserc-baseline.json`](../../lighthouserc-baseline.json)

Refresh the committed baseline after intentional perf work:

```bash
npm run build
npx -y serve@latest out -l 4173 &
sleep 2
npm run capture:lighthouse:baseline
```

Committed scores: [`lighthouse-scores.json`](lighthouse-scores.json).
