# Security policy | السياسة الأمنية

This repository is the **public code mirror used for Cloudflare staging** of Biet Al Reef's public website. The currently live site remains at `bietalreef.ae` on its original deployment.

## Private vulnerability reports

Do not disclose passwords, access tokens, customer data or exploitable findings in public issues. Use GitHub **Private Vulnerability Reporting** if enabled; otherwise write privately to **weyaakai@bietalreef.ae** with subject `Security: Biet Al Reef Platform`.

To help reproduce: affected public URL or component, steps with synthetic data, severity and mitigation suggestion. Stop immediately if a test unexpectedly accesses real customer data.

## Mandatory controls

- Cloudflare preview `*.workers.dev` is deliberately **noindex** and read-only for mutating requests.
- Supabase **anon** credentials only are available to the preview. No service role, billing or OpenAI credentials belong in this public repository or its preview.
- All production changes need review, build/quality checks, staged browser/API QA and a reversible release.
- Preserve Supabase RLS / existing RPC contracts and channel publication approval. Never establish a parallel identity database.
- Avoid real user actions, load tests, scanning other customers, denial of service or unauthorized production changes.
- Report any discovered secret exposure privately for prompt revocation and history review; deleting the latest version is insufficient.
- Any claimed security clearance, branch protection or scanner state must be backed by current evidence.

**Security tests / full Git-history scan and final production readiness have not yet been completed.** This document is a policy, not a security certification.
