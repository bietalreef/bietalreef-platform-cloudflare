const {test}=require('node:test');
const assert=require('node:assert/strict');
const {latestContentDate}=require('../lib/contentDates.cjs');
test('last modification comes from valid stored source dates, never the request clock',()=>{
 assert.equal(latestContentDate('2026-10-28',['2026-11-08T07:30:00Z',null,'bad-date']),'2026-11-08T07:30:00.000Z');
 assert.equal(latestContentDate(null,'not-a-date'),null);
});
