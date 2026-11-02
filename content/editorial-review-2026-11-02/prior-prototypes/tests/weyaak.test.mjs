import test from 'node:test';
import assert from 'node:assert/strict';
import {RFQ_TEMPLATES,reviewQuoteDraft,compareBidsForOwner} from '../data/weyaakRequirements.mjs';
test('RFQ templates contain required specialty dimensions',()=>{
 assert.equal(Object.keys(RFQ_TEMPLATES).length,6);
 assert.equal(RFQ_TEMPLATES.custom_kitchen.fields.some(f=>f.key==='wall_dimensions'),true);
 assert.equal(RFQ_TEMPLATES.water_leakage.fields.some(f=>f.key==='symptoms'),true);
});
test('RFQ is never persisted or silently submitted',()=>{
 assert.equal(reviewQuoteDraft('water_leakage',{}).ready,false);
 assert.equal(reviewQuoteDraft('custom_kitchen',{}).writePerformed,false);
});
test('Bid comparison exposes incompleteness and no winner ranking',()=>{
 const got=compareBidsForOwner([{id:'p1',total_amount:1000,lines:[{code:'A',specification_matched:true}],exclusions:['transport']}],[{code:'A'},{code:'B'}]);
 assert.equal(got[0].comparable,false);
 assert.deepEqual(got[0].missingItems,['B']);
 assert.equal('winner' in got[0],false);
});
