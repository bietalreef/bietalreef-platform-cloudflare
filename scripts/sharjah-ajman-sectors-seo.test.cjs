const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname,'..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const src=read('data/sharjahAjmanSectorEditorial.js');
const match=src.match(/export const EMIRATE_SECTOR_EDITORIAL = ([\s\S]*?);\s*export function/);
assert.ok(match,'single geographic editorial registry');
const editorial=JSON.parse(match[1]);
const sectors=['general-contracting','interior-design','general-maintenance','building-materials','aluminium-glass','furniture-decor','equipment-rental','cleaning-services'];
const sources={'general-contracting':'data/abuDhabiConstructionServiceGuides.json',...Object.fromEntries(sectors.slice(1).map(x=>[x,'data/abuDhabiSectorContent/'+x+'.json']))};
const counts=sectors.map(s=>JSON.parse(read(sources[s])).specialties.reduce((sum,g)=>sum+g.services.length,0));
assert.equal(counts.reduce((a,b)=>a+b,0),434,'all service descriptions still grounded in the single existing corpus');
const unique=new Set();
for(const city of ['sharjah','ajman']){
 assert.deepEqual(Object.keys(editorial[city]).sort(),sectors.slice().sort(),city+' must contain all sectors');
 for(const sector of sectors){
  for(const locale of ['ar','en']){
   const data=editorial[city][sector][locale];
   assert.equal(data.length,4);
   assert.ok(data[0].length>=22 && data[1].length>=95,city+' '+sector+' meta and lead');
   assert.ok(data[2].length>=100 && data[3].length>=100,city+' '+sector+' local editorial');
   assert.ok(!unique.has(data[2]),'copied local paragraph '+city+' '+sector);
   unique.add(data[2]);
   assert.ok(data.join(' ').includes(city==='sharjah'?(locale==='ar'?'الشارقة':'Sharjah'):(locale==='ar'?'عجمان':'Ajman')),'missing geographic identity');
  }
 }
}
const ar=read('pages/uae/[activity]/[emirate].js'),en=read('pages/en/uae/[emirate]/[area].js');
for(const page of [ar,en]){
 assert.match(page,/\['abu-dhabi','dubai','sharjah','ajman'\]\.includes\(emirate.slug\)/);
 assert.match(page,/getGeographicSectorContent\(service.slug,emirate.slug\)/);
 assert.match(page,/getSectorTaxonomy\(service.slug/);
 assert.match(page,/serviceGuides=\{sectorGuides\}/);
 assert.match(page,/quotePlacement="external"/);
 assert.match(page,/onServiceRequest=\{setRequestedService\}/);
 assert.equal((page.match(/<DirectorySectorQuoteForm locale=/g)||[]).length,2,'separate sector and area page render branches');
 assert.match(page,/regionArea&&<DirectorySectorQuoteForm locale=/);
 assert.match(page,/seo\?\.context\?\.length>0/);
}
const seo=read('data/abuDhabiSectorSeo.js');
assert.match(seo,/emirateSectorEditorial\(emirate\?\.slug, slug, locale\)/);
const resolver=read('lib/geographicSectorContent.js');
assert.match(resolver,/getAbuDhabiSectorContent\(sectorSlug\)/);
assert.match(resolver,/bodyAr: adaptServiceText/);
assert.match(resolver,/bodyEn: adaptServiceText/);
const meta=read('components/UaeDirectorySeo.js');
assert.match(meta,/const hasSectorPath = !!emirate\?\.slug && \(!!service \|\| !!area\)/);
assert.match(meta,/\+ emirate\.slug/);
assert.match(meta,/hrefLang="ar-AE"/);
assert.match(meta,/hrefLang="en-AE"/);
assert.match(meta,/rel="canonical"/);
assert.match(meta,/name="robots" content="index, follow"/);
const sitemap=read('pages/sitemap.xml.js');
assert.match(sitemap,/for \(const emirate of \['abu-dhabi','dubai','sharjah','ajman','umm-al-quwain','ras-al-khaimah','fujairah'\]\) for \(const sector of UAE_MAIN_SECTORS\)/);
assert.match(sitemap,/\{lastmod:'2026-11-10'\}/);
const explorer=read('components/SectorTaxonomyExplorer.js');
assert.match(explorer, /aria-expanded=\{expanded\}/);
assert.match(explorer, /specialtyRows\.map/);
assert.match(explorer, /hidden=\{!expanded\}/);
assert.match(explorer, /serviceGuides\?\.sector===normalized/);
assert.match(explorer, /id=\{'service-'/);
assert.match(explorer, /'@type':'ItemList'/);
const q=read('components/DirectorySectorQuoteForm.js');
assert.match(q,/id="directory-quote"/);
assert.match(q,/971564456337/);
assert.match(q,/sourceGroups\.map\(group => <optgroup/);
console.log('Sharjah and Ajman sector hubs: PASS — 16 bilingual page pairs, 434 service guides, local editorial, SSR, canonical, sitemap and single WhatsApp quote per page.');
