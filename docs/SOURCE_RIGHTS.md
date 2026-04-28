# Source rights registry

The production recommendation engine must not depend on unapproved scraping. The registry lives in [src/data/source-rights.json](../src/data/source-rights.json) and should migrate to Firestore collection `sources`.

## Status meanings

| Status | Meaning |
|--------|---------|
| `approved` | We control the data or the source permits this specific use. |
| `permission_required` | High-value source, but production use requires terms review, API access, written permission, or a compliant provider. |
| `manual_citation_only` | Use as discovery and link/citation only; no bulk copying or republishing. |
| `blocked` | Do not use. |
| `unknown` | Treat as blocked until reviewed. |

## Platform posture

- **Reddit:** permission-gated. Do not scrape or monetize derived Reddit data without written approval/compliant provider.
- **BadmintonCN:** high-value Chinese source; use only for source discovery/manual summaries until terms or partnership is clear.
- **BadmintonCentral:** discovery/citation only unless permission is obtained.
- **YouTube:** use official API metadata and links; transcripts require rights review.
- **First-party IntoBadminton reviews:** highest-priority long-term dataset because consent is captured directly.

## Storage rules

- Store source URL, language, product match, timestamps, hashes, and derived themes.
- Do not store full third-party user posts unless explicitly permitted.
- Show attribution and confidence; do not imply endorsement by a platform or author.
- Any AI-generated summary must be human-reviewed before publication.
