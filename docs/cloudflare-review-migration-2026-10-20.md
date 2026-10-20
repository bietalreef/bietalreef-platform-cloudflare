# Review release to Cloudflare — 2026-10-20

Source: Sites review commit 92c392586c08b9c353cc9bb069e5dd98b22e9c1d.
Target: bietalreef/bietalreef-platform-cloudflare, master; Next 15 Pages Router with OpenNext.
Worker: bietalreef-platform-staging. Main domain DNS is intentionally unchanged.

## Release changes
- Transfer reviewed directory, Abu Dhabi, Al Ain hubs, cleaning content, mobile navigation and app entry pages.
- Pause provider/service/product publication on the platform; remove static demonstration cards and return 404 for individual provider/product pages. Shared Supabase records are not deleted or deactivated.
- Remove Vercel Speed Insights runtime integration. Analytics country uses Cloudflare CF-IPCountry.
- Preserve GA4 G-YXKFW0GEMF, existing Ads tag and Search Console verification. Google tracking loads only on bietalreef.ae and www.bietalreef.ae.
- workers.dev remains read-only, noindex and disallowed in robots.txt. No indexing submission.

## Data and infrastructure observations
- Cloudflare build trigger already connects to this repository, not bietalreef-landing-new.
- Build Supabase URL is https://lqyknkpnjevkqpalkwry.supabase.co.
- Read-only database review found 22 provider profiles, zero with publication_status=published.
- Public Postgres function source search found no bietalreef-landing-new or vercel.app references.
- Supabase organization identifier is Vercel Marketplace-managed. Runtime connection works independently, but administrative/billing transfer is a separate requirement before closing Vercel. Do not uninstall the integration or delete the database.

## Domain cutover gate
Review workers.dev build and route checks first. Later move apex/www to this Cloudflare project, retain Google verification DNS, test canonical/redirect/auth/webhook settings, confirm Analytics Realtime on production, and verify Search Console ownership. Keep indexing paused until the new tree and release are approved. No replacement Google properties are required merely because the host or repository changes.
