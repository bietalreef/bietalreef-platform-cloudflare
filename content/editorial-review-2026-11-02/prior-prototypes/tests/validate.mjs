import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {suggestWeyaakWorkflow} from '../data/weyaakWorkflowDecision.mjs';
const root = path.resolve(import.meta.dirname,'..');
const entries=JSON.parse(fs.readFileSync(path.join(root,'data/editorialContent.ar.json')));
const taxonomy=JSON.parse(fs.readFileSync(path.join(root,'docs/engineering_and_maintenance.json')));
assert.equal(Object.keys(entries).length,7);
assert.equal(taxonomy.consulting.length,15);
assert.equal(taxonomy.maintenance.length,22);
for(const [id,e] of Object.entries(entries)){
  assert.ok(e.wordCount>100, `${id}: article should be meaningful`);
  assert.equal((e.html.match(/<h1\b/g)||[]).length,0,`${id}: H1 belongs to existing page`);
  assert.equal((e.html.match(/href="#/g)||[]).length,0, `${id}: no hash links`);
  assert.equal((e.html.match(/href="\/#/g)||[]).length,0, `${id}: no hash routes`);
  assert.ok(e.html.includes('<h2>'));
  assert.ok(!e.html.includes('src="https://'), `${id}: no arbitrary stock images`);
}
for(const category of ['consulting','maintenance']){
 let ids=taxonomy[category].map(x=>x.id); assert.equal(new Set(ids).size,ids.length);
 taxonomy[category].forEach(x=>{
  assert.ok(x.title && x.id);
  for(const f of category==='consulting'?['need','deliverables','verify','quote']:['symptoms','inspection','repair','accept'])
   assert.ok(x[f]?.length>45, `${x.id}: missing specialized ${f}`);
 });
}
const dr=suggestWeyaakWorkflow({intent:'tender',multiBid:true,scopeDocumented:true});
assert.equal(dr.kind,'tender_draft');assert.equal(dr.writesData,false);
assert.equal(suggestWeyaakWorkflow({intent:'custom_product',productId:'foo'}).kind,'quote_intake');
assert.equal(suggestWeyaakWorkflow({intent:'rfi'}).requiresAuthentication,true);
console.log(JSON.stringify({passed:12,articles:Object.keys(entries).length,consulting:taxonomy.consulting.length,maintenance:taxonomy.maintenance.length,totalWordCount:Object.values(entries).reduce((a,b)=>a+b.wordCount,0)},null,2));
