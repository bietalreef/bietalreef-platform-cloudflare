# Weyaak Workflow Marketplace - foundation, 2026-11-21

This feature branch contains tested standalone domain primitives. It is NOT deployed and does not change production data or start a paid subscription.

## Purpose
External approved creators build versioned AI workflows; verified provider companies install workflows into their own agent and pay for their own usage. Each creator receives a percentage only of the revenues attributable to their approved workflows. Revenue share is settled after refunds, applicable VAT, payment fees and stated operating costs. The current 40% is an illustration, not a signed contract.

## Execution architecture
- Authenticated provider (Flutter app) -> trusted Weyaak backend authorization
- Resolve company membership and verified state from server-side Supabase
- Check installation, workflow version, published status and paid entitlement
- Signed execution, idempotency key, quotas and per-company concurrency limit
- Licensed n8n runtime adapter, secret vault, redacted execution logs
- Per-tenant usage meter, reconciliation ledger and creator payout approval
- Preserve one personal agent per provider ID: no cross-company access

## Proposed persistence (not migrated)
- workflow_creators: verified identity, contract, payout status
- workflow_templates: creator ID, description, category, approval status
- workflow_versions: immutable definition/checksum and review approvals
- workflow_installations: company ID, version, active subscription
- workflow_executions: company ID, installation, immutable idempotency key, status, metering
- workflow_subscription_charges: external payment ID, settlement/refund/VAT
- workflow_revenue_ledger: exact transaction allocation, creator/platform share
- workflow_payouts: period, approvals, actual transfers
- workflow_audit_events: actor, action, resource and timestamp
- tenant_connections: references to encrypted credential vault (no raw API secrets)

## Security requirements before enabling endpoints
Do not trust request body for companyId, creatorId, roles or paid flags. Verify a server session and company membership; enforce strict tenant RLS. No direct execution of unreviewed arbitrary code. Use server-only token handles, signed callbacks, rate limits, spending limits, auditing, run cancellation and rollback. All outbound messages and payments require explicit authorization. Creator financial ledgers must be immutable and reconciled.

## Official n8n license gate
The n8n license FAQ (updated 2026-10-06) says externally configurable automations need a commercial license, including custom interfaces, API, MCP and AI-created workflows.
- Backend Enterprise: tenants trigger/consume workflows through Weyaak, without seeing n8n editor.
- OEM: customers create/edit in embedded n8n canvas, showing n8n branding.
Verify the exact external creator marketplace licensing model in writing with n8n before public launch.
https://support.n8n.io/article/can-i-use-your-license-for-my-use-case
https://n8n.io/oem/

## Next build milestones
1. Inspect existing Supabase and Flutter RBAC and company ID contracts; design staging migration and RLS tests.
2. Creator approval, workflow publication and tenant installation backend.
3. One workflow pilot using two synthetic companies to prove data isolation, idempotency and exact settlements.
4. Flutter sections: Workflow store, Installed automations, Usage, Creator earnings.
5. Cloudflare deployment using MCP/API only, after testing; never GitHub Actions to publish.

## Local tests
node --test scripts/weyaak-workflow-marketplace.test.cjs
