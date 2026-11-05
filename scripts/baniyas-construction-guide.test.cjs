const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const files=[1,2,3,4,5,6].map(n=>'data/baniyasConstructionChapters0'+n+'.json');
const all=files.flatMap(f=>JSON.parse(read(f)).chapters);
const wordCount=html=>html.replace(/<[^>]+>/g,' ').trim().split(/\s+/).filter(Boolean).length;
test('All seventeen Baniyas construction chapters exist exactly once in the approved order',()=>{
 assert.equal(all.length,17);
 assert.deepEqual(all.map(x=>x.id),Array.from({length:17},(_,i)=>'baniyas-general-contracting-'+String(i+1).padStart(2,'0')));
 for(const locale of ['ar','en'])assert.equal(new Set(all.map(x=>x[locale].title)).size,17);
});
test('Each Baniyas construction chapter meets editorial depth and has a separate original English text',()=>{
 for(const chapter of all){
  assert.ok(wordCount(chapter.ar.html)>=500,chapter.id+' Arabic word count '+wordCount(chapter.ar.html));
  assert.ok(wordCount(chapter.en.html)>=400,chapter.id+' English word count '+wordCount(chapter.en.html));
  assert.match(chapter.ar.html,/<p>/);
  assert.match(chapter.en.html,/<p>/);
  assert.ok(!/\bSEO\b|\bGitHub\b|\bModal\b/.test(chapter.en.html));
 }
});
test('Baniyas full guide is included only in the actual existing area route; rest of eleven areas unchanged',()=>{
 const reading=read('data/baniyasConstructionReading.js');
 const area=read('components/AbuDhabiAreaGuide.js');
 const modal=read('components/DirectoryReadModal.js');
 assert.match(reading,/\.\.\.c01\.chapters/);
 assert.match(reading,/\.\.\.c06\.chapters/);
 assert.match(reading,/data-read-target/);
 assert.match(reading,/reading-chapter/);
 assert.match(area,/areaSlug==='baniyas'/);
 assert.match(area,/sector\.slug==='general-contracting'/);
 assert.match(area,/baniyasConstructionReadingHtml\(locale\)/);
 assert.match(modal,/showModal\(\)/);
 assert.match(modal,/event\.preventDefault\(\)/);
 assert.match(modal,/data-read-target/);
 assert.match(read('pages\/uae\/[activity]\/[emirate].js'),/AbuDhabiAreaGuide/);
 assert.match(read('pages\/en\/uae\/[emirate]\/[area].js'),/AbuDhabiAreaGuide/);
});
test('No fake sector coverage or hardcoded company list is introduced',()=>{
 const area=read('components/AbuDhabiAreaGuide.js');
 assert.match(area,/providers\.map\(/);
 assert.match(read('lib/abuDhabiAreaPublishedCompanies.js'),/getUaeDirectoryEntities/);
 const local=JSON.parse(read('data/abuDhabiAreaEditorial.json'));
 assert.equal(Object.keys(local.areas).length,11);
});
