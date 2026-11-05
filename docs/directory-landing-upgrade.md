# UAE directory and Abu Dhabi landing — 20 October 2026

Scope: /uae, /en/uae, /uae/abu-dhabi and /en/uae/abu-dhabi. Other emirate and category landing templates were not redesigned in this change. Existing route identities are retained.

A shared DirectoryLandingPage component and data/directoryDiscovery.js registry drive both landing pages. Content focuses on companies, shops and suppliers; no editorial preparation/database readiness messages or invented business counts, licenses, prices, offers or ratings appear in the new copy.

- UAE: seven emirate cards, geographic finder, specialty cards with business-type/search filters, Al Ain spotlight, server-rendered editorial blocks and FAQs, customer support.
- Abu Dhabi: city/region cards for Al Ain, Abu Dhabi City and Al Dhafra, plus nine actual taxonomy area links. Al Ain districts are not treated as peer cities in the Abu Dhabi finder.
- Finder composes existing emirate/city/specialty routes. Al Ain aluminium uses its new combined hub slug. The hourly option explicitly names Al Ain and is removed when another emirate/city is selected; it is never silently advertised as a Dubai or Abu Dhabi City service.
- All important copy and links are rendered in HTML, with expandable text and native FAQs. AR/EN metadata, canonical/hreflang and CollectionPage/ItemList are derived from the current context. Preview/pilot noindex stays in place.
- Add a specialty record to extend both landing-page grids and selectors. Provide a valid existing destination/taxonomy mapping when a specialty requires a custom route. Do not generate new place/service pages by substituting names.
- Abu Dhabi uses its new editorial registry directly instead of awaiting the former directory-card request just to render this landing page. No Supabase schema, records, access controls or API settings changed.
- Assets reuse local repository artwork and are labelled illustrative.

Validation: production preview build passed. Node assertions verified all geographic IDs and sector image files, taxonomy routes, bilingual URL composition, Al Ain route mapping, supplier search, unique slugs and hourly location guards. Browser checked 390px UAE and 360px Abu Dhabi without horizontal page overflow; seven emirates and three city/region cards appeared. Finder navigational link correctly combined Abu Dhabi + Al Ain + cleaning; supplier filter returned three suitable specialties. At 768px the grids used three columns; at 1024px specialties used four. Both English pages and hreflang rendered correctly. Abu Dhabi City route and all eight national specialty destinations rendered the expected headings.

Original GitHub source and Cloudflare deployment are outside this change. The independent preview still uses Vinext; original Next.js 15/OpenNext verification belongs to final transfer.
