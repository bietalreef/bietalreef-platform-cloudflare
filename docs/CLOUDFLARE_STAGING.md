# Biet Al Reef Platform — Cloudflare staging

This repository is an independent migration copy of `bietalreef/bietalreef-landing-new`.

- Production `https://bietalreef.ae` remains on Vercel until separate cutover approval.
- Target: **`https://bietalreef-platform-staging.bietalreef.workers.dev`**.
- Cloudflare Worker name: `bietalreef-platform-staging`.
- **No custom domain attached**, no DNS migration, no changes to Google Workspace MX.
- Preserve Pages Router, old indexed URL paths, Supabase/RLS/RPC contracts, Arabic/English SEO, Al Ain pilot pages and production canonical.
- Test stages **must not submit Search Console indexing requests**. The `workers.dev` hostname is marked `X-Robots-Tag: noindex` by the migration middleware. No staging sitemap submission.
- GitHub-connected Worker Builds normally watch `master` but have a hold filter `__cf_migration_release_marker__` pending controlled testing. Do not remove the filter until verified.
- Builds use `pnpm run build:cloudflare`; deployment uses `pnpm exec wrangler deploy --config wrangler.jsonc`. Never use `next export` for this SSR/ISR site.

## Early build-only validation

Check dependency/lockfile synchronization (`pnpm-lock.yaml` must be regenerated and committed after the dependency upgrade), Next.js 15 Pages Router regression, backend API file upload compatibility, static & dynamic page rendering, ISR and cache consistency, and Worker compressed bundle limits.

No claims of successful full-platform deployment are made until the Worker URL returns representative live Next HTML and the deployed version matches a reviewed Git commit.

## Indexing/release order

1. Inventory already indexed production pages using actual Search Console coverage and per-URL baselines.
2. Improve and smoke-test existing indexed sections first on staging.
3. QA prod routes/canonical/hreflang/structured data/links before release; only request reindexing for changed eligible *production* URLs after acceptance.
4. Diagnose excluded but indexable pages second. Add entirely new URLs third.

See issues #1 and #2 for current staging release gates.
