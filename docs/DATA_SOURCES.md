# Data sources policy

How IntoBadminton gathers product facts and review context — curated aggregation, not scraping third-party review text.

## Tiers

1. **Tier A — Authoritative** — Manufacturer pages, PDFs, and published spec sheets. Structured fields live in the catalog with outbound links where possible.
2. **Tier B — API / licensed** — Retailer or affiliate feeds, official APIs (YouTube, Reddit, etc.) only where terms allow.
3. **Tier C — Editorial** — Human-written notes and paraphrases with attribution. Drafting tools may help after sources are selected; every published line is reviewed against Tier A facts.
4. **Tier D — RAG (future)** — Retrieval only over a corpus we own or have rights to use.

The operational source-rights registry is documented in [SOURCE_RIGHTS.md](./SOURCE_RIGHTS.md) and seeded in `src/data/source-rights.json`.

## Multi-language

When non-English text is ingested, we store the original link, language tag, and a translation for search/ranking. Display prioritizes **links to the original** source.

## Update cadence

- Catalog rows include implicit “as of” when `src/data/products.json` (or a future DB) is edited. Target: review top movers quarterly; immediate edits on user-reported spec errors.
- Ingestion jobs (see `/pipelines`) are **staged** for post-MVP; MVP ships static JSON.

## Editorial text and drafts

Summaries and review drafts are checked against **Tier A** facts before publish. Brand specs for weight, flex, and balance always come from manufacturer pages or labelled sources — never from unverified paraphrase alone.
