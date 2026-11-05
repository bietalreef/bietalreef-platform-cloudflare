# Abu Dhabi Emirate — area-directory handoff (6 Nov 2026)

## Authoritative implementation scope
Repository: `bietalreef/bietalreef-platform-cloudflare`, existing Draft PR #37. This is additive to the current Next.js 15 Pages Router project; do not create parallel repositories or deploy changes without owner review.

- Top-level emirate remains `/uae/abu-dhabi` and `/en/uae/abu-dhabi`.
- The only city-entry card on this top-level screen is **Al Ain**; city-of-Abu-Dhabi and Al Dhafra records are represented as direct area links. Existing paths continue.
- The 11 regional entries are `baniyas`, `khalifa-city`, `mohammed-bin-zayed-city`, `shamkha`, `al-wathba`, `al-rahba`, `musaffah`, `al-reem-island`, `al-raha`, `abu-dhabi-city`, `al-dhafra`.
- Existing Al Ain routes and taxonomy remain unchanged.

## Files and their single responsibilities
- `data/abuDhabiAreaEditorial.json` — original Arabic and English area introductions, specific local considerations and FAQs.
- `data/abuDhabiAreaSectorContexts.json` — 88 area-by-specialty local passages (AR and EN independently authored).
- `components/AbuDhabiAreaGuide.js` — one shared visual implementation for all eleven supported area paths; 8 cards, two actions, native modal, BreadcrumbList and company area.
- `components/AbuDhabiAreaGuide.module.css` — 2 cards per mobile row, 3 per desktop, full-size reading dialog delegated to `DirectoryReadModal`.
- `lib/abuDhabiAreaPublishedCompanies.js` — the approved current publisher + true location coverage logic, via `getUaeDirectoryEntities`; never hardcode providers or infer coverage from office location.
- `pages/uae/[activity]/[emirate].js`, `pages/en/uae/[emirate]/[area].js` — the existing actual SSG area routes; overrides apply only to the above eleven Abu Dhabi slugs.
- `components/DirectoryLandingPage.js` — approved Abu Dhabi geography presentation, not separate new route pages.
- `data/abuDhabiChapterIndex.json` — 8 specialty headings × 17 = 136 across the emirate; **not yet completed articles**.
- `data/baniyasConstructionIndex.json` — 17 original Baniyas contracting headings with explicit status per chapter.
- `data/baniyasConstructionChapters01.json` and `data/baniyasConstructionChapters02.json` — full-length Arabic and English chapter drafts; verify status before using.
- `scripts/abu-dhabi-area-directory.test.cjs` — regression checks called by the existing clean-build QA script.

## What is NOT yet approved or complete
The region template and its 88 contextual passages are **not** the finished 136-article encyclopaedia for each area. Do not infer that from the number of cards. The Baniyas contracting model must have 17 fully reviewed chapters (minimum 500 valuable Arabic words each, separate original English), not merely 17 headings. Publish no incomplete index as a finished resource.

Other areas must receive genuinely local long-form work, and existing specialty pages need deeper content without duplicating each area's modal. Professional/permit claims must be checked with current DMT/ADRA/Binaa sources before publication. Review actual provider coverage, image suitability, phone/tablet/desktop, route HTTP 200, initial HTML, canonical and hreflang, Search Console and performance before requesting approval. A passing GitHub build alone is not a visual QA or a live preview.

## Security, integrity and review
No change to Supabase schema, RLS, subscription roles or taxonomy. No force-push, reset or automatic merge of earlier PRs. Keep PR #37 as draft and production unchanged until the editor and owner accept all content and complete the device and crawler tests. 
