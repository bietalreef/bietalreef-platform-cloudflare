# Weyaak Project Workspace / Project Agent / Invitations
Architecture decision — 2026-11-21. DESIGN SPECIFICATION ONLY; not deployed, no Supabase migration, no permission changes.

## Core product contract

- Every customer may create multiple private projects. Each project has a stable project_id, a single accountable owner_user_id, a dedicated Project Agent context, its own audit trail, invited members, scoped work packages, artifacts, budget, approvals, and lifecycle.
- Weyaak personal CEO Agent acts for the subscriber's business identity and its verified entitlements. Project Agent coordinates a single project across multiple companies and their own provider CEO agents, BUT only through individually authorized, project-scoped capabilities.
- Human project owner remains ultimate decision maker for commitments, external publication, spend, provider invitations, and contract award.
- A project is NOT a new legal entity, provider account, Stripe customer, nor a shared global workspace. All data is bound to one project ID and owner. One physical MCP deployment can host many logically isolated project contexts.
- Project participant consent does not expose a provider's private workspace, customer list, API credentials, or other projects.

## Grounded existing Supabase facts (inspected read-only, 2026-11-21)

- public.client_projects: 4 records. Existing columns include id, owner_user_id, title, project_type, status, budget, notes, current_phase, progress_percent, desired_start_date, target_completion_date, work_items, project_mode, property_type, scope_type. Existing SELECT/UPDATE/DELETE RLS is owner_user_id = auth.uid(), and INSERT requires an active client account. Keep this behavior until new member policies are thoroughly tested.
- public.app_accounts, app_workspaces, workspace_assets, app_subscriptions, weyaak_wallets, weyaak_credit_ledger, weyaak_agent_sessions/runs/actions, provider_profiles and platform tender/RFQ tables exist, but are NOT proof that project invitations and per-project agents already function.
- Current workspace_assets SELECT RLS is user-owned or app-admin; do not loosen it to all project participants. Project sharing requires independent grants and scoped delivery mechanisms.
- No production project invitation/membership/capability grant tables were established by this review. Treat ALL tables below as proposed.

## Membership and capability matrix (proposed)

| Role | Project summary | Assigned work | Other providers' confidential files | Invite | Approve design | Approve budget/contract |
| --- | --- | --- | --- | --- | --- | --- |
| owner | all | all | owner-selected visibility | yes | yes | yes |
| project_manager | authorized | assigned and delegated | no by default | only with delegated invite capability | recommend; owner approval when required | no without explicit delegation and amount cap |
| engineer_reviewer | scoped | review/comment | no | no | technical recommendation | no |
| provider_company | scoped | own work packages only | no | no | own submission only | no |
| supplier | scoped procurement requests | own RFQs and deliveries | no | no | no | no |
| project_agent | granted tools only | coordinator within explicit policies | no | no implicit invite authority | prepare recommendations | never autonomous final spending/contract |
| sub_agent | explicit workflow, artifact, and time scope | assigned task only | no | no | no | no |

Role is a default capability set, not unrestricted access. Effective permission is the intersection of verified identity, active membership, resource assignment, explicit grants, unexpired entitlements and owner-approved actions. Fail closed when any input is absent.

## Proposed additive storage (NO migration applied)

1. project_memberships: project_id, user_id, optional provider_profile_id, role, status, joined_at, revoked_at. Unique active project/user membership; company actor is bound to a verified provider principal.
2. project_invitations: project_id, invitation_id, target_email or registered user identity, inviter_user_id, proposed_role, scopes, expires_at, accepted_at, revoked_at, one-time token_hash, attempts. Never expose raw token in queries/logs. Bound to recipient and current identity at acceptance.
3. project_work_packages: project_id, id, discipline, assigned_provider_profile_id, state, scope, due_date. All documents/quotes/tasks refer to work package or an explicit project visibility class.
4. project_artifacts: project_id, id, owner_account_id, work_package_id, visibility, storage reference, metadata. Signed access URLs short-lived, issued only after permission checks; no public provider uploads by default.
5. project_agent_contexts: project_id, agent_key, version, status, summary pointer, policy version, last_run_at. Context is tenant-scoped, not a new trained model.
6. project_agent_installations: project_id, workflow installation/version, sponsor account, entitlement, allowed_tools, allowed_work_packages, limits, approval policy, expiry.
7. project_approvals: project_id, actor, operation, budget cap, state, decision, immutable evidence. Approval cannot be self-issued by the requesting agent.
8. project_audit_events: project_id, actor/user/company/agent, resource/action, request_id, decision, timestamp; append-only and redacted.
9. project_cost_ledger: project_id, sponsor_user_id, verified Weyaak credit operation, vendor cost, optional workflow creator allocation. Never duplicate billing already paid from subscriber BYO accounts.

Use additive migrations and RLS with server-verified identities. Do not modify or replace existing provider subscriptions, live payments, or customer projects. Reuse existing app-account and billing sources for entitlements.

## Invitation state machine

draft -> sent -> accepted OR declined OR expired OR revoked.
- Invite originates from project owner or a manager with explicit grant. Invite must reference project_id, intended recipient/verified company, role and least-privilege scopes.
- Acceptance requires authenticated recipient and a server-verified invitation identity, token hash verification, expiry check, one-time use, and atomic creation of membership. An invitation alone never gives read access.
- A member may be removed; revoked and expired access must be rejected at the NEXT tool call, signed URL issuance and job execution. Existing signed URLs must have very short TTL; rotate/revoke secrets if compromised.
- Project owners can see all invitations and approvals. Other participants see only their own permitted records.
- Project owner can invite multiple providers for distinct work packages, without exposing competitor bids, quotes or team files.

## Trust and execution boundaries

1. Request comes from authenticated client/project UI or trusted backend service. Server resolves user_id and account_id from session, not request body.
2. Server resolves project_id, owner, membership and work-package grants from DB; deny if not active/allowed.
3. Project Agent selects a specialized skill installed for THIS project, not simply one installed in an unrelated company account.
4. Tenant MCP gateway reauthorizes each tool request using signed short-lived context (project_id, acting user/company, allowed scope, workflow version, max spend, expiration, request_id). No permanent generic token given to third-party creators.
5. If a provider CEO Agent is invoked, it must separately verify provider membership + its own account entitlements; a customer invitation does not authorize arbitrary provider-private actions.
6. n8n adapter receives tool capability handles, not raw OAuth tokens; trusted backend resolves encrypted tenant connection scoped to the intended company/project. Job callbacks are signed and checked for idempotency, replay and revocation.
7. Agent proposes design, BOQ, supplier requests, award and spend. The authorized human approves risky transitions before publish, contact external parties, payments, or contract.
8. Usage is reserved and metered via existing Weyaak ledger with refund on failed executions where policy specifies. External BYO tools may charge the owner's external vendor account and must not be double-billed.

## Project lifecycle and interface

Create project -> scope and budget -> capture/site survey -> preliminary design -> verified measurements/BOQ -> invited provider quotations -> human decision -> execution and milestones -> handover -> archive.

In Client "My Projects":
- project overview and owner-only budget
- Project Agent chat with project context and activity log
- Invitations (send, accept, revoke), Members, Scope of Work, Work Packages
- Design / Realsee tours when licensed and connected, BOQ, Quotes, Files, Tasks
- Approvals with clear owner actions, status, invoices, credit usage
- Private media and per-member permissions; AR/EN UI

Do not imply that Realsee API or n8n licensing is already enabled by an old paid account. A third-party integration goes live only after verifying credentials, rights, and end-to-end behavior.

## MVP gate and acceptance tests (before production release)

- Owner of project P1 cannot see P2, even if both contain a vendor with same name.
- Provider V1 invited to P1/WorkPackage-A can only read A; V2 invited to B cannot see A, bids from V1 or private owner budget.
- Invite invalid/expired/revoked, recipient mismatch, or re-use cannot create membership.
- Revoked member loses access for next MCP tool call and next document URL issuance; async jobs are revalidated before execution.
- Project agent cannot open another company's private connection, escalate a permission, spend money, issue an external contract or invite without authorization.
- CEO agent for participating provider can access only explicit project work context, never owner's other projects.
- Credit reservation and refund are idempotent; exact developer/platform revenue is reconciled after refunds and fees.
- No cross-tenant leakage via n8n payload, logs, errors, chat history, webhooks, vector search, or storage paths.
- No changes to public SEO or existing provider cards until an authorized deployment.

## Recommended implementation sequence

1. Define API/RPC contract and project permission matrix, stage additive tables and RLS (NOT on production).
2. Build invite acceptance/revocation and scoped document access; run cross-tenant negative tests.
3. Implement a Project Agent context and tenant-MCP capability broker for a single test project.
4. Integrate optional provider-agent work package handoff and existing credit reservation/approval routines.
5. Build the AR/EN Flutter Project Workspace UI and demonstrate two providers, two projects and three roles.
6. Security and billing review, approvals, then deploy via Cloudflare MCP/API, NOT GitHub Actions.

Status at this commit: specification only; intentionally no live feature activation, migrations or deployment.

## Government Services Assistant and TAMM handoff (2026-11-21)

A personal CEO Agent and per-project Project Agent may invoke an optional Government Services Assistant for Abu Dhabi TAMM and other approved public-service pathways. Project-level data sharing does not confer legal authority to access a government account or sign on a person's behalf. The agent may gather drawings, 360 site evidence, and consultant-approved documentation; it prepares a reviewable handoff package to the authorized applicant. Any UAE PASS authentication, declaration, signature, submission or government-fee payment remains with the authorized human unless a future official mechanism explicitly allows otherwise. No existing TAMM integration or government partnership is claimed.

**Full specification:** [Government Services Assistant — TAMM / Abu Dhabi pilot](./weyaak-government-services-assistant-tamm.md).

**Release status:** documentation only; no changes to project RLS, migrations, TAMM access, Flutter UI or production.
