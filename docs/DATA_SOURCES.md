# Data sources policy

Aligned with the product plan: **curated aggregation**, not indiscriminate scraping of third-party sites.

## Tiers

1. **Tier A — Authoritative** — Manufacturer pages, PDFs, and published spec sheets. We store structured fields in our catalog and keep outbound links where possible.
2. **Tier B — API / licensed** — Retailer or affiliate feeds, official APIs (YouTube, Reddit, etc.) only where terms allow.
3. **Tier C — Editorial** — Human-written notes and excerpts with attribution; optional LLM assist **after** source selection and review.
4. **Tier D — RAG (future)** — Retrieval only over a corpus we own or have rights to use.

The operational source-rights registry is documented in [SOURCE_RIGHTS.md](./SOURCE_RIGHTS.md) and seeded in `src/data/source-rights.json`.

## Multi-language

When we ingest non-English text, we store the original link, language tag, and a machine translation for search/ranking. Display prioritizes **links to the original** source.

## Update cadence

- Catalog rows include implicit “as of” when we edit `src/data/products.json` or a future DB. Target: review top movers quarterly; immediate edits on user-reported spec errors.
- Ingestion jobs (see `/pipelines`) are **staged** for post-MVP; MVP ships static JSON.

## AI-assisted text

Any generated summary is reviewed for factual alignment with **Tier A** facts before publish. We do not present LLM text as a substitute for brand specs on weight, flex, and balance.
