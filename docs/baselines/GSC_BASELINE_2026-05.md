# GSC + CrUX Baseline — May 2026

**Property:** `https://intobadminton.com/` (Search Console)  
**Capture due:** Before Sprint 1 SEO ship (see [`IMPROVEMENT_PLAN_2026Q2.md`](../IMPROVEMENT_PLAN_2026Q2.md) §7)  
**Status:** Template only — **must be filled from live GSC export.** Automated capture is not possible without property-owner session.

---

## Instructions

1. Sign in to [Google Search Console](https://search.google.com/search-console) with the `intobadminton.com` property.
2. Export Performance and Indexing CSVs per [`baselines/README.md`](README.md).
3. Paste summary tables below; commit CSVs alongside this file as `2026-05-24-gsc-queries-28d.csv`, etc.
4. Record CrUX origin metrics from [PageSpeed Insights](https://pagespeed.web.dev/) (mobile, origin) or the public CrUX dashboard.
5. Run `site:intobadminton.com` and note indexed URL count.

Do **not** overwrite this file after fill — append a new dated baseline for the next phase.

---

## 1. Search performance — last 28 days

**Export file:** `2026-05-__-gsc-queries-28d.csv`  
**Date range:** _YYYY-MM-DD → YYYY-MM-DD_

| Metric | Value |
|--------|-------|
| Total impressions | _fill_ |
| Total clicks | _fill_ |
| Average CTR | _fill_ % |
| Average position | _fill_ |

### Top queries (by impressions)

| Query | Impressions | Clicks | CTR | Avg position |
|-------|-------------|--------|-----|--------------|
| _query 1_ | | | | |
| _query 2_ | | | | |
| _query 3_ | | | | |
| _query 4_ | | | | |
| _query 5_ | | | | |
| _query 6_ | | | | |
| _query 7_ | | | | |
| _query 8_ | | | | |
| _query 9_ | | | | |
| _query 10_ | | | | |

### Top pages (by clicks)

| Page URL | Impressions | Clicks | CTR | Avg position |
|----------|-------------|--------|-----|--------------|
| _/blog/… or /review/…_ | | | | |
| _page 2_ | | | | |
| _page 3_ | | | | |
| _page 4_ | | | | |
| _page 5_ | | | | |

---

## 2. Search performance — last 90 days (optional trend)

**Export file:** `2026-05-__-gsc-queries-90d.csv`

| Metric | 28d | 90d |
|--------|-----|-----|
| Impressions | | |
| Clicks | | |
| CTR | | |
| Avg position | | |

---

## 3. Indexing snapshot

**Export file:** `2026-05-__-gsc-indexing.csv`

| Status | Count |
|--------|-------|
| Indexed | _fill_ |
| Not indexed (reason breakdown) | _fill_ |
| Crawled — currently not indexed | _fill_ |
| Discovered — currently not indexed | _fill_ |

**Enhancements** (paste counts or link `2026-05-__-gsc-enhancements.md`):

| Enhancement | Valid | Warning | Error |
|-------------|-------|---------|-------|
| Article / BlogPosting | | | |
| FAQ | | | |
| Breadcrumb | | | |
| Product (if listed) | | | |
| Sitelinks search box | | | |

---

## 4. Indexed URL sanity check

**Query:** `site:intobadminton.com`  
**Date checked:** _YYYY-MM-DD_  
**"About N results":** _fill_

**Expected ballpark:** ~134 blog URLs + guides + review pages + brand hubs (exclude 75 intentional noindex URLs per [`NOINDEX_INVENTORY.md`](../NOINDEX_INVENTORY.md)).

---

## 5. Core Web Vitals (CrUX origin — mobile, 75th percentile)

**Source:** PageSpeed Insights → Origin summary, or CrUX API  
**Raw JSON:** `2026-05-__-crux-origin.json`

| Metric | Value | Good threshold | Pass? |
|--------|-------|----------------|-------|
| LCP | _fill_ s | ≤ 2.5 s | |
| INP | _fill_ ms | ≤ 200 ms | |
| CLS | _fill_ | ≤ 0.10 | |

**Notes:** Static export on GitHub Pages; LCP candidates likely logo/OG on homepage and hero on `/quiz/`. Record lab Lighthouse scores separately if CrUX sample is thin (low traffic).

---

## 6. Phase comparison placeholders

Use after P1/P3 ships. Delta vs this baseline:

| Metric | Baseline (this file) | After phase | Δ |
|--------|----------------------|-------------|---|
| Weekly GSC clicks | | | |
| Avg position (top-10 queries) | | | |
| Indexed URLs (`site:`) | | | |
| Mobile LCP p75 | | | |

**Regression rule:** If impressions or indexed count drops >10% without an explained noindex change, hold the next phase until investigated.
