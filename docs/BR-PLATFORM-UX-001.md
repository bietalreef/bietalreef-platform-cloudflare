# BR-PLATFORM-UX-001 — implementation checkpoint

Baseline: `bbb329dbe196dd34ca05333150330741f7e87186` (`master`).
Branch: `br-platform-ux-001`. No production/DNS/other repository changes.

## Reuse and changes
- Existing shared Navbar: fixed right-hand menu trigger followed by original logo/name, language control at far left in both locales.
- Drawer stays right with locale-specific text direction; existing primary order retained.
- Added independent section expansion using existing UAE_EMIRATES and SERVICE_CATEGORIES, rendered as HTML links even while collapsed.
- Added modal semantics, Escape, focus trap/restore, scroll lock and navigation/popstate closure.
- Extracted existing locale path helper without changing routes; tests cover query/hash round trips, category aliases and city service routes.
- Existing shared HomePage and directory hero: business/professional labels, customer-oriented gateway description, stable gateway order.
- Existing SmartEntityCard: neutral business/professional fallback; no invented verification or presence added.
- Dependency install was rejected by environment minimum-release-age policy for existing dotenvx 2.36.0 and qs 6.16.1. Re-resolved with older overrides (2.35.0 / 6.15.0), without relaxing policy. Lockfile refresh also resolves compatible patch/minor versions in existing ranges; requires review.

## Validation
- Site structure audit: passes, 22 bilingual pairs.
- Existing local service/growth tests + 3 locale navigation cases: 24/24 pass.
- Next.js production compilation: passes. Static generation runs without public Supabase configuration locally, so database-backed coverage is NOT accepted on that build.
- Existing staging homepage inspected in browser before changes; old left drawer/header confirmed.

## Not completed / acceptance blockers
- Full browser QA for new code (mobile/tablet/desktop), focus/back/outside-click and visual parity.
- Live data and all submenu destination verification; existing presentation taxonomy must be checked against current database taxonomy.
- Six business-entity groups require mapping to existing legal identity/activity data, not a parallel taxonomy.
- Existing platform cards expose profile/WhatsApp, not documented Flutter chat/follow deep links. Do not invent routes; chat/follow/RFQ end-to-end is pending existing Flutter contract inspection.
- Full homepage copy review, profile/service/offer card requirements and site-wide naming migration remain incomplete.
- No staging deployment or deployment ID for these changes yet. No after screenshots yet.

Do not treat this checkpoint, compilation, or tests as full task completion.

Build final result: failed with ENOTEMPTY on .next/export/en/uae/sharjah after successful compilation and generation. This is not a successful full build. Staging deploy is withheld.
