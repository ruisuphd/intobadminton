# SEO baselines

Snapshots of search-performance state captured before structural site changes.
Used to measure the impact of later phases. All files in this directory are
**git-tracked, append-only**: never rewrite an existing baseline file; create a
new dated one and reference both.

## What to capture

Each baseline is two files: a Search Console export and a Core Web Vitals snapshot.

### 1. Google Search Console (GSC)

From https://search.google.com/search-console, with `intobadminton.com` selected:

- **Performance → Search results**
  - Date range: last 28 days
  - Click "Export" → CSV
  - Save as `YYYY-MM-DD-gsc-queries-28d.csv`
- **Performance → Search results**
  - Date range: last 90 days
  - Export → CSV
  - Save as `YYYY-MM-DD-gsc-queries-90d.csv`
- **Indexing → Pages**
  - Click "Export" → CSV
  - Save as `YYYY-MM-DD-gsc-indexing.csv`
- **Note structured-data status**
  - Indexing → Enhancements (each: Sitelinks, FAQ, Article, Product if listed)
  - Screenshot or paste valid/warning/error counts into `YYYY-MM-DD-gsc-enhancements.md`

### 2. Core Web Vitals from CrUX

From https://lookerstudio.google.com/u/0/reporting/55bc8fad-44c2-4280-aa0b-5f3f0cd3d6be
(public CrUX dashboard) or the PageSpeed Insights API for the origin
`https://intobadminton.com`:

- Origin-level mobile LCP, INP, CLS (75th percentile)
- Save raw JSON to `YYYY-MM-DD-crux-origin.json`

### 3. Indexed-URL count

A quick sanity check that complements the GSC export. Open Google and run:

```
site:intobadminton.com
```

Note the "About N results" number and save to `YYYY-MM-DD-indexed-count.md`.
Re-check after each phase ships and compare the trend.

## How baselines feed the plan

- Phase verification (after P4): compute deltas vs the earliest baseline in this folder.
  Look for: impressions up, average position improved (lower number = higher rank),
  indexed-URL count grew by the number of new pages we shipped.
- If a phase **regresses** a metric, the regression must be investigated before the
  next phase ships.

## Why baselines must be captured manually

GSC requires the property owner's authenticated session — there is no read-only
API token we can ship. Capture once per phase boundary (P0, P1, P3, P5) and
commit the CSVs alongside the code changes that close the phase.
