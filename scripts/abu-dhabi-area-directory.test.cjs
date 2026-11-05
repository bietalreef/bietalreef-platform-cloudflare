const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const local=require('../data/abuDhabiAreaEditorial.json');
const contexts=require('../data/abuDhabiAreaSectorContexts.json');
const chapters=require('../data/abuDhabiChapterIndex.json');
const regions=['baniyas','khalifa-city','mohammed-bin-zayed-city','shamkha','al-wathba','al-rahba','musaffah','al-reem-island','al-raha','abu-dhabi-city','al-dhafra'];
const sectors=['general-contracting','interior-design','general-maintenance','building-materials','aluminium-glass','furniture-decor','equipment-rental','cleaning-services'];
test('Eleven real Abu Dhabi areas have original AR and EN material',()=>{
 assert.deepEqual(Object.keys(local.areas),regions);
 assert.deepEqual(Object.keys(contexts.contexts),regions);
 for(const region of regions){
  assert.deepEqual(Object.keys(contexts.contexts[region]),sectors);
  for(const lang of ['ar','en']){
   const e=local.areas[region][lang];
   assert.ok(e.intro.length>150&&e.focus.length>130,region+' '+lang);
   assert.ok(e.faq.length>=3,region+' '+lang+' faq');
   for(const slug of sectors)assert.ok(contexts.contexts[region][slug][lang].length>55,region+' '+slug+' '+lang);
  }
 }
});
test('All eight specialty destinations already exist in platform taxonomy',()=>{
 const taxonomy=read('data/siteTaxonomy.js');
 for(const slug of sectors){
  assert.ok(taxonomy.includes("slug: '"+slug+"'"),slug+' missing path');
  assert.equal(chapters.items[slug].length,17);
 }
});
test('Both existing area routes use bilingual cards and real publication coverage',()=>{
 for(const p of ['pages/uae/[activity]/[emirate].js','pages/en/uae/[emirate]/[area].js']){
  const source=read(p);
  assert.match(source,/AbuDhabiAreaGuide/);
  assert.match(source,/getPublishedAbuDhabiAreaCompanies/);
  assert.match(source,/getStaticPaths/);
 }
 const loader=read('lib/abuDhabiAreaPublishedCompanies.js');
 assert.match(loader,/getUaeDirectoryEntities\(card,locale,'abu-dhabi',areaSlug\)/);
 assert.match(read('lib/platformDirectoryCards.js'),/coversEmirateLocation/);
});
test('City entry stays Al Ain, remaining areas use the real existing slugs',()=>{
 const src=read('components/DirectoryLandingPage.js');
 assert.match(src,/ABU_DHABI_DESTINATIONS\.filter\(item=>item\.slug==='al-ain'\)/);
 assert.match(src,/\['abu-dhabi-city','al-dhafra',\.\.\.ABU_DHABI_AREAS\]/);
});
test('Reading dialog remains independent of the card',()=>{
 const page=read('components/AbuDhabiAreaGuide.js');
 assert.match(page,/UAE_MAIN_SECTORS\.map/);
 assert.match(page,/DirectoryReadModal/);
 assert.match(page,/localContexts\.contexts\[areaSlug\]/);
 assert.match(read('components/DirectoryReadModal.js'),/showModal\(\)/);
});

test('Baniyas contracting chapters respect the word-count and source-review thresholds',()=>{
 const index=require('../data/baniyasConstructionIndex.json');
 const files=[require('../data/baniyasConstructionChapters01.json'),require('../data/baniyasConstructionChapters02.json')];
 const articles=files.flatMap(file=>file.chapters);
 assert.equal(index.chapters.length,17);
 assert.equal(articles.length,5);
 const publishedIds=new Set(articles.map(item=>item.id));
 for(const article of articles){
  assert.ok(article.ar.html.replace(/<[^>]+>/g,' ').trim().split(/\s+/).length>=500,article.id+' Arabic');
  assert.ok(article.en.html.replace(/<[^>]+>/g,' ').trim().split(/\s+/).length>=400,article.id+' English');
  assert.ok(index.chapters.some(item=>item.id===article.id&&item.status==='written-pending-editorial-review'));
 }
 for(const file of files){
  assert.equal(file.officialSourcesReviewed,'2026-11-06');
  assert.ok(file.officialReferences.length>=3);
 }
 assert.equal(index.chapters.filter(item=>item.status==='index-only').length,12);
});
