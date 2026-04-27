# Data inventory

| Item | Storage/vendor | Purpose | Retention | User control |
|------|----------------|---------|-----------|--------------|
| Consent preferences | `localStorage:intobadminton.consent.v1` | Remember cookie/privacy choices | Until browser storage cleared or preferences changed | Cookie settings / privacy choices |
| Theme | `localStorage:intobadminton.theme` | Light/dark/system preference | Until changed | Theme button |
| Player profile | `localStorage:intobadminton.profile.v1` | Run finder locally | Until browser storage cleared | Future data controls |
| Shortlist history | `localStorage:intobadminton.history.v1` | Recent recommendations | Up to app limit | Browser storage clear; future controls |
| Compare IDs | `localStorage:intobadminton.compare.v1` | Compare selected products | Until cleared | Compare page clear |
| Review drafts | `localStorage:intobadminton.firstPartyReviews.v1` | First-party review draft and future moderation submission | Until deleted/exported | Review page export/delete |
| GA4 | Google Analytics, if consented/configured | Usage and Web Vitals | Google-controlled | Cookie settings |
| AdSense | Google AdSense, if consented/configured | Ad serving and measurement | Google-controlled | Cookie settings / Do Not Sell or Share |

Before production, replace placeholders with the company’s final vendor list, DPO contact, retention periods, and subprocessor links.
