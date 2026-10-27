'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const draft = require('../data/providerTemplates/makkah-cleaning-visual-launch.draft.json');
const root=path.resolve(__dirname, '..');
const imageDir=path.join(root,'public/images/providers/makkah-cleaning');
const expected=[...draft.services,...draft.offers];
test('eight unique Makkah photo assets and real account identity in staging manifest', () => {
  assert.equal(draft.legal_identity.account_code,'BR-3000530');
  assert.equal(draft.legal_identity.matched_phone,'+971545575370');
  assert.equal(draft.services.length,4);
  assert.equal(draft.offers.length,4);
  assert.equal(new Set(expected.map(x=>x.file)).size,8);
  for (const x of expected) assert.match(x.file,/^photo-(service|offer)-[a-z-]+\.webp$/);
});
test('four bilingual, service-specific HTML copy blocks', () => {
  for (const service of draft.services) {
    assert.ok(service.description_ar?.length>90,service.slug+' Arabic');
    assert.ok(service.description_en?.length>90,service.slug+' English');
    assert.ok(service.taxonomy_slug?.length>5,service.slug+' taxonomy');
  }
});
test('draft and discount offer publication gates stay closed', () => {
  assert.equal(draft.seo.indexable,false);
  assert.equal(draft.plan.published,false);
  assert.ok(draft.offers.every(x=>x.status==='draft' && x.approved===false));
  const routes=[
    'pages/preview/makkah-cleaning.js',
    'pages/en/preview/makkah-cleaning.js',
    'pages/preview/makkah-cleaning/[...parts].js',
    'pages/en/preview/makkah-cleaning/[...parts].js'
  ];
  for(const filename of routes) {
    const s=fs.readFileSync(path.join(root,filename),'utf8');
    assert.match(s,/getServerSideProps/,filename);
    assert.match(s,/noindex/,filename);
  }
});
test('production image directory is complete before public go-live', () => {
  // Use MAKKAH_GO_LIVE=1 in the release pipeline: review checks do not imply upload.
  if(process.env.MAKKAH_GO_LIVE!=='1')return;
  for(const x of expected) {
    const p=path.join(imageDir,x.file);
    assert.ok(fs.existsSync(p),'missing WebP '+x.file);
    assert.ok(fs.statSync(p).size>2048,'undersized WebP '+x.file);
  }
  assert.equal(draft.legal_identity.new_brand_approved,true,'display brand must be approved');
  assert.equal(draft.plan.published,true,'platform channel must be published');
  assert.ok(draft.offers.every(x=>x.approved && x.valid_from && x.valid_until),'offer terms must be approved');
});
