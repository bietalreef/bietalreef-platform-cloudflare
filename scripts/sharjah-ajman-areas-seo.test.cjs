const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const source=read('data/sharjahAjmanAreaEditorial.js');
const match=source.match(/export const AREA_EDITORIAL = ([\\s\\S]*?);\\s*export function/);
assert.ok(match,'original bilingual area editorial registry is published');
const data=JSON.parse(match[1]);
const taxonomy=read('data/siteTaxonomy.js');
const sectors=['general-contracting','interior-design','general-maintenance','building-materials','aluminium-glass','furniture-decor','equipment-rental','cleaning-services'];
const expected={
 sharjah:['sharjah-city','al-nahda','al-majaz','al-qasimia','al-khan','al-dhaid','kalba','khorfakkan','al-madam','mleiha','al-hamriyah'],
 ajman:['ajman-city','al-jurf','al-rawda','al-hamidiyah','al-rashidiya','al-nuaimiya','masfout','al-manama']
};
const uniqueAr=new Set(),uniqueEn=new Set();
for(const [emirate,areas] of Object.entries(expected)){
  assert.deepEqual(Object.keys(data[emirate]).sort(),areas.slice().sort(),'all approved '+emirate+' regions');
  for(const slug of areas){
    assert.ok(taxonomy.includes("slug: '"+slug+"'"),'area must exist in the original taxonomy: '+slug);
    const item=data[emirate][slug];
    for(const locale of ['ar','en']){
      assert.equal(item[locale].length,2,slug+' '+locale+' locality paragraphs');
      assert.ok(item[locale][0].length>=140 && item[locale][1].length>=140,'substantive place-specific content: '+slug+' '+locale);
      const key=item[locale].join(' ');
      const seen=locale==='ar'?uniqueAr:uniqueEn;
      assert.ok(!seen.has(key),'duplicate city descriptions');
      seen.add(key);
    }
  }
}
assert.equal(uniqueAr.size,19);assert.equal(uniqueEn.size,19);
const resolver=read('lib/geographicSectorContent.js');
assert.match(resolver,/getGeographicSectorContent\\(sectorSlug, emirateSlug, area=null\\)/);
assert.match(resolver,/areaAr = area\\?\\.nameAr/);
assert.match(resolver,/areaEn = area\\?\\.nameEn/);
const regionSeo=read('data/sharjahAjmanAreaEditorial.js');
assert.match(regionSeo,/areaSectorEditorial\\(emirate,area,sector,locale='ar'\\)/);
assert.match(regionSeo,/emirateSectorEditorial\\(emirate.slug,sector.slug,locale\\)/);
const main=read('components/MainSectorCards.js');
assert.match(main,/locationMode === 'emirate-area'/);
assert.match(main,/locationRoot\\+'\\/'\\+sector.slug/);
for(const [locale,file] of [['ar','pages/uae/[activity]/[emirate].js'],['en','pages/en/uae/[emirate]/[area].js']]){
 const page=read(file);
 assert.match(page,/areaEditorialFor\\(emirate.slug,area.slug,/);
 assert.match(page,/locationMode="emirate-area"/);
 assert.match(page,/MainSectorCards locale=/);
 assert.match(page,/regionArea&&<DirectorySectorQuoteForm locale=/);
 assert.match(page,/UaeDirectorySeo locale=/);
 assert.match(page,/area=\\{regionArea\\?area:undefined\\}/);
 assert.match(page,/area-service-head/);
}
for(const [locale,file] of [['ar','pages/uae/[activity]/[emirate]/[service].js'],['en','pages/en/uae/[emirate]/[area]/[service].js']]){
 const page=read(file);
 assert.match(page,/areaSectorEditorial\\(emirate,area,service,/);
 assert.match(page,/getGeographicSectorContent\\(service.slug,emirate.slug,area\\)/);
 assert.match(page,/serviceGuides=\\{sectorGuides\\}/);
 assert.match(page,/quotePlacement=\\{regionArea\\?'external':'inline'\\}/);
 assert.match(page,/regionArea&&geoSector&&<DirectorySectorQuoteForm locale=/);
 assert.match(page,/sectorTaxonomy\\?\\.length\\?sectorTaxonomy/);
 assert.match(page,/onServiceRequest=\\{regionArea\\?setRequestedService:undefined\\}/);
 assert.match(page,/aria-label=/);
}
const meta=read('components/UaeDirectorySeo.js');
assert.match(meta,/const hasSectorPath = !!emirate\\?\\.slug && \\(!!service \\|\\| !!area\\)/);
assert.match(meta,/\\.\\.\\.\\(service \\? \\[/);
assert.match(meta,/name="robots" content="index, follow"/);
assert.match(meta,/rel="canonical"/);
assert.match(meta,/hrefLang="ar-AE"/);assert.match(meta,/hrefLang="en-AE"/);
const sitemap=read('pages/sitemap.xml.js');
assert.match(sitemap,/areaEditorialFor\\(emirate.slug,area.slug,'ar'\\)/);
assert.match(sitemap,/for \\(const sector of UAE_MAIN_SECTORS\\)/);
assert.match(sitemap,/addPair\\(hub,'\\/en'\\+hub/);
assert.match(sitemap,/addPair\\(path,'\\/en'\\+path/);
assert.match(sitemap,/lastmod:'2026-11-09'/);
const explorer=read('components/SectorTaxonomyExplorer.js');
assert.match(explorer,/hidden=\\{!expanded\\}/);
assert.match(explorer,/serviceGuides\\?\\.sector===normalized/);
assert.match(explorer,/id=\\{'service-'/);
assert.match(explorer,/aria-expanded=\\{expanded\\}/);
console.log('Sharjah and Ajman areas: PASS — original bilingual copy for all 19 areas, eight sector pages per area, server-rendered service guides, canonical, sitemap, one customer RFQ.');
