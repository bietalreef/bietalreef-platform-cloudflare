'use strict';
/** Server-only domain primitives. Identity and company membership MUST come
 * from a verified server session and DB, never from request payloads. */
class WorkflowAccessError extends Error {
  constructor(code) { super(code); this.code = code; this.name = 'WorkflowAccessError'; }
}
function id(v) { return typeof v === 'string' && v.length > 0 && v.length <= 128; }
function assertExecutable({principal, company, installation, workflow} = {}) {
  if (!principal || principal.authenticated !== true || !id(principal.userId)) throw new WorkflowAccessError('AUTH_REQUIRED');
  if (!company || !id(company.id) || company.status !== 'verified') throw new WorkflowAccessError('COMPANY_NOT_VERIFIED');
  if (principal.companyId !== company.id || !['owner','admin','operator'].includes(principal.role)) throw new WorkflowAccessError('COMPANY_ACCESS_DENIED');
  if (!installation || !workflow || !id(workflow.id) || !id(workflow.version)) throw new WorkflowAccessError('WORKFLOW_NOT_FOUND');
  if (installation.companyId !== company.id || installation.workflowId !== workflow.id) throw new WorkflowAccessError('CROSS_TENANT_DENIED');
  if (workflow.status !== 'published' || installation.status !== 'active') throw new WorkflowAccessError('WORKFLOW_INACTIVE');
  if (installation.workflowVersion !== workflow.version) throw new WorkflowAccessError('WORKFLOW_VERSION_MISMATCH');
  if (installation.subscriptionStatus !== 'active') throw new WorkflowAccessError('SUBSCRIPTION_REQUIRED');
  if (!id(installation.id) || !id(workflow.creatorId)) throw new WorkflowAccessError('INVALID_WORKFLOW_RECORD');
  return Object.freeze({companyId:company.id,installationId:installation.id,workflowId:workflow.id,workflowVersion:workflow.version,creatorId:workflow.creatorId,userId:principal.userId});
}
function validMinor(value,name) { if (!Number.isSafeInteger(value) || value < 0) throw new TypeError(name+' must be nonnegative integer fils'); }
function calculateSettlement({grossMinor,refundsMinor=0,vatMinor=0,paymentFeesMinor=0,operatingCostsMinor=0,creatorShareBps=4000} = {}) {
  const values = {grossMinor,refundsMinor,vatMinor,paymentFeesMinor,operatingCostsMinor};
  for (const [name,value] of Object.entries(values)) validMinor(value,name);
  if (!Number.isInteger(creatorShareBps) || creatorShareBps < 0 || creatorShareBps > 10000) throw new RangeError('invalid creator share');
  const deductions = refundsMinor + vatMinor + paymentFeesMinor + operatingCostsMinor;
  if (!Number.isSafeInteger(deductions) || deductions > grossMinor) throw new RangeError('deductions exceed gross');
  const distributableMinor = grossMinor - deductions;
  const creatorMinor = Number(BigInt(distributableMinor)*BigInt(creatorShareBps)/10000n);
  const platformMinor = distributableMinor - creatorMinor;
  return Object.freeze({grossMinor,refundsMinor,vatMinor,paymentFeesMinor,operatingCostsMinor,distributableMinor,creatorMinor,platformMinor,creatorShareBps,currency:'AED'});
}
module.exports = {WorkflowAccessError,assertExecutable,calculateSettlement};
