# Weyaak Government Services Assistant — TAMM / Abu Dhabi pilot
Decision specification, 2026-11-21. **Design only. No TAMM/UAE PASS API access, official partnership, delegated authority, or live feature is asserted.**

## Product goal and fit

A subscribed individual's personal CEO Agent and project-scoped Project Agent may prepare, explain, organize, and track government-service workflows such as Abu Dhabi TAMM. The citizen/business representative remains legally and operationally responsible for government identity verification, submission, declarations, signatures, fees, and any formal delegation. For Al Ain construction pilot: prepare documentation for a municipality/Building Permit (BINAA) pathway without claiming to submit through the municipal system.

This is a specialized Weyaak sub-agent installed into a verified subscriber account and optionally granted to project_id by the project owner. It must obey user/company/project scopes and can integrate additional government services only after vendor-specific permission checks.

## Assistance levels — NOT interchangeable

| Level | Feature | Preconditions | Weyaak status |
| --- | --- | --- | --- |
| A — prepare & guided handoff | Identify appropriate TAMM service, gather owner-approved project documents, check required fields, prepare human-readable instructions and a draft package, deep link to authoritative service | Official public service info and user consent | Design target; does not require private TAMM login or government API |
| B — user-supervised browser assistance | Assist an authenticated user through permitted steps in a user-controlled session; field entry only after reviewing terms and UX; MFA/UAE PASS actions and final submission by user | Explicit user consent, platform terms allow this mode, supported supervised browser; never impersonate user | Requires compliance, browser-security and usability verification; **not** an existing integration |
| C — official connector/API | Read transaction status or submit information through authorized programmatically delegated operations | Written technical access, defined auth scopes, official agreements, audit/security tests and lawful delegation | **Not available/verified at this time** |

No scraping of authenticated TAMM pages, automation of UAE PASS PIN/OTP, credential/cookie/session/token collection from the user, bypass of MFA/CAPTCHA, or silent submissions.

## Authority and permission boundaries

- Each action verifies trusted session identity and active account_id, then project_id membership (when relevant), project grant, agent installation entitlement, tool permission, and time-/purpose-limited consent. Never accept user IDs/company IDs/approval flags at face value from prompts or n8n.
- A project's owner granting Weyaak access to project documents DOES NOT grant government legal representation, employee delegation, or authority to sign/send/pay for another person.
- For company services, TAMM's real-world authorized users/signatories and legal mandates are separate from Weyaak role-based access control. A Weyaak CEO/sub-agent can suggest or prepare, but cannot claim to be a legally authorized signatory.
- Project owner and appropriately recognized company agent/consultant must explicitly approve all external disclosures and formal actions. Payments, license application acceptance, declarations, signatures and submissions never happen silently.
- If integration becomes official, use official delegation/OAuth or service-account model as permitted by TAMM; key material/token handles in server-side credential vault, scoped per subscriber; no shared multi-client credentials or creator-visible tokens. The actual government access model must be verified, not invented.
- Data sharing is document-level and purpose-specific. Ask before sending site imagery, location, title deeds, personal IDs, plans or consultant records. Use retention controls, access logs, redaction, and UAE privacy requirements review.

## Planned UI / conversation

Inside Subscriber App -> CEO Agent -> "Government services" and Project -> Project Agent -> "Government Services":
- Service directory & authoritative link; service eligibility disclaimer and last verified date
- Project readiness checklist (land/site info, approved drawings if available, stage photos/360 captures, engineering reviewer findings), distinguishing advisory notes vs formal documents
- Prepare packet with version, hash, source, owning party, attachment visibility and missing fields
- "Review with engineer" and "Authorize sharing" gates, then guided handoff to TAMM or appropriate officially authorized applicant
- Record submitted receipt/reference and result only when provided by authorized user or validated through an approved API; never fabricate transaction status
- Timeline shows prepared, awaiting approvals, ready for submission, submitted by authorized human, government response recorded, follow-up
- Clear "not a government approval" label on AI-generated inspection observations and dimensional estimates

## Proposed additional data (do not migrate now)

- government_service_catalog: jurisdiction, service_name, authority, verified_url, schema_version, last_reviewed_at, metadata provenance
- government_service_requests: account_id, project_id nullable, government_service_key, actor_user_id, state, consent_scope, prepared_packet_version
- government_service_approvals: request_id, human_actor_user_id, approval_type, approved_scope, reviewed_packet_hash, expires_at, immutable decision
- government_service_handoffs: request_id, authority, mode (guided/browser/official_api), reference_number if confirmed, evidence_source, timestamp
- government_service_audit: request_id, project_id, actor, action, permitted/denied, version, consent_id, redacted metadata

Prefer reuse of existing project_artifacts, project_approvals and audit routines once implemented. Do not duplicate raw government IDs or passwords in AI history, logs or shared files.

## Al Ain municipal demonstration

1. Client creates one private construction project, sets its owner and grants access to licensed engineering consultant and contractor via project invitations.
2. Project Agent gathers drawings, BOQ, tasks and 360 site evidence. Realsee virtual tour API and camera compatibility require separate confirmation.
3. Consultant reviews the site-stage evidence and signs off *within their valid real-world professional scope*; Weyaak records recommendation separately from formal municipal sign-off.
4. Government Services Assistant prepares a traceable inspection/readiness packet for the correct official municipal/TAMM/BINAA workflow, with citations to public service guidance and necessary actor.
5. Authorized human enters the actual official service, signs in with UAE PASS as required, reviews, files and pays if needed.
6. User may attach the actual official receipt/status; future approved API may retrieve status. Weyaak never claims approval from an internal checklist.

## Security/acceptance gates before release

- Cross-tenant and cross-project API/MCP access rejected, including indirect n8n workflow inputs and shared URLs
- Expired/revoked project membership or government data sharing consent blocked at next request
- Requests for UAE PASS OTP/PIN/password, transfer of login session, signing, submission, government fee payment or bypass produce a user-action handoff
- No government transaction reference exists until verified from an actual official source or user-supplied evidence labeled as such
- An unauthorized contractor cannot inspect another bidder's bid, property title, budget, or owner personal IDs
- Government document attachments have encrypted storage, least-privilege read and expiring access
- No coins charged for government fees; coins charged only for clearly priced Weyaak AI processing, with pre-authorization and refund/idempotency handling
- Confirm TAMM/municipal technical access and terms in writing before enabling B/C modes; obtain compliance review of personal identity data and cross-party disclosure
- End-to-end test in staging first, then explicit approval; publish only through Cloudflare MCP/API, never GitHub Actions

## Current status

Architecture recorded only. Supabase account, workspace, integration, billing and client project foundations exist as previously inspected. No live TAMM connection, UAE PASS delegated agent sign-in, government API credentials, project-scoped government workflow permissions or municipal approval have been demonstrated. No schema migration, external outreach, purchase, account login or deployment performed in this update.
