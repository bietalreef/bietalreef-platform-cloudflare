# Al Ain hub — 20 October 2026

The review now has one city discovery page and an additive sector registry in data/alAinHub.js. Public wording uses companies, shops and suppliers. Eight initial sectors have stable routes, Arabic/English descriptions, taxonomy aliases and applicable business-type facets. Add a sector record (unique slug, translations, image, taxonomy, aliases and types) to extend navigation, the city ItemList and generic category routing without editing the city template. The established detailed cleaning pages remain specialized.

- lib/alAinHubModel.js validates the city/sector and eligible public businesses. It never promotes unpublished, unverified, inactive-subscription-gated or uncovered activities. Metadata is server rendered; preview/pilot noindex is retained.
- Hourly cleaning has its own route and editorial scope/FAQ/hours flow. A cleaning-company membership alone cannot include a deep-cleaning business here: a published hourly service relation must match the configured taxonomy or hourly service aliases. No specific business is asserted to offer it.
- The existing public provider loader now retains all taxonomy-linked service categories and category memberships instead of dropping everything outside cleaning. It uses the same read-only relations, queries and credentials. No database/schema/publication changes were made. Actual public data remains absent in the isolated preview; do not claim a live populated catalog.
- City categories are search/filter controls for the registry, not claims about a business's legal type. City coverage is confirmed separately. Service and district are passed to the quotation form; hourly preferences include a validated hours value.
- Provider cards support up to three side-by-side comparisons of published service names and approved districts. Unknown price/inclusions are explicitly confirmed in quotations. No invented reviews, availability, discounts or prices.
- Offers section is currently an honest empty state, not a completed offers backend. Connect reviewed offer records with validity checks as the commercial-data phase. No promise of discount is shown.
- Cleaning-company discovery was moved above service-editorial cards, with an explicit link to hourly cleaning.
- Original GitHub repository and Cloudflare deployment were not touched. Sites uses its independent Vinext adapter; original Next.js 15/OpenNext compatibility remains a final-transfer check.

## Verification
- 18 bilingual city/sector model cases passed; unique slugs, search/type filters, invalid routes, publication gates and strict hourly vs deep-cleaning separation passed with isolated fixtures (not deployed).
- Browser: 390px hub showed eight sector cards, all main images loaded, no page horizontal overflow. Shops filter returned two relevant categories; searching Arabic عاملة returned hourly cleaning only.
- Browser: 360px hourly page had no horizontal page overflow. Four hours + Al Hili were preserved in the quotation URL; the actual form prefilled hourly cleaning and the hours description. No request was submitted.
- Browser: 768px hub had three columns, 1024px had four, with no page overflow. English hourly and Arabic building-material routes rendered the expected headings.
