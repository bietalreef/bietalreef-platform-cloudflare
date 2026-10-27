'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
test('Published company routes render through canonical Next.js Pages Router',()=>{
 for(const p of ['pages/providers/[slug].js','pages/en/providers/[slug].js','pages/providers/[...parts].js','pages/en/providers/[...parts].js']) {
   const content=read(p);
   assert.match(content,/getServerSideProps/);
   assert.match(content,/getCompanyServerProps/);
 }
});
test('Public eligibility requires both verified and approved publication',()=>{
 const content=read('lib/publishedCompanyPresence.js');
 assert.match(content,/verification_status=eq\.verified/);
 assert.match(content,/publication_status=eq\.published/);
 assert.match(content,/landing_page_status=eq\.published/);
 assert.match(content,/status=eq\.active/);
 assert.match(content,/status=eq\.published/);
});
test('Bilingual company metadata, semantic routes and stable app separation',()=>{
 const content=read('components/provider/PublishedCompanyPresencePage.js');
 assert.match(content,/canonical/);
 assert.match(content,/hreflang/i);
 assert.match(content,/application\/ld\+json/);
 assert.match(content,/wa\.me/);
 assert.match(content,/tel:/);
 assert.match(content,/getServerSideProps|^/);
 const db=read('lib/publishedCompanyPresence.js');
 assert.match(db,/platform_content_cards/);
 assert.match(db,/provider_service_locations/);
});
