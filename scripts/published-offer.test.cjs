const {test}=require('node:test');
const assert=require('node:assert/strict');
const {publishedOffer}=require('../lib/publishedOffer.cjs');
test('offer display reads only the stored percentage, code and expiry',()=>{
 assert.deepEqual(publishedOffer({discount_percent:25,offer_code:'CLEAN25'},'2026-12-08T20:00:00Z'),{discountPercent:25,code:'CLEAN25',expiresAt:'2026-12-08T20:00:00Z'});
 assert.deepEqual(publishedOffer({},null),{discountPercent:null,code:null,expiresAt:null});
 assert.deepEqual(publishedOffer({discount_percent:101,offer_code:'x'.repeat(41)},'unknown'),{discountPercent:null,code:null,expiresAt:null});
});
