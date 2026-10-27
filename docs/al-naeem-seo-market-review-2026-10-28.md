# Al Nuaim — SEO/AEO/GEO implementation gate (draft; no production release)

Reviewed 2026-10-28. Branch: work/al-naeem-company-draft-2026-10-27. This document is an evidence-based implementation brief, not confirmation of deployed pages.

## Production architecture verified
- package.json: Next.js 15.5.27, React 18, Pages Router and OpenNext Cloudflare 1.20.11.
- Existing `pages/providers/[slug].js` responds `notFound: true`; existing `pages/providers/[...parts].js` and its English counterpart explicitly gate on `REHAB_SLUG`. **The Al Nuaim draft JSON cannot be published correctly by these existing routes as-is.**
- Existing sitemap generation enumerates Rehab via `getRehabSiteData()`; Al Nuaim cannot be indexed by simply copying files under `data/providerTemplates/`.
- Use the existing DB channel publication, taxonomy, provider-card and directory systems; generalize Pages Router safely **without** replacing existing Rehab paths or constructing a parallel platform. Public pages must render content in initial SSR HTML.
- Public lists should pull approved platform-channel data, not app/market publication statuses.

## Proposed route contract (subject to collision & legacy index review)
- Home: `/providers/al-naeem-cleaning-services`, `/en/providers/al-naeem-cleaning-services`.
- All services: `/providers/al-naeem-cleaning-services/services` and English equivalent.
- Individual service: `/providers/al-naeem-cleaning-services/services/[service-slug]` and English equivalent.
- All offers: `/providers/al-naeem-cleaning-services/offers` and English equivalent.
- Individual offer: `/providers/al-naeem-cleaning-services/offers/[offer-slug]` and English equivalent, ONLY for approved live offers.
- Service areas: `/providers/al-naeem-cleaning-services/service-areas` and English equivalent; per-approved-area pages at `/service-areas/[area-slug]`.
- Company and service cards surface under existing `/providers`, cleaning sector/area directories, and existing cleaning taxonomy routes. Do not create duplicate category or geographic routes.
- Breadcrumbs (directory > cleaning sector > company > section > detail), related services and areas use real `<a href>` links.
- Offer detail pages must not be indexable before approved conditions, eligibility, discount reference pricing, and publication.

## Original content outline (not fabricated business claims)
Four service cards mapped to existing taxonomy:
1. Home & Villa Cleaning: clarify property type, room count, special requirements, whether majlis/courtyard is included in quote; ask for number of floors and access.
2. Water Tank Cleaning & Sanitization: clarify tank material, location, volume, access, downtime; say regulatory permission and certificates are subject to verification; do not claim municipal approval or lab testing without evidence.
3. Steam Carpet & Sofa Cleaning: explain fabric checks, material limitations, seat count, size, stain history and equipment suitability; never promise complete removal of stains or fixed dry times.
4. Curtains, Upholstery & Majlis Deep Cleaning: clarify fabric and attachment type, onsite suitability and number of pieces; align quotation details.
Offer cards: four proposed 10% offers mapped 1:1 to services, DRAFT only until baseline price, terms and duration are approved. Service areas: Dubai, Sharjah, Umm Al Quwain, Ras Al Khaimah (first four within plan); Al Ain requested but deferred at current 4-area quota, not falsely listed as active.
AR/EN titles and summaries must be authored individually, never keyword-stuffed and never mechanically duplicated with city swaps. Description blocks should answer customer questions directly in useful FAQ text.

## Competitor/content research (NOT verified Google rank)
- Haji Ahli (https://hajiahliclean.com/book/water-tank?service=SVC-301): tank volumes and transparent scope/inclusions and exclusions, photo documentation; lesson: quote intake should ask capacity/access and itemize scope.
- The Clean Fox (https://thecleanfox.ae/cleaning-services-dubai/): service index linked to detailed pages and customer-use cases; lesson: intent-oriented service page cards with useful internal links.
- Downtown Technical Services (https://www.downtowntechnical.com/services/sofa-carpet-cleaning/): material-dependent methods and linked specialized services; lesson: honest fabric-specific guidance and service-detail depth.
- Servia (https://servia.ae/sofa-carpet-cleaning-dubai?lang=ar): per-seat pricing and FAQ with caveats; lesson: clarity on pricing factors even if Al Nuaim publishes only quote-by-request.
No SERP position, volume, CPC or conversion rate has been independently measured.

## Acceptance/quality gates before PR merge or advertising
1. Confirm independent legal identity: existing BR-2000030 belongs to Shams Al Bustan. Al Nuaim is distinct; never inherit verification, legal name, owner email change or existing paid entitlements without the proper admin workflow.
2. Check quota resolution: digital-presence 4 service cards, 4 area slots, 4 platform item slots; do not assume four services PLUS four offers can all be published.
3. Media assets must be actual files in versioned `public/images/providers/al-naeem/` (or an approved storage channel); prepare landscape cover/mobile crop, profile logo, 4 service WebP, 4 offer creative variants. Visually realistic generative imagery is illustrative advertising imagery, NOT photos documenting actual Al Nuaim staff/jobs. Include informative AR/EN alt text. Avoid overlaying unverifiable approval badges.
4. Prove `next build` and OpenNext Cloudflare production build, verify generated SSR HTML includes visible service/area headings and anchors. Mobile 320, 375, 390px and desktop tests with no overflow or broken images.
5. Verify distinct title/description/H1, language-appropriate `<html lang>`, canonical and reciprocal hreflang; FAQ only if real and not misleading; valid JSON-LD for confirmed business info, no fake reviews/rating schema.
6. Ensure robots/noindex, sitemap, 404s, redirect and release gates: pending private drafts cannot leak into public directory/sitemaps. Test actual live responses after approved publication. Ads destinations use final live URLs; ensure tel/WhatsApp conversion measurement and attribution.
7. Never claim Google indexing/rank #1 guaranteed. Review Search Console indexed URLs, impressions/CTR, Ads qualified calls and actual lead-to-job conversions.
8. Production publication requires identity and content/offer approval. This branch is draft review only.

Sources: Google Search Central javascript-seo-basics; links-crawlable; Google Ads landing page guidance; named competitor pages above.