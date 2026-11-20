'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {assertExecutable,calculateSettlement} = require('../lib/weyaakWorkflowMarketplace.cjs');
const f = {
  principal:{authenticated:true,userId:'u-1',companyId:'c-1',role:'owner'},
  company:{id:'c-1',status:'verified'},
  installation:{id:'i-1',companyId:'c-1',workflowId:'w-1',workflowVersion:'1',status:'active',subscriptionStatus:'active'},
  workflow:{id:'w-1',version:'1',creatorId:'creator-1',status:'published'}
};
test('tenant-scoped execution returns only trusted identifiers',()=>{
  const result=assertExecutable(f);assert.equal(result.companyId,'c-1');assert.equal(result.creatorId,'creator-1');assert.ok(Object.isFrozen(result));
});
test('deny missing auth and cross-tenant membership',()=>{
  assert.throws(()=>assertExecutable({...f,principal:{authenticated:false}}),{code:'AUTH_REQUIRED'});
  assert.throws(()=>assertExecutable({...f,principal:{...f.principal,companyId:'c-2'}}),{code:'COMPANY_ACCESS_DENIED'});
});
test('deny installation from another tenant',()=>{
  assert.throws(()=>assertExecutable({...f,installation:{...f.installation,companyId:'c-2'}}),{code:'CROSS_TENANT_DENIED'});
});
test('deny unverified, unpublished, unpaid or mismatched version',()=>{
  assert.throws(()=>assertExecutable({...f,company:{...f.company,status:'pending'}}),{code:'COMPANY_NOT_VERIFIED'});
  assert.throws(()=>assertExecutable({...f,workflow:{...f.workflow,status:'draft'}}),{code:'WORKFLOW_INACTIVE'});
  assert.throws(()=>assertExecutable({...f,installation:{...f.installation,subscriptionStatus:'past_due'}}),{code:'SUBSCRIPTION_REQUIRED'});
  assert.throws(()=>assertExecutable({...f,installation:{...f.installation,workflowVersion:'2'}}),{code:'WORKFLOW_VERSION_MISMATCH'});
});
test('settlements reconcile exactly in integer AED fils',()=>{
  const x=calculateSettlement({grossMinor:10000,refundsMinor:1000,vatMinor:500,paymentFeesMinor:250,operatingCostsMinor:1250,creatorShareBps:4000});
  assert.equal(x.distributableMinor,7000);assert.equal(x.creatorMinor,2800);assert.equal(x.platformMinor,4200);
  assert.equal(x.creatorMinor+x.platformMinor+x.refundsMinor+x.vatMinor+x.paymentFeesMinor+x.operatingCostsMinor,x.grossMinor);
});
test('rounding and invalid amounts',()=>{
  const x=calculateSettlement({grossMinor:101,creatorShareBps:3333});
  assert.equal(x.creatorMinor,33);assert.equal(x.platformMinor,68);
  assert.throws(()=>calculateSettlement({grossMinor:100,refundsMinor:101}),RangeError);
  assert.throws(()=>calculateSettlement({grossMinor:0.5}),TypeError);
  assert.throws(()=>calculateSettlement({grossMinor:100,creatorShareBps:12000}),RangeError);
});
