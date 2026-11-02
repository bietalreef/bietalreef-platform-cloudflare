# Editorial review corpus — 2 Nov 2026

This PR deliberately uses the **existing** Next.js 15 Pages Router and directory taxonomy. It does not create separate landing sites or database tables.

- `emirates/`: 8 UAE directory / emirate pages in Arabic and English (16 authored documents).
- `areas/`: Al Ain and Abu Dhabi City district editorial drafts (50 documents); disputed Al Ain-as-Abu-Dhabi-city and Al Yahar/Al Amerah names remain REVIEW-ONLY.
- `gsc/`: 44 independently documented URL observations from the October Search Console screenshots. These are **not** indexing approvals; 9 additional URLs need export.
- `data/uaeExpertEditorial.json`: normalized editorial blocks for the eight existing UAE/emirate pages; rendered via a compact accessible disclosure UI.
- `components/DirectoryLandingPage.js`: fixes public directory noindex, English direction, and hash-dependent primary search buttons. Ordinary in-page anchors outside these primary actions remain legitimate.

Do not merge/deploy before visual, legal-source, GSC and mobile QA. Confirm English factual equivalence, all existing internal paths, live status of government sources and provider coverage. Do not claim indexation or official government integration.
