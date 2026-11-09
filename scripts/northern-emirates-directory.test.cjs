const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const placesSrc=read('data/northernDirectoryContent.js');
const areas=JSON.parse(placesSrc.match(/^export const NORTHERN_LOCALITIES=(.+);$/m)?.[1]||'{}');
const sectorNotes=JSON.parse(placesSrc.match(/^export const NORTHERN_SECTOR_NOTES=(.+);$/m)?.[1]||'{}');
const taxonomy=read('data/siteTaxonomy.js');
const names=['ras-al-khaimah','fujairah'];
const expectedImages=['UAE_SECTOR_ASSETS[sector.slug]','DirectoryResponsiveImage'];
for(const slug of names){
 assert.ok(areas[slug]?.length>=10,slug+' district content missing');
 const seen=new Set();
 for(const [district,arabic,english,arabicFocus,englishFocus] of areas[slug]){
  assert.ok(!seen.has(district),slug+' duplicate district '+district);
  seen.add(district);
  assert.ok(taxonomy.includes("slug: '"+district+"'"),slug+' missing taxonomy area '+district);
  for(const text of [arabic,english,arabicFocus,englishFocus])assert.ok(text?.length>38,slug+' '+district+' insufficient bilingual context');
 }
}
assert.equal(Object.keys(sectorNotes).length,8);
const areaPage=read('components/AbuDhabiAreaGuide.js');
assert.ok(areaPage.includes('northernAreaEditorial(emirate,area,locale)'));
assert.ok(areaPage.includes('northernAreaSectorNote(emirate,area,sector.slug,locale)'));
assert.ok(areaPage.includes('UAE_SECTOR_ASSETS[sector.slug]'));
assert.ok(areaPage.includes('chapterIndex.items[sector.slug]'));
assert.ok(areaPage.includes('EMIRATE_TOPIC_ANSWERS'));
const hub=read('components/DirectoryLandingPage.js');
assert.ok(hub.includes('northernEmirateIntro(currentEmirate,locale)'));
const emirateCard=read('components/DirectoryEmirateSectorCard.js');
assert.ok(emirateCard.includes('hideNumbers'));
assert.ok(emirateCard.includes("hideNumbers?'list-none space-y-4'"));
const head=read('components/UaeDirectorySeo.js');
assert.ok(head.includes('emirate.slug'));
assert.ok(head.includes('hasSectorPath = !!emirate?.slug && (!!service || !!area)'));
const routeFiles=[
 ['pages/uae/[activity]/[emirate].js','emirate','ar'],
 ['pages/en/uae/[emirate]/[area].js','emirate','en'],
 ['pages/uae/[activity]/[emirate]/[service].js','district','ar'],
 ['pages/en/uae/[emirate]/[area]/[service].js','district','en'],
];
for(const [p,scope,locale] of routeFiles){
 const code=read(p);
 assert.ok(code.includes('isNorthernEmirate('),p+' missing northern route');
 assert.ok(code.includes('northernDirectorySeo('),p+' missing local metadata');
 assert.ok(code.includes('northernSectorGuides('),p+' missing bilingual guides');
 assert.ok(code.includes('getSectorTaxonomy('),p+' missing approved taxonomy');
 assert.ok(code.includes('<SectorTaxonomyExplorer'),p+' missing service list');
 assert.ok(code.includes('<DirectorySectorQuoteForm'),p+' missing WhatsApp request form');
 if(scope==='district')assert.ok(code.includes("quotePlacement={regionArea||northern?'external':'inline'}"),p+' missing one location-aware quote form');
}
const sitemap=read('pages/sitemap.xml.js');
for(const slug of names)assert.ok(sitemap.includes("'"+slug+"'"),slug+' not in sitemap');
assert.ok(sitemap.includes('for (const area of emirate.areas)'));
assert.ok(sitemap.includes('for (const sector of UAE_MAIN_SECTORS)'));
assert.ok(sitemap.includes("addPair(path,'/en'+path") || sitemap.includes('addPair(sectorPath'));
console.log('Northern emirates: bilingual locality, images, sector topics, metadata, real taxonomy and WhatsApp form contracts: PASS.');
