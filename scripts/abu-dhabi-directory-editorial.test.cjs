const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const data=require('../data/abuDhabiDirectoryEditorial.json');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const main=read('components/DirectoryLandingPage.js');
const modal=read('components/DirectoryReadModal.js');
const css=read('components/DirectoryReadModal.module.css');
const taxonomy=read('data/directoryDiscovery.js');
const sectors=['general-contracting','interior-design','general-maintenance','building-materials','aluminium-glass','furniture-decor','equipment-rental','cleaning-services'];
const cities=['abu-dhabi-city','al-ain','al-dhafra'];
const words=html=>html.replace(/<[^>]+>/g,' ').trim().split(/\s+/).filter(Boolean).length;

for(const locale of ['ar','en']){
 test('Abu Dhabi '+locale+' keeps six substantial guides',()=>{
  assert.equal(data[locale].guides.length,6);
  const names=data[locale].guides.map(x=>x.title);
  assert.equal(new Set(names).size,6);
  for(const x of data[locale].guides){
   assert.ok(words(x.html)>=650,x.title+' too short');
   assert.ok(x.href.startsWith(locale==='en'?'/en/':'/'));
   assert.ok(!/\bSEO\b|\bGitHub\b|\bSSR\b|\bModal\b|canonical/i.test(x.html));
  }
 });
 test('Abu Dhabi '+locale+' keeps all specialities, cities and reader FAQs',()=>{
  assert.deepEqual(Object.keys(data[locale].sectors),sectors);
  assert.deepEqual(Object.keys(data[locale].cities),cities);
  for(const slug of sectors)assert.ok(words(data[locale].sectors[slug].html)>=190,slug+' too short');
  assert.equal(data[locale].faq.length,8);
  for(const pair of data[locale].faq){
   assert.equal(pair.length,2);
   assert.ok(pair[0].length>10&&pair[1].length>25);
  }
 });
}
test('Abu Dhabi cards keep published-provider data and existing route mapping',()=>{
 assert.match(main,/companies\.map\(/);
 assert.match(main,/discoveryPath\(/);
 assert.match(main,/hrefFor\(c\)/);
 assert.match(main,/AbuDhabiKnowledge locale=\{locale\}/);
 assert.match(main,/visibleFiltered\.map/);
 assert.match(main,/showAllSectors/);
 const a=taxonomy.indexOf("{slug:'abu-dhabi-city',nameAr:");
 const b=taxonomy.indexOf("{slug:'al-ain',nameAr:");
 const c=taxonomy.indexOf("{slug:'al-dhafra',nameAr:");
 assert.ok(a>=0&&a<b&&b<c);
});
test('Reading modal retains SSR text and keyboard focus management',()=>{
 assert.match(modal,/dangerouslySetInnerHTML/);
 assert.match(modal,/hidden=\{!open\}/);
 assert.match(modal,/aria-modal="true"/);
 assert.match(modal,/event\.key==='Escape'/);
 assert.match(modal,/event\.key!=='Tab'/);
 assert.match(modal,/trigger\.current\?\.focus/);
 assert.match(modal,/document\.body\.style\.overflow/);
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/max-height:100dvh/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
